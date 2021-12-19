import { PropTypes } from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ galleryImageURL, largeImageURL, tags, openModal }) {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => {
        openModal(largeImageURL, tags);
      }}
    >
      <img
        className={styles['ImageGalleryItem-image']}
        src={galleryImageURL}
        data-src={largeImageURL}
        alt={tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  galleryImageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
