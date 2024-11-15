import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

const NotificationDialog = (props) => {
  const { employee, setOpen, open } = props;

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle className="mt-10">
        <span className="h3 text-green font-weight-bold">
          {employee?.submitProfileStatus === '4' ? 'Yêu cầu bổ sung' : 'Lý do từ chối'}
        </span>
      </DialogTitle>
      <DialogContent dividers>
        {employee?.submitProfileStatus === '4' && employee?.additionalRequest}
        {employee?.submitProfileStatus === '8' && employee?.additionalRequestTermination}
        {employee?.submitProfileStatus === '5' && employee?.reasonForRejection}
        {employee?.submitProfileStatus === '9' && employee?.reasonForRefuseEndProfile}
      </DialogContent>
      <DialogActions className='my-12 flex-center'>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseDialog}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;