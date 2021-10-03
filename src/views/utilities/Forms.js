import PropTypes from 'prop-types';
import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/styles';

import MainCard from 'ui-component/cards/MainCard';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography, Autocomplete, TextField } from '@material-ui/core';
import { gridSpacing } from 'store/constant';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'

import Modal from '@material-ui/core/Modal';

import bulb from './../../assets/images/bulb.png';


const useStyles = makeStyles((theme) => ({
    label: {
        color: 'darkgrey'
    },
    input: {
        fontFamily: "inherit",
        width: "300px",
        border: "0",
        borderBottom: "2px solid purple",
        margin: "0px",
        outline: "0",
        fontSize: "1.3rem",
        color: "purple",
        padding: "7px 0",
        background: "transparent",
        transition: "border-color 0.2s",
        letterSpacing: "0.2px",
        boxShadow: '0px 1px 0px 0px grey'
    },
    input2: {
        fontFamily: "inherit",
        width: "100px",
        border: "0",
        borderBottom: "2px solid purple",
        marginLeft: "0px",
        outline: "0",
        fontSize: "1.3rem",
        color: "purple",
        padding: "7px 0",
        background: "transparent",
        transition: "border-color 0.2s",
        letterSpacing: "0.2px",
        boxShadow: '0px 1px 0px 0px grey'
    },
    form: {
        marginTop: '60px',
        marginLeft: '20px'
    },
    select: {
        width: "150px",
        padding: "5px 35px 5px 5px",
        fontSize: "16px",
        border: "1px solid #CCC",
        height: "34px",
        appearance: "none"
    },
    paper: {
        outline: 'none',
    },
    maincard: {
    },
    closeButton: {
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        margin: '0px'
    },
    fabclose: {
        backgroundColor: theme.palette.secondary.light
    },
    createPlanText1: {
        width: '7%',
        float: 'left',
        padding: '0px',
        verticalAlign: 'center',
        margin: '0px'
    },
    createPlanText2: {
        width: '93%',
        float: 'right',
        backgroundColor: theme.palette.primary.light,
        padding: '15px',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        marginBottom: '30px',
    },
    bulbClass: {
        backgroundColor: 'white',
        maxWidth: '100%',
        maxHeight: '100%'
    }
}));

const UtilsForms = ({ isLoading }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            full_name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object({
            full_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!")
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    const top100films = ["ok1", "ok2"]

    const [state, setState] = useState({ open: false });

    function handleOpen() {
        setState({ open: true });
    };

    function handleClose() {
        setState({ open: false });
    };

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        const top = 0;
        const left = 0;

        return {
            border: '0px',
            marginTop: '35px',
            maxWidth: '100vh',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        };
    }



    return (
        <div>
            <IconButton onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={state.open}
                onClose={handleClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <MainCard className={classes.maincard}>
                        <div className={classes.closeButton}>
                            <Fab aria-label="add" className={classes.fabclose}>
                                <IconButton onClick={handleOpen}>
                                    <CloseIcon />
                                </IconButton>
                            </Fab>
                        </div>
                        <div>
                            <h1>Create Plan</h1>
                            <hr />
                            
                            <div>
                            <div className={classes.createPlanText1}>
                                <img src={bulb} className={classes.bulbClass}></img>
                            </div>
                            <div className={classes.createPlanText2}>
                                A plan is an interactive feature which helps you create your <u>Personal Calendar</u> for scheduling 
                                your application-related activities such as SOP creation, 
                                LOR requests, applying on University website and much more. Go ahead and create one !
                            </div>
                            </div>

                            <form onSubmit={formik.handleSubmit} className={classes.form}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid container direction="row">
                                        <Grid item>
                                            <label className={classes.label}>Full Name</label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input
                                                className={classes.input}
                                                type="text"
                                                name="full_name"
                                                value={formik.values.full_name}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.full_name && formik.touched.full_name && (
                                                <p>{formik.errors.full_name}</p>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <br />
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid item>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <label className={classes.label}>Full Name</label>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <input
                                                        className={classes.input2}
                                                        type="text"
                                                        name="full_name"
                                                        value={formik.values.full_name}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.full_name && formik.touched.full_name && (
                                                        <p>{formik.errors.full_name}</p>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <label className={classes.label}>Full Name</label>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <input
                                                        className={classes.input2}
                                                        type="text"
                                                        name="full_name"
                                                        value={formik.values.full_name}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.full_name && formik.touched.full_name && (
                                                        <p>{formik.errors.full_name}</p>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <br />
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid item>
                                            <label className={classes.label}>Full Name</label>
                                        </Grid>
                                        <Grid container direction="row">
                                            <br />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Autocomplete
                                                multiple
                                                disablePortal
                                                options={top100films}
                                                id="combo-box-demo"
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Movie" />}
                                            />
                                            {formik.errors.full_name && formik.touched.full_name && (
                                                <p>{formik.errors.full_name}</p>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <br />
                                    </Grid>
                                </Grid>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </form>
                        </div>
                    </MainCard>
                </div>
            </Modal>
        </div>
    );
}

UtilsForms.propTypes = {
    isLoading: PropTypes.bool
};

export default UtilsForms;