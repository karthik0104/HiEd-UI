import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

import news1 from './../../../assets/images/news1.jpg';
import news2 from './../../../assets/images/news2.jpg';

// style constant
const useStyles = makeStyles((theme) => ({
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center'
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px',
        borderColor: 'grey',
        boxShadow: '0.2px 0.2px 0.2px 0.2px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    },
    news: {
        marginTop: '15px'
    },
    views: {
        fontSize: '10px',
        fontWeight: 'bold',
        marginTop: '15px',
        float: 'right',
        color: theme.palette.secondary.dark
    },
    topnewsheading: {
        backgroundColor: theme.palette.secondary.dark,
        width: '100%',
        maxWidth: '100%'
    },
    topnewscard: {
        backgroundColor: "white",
        boxShadow: '0.7px 0.7px 0.7px 0.7px',
        opacity: '90%',

    }
}));

// ===========================|| DASHBOARD DEFAULT - POPULAR CARD ||=========================== //

const TopNewsCard = ({ isLoading }) => {
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
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false} className={classes.topnewscard}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <div>
                                            <Typography variant="h3">Top News</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            className={classes.primaryLight}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column">
                                    <Divider className={classes.divider} />
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <img src={news1} width="350" height="250" />
                                                </Grid>
                                                <br />
                                                <Grid item>
                                                    <Typography variant="h3" color="black">
                                                        USA allows more visas to be issued for Masters Students
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <div className={classes.news}>
                                                        <Typography color="inherit">
                                                            Joe Biden announces that there would be 100K more visas issues for students planning for Masters
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <div className={classes.views}>
                                                            34 people viewing this post
                                                        </div>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <img src={news2} width="350" height="250" />
                                                </Grid>
                                                <br />
                                                <Grid item>
                                                    <Typography variant="h3" color="black">
                                                        USA allows more visas to be issued for Masters Students
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <div className={classes.news}>
                                                        <Typography color="inherit">
                                                            Joe Biden announces that there would be 100K more visas issues for students planning for Masters
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <div className={classes.views}>
                                                            34 people viewing this post
                                                        </div>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

TopNewsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TopNewsCard;
