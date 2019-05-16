import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

/* Api Context */
import Context from '../Context'

/* Prop-Types */
import PropTypes from 'prop-types'

/* Error Boundary */
import ErrorBounds from '../ErrorBounds'


export default class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = Context

    render() {
        const { folderId } = this.props.match.params
        const { notes = [] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className='NoteListMain'>
                <ErrorBounds >
                    <ul>
                        {notesForFolder.map(note =>
                            <li key={note.id}>
                                <Note
                                    id={note.id}
                                    name={note.name}
                                    modified={note.modified}
                                />
                            </li>
                        )}
                    </ul>
                </ErrorBounds>
                <div className='NoteListMain__button-container'>
                    <CircleButton
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='NoteListMain__add-note-button'
                    >
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        <br />
                        Note
              </CircleButton>
                </div>
            </section>
        )
    }
}

NoteListMain.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
}