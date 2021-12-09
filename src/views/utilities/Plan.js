import PropTypes from 'prop-types';
import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/styles';

import MainCard from 'ui-component/cards/MainCard';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography, Autocomplete, TextField, Paper } from '@material-ui/core';
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
import StageCard from "./StageCard";
import NewPlanCard from "./NewPlanCard";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableContainer } from "@material-ui/core";

import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    label: {
        color: 'darkgrey'
    },

    card: {
        width: "100%"
    },
    tablePaper: {
        backgroundColor: "#FAFCFD",
        height: "1000px"
    },
    timelineVerticalLine: {
        borderLeft: '3px solid purple',
        height: '700px',
        position: 'absolute',
        marginLeft: '500px',
    },
    dividerVerticalLine: {
        borderLeft: '1px solid gray',
        height: '700px',
        position: 'absolute',
        marginLeft: '1000px',
    },
    timelineDot: {
        height: '30px',
        width: '30px',
        backgroundColor: 'purple',
        borderRadius: '50%',
        display: 'inline-block',
        position: 'absolute'
    },
    timelineDot2: {
        marginLeft: '-33px',
        height: '30px',
        width: '30px',
        backgroundColor: 'purple',
        borderRadius: '50%',
        display: 'inline-block',
        position: 'absolute'
    },
    card1: {
        marginLeft: '45px',
        width: '350px',
        color: 'purple',
        opacity: '50%'
    },
    card2: {
        marginLeft: '-400px',
        width: '350px',
        textAlign: 'right',
        color: 'purple',
    },
    sideCard: {
        marginLeft: '1030px',
        width: '350px',
        position: 'absolute',
    },
    numDays: {
        borderLeft: '7px solid green',
        height: '100%',
        position: 'absolute',
        marginLeft: '420px',
        marginTop: '-220px',
        opacity: '50%'
    },
    numDaysNumber: {
        color: 'green',
        marginTop: '100px',
        marginLeft: '10px',
        width: '50px'
    },
    numDays2: {
        borderLeft: '7px solid green',
        height: '100%',
        position: 'absolute',
        marginLeft: '-440px',
        marginTop: '-220px'
    },
    numDaysNumber2: {
        color: 'green',
        marginTop: '100px',
        marginLeft: '-60px',
        width: '50px'
    }
}));

const ListDocs = ({ isLoading }) => {
    const classes = useStyles();

    const [state, setState] = useState({ open: false });
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = React.useState('1');
    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabCount = 3;

    const [rows, setRows] = React.useState([{ "id": 1, "name": "Document 1", "dataset_name": "Univ 1" },
    { "id": 2, "name": "Document 1", "dataset_name": "Univ 1" },
    { "id": 3, "name": "Document 1", "dataset_name": "Univ 1" }]);

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

    const margins = ['0px', '250px', '500px'];


    return (
        <div style={{ 'height': '1000px' }}>
            <h1>Plan</h1>
            <br />

            <IconButton onClick={handleOpen}>
                <AddIcon />
            </IconButton>

            <div className={classes.dividerVerticalLine}></div>
            <div className={classes.sideCard}>
                <StageCard />
            </div>
            

            {/*<Paper className={classes.tablePaper}>*/}
            <div className={classes.timelineVerticalLine}>
                <div style={{ 'marginTop': margins[0], 'position': 'absolute' }}>
                    <div className={classes.timelineDot}>
                    </div>
                    <div className={classes.card1}>
                        <b>5th January, 2021</b>
                        <hr />
                        <StageCard />
                    </div>
                    <div className={classes.numDays}>
                        <div className={classes.numDaysNumber}>
                            <b>30 days left</b>
                        </div>
                    </div>
                </div>
                <div style={{ 'marginTop': margins[1], 'position': 'absolute' }}>
                    <div className={classes.timelineDot2}>
                    </div>
                    <div className={classes.card2}>
                        <b>5th January, 2021</b>
                        <hr />
                        <StageCard />
                    </div>
                    <div className={classes.numDays2}>
                        <div className={classes.numDaysNumber2}>
                            <b>30 days left</b>
                        </div>
                    </div>
                </div>
                <div style={{ 'marginTop': margins[2], 'position': 'absolute' }}>
                    <div className={classes.timelineDot}>
                    </div>
                    <div className={classes.card1}>
                        <b>5th January, 2021</b>
                        <hr />
                        <StageCard />
                    </div>
                    <div className={classes.numDays}>
                        <div className={classes.numDaysNumber}>
                            <b>30 days left</b>
                        </div>
                    </div>
                </div>
            </div>
            {/*</Paper>*/}
        </div>
    );
}

ListDocs.propTypes = {
    isLoading: PropTypes.bool
};

export default ListDocs;