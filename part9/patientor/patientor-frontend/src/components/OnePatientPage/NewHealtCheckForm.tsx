import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
//import { Diagnosis } from "../../types";
import { healthCheckRating as HCR, NewEntry } from "../../types";

interface Props {
  addNewEntry: (entry: NewEntry) => void;
}

const NewHealtCheckForm = ({ addNewEntry }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  //const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log('lähettää');
    // console.log(description);
    // console.log(date);
    // console.log(specialist);
    // console.log(healthCheckRating);
    // console.log(diagnosisCodes);

    const diagnosisCodesArray = diagnosisCodes.split(', ');


    const newEntry: NewEntry = {
      date: date,
      type: "HealthCheck",
      specialist: specialist,
      diagnosisCodes: diagnosisCodesArray,
      description: description,
      healthCheckRating: HCR.Healty
    };

    //console.log(newEntry);

    addNewEntry(newEntry);
  };

  const handleCancel = () => {
    console.log('cancel');
  };


  return (
    <Box sx={{ p: 1, border: '1px dashed black', borderRadius: '8px'}}>
      <Typography variant="h6" fontWeight={'fontWeightBold'}>New HealthCheck entry</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="standard"
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          variant="standard"
          // InputLabelProps={{
          //   shrink: true,
          // }}
        />

        <TextField
          fullWidth
          id="standard"
          label="Date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          variant="standard"
        />

        <TextField
          fullWidth
          id="standard"
          label="Specialist"
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
          variant="standard"
        />

        <TextField
          fullWidth
          id="standard"
          label="Healthcheck rating"
          value={healthCheckRating}
          onChange={(event) => setHealthCheckRating(event.target.value)}
          variant="standard"
        />

        <TextField
          fullWidth
          id="standard"
          label="Diagnosis codes"
          value={diagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value)}
          variant="standard"
        />

        <Box sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
          <Button variant="contained" color="error" onClick={handleCancel}>cancel</Button>
          <Button variant="contained" type="submit">add</Button>
        </Box>


      </form>
    </Box>
  );
};

export default NewHealtCheckForm;