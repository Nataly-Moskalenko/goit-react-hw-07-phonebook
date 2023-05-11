import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsDeleting, selectContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Loader } from '../loader/Loader';

import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

export default function ContactItem({ name, number, id }) {
  const dispatch = useDispatch();
  const isDeleting = useSelector(selectIsDeleting);
  const contacts = useSelector(selectContacts);
  const [clickedContact, setClickedContact] = useState(null);

  const handleDeleteContact = async id => {
    try {
      const deletingContact = contacts.filter(contact => contact.id === id);
      setClickedContact(deletingContact);
      dispatch(deleteContact(id));
      toast.info(`${deletingContact[0].name} deleted from contacts.`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={css.contactItem}>
      <div>
        <FaUserAlt className={css.contactItem__icon} />
        <span>{name}: </span>
        <span>{number}</span>
      </div>
      <button
        className={css.contactDeleteButton}
        type="button"
        onClick={() => handleDeleteContact(id)}
        // disabled={isDeleting}
      >
        <span>Delete</span>       
        {isDeleting && clickedContact && <Loader />}
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
