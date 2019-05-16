import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'

/* Api Context  */
import Context from '../Context'
import Config from '../Config'

/* Prop-Types */
import PropTypes from 'prop-types'

export default class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            required: '*',
            validationMessage: `Note title must be between 5-25 characters.`,
            selected: false
        }
    }
    static defaultProps = {
        history: {
            push: () => { }
        },
    }

    static contextType = Context

    handleChange = (event) => {
        // console.log(event.target.value)
        if (event.target.name === 'note-name') {
            this.FormValidation(event.target.value, 'note')
        } else if (event.target.name === 'note-folder-id' && event.target.value !== '...') {
            this.setState({ selected: true })
        } else {
            this.setState({ selected: false })
        }

    }

    FormValidation = (name, formOutput) => {
        const regex = /^(.{5,25})$/
        if (!regex.test(name) && formOutput === 'note') {
            this.setState({ name, validationMessage: `Note title must be between 5-25 characters.`, required: '*' })
        } else {
            this.setState({ name, validationMessage: '', required: '' })
        }
        // console.log(name)
    }

    handleSubmit = event => {
        // console.log(event.target)
        event.preventDefault()
        const newNote = {
            name: event.target['note-name'].value,
            content: event.target['note-content'].value,
            folderId: event.target['note-folder-id'].value,
            modified: new Date(),

        }
        fetch(`${Config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(note => {
                this.context.addNote(note)
                this.props.history.push(`/folder/${note.folderId}`)
            })
            .catch(err => {
                console.error({ err })
            })
    }
    render() {
        const { folders = [] } = this.context
        // map through folders & grab id
        // Display name to DOM as selector option
        return (
            <section className='AddNote'>
                <h2>Create a note</h2>
                <NotefulForm
                    onSubmit={this.handleSubmit}
                    className="AddNote-form">
                    <fieldset className='field'>
                        <legend>* Indicates Required Field</legend>
                        < br />
                        <label
                            htmlFor='note-name-input'
                            style={{
                                fontStyle: this.state.required === '*' ? 'italic' : 'normal',
                                fontWeight: this.state.required === '*' ? 'bold' : 'normal'
                            }}>
                            {this.state.required} Name
                        </label>
                        <input
                            aria-required="true"
                            aria-label="Note Name"
                            aria-describedby="note-name-validation"
                            autoCapitalize="true"
                            autoFocus={true}
                            type='text'
                            id='note-name-input'
                            name='note-name'
                            onChange={e => this.handleChange(e)}
                            placeholder='Title Your Note'
                            defaultValue={this.state.name}
                        />
                        <div id="note-name-validation">
                            {this.state.validationMessage}
                        </div>
                    </fieldset>
                    <fieldset className='field'>
                        <label htmlFor='note-content-input'>
                            Content
                        </label>
                        <textarea
                            aria-required="false"
                            aria-label="note content"
                            id='note-content-input'
                            name='note-content'
                        />
                    </fieldset>
                    <fieldset className='field'>
                        <label
                            htmlFor='note-folder-select'
                            style={{
                                fontStyle: !this.state.selected ? 'italic' : 'normal',
                                fontWeight: !this.state.selected ? 'bold' : 'normal'
                            }}>
                            <span style={{ display: !this.state.selected ? 'inline' : 'none' }}>*</span> Folder
                        </label>
                        <select
                            aria-required="true"
                            aria-label="folder selection"
                            id='note-folder-select'
                            name='note-folder-id'
                            onChange={e => this.handleChange(e)}
                        >
                            <option value={null}>...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            )}
                        </select>
                    </fieldset>
                    <div className='buttons'>
                        <button
                            type='submit'
                            disabled={this.state.validationMessage !== '' || !this.state.selected}
                        >
                            Add note
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}

AddNote.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}
