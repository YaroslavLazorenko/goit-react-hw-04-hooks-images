import { useState, useEffect, useRef, useCallback } from 'react';
import PicturesApiService from '../../services/pixabay-api';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const MAX_NUMBER_OF_ITEMS_IN_IMAGES_ARRAY = 12;
const picturesApiService = new PicturesApiService();

export default function ImageGallery({ searchQuery, openModal }) {
  const [status, setStatus] = useState(Status.IDLE);
  const [imagesArray, setImagesArray] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadMorePicturesRequested, setIsLoadMorePicturesRequested] = useState(false);

  const isSearchQueryEmpty = searchQuery === '';
  const isItemsInImagesArray = imagesArray.length !== 0;

  const hasImagesArrayMaxNumberOfItems = useRef(false);

  const fetchPictures = useCallback(() => {
    picturesApiService
      .fetchPictures()
      .then(result =>
        result.hits.map(({ webformatURL, largeImageURL, tags }) => {
          return { webformatURL, largeImageURL, tags };
        }),
      )
      .then(imagesArray => {
        hasImagesArrayMaxNumberOfItems.current =
          imagesArray.length < MAX_NUMBER_OF_ITEMS_IN_IMAGES_ARRAY;
        const isItemsInImagesArray = imagesArray.length !== 0;

        if (!isItemsInImagesArray) {
          showMessage('There are no results on your search query. Please, enter another request.');
        }

        setImagesArray(prevState => [...prevState, ...imagesArray]);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);

  useEffect(() => {
    if (isSearchQueryEmpty) return;

    picturesApiService.query = searchQuery;
    picturesApiService.resetPage();
    setImagesArray([]);
    setStatus(Status.PENDING);
    fetchPictures();
    window.scroll(0, 0);
  }, [fetchPictures, isSearchQueryEmpty, searchQuery]);

  useEffect(() => {
    if (isSearchQueryEmpty) return;
    if (isLoadMorePicturesRequested) {
      picturesApiService.incPage();
      setIsLoadMorePicturesRequested(false);
      setStatus(Status.PENDING);
      fetchPictures();
    }
  }, [fetchPictures, isLoadMorePicturesRequested, isSearchQueryEmpty]);

  const showMessage = message => {
    toast(message, { toastId: 'ImageGallery-toast' });
  };

  if (status === Status.IDLE) {
    return (
      <p className={styles['ImageGallery-text']}>
        Please, enter your search query to find pictures
      </p>
    );
  }

  if (status === Status.REJECTED) {
    showMessage(error.message);
    return <p className={styles['ImageGallery-text']}>Error fetching data</p>;
  }

  return (
    <>
      {isItemsInImagesArray && (
        <ul className={styles.ImageGallery}>
          {imagesArray.map(({ webformatURL, largeImageURL, tags }, index) => {
            return (
              <ImageGalleryItem
                key={index}
                galleryImageURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                openModal={openModal}
              />
            );
          })}
        </ul>
      )}

      {status === Status.PENDING && (
        <div className={styles['Loader-container']}>
          <Loader type="Puff" color="#00BFFF" height={300} width={300} />
        </div>
      )}

      {!hasImagesArrayMaxNumberOfItems.current &&
        status === Status.RESOLVED &&
        !picturesApiService.reachMaxPage() && (
          <Button
            loadMorePictures={() => {
              setIsLoadMorePicturesRequested(true);
            }}
          />
        )}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
