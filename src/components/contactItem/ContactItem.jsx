import { FaUserAlt } from 'react-icons/fa';
import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

export default function ContactItem({ name, number, id, onDeleteContact }) {
  return (
    <div className={css.contactItem__descr}>
      <div>
        <FaUserAlt className={css.contactItem__icon} />
        <span>{name}: </span>
        <span>{number}</span>
      </div>
      <button
        className={css.contactDeleteButton}
        type="button"
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </div>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
