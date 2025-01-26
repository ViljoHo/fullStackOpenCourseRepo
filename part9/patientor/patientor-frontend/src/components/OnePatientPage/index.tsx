import { Box, Typography } from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Diagnosis, NewEntry, Patient } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import NewHealtCheckForm from "./NewHealtCheckForm";
import Notification from "../Notification";
import axios from "axios";

interface Props {
  id: string | undefined;
  diagnoses: Diagnosis[];
}


const OnePatientPage = ({ id, diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  useEffect(() => {

    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getById(id);
        setPatient(patient);
      }
    };
    void fetchPatient();

  }, [id]);

  if (patient === null || patient === undefined) {
    return (
      <div>
        patient not found
      </div>
    );
  }

  const addNewEntry = async (newEntry: NewEntry) => {


    try {
      const addedEntry =  await patientService.createEntry(patient.id ,newEntry);
      const patientWithNewEntry: Patient = {
        ...patient,
        entries: patient.entries.concat(addedEntry)
      };
      setPatient(patientWithNewEntry);

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setNotificationMsg(error.response?.data.error[0].message);
        setTimeout(() => {
          setNotificationMsg(null);
        }, 5000);
      }
    }

  };

  return (
    <div className="App">
      <Box sx={{marginTop: "1em"}}>
        <Typography variant="h3">
          {patient?.name}
          {patient.gender === 'female' && <Female />}
          {patient.gender === 'male' && <Male />}
        </Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>

        <Notification notificationMsg={notificationMsg} />

        <NewHealtCheckForm addNewEntry={addNewEntry}/>

        <Typography variant="h6" fontWeight={'fontWeightBold'} gutterBottom sx={{marginTop: '1em'}}>entries</Typography>

        {patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}


      </Box>
    </div>
  );
};

export default OnePatientPage;