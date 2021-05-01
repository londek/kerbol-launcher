import '../css/addinstance.global.scss';

import React, { ChangeEvent, Component, FormEvent } from 'react';

import { FaFolderOpen, FaTimes } from 'react-icons/fa';

export interface AddInstanceModalProps {
    closeable: boolean;
    onCloseRequest: () => void
}

export interface AddInstanceModalState {
    label: string;
    path: string;
    opts: string;
    error: string;
    [key: string]: string;
}

class AddInstanceModal extends Component<AddInstanceModalProps, AddInstanceModalState> {
    static defaultProps = {
        closeable: true,
        onCloseRequest: (): void => void 0
    }

    state = {
        label: '',
        path: '',
        opts: '',
        error: '\u00A0' // NBSP
    }

    componentDidMount(): void {
        window.addEventListener('keydown', this.handleKeybind);
    }

    componentWillUnmount(): void {
        window.removeEventListener('keydown', this.handleKeybind);
    }

    handleKeybind = (event: KeyboardEvent): void => {
        if(event.key === 'Escape') this.props.onCloseRequest();
    }

    handleExit = (): void => {
        this.props.onCloseRequest();
    }

    handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        const gameData: StoreGameInstance = {
            label: this.state.label,
            distro: null,
            buildId: this.state.path
        };

        kerbolAPI.configManager.storeGameInstance(gameData).then(({ error }) => {
            if(error) {
                this.setState({ error });
                return;
            }

            this.handleExit();
        });
    }

    handleExplorerWindowOpen = (): void => {
        kerbolAPI.fileManager.openFileDialog([{name: 'buildID files', extensions: ['txt']}]).then(({ canceled, filePaths }) => {
            if(canceled || filePaths.length == 0) {
                return;
            }

            const [ path ] = filePaths;
            this.setState({ path });
        });
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render(): JSX.Element {
        return (
            <div id="modal__add-instance">
                {this.props.closeable && <button id="modal__add-instance-exit-btn" onClick={this.handleExit}>
                    <FaTimes id="modal__add-instance-exit-btn-icon" />
                </button>}

                <form id="modal__add-instance-container" onSubmit={this.handleSubmit}>
                    <label id="modal__add-instance-title">ADD NEW INSTANCE</label>
                    <br />

                    <div className="modal__add-instance-field-container">
                        <label className="modal__add-instance-label">LABEL</label><br />
                        <input required className="modal__add-instance-input"
                            name="label"
                            type="text"
                            placeholder="Name this instance"
                            maxLength={14}
                            value={this.state.label}
                            onChange={this.handleInputChange} /><br />
                    </div>

                    <div className="modal__add-instance-field-container">
                        <label className="modal__add-instance-label">GAME PATH</label><br />
                        <div id="modal__add-instance-game-path-container">
                            <input required className="modal__add-instance-input"
                                name="path"
                                type="text"
                                placeholder="C:\Sth\Kerbal Space Program\buildID64.txt"
                                value={this.state.path}
                                onChange={this.handleInputChange} />
                            <button type="button" id="modal__add-instance-game-path-btn" onClick={this.handleExplorerWindowOpen}><FaFolderOpen /></button>
                        </div>
                        <br />
                    </div>

                    <div className="modal__add-instance-field-container">
                        <label className="modal__add-instance-label">LAUNCH OPTIONS</label><br />
                        <input className="modal__add-instance-input"
                            name="opts"
                            type="text"
                            placeholder="Optional"
                            value={this.state.opts}
                            onChange={this.handleInputChange} /><br />
                    </div>

                    <label id="modal__add-instance-error-label">{this.state.error}</label>

                    <button type="submit" id="modal__add-instance-input-submit-btn" className="green-btn">ADD INSTANCE</button>
                </form>
            </div>
        );
    }
}

export default AddInstanceModal;
