import { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { CurriculumInfoContext } from '@/context/CurriculumInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'

function ThemeColor() {
  const colors = [
    "#000000", // Black
    "#4B4B4B", // Dark Gray
    "#1E3A8A", // Navy Blue
    "#228B22", // Forest Green
    "#800020", // Burgundy
    "#2F4F4F", // Dark Slate Gray
    "#4B0082", // Dark Purple
    "#008080", // Teal
    "#D2691E", // Chocolate
    "#556B2F", // Dark Olive Green
    "#4169E1", // Royal Blue
    "#FF7F50", // Coral
    "#4682B4", // Steel Blue
    "#32CD32", // Lime Green
    "#FF4500"  // Orange Red
];

  const { curriculumInfo, setCurriculumInfo } = useContext(CurriculumInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const { curriculumId } = useParams();
  const onColorSelect = (color) => {
    setSelectedColor(color)
    setCurriculumInfo({
      ...curriculumInfo,
      themeColor: color
    });
    const data = {
      data: {
        themeColor: color
      }
    }
    GlobalApi.UpdateCurriculumDetails(curriculumId, data)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex gap-2">
            <LayoutGrid />Theme
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
          <div className='grid grid-cols-5 gap-3'>
            {colors.map((item, index) => (
              <div key={index}
                onClick={() => onColorSelect(item)}
                className={`h-[21px] w-[21px] rounded-full cursor-pointer
                hover:border-black border transition-colors duration-200
                ${selectedColor === item ? 'border-black' : 'border-transparent'}`}
                style={{
                  background: item
                }}>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ThemeColor
