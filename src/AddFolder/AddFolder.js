import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
/* Api Context */
import Context from '../Context'
import Config from '../Config'

/* Prop-Types */
import PropTypes from 'prop-types'

export default class AddFolder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            validationMessage: `Folder name must be between 4-16 characters. No numbers, spaces, or special characters.`,
            required: '*'
        }
    }

    updateName = (name) => {
        this.FormValidation(name, 'folder')
    }

    FormValidation = (name, formOutput) => {
        const regex = /^([a-zA-Z]{4,16})$/
        if (!regex.test(name) && formOutput === 'folder') {
            this.setState({ name, validationMessage: `Folder name must be between 4-16 characters. No numbers, spaces, or special characters.`, required: `*` })
        } else {
            this.setState({ name, validationMessage: '', required: '' })
        }
    }

    static defaultProps = {
        history: {
            push: () => { }
        },
    }

    static contextType = Context

    handleSubmit = event => {
        event.preventDefault()
        const folder = {
            name: this.state.name
        }
        fetch(`${Config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(folder => {
                this.context.addFolder(folder)
                this.props.history.push(`/folder/${folder.id}`)
            })
            .catch(err => {
                console.error({ err })
            })
    }

    render() {
        return (
            <section className='AddFolder'>
                <h2>Create Folder</h2>
                <NotefulForm
                    onSubmit={this.handleSubmit}
                    className="AddFolder-form"
                >
                    <fieldset className='field'>
                        <legend>* Indicates Required Field</legend>
                        < br />
                        <label
                            htmlFor='folder-name-input'
                            style={{
                                fontStyle: this.state.required === '*' ? 'italic' : 'normal',
                                fontWeight: this.state.required === '*' ? 'bold' : 'normal'
                            }}>
                            {this.state.required} Name
                        </label>
                        <input
                            autoCapitalize="true"
                            aria-required="true"
                            aria-label="new folder name"
                            aria-describedby="folder-name-validation"
                            autoFocus={true}
                            type='text'
                            id='folder-name-input'
                            name='folder-name'
                            placeholder="NewFolder"
                            onChange={e => this.updateName(e.target.value)} />
                        <div id="folder-name-validation">
                            {this.state.validationMessage}
                        </div>
                    </fieldset>
                    <div className='buttons'>
                        <button disabled={this.state.validationMessage !== ''} onClick={(e) => this.handleSubmit(e)} type='submit'>
                            Add folder
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}

AddFolder.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}