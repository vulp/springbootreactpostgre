import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home.jsx';
import DocumentationWorkspace from './components/DocumentationWorkspace';
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
                <AppContent /> 
            </AuthProvider>
        </BrowserRouter>
    );
}

function AppContent() {
    const { isAuthenticated } = useAuth();
    return (
            <div>
                <div className="top-bar">
                    <div className="user-icon-placeholder">
                    </div>
                </div>
                <div className="content-area">
                {isAuthenticated && (
                    <div className="navigation">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/documentationWorkspace">Documentation Workspace</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
                    <div className="main-content">
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
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/documentationWorkspace/*" 
                                element={
                                    <ProtectedRoute>
                                        <DocumentationWorkspace />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </div>
  
    );
}

export default App;
