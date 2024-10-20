import { Outlet } from "react-router-dom";
import styles from './RootLayout.module.css';
import { useContext } from "react";
import { EmailContext } from "../../store/emailContext";

export default function RootLayout() {

    const {filter, updateFilter} = useContext(EmailContext);

    const handleFilterChange = (selectedFilter) => {
        if(filter != selectedFilter){
            updateFilter(selectedFilter);
        }else {
            updateFilter(undefined)
        }
        
    }

    return <>
    <header>
        <nav className={styles.menuList}>
            <p>Filter By:</p>
            <li>
                <button className={`${styles.menuButton} ${filter === 'unread' ? styles.selectedButton: ''}`}
                onClick={() => handleFilterChange('unread')}
                >
                    Unread
                </button>
            </li>
            <li>
                <button  className={`${styles.menuButton} ${filter === 'read' ? styles.selectedButton: ''}`}
                onClick={() => handleFilterChange('read')}
                >
                    Read
                </button>
            </li>
            <li>
                <button className={`${styles.menuButton} ${filter === 'favorites' ? styles.selectedButton: ''}`}
                onClick={() => handleFilterChange('favorites')}
                >
                    Favorites
                </button>
            </li>
        </nav>
    </header>
    <main>
        <Outlet />
    </main>
    </>
}