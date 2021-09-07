import React from 'react';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar:{
    backgroundColor:"black"
  },
  bigDevice:{
    [theme.breakpoints.up('sm')]:{
      display:'none'
    },
    
  },
  smallDevice:{
    [theme.breakpoints.up('xs')]:{
      display:'none'
    },
    [theme.breakpoints.up('sm')]:{
      display:'block',
      marginLeft:theme.spacing(80)
      
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
  },
  search: {   
      [theme.breakpoints.up('xs')]: {
          marginRight:1,
          width:'100%'
      },     
      display:'block',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'white',
  },
  
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
          {
            props.page === 'home' ? <span></span> : props.page == 'buy'? <ArrowBackRoundedIcon onClick={
              () => {history.replace('/cart')}
            } /> :<ArrowBackRoundedIcon onClick={
              () => {history.replace('/')}
            }/>
          }
          </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
               {props.title}
            </Typography>
                  
          <div className={classes.grow} />
          {props.page !== 'OrderSuccessful' && <div >
            <IconButton aria-label="show 4 new mails" color="inherit">
                <ShoppingCartIcon onClick={()=>{
                  history.replace('/cart')
                }}/>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <NotificationsIcon />
            </IconButton>
          </div>}
        </Toolbar>
        
       
      </AppBar>
      
    </div>
  );
}
