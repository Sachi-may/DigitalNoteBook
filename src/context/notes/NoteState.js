
import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    
  ]

  const [notes, setNotes] = useState(notesInitial)


  //GET ALL NOTES
  const getNotes = async() => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }


  // ADD a note
  const addNote = async(title, description, tag) => {
    //API CALL

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      

      body: JSON.stringify({title,description,tag})
      
      

    });
  

    //Logic to add a note
    const note = await response.json()
    setNotes(notes.concat(note))
  }


  //Delete a Note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
    });
    const json = response.json();
    console.log(json);
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json)


    let newNotes=JSON.parse(JSON.stringify(notes))
  
    //CLIENT EDIT
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      } 
      
    }
    setNotes(newNotes);
    // console.log(notes);
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;