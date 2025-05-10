import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useApi } from '../utils/api';
import { useState, useEffect } from 'react';
import NeutralButton from './NeutralButton.jsx';

function Home() {
    const { logout } = useAuth();
    const { fetchWithAuth } = useApi();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    return (
        <div>
            <h1>Welcome Home!</h1>
            
        </div>
    );
}

export default Home;