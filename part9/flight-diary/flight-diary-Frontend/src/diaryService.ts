import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries'

const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

const createDiary = async (object: NewDiaryEntry) => {
  const response = await axios
    .post<DiaryEntry>(baseUrl, object);
  return response.data;
}

export {
  getAllDiaries,
  createDiary
}