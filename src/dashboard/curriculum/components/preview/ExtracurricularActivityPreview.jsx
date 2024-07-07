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

export default function ExtracurricularActivityPreview({ curriculumInfo }) {
  // Verifique se curriculumInfo existe e se extracurricularActivities é um array
  const extracurricularActivities = curriculumInfo?.extracurricularActivities || [];

  return (
    <div className="my-6">
      {extracurricularActivities.length > 0 && extracurricularActivities[0]?.activity !== '' && (
        <>
          <h2 
            className="text-center font-bold text-sm mb-2"
            style={{color: curriculumInfo?.themeColor}}
          >
            Extracurricular Activities
          </h2>
          <hr 
            className="border-[1.5px] my-2"
            style={{borderColor: curriculumInfo?.themeColor}}
          />

          {extracurricularActivities.map((activity, index) => (
            // Verifique se activity existe antes de renderizar
            activity ? (
              <div key={index} className="my-5 avoid-page-break">
                <h2 
                  className="text-sm font-bold" 
                  style={{color: curriculumInfo?.themeColor}}
                >
                  {activity.activity}
                </h2>
                <h2 className="text-xs flex justify-between">
                  <div className="max-w-[400px]">
                    {activity.organization}<span> </span> 
                    {activity.city ? ' - ' : ''}{activity.city}{activity.state ? ',' : ''}<span> </span> 
                    {activity.state}{activity.country ? ',' : ''}<span> </span> 
                    {activity.country}
                  </div>
                  {formatDate(activity.startDate)} {activity.startDate ? ' - ' : ''} {activity.startDate && activity.endDate === '' ? 'Present' : formatDate(activity.endDate)}
                </h2>
                <p className="text-xs my-2">{activity.description}</p>
              </div>
            ) : null // Retorne null se activity for undefined
          ))}
        </>
      )}
    </div>
  )
}
