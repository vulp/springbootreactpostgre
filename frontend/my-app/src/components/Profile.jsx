import React, { useState, useEffect } from 'react';
import { useApi } from '../utils/api';

import ColorTheme from './ColorTheme';

import {
    Card,
    CardContent,
    Container,
    Grid,
    TextField,
    Button

} from '@mui/material';

function Profile() {
    const { fetchWithAuth } = useApi();
    const [user, setUser] = useState({});
    const [initialUserData, setInitialUserData] = useState({}); 
    const [loading, setLoading] = React.useState(true);

    const fetchUserDetails = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:8080/api/users/user/details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(response) {
                const data = await response.json();
                setUser(data);
                setInitialUserData(data);
            }

            setLoading(false);
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, {});

    const handleSave = async () => {

        setLoading(true);
        try {
            const response = await fetchWithAuth('http://localhost:8080/api/users/user/details', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            //TODO needs refreshing etc

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setUser(initialUserData);
    };

    const handleChange = (event) => {
        const { name, value} = event.target;
        setUser(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Container>
            <h1>Profile</h1>
            <Card>
                <CardContent>
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="givenName"
                                name="givenName"
                                value={user.givenName}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="familyName"
                                name="familyName"
                                value={user.familyName}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="phone"
                                name="phone"
                                value={user.phone}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" onClick={handleSave} loading={loading}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCancel} loading={loading}>
                        Cancel
                    </Button>
                </CardContent>
            </Card>
            <ColorTheme>
            </ColorTheme>
        </Container>
    )
}

export default Profile