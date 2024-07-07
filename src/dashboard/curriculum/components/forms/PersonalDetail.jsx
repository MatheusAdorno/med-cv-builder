/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext"
import { LoaderCircle } from "lucide-react"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import GlobalApi from "./../../../../../service/GlobalApi"
import { toast } from "sonner"

// eslint-disable-next-line react/prop-types
export default function PersonalDetail({ onFieldChange, onSaveComplete }) {
  const params = useParams()
  const { curriculumInfo, setCurriculumInfo } = useContext(CurriculumInfoContext)
  const [formData, setFormData] = useState()
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setCurriculumInfo({ ...curriculumInfo, [name]: value })
    onFieldChange();
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      data: formData
    }
    GlobalApi.UpdateCurriculumDetails(params?.curriculumId, data).then(resp => {
      setLoading(false)
      toast('Personal details updated')
      onSaveComplete();
    }, (error) => {
      setLoading(false)
    })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Start by entering your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name='firstName' defaultValue={curriculumInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name='lastName' required defaultValue={curriculumInfo?.lastName} onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Professional Title</label>
            <Input name='professionalTitle' required defaultValue={curriculumInfo?.professionalTitle} onChange={handleInputChange} placeholder="Medical Student" />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name='address' required defaultValue={curriculumInfo?.address} onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name='phone' required defaultValue={curriculumInfo?.phone} onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name='email' required defaultValue={curriculumInfo?.email} onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type='submit' disabled={loading}>{loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Save'}</Button>
        </div>
      </form>
    </div>
  )
}
