import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from '../hooks/useAuth.jsx';
import { Link } from 'react-router-dom';

import {
    Avatar,
    IconButton,
    Divider,
    Tooltip,
    Menu,
    MenuItem,
    Box,
} from '@mui/material';

function ProfileMenu({ profileLetter }) {
    const { logout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const openProfileMenu = (event) => {

        setAnchorEl(event.currentTarget);
    };

    const closeProfileMenu = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Profile" edge="end">
                    <IconButton
                        onClick={openProfileMenu}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {profileLetter}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={closeProfileMenu}
                onClick={closeProfileMenu}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to='/profile'>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={logout}>
                    Logout
                </MenuItem>
                <Divider />
            </Menu>
        </React.Fragment>
    )
}
export default ProfileMenu;