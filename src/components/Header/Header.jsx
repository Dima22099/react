import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser';

const Logo = ['/PersonalJournal.svg', '/vite.svg'];

const Header = () => (
  <>
    <img className={styles.logo} src={Logo[0]} alt="Логотип журнала" />
    <SelectUser />
  </>
);
export default Header;
