import React, { Component } from 'react'
import CircleButton from '../CircleButton/CircleButton'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

/* Api Context */
import Context from '../Context'

import PropTypes from 'prop-types'


export default class NotePageNav extends Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = Context

    render() {
        const { notes, folders } = this.context
        const noteId = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        return (
            <div className='NotePageNav'>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__back-button'
                >
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    <br />
                    Back
            </CircleButton>
                {folder && (
                    <h3 className='NotePageNav__folder-name'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}

NotePageNav.propTypes = {
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
}