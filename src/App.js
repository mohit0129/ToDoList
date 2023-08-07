import React, { useState, useEffect } from "react";

function App() {
  const [mytext, setMytext] = useState("");
  const [myarray, setMyarray] = useState([]);
  const [editIdx, setEditIdx] = useState("");

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("todoList");
    if (storedData) {
      setMyarray(JSON.parse(storedData));
    }
  }, []);

  // Save data to localStorage whenever myarray changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(myarray));
  }, [myarray]);

  function onChangeDo(event) {
    setMytext(event.target.value);
  }

  function onClickAdd() {
    let list = [...myarray];
    if (editIdx !== "") {
      list[editIdx] = mytext;
    } else {
      list.push(mytext);
    }
    setMyarray(list);
    setMytext("");
    setEditIdx("");
  }

  function removeItem(index) {
    const updatedArray = myarray.filter((_, idx) => idx !== index);
    setMyarray(updatedArray);
  }

  function editItem(index) {
    setMytext(myarray[index]);
    setEditIdx(index);
  }

  return (
    <div>
      <center>
        <br />
        <input type="text" name="txt" placeholder="Add today's goal" value={mytext} onChange={onChangeDo} autoComplete="off" />
        &nbsp;
        <button className="AddButton" onClick={onClickAdd}>Click ME</button>
        <br />
        <b>
          <table>
            <tbody>
              {myarray.map((value, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}. {value}
                  </td>
                  <td>
                    <img src="Edit.png" alt="edit" title="Edit this Text" onClick={() => editItem(index)} height="20" width="20" />
                  </td>
                  <td>
                    <img src="Delete.png" alt="delete" title="Delete this Text" onClick={() => removeItem(index)} height="20" width="20" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </b>
      </center>
    </div>
  );
}

export default App;
