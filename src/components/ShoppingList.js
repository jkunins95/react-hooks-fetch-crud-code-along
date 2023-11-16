import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Fetch GET requeset
    // When X event occurs - useEffect
    // Make Y fetch request - GET request
    // Update Z state - replace current list with new list (state setter function)
  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(resp => resp.json())
    .then(items => setItems(items))
  }, []);

  // This function adds the new item to the Shopping List
  function handleAddItem(newItem) {
    // console.log("In ShippingList:", newItem)

    // need to call setState and add the new item to the end of the list - can use the spread operator
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
