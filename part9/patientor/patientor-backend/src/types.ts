import { z } from 'zod';
import { NewPatientSchema } from './utils';
import { ParamsDictionary } from 'express-serve-static-core';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum healthCheckRating {
  "Healty" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: healthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }

}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }

}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T,K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export interface NewEntryParams extends ParamsDictionary {
  id: string;
}


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;


