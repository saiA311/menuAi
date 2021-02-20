import { useEffect, useState } from "react";
import "./App.css";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    alanBtn({
      key:
        "ce4d70df9e8a1adbb7e34f0752b936712e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setMenu(commandData.data);
        } else if (commandData.command === "AddToCart") {
          setCart((prevCart) => [...prevCart, commandData.data]);
        } else if (commandData.command === "RemovefromCart") {
          setCart((prevCart) =>
            prevCart.filter((item) => item !== commandData.data)
          );
        }
      },
    });
  }, []);
  console.log(cart);
  const addTocart = (menuItem) => {
    setCart((prevCart) => [...prevCart, menuItem]);
  };

  return (
    <div className="App">
      <h1>Menu</h1>
      {menu.map((menuItem, i) => (
        <li key={i}>
          {menuItem.name} - {menuItem.category} - {menuItem.price}
          <button onClick={() => addTocart(menuItem)}>Add to cart</button>
        </li>
      ))}
      <h1>Cart ({cart.length}) </h1>
      <h2>
        {cart.map((cartItem, i) => (
          <li key={i}>
            {cartItem.name} - {cartItem.category} - {cartItem.price}{" "}
          </li>
        ))}
      </h2>
    </div>
  );
}

export default App;
