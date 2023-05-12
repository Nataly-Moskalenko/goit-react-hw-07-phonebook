import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchContacts } from 'redux/operations';
import {
  selectError,
  selectStatus,
  selectFilter,
  selectContacts,
} from 'redux/selectors';

import { LoaderLarge } from '../loader/Loader';
import ContactItem from '../contactItem/ContactItem';
import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectStatus);
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

  return (
    <>
      {status === 'loading' && !error && (
        <div className={css.loading}>
          Loading contacts...
          <LoaderLarge />
        </div>
      )}
      {error && <p>Sorry, something went wrong: {error}</p>}
      {visibleContacts.length === 0 && contacts.length !== 0 && (
        <p>There are no contacts by your search.</p>
      )}
      {visibleContacts.length > 0 && (
        <ul>
          {visibleContacts.map(contact => (
            <ContactItem
              key={contact.id}
              name={contact.name}
              number={contact.phone}
              id={contact.id}
            />
          ))}
        </ul>
      )}
    </>
  );
}
