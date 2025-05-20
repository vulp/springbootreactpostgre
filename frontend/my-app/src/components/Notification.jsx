import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

function Notification({ openNotification, closeNotification, text}) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (openNotification) {
            setOpen(true);
        }
    }, [openNotification]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        closeNotification();
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={text}
            />
        </div>
    )
}

export default Notification;