// Dependencies, Global Constants, and Dummy Content
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
// Dummy Content
// import DummyContent from './DummyContent'
// import { getNotesForFolder, findNote, findFolder } from './notes-helpers'

// Components + Styling
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import NoteListMain from './NoteListMain/NoteListMain'
import NoteListNav from './NoteListNav/NoteListNav'
import NotePageMain from './NotePageMain/NotePageMain'
import NotePageNav from './NotePageNav/NotePageNav'
import './App.css';

// API Context 
import Context from './Context'
import Config from './Config'

// Error Boundary
import ErrorBounds from './ErrorBounds'


export default class App extends Component {
  state = {
    notes: [],
    folders: [],
    note: {},
    error: null
  };

  componentDidMount() {
    Promise.all([
      fetch(`${Config.API_ENDPOINT}/notes`),
      fetch(`${Config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, folderRes]) => {
        if (!notesRes.ok) {
          return notesRes.json().then(e => Promise.reject(e))
        }
        if (!folderRes.ok) {
          return folderRes.json().then(e => Promise.reject(e))
        }
        return Promise.all([
          notesRes.json(),
          folderRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        < ErrorBounds >
          {['/', '/folder/:folderId'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              component={NoteListNav}
            />
          )}
          <Route
            path='/note/:noteId'
            component={NotePageNav}
          />
          <Route
            path='/add-folder'
            component={NotePageNav}
          />
          <Route
            path='/add-note'
            component={NotePageNav}
          />
        </ErrorBounds>
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        < ErrorBounds >
          {['/', '/folder/:folderId'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              component={NoteListMain}
            />
          )}
          <Route
            path='/note/:noteId'
            component={NotePageMain}
          />
          <Route
            path='/add-folder'
            component={AddFolder}
          />
          <Route
            path='/add-note'
            component={AddNote}
          />
        </ErrorBounds>
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote
    }
    return (
      < Context.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <i class="fa fa-check" aria-hidden="true"></i>
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </Context.Provider>
    )
  }
} 