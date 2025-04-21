import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import NeutralButton from './NeutralButton.jsx';
import CreateChartDialog from './CreateChartDialog.jsx';

function Dashboard() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [chartsData, setChartsData] = useState([]); // Assuming Charts component receives data as prop

    const handleCreateNewChartClick = () => {
        setIsCreateDialogOpen(true);
    };

    const handleCreateChartDialogClose = () => {
        setIsCreateDialogOpen(false);
    };

    //todo remove when all done
    const data = [
        { "date": "2025-03-20", "saves": 15 },
        { "date": "2025-03-21", "saves": 22 },
        { "date": "2025-03-22", "saves": 18 },
        { "date": "2025-03-23", "saves": 25 },
        { "date": "2025-03-24", "saves": 30 }
    ];


    return (
        <div>
            <h1>Dashboard</h1>
            <NeutralButton text={"New"} onClick={handleCreateNewChartClick}></NeutralButton>
            <Charts isNew={false} headerText={"Chart name here after fetch TODO"} data={data} editing={false}/>
            <CreateChartDialog
                open={isCreateDialogOpen}
                onClose={handleCreateChartDialogClose}
            >

            </CreateChartDialog>
        </div>
    );
}

export default Dashboard;