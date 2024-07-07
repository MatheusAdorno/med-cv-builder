/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContext, useEffect, useState } from "react"
import RichTextEditor from "../RichTextEditor"
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext"
import { useParams } from "react-router-dom"
import GlobalApi from "./../../../../../service/GlobalApi"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"

const formField = {
  title: '',
  local: '',
  city: '',
  state: '',
  country: '',
  startDate: '',
  endDate: '',
  workSummary: ''
}

export default function WorkExperiences({ onFieldChange, onSaveComplete }) {
  const [workExperienceList, setWorkExperienceList] = useState([formField])
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { curriculumInfo, setCurriculumInfo } = useContext(CurriculumInfoContext)

  const handleChange = (index, e) => {
    const newEntries = workExperienceList.slice()
    const { name, value } = e.target
    newEntries[index][name] = value
    setWorkExperienceList(newEntries)
    onFieldChange();
  }

  const addNewWorkExperience = () => {
    setWorkExperienceList([...workExperienceList, formField])
    onFieldChange();
  }
  
  const removeWorkExperience = () => {
    setWorkExperienceList(workExperience => workExperience.slice(0, -1))
    onFieldChange();
  }

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = workExperienceList.slice()
    newEntries[index][name] = e.target.value
    setWorkExperienceList(newEntries)
    onFieldChange();
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        workExperience: workExperienceList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateCurriculumDetails(params?.curriculumId, data).then(resp => {
      setLoading(false)
      toast('Work experiences updated!')
      onSaveComplete();
    }, (error) => {
      setLoading(false)
      toast('Server Error, Please try again!')
    })
  }

  useEffect(() => {
    setCurriculumInfo({ ...curriculumInfo, workExperience: workExperienceList })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workExperienceList])

  useEffect(() => {
    if (curriculumInfo && curriculumInfo.workExperience && curriculumInfo.workExperience.length > 0) {
      setWorkExperienceList(curriculumInfo.workExperience)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Work Experiences</h2>
        <p>Add your previous Work Experiences</p>

        <div>
          {workExperienceList.map((item, index) => (
            <div key={index} className="border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input name='title' placeholder='Research Assistant' value={item?.title} onChange={(e) => handleChange(index, e)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs">Local</label>
                  <Input name='local' placeholder='Cleveland Clinic' value={item?.local} onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input name='city' value={item?.city} onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input name='state' value={item?.state} onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className="text-xs">Country</label>
                  <Input name='country' value={item?.country} onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input type='date' value={item?.startDate} name='startDate' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input type='date' value={item?.endDate} name='endDate' onChange={(e) => handleChange(index, e)} />
                </div>
                <div className="col-span-2">
                  <RichTextEditor index={index} defaultValue={item?.workSummary} onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)} label='Summary' pageType='workExperiences' />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" className="border-primary text-primary" onClick={addNewWorkExperience}>
              + Add Work Experience
            </Button>
            {workExperienceList.length > 1 && (
              <Button variant="outline" className="border-primary text-primary" onClick={removeWorkExperience}>
                - Remove
              </Button>
            )}
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle size={16} className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}
