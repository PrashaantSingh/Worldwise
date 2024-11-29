import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';

export default function PageNav() {
  return (
    <nav className={styles.nav}>
        <Logo/>
        <ul>
            <li>
                <NavLink to="/pricing" className={styles.navLink}>
                    Pricing
                </NavLink>
            </li>
            <li>
                <NavLink to="/product" className={styles.navLink}>
                    Product
                </NavLink>
            </li>
            <li>
                <NavLink to="/login" className={styles.ctaLink}>
                    Login
                </NavLink>
            </li>

        </ul>
    </nav>
  );
}
