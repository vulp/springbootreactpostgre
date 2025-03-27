import React from 'react';
import { useAuth } from '../hooks/useAuth';

function TestPage() {
    const { logout } = useAuth();

    return (
        <div>
            <h2>This is the Test Page!</h2>
            <p>Only authenticated users should be able to see this. This is just for testing!</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default TestPage;