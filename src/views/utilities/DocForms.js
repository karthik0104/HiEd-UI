import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/styles';

import MainCard from 'ui-component/cards/MainCard';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography, Autocomplete, TextField } from '@material-ui/core';
import { gridSpacing } from 'store/constant';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//import Tab from '@material-ui/core';
//import { TabList, TabPanel, TabContext } from '@material-ui/lab';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'

import Modal from '@material-ui/core/Modal';
import bulb from './../../assets/images/bulb.png';
import { LocalizationProvider } from "@material-ui/lab";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const useStyles = makeStyles((theme) => ({
    label: {
        color: 'darkgrey'
    },
    input: {
        fontFamily: "inherit",
        width: "300px",
        border: "0",
        borderBottom: "2px solid purple",
        marginTop: "20px",
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
        marginLeft: '30px',
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
        display: 'block',
        minHeight: '300px'
    },
    closeButton: {
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        margin: '0px'
    },
    fabclose: {
        backgroundColor: theme.palette.secondary.light
    },
    createPlanText: {
        marginTop: '20px'
    },
    createPlanText1: {
        width: '7%',
        float: 'left',
        padding: '0px',
        verticalAlign: 'center',
        marginTop: '10px'
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
    createPlanText3: {
        width: '93%',
        float: 'right',
        backgroundColor: theme.palette.secondary.light,
        padding: '15px',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        marginBottom: '30px',
    },
    university: {
        float: 'left'
    },
    course: {
        float: 'right',
        marginLeft: '10px'
    },
    bulbClass: {
        backgroundColor: 'white',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    autocompleteClass: {
        color: "purple",
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            // Default left padding is 6px
            paddingLeft: 26
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        }
    },
    manageDocHeading: {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        paddingLeft: '20px',
        paddingTop: '1px',
        paddingBottom: '1px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '12px',
        letterSpacing: '0.1em',
    },
    datepicker: {
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
    createPlan: {
        backgroundColor: theme.palette.secondary.dark,
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '7px',
        paddingBottom: '7px',
        color: 'white'
    },
    done: {
        backgroundColor: theme.palette.primary.dark,
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '7px',
        paddingBottom: '7px',
        color: 'white'
    },
    tabs: {
        fontFamily: 'arial',
        margin: '0 auto',
        width: '70%',
        textAlign: 'center',
        marginTop: '15vh'
    },
    or: {
        margin: "10px",
        fontStyle: "bold"
    }
}));

const DocUtilsForms = ({ isLoading }) => {
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

    const top100films = ["University Of Michigan", "Ohio University"]
    const [userPlans, setUserPlans] = React.useState([]);

    const [state, setState] = useState({ open: false });
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = React.useState('1');
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [filename, setFilename] = React.useState('');
    const [showupload, setShowupload] = React.useState(false);
    const tabCount = 3;
    const axios = require('axios');

    function retrievePlanNames(data) {
        setUserPlans(data["applications"].map(a => a.name));
    }
    
    function fetchUserApplications() {
        axios({
            method: 'get',
            url: 'http://localhost:5344/application/view/all',
            headers: {
                "x-access-tokens": localStorage.getItem("HIED_TOKEN")
            }
        })
            .then(response => retrievePlanNames(response.data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    
    useEffect(() => {
        fetchUserApplications();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleOpen() {
        setSelectedTab(0);
        setState({ open: true });
    };

    function handleClose() {
        setState({ open: false });
        setShowupload(false);
        setFilename('');
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
            transform: 'translate(-50%, -50%)',
            zIndex: 7000,
        };
    }

    function handleFile(e) {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        axios.post("http://localhost:5344/document/upload-data", formData)
            .then(res => setFilename(e.target.files[0].name))
            .catch(err => console.warn(err));
    }

    function uploadSection() {
        setShowupload(true);
    }

    function invokeCreateDocument() {
        const params = {
            "file_name": filename
        };

        axios.post("http://localhost:5344/document/create-document", params)
            .then(res => handleClose())
            .catch(err => console.warn(err));
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
                scrollable={true}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <MainCard className={classes.maincard} elevation={16}>
                        <div className={classes.closeButton}>
                            <Fab aria-label="add" className={classes.fabclose}>
                                <IconButton onClick={handleOpen}>
                                    <CloseIcon />
                                </IconButton>
                            </Fab>
                        </div>
                        <div>
                            <div className={classes.manageDocHeading}>
                                <h1>Manage Documents</h1>
                            </div>

                            <div className={classes.createPlanText}>
                                <div className={classes.createPlanText1}>
                                    <img src={bulb} className={classes.bulbClass}></img>
                                </div>
                                <div className={classes.createPlanText2}>
                                    Create & Manage your documents for University Admission such as SOP, LOR without any hassle !
                                    Get started by either uploading an existing document, or by creating a new one on the tool.
                                </div>
                            </div>

                            <div>
                                <form onSubmit={formik.handleSubmit} className={classes.form}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid container direction="row">
                                            <Grid item>
                                                <Button className={classes.createPlan} onClick={uploadSection}>
                                                    Upload a document from your machine
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <div className={classes.or}>
                                                    OR
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <Button className={classes.createPlan}>Create a new document on HiEd</Button>
                                            </Grid>
                                        </Grid>
                                        {showupload ?
                                        <Grid container direction="row">
                                            <Grid item xs={12}>
                                                <input
                                                    className={classes.input}
                                                    type="text"
                                                    name="full_name"
                                                    value={filename}
                                                />
                                                {formik.errors.full_name && formik.touched.full_name && (
                                                    <p>{formik.errors.full_name}</p>
                                                )}
                                            </Grid>
                                            <Grid container direction="row">
                                                <Grid container direction="row">
                                                    <div name="file_name_later" className={classes.fileNameLater}>
                                                        File name can be changed later.
                                                    </div>
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                </Grid>
                                                <Grid container direction="row">
                                                    <Button
                                                        variant="contained"
                                                        component="label"
                                                    >
                                                        Upload File
                                                        <input
                                                            type="file"
                                                            hidden
                                                            onChange={handleFile}
                                                        />
                                                    </Button>
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                    <div className={classes.createPlanText3}>
                                                        Do you wish to associate this document with any of the plans you have created ? If yes,
                                                        the please select one of the plans below :
                                                    </div>
                                                </Grid>
                                                <Grid container direction="row">
                                                    <div>
                                                        <div className={classes.university}>
                                                            <Grid item>
                                                                <label className={classes.label}>Plan</label>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <br />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Autocomplete
                                                                    classes={{ inputRoot: classes.autocompleteClass }}
                                                                    disablePortal
                                                                    options={userPlans}
                                                                    id="combo-box-demo"
                                                                    sx={{ width: 300 }}
                                                                    renderInput={(params) => <TextField {...params} label="Select" />}
                                                                />
                                                                {formik.errors.full_name && formik.touched.full_name && (
                                                                    <p>{formik.errors.full_name}</p>
                                                                )}
                                                            </Grid>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                </Grid>
                                                <Grid container direction="row">
                                                    <Grid item>
                                                        <Button className={classes.done} onClick={invokeCreateDocument}>
                                                            + Create Document</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid> : null }
                                    </Grid>
                                </form>

                            </div>
                        </div>
                    </MainCard>
                </div>
            </Modal>
        </div>
    );
}

DocUtilsForms.propTypes = {
    isLoading: PropTypes.bool
};

export default DocUtilsForms;