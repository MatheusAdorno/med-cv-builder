import { Mail, Phone } from "lucide-react";

/* eslint-disable react/prop-types */
export default function PersonalDetailPreview({curriculumInfo}) {
  return (
    <div>
      <h2 
        className="font-bold text-xl text-center"
        style={{color: curriculumInfo?.themeColor}}
      >
        {curriculumInfo?.firstName} {curriculumInfo?.lastName}
      </h2>
      <h2 
        className="text-center text-sm font-medium"
        style={{color: curriculumInfo?.themeColor}}
      >
        {curriculumInfo?.professionalTitle}
      </h2>
      <h2 
        className="text-center font-normal text-xs mt-1"
        style={{color: curriculumInfo?.themeColor}}
      >
        {curriculumInfo?.address}
      </h2>

      <div className="flex justify-between mt-1">
        <h2 
          className="font-normal text-xs flex gap-1 items-center justify-center" 
          style={{color: curriculumInfo?.themeColor}}
        >
          {curriculumInfo?.phone ? <Phone size={12} /> : ''}
          {curriculumInfo?.phone}
        </h2>
        <h2 
          className="font-normal text-xs flex gap-1 items-center justify-center" 
          style={{color: curriculumInfo?.themeColor}}
        >
          {curriculumInfo?.email ? <Mail size={12} /> : ''}
          {curriculumInfo?.email}
        </h2>
      </div>
    </div>
  )
}
