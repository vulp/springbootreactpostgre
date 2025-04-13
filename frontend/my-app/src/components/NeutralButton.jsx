import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button as MuiButton } from '@mui/material'; // Rename MUI's Button to avoid conflict

const Button = styled.button`
  color:rgb(123, 216, 193);
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px;
  background-color:rgb(119, 117, 117);
  border-radius: 4px;
`;

const ButtonTest = styled(MuiButton)`
  color: rgb(123, 216, 193);
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid; /* You need to specify a border color */
  background-color: rgb(119, 117, 117);
  border-radius: 4px;

  /* You can add more overrides here */
  &:hover {
    background-color: rgba(119, 117, 117, 0.8); /* Example hover effect */
  }
`;

function NeutralButton({onClick}) {
    const { logout } = useAuth();

    return (
        <ButtonTest onClick={onClick}>Logout</ButtonTest>
    )
}

export default NeutralButton;