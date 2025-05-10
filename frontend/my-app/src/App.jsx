import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home.jsx';
import DocumentationWorkspace from './components/DocumentationWorkspace';
import Dashboard from './components/Dashboard.jsx';
import ProfileMenu from './components/ProfileMenu.jsx';
import Profile from './components/Profile.jsx';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';

import CssBaseline from '@mui/material/CssBaseline';

import {
    Menu,
    HomeFilled,
    SpaceDashboard,
    LibraryBooks,
    ChevronLeft,
    ChevronRight,
} from '@mui/icons-material'

import {
    Avatar,
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    useMediaQuery,
    useTheme,
    styled,

} from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, auth } = useAuth();
    console.log('is auth', isAuthenticated, auth);
    return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);


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
    const { isAuthenticated, auth } = useAuth();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getProfileLetter = () => {
        if (!auth || auth.name === 0) {
            return "";
        }
        return auth.name.charAt(0).toUpperCase();
    };

    const navItems = [
        { text: 'Home', to: '/', icon: <HomeFilled /> },
        { text: 'Dashboard', to: '/dashboard', icon: <SpaceDashboard /> },
        { text: 'Documentation', to: '/documentationWorkspace', icon: <LibraryBooks /> },
    ];

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open}>
                {auth.isAuthenticated && (
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}

                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Sandbox
                        </Typography>
                        <ProfileMenu profileLetter={getProfileLetter()}>

                        </ProfileMenu>
                    </Toolbar>
                )}
            </AppBar>
            {auth.isAuthenticated && (
                <Drawer
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton component={Link} to={item.to}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        )
                        )
                        }
                    </List>
                </Drawer>
            )}
            <Main open={open}>

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
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>

            </Main>

        </Box>

    );
}

export default App;
