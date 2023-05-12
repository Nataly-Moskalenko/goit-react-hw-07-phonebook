import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectStatus, selectContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Loader } from '../loader/Loader';

import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

export default function ContactItem({ name, number, id }) {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const contacts = useSelector(selectContacts);
  const [clickedContact, setClickedContact] = useState({});

  const handleDeleteContact = id => {
    try {
      const deletingContact = contacts.filter(contact => contact.id === id);
      setClickedContact(deletingContact[0]);
      dispatch(deleteContact(id));
      // toast.info(`Deleting ${deletingContact[0].name} from contacts.`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'deletedContact' && clickedContact.name) {
      toast.info(`${clickedContact.name} deleted from contacts.`);
    }
  }, [status, clickedContact]);

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
        {status === 'deleting' && clickedContact.name && <Loader />}
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
