import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const CreatePlanForm = Loadable(lazy(() => import('views/utilities/CreatePlanForm')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

const ListPlans = Loadable(lazy(() => import('views/utilities/ListPlans')));
const ListDocs = Loadable(lazy(() => import('views/utilities/ListDocs')));
const Plan = Loadable(lazy(() => import('views/utilities/Plan')));
const DiscussionThreads = Loadable(lazy(() => import('views/utilities/DiscussionThreads')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/form',
            element: <CreatePlanForm />
        },
        {
            path: '/utils/plans',
            element: <ListPlans />
        },
        {
            path: '/utils/documents',
            element: <ListDocs />
        },
        {
            path: '/utils/discussions',
            element: <DiscussionThreads />
        },
        {
            path: '/utils/plan',
            element: <Plan />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },

        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
