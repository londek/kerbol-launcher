import React, { Component } from 'react';

interface ModalProps {
    label: string;
    openTrigger: () => boolean;
}

interface ModalState {

}

class Modal extends Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element | null {
        const { label, children, openTrigger } = this.props;

        if(!openTrigger()) return ( null );

        return (
            <div id={`modal__${label}`}>
                {children}
            </div>
        );
    }
}

export default Modal;
