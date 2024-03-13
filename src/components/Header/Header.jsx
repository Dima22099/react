import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser';
// import styles from '../Header.module.css';

const Header = () => (
  <>
    <img className={styles.logo} src="/PersonalJournal.svg" alt="Логотип журнала" />
    <SelectUser />
  </>
);
export default Header;
