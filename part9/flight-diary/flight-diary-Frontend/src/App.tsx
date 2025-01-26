import { useState, useEffect } from "react"
import { DiaryEntry, NewDiaryEntry } from "./types"
import { getAllDiaries, createDiary } from "./diaryService"
import DiaryEntryInfo from "./components/DiaryEntryInfo"
import DiaryEntryForm from "./components/DiaryEntryForm"
import axios from "axios"



const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null)

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  })

  const addNewDiary = async (newDiaryEntryObj: NewDiaryEntry) => {
    
    try {
      const addedDiary = await createDiary(newDiaryEntryObj)
      setDiaries(diaries.concat(addedDiary))
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotificationMsg(error.response?.data)
        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000)
      }
      
    }
  }

  return (
    <div>
      <DiaryEntryForm addNewDiary={addNewDiary} notificationMsg={notificationMsg} />
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <DiaryEntryInfo key={diary.id} diaryEntry={diary}/>
      ))}
    </div>
  )
}

export default App
