import { Fragment, useState, useEffect } from "react";
// import "../styles/";
import NavBar from "../components/NavBar";
import FormModal from "../components/formModal";
import SearchModal from "../components/searchModal";
import Board from "../components/Board";
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())
function App() {
  // show and hide implementations on form modal
  const { data, error } = useSWR(`http://localhost:3000/api/note/get`, fetcher, { refreshInterval: 1000 })
  let dataNotes = data?.notes?.notes
  const [notes, setNotes] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);

  const openFormModal = () => {
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  // show and hide implementation on search modal

  const [showSearchModal, setShowSearchModal] = useState(false);

  const openSearchModal = () => {
    setShowSearchModal(true);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
  };

  // got the main and sub title of the note

  const [noteMainTitle, setNoteMainTitle] = useState("");

  const handleNoteMainTitle = (e) => {
    setNoteMainTitle(e.target.value);
  };

  const [noteSubTitle, setNoteSubTitle] = useState("");

  const handleNoteSubTitle = (e) => {
    setNoteSubTitle(e.target.value);
  };

  // got the description of the note

  const [noteDescription, setNoteDescription] = useState("");

  const handleNoteDescription = (e) => {
    setNoteDescription(e.target.value);
  };

  // submission of the note



  useEffect(() => {
    const getNotes = async () => {
      if(data){
        console.log(data?.notes);
        setNotes(...[data?.notes]);
      }
    };
    getNotes();
  }, [notes, data]);

  const handleNoteSubmission = async (e) => {
    e.preventDefault();
    // document.cookie = "notes=" + JSON.stringify(notes);
    // localStorage.setItem("notes", JSON.stringify(notes));
    const res = await fetch('/api/note/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteMainTitle, noteSubTitle, noteDescription }),
    });
    const data = await res.json();
    if (data) {
      setNoteMainTitle("");
      setNoteSubTitle("");
      setNoteDescription("");
    }
    console.log(data);
    console.log("Sent");
  };

  // clear all the notes

  const handleClearNotes = async () => {
    const res = await fetch('/api/note/delete', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // searching the notes

  const [searchNoteQuery, setSearchNoteQuery] = useState("");

  const handleNoteSearchFunction = (e) => {
    setSearchNoteQuery(e.target.value);
  };

  const handleSearchFunction = (e) => {
    e.preventDefault();
    const searchedNotes = notes.filter((obj) => {
      return obj.noteMainTitle.includes(searchNoteQuery);
    });
    setNotes(searchedNotes);
    console.log(searchedNotes);
  };
  return (
    <Fragment>
      <NavBar
        // open modals functions props
        showFormModalFunction={openFormModal}
        showSearchModalFunction={openSearchModal}
        noteClearanceFunction={handleClearNotes}
      />
      <FormModal
        // modal props
        noteModalShowStatement={showFormModal}
        closeFormModalFunction={closeFormModal}
        // input function props
        noteMainTitleFunction={handleNoteMainTitle}
        noteSubTitleFunction={handleNoteSubTitle}
        noteDescriptionFunction={handleNoteDescription}
        // input value props
        noteMainTitleValue={noteMainTitle}
        noteSubTitleValue={noteSubTitle}
        noteDescriptionValue={noteDescription}
        // note submission prop
        noteSubmissionFunction={handleNoteSubmission}
      />
      <SearchModal
        // modal props
        searchModalShowStatement={showSearchModal}
        closeSearchModalFunction={closeSearchModal}
        // note search props
        noteSearchFunction={handleSearchFunction}
        searchQueryValue={searchNoteQuery}
        noteSearchQueryFunction={handleNoteSearchFunction}
      />
      {/* <Board notesData={notes} /> */}
      <main className="Board">
      {notes && notes?.map((noteObj, noteIndex) => {
        return (
          <div className="note" key={noteIndex}>
            <div className="note-text">
              <h1>{noteObj.noteMainTitle}</h1>
              <h3>{noteObj.noteSubTitle}</h3>
              <p>{noteObj.noteDescription}</p>
            </div>
          </div>
        );
      })}
    </main>
    </Fragment>
  );
}

export default App;


