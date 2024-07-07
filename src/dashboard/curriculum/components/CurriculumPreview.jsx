/* eslint-disable no-unused-vars */
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext"
import { useContext } from "react"
import PersonalDetailPreview from "./preview/PersonalDetailPreview"
import EducationPreview from "./preview/EducationPreview"
import WorkExperiencePreview from "./preview/WorkExperiencePreview"
import ResearchExperiencePreview from "./preview/ResearchExperiencesPreview"
import ExtracurricularActivityPreview from "./preview/ExtracurricularActivityPreview"
import SkillsAndRelevantCoursesPreview from "./preview/SkillsAndRelevantCoursesPreview"

export default function CurriculumPreview() {
  const { curriculumInfo, setCurriculumInfo } = useContext(CurriculumInfoContext)
  return (
    <div 
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{borderColor: curriculumInfo?.themeColor}}
    >
      {/* Personal Detail */}
      <div className="avoid-page-break ">
        <PersonalDetailPreview curriculumInfo={curriculumInfo} />
      </div>
      
      {/* Education */}
      <div>
        <EducationPreview curriculumInfo={curriculumInfo} />
      </div>

      {/* Work Experience */}
      <div>
        <WorkExperiencePreview curriculumInfo={curriculumInfo} />
      </div>

      {/* Research Experience */}
      <div>
        <ResearchExperiencePreview curriculumInfo={curriculumInfo} />
      </div>

      {/* Extracurricular Activities */}
      <div>
        <ExtracurricularActivityPreview curriculumInfo={curriculumInfo} />
      </div>

      {/* Skills and Relevant Courses */}
      <div>
        <SkillsAndRelevantCoursesPreview curriculumInfo={curriculumInfo} />
      </div>
    </div>
  )
}
