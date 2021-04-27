import '../css/addinstance.global.scss';

import React, { Component } from 'react';
import Modal from '../components/modal';

export interface AddInstanceModalProps {

}

export interface AddInstanceModalState {

}

class AddInstanceModal extends Component<AddInstanceModalProps, AddInstanceModalState> {
    labelRef = React.createRef<HTMLInputElement>();
    pathRef = React.createRef<HTMLInputElement>();
    optsRef = React.createRef<HTMLInputElement>();

    constructor(props: AddInstanceModalProps) {
        super(props);
        this.state = {};
    }

    handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(this.labelRef.current?.value);
        console.log(this.pathRef.current?.value);
        console.log(this.optsRef.current?.value);
    }

    render(): JSX.Element {
        return (
            <Modal label="add-instance"
                openTrigger={() => true}>
                <form id="modal__add-instance-container" onSubmit={this.handleSubmit}>
                    <label id="modal__add-instance-title">ADD NEW INSTANCE</label>
                    <br />

                    <div className="modal__add-instance-field-container">
                        <label className="modal__add-instance-label">LABEL</label><br />
                        <input className="modal__add-instance-input" ref={this.labelRef} required name="label" type="text" placeholder="Name this instance" maxLength={13}/><br />
                    </div>

                    <div className="modal__add-instance-field-container">
                        <label className="modal__add-instance-label">GAME PATH</label><br />
                        <input className="modal__add-instance-input" ref={this.pathRef} required name="path" type="text" placeholder="C:\Sth\Kerbal Space Program\buildID64.txt" /><br />
                    </div>

                    <div className="modal__add-instance-field-container">
                        <label className="modal__add-instance-label">LAUNCH OPTIONS</label><br />
                        <input className="modal__add-instance-input" ref={this.optsRef} name="opts" type="text" placeholder="Optional" /><br />
                    </div>

                    <button id="modal__add-instance-input-submit-btn" className="green-btn" type="submit">ADD INSTANCE</button>
                </form>
            </Modal>
        );
    }
}

export default AddInstanceModal;
