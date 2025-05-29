import React, { useState, useEffect } from 'react';
import EditButton from './EditButton.jsx';
import AskGemmaDialog from './askGemmaDialog.jsx';
import NeutralButton from './NeutralButton.jsx';

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

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function Charts({ isNew, headerText, editing, onChange, chart, width }) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(editing);
    const [error, setError] = useState(null);
    const [chartType, setChartType] = useState('line');
    const [isAskGemmaDialogOpen, setIsAskGemmaDialogOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {

            if (chart) {
                console.log('chart found', chart);
                const parsed = JSON.parse(chart.jsonData);
                setChartData(parsed)
                //setChartData(data);                
                //setInputText(JSON.stringify(parsed));
            }
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading chart data...</div>;
    }

    if (error) {
        return <div>Error loading chart data: {error.message}</div>;
    }

    const handleInputChange = (value) => {
        testData(value);
    };

    const testData = (value) => {
        try {
            const parsedData = JSON.parse(value);
            setChartData(parsedData);
            onChange(parsedData);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDialogClose = () => {
        setIsAskGemmaDialogOpen(false);
    };

    const handleOpenAskGemma = () => {
        setIsAskGemmaDialogOpen(true);
    };

    return (
        <div>
            <p>{headerText}</p>
            <ResponsiveContainer width={`${width}%`} height={300}>
                {chartType === 'line' ? (
                    <LineChart
                        width={500}
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
                        width={500}
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
                            resize: 'both', width: 500
                        },
                    }} rows={4} multiline label="Outlined" variant="outlined" onChange={event => handleInputChange(event.target.value)} slotProps={{
                        input: {
                            style: {
                                resize: 'both',
                            },
                        },
                    }} value={JSON.stringify(chartData)} />

                    <br />
                </>
            )}
            {isNew && !isEditing && (
                <>
                    <TextField id="outlined-basic" sx={{
                        '& .MuiInputBase-input': {
                            resize: 'both', width: 500
                        },
                    }} rows={4} multiline label="Outlined" variant="outlined" onChange={event => handleInputChange(event.target.value)} slotProps={{
                        input: {
                            style: {
                                resize: 'both',
                            },
                        },
                    }} />

                    <br />
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

                    <NeutralButton text={"Ask Gemma"} onClick={handleOpenAskGemma}></NeutralButton>
                    <AskGemmaDialog
                        open={isAskGemmaDialogOpen}
                        onClose={handleDialogClose}
                        stringData={JSON.stringify(chartData)}
                    />
                </>
            )}

        </div>
    );
}

export default Charts;