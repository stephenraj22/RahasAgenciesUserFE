import React, { useEffect, useState,useRef } from 'react'
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import CallIcon from '@material-ui/icons/Call';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import photo from './1628340569016QFIexcRMicrosoftTeams-image.png'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import { Fireworks } from 'fireworks-js/dist/react'
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import standardImage from './image001.png'
import firebase from '../firebase'
const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
      "& $notchedOutline": {
        borderColor: "#FFFFFF"
      },
      "&:hover $notchedOutline": {
        borderColor: "#FFFFFF"
      },
      "&$focused $notchedOutline": {
        borderColor: "#FFFFFF"
      }
    },
    focused: {},
    notchedOutline: {}
  }));
  
const productsForHome = gql`
{
    productsForHome{
      products{
        productName
        pricePkt
        categoryId
        size
      }
      categories{
        categoryName
        id
      }
    }
}
`
const addCustomerMessage = gql`
    mutation($name:String!,$phoneNo:String!,$message:String!){
        addCustomerMessage(name:$name,phoneNo:$phoneNo,message:$message)
    }
`
const useStyles = makeStyles((theme) => ({
    box:{
        [theme.breakpoints.up('xs')]:{
            width: '19rem', height: '23rem',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.up('sm')]:{
            width: '20rem', height: '24rem',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },

    },
    textBox:{
        [theme.breakpoints.up('xs')]: {
            width:"100%",
            height:"50px",
            marginTop:"10px",
            paddingBottom:6
        },
        [theme.breakpoints.up('sm')]: {
            width:"100%",
            paddingBottom:6
        } 
    },
    topDiv:{
        [theme.breakpoints.up('xs')]: {
            position:'relative',
            width:'100%',
            height:'4rem'
        },
        [theme.breakpoints.up('sm')]: {
            position:'relative',
            width:'100%',
            height:'4rem'
        },
        
    },
    selectBox:{
        [theme.breakpoints.up('xs')]:{
            height:"52px",marginBottom:"20px",
        },
        [theme.breakpoints.up('sm')]:{
            height:"50px",marginBottom:"20px"
        },
    },
    isMobile:{
        [theme.breakpoints.up('xs')]:{
            height: '3rem',width:"100%",
            
        },
        [theme.breakpoints.up('sm')]:{
            height:'5rem',
        }
    },
    textDiv:{
        [theme.breakpoints.up('xs')]:{
            color:'white',textAlign:"center",marginLeft:"130px",fontSize:"25px", marginTop:"10px",
            fontWeight:600,fontFamily:"serif",height:"9px"
            
        },
        [theme.breakpoints.up('sm')]:{
            color:'white',textAlign:"center",fontSize:"50px",marginTop:"10px"
        }
    },
    textDiv1:{
        [theme.breakpoints.up('xs')]:{
            position:"relative",color:'white',textAlign:"center",zIndex:200,marginLeft: 'auto',
            marginRight: 'auto',width:"95%"
            
        },
        [theme.breakpoints.up('md')]:{
            position:"relative",width:"50%",color:'white',zIndex:200,marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    textDiv2:{
        [theme.breakpoints.up('xs')]:{
            color:'white',textAlign:"center",marginLeft:"130px",fontSize:"17px",fontFamily:"serif",height:"5px"
        },
        [theme.breakpoints.up('md')]:{
            color:'white',textAlign:"center",fontSize:"20px",fontFamily:"serif",height:"5px"
        }
    },
    captionDiv:{
        [theme.breakpoints.up('xs')]:{
            position:"relative",zIndex:200,marginLeft:"auto",marginRight:"auto",width:"95%"
        },
        [theme.breakpoints.up('md')]:{
            position:"relative",zIndex:200,width:"95%",marginLeft:"auto",marginRight:"auto"
        }

    },
    selectBoxStyle:{
        textAlign:"center"
    },
    formControl: {
        [theme.breakpoints.up('xs')]:{
            marginTop:"5%",
        },
        [theme.breakpoints.up('md')]:{
            marginTop:"2.5%",
            marginLeft:"auto",
            marginRight:"auto"
        },
        minWidth: 190,
    },
    relativePosition:{
        position:'relative'
    },
    contactDiv:{
        [theme.breakpoints.up('xs')]:{
            width:"90%",marginLeft:"auto",marginRight:"auto"
        },
        [theme.breakpoints.up('sm')]:{
            width:"600px",marginLeft:"auto",marginRight:"auto"
        }
    },
    icon: {
        color: 'white',
    },
    standardImg:{
        [theme.breakpoints.up('xs')]:{
            marginLeft:"10px",
            width:"200px",
            height:"150px",
            float:"left",
        },
        [theme.breakpoints.up('md')]:{
            marginLeft:"10px",
            width:"150px",
            height:"125px",
            float:"left",
        }
    },
    cssLabel: {
        color : '#FFFFFF'
    },
    
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `#FFFFFF !important`,
        }
      },
    
    cssFocused: {},
    
    notchedOutline: {
    borderWidth: '1px',
    borderColor: '#FFFFFF !important'
    },
    input: {
        color: "#FFFFFF"
    },
    button1:{
        backgroundColor:"#fb641b",color:"white",padding:10,margin:6,
        [theme.breakpoints.up('xs')]: {
            width:"50%",
            height:"60%"
        },
        [theme.breakpoints.up('sm')]: {
            width:"20%",
            height:"60%"
        }
    },
    typoDiv:{
        [theme.breakpoints.up('xs')]:{
            position:"absolute",zIndex:400,textAlign:"center"
        },
        [theme.breakpoints.up('sm')]:{
            position:"absolute",zIndex:400,textAlign:"center",marginLeft:"50px"
        }
    },
    isDesktop:{
        [theme.breakpoints.up('sm')]:{
            display:"block",
            marginLeft:"auto",
            marginRight:"auto",
            width:"50%"
        },
        [theme.breakpoints.up('md')]:{
            display:"block",
            marginLeft:"auto",
            marginRight:"auto",
            width:"50%"
        }

    },captchaDiv:{
        display:"none",
        /* [theme.breakpoints.up('xs')]: {
            
        },
        [theme.breakpoints.up('sm')]: {
            width:"20%",
        }  */
    }
}))
function Items(props){
    const history = useHistory();
    const [categories,setCategories] = useState()
    const [open,setOpen] = useState(false)
    const [clickFlag,setClickFlag] = useState(false)
    const [enableFlag,setEnableFlag] = useState(true)
    const [countFlag,setCountFlag] = useState(false)
    const [recaptcha,setRecaptcha] = useState()
    const [confirmationResult,setConfirmationResult] = useState();
    const [popupmessage,setPopupMessage] = useState('')
    const classes = useStyles();
    const name = useRef('');
    const phoneNo = useRef('');
    const code = useRef('');
    const message = useRef('');

    console.log(props)
    const outlinedInputClasses = useOutlinedInputStyles();
    //background: "linear-gradient(#eecda3, #ef629f)",
    const options = {
        speed: 3,
        sound:{enable:false}
    }
    const validatePhoneNo = (phoneNo) => {
        var phoneno = /^\d{10}$/;
        if(phoneNo.slice(0,3) === '+91' && phoneNo.slice(3).match(phoneno)){
            return true
        }
        return false
    }
    useEffect(()=>{
        const products = props.productsForHome.productsForHome
        let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container",{
            size: "invisible",
            callback: function(response) {
                console.log('fdsf')
            }
        });
        setRecaptcha(recaptcha)
        if(products){
            localStorage.setItem('categories',JSON.stringify(products.categories))
            setCategories(products.categories)
        }
        
    },[props.productsForHome.productsForHome])
    const handleSubmit = async () => {
        console.log("called")
        if (code.current.value === '') {
            setPopupMessage("Empty OTP!")
            setOpen(true)
            return;
        }
        if(clickFlag){
            return
        }
        if(!validatePhoneNo(phoneNo.current.value)){
            setPopupMessage("phone number format +91xxxxxxxxxx")
            setOpen(true)
            return
        }else{
            await setClickFlag(true)
            await confirmationResult.confirm(code.current.value).then(async (res) => {
                console.log(code.current.value,name.current.value,phoneNo.current.value)
                const result = await props.addCustomerMessage({
                    variables:{
                        name:name.current.value,
                        phoneNo:phoneNo.current.value,
                        message:"kklkjk"
                    }
                })
                setClickFlag(false)
                setPopupMessage(result.data.addCustomerMessage)
                setOpen(true)
                name.current.value = ''
                phoneNo.current.value = '+91'
                code.current.value = ''
            }).catch(async (err)=>{
                console.log(err)
                await setClickFlag(false)
                setPopupMessage("OTP Invalid!")
                setOpen(true)
            }) 
        }
    }
    const sendotp = async () => {
        if(countFlag){
            return;
        }
        await setCountFlag(true)
        if(
            name.current.value != '' &&
            phoneNo.current.value != ''
        ){
            if(validatePhoneNo(phoneNo.current.value)){
                firebase
                .auth()
                .signInWithPhoneNumber(phoneNo.current.value, recaptcha)
                .then(async (e) => {
                    await setConfirmationResult(e)
                    await setPopupMessage("OTP sent!")
                    await setEnableFlag(false)
                    await setOpen(true)
                }).catch(async (err) => {
                    await setCountFlag(false)
                    await setPopupMessage("Something went wrong!")
                    await setOpen(true)
                    console.log(err);
                });
            }
            else{
                await setCountFlag(false)
                await setPopupMessage("Phone no invalid!")
                await setOpen(true)
            }
        }
        else{
            await setCountFlag(false)
            await setPopupMessage("All fields required!")
            await setOpen(true)
        }
    }
    const handleChange = async (event) => {
        let arr = event.target.value.split(',')
        history.replace('/products?categoryId='+arr[0]+"&categoryName="+arr[1])
    }
    const handleClose = () => {
        setOpen(false)
    }
    const style = {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        background: '#000'
    }  
    return(
        <div> 
            <Dialog
                open={open}
                aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="responsive-dialog-title">{"Response"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {popupmessage}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
            <div className={classes.topDiv}>
            </div> 
            <div className={classes.isDesktop}>
            <img src={standardImage} style={{position:"relative",zIndex:200}} className={classes.standardImg}></img> 
            <div className={classes.typoDiv}>
                <p className={classes.textDiv} >
                   RAHAS AGENCIES
                </p>
                <p className={classes.textDiv2}>Dealer: Standard Fireworks <br/>
                   GSTIN:  33ALHPK1090J1Z7
                </p>  
            </div> 
            </div>    
            <div> 
            <Table style={{position:"relative",zIndex:200}} >
                <TableRow >

                    <td className={classes.selectBoxStyle}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label" htmlFor="filled-age-native-simple" style={{color:"#FFFFFF"}}>Select Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper" 
                            input={
                                <OutlinedInput
                                  classes={outlinedInputClasses}
                                />
                              }
                            onChange={handleChange}
                            className={classes.selectBox}
                            classes={{icon:classes.icon}}
                            >
                            { categories !== undefined &&
                                categories.map(category => <MenuItem value={category.id+","+category.categoryName}>{category.categoryName}</MenuItem>)
                            }
                        </Select>
                        </FormControl>
                    </td>
                </TableRow>
                
            </Table>
            </div>
            <Typography className={classes.textDiv1} variant="h6"  >
                   Buy crackers of highest quality from supreme industries of crackers city and make your occasions safe and special !
            </Typography>
            <div style={{position:"relative",zIndex:200,marginTop:"20px"}} className={classes.contactDiv}>
            <Typography  variant="h5"  style={{align:"left",color:"white"}} >
                    Contact us
            </Typography>
            <Typography  variant="body1"  style={{align:"",color:"white",marginTop:"5px"}} >
                    Old No. 18-D New No. 38, Sattur Road, Sivakasi - 626123, 
                    <li>
                    +91 9944991567 <a href="tel:+919944991567" style={{marginLeft:"4px"}}><CallIcon  style={{position:"relative",zIndex:"200",width:"20px",height:"20px",backgroundColor:"#fb641b",color:"white"}}/></a>
                    </li> 
                    <li>
                    +91 7200195070 <a href="tel:+917200195070" style={{marginLeft:"4px"}}><CallIcon  style={{position:"relative",zIndex:"200",width:"20px",height:"20px",backgroundColor:"#fb641b",color:"white"}}/></a>
                    </li>
            </Typography>
            <Typography  variant="subtitle2"  style={{align:"left",color:"white"}} >
                    For queries regarding orders, submit your contact details, we will clarify.
            </Typography>
            <div  className={classes.captchaDiv} id="recaptcha-container"></div>
            <div style={{textAlign:"center"}}>

            <TextField
                required
                label="Name"
                defaultValue=""
                variant="outlined"
                inputRef={name}
                InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                      input:classes.input
                    },
                    inputMode: "numeric"
                }}
                InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                }}
                className={classes.textBox}
            />
            <TextField
                required
                label="Phone No"
                defaultValue="+91"
                variant="outlined"
                inputRef={phoneNo}
                InputProps={{
                    endAdornment: <Button size="small" className={classes.button1} onClick = {sendotp}>
                        send otp
                    </Button>,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                      input:classes.input
                    },
                    inputMode: "numeric"
                  }}
                InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                className={classes.textBox}
            />
            {!enableFlag && <TextField
                    required
                    id="outlined-required"
                    label="OTP"
                    defaultValue=""
                    variant="outlined"
                    inputRef = {code}
                    InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                          input:classes.input
                        },
                      }}
                    InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                    className={classes.textBox}
                />}
            <Button disabled={enableFlag} style={{backgroundColor:"#fb641b",color:"white",marginTop:"5px",float:"right",marginBottom:"5px"}} onClick={handleSubmit}>Submit</Button>
            </div>
            </div>
            <Fireworks options={options} style={style} />

        </div>
    )
}
export default compose(
    graphql(productsForHome,{name:'productsForHome'}),
    graphql(addCustomerMessage,{name:'addCustomerMessage'}),
)(Items);