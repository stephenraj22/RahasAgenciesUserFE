import React, { useEffect, useState } from "react";
import AppBar from "./homepage/AppBar";
import Items from "./homepage/Items";
import axios from "axios";

function HomePage() {
  const [ip, setIp] = useState();
  const [cartId, setCartId] = useState();
  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((res) => {
      setIp(JSON.stringify(res));
      const cartIdfromLS = localStorage.getItem("cartId");
      console.log(cartIdfromLS !== undefined && cartIdfromLS !==null ? cartIdfromLS : "");
      setCartId(cartIdfromLS !==undefined && cartIdfromLS !==null ? cartIdfromLS : "");
    });
  }, []);
  return (
    <div>
      <AppBar title="Welcome" page="home" />
      <Items ip={ip} cartId={cartId} />
    </div>
  );
}

export default HomePage;
