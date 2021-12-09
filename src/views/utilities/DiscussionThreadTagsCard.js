import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, fabClasses, Grid, Menu, MenuItem, Typography, TextField, Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Attachment from '@material-ui/icons/Attachment'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonMakePlansCard from 'ui-component/cards/Skeleton/MakePlansCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppOutlined';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveOutlined';

import ProgressBar from "@ramonak/react-progress-bar";
import AttachFile from "@material-ui/icons/AttachFile";

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: "#FAFBF0",
        color: '#fff',
        overflow: 'hidden',
        boxShadow: theme.shadows[5],
        opacity: '100%',
        width: '350px',
    },
    tagsContent: {
        right: '30px',
        top: '200px',
        position: 'absolute',
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    },
    cardTitle: {
        margin: '10px',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        paddingTop: '10px',
        opacity: '100%',
        color: theme.palette.secondary.dark
    },
    hr: {
        width: '275px',
        maxWidth: '275px',
        borderWidth: '2px',
        borderColor: theme.palette.secondary[200],
        opacity: '50%'
    },
    questionmark: {
        display: 'flex',
        float: 'right',
        marginLeft: '100px',
        paddingTop: '20px'
    },
    cardText: {
        padding: '10px',
        fontSize: '11px',
        width: '90%',
        opacity: '70%',
        fontFamily: 'Arial',
        letterSpacing: '0.5px',
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '5px',
        boxShadow: '0.2px 0.2px 0.2px 0.2px grey'
    },
    fabdiv: {
        marginLeft: '0',
        marginTop: '10px',
        position: 'absolute',
        right: '0',
        top: '0',
        zIndex: '500'
    },
    fab: {
        margin: '5px',
        backgroundColor: theme.palette.secondary[200]
    },
    stats: {
        fontSize: '10px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        color: "black"
    },
    hrtop: {
        color: 'black',
        borderColor: 'black'
    },
    planName: {
        backgroundColor: theme.palette.primary.light,
        width: '275px',
        maxWidth: '275px',
        color: 'black',
        paddingLeft: '20px',
        paddingTop: '1px',
        paddingBottom: '1px',
        borderRadius: '10px',
        fontWeight: 'bold',
    },
    dayspending: {
        color: 'black',
        marginLeft: '10px',
        textAlign: 'center'
    },
    dayspending2: {
        color: 'black',
        marginLeft: '40px',
        textAlign: 'center',
    },
    dayspending3: {
        color: 'black',
        marginLeft: '40px',
        textAlign: 'center',
        marginTop: '12px',
        backgroundColor: "#F9EBEA",
        padding: '15px',
        borderRadius: '10px',
    },
    pb: {
        width: '300px',
        maxWidth: '300px'
    },
    pbText: {
        color: 'black'
    },
    addButton: {
        color: 'white',
        width: '40%',
        height: '40%',
        marginTop: '100px',
        marginLeft: '80px',
    },
    addButtonText: {
        color: 'white',
        width: '60%',
        height: '60%',
        marginLeft: '95px',
    },
    divcontent: {
        color: 'black'
    },
    vl: {
        borderLeft: '6px solid green',
        height: '90%',
        float: 'left',
        position: 'absolute',
        top: '2px',
        marginLeft: '-20px'
    },
    addReply: {
        width: '900px'
    },
    addReplyButton: {
        float: 'left',
        marginLeft: '-1px',
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        margin: '10px'
    },
    postAttachment: {
        marginTop: '15px',
        marginLeft: '5px'
    },
    tags: {
        color: "red",
        backgroundColor: theme.palette.orange.light,
        fontSize: "12px",
        marginBottom: "10px",
        marginRight: "5px"
    },

}));

//= ==========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const NewPlanCard = ({ isLoading }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const addClick = name => () => {
        console.log(name);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonMakePlansCard />
            ) : (
                <div className={classes.tagsContent}>
                <h2>Tags</h2>
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <div className={classes.divcontent}>
                        <div>
                            <Button className={classes.tags}>Admission</Button>
                            <Button className={classes.tags}>Query</Button>
                            <Button className={classes.tags}>Process</Button>
                            <Button className={classes.tags}>Admission</Button>
                            <Button className={classes.tags}>Query</Button>
                            <Button className={classes.tags}>Process</Button>
                        </div>
                    </div>

                </MainCard>
                </div>
            )}
        </>
    );
};

NewPlanCard.propTypes = {
    isLoading: PropTypes.bool
};

export default NewPlanCard;
