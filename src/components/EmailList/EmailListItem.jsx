import { useContext } from 'react';
import styles from './EmailList.module.css';
import { EmailContext } from '../../store/emailContext';

export default function EmailListItem({emailData, selectedEmail, showEmailBody}){

    const {favorite, read} = useContext(EmailContext);

    let isFavorite = favorite.some(id => id === emailData.id);
    let isRead = read.some(id => id === emailData.id);
    let isSelectedEmail = (selectedEmail?.id === emailData?.id) && showEmailBody;

    let className = `${styles.emailListItem} ${isSelectedEmail ? styles.selectedEmail : ''} ${isRead ? styles.readEmail : ''}`
    
    return <section className={className}>
        <div className={styles.avatar}>
            <p>{emailData.from.name[0]}</p>
        </div>
        <div className={styles.emailInfo}>
            <p>From: <strong>{`${emailData.from.name} ${emailData.from.email}`}</strong></p>
            <p>Subject: <strong>{emailData.subject}</strong></p>
            <span className={styles.emailDescription}>{emailData.short_description}</span>
            <p>{emailData.date} {isFavorite && <span className={styles.favorite}>Favorite</span>}</p>
        </div>
    </section>
}