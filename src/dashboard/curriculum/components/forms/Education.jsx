/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext"
import { LoaderCircle } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GlobalApi from "./../../../../../service/GlobalApi"
import { toast } from "sonner"

export default function Education({ onFieldChange, onSaveComplete }) {
  const { curriculumInfo, setCurriculumInfo } = useContext(CurriculumInfoContext)
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [educationList, setEducationList] = useState([{
    universityName: '',
    degree: '',
    startDate: '',
    endDate: '',
  }])

  const handleChange = (index, e) => {
    const newEntries = educationList.slice()
    const { name, value } = e.target

    newEntries[index][name] = value
    setEducationList(newEntries)
    onFieldChange();
  }

  const addNewEducation = () => {
    setEducationList([...educationList, {
      universityName: '',
      degree: '',
      startDate: '',
      endDate: '',
    }])
    onFieldChange();
  }
  
  const removeEducation = () => {
    setEducationList(education => education.slice(0, -1))
    onFieldChange();
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateCurriculumDetails(params?.curriculumId, data).then(resp => {
      setLoading(false)
      toast('Education details updated!')
      onSaveComplete();
    }, (error) => {
      setLoading(false)
      toast('Server Error, Please try again!')
    })
  }

  useEffect(() => {
    setCurriculumInfo({ ...curriculumInfo, education: educationList })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [educationList])

  useEffect(() => {
    if (curriculumInfo && curriculumInfo.education && curriculumInfo.education.length > 0) {
      setEducationList(curriculumInfo.education)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your previous Education details</p>

      <div>
        {educationList.map((item, index) => (
          <div key={index} className="border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">University Name</label>
              <Input placeholder='Johns Hopkins University' value={item?.universityName} name='universityName' onChange={(e) => handleChange(index, e)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-xs">Degree</label>
                <Input name='degree' placeholder='Doctor of Medicine' value={item?.degree} onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input type='date' value={item?.startDate} name='startDate' onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input type='date' value={item?.endDate} name='endDate' onChange={(e) => handleChange(index, e)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary text-primary" onClick={addNewEducation}>
            + Add Education
          </Button>
          {educationList.length > 1 && (
            <Button variant="outline" className="border-primary text-primary" onClick={removeEducation}>
              - Remove
            </Button>
          )}
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle size={16} className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}
