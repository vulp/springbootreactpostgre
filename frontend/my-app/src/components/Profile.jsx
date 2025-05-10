import React, { useState, useEffect } from 'react';
import { useApi } from '../utils/api';

import {
    Card,
    CardContent,
    Container,
    Grid,
    TextField
} from '@mui/material';

function Profile() {
    const { fetchWithAuth } = useApi();
    const [user, setUser] = useState({});

    const fetchUserDetails = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:8080/api/users/user/details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setUser(data);
            console.log('data', data, user);
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, {});


    return (
        <Container>
            <h1>Profile</h1>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="firstName"
                                name="firstName"
                                value={user.givenName}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="lastName"
                                name="lastName"
                                value={user.familyName}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Profile