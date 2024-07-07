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

export default function SkillsAndRelevantCoursesPreview({curriculumInfo}) {
  return (
    <div className="my-6">
      {((curriculumInfo?.skills?.[0]?.name && curriculumInfo.skills[0].name !== '') || 
        (curriculumInfo?.relevantCourses?.[0]?.courseName && curriculumInfo.relevantCourses[0].courseName !== '')) && (
        <>
          <h2 
          className="text-center font-bold text-sm mb-2"
          style={{color: curriculumInfo?.themeColor}}
          >
            {(curriculumInfo?.skills[0].name !== '' && curriculumInfo?.relevantCourses[0].courseName !== '') && 'Skills and Relevant Courses'}

            {(curriculumInfo?.skills[0].name !== '' && curriculumInfo?.relevantCourses[0].courseName === '') && 'Skills'}

            {(curriculumInfo?.skills[0].name === '' && curriculumInfo?.relevantCourses[0].courseName !== '') && 'Relevant Courses'}
            
          </h2>
          <hr 
            className="border-[1.5px] my-2"
            style={{borderColor: curriculumInfo?.themeColor}}
          />

          {
            curriculumInfo?.skills[0].name !== '' && (
              <div className="avoid-page-break">
                {(curriculumInfo?.relevantCourses && curriculumInfo?.relevantCourses[0].courseName !== '') && (
                   <p className="text-sm font-bold mt-4 my-2">Skills</p>
                )}

                {(curriculumInfo?.relevantCourses[0].courseName === '' || curriculumInfo?.relevantCourses[0].courseName === undefined ) && (
                   <div className='pt-3' />
                )}

                <div className="grid grid-cols-2 gap-3">
                  {curriculumInfo?.skills?.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <h2 
                        className="text-xs"
                      >
                        {skill?.name}
                      </h2>
                      {skill.name  && (
                        <div className="h-2 bg-gray-200 w-[120px]">
                          <div 
                            className="h-2"
                            style={{width: skill?.rating*20+'%', backgroundColor: curriculumInfo?.themeColor}}
                          >
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          }
          
          {
            curriculumInfo?.relevantCourses[0].courseName !== '' && (
              <div>
                {(curriculumInfo?.skills && curriculumInfo?.skills[0].name !== '') && (
                   <p className="text-sm font-bold mt-4 my-2">Relevant Courses</p>
                )}

                {curriculumInfo?.relevantCourses?.map((course, index) => (
                  <div key={index} className="mt-2 mb-5 avoid-page-break">
                    <h2 
                      className="text-sm font-bold" 
                      style={{color: curriculumInfo?.themeColor}}
                    >
                      {course?.courseName}
                    </h2>
                    <h2 className="text-xs flex justify-between">
                      <div className="max-w-[400px]">
                        {course?.institution}
                      </div>
                      <span>{formatDate(course?.date)}</span>
                    </h2>
                    <p className="text-xs my-2">{course?.description}</p>
                  </div>
                ))}
              </div>
            )
          }
        </>
      )}
    </div>
  )
}
