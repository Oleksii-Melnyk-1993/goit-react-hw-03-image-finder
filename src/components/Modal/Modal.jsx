import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseEscModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseEscModal);
  }

  handleCloseEscModal = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div onClick={this.handleBackdropClick}>
        <div>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onCLose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
