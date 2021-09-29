import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, fabClasses, Grid, Menu, MenuItem, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppOutlined';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveOutlined';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '1px 1px 1px 1px grey',
        opacity: '85%',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
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
        opacity: '90%'
    },
    hr: {
        width: '260px',
        maxWidth: '260px',
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
        boxShadow: '1px 1px 1px 1px'
    },
    fabdiv: {
        marginLeft: '0',
        marginTop: '10px',
        position: 'relative'
    },
    fab: {
        margin: '5px',
        backgroundColor: theme.palette.secondary[800]
    },
    stats: {
        fontSize: '10px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        color: 'orange'
    },
    hrtop: {
        color: 'orange',
        borderColor: 'orange'
    }
}));

//= ==========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const EarningCard = ({ isLoading }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="row">
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <div className={classes.stats}>You have 5 plans in progress</div>
                                <hr className={classes.hrtop} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatar}>
                                        <img src={EarningIcon} alt="Notification" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <div className={classes.cardTitle}>Make Plans</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <hr className={classes.hr} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <div className={classes.cardText}>
                                        Plans are a great way to manage your University applications. Check them out now !
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className={classes.fabdiv}>
                                        <Fab color="secondary" aria-label="add" className={classes.fab}>
                                            <AddIcon />
                                        </Fab>
                                        <Fab color="secondary" aria-label="add" className={classes.fab}>
                                            <VisibilityIcon>View</VisibilityIcon>
                                        </Fab>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
