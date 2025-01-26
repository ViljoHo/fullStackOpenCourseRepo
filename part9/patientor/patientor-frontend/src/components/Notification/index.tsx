import { Box, Alert } from "@mui/material";

interface Props {
  notificationMsg: string | null;
}

const Notification = ({ notificationMsg }: Props) => {

  if (notificationMsg === null) {
    return null;
  }
  
  return (
    <Box>
      <Alert severity="error">{notificationMsg}</Alert>
    </Box>
  );
};

export default Notification;