import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./utils/data";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
};

const Menu = () => {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.length > 0 ? (
        <React.Fragment>
          <p>This is our menu, please have a look</p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => {
              return <Pizza key={pizza.id} pizzaData={pizza} />;
            })}
          </ul>
        </React.Fragment>
      ) : null}
    </main>
  );
};

const Pizza = (props) => {
  const { name, ingredients, price, photoName, soldOut } = props?.pizzaData;
  return (
    <li className={`pizza ${soldOut ? "sold-out" : null}`}>
      <img alt={name} src={photoName}></img>
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
};

const Footer = () => {
  const currentHour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = currentHour >= openHour && currentHour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>We're open untill {closeHour}:00. Come visit us or order online</p>
          <button className="btn">Order</button>
        </div>
      ) : null}
    </footer>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
