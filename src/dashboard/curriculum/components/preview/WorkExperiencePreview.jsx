/* eslint-disable react/prop-types */
import { format, addMinutes } from 'date-fns';

function formatDate(date) {
  if (!date) return ''; // Verifica se a data é válida
  try {
    const inputDate = new Date(date);
    // Ajuste a data para UTC
    const utcDate = addMinutes(inputDate, inputDate.getTimezoneOffset());
    const formattedDate = format(utcDate, 'MMM yyyy');
    
    return formattedDate;
  } catch (error) {
    console.error("Invalid date format", error);
    return date; // Retorna a data original se houver um erro
  }
}

export default function WorkExperiencePreview({ curriculumInfo }) {
  // Verifique se curriculumInfo existe e se workExperience é um array
  const workExperience = curriculumInfo?.workExperience || [];

  return (
    <div className="my-6">
      {workExperience.length > 0 && workExperience[0]?.title !== '' && (
        <>
          <h2 
            className="text-center font-bold text-sm mb-2"
            style={{color: curriculumInfo?.themeColor}}
          >
            Work Experiences
          </h2>
          <hr 
            className="border-[1.5px] my-2"
            style={{borderColor: curriculumInfo?.themeColor}}
          />

          {workExperience.map((experience, index) => (
            // Verifique se experience existe antes de renderizar
            experience ? (
              <div key={index} className="my-5 avoid-page-break">
                <h2 
                  className="text-sm font-bold" 
                  style={{color: curriculumInfo?.themeColor}}
                >
                  {experience?.title}
                </h2>
                <h2 className="text-xs flex justify-between">
                  <div className="max-w-[400px]">
                    {experience?.local}<span> </span> 
                    {experience.city ? ' - ' : ''}{experience?.city}{experience.state ? ',' : ''}<span> </span> 
                    {experience?.state}{experience.country ? ',' : ''}<span> </span> 
                    {experience?.country} 
                  </div>
                  {formatDate(experience?.startDate)} {experience?.startDate ? ' - ' : ''} {experience?.startDate && experience?.endDate === '' ? 'Present' : formatDate(experience?.endDate)}          
                </h2>
                {/* <p className="text-xs my-2">{experience?.workSummary}</p> */}
                <div className="text-xs my-2" dangerouslySetInnerHTML={{__html: experience?.workSummary}} />
              </div>
            ) : null // Retorne null se experience for undefined
          ))}
        </>
      )}
    </div>
  );
}
