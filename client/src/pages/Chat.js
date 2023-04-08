import styles from './Chat.module.css';
import MessagesReceived from '../components/Messages';

const Chat = () => {
    return (
        <div className={styles.chatContainer}>
            <div>
                <MessagesReceived />
            </div>
        </div>
    );
};

export default Chat;