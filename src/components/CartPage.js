import React from 'react';
import AppBar from './homepage/AppBar';
import CartItems from './cartpage/CartItems'
function CartPage () {
    return(
        <div >
            <AppBar title='Cart' />
            <CartItems/>
        </div>
    )
}

export default CartPage;