/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { BtnBold, BtnItalic, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Toolbar } from "react-simple-wysiwyg";
import { AIchatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";

const WORK_SUMMARY_PROMPT = "Position Title: {title}. Based on this professional title, please provide a 4-5 line summary in JSON format with the following keys: summary. The summary should be that effectively highlights the key responsibilities and achievements for my work experience. This text will be used directly in my CV."

const RESEARCH_DESCRIPTION_PROMPT = "Research Experience Title: ${title}. Based on this research title, please provide a 4-5 line description in JSON format with the following key: description. The description should effectively highlight the key responsibilities, methodologies used, and significant findings or contributions of my research experience. This text will be used directly in my CV."

const EXTRACURRICULAR_ACTIVITY_DESCRIPTION_PROMPT = "Extracurricular Experience Title: {activity}. Based on this extracurricular title, please provide a 4-5 line description in JSON format with the following key: description. The description should effectively highlight the key activities, skills developed, and any notable achievements or contributions of my extracurricular experience. This text will be used directly in my CV."

const RELEVANT_COURSE_DESCRIPTION_PROMPT = "Relevant Course Title: {courseName}. Based on this course title, please provide a 2-4 line summary in JSON format with the following key: description. The description should effectively highlight the key topics covered, skills gained, and any notable projects or achievements related to this course. This text will be used directly in my CV."

export default function RichTextEditor({onRichTextEditorChange, index, label, pageType, defaultValue}) {
  const [value, setValue] = useState(defaultValue || '');
  const [loading, setLoading] = useState(false)
  const {curriculumInfo, setCurriculumInfo} = useContext(CurriculumInfoContext)

  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  const GenerateWorkSummaryFromAI = async () => {
    setLoading(true)
    if (!curriculumInfo.workExperience[index].title) {
      toast('Please add a Position Title first')
      setLoading(false)
      return
    }

    const prompt = WORK_SUMMARY_PROMPT.replace("{title}", curriculumInfo.workExperience[index].title)
    const result = await AIchatSession.sendMessage(prompt)
    
    const resp = result.response.text()
    
    const jsonResponse = JSON.parse(resp); // Converte o texto para JSON
    const summary = jsonResponse.summary; // Acessa o campo "summary"
    
    setValue(summary)
    onRichTextEditorChange({ target: { value: summary } }, index);
    setLoading(false)
  }

  const GenerateResearchDescriptionFromAI = async () => {
    setLoading(true)
    if (!curriculumInfo.researchExperience[index].title) {
      toast('Please add a Research Experience Title first')
      setLoading(false)
      return
    }

    const prompt = RESEARCH_DESCRIPTION_PROMPT.replace("{title}", curriculumInfo.researchExperience[index].title)
    const result = await AIchatSession.sendMessage(prompt)
    
    const resp = result.response.text()
    
    const jsonResponse = JSON.parse(resp); // Converte o texto para JSON
    const description = jsonResponse.description; // Acessa o campo "summary"
    
    setValue(description)
    onRichTextEditorChange({ target: { value: description } }, index);
    setLoading(false)
  }

  const GenerateExtracurricularExperienceDescriptionFromAI = async () => {
    setLoading(true)
    if (!curriculumInfo.extracurricularActivities[index].activity) {
      toast('Please add a Extracurricular Experience Title first')
      setLoading(false)
      return
    }

    const prompt = EXTRACURRICULAR_ACTIVITY_DESCRIPTION_PROMPT.replace("{activity}", curriculumInfo.extracurricularActivities[index].activity)
    const result = await AIchatSession.sendMessage(prompt)
    
    const resp = result.response.text()
    
    const jsonResponse = JSON.parse(resp); // Converte o texto para JSON
    const description = jsonResponse.description; // Acessa o campo "summary"
    
    setValue(description)
    onRichTextEditorChange({ target: { value: description } }, index);
    setLoading(false)
  }

  const GenerateRelevantCourseDescriptionFromAI = async () => {
    setLoading(true)
    if (!curriculumInfo.relevantCourses[index].courseName) {
      toast('Please add a Course Name first')
      setLoading(false)
      return
    }

    const prompt = RELEVANT_COURSE_DESCRIPTION_PROMPT.replace("{courseName}", curriculumInfo.relevantCourses[index].courseName)
    const result = await AIchatSession.sendMessage(prompt)
    
    const resp = result.response.text()
    
    const jsonResponse = JSON.parse(resp); // Converte o texto para JSON
    const description = jsonResponse.description; // Acessa o campo "summary"
    
    setValue(description)
    onRichTextEditorChange({ target: { value: description } }, index);
    setLoading(false)
  }

  return (
    <div>
      <div className="flex justify-between my-2 items-end">
        <label className="text-xs">{label}</label>
        {pageType === 'workExperiences' && 
          <Button 
            variant="outline" 
            size="sm" 
            type='button' 
            className="border-primary text-primary flex gap-2"
            onClick={() => GenerateWorkSummaryFromAI()}
          >
            {loading ? 
              <LoaderCircle size={16} className="animate-spin" /> : 
              <><Brain size={16} /> Generate from AI</>
            }
              
          </Button>
        }

        {pageType === 'researchExperiences' && 
          <Button 
            variant="outline" 
            size="sm" 
            type='button' 
            className="border-primary text-primary flex gap-2"
            onClick={() => GenerateResearchDescriptionFromAI()}
          >
            {loading ? 
              <LoaderCircle size={16} className="animate-spin" /> : 
              <><Brain size={16} /> Generate from AI</>
            }
              
          </Button>
        }

        {pageType === 'extracurricularActivities' && 
          <Button 
            variant="outline" 
            size="sm" 
            type='button' 
            className="border-primary text-primary flex gap-2"
            onClick={() => GenerateExtracurricularExperienceDescriptionFromAI()}
          >
            {loading ? 
              <LoaderCircle size={16} className="animate-spin" /> : 
              <><Brain size={16} /> Generate from AI</>
            }
              
          </Button>
        }

        {pageType === 'relevantCourses' && 
          <Button 
            variant="outline" 
            size="sm" 
            type='button' 
            className="border-primary text-primary flex gap-2"
            onClick={() => GenerateRelevantCourseDescriptionFromAI()}
          >
            {loading ? 
              <LoaderCircle size={16} className="animate-spin" /> : 
              <><Brain size={16} /> Generate from AI</>
            }
              
          </Button>
        }
        
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value)
          onRichTextEditorChange(e)
        }}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
        </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}
