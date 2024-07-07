import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext";
import CurriculumPreview from "@/dashboard/curriculum/components/CurriculumPreview";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";
import { Download, LoaderCircle } from "lucide-react";
import { useReactToPrint } from "react-to-print";

export default function ViewResume() {
  const [curriculumInfo, setCurriculumInfo] = useState();
  const [loadingCurriculumInfo, setLoadingCurriculumInfo] = useState(true);
  const { curriculumId } = useParams();
  const printRef = useRef();

  const GetCurriculumInfo = async () => {
    setLoadingCurriculumInfo(true);
    await GlobalApi.GetCurriculumById(curriculumId).then(resp => {
      setCurriculumInfo(resp.data.data);
    });
    setLoadingCurriculumInfo(false);
  }

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    GetCurriculumInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurriculumInfoContext.Provider value={{curriculumInfo, setCurriculumInfo}} >
      <div id="no-print">
        <Header />
      </div>
      {loadingCurriculumInfo ? (
        <div className="flex justify-center items-center w-full h-screen pb-32">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        <>
          <div id="no-print">
            <div className="my-10 mx-10 md:mx-20 lg:mx-36">
              <h2 className="text-center text-2xl font-medium">Congratulations! Your curriculum is complete and ready to use!</h2>
              <p className="text-center text-gray-500">Now you are ready to download your curriculum. You can also share your unique curriculum URL with peers, professors, and potential employers, and use it to apply for clerkships and other opportunities to showcase your achievements and qualifications.</p>
              <div className="lg:px-32">
                <div className="flex justify-center my-10"> 
                  <Button onClick={handlePrint} className="flex gap-2 items-center justify-center">
                    <Download size={18} />Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div id='print-area' className="my-10 mx-10 md:mx-20 lg:px-48 min-w-[600px]">
            <div ref={printRef}>
              <CurriculumPreview />
            </div>
          </div>
        </>
      )}
    </CurriculumInfoContext.Provider>
  )
}
