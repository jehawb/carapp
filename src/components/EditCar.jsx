import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCar(props) {

    // states
    const [car, setCar] = useState({brand: '', model: ''});
    const [showDialog, setShowDialog] = useState(false);

    // functions
    const handleClickOpen = () => {
        console.log(props.car);
        setCar({...car, brand: props.car.brand, model: props.car.model});
        setShowDialog(true);
    }

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

    const updateCar = () => {
        props.updateCar(car, props.car._links.car.href);
        setShowDialog(false);
        setCar({brand: '', model: ''});
    }
    
    // return
    return(
        <>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog 
                open={showDialog}
                onClose={handleClose}>
                <DialogTitle>Edit a car!</DialogTitle>
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
                    <Button onClick={updateCar}>Edit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}