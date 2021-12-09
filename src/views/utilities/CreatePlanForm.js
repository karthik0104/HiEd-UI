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
import preloader from './../../assets/images/wave_loader1.svg';

import { LocalizationProvider } from "@material-ui/lab";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const useStyles = makeStyles((theme) => ({
    label: {
        color: 'darkgrey'
    },
    input: {
        fontFamily: "inherit",
        width: "500px",
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
        minHeight: '600px'
    },
    maincardSuccess: {
        display: 'block',
        minHeight: '200px'
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
    createPlanHeading: {
        backgroundColor: theme.palette.secondary.dark,
        color: 'white',
        paddingLeft: '20px',
        paddingTop: '1px',
        paddingBottom: '1px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '12px',
        letterSpacing: '0.1em',
    },
    createPlanSuccessHeading: {
        backgroundColor: "green",
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
    totalplanduration: {
        fontFamily: 'arial',
        color: theme.palette.secondary.dark,
        fontWeight: 'bold'
    },
    preloader: {
        height: '90px',
        width: '90px'
    },
    deadlineLoader: {
        marginLeft: '90px'
    },
    pleasewait: {
        width: '250px',
    }
}));

const CreatePlanForm = ({ isLoading }) => {
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

    const [state, setState] = useState({ open: false, openSuccess: false });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = React.useState('');
    const [daysDiff, setDaysDiff] = React.useState('NA');
    const [value, setValue] = React.useState('1');
    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabCount = 3;
    const axios = require('axios');

    const [planName, setPlanName] = React.useState('');
    const [univName, setUnivName] = React.useState('');
    const [courseName, setCourseName] = React.useState('');
    const [greScore, setGreScore] = React.useState('');
    const [toeflScore, setToeflScore] = React.useState('');
    const [admitTerm, setAdmitTerm] = React.useState('');
    const [year, setYear] = React.useState('');
    const [universities, setUniversities] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [admitTerms, setAdmitTerms] = React.useState([]);
    const [started, setStarted] = React.useState(true);
    const [loadingDeadline, setLoadingDeadline] = React.useState(false);

    const [planNameInvalid, setPlanNameInvalid] = React.useState(false);
    const [univNameInvalid, setUnivNameInvalid] = React.useState(false);
    const [courseNameInvalid, setCourseNameInvalid] = React.useState(false);

    function retrieveUnivNames(data) {
        console.log(data);
        let k = [];
        for (var i = 0; i < data["universities"].length; i++) {
            k.push(data["universities"][i].name);
        }

        console.log(k);

        setUniversities(k);
    }

    function retrieveCourseNames(data) {
        console.log(data);
        let k = [];
        for (var i = 0; i < data["courses"].length; i++) {
            k.push(data["courses"][i].name);
        }

        console.log(k);

        setCourses(k);
    }

    function fetchUniversities() {
        axios({
            method: 'get',
            url: 'http://localhost:5344/university/search?q=',
            headers: {
                "x-access-tokens": localStorage.getItem("HIED_TOKEN")
            }
        })
            .then(response => retrieveUnivNames(response.data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    function fetchAdmitTerms() {
        axios({
            method: 'get',
            url: 'http://localhost:5344/metadata/create-plan',
            headers: {
                "x-access-tokens": localStorage.getItem("HIED_TOKEN")
            }
        })
            .then(response => setAdmitTerms(response.data.admit_terms))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        fetchUniversities();
        fetchAdmitTerms();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    function handleCourseDeadlineResult(data) {
        console.log(data.course_deadline);
        setEndDate(new Date(data.course_deadline));
        setDaysDiff(Math.round(Math.abs((endDate - startDate) / oneDay)) + 1);
        setLoadingDeadline(false);
        setStarted(false);
    };

    function handleStartDateChange(date) {
        setStartDate(date);
        setDaysDiff(Math.round(Math.abs((endDate - date) / oneDay)) + 1);
    }

    function handleEndDateChange(date) {
        setEndDate(date);
        setDaysDiff(Math.round(Math.abs((date - startDate) / oneDay)) + 1);
    }

    function handlePlanCreationSuccess() {
        setState({open: false, openSuccess: true});
    }

    function invokeCreatePlan() {
        const params = {
            "name": planName,
            "university": univName,
            "course": courseName,
            "year": year,
            "admit_term": admitTerm,
            "area_of_specialization": "Robotics",
            "gre_score": greScore,
            "toefl_ielts_score": toeflScore,
            "start_date": startDate,
            "end_date": endDate
        };

        axios.post("http://localhost:5344/application/create", params)
            .then(res => handlePlanCreationSuccess(res.data))
            .catch(err => console.warn(err));
    }

    function handleTabSelect(tab) {

        if (tab === 1) {
            if (planName === "") {
                setPlanNameInvalid(true);
            } else {
                setPlanNameInvalid(false);
            }

            if (univName === "") {
                setUnivNameInvalid(true);
            } else {
                setUnivNameInvalid(false);
            }

            if (courseName === "") {
                setCourseNameInvalid(true);
            } else {
                setCourseNameInvalid(false);
            }

            if ((planName !== "") && (univName !== "") && (courseName !== "")) {
                setSelectedTab(1);
            }
        }
    }

    const handleFieldChange = (e) => {
        if (e.target.name == "full_name") {
            setPlanName(e.target.value);
        }
        else if (e.target.name == "univ_text") {
            setUnivName(e.target.value);

            axios({
                method: 'get',
                url: 'http://localhost:5344/university/view/courses?q=' + e.target.value,
                headers: {
                    "x-access-tokens": localStorage.getItem("HIED_TOKEN")
                }
            })
                .then(response => retrieveCourseNames(response.data))
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        else if (e.target.name == "course_text") {
            setCourseName(e.target.value);
        }
        else if (e.target.name == "gre_score") {
            setGreScore(e.target.value);
        }
        else if (e.target.name == "toefl_score") {
            setToeflScore(e.target.value);
        }
        else if (e.target.name == "admit_term") {
            setAdmitTerm(e.target.value);
            setLoadingDeadline(true);
            setStarted(false);

            const params = {
                "university": univName,
                "course": courseName,
                "admit_term": e.target.value
            };

            axios.post("http://localhost:5344/university/course-deadline", params)
                .then(res => handleCourseDeadlineResult(res.data))
                .catch(err => console.warn(err));
        }
        else if (e.target.name == "year") {
            setYear(e.target.value);
        }
    }

    function handleOpen() {
        setSelectedTab(0);
        setState({ open: true, openSuccess: false });
    };

    function handleClose() {
        setState({ open: false, openSuccess: false });
        setPlanName('');
        setUnivName('');
        setCourseName('');
        setGreScore('');
        setToeflScore('');
        setAdmitTerm('');
        setStarted(true);
        setLoadingDeadline(false);

        setCourseNameInvalid(false);
        setPlanNameInvalid(false);
        setUnivNameInvalid(false);

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



    return (
        <div>
            <IconButton onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={state.openSuccess}
                onClose={handleClose}
                scrollable={true}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <MainCard className={classes.maincardSuccess} elevation={16}>
                        <div className={classes.closeButton}>
                            <Fab aria-label="add" className={classes.fabclose}>
                                <IconButton onClick={handleOpen}>
                                    <CloseIcon />
                                </IconButton>
                            </Fab>
                        </div>
                        <div>
                            <div className={classes.createPlanSuccessHeading}>
                                <h1>Success ! - Plan Created</h1>
                            </div>

                            <div className={classes.createPlanText}>
                                <div className={classes.createPlanText1}>
                                    <img src={bulb} className={classes.bulbClass}></img>
                                </div>
                                <div className={classes.createPlanText2}>
                                    Congratulations ! Your plan for {univName} (Course: {courseName}) has been successfully created. 
                                    You can now view your plans under the "Plans" section on the left panel.
                                </div>
                            </div>
                        </div>
                    </MainCard>
                </div>
            </Modal>
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
                            <div className={classes.createPlanHeading}>
                                <h1>Create Plan</h1>
                            </div>

                            <div className={classes.createPlanText}>
                                <div className={classes.createPlanText1}>
                                    <img src={bulb} className={classes.bulbClass}></img>
                                </div>
                                <div className={classes.createPlanText2}>
                                    A plan helps you create your <u>Personal Calendar</u> for scheduling
                                    your application-related activities such as SOP creation,
                                    LOR requests, and much more. Go ahead and create one !
                                </div>
                            </div>

                            <div>
                                <Tabs selectedIndex={selectedTab}>
                                    <TabList>
                                        <Tab tabFor={0}>Basic</Tab>
                                        <Tab tabFor={1}>Advanced</Tab>
                                        <Tab tabFor={2}>Review & Create</Tab>
                                    </TabList>

                                    <TabPanel tabId={0}>
                                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                                            <Grid container spacing={gridSpacing}>
                                                <Grid container direction="row">
                                                    <Grid item>
                                                        <label className={classes.label}>Plan Name (e.g. Michigan Plan 04_10_21)</label>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <input
                                                            className={classes.input}
                                                            type="text"
                                                            name="full_name"
                                                            value={planName}
                                                            onChange={handleFieldChange}
                                                        />
                                                        {formik.errors.full_name && formik.touched.full_name && (
                                                            <p>{formik.errors.full_name}</p>
                                                        )}
                                                    </Grid>
                                                    {planNameInvalid ? (<Grid item>
                                                        <font color="red">Please enter a Plan Name</font>
                                                    </Grid>) : null}
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                </Grid>
                                                <Grid container direction="row">
                                                    <div>
                                                        <div className={classes.university}>
                                                            <Grid item>
                                                                <label className={classes.label}>University</label>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <br />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Autocomplete
                                                                    classes={{ inputRoot: classes.autocompleteClass }}
                                                                    value={univName}
                                                                    autoSelect
                                                                    freeSolo
                                                                    options={universities}
                                                                    id="combo-box-demo"
                                                                    sx={{ width: 300 }}
                                                                    name="university"
                                                                    onChange={e => handleFieldChange(e)}
                                                                    renderInput={(params) =>
                                                                        <TextField {...params} name="univ_text" onChange={e => handleFieldChange(e)} label="Select" />}
                                                                />
                                                                {formik.errors.full_name && formik.touched.full_name && (
                                                                    <p>{formik.errors.full_name}</p>
                                                                )}
                                                            </Grid>
                                                            {univNameInvalid ? (<Grid item>
                                                                <font color="red">Please select a University</font>
                                                            </Grid>) : null}
                                                        </div>
                                                        <div className={classes.course}>
                                                            <Grid item>
                                                                <label className={classes.label}>Course</label>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <br />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Autocomplete
                                                                    classes={{ inputRoot: classes.autocompleteClass }}
                                                                    autoSelect
                                                                    freeSolo
                                                                    name="course"
                                                                    value={courseName}
                                                                    options={courses}
                                                                    id="combo-box-demo"
                                                                    onChange={e => handleFieldChange(e)}
                                                                    sx={{ width: 300 }}
                                                                    renderInput={(params) =>
                                                                        <TextField name="course_text" onChange={e => handleFieldChange(e)} {...params} label="Select" />}
                                                                />
                                                                {formik.errors.full_name && formik.touched.full_name && (
                                                                    <p>{formik.errors.full_name}</p>
                                                                )}
                                                            </Grid>
                                                            {courseNameInvalid ? (<Grid item>
                                                                <font color="red">Please select a Course</font>
                                                            </Grid>) : null}
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
                                                        <Button className={classes.createPlan} onClick={() => handleTabSelect(1)}>Next</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </TabPanel>
                                    <TabPanel tabId={1}>
                                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                                            <Grid container spacing={gridSpacing}>
                                                <Grid container direction="row">
                                                    <Grid item>
                                                        <Grid container direction="column">
                                                            <Grid item>
                                                                <label className={classes.label}>GRE Score</label>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <input
                                                                    className={classes.input2}
                                                                    type="text"
                                                                    name="gre_score"
                                                                    value={greScore}
                                                                    onChange={e => handleFieldChange(e)}
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
                                                                <label className={classes.label}>TOEFL Score</label>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <input
                                                                    className={classes.input2}
                                                                    type="text"
                                                                    name="toefl_score"
                                                                    value={toeflScore}
                                                                    onChange={e => handleFieldChange(e)}
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
                                                    <div>
                                                        <div className={classes.university}>
                                                            <Grid item>
                                                                <label className={classes.label}>Admit Term</label>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <br />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Autocomplete
                                                                    classes={{ inputRoot: classes.autocompleteClass }}
                                                                    autoSelect
                                                                    freeSolo
                                                                    name="admit_term"
                                                                    value={admitTerm}
                                                                    options={admitTerms}
                                                                    id="combo-box-demo"
                                                                    sx={{ width: 300 }}
                                                                    onChange={e => handleFieldChange(e)}
                                                                    renderInput={(params) =>
                                                                        <TextField name="admit_term" onChange={e => handleFieldChange(e)} {...params} label="Select" />}
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
                                                    <Grid>
                                                        <Grid item>
                                                            <label className={classes.label}>Plan Start Date</label>
                                                        </Grid>
                                                        <Grid container direction="row">
                                                            <br />
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <DatePicker selected={startDate} onChange={(date) => handleStartDateChange(date)} className={classes.datepicker} />
                                                            {formik.errors.full_name && formik.touched.full_name && (
                                                                <p>{formik.errors.full_name}</p>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    {!started & loadingDeadline ? (<div className={classes.deadlineLoader}>
                                                        <center>
                                                            <img src={preloader} className={classes.preloader}></img>
                                                            <br />
                                                            <div className={classes.pleasewait}><b>Loading Application Deadline For University Of Michigan (MS CS)...</b></div>
                                                        </center>
                                                    </div>) : (<Grid>
                                                        <Grid item>
                                                            <label className={classes.label}>Plan End Date (Default As Per University Deadline)</label>
                                                        </Grid>
                                                        <Grid container direction="row">
                                                            <br />
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <DatePicker selected={endDate} onChange={(date) => handleEndDateChange(date)} className={classes.datepicker} />
                                                            {formik.errors.full_name && formik.touched.full_name && (
                                                                <p>{formik.errors.full_name}</p>
                                                            )}
                                                        </Grid>
                                                    </Grid>)}
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                </Grid>
                                                <Grid container direction="row">
                                                    <div className={classes.totalplanduration}>
                                                        Total Plan Duration : <font color="red">{daysDiff} {(daysDiff === 1) ? "day" : "days"}</font>
                                                    </div>
                                                </Grid>
                                                <Grid container direction="row">
                                                    <br />
                                                </Grid>
                                                <Grid container direction="row">
                                                    <Grid item>
                                                        <Button className={classes.createPlan} onClick={invokeCreatePlan}>+ Create Plan</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </MainCard>
                </div>
            </Modal>
        </div>
    );
}

CreatePlanForm.propTypes = {
    isLoading: PropTypes.bool
};

export default CreatePlanForm;