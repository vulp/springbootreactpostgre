import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useApi } from '../utils/api';
import { useState, useEffect } from 'react';

function Home() {
    const { logout } = useAuth();
    const { fetchWithAuth } = useApi();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchWithAuth('/api/hello'); // Replace with your protected API endpoint
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData);
                } else {
                    setError(`Failed to fetch data: ${response.status}`);
                }
            } catch (err) {
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchWithAuth]);

    return (
        <div>
            <h2>Welcome Home!</h2>
            <button onClick={logout}>Logout</button>

            <h3>Protected Data from Backend:</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default Home;