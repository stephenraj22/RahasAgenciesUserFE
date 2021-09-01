import React from 'react';
import AppBar from './homepage/AppBar';
import Items from './homepage/Items';

function HomePage () {
    console.log(process.env.REACT_APP_BACKEND_URL)
      
    return(
        <div>
            <AppBar title='Welcome' page='home'/>
            <Items/>
        </div>
    )
}

export default HomePage;