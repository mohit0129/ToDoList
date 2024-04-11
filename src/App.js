import React, { useState, useEffect } from "react";
import './todo.css';

function App() {
  const [mytext, setMytext] = useState("");
  const [myarray, setMyarray] = useState([]);
  const [markedItems, setMarkedItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // New state to track the index being edited

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("todoList");
    const storedMarks = localStorage.getItem("markedItems");
    document.querySelector('.to-do_textbox').focus();
    if (storedData) {
      setMyarray(JSON.parse(storedData));
      setMarkedItems(storedMarks ? JSON.parse(storedMarks) : new Array(JSON.parse(storedData).length).fill(false));
    }
  }, []);

  // Save data to localStorage whenever myarray or markedItems change
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(myarray));
    localStorage.setItem("markedItems", JSON.stringify(markedItems));
  }, [myarray, markedItems]);

  function onChangeDo(event) {
    setMytext(event.target.value);
  }

  function removeAll() {
    setMyarray([]);
    setMarkedItems([]);
  }

  function onClickAdd() {
    document.querySelector('.to-do_textbox').focus();
    if (mytext.trim() === "") {
      // Display a warning message or handle the empty text case
      alert("Please enter a value.");
      return;
    }

    if (editIndex !== -1) {
      // If in edit mode, update the existing item
      const updatedArray = [...myarray];
      updatedArray[editIndex] = mytext;
      setMyarray(updatedArray);
      setEditIndex(-1); // Reset edit mode
    } else {
      // Otherwise, add a new item
      setMyarray([...myarray, mytext]);
      setMarkedItems([...markedItems, false]); // Add a new item and set it as not marked
    }

    // Reset text input
    setMytext("");
  }

  function removeItem(index) {
    const updatedArray = myarray.filter((_, idx) => idx !== index);
    const updatedMarkedItems = markedItems.filter((_, idx) => idx !== index);
    setMyarray(updatedArray);
    setMarkedItems(updatedMarkedItems);
  }

  function editItem(index) {
    setMytext(myarray[index]);
    setEditIndex(index); // Set the index being edited
    document.querySelector('.to-do_textbox').focus();
  }

  function markItem(index) {
    const updatedMarkedItems = [...markedItems];
    updatedMarkedItems[index] = !updatedMarkedItems[index]; // Toggle the state of the item
    setMarkedItems(updatedMarkedItems);
  }

  return (
    <div className="container">
      <center>
        <div className="input-container container">
          <input type="search" name="txt" placeholder="Enter something..." value={mytext} onChange={onChangeDo} autoComplete="off" className="to-do_textbox" />
          &nbsp;
          <button className="add_button" onClick={onClickAdd} >{editIndex !== -1 ? 'Save' : 'Add'}</button> {/* Change button text based on edit mode */}
        </div>
        <br /><br />
        <b>
          <table className="to-do_table">
            <tbody>
              {myarray.map((value, index) => (
                <tr key={index} className="to-do_item">
                  <br />
                  <td>
                    {index + 1}. &nbsp;&nbsp;
                    <span style={{ textDecoration: markedItems[index] ? 'line-through' : 'none' }}>{value}</span>
                  </td>
                  <td>
                    <span className="action_buttons1">
                      <img src="Mark.jpg" alt="Mark" title="Mark as done" onClick={() => markItem(index)} height="20" width="20" />
                    </span>
                    <span className="action_buttons2">
                      <img src="Edit.png" alt="Edit" title="Edit this Text" onClick={() => editItem(index)} height="20" width="20" />
                    </span>
                    <span className="action_buttons3">
                      <img src="Delete.png" alt="Delete" title="Delete this Text" onClick={() => removeItem(index)} height="20" width="20" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </b>
        <br />
        {myarray.length >= 5 && <button onClick={removeAll} className="remove-all-button">Remove All</button>}
      </center>
    </div>
  );
}

export default App;
