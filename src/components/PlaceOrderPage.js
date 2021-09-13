import React,{useState,useRef,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from './homepage/AppBar';
import { Button, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {flowRight as compose, set} from 'lodash';
import firebase from './firebase';
const placeOrder = gql`
mutation(
    $name:String!,
    $phoneNo:String!,
    $pincode:String!,
    $state:String!,
    $city:String!,
    $houseNo:String!,
    $colony:String!,
    $orderList:[ProductOrder],
){
    placeOrder(
        orderList:$orderList,
        name:$name,
        phoneNo:$phoneNo,
        state:$state,
        city:$city,
        pincode:$pincode,
        houseNo:$houseNo,
        colony:$colony
    ){
        err
        order{
          id
          phoneNo
          name
          pincode
          city
          state
          houseNo
          total
          discountPercent
          colony
          orderList{
            id
            pktCount
            productDetail{
              productName
              pricePkt
            }
          }
        }
      }
}
`
const useStyles = makeStyles((theme) => ({
    topDiv:{
        [theme.breakpoints.up('xs')]: {
            position:'relative',
            width:'100%',
            height:'3.9rem'
        },
        [theme.breakpoints.up('sm')]: {
            position:'relative',
            width:'100%',
            height:'6rem'
        },
        
    },
   
    textBox:{
        [theme.breakpoints.up('xs')]: {
            width:"90%",
            height:"50px",
            padding:9
        },
        [theme.breakpoints.up('sm')]: {
            width:"50%"
        } 
    },
    button:{
        backgroundColor:"#fb641b",color:"white",padding:10,margin:6,
        [theme.breakpoints.up('xs')]: {
            width:"90%",
        },
        [theme.breakpoints.up('sm')]: {
            width:"50%"
        }
    },button1:{
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
    captchaDiv:{
        display:"none",
        /* [theme.breakpoints.up('xs')]: {
            
        },
        [theme.breakpoints.up('sm')]: {
            width:"20%",
        }  */
    }
}))
function PlaceOrderPage (props) {
    const [open,setOpen] = useState(false);
    const [open1,setOpen1] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [countFlag, setCountFlag] =  useState(false)
    const [countFlag1,setCountFlag1] = useState(false)
    const classes = useStyles()
    const history = useHistory();
    const name = useRef('')
    const phoneNo = useRef('')
    const pincode = useRef('')
    const state = useRef('')
    const city = useRef('')
    const houseNo = useRef('')
    const colony = useRef('')
    const code = useRef('')
    const [message,setMessage] = useState('')
    const [message1,setMessage1] = useState('')
    const [price, setPrice] = useState(0)
    const [productList,setProductList] = useState([])
    const [confirmationResult,setConfirmationResult] = useState();
    const [enableFlag,setEnableFlag] = useState(true)
    const [recaptcha,setRecaptcha] = useState();
    const [cartProduct,setCartProduct] = useState(JSON.parse(localStorage.getItem('cart')))
    const submit = async () => {
        if (code.current.value == '') {
            setMessage("Empty OTP!")
            setOpen(true)
            return;
        }
        if(countFlag1){
            return;
        }
        await setCountFlag1(true)
        if(
            name.current.value!=='' &&  name.current.value!==null &&
            phoneNo.current.value!=='' && phoneNo.current.value!==null &&
            pincode.current.value!=='' && pincode.current.value!==null &&
            state.current.value!=='' && state.current.value!==null &&
            city.current.value !=='' && city.current.value !==null &&
            houseNo.current.value !== '' && houseNo.current.value !== null &&
            colony.current.value !=='' && colony.current.value !== null 
        ){
            if(validatePhoneNo(phoneNo.current.value)){
                if(validatePincode(pincode.current.value)){
                    if(productList.length!=0){
                        await confirmationResult.confirm(code.current.value).then(async (res) => {
                            console.log(res)
                            const result = await props.placeOrder({
                                variables:{
                                    name:name.current.value,
                                    phoneNo:phoneNo.current.value,
                                    pincode:pincode.current.value,
                                    state:state.current.value,
                                    city:city.current.value,
                                    houseNo:houseNo.current.value,
                                    colony:colony.current.value,
                                    orderList:productList
                                }
                            })
                            console.log(result)
                            if(result.data.placeOrder.order == null){
                                await setCountFlag(false)
                                await setCountFlag1(false)
                                await setMessage(result.data.placeOrder.err)
                                await setOpen(true)
                            }
                            else{
                                localStorage.setItem('order',JSON.stringify(result))
                                setOpen2(true)
                            }
                        }).catch(async (err)=>{
                            console.log(err)
                            await setCountFlag(false)
                            await setCountFlag1(false)
                            await setMessage("OTP invalid, try again!!")
                            await setOpen(true)
                        });
                    }
                    else{
                        await setCountFlag(false)
                        await setCountFlag1(false)
                        await setMessage('Empty order!')
                        await setOpen(true)   
                    }
                     
                }
                else{
                    await setCountFlag(false)
                    await setCountFlag1(false)
                    await setMessage('Invalid pincode! correct format is XXXXXX')
                    await setOpen(true)
                }
            }
            else{
                await setCountFlag(false)
                await setCountFlag1(false)
                await setMessage('Invalid phoneNo! correct format is +91XXXXXXXXXX')
                await setOpen(true)
            }
        }
        else{
            await setCountFlag(false)
            await setCountFlag1(false)
            await setMessage('All fields are required!')
            await setOpen(true)
        }
        
      };
    useEffect(()=>{
        let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container",{
            size: "invisible",
            callback: function(response) {
                console.log('fdsf')
            }
        });
        setRecaptcha(recaptcha)
        let productArray = []
        let total = 0
        let obj = {id:'',pktCount:0}
        if(cartProduct){
            Object.keys(cartProduct).forEach(item => {
                obj.id = item
                if(cartProduct[item][2]){
                    obj.pktCount = cartProduct[item][0]
                    total += cartProduct[item][0] * cartProduct[item][4].pricePkt
                }
                productArray.push(obj)
                obj = {id:'',pktCount:0}
            })
            
        }
        setPrice(total)
        setProductList(productArray)
        console.log(productArray)
    },[cartProduct])
    const handleClose = () => {
        setOpen(false)
    }
    const handleClose1 = () => {
        setOpen1(false)
    }
    const handleClose2 = async () => {
        await setOpen2(false)
        await localStorage.removeItem('cart')
        await localStorage.removeItem('categories')
        history.replace('/orderDetail')
    }
    const validatePhoneNo = (phoneNo) => {
        var phoneno = /^\d{10}$/;
        if(phoneNo.slice(0,3) === '+91' && phoneNo.slice(3).match(phoneno)){
            return true
        }
        return false
    }
    const validatePincode = (pincode) => {
        var pinCode = /^\d{6}$/;
        if(pincode.match(pinCode)){
            return true
        }
        return false
    }
    const sendotp = async () => {
        if(countFlag){
            return;
        }
        if(price<5000){
            setMessage('Order amt is less than 5000Rs!')
            setOpen(true)
            return
        }
        await setCountFlag(true)
        await setMessage1("Processing data....")
        await setOpen1(true)
        if(
            name.current.value!=='' &&  name.current.value!==null &&
            phoneNo.current.value!=='' && phoneNo.current.value!==null &&
            pincode.current.value!=='' && pincode.current.value!==null &&
            state.current.value!=='' && state.current.value!==null &&
            city.current.value !=='' && city.current.value !==null &&
            houseNo.current.value !== '' && houseNo.current.value !== null &&
            colony.current.value !=='' && colony.current.value !== null
        ){
            if(validatePhoneNo(phoneNo.current.value)){
                if(validatePincode(pincode.current.value)){
                    if(productList.length!=0){
                        firebase
                        .auth()
                        .signInWithPhoneNumber(phoneNo.current.value, recaptcha)
                        .then(async (e) => {
                            await setMessage1("Wait otp is on the way!")
                            await setOpen1(true)
                            await setConfirmationResult(e)
                            await setEnableFlag(false)
                        })
                        .catch(async (err) => {
                            await setCountFlag(false)
                            console.log(err);
                        });
                    }
                    else{
                        await setCountFlag(false)
                        setMessage('Empty order!')
                        setOpen(true)   
                    }
                     
                }
                else{
                    await setCountFlag(false)
                    setMessage('Invalid pincode! correct format is 666666')
                    setOpen(true)
                }
            }
            else{
                await setCountFlag(false)
                setMessage('Invalid phoneNo! correct format is +919999999999')
                setOpen(true)
            }
        }
        else{
            await setCountFlag(false)
            setMessage('All fields are required!')
            setOpen(true)
        }
          
    }
    return(
        <div>
              <Dialog
                open={open2}
                aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="responsive-dialog-title">{"Order response"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Order Placed, We will call you for confirmation!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose2} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={3000}
                    message="OTP invalid, try again"
                    onClose = {handleClose}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                ><Alert onClose={handleClose} severity="error">
                {message}
            </Alert></Snackbar>
            <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={open1}
                    autoHideDuration={3000}
                    message="OTP invalid, try again"
                    onClose = {handleClose1}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose1}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                ><Alert onClose={handleClose1} severity="success">
                {message1}
            </Alert></Snackbar>
            <AppBar title='Add Address' page = 'buy' />
            <div className={classes.topDiv}>
            </div>
            <div style={{textAlign:"center"}}>
                
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue=""
                    variant="outlined"
                    inputRef={name}
                    className={classes.textBox}
                />
                
                <TextField
                    required
                    id="outlined-required"
                    label="Pincode"
                    defaultValue=""
                    variant="outlined"
                    inputRef={pincode}
                    className={classes.textBox}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="State"
                    defaultValue=""
                    variant="outlined"
                    inputRef={state}
                    className={classes.textBox}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="City"
                    defaultValue=""
                    variant="outlined"
                    inputRef={city}
                    className={classes.textBox}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="House No, Building Name"
                    defaultValue=""
                    variant="outlined"
                    inputRef={houseNo}
                    className={classes.textBox}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="Road name, Area, Colony"
                    defaultValue=""
                    variant="outlined"
                    inputRef = {colony}
                    className={classes.textBox}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Phone Number"
                    defaultValue="+91"
                    variant="outlined"
                    inputRef={phoneNo}
                    className={classes.textBox}
                    InputProps={{endAdornment: <Button size="small" className={classes.button1} onClick = {sendotp}>
                        send otp
                    </Button>}}
                />
                {!enableFlag && <TextField
                    required
                    id="outlined-required"
                    label="OTP"
                    defaultValue=""
                    variant="outlined"
                    inputRef = {code}
                    className={classes.textBox}
                />}
                <div>
                <div  className={classes.captchaDiv} id="recaptcha-container"></div>
                </div>
                <Button variant="contained" disabled={enableFlag}  className={classes.button} onClick = {submit}>
                        Place Order
                </Button>
            </div>
        </div>
    )
}

export default compose(
    graphql(placeOrder,{name:'placeOrder'}),
  )(PlaceOrderPage);