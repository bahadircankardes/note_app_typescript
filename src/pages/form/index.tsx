import type { FC, FormEvent } from 'react'
import { useEffect, useState } from 'react';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { mdeOptions, selectStyles } from '../../constants';
import ReactSelect from 'react-select/creatable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../utils/helpers';
import type { NoteValues } from '../../types';
import { addNote, updateNote } from '../../redux/slices/noteSlice';
import { toast } from 'react-toastify';






const Form: FC = () => {

  const {id} = useParams<{id: string}>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //Stora abone oluyorum.
  const {notes} = useAppSelector((store) => store.note);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Düzenleme modundaysak notun bilgilerini state e aktar
  useEffect(()=>{
    if (id) {
      const editNote = notes.find((note)=>note.id===id);
      setTitle(editNote!.title);
      setContent(editNote!.content);
      setSelectedTags(editNote!.tags);
    } else {
      setTitle("");
      setContent("");
      setSelectedTags([]);
    }


    
  },[id, notes])

  // Tüm notların etiketlerini al
  const tags = [...new Set(notes.map((note) => note.tags).flat())];
  console.log(tags);

  //Form Gönderilince
const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
 
  //form verisini nesne formatına getirdik.
  const values : NoteValues = {title, content, tags:selectedTags};

  if (id) {
    dispatch(updateNote({id,values}))
    toast.success("Note updated successfully");
    navigate("/");

  }else
  {
    //Reducer'a haber ver
  dispatch(addNote(values));

  //Toast mesajı
  toast.success("Note created successfully");

  //Ana sayfaya yönlendir
  navigate("/");
  }

  
}

  return (
    <div>
      {/*Sayfa Başlığı */}
        <div>
          <h1 className='text-2xl font-bold text-text-primary'>{id? "Edit Note" : "Create New Note"}
          </h1>
          <p className='text-text-secondary'>
            {id? "Edit your note" : "Create a new note to organize your thoughts and ideas."}
          </p>
        </div>  
        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className='card p-6 sm:p-8 animate-slide-up mt-6'>
          {/* Başlık Alanı */}
          <div className='mb-6'>
            <label htmlFor="title" className='label'>
              Title:
            </label>
            <input 
            type="text" id="title" 
            className='w-full px-4 py-2.5 bg-card border border-border rounded-md text-text-primary focus:ring-2 focus:ring-primary/30 transition' 
            placeholder='Enter your note title'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* İçerik Alanı */}
          <div className='mb-6'>
            <label htmlFor="content" className='label'>
              Content:
            </label>
            <SimpleMde 
            id='content'
            options={mdeOptions} 
            className='w-full markdown-editor bg-transparent'
            value={content}
            onChange={(value) => setContent(value)}
            />
          </div>
          {/* Tag Alanı */}
          <div className='mb-6'>
            <label htmlFor="tags" className='label'>
              Tags:
            </label>
            <ReactSelect 
            styles={selectStyles}
            isMulti 
            className='text-black'
            value={selectedTags.map((t) => ({value: t, label: t}))}
            options={tags.map((tag) => ({value: tag, label: tag}))}
            onChange={(tags) => setSelectedTags(tags.map((tag) => tag.value))} />
          </div>
          
          {/*Buttonlar*/}
          <div className='flex flex-col md:flex-row gap-3 pt-4 border-t border-border'>
            <Link to="/" className="form-button">
              <X className="size-4 mr.1.5"/>
              Cancel
            </Link>

            <button className="form-button bg-primary hover:bg-primary-hover">
              <Check className="size-4 mr.1.5"/>
              Save
            </button>
          </div>

        </form>
      </div>

      
  )
}

export default Form