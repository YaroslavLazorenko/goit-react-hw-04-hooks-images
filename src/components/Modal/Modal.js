import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, largeImageURL, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdrop}>
      <div className={styles.Modal}>
        <img className={styles.Image} src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
