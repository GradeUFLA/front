import { LayoutDashboard } from 'lucide-react';
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <span className={styles.imgLogo}>
                    <LayoutDashboard size={20} strokeWidth={1} />
                </span>

                <h4 className={styles.name}>
                    Grade<span>UFLA</span>
                </h4>
            </div>

            <nav className={styles.nav}>
                <button>Sobre</button>
                <button>Planner</button>
                <button>Dashboard</button>
            </nav>
        </header>
    );
};