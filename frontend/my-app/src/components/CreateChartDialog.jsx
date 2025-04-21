import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Charts from './Charts';
import { useApi } from '../utils/api';

function CreateChartDialog({ open, onClose, refreshList }) {
    const [newChartData, setNewChartData] = useState([]);
    const { fetchWithAuth } = useApi();

    //const handleClickOpen = () => {
      //  setOpen(true);
    //};

    const handleClose = () => {
       // setOpen(false);
        onClose();
    };

    //const handleInputChange = (value) => {
     //   setInputText(value);
     //   testData(inputText);
    //};

    const exampleChartData = [
        { "date": "2025-03-20", "saves": 15 },
        { "date": "2025-03-21", "saves": 22 },
        { "date": "2025-03-22", "saves": 18 },
        { "date": "2025-03-23", "saves": 25 },
        { "date": "2025-03-24", "saves": 30 }
    ];

/*
    const testData = () => {
        try {
            const parsedData = JSON.parse(inputText);
            setNewChartData(parsedData);
            console.log('testing and', parsedData);
        } catch (e) {
            console.log(e);
            setNewChartData([]);
        }
    }*/

    const handleSubmit = async () => {
        try {
            let data = JSON.stringify(newChartData);
            const result = await fetchWithAuth('http://localhost:8080/api/charts/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jsonData: newChartData }),
            });

            if (result.ok) {
                refreshList();
                handleClose();
            }

        } catch (error) {
            console.error('Error', error);
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Create new chart</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create chart  you need content like this. Can be asked from AI:
                        <code>
                            {JSON.stringify(exampleChartData)}
                        </code>
                    </DialogContentText>

                </DialogContent>
                <Charts isNew={true} headerText={"Preview"} editing={false} onChange={setNewChartData} width={80}/>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default CreateChartDialog;