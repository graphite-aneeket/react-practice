import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

/**
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];
*/

const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems((items) => [...items, newItem]);
  };

  const handleRemoveItem = (itemId) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleCheckItem = (itemId) => {
    setItems((items) =>
      items.map((item) => {
        return item.id === itemId ? { ...item, packed: !item.packed } : item;
      })
    );
  };

  const handleClearList = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onCheckItem={handleCheckItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;

