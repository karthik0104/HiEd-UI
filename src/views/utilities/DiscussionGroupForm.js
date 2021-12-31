import React from 'react';
import { useEffect } from 'react';

// material-ui
import { Typography, Grid, Button, Slider, Stepper, Step, StepLabel, Autocomplete, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: '10px',
    },
    table: {
        minWidth: 450,
        marginLeft: 10
    },
    selectTableCell: {
        width: 60
    },
    tableHeadCell: {
        width: 130,
        position: "sticky",
        backgroundColor: "#1F618D",
        top: 0,
        opacity: "100%",
        zIndex: 5000,
        color: "#fff"
    },
    tableCell: {
        width: 200,
        height: 10,
        maxHeight: 10,
    },
    /*tablerow: {
        height: 10,
        maxHeight: 10,
        padding: "0px"
    },*/
    input: {
        width: 130,
        height: 40
    },
    tablecontainer: {
        maxHeight: 450,
        height: 450
    },
    headCellText: {
        'float': 'left',
        'position': 'absolute'
    },
    headCellMenu: {
        'float': 'right',
        'maxHeight': 30,
        'marginTop': -7,
    },
    searchbar: {
        width: 300,
        height: 300,
        backgroundColor: 'black'
    },
    search: {
        padding: '10px',
        float: 'left'
    },
    ctbutton: {
        backgroundColor: '#B6FADB',
        color: 'green',
        marginBottom: '30px',
        float: 'left'
    },
    input: {
        width: '400px',
        letterSpacing: '0.2px',
        fontSize: '17px'
    },
    cancelbutton: {
        backgroundColor: '#F9DDF0',
        color: 'red',
        marginLeft: '5px'
    },
    selectInput: {
        backgroundColor: "#FFF",
        outline: "none",
        border: "none",
        boxShadow: "none",
        marginTop: "2px",
        width: "300px",
        height: "40px"
    }
}));

//= =============================|| SAMPLE PAGE ||==============================//


const DiscussionGroupForm = (props) => {
    const classes = useStyles();

    const [rows, setRows] = React.useState([{ "task_id": 1 }, { "task_id": 2 }]);
    const [universities, setUniversities] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [admitTerms, setAdmitTerms] = React.useState([]);
    const [groupName, setGroupName] = React.useState([]);
    const [groupDescription, setGroupDescription] = React.useState([]);
    const [universityId, setUniversityId] = React.useState('');
    const [univName, setUnivName] = React.useState('');
    const [courseName, setCourseName] = React.useState('');
    const [admitTerm, setAdmitTerm] = React.useState('');
    const [year, setYear] = React.useState('');
    const [state, setState] = React.useState({open: false, openSuccess: false});

    const axios = require('axios');

    const handleFieldChange = (e) => {
        if (e.target.name == "group_name") {
            setGroupName(e.target.value);
        }
        else if (e.target.name == "group_description") {
            setGroupDescription(e.target.value);

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
        else if (e.target.name == "course") {
            setCourseName(e.target.value);
        }
        else if (e.target.name == "university") {
            setUnivName(e.target.value);
        }
        else if (e.target.name == "admit_term") {
            setAdmitTerm(e.target.value);
            //setLoadingDeadline(true);
            //setStarted(false);
            /*
            const params = {
                "university": univName,
                "course": courseName,
                "admit_term": e.target.value
            };

            axios.post("http://localhost:5344/university/course-deadline", params)
                .then(res => handleCourseDeadlineResult(res.data))
                .catch(err => console.warn(err));
                */
        }
        else if (e.target.name == "year") {
            setYear(e.target.value);
        }
    }

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

    function handleGroupCreationSuccess() {
        setState({open: false, openSuccess: true});
        props.fetchDiscussionGroups();
        props.handleClose();
    }

    function createDiscussionGroup() {
        const params = {
            "name": groupName,
            "description": groupDescription,
            "university": univName,
            "course": courseName,
            "year": year,
            "admit_term": admitTerm,
            "area_of_specialization": "Robotics",
        };

        axios.post("http://localhost:5344/social/discussion-group/create", params)
            .then(res => handleGroupCreationSuccess(res.data))
            .catch(err => console.warn(err));
    }

    useEffect(() => {
        fetchUniversities();
        fetchAdmitTerms();
    }, []);

    return (
        <div>
            {
                <MainCard title="Create New Group" className={classes.card} elevation={16}>

                    <Grid>
                        <Grid item xs={36}>
                            <Grid container direction="row" spacing={1}>
                                <Grid item xs={4} >
                                    <Typography variant="body2">
                                        <b>Group Name</b>
                                    </Typography>
                                    <Input
                                        placeholder="Placeholder"
                                        className={classes.input}
                                        onChange={e => setGroupName(e.target.value)}
                                        value={groupName}
                                        name="group_name"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid item xs={36}>
                            <Grid container direction="column" spacing={1}>

                            </Grid>
                        </Grid>
                        <br />
                        {/*<Grid item xs={36}>
                            <Grid container direction="row" spacing={1}>
                                <Grid item xs={4} >
                                    <Typography variant="body2">
                                        <b>Assignee</b>
                                    </Typography>
                                    <Select
                                        className={classes.selectInput}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={taskDatasetId}
                                        onChange={e => setTaskDatasetId(e.target.value)}
                                        label="Client"
                                    >
                                        {datasetRows.map(datasetRow => (
                                            <MenuItem value={datasetRow.id}>{datasetRow.file_name}</MenuItem>)
                                        )
                                        }
                                    </Select>
                                </Grid>
                            </Grid>
                                    </Grid>*/}
                        <br />
                        <Grid item xs={36}>
                            <Grid container direction="row" spacing={1}>
                                <Grid item xs={4} >
                                    <Typography variant="body2">
                                        <b>Description</b>
                                    </Typography>
                                    <Input
                                        placeholder="Placeholder"
                                        className={classes.input}
                                        onChange={e => setGroupDescription(e.target.value)}
                                        multiline={true}
                                        name="group_description"
                                        value={groupDescription}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid item xs={36}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item xs={4} >
                                    <Typography variant="body2">
                                        <b>Associated University (If Applicable)</b>
                                    </Typography>
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
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid item xs={36}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item xs={4} >
                                    <Typography variant="body2">
                                        <b>Associated Course (If Applicable)</b>
                                    </Typography>
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
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <br />
                    <br />

                    <Button variant="fab" color="primary" aria-label="Increase" className={classes.ctbutton}
                        onClick={() => createDiscussionGroup()}>
                        Create
                    </Button>
                    <Button variant="fab" color="primary" aria-label="Increase" className={classes.cancelbutton}
                        onClick={() => props.handleClose()}>
                        Cancel
                    </Button>
                </MainCard>
            }
        </div >
    );

};

export default DiscussionGroupForm;
