import { Search } from 'lucide-react'
import React, { type FC } from 'react'
import ReactSelect from 'react-select'
import { selectStyles } from '../../constants'
import { useAppSelector } from '../../utils/helpers'

interface Props {
  title:string;
  tags: string[];
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filter:FC <Props> = ({title,tags,setTitle,setTags}) => {

  const {notes} = useAppSelector((store) => store.note);
  const uniqueTags = [...new Set(notes.map((note) => note.tags).flat())]

  return (
    <div className='card mb-8 p-5'>
      <div className='flex flex-col md:flex-row gap-4 items-start'>
        {/*Title Input*/}
        <div className='flex-1 w-full md:w-auto'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary'>
            <Search className='size-5'/>
            </div>
            <input 
            type="text" 
            placeholder='Search notes...'
            className='pl-10 pr-4 py-2.5 w-full rounded-md border border-border text-shadow-text-primary bg-card placeholder:text-text-secondary focus:outline focus:ring-2 focus:ring-primary transition-all'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        {/*Tag Input*/}
        <div className='w-full'>
          <ReactSelect 
            isMulti
            styles={selectStyles}
            placeholder='Filter by tags...'
            value={tags.map((tag) => ({value: tag, label: tag}))}
            options={uniqueTags.map((tag) => ({value: tag, label: tag}))}
            onChange={(tags) => setTags(tags.map((tag) => tag.value))}
            />
        </div>
      </div>
    </div>
  )
}

export default Filter