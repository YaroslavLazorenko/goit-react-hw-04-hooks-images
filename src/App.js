import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import styles from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const onSubmitSearchQuery = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmitSearchQuery={onSubmitSearchQuery} />
      <main>
        <ImageGallery searchQuery={searchQuery} openModal={openModal} />
        {showModal && <Modal closeModal={toggleModal} largeImageURL={largeImageURL} tags={tags} />}
        <ToastContainer autoClose={3000} />
      </main>
    </div>
  );
};

export default App;
