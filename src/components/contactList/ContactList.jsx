import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { deleteContact } from 'redux/contactsSlice';
import { getFilter, getContacts } from 'redux/selectors';

import ContactItem from '../contactItem/ContactItem';
import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const [visibleContacts, setVisibleContacts] = useState(contacts);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    setVisibleContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [contacts, filter]);

  return (
    <>
      {contacts.length === 0 && <p>There are no contacts.</p>}
      {visibleContacts.length === 0 && contacts.length !== 0 && (
        <p>There are no contacts by your search.</p>
      )}
      {visibleContacts && (
        <ul>
          {visibleContacts.map(contact => (
            <li className={css.contactItem} key={contact.id}>
              <ContactItem
                name={contact.name}
                number={contact.number}
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
