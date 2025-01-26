import { DiaryEntry } from "../types"

interface Props {
  diaryEntry: DiaryEntry;
}


const DiaryEntryInfo = ({ diaryEntry }: Props) => {
  return (
    <div>
      <h4>{diaryEntry.date}</h4>
      <p>visibility: {diaryEntry.visibility}</p>
      <p>weather: {diaryEntry.weather}</p>
      <p>comment: {diaryEntry.comment}</p>
      <br></br>
    </div>
  )
}

export default DiaryEntryInfo