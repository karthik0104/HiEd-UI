// material-ui
import { styled } from '@material-ui/styles';

import bulb from './../../../assets/images/higheredu.jpg'

// ===========================|| AUTHENTICATION 1 WRAPPER ||=========================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundImage: `url(${bulb})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    opacity: '100%'
}));

export default AuthWrapper1;
