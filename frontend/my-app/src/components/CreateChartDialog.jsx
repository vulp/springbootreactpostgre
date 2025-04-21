import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Charts from './Charts';

function CreateChartDialog({ open, onClose, onCreateChart }) {
    const [inputText, setInputText] = useState('');
    const [chartData, setChartData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (value) => {
        setInputText(value);
        testData(inputText);
    };

    const exampleChartData = [
        { "date": "2025-03-20", "saves": 15 },
        { "date": "2025-03-21", "saves": 22 },
        { "date": "2025-03-22", "saves": 18 },
        { "date": "2025-03-23", "saves": 25 },
        { "date": "2025-03-24", "saves": 30 }
    ];

    
    const testData = () => {
        try {
            const parsedData = JSON.parse(inputText);
            setChartData(parsedData);
            console.log('testing and',parsedData);
        } catch (e) {
            console.log(e);
            setChartData([]);
        }
    }

    const handlePrint = () => {
        console.log(chartData);
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Create new chart</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create chart  you need content like this. Can be asked from AI:
                        <code>
                            {JSON.stringify(exampleChartData)}
                        </code>
                    </DialogContentText>
                    <TextField id="outlined-basic" sx={{
                        '& .MuiInputBase-input': {
                            resize: 'both', width: 700
                        },
                    }} rows={4} multiline label="Outlined" variant="outlined" onChange={event => handleInputChange(event.target.value)} slotProps={{
                        input: {
                            style: {
                                resize: 'both',
                            },
                        },
                    }} value={inputText} />
                    
                </DialogContent>
                <Charts isNew={true} headerText={"Preview"} data={chartData} editing={true} />

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handlePrint}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default CreateChartDialog;