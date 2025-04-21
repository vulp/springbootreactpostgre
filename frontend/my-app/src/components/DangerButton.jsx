import React from 'react';
import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

const ButtonTest = styled(MuiButton)`
  color: rgb(255, 255, 255);
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid; /* You need to specify a border color */
  background-color: rgb(87, 16, 16);
  border-radius: 4px;

  /* You can add more overrides here */
  &:hover {
    background-color: rgba(27, 1, 1, 0.8); /* Example hover effect */
  }
`;

function DangerButton({onClick, text}) {

    return (
        <ButtonTest onClick={onClick}>{text}</ButtonTest>
    )
}

export default DangerButton;