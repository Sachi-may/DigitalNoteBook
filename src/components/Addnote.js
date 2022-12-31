import React, { useContext } from 'react'
import { useState } from 'react';
import noteContext from '../context/notes/noteContext';
const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div>
                <div className="container my-3">
                    <h1>Add Your Notes</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={2} required />
                            <div className="form-text">Minimum Length is 2</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} required minLength={5} />
                            <div className="form-text">Minimum Length is 6</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} minLength={2} required />
                            <div className="form-text">Minimum Length is 2</div>
                        </div>

                        <button disabled={note.title.length < 2 || note.description.length < 6 || note.tag.length < 2} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addnote
