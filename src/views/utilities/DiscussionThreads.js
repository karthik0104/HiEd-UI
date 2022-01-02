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
import PlanCard from "./PlanCard";
import DiscussionThreadCard from "./DiscussionThreadCard";
import DiscussionThreadReplyCard from "./DiscussionThreadReplyCard";
import DiscussionThreadAddReplyCard from "./DiscussionThreadAddReplyCard";
import DiscussionThreadAddPostCard from "./DiscussionThreadAddPostCard";
import DiscussionThreadTagsCard from "./DiscussionThreadTagsCard";


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

    card: {
        width: "100%"
    },
    newPostButton: {
        backgroundColor: theme.palette.secondary.dark,
        color: 'white',
        marginBottom: '20px',
        width: '100px'
    }
}));

const DiscussionThreads = ({ isLoading }) => {
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

    const [state, setState] = useState({ open: false });
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = React.useState('1');
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [plans, setPlans] = React.useState([]);
    const [discussionThreads, setDiscussionThreads] = React.useState([]);
    const [showRepliesMap, setShowRepliesMap] = React.useState({});

    const tabCount = 3;
    const axios = require('axios');
    const pathArray = window.location.pathname.split('/');
    const groupId = pathArray[4];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleOpen() {
        setSelectedTab(0);
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
            transform: 'translate(-50%, -50%)',
            zIndex: 7000,
        };
    }

    function stringifyValue(value) {
        return '' + value;
    }

    function handleFetchGroupDiscussionThreadsResponse(data) {
        setDiscussionThreads(data.discussion_threads);

        data.discussion_threads.map(dt => (showRepliesMap[stringifyValue(dt.id)] = false));
    }

    function fetchGroupDiscussionThreads() {
        axios({
            method: 'get',
            url: 'http://localhost:5344/social/discussion-threads/' + groupId,
            headers: {
                "x-access-tokens": localStorage.getItem("HIED_TOKEN")
            }
        })
            .then(response => handleFetchGroupDiscussionThreadsResponse(response.data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    function handleRepliesToggle(id) {
        console.log(id);
    }

    function toggleAddReplyCard(addReplyId) {
        var strAddReplyId = stringifyValue(addReplyId);
        setShowRepliesMap({[strAddReplyId] : !showRepliesMap[strAddReplyId]});
    }

    useEffect(() => {
        fetchGroupDiscussionThreads();
    }, []);

    return (
        <div>
            <h2>Discussion Group - Michigan University Admissions</h2>
            <hr />
            <br />

            <Button className={classes.newPostButton}>+ New Post</Button>

            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                <DiscussionThreadTagsCard />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <DiscussionThreadAddPostCard isLoading={false} groupId={groupId} />
                        </Grid>
                    </Grid>
                </Grid>
                <hr />
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <h2>Posts</h2>
                        </Grid>
                    </Grid>
                </Grid>
                {((discussionThreads.length) ? null : (
                    <>
                        <br />
                        There are no posts here in this group
                    </>
                ))}
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <DiscussionThreadCard title="Test Post" content="This is just a test post !" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <DiscussionThreadAddReplyCard />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <DiscussionThreadReplyCard />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <DiscussionThreadReplyCard />
                        </Grid>
                    </Grid>
                </Grid>
                <hr />
                {discussionThreads.map(dt => (
                    <>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                    <DiscussionThreadCard id={dt.id} title={dt.title} content={dt.content} handleRepliesToggle={handleRepliesToggle} toggleAddReplyCard={toggleAddReplyCard} showAddReply={(stringifyValue(dt.id) in showRepliesMap) ? showRepliesMap[stringifyValue(dt.id)] : false} showReplies={false} />
                                </Grid>
                            </Grid>
                        </Grid>
                        {showRepliesMap[stringifyValue(dt.id)] ? (<Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                    <DiscussionThreadAddReplyCard />
                                </Grid>
                            </Grid>
                        </Grid>) : null}
                        <hr />
                    </>))}
            </Grid>
        </div>
    );
}

DiscussionThreads.propTypes = {
    isLoading: PropTypes.bool
};

export default DiscussionThreads;