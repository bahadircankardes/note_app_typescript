import type { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../utils/helpers';
import NotFound from '../../components/not-found';
import { Divide, MoveLeft, Pencil, Trash } from 'lucide-react';
import Markdown from 'react-markdown'
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../redux/slices/noteSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Detail: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //url deki id yi al.
  const {id} = useParams<{id: string}>();

  //Storedan notları al.
  const {notes} = useAppSelector((store) => store.note);

  //id ye göre notu bul.
  const note = notes.find((note) => note.id === id);

  //Sil butonuna tıklanınca
  const handleDelete = () => {
    if(!confirm("Are you sure to delete this note?")) return;
    
    dispatch(deleteNote(note!.id));
    toast.success("Note deleted successfully");
    navigate("/");
  };

  //eğer not bulunamazsa 
  if(!note){
    return <NotFound />
  }

  return (
    <div className='flex flex-col gap-4'>
        {/*Üst Kısım */}
        <div className='flex justify-between sm:items-center gap-4 animate-fade-in'>
          <div className='flex items-center'>
            <Link to="/" className='p-2 rounded-full text-text-secondary hover:text-text-primary transition hover:bg-background'><MoveLeft/></Link>

            <h1 className='text-2xl font-bold text-text-primary'>Note Detail</h1>
          </div>

          <div className='flex gap-3'>
            <Link 
              to={`/edit/${id}`}
              className='flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover transition'
              >
            <Pencil className='size-5 mr-2'/> Edit
            </Link>

            <button 
            onClick={handleDelete}
            className='flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-white bg-error hover:bg-error/80 transition'>
              <Trash className='size-5 mr-2'/> Delete
            </button>
          </div>
        </div>

        {/*Note Content*/}
        <div className='card p-6 sm:p-8 animate-slide-up'>
          {/*Title*/}
          <h1 className='text-3xl font-bold mb-6 text-text-primary'>{note.title}</h1>

          {/* Tags */}
          {note.tags.map((tag, index) =>( 
          <div 
            key={index}
            className='bg-primary text-white inline-flex rounded-full text-sm py-1 px-3 me-3'
            >
            # {tag}
          </div> 
          ))}

          {/*Content*/}
          <div className='prose border-t border-border pt-6 mt-6'>
            <Markdown>
              {note.content}
            </Markdown>
          </div>
        </div>
    </div>
  )
}

export default Detail