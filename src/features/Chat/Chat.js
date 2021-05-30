import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Chat.css'
import MicNoneIcon from '@material-ui/icons/MicNone';
import ThumbButton from '@material-ui/icons/ThumbUpAlt';
import SendIcon from '@material-ui/icons/Send';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import PhotoLibrarySharpIcon from '@material-ui/icons/PhotoLibrarySharp';
import GifOutlinedIcon from '@material-ui/icons/GifOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from '../chatSlice';
import dataBase from '../Login/firebase';
import firebase from 'firebase';
import { selectUser } from '../userSlice';
import FlipMove from 'react-flip-move';


function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatId) {
            dataBase.collection("chats").doc(chatId).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ))
        }
    }, [chatId]);

    const sendMessage = (e) => {

        e.preventDefault();
        dataBase.collection('chats').doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
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
                <FlipMove>
                    {messages.map(({ id, data }) => (
                        <Message key={id} contents={data} />
                    ))}
                </FlipMove>

            </div>

            {/*chat input*/}
            <div className="chat_input">

                <IconButton>
                    <AttachFileSharpIcon className="input-ext" />
                </IconButton>
                <IconButton>
                    <EmojiObjectsOutlinedIcon className="input-ext" />
                </IconButton>
                <IconButton>
                    <PhotoLibrarySharpIcon className="input-ext" />
                </IconButton>
                <IconButton>
                    <GifOutlinedIcon className="input-ext" />
                </IconButton>

                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type Here"
                        type="text"
                    />
                    <button onClick={sendMessage}> Send Message</button>
                </form>

                <IconButton>
                    <SendIcon onClick={sendMessage} className="input-ext" />
                </IconButton>

                <IconButton>
                    <ThumbButton className="input-ext" />
                </IconButton>

                <IconButton>
                    <MicNoneIcon className="chat_mic" />
                </IconButton>
            </div>
        </div>
    );
};

export default Chat;