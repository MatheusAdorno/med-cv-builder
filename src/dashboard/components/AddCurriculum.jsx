import { Loader2, PlusSquare } from "lucide-react";
import GlobalApi from "./../../../service/GlobalApi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


export default function AddCurriculum() {
  const [openDialog, setOpenDialog] = useState(false)
  const [curriculumTitle, setCurriculumTitle] = useState()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()

  const { user } = useUser()

  const onCreateCurriculum = async () => {
    setLoading(true)

    const uuid = uuidv4()
    const data = {
      data: {
        title: curriculumTitle,
        curriculumId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
      }
    }
    
    GlobalApi.CreateNewCurriculum(data).then(resp => {
      if(resp) {
        setOpenDialog(false)
        navigation(`/dashboard/curriculum/${resp.data.data.documentId}/edit`)
      }
    }
    // eslint-disable-next-line no-unused-vars
    ), (error) => {setLoading(false)}
  }

  return (
    <div>
      <div className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[290px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
      onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Curriculum</DialogTitle>
            <DialogDescription>
              Add a title for your new curriculum
              <Input className="my-2" placeholder="Ex: My First Curriculum" onChange={(e) => setCurriculumTitle(e.target.value)} />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button disabled={!curriculumTitle || loading} onClick={onCreateCurriculum}>
                {loading ? <Loader2 className="animate-spin" /> : 'Create' }
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}
