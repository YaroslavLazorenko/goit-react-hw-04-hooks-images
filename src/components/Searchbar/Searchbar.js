import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmitSearchQuery }) {
  const [query, setQuery] = useState('');

  const onChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (query.trim()) {
      onSubmitSearchQuery(query);
      resetForm();
      return;
    }
    toast('Please, enter your request in search field', { toastId: 'Searchbar-toast' });
  };

  const resetForm = () => {
    setQuery('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmitSearchQuery: PropTypes.func.isRequired };
