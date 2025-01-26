import { Diagnosis, Entry } from "../../types";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const EntryDetails = ({ entry, diagnoses }: Props) => {

  switch (entry.type) {
    case "Hospital":
      return (
        <Box sx={{ p: 2, mt: 1, mb:1, border: '1px solid black', borderRadius: '8px' }}>
          <Typography>{entry.date} <LocalHospitalIcon /></Typography>
          <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>

          {entry.diagnosisCodes && 
          <List>
            {entry.diagnosisCodes?.map(code => (
              <ListItem key={code}>
                <ListItemText 
                  primary={diagnoses.find(diagnosis => diagnosis.code === code) 
                    ? `${code} ${diagnoses.find(diagnosis => diagnosis.code === code)?.name}` 
                    : code} 
                />
              </ListItem>
            ))}
          </List>
          }
          
          {entry.discharge && 
          <Typography>discharge date: {entry.discharge?.date}, criteria: {entry.discharge?.criteria}</Typography>
          }
          <Typography>diagnosed by {entry.specialist}</Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={{ p: 2, mt: 1, mb:1, border: '1px solid black', borderRadius: '8px' }}>
          <Typography>{entry.date} <WorkIcon />{entry.employerName}</Typography>
          <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>

          {entry.diagnosisCodes && 
          <List>
            {entry.diagnosisCodes?.map(code => (
              <ListItem key={code}>
                <ListItemText 
                  primary={diagnoses.find(diagnosis => diagnosis.code === code) 
                    ? `${code} ${diagnoses.find(diagnosis => diagnosis.code === code)?.name}` 
                    : code} 
                />
              </ListItem>
            ))}
          </List>
          }

          {entry.sickLeave && 
          <Typography>on sick leave at: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</Typography>
          }
          <Typography>diagnosed by {entry.specialist}</Typography>
        </Box>
      );
    case "HealthCheck":
      let heartColor;

      switch (entry.healthCheckRating) {
        case 0:
          heartColor = 'green';
          break;
        case 1:
          heartColor = 'yellow';
          break;
        case 2:
          heartColor = 'orange';
          break;
        case 3:
          heartColor = 'red';
          break;
      }
      
      
      return (
        <Box sx={{ p: 2, mt: 1, mb:1, border: '1px solid black', borderRadius: '8px' }}>
          <Typography>{entry.date} <MedicalServicesIcon /> </Typography>
          <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>

          {entry.diagnosisCodes && 
          <List>
            {entry.diagnosisCodes?.map(code => (
              <ListItem key={code}>
                <ListItemText 
                  primary={diagnoses.find(diagnosis => diagnosis.code === code) 
                    ? `${code} ${diagnoses.find(diagnosis => diagnosis.code === code)?.name}` 
                    : code} 
                />
              </ListItem>
            ))}
          </List>
          }

          <FavoriteIcon sx={{color: heartColor}} />
          <Typography>diagnosed by {entry.specialist}</Typography>
        </Box>
      );
    default:
      return assertNever(entry);
  }

};

export default EntryDetails;