import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ChromePicker } from 'react-color'; // Import the color picker component
import { ThemeContext } from '../App';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const MemoizedChromePicker = React.memo(ChromePicker);

function ColorTheme() {
    const { hue, setHue } = useContext(ThemeContext);
    const { userHsl, setUserHsl } = useContext(ThemeContext);
    const { colorMode, setColorMode } = useContext(ThemeContext);
    const [userPrimaryColor, setUserPrimaryColor] = useState();

    const handleChange = (event) => {
        if (event.target.checked) {
            setColorMode('dark');
        } else {
            setColorMode('light');
        }
    };

    //TODO theme saving to some place

    const handleChangeComplete = (color) => {
        setUserPrimaryColor(color.hsl);
        console.log(color, hue, userHsl, color.hsl);
        setUserHsl(color.hsl);
    };

    return (
        <>
            <MemoizedChromePicker
                color={userPrimaryColor}
                onChange={handleChangeComplete}
                onChangeComplete={handleChangeComplete} />
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Dark mode" onChange={handleChange} />
            </FormGroup>
        </>
    )
}

export default ColorTheme;