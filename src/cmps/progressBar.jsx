import React, { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const ProgressBar = ({ questionsLength, questionsAnswered, fillAllAnswers }) => {
    let progress = ((questionsAnswered) / questionsLength) * 100

    let percentageBarColor = (progress === 100) ? '#61bd4e' : '#5BA4D0'
    const theme = createTheme({
        palette: {
            primary: {
                main: percentageBarColor,
            },
        }
    })


    return <div className="progress-bar">

        <div className="progress-bar-wrapper">
            <ThemeProvider theme={theme}>

                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" value={progress} sx={{
                        height: 8,
                    }} />
                </Box>
            </ThemeProvider>
            <h1>{questionsAnswered}/{questionsLength}</h1>
            {/* <button onClick={fillAllAnswers}>fill</button> */}

        </div>
    </div>
}