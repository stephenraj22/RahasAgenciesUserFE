import './App.css';
import HomePage from './components/HomePage'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage'
import OrderSuccessful from './components/OrderSuccessful'
import PlaceOrderPage from './components/PlaceOrderPage';
function App() {
  return (
    <div >
      <Router>
        <div>
          <Switch>           
            <Route exact path="/products">
              <ProductsPage/>
            </Route>
            <Route exact path="/cart">
              <CartPage/>
            </Route>
            <Route exact path="/buy">
              <PlaceOrderPage/>
            </Route>
            <Route exact path="/orderDetail">
              <OrderSuccessful/>
            </Route>
            <Route exact path="/">
              <HomePage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
