import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, fabClasses, Grid, Menu, MenuItem, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreatePlanForm from '../../utilities/CreatePlanForm';

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

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: "#fff",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: theme.shadows[5],
        opacity: '90%',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            opacity: 0.1,
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
            opacity: 0.2,
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
        opacity: '100%',
        color: theme.palette.secondary.dark
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
}));

//= ==========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const MakePlansCard = ({ isLoading }) => {
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
                                            <CreatePlanForm />
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

MakePlansCard.propTypes = {
    isLoading: PropTypes.bool
};

export default MakePlansCard;
