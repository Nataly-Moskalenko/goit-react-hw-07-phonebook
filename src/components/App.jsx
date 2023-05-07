import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';

import css from './App.module.css';

export function App() {
  return (
    <div className={css.app}>
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
