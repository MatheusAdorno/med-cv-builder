/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { Download, Loader2, MoreVertical, Pen, Search, Trash } from "lucide-react"; // Importando o ícone de três pontos verticais
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";

export default function CurriculumCardItem({ curriculum, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(curriculum.documentId).then((resp) => {
      toast('Curriculum deleted successfully!');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      toast('Failed to delete curriculum!');
      setLoading(false);
    });
  };

  return (
    <div className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg"></div>
      <div className="absolute top-2 right-2"> {/* Posição do ícone de três pontos */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none mt-3">
              <MoreVertical size={24} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/curriculum/${curriculum.documentId}/edit`)} className="cursor-pointer gap-2">
              <Pen size={18} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-curriculum/${curriculum.documentId}/view`)} className="cursor-pointer gap-2">
              <Search size={18} /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-curriculum/${curriculum.documentId}/view`)} className="cursor-pointer gap-2">
              <Download size={18} /> Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)} className="cursor-pointer gap-2">
              <Trash size={18} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your curriculum
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" disabled={loading} onClick={onDelete}>
                {loading ? <Loader2 className="animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Link to={`/dashboard/curriculum/${curriculum.documentId}/edit`} className="flex flex-col items-center justify-center h-[240px]">
        <img src="/cv.png" alt="Curriculum Icon" width={80} height={80} className="mb-4" />
        <h2 className="text-lg font-bold text-gray-700 text-center">{curriculum.title}</h2>
      </Link>
    </div>
  );
}
