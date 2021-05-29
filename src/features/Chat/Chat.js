import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Chat.css'
import MicNoneIcon from '@material-ui/icons/MicNone'
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from '../chatSlice';
import dataBase from '../Login/firebase';
import firebase from 'firebase';
import {selectUser} from '../userSlice'


const Chat = () => {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("")
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatId) {
            dataBase.collection('chats').doc(chatId).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }
    })

    const sendMessage = (e) => {

        e.preventDefault();
        dataBase.collection('chats').doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,

        });

        setInput("")
    }

    return (
        <div className="chat">

            {/*Chat header*/}
            <div className="chat_header">
                <h4>
                    To: <span className="channel_name">{chatName}</span>
                </h4>
                <strong>Details</strong>
            </div>


            {/*Chat message*/}
            <div className="chat_messages">
                {messages.map(({ id, data }) => (
                    <Message key={id} contents={data} />
                ))}
            </div>

            {/*chat input*/}
            <div className="chat_input">
                <form>
                    <input value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Cloud Chat"
                        type="text"
                    />
                    <button onClick={sendMessage}> Send Message</button>
                </form>

                <IconButton>
                    <MicNoneIcon className="chat_mic" />
                </IconButton>
            </div>
        </div>
    );
};

export default Chat;