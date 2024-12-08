import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

const NotificationDialog = (props) => {
  const { data, setOpen, open, type } = props;
  const [notification, setNotification] = useState({});

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    switch (type) {
      case 'employee':
        switch (data?.submitProfileStatus) {
          case '4':
            setNotification({
              title: 'Yêu cầu bổ sung',
              content: data?.additionalRequest
            })
            break;
          case '8':
            setNotification({
              title: 'Yêu cầu bổ sung',
              content: data?.additionalRequestTermination
            })
            break;
          case '5':
            setNotification({
              title: 'Lý do từ chối',
              content: data?.reasonForRejection
            })
            break;
          case '9':
            setNotification({
              title: 'Lý do từ chối',
              content: data?.reasonForRefuseEndProfile
            })
            break;
          default:
            break;
        }
        break;
      case 'salary':
        switch (data?.salaryIncreaseStatus) {
          case 4:
            setNotification({
              title: 'Yêu cầu bổ sung',
              content: data?.additionalRequest
            })
            break;
          case 5:
            setNotification({
              title: 'Lý do từ chối',
              content: data?.reasonForRefusal
            })
            break;
          default:
            break;
        }
        break;
      case 'process':
        switch (data?.processStatus) {
          case '4':
            setNotification({
              title: 'Yêu cầu bổ sung',
              content: data?.additionalRequest
            })
            break;
          case '5':
            setNotification({
              title: 'Lý do từ chối',
              content: data?.reasonForRefusal
            })
            break;
          default:
            break;
        }
        break;
      case 'proposal':
        switch (data?.proposalStatus) {
          case 4:
            setNotification({
              title: 'Yêu cầu bổ sung',
              content: data?.additionalRequest
            })
            break;
          case 5:
            setNotification({
              title: 'Lý do từ chối',
              content: data?.reasonForRefusal
            })
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }, [data, type]);

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle className="mt-10">
        <span className="h3 text-primary font-weight-bold">
          {notification?.title}
        </span>
      </DialogTitle>
      <DialogContent dividers>
        {notification?.content}
      </DialogContent>
      <DialogActions className='flex-center my-12'>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseDialog}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;