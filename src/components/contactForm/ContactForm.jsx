import { useDispatch, useSelector } from 'react-redux';

import { selectContacts, selectStatus } from 'redux/selectors';
import { addContact } from 'redux/operations';

import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

import { Loader } from '../loader/Loader';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const initialValues = {
    name: '',
    number: '',
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectStatus);

  const patternName =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  const patternNumber =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  const schema = Yup.object().shape({
    name: Yup.string()
      .max(20, 'Name too long!')
      .matches(
        patternName,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required('Required'),
    number: Yup.string()
      .matches(
        patternNumber,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      name: values.name,
      phone: values.number,
      createdAt: Date.now(),
    };
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      toast.info(`${values.name} is already in contacts.`);
    } else {
      try {
        dispatch(addContact(newContact));
        toast.info(`Adding ${values.name} to contacts.`);
        resetForm();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm} autoComplete="off">
        <label className={css.contactName} htmlFor={nameInputId}>
          Name
        </label>
        <Field
          className={css.contactInput}
          type="text"
          name="name"
          id={nameInputId}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage
          name="name"
          render={msg => <div className={css.contactError}>{msg}</div>}
        />
        <label className={css.contactNumber} htmlFor={numberInputId}>
          Number
        </label>
        <Field
          className={css.contactInput}
          type="tel"
          name="number"
          id={numberInputId}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMessage
          name="number"
          render={msg => <div className={css.contactError}>{msg}</div>}
        />
        <button className={css.contactAddButton} type="submit">
          {status === 'adding' && (
            <div className={css.contactAdd}>
              <span>Adding</span>
              <Loader />
            </div>
          )}
          {status !== 'adding' && 'Add contact'}
        </button>
      </Form>
    </Formik>
  );
}
