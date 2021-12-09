// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandFramer,
    IconLayoutGridAdd
};

// ===========================|| UTILITIES MENU ITEMS ||=========================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'plans',
            title: 'Plans',
            type: 'item',
            url: '/utils/plans',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'documents',
            title: 'Documents',
            type: 'item',
            url: '/utils/documents',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Universities',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'util-discussions',
            title: 'Discussions',
            type: 'item',
            url: '/utils/discussions',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'util-social',
            title: 'Social',
            type: 'item',
            url: '/utils/util-social',
            icon: icons.IconShadow,
            breadcrumbs: false
        }

    ]
};

export default utilities;
