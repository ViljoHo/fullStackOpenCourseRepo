import express, { NextFunction, Request, Response } from 'express';
import patientsService from '../services/patientsService';
import { NewEntrySchema, NewPatientSchema } from '../utils';
import { z } from 'zod';
import { NewPatient, Patient, NewEntry, Entry, NewEntryParams } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientsInfo());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'patient not found' });
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {

  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/:id/entries', newEntryParser, (req: Request<NewEntryParams, unknown, NewEntry>, res: Response<Entry>) => {
  const addedEntry = patientsService.addEntry(req.params.id, req.body);
  res.json(addedEntry);

});


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};


router.use(errorMiddleware);

export default router;