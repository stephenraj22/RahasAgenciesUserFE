import {React,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor:"#1f1f1f"
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
          style={{width:'100%',height:'4rem',position: 'fixed',left: 0,bottom: 0}}
        >
            <div>
                <Typography  variant="h6" align='center' style={{color:'white'}}  noWrap>
                        Grand Total:{props.price} Rs
                </Typography>
            </div>
        </BottomNavigation>
    </div>
    
  );
}