import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home.jsx';
import DocumentationEditor from './components/DocumentationEditor';
import Dashboard from './components/Dashboard.jsx';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/documentation">Documentation</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/documentation"
                        element={
                            <ProtectedRoute>
                                <DocumentationEditor />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
