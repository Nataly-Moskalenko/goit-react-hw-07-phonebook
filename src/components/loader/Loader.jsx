import { ImSpinner } from 'react-icons/im';
import css from './Loader.module.css';

export function Loader() {
  return (
    <div className={css.loader}>
      <ImSpinner className={css.loader__icon} />      
    </div>
  );
}
export function LoaderLarge() {
  return (
    <div className={css.loaderLarge}>
      <ImSpinner className={css.loader__icon} />      
    </div>
  );
}