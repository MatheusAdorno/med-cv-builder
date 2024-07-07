/* eslint-disable react/prop-types */
import { addMinutes, format } from "date-fns";

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

export default function EducationPreview({ curriculumInfo }) {
  // Verifique se curriculumInfo existe e se education é um array
  const education = curriculumInfo?.education || [];

  return (
    <div className="my-6">
      {education.length > 0 && education[0]?.universityName !== '' && (
        <>
          <h2 
            className="text-center font-bold text-sm mb-2"
            style={{color: curriculumInfo?.themeColor}}
          >
            Education
          </h2>
          <hr 
            className="border-[1.5px] my-2"
            style={{borderColor: curriculumInfo?.themeColor}}
          /> 

          {education.map((edu, index) => (
            // Verifique se edu existe antes de renderizar
            edu ? (
              <div key={index} className="my-5 avoid-page-break">
                <h2 
                  className="text-sm font-bold" 
                  style={{color: curriculumInfo?.themeColor}}
                >
                  {edu?.universityName}
                </h2>
                <h2 className="text-xs flex justify-between">
                  {edu?.degree}
                  <span>
                    {formatDate(edu?.startDate)} {edu?.startDate ? ' - ' : ''} {edu?.startDate && edu?.endDate === '' ? 'Present' : formatDate(edu?.endDate)}
                  </span>
                </h2>
              </div>
            ) : null // Retorne null se edu for undefined
          ))}
        </>
      )}
    </div>
  );
}
