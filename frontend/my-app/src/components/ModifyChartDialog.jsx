import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Charts from './Charts';
import { useApi } from '../utils/api';

function ModifyChartDialog({ open, onClose, refreshList, chart }) {
    const [updateChartData, setUpdateChartData] = useState([]);
    const { fetchWithAuth } = useApi();

    useEffect(() => {
        setTimeout(() => {

            if (chart) {
                console.log('chart found', chart);
                const parsed = JSON.parse(chart.jsonData);
                setUpdateChartData(parsed)
            }
            //setLoading(false);
        }, 1000);
    }, []);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async () => {

        try {
            let data = JSON.stringify(updateChartData);
            const result = await fetchWithAuth('http://localhost:8080/api/charts/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: chart.id, jsonData: updateChartData }),
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
                <DialogTitle>Modify chart</DialogTitle>

                <Charts isNew={false} headerText={"Preview"} editing={true} onChange={setUpdateChartData} chart={chart} width={90} />

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ModifyChartDialog;