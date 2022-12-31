// import React, { useContext, useEffect, useRef, useState } from 'react'
// import noteContext from '../context/notes/noteContext';
// import NoteItems from './NoteItems';
// import Addnote from './Addnote'

// const Notes = () => {
//   const context = useContext(noteContext);
//   const [note, setNote] = useState({ etitle:"", edescription:"", etag:"" })
//   const { notes, getNotes } = context;
//   useEffect(() => {

//     getNotes()
//     // eslint-disable-next-line
//   }, [])
//   const refs = useRef(null)
//   const updateNote = (currentNote) => {
//     refs.current.click()
//     setNote({etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
//   }
//   const handleClick = (e) => {
//     e.preventDefault();
//   }

//   const onChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value })
//   } 
//   return (
//     <>
//       <Addnote />
//       <button ref={refs} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
//         Launch demo modal
//       </button>
//       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>

//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="etitle" className="form-label">Title</label>
//                   <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="edescription" className="form-label">Description</label>
//                   <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription || "description"} onChange={onChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="etag" className="form-label">Tag</label>
//                   <input type="text" className="form-control" id="etag" value={note.etag || "tag"} name='etag' onChange={onChange} />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               <button type="button" className="btn btn-primary">Update Note</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='row my-3'>
//         <h1>Your Notes</h1>
//         {notes.map((note) => {
//           return <NoteItems key={note._id} updateNote={updateNote} note={note} />
//         })}
//       </div>
//     </>
//   )
// }

// export default Notes





import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitems from './NoteItems';
import Addnote from './Addnote';
import { useNavigate} from "react-router-dom"


const Notes = (props) => {
    let navigate= useNavigate()
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes()
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        e.preventDefault();
        props.showAlert("Note Updated Successfully","success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} required minLength={2} />
                                    <div className="form-text">Minimum Length is 2</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required minLength={5} />
                                    <div className="form-text">Minimum Length is 6</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required minLength={2} />
                                    <div className="form-text">Minimum Length is 2</div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 2 || note.edescription.length < 6 || note.etag.length < 2} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>

                {notes.length === 0 && <div className="badge text-bg-info container flex float-left my-5" style={{ 'width': 'max-content' }}>You Have No Notes To Display</div>}

                {notes.map((note) => {
                    return <Noteitems key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes