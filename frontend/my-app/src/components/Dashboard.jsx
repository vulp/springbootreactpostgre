import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import NeutralButton from './NeutralButton.jsx';
import CreateChartDialog from './CreateChartDialog.jsx';
import ModifyChartDialog from './ModifyChartDialog.jsx';

import { useApi } from '../utils/api';

function Dashboard() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
    const [chartToModify, setChartToModify] = useState(); 
    const [charts, setCharts] = useState([]);
    const { fetchWithAuth } = useApi();

    const handleCreateNewChartClick = () => {
        setIsCreateDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsCreateDialogOpen(false);
        setIsModifyDialogOpen(false);
    };

    const fetchCharts = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:8080/api/charts/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setCharts([]);
            const datas = await response.json();
            //const parsedData = JSON.parse(datas[0].jsonData);
           console.log(datas);
            setCharts(datas);
            // setDocumentations(data);
            // setLoading(false);
        } catch (e) {
            console.log(e);
            // setError(e.message);
            // setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharts();
    }, []);

    const refreshList = () => {
        fetchCharts();
    };

    const handleDoubleClickChart = (id) => {
        console.log('asdfkljasdf',id);

        const foundChart = charts.find(chart => chart.id === id);
        setChartToModify(foundChart);
        setIsModifyDialogOpen(true);
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <NeutralButton text={"New"} onClick={handleCreateNewChartClick}></NeutralButton>
            
            {charts.length > 0 ? (
                charts.map(chart => (
                    <div key={chart.id} onDoubleClick={() => handleDoubleClickChart(chart.id)}>
                        <Charts isNew={false} headerText={"Chart name here after fetch TODO"} editing={false} chart={chart} width={50}/>
                    </div>
                ))
            ) : (
                <p>"plaa no cont"</p>
            )}

            <CreateChartDialog
                open={isCreateDialogOpen}
                onClose={handleDialogClose} refreshList={refreshList}
            />
            <ModifyChartDialog
                open={isModifyDialogOpen}
                onClose={handleDialogClose} refreshList={refreshList}                
                chart={chartToModify}
            />
            
        </div>

    );
}

export default Dashboard;