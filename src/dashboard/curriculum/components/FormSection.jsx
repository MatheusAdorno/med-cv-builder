import { Button } from "@/components/ui/button";
import PersonalDetail from "./forms/PersonalDetail";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useState } from "react";
import WorkExperiences from "./forms/WorkExperiences";
import ResearchExperiences from "./forms/ResearchExperiences";
import Education from "./forms/Education";
import ExtracurricularActivities from "./forms/ExtracurricularActivities";
import SkillsAndRelevantCourses from "./forms/SkillsAndRelevantCourses";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

export default function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [isChanged, setIsChanged] = useState(false);
  const { curriculumId } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/my-curriculum/${curriculumId}/view`);
  };

  const handleFieldChange = () => {
    setIsChanged(true);
  };

  const handleSaveComplete = () => {
    setIsChanged(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={'/dashboard'}>
            <Button><Home /></Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 &&
            <Button 
              className='flex gap-2' 
              size='sm' 
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              disabled={isChanged}
            >
              <ArrowLeft size={18}/> 
              Previous
            </Button>
          }
          {activeFormIndex < 6 &&
            <Button
              className='flex gap-2' 
              size='sm'
              onClick={() => setActiveFormIndex(activeFormIndex + 1)}
              disabled={isChanged}
            >
              Next 
              <ArrowRight size={18}/>
            </Button>
          }
          {
            activeFormIndex >= 6 &&
            <Button
              className='flex gap-2' 
              size='sm'
              onClick={handleClick}
              disabled={isChanged}
            >
              Finish
            </Button>
          }
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex === 1 && <PersonalDetail onFieldChange={handleFieldChange} onSaveComplete={handleSaveComplete} />}

      {/* Education */}
      {activeFormIndex === 2 && <Education onFieldChange={handleFieldChange} onSaveComplete={handleSaveComplete} />}

      {/* Work Experience */}
      {activeFormIndex === 3 && <WorkExperiences onFieldChange={handleFieldChange} onSaveComplete={handleSaveComplete} />}

      {/* Research Experience */}
      {activeFormIndex === 4 && <ResearchExperiences onFieldChange={handleFieldChange} onSaveComplete={handleSaveComplete} />}

      {/* Extracurricular Activities */}
      {activeFormIndex === 5 && <ExtracurricularActivities onFieldChange={handleFieldChange} onSaveComplete={handleSaveComplete} />}

      {/* Skills and Relevant Courses */}
      {activeFormIndex === 6 && <SkillsAndRelevantCourses onFieldChange={handleFieldChange} onSaveComplete={handleSaveComplete} />}
    </div>
  );
}
