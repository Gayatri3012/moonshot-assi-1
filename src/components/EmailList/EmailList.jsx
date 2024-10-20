import EmailListItem from "./EmailListItem";
import styles from './EmailList.module.css';
import { useContext, useMemo, useState } from "react";
import { EmailContext } from "../../store/emailContext";
import EmailBody from "../EmailBody/EmailBody";

const dateFormatter = (dateValue) => {
    const date = new Date(dateValue);
    const formattedDate = date.toLocaleDateString('en-IN', {day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true});

    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
}

export default function EmailList(){
    const {emails, favorite, read, filter, updateReadEmails} = useContext(EmailContext);

    const [showEmailBody, setShowEmailBody] = useState(false);

    const [selectedEmail, setSelectedEmail] = useState(null);

   
    const filteredEmailList = useMemo(() => {
        setShowEmailBody(false)
        if (!filter) return emails; 
    
        if(filter === 'unread'){
            return emails.filter((email) => !read.includes(email.id));
        } else if(filter === 'read'){
            return emails.filter((email) => read.includes(email.id));
        } else if(filter === 'favorites'){
            return emails.filter((email) => favorite.includes(email.id));
        }
      }, [emails, favorite, read, filter]); 
    
      
    const handleEmailopen = (email) => {
        updateReadEmails(email.id);
        setSelectedEmail(email)
        setShowEmailBody(true);
    }

    let classContentEmailList = `${styles.emailList} ${showEmailBody ? styles.displayhalf: styles.displayFull}`;

    return <div className={styles.mainContainer}>
        {emails.length > 0 && (<ul className={classContentEmailList} >
                {filteredEmailList.map((email) => { 
                    let formattedDateTime = dateFormatter(email.date);
                    return <li key={email.id} onClick={() => handleEmailopen({...email, date: formattedDateTime})}>
                        <EmailListItem 
                        emailData={{...email, date: formattedDateTime}} selectedEmail={selectedEmail} 
                        showEmailBody={showEmailBody}
                        />
                    </li>
                })}
            </ul>
        )}   
        { showEmailBody && <EmailBody emailData={selectedEmail} showEmailBody={showEmailBody}/>}
    </div>
}
