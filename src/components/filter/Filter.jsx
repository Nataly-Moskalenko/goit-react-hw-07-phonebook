import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import { changeFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

import css from './Filter.module.css';

export default function Filter() {
  const nameInputValue = nanoid();
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleChangeFilter = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  return (
    <div className={css.filter}>
      <label className={css.filterLabel} htmlFor={nameInputValue}>
        Find contacts by name
      </label>
      <input
        className={css.filterInput}
        id={nameInputValue}
        type="text"
        value={filter}
        onChange={handleChangeFilter}
      />
    </div>
  );
}
