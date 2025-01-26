import React from "react"
import { useState } from "react"
import { NewDiaryEntry } from "../types";

interface Props {
  addNewDiary: (newDiaryEntryObj: NewDiaryEntry) => void;
  notificationMsg: string | null;
}

const DiaryEntryForm = ({ addNewDiary, notificationMsg }: Props) => {
  const [newDate, setNewDate] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newComment, setNewComment] = useState('')


  const createDiary = async (event: React.SyntheticEvent ) => {
    event.preventDefault()

    const newDiary = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }
    
    addNewDiary(newDiary)
    setNewDate('')
    setNewComment('')
  }


  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{color: 'red'}}>{notificationMsg}</p>
      <form onSubmit={createDiary}>
        <div>
          date: <input
          type="date"
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          visibility:
          good 
          <input
          type="radio"
          name="visibility" 
          onChange={() => setNewVisibility('good')}
          />
          ok 
          <input
          type="radio"
          name="visibility" 
          onChange={() => setNewVisibility('ok')}
          />
          poor
          <input
          type="radio"
          name="visibility" 
          onChange={() => setNewVisibility('poor')}
          />
        </div>
        <div>
          weather: 
          sunny
          <input
          type="radio"
          name="weather" 
          onChange={() => setNewWeather('sunny')}
          />
          rainy
          <input
          type="radio"
          name="weather" 
          onChange={() => setNewWeather('rainy')}
          />
          cloudy
          <input
          type="radio"
          name="weather" 
          onChange={() => setNewWeather('cloudy')}
          />
          stormy
          <input
          type="radio"
          name="weather" 
          onChange={() => setNewWeather('stormy')}
          />
          windy
          <input
          type="radio"
          name="weather" 
          onChange={() => setNewWeather('windy')}
          />
        </div>
        <div>
          comment: <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <button>add</button>

      </form>
    </div>
  )
}

export default DiaryEntryForm