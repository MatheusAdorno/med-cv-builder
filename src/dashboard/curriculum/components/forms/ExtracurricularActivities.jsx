/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContext, useEffect, useState } from "react"
import RichTextEditor from "../RichTextEditor"
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext"
import { useParams } from "react-router-dom"
import GlobalApi from "./../../../../../service/GlobalApi"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"

export default function ExtracurricularActivities({ onFieldChange, onSaveComplete }) {
  const { curriculumInfo, setCurriculumInfo } = useContext(CurriculumInfoContext)
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [extracurricularActivitiesList, setExtracurricularActivitiesList] = useState([{
    activity: '',
    organization: '',
    city: '',
    state: '',
    country: '',
    startDate: '',
    endDate: '',
    description: ''
  }])

  const handleChange = (index, e) => {
    const newEntries = extracurricularActivitiesList.slice()
    const { name, value } = e.target

    newEntries[index][name] = value
    setExtracurricularActivitiesList(newEntries)
    onFieldChange();
  }

  const addNewExtracurricularActivity = () => {
    setExtracurricularActivitiesList([...extracurricularActivitiesList, {
      activity: '',
      organization: '',
      city: '',
      state: '',
      country: '',
      startDate: '',
      endDate: '',
      description: ''
    }])
    onFieldChange();
  }
  
  const removeExtracurricularActivity = () => {
    setExtracurricularActivitiesList(extracurricularActivity => extracurricularActivity.slice(0, -1))
    onFieldChange();
  }

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = extracurricularActivitiesList.slice()
    newEntries[index][name] = e.target.value
    setExtracurricularActivitiesList(newEntries)
    onFieldChange();
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        extracurricularActivities: extracurricularActivitiesList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateCurriculumDetails(params?.curriculumId, data).then(resp => {
      setLoading(false)
      toast('Extracurricular activities updated!')
      onSaveComplete();
    }, (error) => {
      setLoading(false)
      toast('Server Error, Please try again!')
    })
  }

  useEffect(() => {
    setCurriculumInfo({ ...curriculumInfo, extracurricularActivities: extracurricularActivitiesList })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extracurricularActivitiesList])

  useEffect(() => {
    if (curriculumInfo && curriculumInfo.extracurricularActivities && curriculumInfo.extracurricularActivities.length > 0) {
      setExtracurricularActivitiesList(curriculumInfo.extracurricularActivities)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Extracurricular Activities</h2>
      <p>Add your previous Extracurricular Activities</p>

      <div>
        {extracurricularActivitiesList.map((item, index) => (
          <div key={index} className="border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">Extracurricular Activity</label>
              <Input name='activity' placeholder='Medical Volunteer' value={item?.activity} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs">Organization</label>
                <Input name='organization' placeholder='Red Cross' value={item?.organization} onChange={(e) => handleChange(index, e)} />
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
                <Input type='date' name='startDate' value={item?.startDate} onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input type='date' name='endDate' value={item?.endDate} onChange={(e) => handleChange(index, e)} />
              </div>
              <div className="col-span-2">
                <RichTextEditor index={index} defaultValue={item?.description} onRichTextEditorChange={(e) => handleRichTextEditor(e, 'description', index)} label='Description' pageType='extracurricularActivities' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary text-primary" onClick={addNewExtracurricularActivity}>
            + Add Extracurricular Activity
          </Button>
          {extracurricularActivitiesList.length > 1 && (
            <Button variant="outline" className="border-primary text-primary" onClick={removeExtracurricularActivity}>
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
