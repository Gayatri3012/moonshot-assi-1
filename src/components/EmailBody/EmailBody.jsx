import { useContext, useEffect, useState } from 'react';
import styles from './EmailBody.module.css';
import { EmailContext } from '../../store/emailContext';

const fetchEmailById = async (id) => {
    try{
        const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
        const data = response.json();
        return data;
    }catch(err){
        console.log(err);
    }
}

export default function EmailBody({showEmailBody, emailData}) {

    const {read, favorite, updatefavoriteEmails, updateReadEmails} = useContext(EmailContext);
    
    const [fetchedEmail, setFetchedEmail] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEmailById(emailData.id);
                setFetchedEmail(data);
            }catch(err){
                console.log(err)
            }
        }

        fetchData();
    },[emailData]);


    const handleMarkAsFavorite = () => {
        updatefavoriteEmails(emailData.id);
    }
    
    let classContentEmailBody = `${styles.emailBodyContainer} ${showEmailBody ? styles.displayEmailBody : styles.hideEmailBody}`;
    
    
    return <article className={classContentEmailBody}>
        <div className={styles.avatar}>
            <p>{emailData.from.name[0]}</p>
        </div>
        <section className={styles.emailContent}>
            <div className={styles.emailHeader}>
                <div className={styles.emailHeaderInfo}>
                    <p className={styles.emailSubject}>{emailData.subject}</p>
                    <p className={styles.emailDate}>{emailData.date}</p>
                </div>
                <button onClick={handleMarkAsFavorite}>Mark as favorite</button>
            </div>
            
            {fetchedEmail && <div className={styles.emailBody}  dangerouslySetInnerHTML={{__html: fetchedEmail.body}}/> }
        </section>
    </article>
}