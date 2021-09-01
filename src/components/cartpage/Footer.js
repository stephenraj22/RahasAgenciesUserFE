import {React,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor:"#d48eae"
  },
  typo1:{
    [theme.breakpoints.up('xs')]:{
        marginTop:'13px',
        marginLeft:'250px'
    },
    [theme.breakpoints.up('sm')]:{
        marginTop:'13px',
        marginLeft:theme.spacing(170)
    }
  },
 
}));

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  console.log(props.price*(50/100))
  const [discount,setDiscount] = useState(9)
  return (
    <div >
        <BottomNavigation
          className={classes.root}
          style={{width:'100%',height:'6rem',position: 'fixed',left: 0,bottom: 0}}
        >
            <div>
                <Typography  variant="h6" align='center' style={{color:'white'}}  noWrap>
                         Total:{props.price}
                </Typography>
                <Typography  variant="h6" align='center' style={{color:'white'}}  noWrap>
                         Discount:{props.price*(50/100)}
                </Typography>
                <Typography  variant="h6" align='center'  style={{color:'white'}} noWrap>
                         Final Price:{props.price - props.price*(Number(process.env.REACT_APP_OVERALL_DISCOUNT)/100)}
                </Typography>
            </div>
        </BottomNavigation>
    </div>
    
  );
}