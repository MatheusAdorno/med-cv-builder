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

export default function ResearchExperiencePreview({ curriculumInfo }) {
  // Verifique se curriculumInfo existe e se researchExperience é um array
  const researchExperience = curriculumInfo?.researchExperience || [];

  return (
    <div className="my-6">
      {researchExperience.length > 0 && researchExperience[0]?.title !== '' && (
        <>
          <h2 
            className="text-center font-bold text-sm mb-2"
            style={{color: curriculumInfo?.themeColor}}
          >
            Research Experiences
          </h2>
          <hr 
            className="border-[1.5px] my-2"
            style={{borderColor: curriculumInfo?.themeColor}}
          />

          {researchExperience.map((research, index) => (
            // Verifique se research existe antes de renderizar
            research ? (
              <div key={index} className="my-5 avoid-page-break">
                <h2 
                  className="text-sm font-bold" 
                  style={{color: curriculumInfo?.themeColor}}
                >
                  {research?.title}
                </h2>
                <h2 className="text-xs flex justify-between">
                  <div className="max-w-[400px]">
                    {research?.institution}<span> </span> 
                    {research.city ? ' - ' : ''}{research?.city}{research.state ? ',' : ''}<span> </span> 
                    {research?.state}{research.country ? ',' : ''}<span> </span> 
                    {research?.country} 
                  </div>
                  {formatDate(research?.startDate)} {research?.startDate ? ' - ' : ''} {research?.startDate && research?.endDate === '' ? 'Present' : formatDate(research?.endDate)}
                </h2>
                <p className="text-xs my-2">{research?.description}</p>
              </div>
            ) : null // Retorne null se research for undefined
          ))}
        </>
      )}
    </div>
  );
}
