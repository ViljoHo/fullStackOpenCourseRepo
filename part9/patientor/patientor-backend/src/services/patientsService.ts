import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import { NonSensitivePatientInfo, Patient, NewPatient, NewEntry, Entry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const getNonSensitivePatientsInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(( {id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newId = uuid();
  const newPatient = {
    id: newId,
    entries: [],
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
  
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newId = uuid();
  const newEntry = {
    id: newId,
    ...entry
  };

  const thePatient = patients.find(patient => patient.id === id);

  thePatient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatientsInfo,
  getPatientById,
  addEntry
};