import "./App.css";
import React from "react";
import { useState, useEffect } from 'react'
import Newnote from "./NewNote/Newnote";
import Intialscreen from "./InitialScreen/Initialscreen";

function App() {
  let [allNotesArray, setAllNoteArray] = useState([])
  let dataFromLocal = [];
  let [isInital, setintial] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("data") == null || localStorage.getItem("data").length == 0) {
      setAllNoteArray([
        <div className="noNotes">
          <p>You have no notes</p>
          <button onClick={addnewNotefirstTime}>Create One Now</button>
        </div>
      ])
    } else {
      dataFromLocal = [...JSON.parse(localStorage.getItem("data"))];
      addnewNotefirstTime()
    }
  }, [])

  // Adds 1 notes on clicking add new note
  function addnewNotefirstTime() {
    setintial(false)
    // If localstorage is empty sets 1 Button and Note by default
    if (localStorage.getItem("data") == null) {
      localStorage.setItem("data", JSON.stringify([{ btn: "Add Title", inputData: "Enter your text..." }]));
      dataFromLocal = [...JSON.parse(localStorage.getItem("data"))];
    }
    let newArra = []
    newArra.push(<Newnote dataFromLocal={[...dataFromLocal]}  addnew={addnewNotefirstTime} setintial={setinitialFn} />)
    setAllNoteArray(newArra);

  }
  function selectfn(e) {
  }
  function setinitialFn(flag) {
    setintial(flag)
  }
  return (
    <div className="App">
      {(isInital) ? <Intialscreen addnewone={addnewNotefirstTime} /> : allNotesArray.map((ele) => {
        return React.cloneElement(ele, { key:`un_${Math.random()*10}`} );
      })}
    </div>
  );
}

export default App;
