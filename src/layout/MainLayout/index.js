import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar, CssBaseline, Toolbar, useMediaQuery, Backdrop, CircularProgress, Button, SnackbarContent, Alert } from '@material-ui/core';

// third-party
import clsx from 'clsx';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import navigation from 'menu-items';
import { drawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';

// assets
import { IconChevronRight } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.background.default,
        zIndex: 4000
    },
    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default,
        zIndex: 4000
    },
    content: {
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    },
    backdrop: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 5000,
        left: 0,
        top: 0
    },
    closeButton: {
        color: "red",
        fontSize: '18px',
        position: 'absolute',
        top: '0',
        right: '0',
        margin: '30px',
        backgroundColor: theme.palette.secondary.dark
    },
    snackbar: {
        position: 'absolute',
        horzontal: 'center',
        top: '0',
        width: '40%',
        marginLeft: '30%'
    }
}));

// ===========================|| MAIN LAYOUT ||=========================== //

const MainLayout = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    const action = (
        <Button color="primary" size="small">
          CLOSE
        </Button>
      );

    React.useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop}
            open={false}
            >
                <div className={classes.closeButton}>
                    <Button>X Close</Button>
                </div>
                <CircularProgress color="inherit" />
                <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                    width= '800'
                    height= '500'
                    frameborder='5'
                    allow='autoplay; encrypted-media'
                    allowfullscreen
                    title='video' />
                <Button>Close</Button>
            </Backdrop>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                className={leftDrawerOpened ? classes.appBarWidth : classes.appBar}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                    <div className={classes.snackbar}>
                    <SnackbarContent
                        open= {true}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center"
                         }}
                         message="You can access the How-To Video anytime from the Sidebar menu"
                         action={action}
                    >
                    </SnackbarContent>
                    </div>
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* main content */}
            <main
                className={clsx([
                    classes.content,
                    {
                        [classes.contentShift]: leftDrawerOpened
                    }
                ])}
            >
                {/* breadcrumb */}
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                <Outlet />
            </main>
            <Customization />
        </div>
    );
};

export default MainLayout;
