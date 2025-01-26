import { NewPatient, Gender, healthCheckRating } from "./types";
import { z } from "zod";

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const parseName = (name: unknown): string => {
//   if (!isString(name)) {
//     throw new Error('Incorrect or missing name');
//   }
//   return name;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDateOfBirth = (dateOfBirth: unknown): string => {
//   if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
//     throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
//   }
//   return dateOfBirth;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!isString(ssn)) {
//     throw new Error('Incorrect or missing ssn');
//   }
//   return ssn;
// };


// const parseOccupation = (occupation: unknown): string => {
//   if (!isString(occupation)) {
//     throw new Error('Incorrect or missing ssn');
//   }
//   return occupation;
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender).map(g => g.toString()).includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//     throw new Error('Incorrect or missing gender: ' + gender);
//   }
//   return gender;
// };

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};




const BaseNewEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const NewHealthCheckEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(healthCheckRating),
});

const NewOccupationalHealthcareEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }).optional()
});

const NewHospitalEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  })
});

export const NewEntrySchema = z.union([
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
]);



export default toNewPatient;