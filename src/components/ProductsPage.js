import {React,useEffect,useState} from 'react';
import AppBar from './homepage/AppBar'
import { fade, makeStyles } from '@material-ui/core/styles';
import Items from './productspage/Items'
const useStyles = makeStyles((theme) => ({
    isMobile:{
        [theme.breakpoints.up('sm')]:{
            display:'none'
        }
    }
}))
function ProductsPage() {
    
    const [id,setId] = useState('')
    const classes = useStyles()
    const handleUrl = (urlVal) => {
        setId(urlVal)
    }
    useEffect(()=>{
        var url = window.location.href
        var arr1 = url.split('?');
        if(arr1.length > 1 && id == ''){
            setId(arr1[1].split('=')[1])
        }
    })
    return(
        <div>
            <AppBar title='Products'/>
            <div  >
                <Items categoryId = {id} urlVal={handleUrl}/>
            </div> 
        </div>
    )
}

export default ProductsPage;