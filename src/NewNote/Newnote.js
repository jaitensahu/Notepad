import "./Newnote.css";
import comalogo from "../Assets/comma.png";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Textarea from "../TextArea/Textarea";
import Preview from "../Preview/Preview";

const Newnote = (props) => {
  let [btnArr, setbtnArr] = useState([...props.dataFromLocal]);
  let [ispreview, setpreview] = useState(false)
  let [currentIdx, setCurrentIdx] = useState();
  let [noteData, setNoteData] = useState();

  // function To add more Notes;
  function addMoreNote() {
    setbtnArr((prevData) => {
      return [...prevData, { btn: "Add Title", inputData: "Enter your text..." }]
    })
  }
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(btnArr));
  }, [btnArr])
  function deleteNote(currentIdx) {
    let filteredData = btnArr.filter((ele, idx) => {
      return currentIdx != idx;
    })
    setbtnArr((prevData) => [...filteredData]);
    localStorage.setItem("data", JSON.stringify(filteredData));
    if (filteredData.length > 0) {
      setNoteData(filteredData[0].inputData)
    } else {
      localStorage.clear();
      props.setintial(true);
    }
  }
  useEffect(() => {
    showClickedNote(0)
  }, [])

  //   FUNC To Show Clicked Data
  function showClickedNote(idx) {
    setNoteData(btnArr[idx].inputData);
    setCurrentIdx(idx);
    localStorage.setItem("data", JSON.stringify([...btnArr]))
  }

  //   Function to Change inputData
  function chngeData(e) {
    let arr = [...btnArr];
    if(e.target.className=="Btn"){
      console.log("btn", btnArr);
      arr[currentIdx].btn = e.target.innerText;
      console.log(arr[currentIdx].btn);
    }else{
      setNoteData(e.target.value)
      arr[currentIdx].inputData = e.target.value;
      setbtnArr([...arr]);
    }
    
    
    localStorage.setItem("data", JSON.stringify([...btnArr]));
  }

  function addHashTag(type) {
    if (type == 'heading') {
      setNoteData((prevData) => `### ${prevData}`)
    } else if (type == 'italic') {
      setNoteData((prevData) => `*${prevData}*`)
    } else if (type == 'bold') {
      setNoteData((prevData) => `**${prevData}**`)

    } else if (type == 'blackquote') {
      setNoteData((prevData) => `>${prevData}`)
    } else if (type == 'ol') {
      setNoteData((prevData) => `*${prevData}*`)
    } else if (type == 'ul') {

    } else if (type == 'link') {
      setNoteData((prevData) => prevData + '[title](https://www.example.com)')
    } else if (type == 'strike') {
      setNoteData((prevData) => `~~${prevData}~~`);
    }


  }
  const handleHover = (e) => {
    e.target.style.backgroundColor = '#e4a537';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = ''; // Reset the color on mouse out (optional)
  };

  function preview() {
    setpreview(true)
  }
  function write() {
    setpreview(false)
  }

  function editButtonTitle(e,idx) {
    console.log(e.target.className);
    console.log(idx);
    console.log(btnArr);
  }
  <i className="fa-regular fa-square-plus"></i>
  return (
    <div className="Note">
      <div className="leftNoteCollection">
        <div className="leftNote-subContainer">
          <button type="button" class="button" onClick={addMoreNote}>
            <span className="button__text">Add Notes</span>
            <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
          </button>
        </div>
        <div className="notesBtn">
          {btnArr.map((btn, idx) => {
            return (
              <div className="btns" key={`unique_${idx}_${Math.random() * 10}`}>
                <p className="Btn" onKeyDown={(e)=>chngeData(e)} contentEditable="true" onClick={() => { showClickedNote(idx); }}>
                  {btn.btn}
                </p>
                {/* <button >Delete</button> */}
                <button className="delete-button" onClick={() => { deleteNote(idx) }}>
                  <svg className="delete-svgIcon" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rightNoteData">
        <nav>
          <ul>
            <li onClick={write} onMouseOver={handleHover} onMouseOut={handleMouseOut} style={{
              borderBottom:(ispreview)? "0px solid black":"2px solid black"}
              
              }>Write</li>
            <li onMouseOver={handleHover} onMouseOut={handleMouseOut} onClick={preview} style={{
              borderBottom:(ispreview)? "2px solid black":"0px solid black"}}>Preview</li>
            <li onClick={() => { addHashTag('heading') }}>H</li>
            <li onClick={() => { addHashTag('bold') }}>B</li>
            <li onClick={() => { addHashTag('italic') }}>I</li>
            <li >
              <i onClick={() => { addHashTag('strike') }} className="fa-solid fa-strikethrough"></i>
            </li>
            <li >
              <i onClick={() => { addHashTag('link') }} className="fa-solid fa-link"></i>
            </li>
            <li onClick={() => { addHashTag('blackquote') }}>
              <img src={comalogo} alt="" />
            </li>
            <li>
              <i className="fa-solid fa-code"></i>
            </li>
            <li>
              <i className="fa-solid fa-image"></i>
            </li>
            <li>
              <i className="fa-solid fa-list"></i>
            </li>
            <li>
              <i className="fa-solid fa-list-ol"></i>
            </li>
            <li>
              <i className="fa-solid fa-list-check"></i>
            </li>
          </ul>
        </nav>
        {(ispreview) ? <Preview data={noteData} /> : <Textarea data={noteData} func={chngeData} />}

      </div>
    </div>
  );
};
export default Newnote;
