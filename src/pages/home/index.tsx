import type { FC } from 'react'
import { useAppSelector } from '../../utils/helpers'
import Head from '../../components/home/head'
import Filter from '../../components/home/filter'
import Total from '../../components/home/total'
import List from '../../components/home/list'
import { useState } from 'react'

const Home: FC = () => {
  const [title,setTitle] = useState<string>("");
  const [tags,setTags] = useState<string[]>([]);

  const {notes} = useAppSelector((store) => store.note);

  //seçili title ve etiketlere göre notları filtrele
  const filteredNotes = notes.filter((note)=>{
    //başlık filtreleme
    const titleFilter = note.title.toLowerCase().includes(title.toLowerCase())
    //etiket filtreleme
    const tagsFilter = tags.every((tag)=> note.tags.includes(tag))

    return titleFilter && tagsFilter;
  })

  return (
    <>
      <Head />
      <Filter title={title} setTitle={setTitle} tags={tags} setTags={setTags} />
      <List notes={filteredNotes} />
      <Total filteredCount={filteredNotes.length} totalCount={notes.length}/>
    </>
  )
}

export default Home