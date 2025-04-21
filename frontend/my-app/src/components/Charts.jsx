import React, { useState, useEffect } from 'react';
import EditButton from './EditButton.jsx';

import {
    LineChart,
    BarChart,
    Bar,
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Charts({ isNew, headerText, data, editing, onChange }) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(editing);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inputText, setInputText] = useState('');
    const [chartType, setChartType] = useState('line')


    /*
        const data = [
            { "date": "2025-03-20", "saves": 15 },
            { "date": "2025-03-21", "saves": 22 },
            { "date": "2025-03-22", "saves": 18 },
            { "date": "2025-03-23", "saves": 25 },
            { "date": "2025-03-24", "saves": 30 }
        ];*/


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
            <h2>{headerText}</h2>
            <ResponsiveContainer width="40%" height={300}>
                {chartType === 'line' ? (
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
                ) : (
                    <BarChart
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
                        <Bar dataKey="saves" fill="#82ca9d" />
                    </BarChart>
                )}
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
                    {!isNew && (
                        <>
                            <EditButton text={"Save"} className="mt-4" onClick={() => handleChange()}></EditButton>
                            <EditButton text={"Cancel"} className="mt-4" onClick={() => handleCancel()}></EditButton>
                        </>
                    )}
                </>
            )}
            {!isEditing && (
                <>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={chartType}
                        label="Type"
                        onChange={event => setChartType(event.target.value)}
                    >
                        <MenuItem value={'line'}>Line</MenuItem>
                        <MenuItem value={'bar'}>Bar</MenuItem>
                    </Select>
                    {!isNew && (
                        <EditButton text={"Edit Data"} className="mt-4" onClick={() => setIsEditing(true)}></EditButton>
                    )}
                </>
            )}

        </div>
    );
}

export default Charts;