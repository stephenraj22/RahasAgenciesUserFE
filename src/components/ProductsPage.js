import {React,useEffect,useState} from 'react';
import Items from './productspage/Items'

function ProductsPage() {
    
    const [id,setId] = useState('')
    const [name,setName] = useState('')
    const handleUrl = (urlVal,name) => {
        setId(urlVal)
        setName(name)
    }
    useEffect(()=>{
        var url = window.location.href
        var arr1 = url.split('?');
        if(arr1!=undefined && arr1.length > 1 && id == ''){
                var arr2 = arr1[1].split("&");
                if(arr2!=undefined && arr2.length > 1 && id == ''){
                    setId(arr2[0].split('=')[1])
                    setName(arr2[1].split('=')[1])
                    console.log(name,id)
                }
            }
    })
    return(
        <div>
            <div  >
                <Items categoryId = {id} categoryName= {decodeURI(name)} urlVal={handleUrl}/>
            </div> 
        </div>
    )
}

export default ProductsPage;