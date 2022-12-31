import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItems = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} =context;
    const { note,updateNote} = props;
    return (
        <div className="card col-md-3 mx-3 my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully","success") }}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note); }}></i>
            </div>
        </div>
    )
}

export default NoteItems
