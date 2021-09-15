import React from 'react';
import AppBar from './homepage/AppBar';
import Items from './homepage/Items';

function HomePage () {      
    return(
        <div>
            <AppBar title='Welcome' page='home'/>
            <Items/>
        </div>
    )
}

export default HomePage;