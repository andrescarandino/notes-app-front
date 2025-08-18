import { useState, useEffect } from 'react'
import Note from './components/Note';
import noteService from './services/notes'
import Notification from './components/Notification';

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    
    
  }

  const HandleNoteChange = (Event) => {
    setNewNote(Event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
      setErrorMessage(
        `the note '${note.content}' was already deleted from server`
      );
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      <button onClick={() => { setShowAll(!showAll); }}>
        {showAll ? 'Important' : 'All'}
      </button>

      <form onSubmit={addNote}>
        <input
          placeholder='New note here..'
          value={newNote}
          onChange={HandleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default App
