import { useEffect, useState } from "react"
import FormSection from "../../components/FormSection"
import CurriculumPreview from "../../components/CurriculumPreview"
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext"
import GlobalApi from "./../../../../../service/GlobalApi"
import { useParams } from "react-router-dom"
import { LoaderCircle } from "lucide-react"

export default function EditCurriculum() {
  const params = useParams()
  const [loadingCurriculumInfo, setLoadingCurriculumInfo] = useState(true)
  const [curriculumInfo, setCurriculumInfo] = useState()

  useEffect(() => {
    GetCurriculumInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const GetCurriculumInfo = async () => {
    setLoadingCurriculumInfo(true)
    await GlobalApi.GetCurriculumById(params?.curriculumId).then(resp => {
      setCurriculumInfo(resp.data.data)
    })
    setLoadingCurriculumInfo(false)
  }

  return (
    <CurriculumInfoContext.Provider value={{curriculumInfo, setCurriculumInfo}}>
      {!loadingCurriculumInfo ?
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
          {/* Form Section */}
          <FormSection />

          {/* Preview Section */}
          <CurriculumPreview />       
      </div> :
      <div className="flex justify-center items-center w-full h-screen pb-32">
        <LoaderCircle className="animate-spin" />
      </div>
      }
    </CurriculumInfoContext.Provider>
  )
}
