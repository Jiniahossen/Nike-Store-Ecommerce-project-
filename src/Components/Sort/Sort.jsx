import { useState } from "react";


const Sort = () => {
  // Initial list of items
  const initialItems = [
    { id: 1, name: 'Apple', date: '2023-01-01', views: 10 },
    { id: 2, name: 'Orange', date: '2023-02-15', views: 5 },
    { id: 3, name: 'Banana', date: '2023-03-10', views: 8 },
  ];

  // State to manage the list of items
  const [items, setItems] = useState(initialItems);

  // State to track the current sorting option
  const [sortOption, setSortOption] = useState('name');

  // Function to handle the sort action
  const handleSort = (option) => {
    const sortedItems = [...items];

    // Perform sorting based on the selected option
    sortedItems.sort((a, b) => {
      if (option === 'name') {
        return a.name.localeCompare(b.name);
      } else if (option === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (option === 'views') {
        return b.views - a.views;
      }

      return 0; // Default to no sorting
    });

    // Update the state with the sorted items
    setItems(sortedItems);

    // Update the sorting option
    setSortOption(option);
  };

  return (
    <div>
      <h2>Sortable List</h2>
      <div>
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('date')}>Sort by Date</button>
        <button onClick={() => handleSort('views')}>Sort by Views</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name} - Date: {item.date} - Views: {item.views}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sort;
