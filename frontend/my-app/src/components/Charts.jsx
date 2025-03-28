import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';



function Charts() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const data = [
        { "date": "2025-03-20", "saves": 15 },
        { "date": "2025-03-21", "saves": 22 },
        { "date": "2025-03-22", "saves": 18 },
        { "date": "2025-03-23", "saves": 25 },
        { "date": "2025-03-24", "saves": 30 }
    ];
    useEffect(() => {

        setTimeout(() => {
            setChartData(data);
            setLoading(false);
        }, 1000); // Simulate a 1-second delay
    }, []);

    if (loading) {
        return <div>Loading chart data...</div>;
    }

    if (error) {
        return <div>Error loading chart data: {error.message}</div>;
    }

    return (
        <div>
            <h2>Documentation Activity</h2>
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
        </div>
    );
}

export default Charts;