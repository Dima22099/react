import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser';
import Button from '../Button/Button';
import { useState }  from 'react';

const Logo = ['/PersonalJournal.svg', '/vite.svg'];

const Header = () => {

  const [logoIndex, setLogoIndex] = useState(0);

    const toggleLogo = () => {
      setLogoIndex(state => Number(!state))
    };
    return (
      <>
        <img className={styles.logo} src={Logo[logoIndex]} alt="Логотип журнала" />
        <SelectUser />
        <Button onClick={toggleLogo}>Сменить лого</Button>
      </>
    );
    };
export default Header;

