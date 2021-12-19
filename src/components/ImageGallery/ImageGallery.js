import { useState, useEffect, useRef } from 'react';
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
  const hasImagesArrayMaxNumberOfItems = useRef(false);
  // const [hasImagesArrayMaxNumberOfItems, setHasImagesArrayMaxNumberOfItems] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    setStatus(Status.PENDING);
    if (isLoadMorePicturesRequested) {
      picturesApiService.incPage();
      setIsLoadMorePicturesRequested(false);
    } else {
      console.log('else');
      setImagesArray([]);
      picturesApiService.query = searchQuery;
      picturesApiService.resetPage();
    }

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
        // setHasImagesArrayMaxNumberOfItems(hasImagesArrayMaxNumberOfItems);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [isLoadMorePicturesRequested, searchQuery]);
  // componentDidUpdate(prevProps) {
  //   const { searchQuery } = this.props;*********
  //   const { isLoadMorePicturesRequested } = this.state;*************

  //   const isNewSearchQuery = prevProps.searchQuery !== searchQuery;**********

  //   if (isNewSearchQuery || isLoadMorePicturesRequested) {
  //     this.setState({ status: Status.PENDING });
  //     if (isLoadMorePicturesRequested) {
  //       this.setState({ isLoadMorePicturesRequested: false });
  //       this.picturesApiService.incPage();
  //     } else {
  //       this.setState({ imagesArray: [] });
  //       this.picturesApiService.query = searchQuery;
  //       this.picturesApiService.resetPage();
  //     }*******************

  //     this.picturesApiService
  //       .fetchPictures()
  //       .then(result =>
  //         result.hits.map(({ webformatURL, largeImageURL, tags }) => {
  //           return { webformatURL, largeImageURL, tags };
  //         }),
  //       )
  //       .then(imagesArray => {
  //         const hasImagesArrayMaxNumberOfItems =
  //           imagesArray.length < MAX_NUMBER_OF_ITEMS_IN_IMAGES_ARRAY;
  //         const isItemsInImagesArray = imagesArray.length !== 0;

  //         if (isNewSearchQuery && !isItemsInImagesArray) {
  //           this.showMessage(
  //             'There are no results on your search query. Please, enter another request.',
  //           );
  //         }

  //         this.setState(prevState => {
  //           return {
  //             imagesArray: [...prevState.imagesArray, ...imagesArray],
  //             status: Status.RESOLVED,
  //             hasImagesArrayMaxNumberOfItems,
  //           };
  //         });
  //       })
  //       .catch(error => this.setState({ error, status: Status.REJECTED }));
  //   }
  // }

  const loadMorePictures = () => {
    setIsLoadMorePicturesRequested(true);
  };

  const showMessage = message => {
    toast(message, { toastId: 'ImageGallery-toast' });
  };

  const isItemsInImagesArray = imagesArray.length !== 0;

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
        !picturesApiService.reachMaxPage() && <Button loadMorePictures={loadMorePictures} />}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
