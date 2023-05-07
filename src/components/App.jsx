import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { getError, getIsLoading } from 'redux/selectors';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';

import css from './App.module.css';

export function App() {
  const dispatch = useDispatch();  
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.app}>
      <div className={css.phonebook}>
        <h1>Phonebook</h1>       
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        {isLoading && <p>Loading contacts...</p>}
        {error && <p>{error}</p>}
        <ContactList />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
