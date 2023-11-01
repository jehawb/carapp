import { useState } from 'react'
import Carlist from './components/carlist'
import { AppBar, Typography } from '@mui/material'

function App() {

    return (
        <>
            <AppBar position='static'>
                <Typography variant="h6">
                    Carshop
                </Typography>
            </AppBar>
            <Carlist />
        </>
    )
}

export default App
