/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { CurriculumInfoContext } from "@/context/CurriculumInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formField = () => ({
  title: '',
  institution: '',
  city: '',
  state: '',
  country: '',
  startDate: '',
  endDate: '',
  description: ''
});

export default function ResearchExperiences({ onFieldChange, onSaveComplete }) {
  const { curriculumInfo, setCurriculumInfo } = useContext(CurriculumInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [researchExperiencesList, setResearchExperiencesList] = useState([formField()]);

  const handleChange = (index, e) => {
    const newEntries = [...researchExperiencesList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setResearchExperiencesList(newEntries);
    onFieldChange();
  };

  const addNewResearchExperience = () => {
    setResearchExperiencesList([...researchExperiencesList, formField()]);
    onFieldChange();
  };
  
  const removeResearchExperience = () => {
    setResearchExperiencesList(researchExperience => researchExperience.slice(0, -1));
    onFieldChange();
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...researchExperiencesList];
    newEntries[index][name] = e.target.value;
    setResearchExperiencesList(newEntries);
    onFieldChange();
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        researchExperience: researchExperiencesList.map(({ id, ...rest }) => rest)
      }
    };

    GlobalApi.UpdateCurriculumDetails(params?.curriculumId, data).then(resp => {
      setLoading(false);
      toast('Research experiences updated!');
      onSaveComplete();
    }, (error) => {
      setLoading(false);
      toast('Server Error, Please try again!');
    });
  };

  useEffect(() => {
    setCurriculumInfo({ ...curriculumInfo, researchExperience: researchExperiencesList });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [researchExperiencesList]);

  useEffect(() => {
    if (curriculumInfo && curriculumInfo.researchExperience && curriculumInfo.researchExperience.length > 0) {
      setResearchExperiencesList(curriculumInfo.researchExperience);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Research Experiences</h2>
      <p>Add your previous Research Experiences</p>

      <div>
        {researchExperiencesList.map((item, index) => (
          <div key={index} className="border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">Research Experience Title</label>
              <Input placeholder='Scientific Project on Transcranial Stimulation' name='title' defaultValue={item?.title} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs">Institution</label>
                <Input name='institution' defaultValue={item?.institution} onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input name='city' defaultValue={item?.city} onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input name='state' defaultValue={item?.state} onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Country</label>
                <Input name='country' defaultValue={item?.country} onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input type='date' name='startDate' defaultValue={item?.startDate} onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input type='date' name='endDate' defaultValue={item?.endDate} onChange={(e) => handleChange(index, e)} />
              </div>
              <div className="col-span-2">
                <RichTextEditor index={index} defaultValue={item?.description} onRichTextEditorChange={(e) => handleRichTextEditor(e, 'description', index)} label='Description' pageType='researchExperiences' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary text-primary" onClick={addNewResearchExperience}>
            + Add Research Experience
          </Button>
          {researchExperiencesList.length > 1 && (
            <Button variant="outline" className="border-primary text-primary" onClick={removeResearchExperience}>
              - Remove
            </Button>
          )}
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle size={16} className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}
