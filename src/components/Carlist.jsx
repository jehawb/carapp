import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {

    // state variables
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);

    // conlumns for cars ag-grid
    const columns = [
        { field: "brand" },
        { field: "model" },
        { field: "color" },
        { field: "fuel" },
        { field: "year" },
        { field: "price" },
        {
            cellRenderer: params => <EditCar updateCar={updateCar} car={params.data} />,
            width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCar(params)}>
                    Delete
                </Button>,
            width: 120
        },
    ]

    // REST api functions

    // call getCars() function when rendering the component very first time
    useEffect(() => getCars(), []);

    // app is using carrestapi application which is deployed to heroku
    const REST_URL = "http://carrestapi.herokuapp.com/cars/";

    const getCars = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData:" + responseData._embedded.cars);
                setCars(responseData._embedded.cars);
            })
            .catch(error => console.error(error));
    }

    const deleteCar = (params) => {

        console.log("params: " + params.data._links.car.href);

        fetch(params.data._links.car.href, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    setMsg("Car is deleted succesfully!");
                    setOpen(true);
                    getCars();
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch(error => console.error(error));
    }

    const addCar = (car) => {
        alert("adding car to database, maybe");

        fetch(REST_URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok) {
                getCars();
            } else {
                alert("Something went wrong while adding a new car.");
            }
        })
        .catch(err => console.error(err));
    }

    const updateCar = (car, link) => {

        fetch(link, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => getCars())
        .catch(err => console.error(err));
    }

    // Rendering

    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material"
                style={{ height: '700px', width: '95%', padding: "1%", margin: 'auto' }} >
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>
        </>
    );

}