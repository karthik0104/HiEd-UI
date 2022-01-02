import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { socket } from 'common';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, fabClasses, Grid, Menu, MenuItem, Typography, TextField, Button, Modal, CircularProgress } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Attachment from '@material-ui/icons/Attachment'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility';

import preloader from './../../assets/images/wave_loader1.svg';
import congrats from './../../assets/images/cracker.png';

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
        backgroundColor: "#F7F6F6",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: theme.shadows[5],
        opacity: '100%',
        width: '1000px',
        border: '0px solid purple'
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
    addReplyTitle: {
        width: '900px',
        marginBottom: '20px'
    },
    addReplyTitleName: {
        marginTop: '20px'
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
    backDrop: {
        background: 'rgba(255,255,255,0.8)',
    },
    maincardSuccess: {
        backgroundColor: "#F7F6F6",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        opacity: '100%',
        width: '600px',
        border: '0px solid purple',
        borderRadius: '15px',
        outline: 'none'
    },
    pleaseWait: {
        color: 'black',
        'marginTop': '20px'
    },
    congrats: {
        width: '250px',
        height: '250px'
    },
    viewPost: {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        padding: '10px',
        width: '300px'
    }

}));

//= ==========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const DiscussionThreadAddPostCard = ({ isLoading, groupId }) => {
    const axios = require('axios');

    const classes = useStyles();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [state, setState] = useState({ open: false, openSuccess: false });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setState({open: false});
    };

    const addClick = name => () => {
        console.log(name);
    };

    function handleSharePost() {
        socket.emit("message", {
            "message_type": "add_thread", "user_id": 1, "title": title, "content": content, "group_id": groupId, "username": "karthik",
            "user_autofollow": true
        });
        
        setState({open: true});
    }

    socket.on("message", (data) => {
        setState({open: false, openSuccess: true});
        setTitle('');
        setContent('');

        if ((typeof data !== "string") && ("message_type" in data) && (data["message_type"] === "similar_words")) {

        }
    });

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
            outline: 'none',
            borderRadius: '5px'
        };
    }

    return (
        <>
            {isLoading ? (
                <SkeletonMakePlansCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={state.open}
                        onClose={handleClose}
                        scrollable={true}
                    >
                        <div style={getModalStyle()} className={classes.paper}>
                            <MainCard className={classes.maincardSuccess} elevation={16}>
                                <div>
                                    <center>
                                        <img src={preloader} className={classes.preloader}></img>
                                        <div className={classes.pleaseWait}>
                                            <h3>Your post is being prepared... Almost ready in a few seconds !</h3>
                                        </div>
                                    </center>
                                </div>
                            </MainCard>
                        </div>
                    </Modal>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={state.openSuccess}
                        onClose={handleClose}
                        scrollable={true}
                    >
                        <div style={getModalStyle()} className={classes.paper}>
                            <MainCard className={classes.maincardSuccess} elevation={16}>
                                <div>
                                    <center>
                                        <img src={congrats} className={classes.congrats}></img>
                                        <div className={classes.pleaseWait}>
                                            <h3>Congratulations !! Your post is now shared !</h3>
                                        </div>
                                        <Button className={classes.viewPost} onClick={handleClose}>View / Edit Post</Button>
                                    </center>
                                </div>
                            </MainCard>
                        </div>
                    </Modal>
                    <div className={classes.divcontent}>
                        <h3>Share A Post</h3>
                        <hr />
                        <div className={classes.addReplyTitleName}>
                            <b>Title</b>
                        </div>
                        <br />
                        <TextField
                            className={classes.addReplyTitle}
                            style={{ textAlign: 'left' }}
                            hintText="Message Field"
                            floatingLabelText="MultiLine and FloatingLabel"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            rows={1}
                        />
                        <TextField
                            className={classes.addReply}
                            style={{ textAlign: 'left' }}
                            hintText="Message Field"
                            floatingLabelText="MultiLine and FloatingLabel"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            multiline
                            rows={2}
                        />
                        <br />
                        <div>
                            <Button className={classes.addReplyButton} onClick={handleSharePost}>Share</Button>
                            <Attachment className={classes.postAttachment} />
                        </div>
                    </div>

                </MainCard>
            )}
        </>
    );
};

DiscussionThreadAddPostCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DiscussionThreadAddPostCard;
