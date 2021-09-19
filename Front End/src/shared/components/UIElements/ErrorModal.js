import React from 'react'
import Button from '../FormElements/Button'
import Modal from './Modal'

export default function ErrorModal(props) {
    return (
        <Modal
        onCancel = {props.onClear}
        header="An error occured"
        show={props.error}
        footer={<Button onClick={props.onClear}>okay</Button>}
        >
            <p>{props.error}</p>
        </Modal>
    )
}
