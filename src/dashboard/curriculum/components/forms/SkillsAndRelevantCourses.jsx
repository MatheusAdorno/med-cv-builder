/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Input } from "@/components/ui/input"
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext"
import { useContext, useEffect, useState } from "react"
import { Rating } from "@smastrom/react-rating"

import "@smastrom/react-rating/style.css"
import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"
import GlobalApi from "./../../../../../service/GlobalApi"
import { toast } from "sonner"
import { useParams } from "react-router-dom"
import RichTextEditor from "../RichTextEditor"

export default function SkillsAndRelevantCourses({ onFieldChange, onSaveComplete }) {
  const [skillsList, setSkillsList] = useState([
    {
      name: '',
      rating: 0
    }
  ])

  const [relevantCoursesList, setRelevantCoursesList] = useState([
    {
      courseName: '',
      institution: '',
      date: '',
      description: ''
    }
  ])

  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { curriculumInfo, setCurriculumInfo } = useContext(CurriculumInfoContext)

  const handleSkillChange = (index, name, value) => {
    const newEntries = skillsList.slice()
    newEntries[index][name] = value
    setSkillsList(newEntries)
    onFieldChange();
  }

  const handleCourseChange = (index, e) => {
    const newEntries = relevantCoursesList.slice()
    const { name, value } = e.target
    newEntries[index][name] = value
    setRelevantCoursesList(newEntries)
    onFieldChange();
  }

  const addNewSkill = () => {
    setSkillsList([...skillsList, {
      name: '',
      rating: 0
    }])
    onFieldChange();
  }

  const removeSkill = () => {
    setSkillsList(skills => skills.slice(0, -1))
    onFieldChange();
  }

  const addNewRelevantCourse = () => {
    setRelevantCoursesList([...relevantCoursesList, {
      courseName: '',
      institution: '',
      date: '',
      description: ''
    }])
    onFieldChange();
  }

  const removeRelevantCourse = () => {
    setRelevantCoursesList(course => course.slice(0, -1))
    onFieldChange();
  }

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = relevantCoursesList.slice()
    newEntries[index][name] = e.target.value
    setRelevantCoursesList(newEntries)
    onFieldChange();
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
        relevantCourses: relevantCoursesList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateCurriculumDetails(params?.curriculumId, data).then(resp => {
      setLoading(false)
      toast('Skills and Relevant Courses updated!')
      onSaveComplete();
    }, (error) => {
      setLoading(false)
      toast('Server Error, Please try again!')
    })
  }

  useEffect(() => {
    setCurriculumInfo({ ...curriculumInfo, relevantCourses: relevantCoursesList, skills: skillsList })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsList, relevantCoursesList])

  useEffect(() => {
    if (curriculumInfo && curriculumInfo.skills && curriculumInfo.skills.length > 0) {
      setSkillsList(curriculumInfo.skills)
    }
    if (curriculumInfo && curriculumInfo.relevantCourses && curriculumInfo.relevantCourses.length > 0) {
      setRelevantCoursesList(curriculumInfo.relevantCourses)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div>
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your skills</p>

        <div>
          {skillsList.map((item, index) => (
            <div key={index} className="border p-3 my-3 rounded-lg flex justify-between items-center">
              <div>
                <label className="text-xs">Name</label>
                <Input className="w-full" placeholder="English" name='name' value={item.name} onChange={(e) => handleSkillChange(index, 'name', e.target.value)} />
              </div>
              <Rating className="mt-5" style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handleSkillChange(index, 'rating', v)} />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" className="border-primary text-primary" onClick={addNewSkill}>
              + Add Skill
            </Button>
            {skillsList.length > 1 && (
              <Button variant="outline" className="border-primary text-primary" onClick={removeSkill}>
                - Remove
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-7">
        <h2 className="font-bold text-lg">Relevant Courses</h2>
        <p>Add the courses you believe are relevant</p>

        {relevantCoursesList.map((item, index) => (
          <div key={index} className="border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">Course Name</label>
              <Input name='courseName' placeholder='Global Health' value={item?.courseName} onChange={(e) => handleCourseChange(index, e)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs">Institution</label>
                <Input name='institution' value={item?.institution} onChange={(e) => handleCourseChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Date</label>
                <Input type='date' name='date' value={item?.date} onChange={(e) => handleCourseChange(index, e)} />
              </div>
              <div className="col-span-2">
                <RichTextEditor index={index} defaultValue={item?.description} onRichTextEditorChange={(e) => handleRichTextEditor(e, 'description', index)} label='Description' pageType='relevantCourses' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" className="border-primary text-primary" onClick={addNewRelevantCourse}>
              + Add Course
            </Button>
            {relevantCoursesList.length > 1 && (
              <Button variant="outline" className="border-primary text-primary" onClick={removeRelevantCourse}>
                - Remove
              </Button>
            )}
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle size={16} className="animate-spin" /> : 'Save Skills and Courses'}
          </Button>
      </div>
    </div>
  )
}
