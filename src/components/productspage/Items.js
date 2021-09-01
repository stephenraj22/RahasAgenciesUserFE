import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import Alert from '@material-ui/lab/Alert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import limitedOffer from './asset/offerimage/limitedOffer.jpg'
//import photo from './asset/16294850825087n9x67nMicrosoftTeams-image.png'
import photo1 from '../../assets/images/blue-polycotton-ph0003-perfect-homes-by-flipkart-blue-original-imaf6dhhsfhvvjdn.jpeg'
import { Icon } from '@material-ui/core';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';

const useStyles = makeStyles((theme) => ({
    body:{
    },
    box:{
        [theme.breakpoints.up('xs')]:{
            //width: '20rem', height: '9rem',
            width: '20rem', height: '21rem',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },

    },
   
    isDesktop:{
        [theme.breakpoints.up('xs')]:{
            backgroundColor:'pink'
        },
        [theme.breakpoints.up('sm')]:{
            display:'block',
            backgroundColor:'pink'

        }
    },
    imageHide:{
        [theme.breakpoints.up('xs')]:{
            display:'block'
        },
        [theme.breakpoints.up('sm')]:{
            display:'none',

        }
    },
    input:{
        position:'absolute',
        width:'1.5rem',
        height:'1rem',
        border:'0px',
        marginTop:'4px',
        padding:'1px',
        marginLeft:theme.spacing(.5)
    },
    cartIcon:{
        marginLeft:theme.spacing(3.5)
    },
    addBtn:{
        marginLeft:theme.spacing(3.5)

    },
    minusBtn:{
        marginLeft:theme.spacing(.5)

    },
    cartDiv:{
        marginTop:'4px',
        [theme.breakpoints.up('sm')]:{
            marginLeft:theme.spacing(2),
            marginTop:'5px',

        }
    },
    productImage:{
        marginLeft:theme.spacing(1) 
    },
    topDiv:{
        [theme.breakpoints.up('xs')]: {
            position:'relative',
            width:'100%',
            height:'3.5rem'
        },
        [theme.breakpoints.up('sm')]: {
            position:'relative',
            width:'100%',
            height:'2rem',
            //backgroundColor:'pink'
        },
        
    },
    topDiv1:{
        [theme.breakpoints.up('xs')]: {
            position:'relative',
            width:'100%',
            height:'2rem'
        },
        [theme.breakpoints.up('sm')]: {
            position:'relative',
            width:'100%',
            height:'8rem',
            //backgroundColor:'pink'
        },
        
    },
    formControl: {
        marginTop:"5%",
        minWidth: 190,
    },
    selectBox:{
        [theme.breakpoints.up('xs')]:{
            height:"50px",marginBottom:"20px"
        },
        [theme.breakpoints.up('sm')]:{
            height:"50px",marginBottom:"20px"
        },
    },
    textSize:{
        [theme.breakpoints.up('xs')]:{
            textAlign:'center',
            fontSize:18
        },
        
    },
    textSize1:{
        [theme.breakpoints.up('xs')]:{
            //textDecoration:"line-through",
            textAlign:'center',
            fontSize:12,
            fontColor:'green'
        },
       
    },
    textSize2:{
        [theme.breakpoints.up('xs')]:{
            textAlign:'center',
            fontSize:15,
            fontColor:'green'
        },
       
    },
    textSize3:{
        [theme.breakpoints.up('xs')]:{
            textDecoration:"line-through",
            textAlign:'center',
            fontSize:15,
            fontColor:'green'
        },
       
    },
    image:{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}))

const productsByCategoryId = gql`
    query($id:ID!){
        productsByCategory(categoryId:$id)  {
            productName
            id
            size
            proCode
            perPkt
            pricePkt
            priceCarton
            perCarton
      }
    }
`
function Items(props){
    const classes = useStyles();
    const history = useHistory();
    const [flag,setFlag] = useState()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [products,setProducts] = useState()
    const [categories,setCategories] = useState(JSON.parse(localStorage.getItem('categories')))
    const [productState,setProductState] = useState({})
    const [cartProduct,setCartProduct] = useState({})
    /*const clickHandler = (e) => {
        setCount(prevCount => prevCount+1);
    }*/
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleChange = async (event) => {
        await localStorage.setItem('cart',JSON.stringify(cartProduct))
        props.urlVal(event.target.value);
    }
    useEffect(async ()=>{
        const productsbycategory = await props.data.productsByCategory
        const cartData = await JSON.parse(localStorage.getItem('cart'))
        if(productsbycategory){
            setProducts(productsbycategory)
            if(cartData)
                setCartProduct(cartData)
            let result = {}
            productsbycategory.forEach(element => {
                if(cartData && cartData[element.id])
                    result[element.id] = cartData[element.id]
                else
                    result[element.id] = [0,0,false,false,element]
            });
            setProductState(result)
        }
        return () =>{
            localStorage.setItem('cart',JSON.stringify(cartProduct))
        }
    },[props.data.productsByCategory])
   
    return(
        <div >
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                autoHideDuration={1000}
                message="Added to cart"
                onClose = {handleClose}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            ><Alert onClose={handleClose} severity="success">
            Added to cart!
          </Alert></Snackbar>
          <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open1}
                autoHideDuration={1000}
                message="Added to cart"
                onClose = {handleClose1}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose1}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            ><Alert onClose={handleClose} severity="error">
            Removed from cart!
          </Alert></Snackbar>
            <div className={classes.topDiv}>
            </div>
            <div className={classes.isDesktop}>
            <Table style={{position:"fixed",backgroundColor:"white",zIndex:200}} >
                <TableRow >

                    <td style={{textAlign:'center'}}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label" htmlFor="filled-age-native-simple">Buy other Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Select Category"
                            onChange={handleChange}
                            className={classes.selectBox}
                            >
                            { categories !== null &&
                                categories.map(category => <MenuItem value={category.id}>{category.categoryName}</MenuItem>)
                            }
                        </Select>
                        </FormControl>
                    </td>
                    <td style={{textAlign:'center'}}>
                        <Button variant="contained" onClick={()=>{ 
                            localStorage.setItem('cart',JSON.stringify(cartProduct))
                            history.replace('/cart')
                        }} color="primary">
                             View cart
                        </Button>
                    </td>
                </TableRow>
                
            </Table>
            <div className={classes.topDiv1}>
            </div>
                <img src={limitedOffer} className={classes.imageHide} alt="Girl in a jacket" width="100%" height="100%"/> 
                <Grid container>
                    {
                        products && products.map(item => {
                            
                            return productState[item.id] && <Grid xs={12} sm={4} key={item.id} >
                                <Box
                                    boxShadow={20}
                                    bgcolor="background.paper"
                                    m={1}
                                    p={1}
                                    className={classes.box}
                                    borderRadius={6}
                                    
                                >
                                    <Grid container>
                                        <Grid item xs={12} >
                                            <img src={process.env.REACT_APP_FRONTEND_URL+"/Images/"+item.proCode+".jpg"}  className={classes.image} alt='image not found'  height="50%" width='70%' />                                        
                                            <Typography   className={classes.textSize} >
                                           {item.productName}
                                            </Typography>
                                            
                                            <Typography  variant="subtitle2"  className={classes.textSize1} align='left' style={{color:'green'}} noWrap>
                                                Size : {item.size} 
                                            </Typography>
                                        <Grid container>
                                        <Grid item xs={6}>
                                            <Typography  variant="body2"   align='center'  noWrap>
                                                Box/Pkt
                                            </Typography>
                                            <Typography  variant="subtitle2"  className={classes.textSize1} align='left' style={{color:'green'}} noWrap>
                                                Items per box/pkt: {item.perPkt} Pcs
                                            </Typography>
                                            <table style={{marginLeft:"25px"}}>
                                                <tr>
                                                    <td>
                                                    <Typography  variant="subtitle2"  className={classes.textSize3} align='left' style={{color:'grey'}} noWrap>
                                                        {item.pricePkt} Rs
                                                    </Typography>
                                                    </td>
                                                    <td>
                                                    <Typography  variant="subtitle2"  className={classes.textSize2} align='left' style={{color:'red'}} noWrap>
                                                        {item.pricePkt} Rs
                                                    </Typography>
                                                    </td>
                                                </tr>
                                            </table>
                                            <div className={classes.cartDiv} align='center'>
                                                <IndeterminateCheckBoxRoundedIcon className={classes.minusBtn} color="primary" onClick={()=>{
                                                    let state = productState
                                                    if(state[item.id][0]!=0){
                                                        state[item.id][0] -= 1
                                                        if(state[item.id][0] == 0){
                                                            state[item.id][2] = false
                                                            if(!state[item.id][2] && !state[item.id][3]){
                                                                let cartState = cartProduct
                                                                delete cartState[item.id]
                                                                setCartProduct(cartState)
                                                            }
                                                        }
                                                        setProductState(state)
                                                        setFlag(prevState => !prevState)
                                                    }
                                                }}/>
                                                <input  className={classes.input} value={productState[item.id][0]} />
                                                <AddBoxRoundedIcon color="primary" className={classes.addBtn} onClick={()=>{
                                                    let state = productState
                                                    state[item.id][0] += 1
                                                    setProductState(state)
                                                    setFlag(prevState => !prevState)
                                                    
                                                }}/>
                                                {
                                                   (productState[item.id][2] && 
                                                   <RemoveShoppingCartRoundedIcon  className={classes.cartIcon} color="primary" onClick={()=>{
                                                        let state = productState
                                                        state[item.id][2] = false
                                                        var cart = cartProduct
                                                        if(cart[item.id]){
                                                            console.log(cart)
                                                            cart[item.id][2] = false
                                                            console.log(cart)
                                                            if(!cart[item.id][2] && !cart[item.id][3])
                                                                delete cart[item.id]
                                                        } 
                                                        setCartProduct(cart)
                                                        setProductState(state)
                                                        setOpen1(true)
                                                        setFlag(prevState => !prevState)
                                                   }}/>
                                                   ) ||
                                                   (!productState[item.id][2] && <ShoppingCartIcon  className={classes.cartIcon} color="primary" onClick={()=>{
                                                        let state = productState
                                                        if(state[item.id][0]>0){
                                                            state[item.id][2] = !state[item.id][2]
                                                            let cart = cartProduct
                                                            cart[item.id] = state[item.id]
                                                            setCartProduct(cart)
                                                            setProductState(state)
                                                            setOpen(true)
                                                            setFlag(prevState => !prevState)
                                                        }
                                                        
                                                    }}/>)
                                                }
                                                
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography  variant="body2"   align='center'  noWrap>
                                                Carton
                                            </Typography>
                                            <Typography  variant="subtitle2"  className={classes.textSize1} align='left' style={{color:'green'}} noWrap>
                                                Items per carton: {item.perCarton} Boxes
                                            </Typography>
                                            <table style={{marginLeft:"25px"}}>
                                                <tr>
                                                    <td>
                                                    <Typography  variant="subtitle2"  className={classes.textSize3} align='left' style={{color:'grey'}} noWrap>
                                                        {item.priceCarton} Rs
                                                    </Typography>
                                                    </td>
                                                    <td>
                                                    <Typography  variant="subtitle2"  className={classes.textSize2} align='left' style={{color:'red'}} noWrap>
                                                        {item.priceCarton} Rs
                                                    </Typography>
                                                    </td>
                                                </tr>
                                            </table>
                                            <div className={classes.cartDiv}  align='center'>
                                                <IndeterminateCheckBoxRoundedIcon className={classes.minusBtn} color="primary" onClick={()=>{
                                                    let state = productState
                                                    if(state[item.id][1]!=0){
                                                        state[item.id][1] -= 1
                                                        if(state[item.id][1] == 0){
                                                            state[item.id][3] = false
                                                            if(!state[item.id][2] && !state[item.id][3]){
                                                                let cartState = cartProduct
                                                                delete cartState[item.id]
                                                                setCartProduct(cartState)
                                                            }
                                                        }
                                                        setProductState(state)
                                                        setFlag(prevState => !prevState)
                                                    }
                                                }}/>
                                                <input  className={classes.input} value={productState[item.id][1]} />
                                                <AddBoxRoundedIcon color="primary" className={classes.addBtn} onClick={()=>{
                                                    let state = productState
                                                    state[item.id][1] += 1
                                                    setProductState(state)
                                                    setFlag(prevState => !prevState)
                                                }}/>
                                                {
                                                   (productState[item.id][3] && <RemoveShoppingCartRoundedIcon  className={classes.cartIcon} color="primary" onClick={()=>{
                                                        let state = productState
                                                        state[item.id][3] = false
                                                        let cart = cartProduct
                                                        if(cart[item.id])
                                                            cart[item.id][3] = false
                                                            if(!cart[item.id][3] && !cart[item.id][2])
                                                                delete cart[item.id]
                                                        setCartProduct(cart)
                                                        setProductState(state)
                                                        setOpen1(true)
                                                        setFlag(prevState => !prevState)
                                                   }}/>) ||
                                                   (!productState[item.id][3] && <ShoppingCartIcon  className={classes.cartIcon} color="primary" onClick={()=>{
                                                        let state = productState
                                                        if(state[item.id][1] > 0){
                                                            state[item.id][3] = !state[item.id][3]
                                                            let cart = cartProduct
                                                            cart[item.id] = state[item.id]
                                                            setCartProduct(cart)
                                                            setProductState(state)
                                                            setOpen(true)
                                                            setFlag(prevState => !prevState)
                                                        }
                                                    }}/>)
                                                }
                                            </div>
                                        </Grid>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                                
                            </Grid>  
                        }  
                        )
                    }
                    
                </Grid>
            </div>
        </div>
        
    )
}
export default compose(graphql(productsByCategoryId,{
    options: props => ({
      variables: {
        id: props.categoryId,
      },
    }),
  }))(Items);