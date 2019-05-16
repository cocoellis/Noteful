import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Note.css'


/* Api Context  */
import Context from '../Context'
import Config from '../Config'

/* Prop-Types */
import PropTypes from 'prop-types'

export default class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => { },
    }

    static contextType = Context

    handleClickDelete = e => {
        e.preventDefault()

        const noteId = this.props.id

        fetch(`${Config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(() => {
                this.context.deleteNote(noteId)
                // lets parent perform extra behavior
                this.props.onDeleteNote(noteId)
            })
            .catch(err => {
                console.error({ err })
            })
    }

    render() {
        const { name, id, modified } = this.props
        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button
                    className='Note__delete'
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    {' '}
                    remove
            </button>
                <div className='Note__dates'>
                    <div className='Note__dates-modified'>
                        Modified
                        {' '}
                        <span className='Date'>
                            {/* {format(modified, 'Do MMM YYYY')} */}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

Note.propTypes = {
    onDeleteNote: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
} 