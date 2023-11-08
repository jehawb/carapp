import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCar(props) {

    // states
    const [car, setCar] = useState({brand: '', model: ''});
    const [showDialog, setShowDialog] = useState(false);

    // functions
    const handleInputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        } else {
            setShowDialog(false);
        }
    }

    const handleSave = () => {
        props.addCar(car);
        setShowDialog(false);
        setCar({brand: '', model: ''});
    }
    
    // return
    return(
        <>
            <Button onClick={() => setShowDialog(true)}>New Car</Button>
            <Dialog 
                open={showDialog}
                onClose={handleClose}>
                <DialogTitle>New Car Addeded!</DialogTitle>
                <DialogContent>
                    <Stack>
                    <TextField 
                        label='Brand'
                        value={car.brand}
                        name='brand'
                        onChange={handleInputChanged} />
                        <TextField 
                        label='Model'
                        value={car.model}
                        name='model'
                        onChange={handleInputChanged} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add Car</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}