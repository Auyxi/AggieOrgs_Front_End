// https://www.youtube.com/watch?v=l6nmysZKHFU&t=2278s generally starting at around 20 min onwards
// https://nextjs.org/docs/basic-features/built-in-css-support

import Link from 'next/link';
import styles from './SideNav.module.css'

const SideNav = props => {
    let sidebarClasses = `${styles.sidebar}`
    if (props.show) {
        sidebarClasses = `${styles.sidebar} ${styles.open}`
    }

    return (
        <header className={sidebarClasses}>
            <span className={styles.closeIcon} onClick={props.click}>&#10006;</span>
            <div className={styles.sidebar_navigation_items}>
                <ul>
                    <li>
                        <Link href="/quiz">
                            <a>AggieOrgs Recommender</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/saved">
                            <a>View Saved Organizations</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a>My Account</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default SideNav;

