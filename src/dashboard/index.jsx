import { useUser } from "@clerk/clerk-react";
import AddCurriculum from "./components/AddCurriculum";
import GlobalApi from "./../../service/GlobalApi";
import { useEffect, useState } from "react";
import CurriculumCardItem from "./components/CurriculumCardItem";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser()
  const [curriculumList, setCurriculumList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (user) {
      GetCurriculaList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  /**
   * Used to Get Users Curricula List
   */
  const GetCurriculaList = async () => {
    await GlobalApi.GetUserCurriculum(user?.primaryEmailAddress?.emailAddress).then(resp => {
      setCurriculumList(resp.data.data)
    })
    setLoading(false)
  }

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Curriculum</h2>
      <p>Start Creating AI curriculum for your next Clerkship</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddCurriculum />
        {
          loading ? 
          <Loader2 className="m-auto animate-spin" /> : 
          curriculumList.length > 0 && curriculumList?.map((curriculum, index) => (
            <CurriculumCardItem curriculum={curriculum} key={index} refreshData={GetCurriculaList} />
          ))
        }
      </div>
    </div>
  )
}
