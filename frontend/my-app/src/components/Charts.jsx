import React, { useState, useEffect } from 'react';
import EditButton from './EditButton.jsx';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';


function Charts() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inputText, setInputText] = useState('');

    const data = [
        { "date": "2025-03-20", "saves": 15 },
        { "date": "2025-03-21", "saves": 22 },
        { "date": "2025-03-22", "saves": 18 },
        { "date": "2025-03-23", "saves": 25 },
        { "date": "2025-03-24", "saves": 30 }
    ];

    const data2 = [
        { "date": "2025-03-20", "saves": 1 },
        { "date": "2025-03-21", "saves": 2 },
        { "date": "2025-03-22", "saves": 8 },
        { "date": "2025-03-23", "saves": 5 },
        { "date": "2025-03-24", "saves": 3 }
    ];
    useEffect(() => {

        setTimeout(() => {
            setChartData(data);
            setLoading(false);
            setInputText(JSON.stringify(data));
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading chart data...</div>;
    }

    if (error) {
        return <div>Error loading chart data: {error.message}</div>;
    }

    const handleChange = () => {
        console.log('data');

        try {
            const parsedData = JSON.parse(inputText);
            setChartData(parsedData);
            setIsEditing(false);
        } catch (e) {
            console.log(e);
            setIsEditing(true);
        }
    };

    const handleInputChange = (value) => {
        setInputText(value);
        testData(inputText);
    };

    const handleCancel = () => {
        console.log('data');

        try {
            // const parsedData = JSON.parse(inputText);
            setInputText(JSON.stringify(chartData));
            setIsEditing(false);
        } catch (e) {
            console.log(e);
            setIsEditing(true);
        }
    };

    const testData = () => {
        try {
            const parsedData = JSON.parse(inputText);
            setChartData(parsedData);
        } catch (e) { 
            console.log(e);
         }
    }

    return (
        <div>
            <h2>Documentation Activity</h2>
            <ResponsiveContainer width="40%" height={300}>
                <LineChart
                    width={700}
                    height={300}
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="saves" stroke="#8884d8" activeDot={{ r: 8 }} />

                </LineChart>
            </ResponsiveContainer>
            {isEditing && (
                <>
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

                    <br />
                    <EditButton text={"Save"} className="mt-4" onClick={() => handleChange()}></EditButton>
                    <EditButton text={"Cancel"} className="mt-4" onClick={() => handleCancel()}></EditButton>
                </>
            )}
            {!isEditing && (
                <EditButton text={"Edit Data"} className="mt-4" onClick={() => setIsEditing(true)}></EditButton>
            )}

        </div>
    );
}

export default Charts;