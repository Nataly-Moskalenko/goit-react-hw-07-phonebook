import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchContacts, deleteContact } from 'redux/operations';
import {
  selectError,
  selectIsLoading,
  selectFilter,
  selectContacts,
} from 'redux/selectors';

import ContactItem from '../contactItem/ContactItem';
import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);  

  const [visibleContacts, setVisibleContacts] = useState(contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    setVisibleContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
      )
    );
  }, [contacts, filter]);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      {isLoading && !error && <p>Loading contacts...</p>}      
      {error && <p>Sorry, something went wrong: {error}</p>}    
      {visibleContacts.length === 0 && contacts.length !== 0 && (
        <p>There are no contacts by your search.</p>
      )}
      {visibleContacts.length > 0 && (
        <ul>
          {visibleContacts.map(contact => (
            <li className={css.contactItem} key={contact.id}>
              <ContactItem
                name={contact.name}
                number={contact.phone}
                id={contact.id}
                onDeleteContact={handleDeleteContact}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
