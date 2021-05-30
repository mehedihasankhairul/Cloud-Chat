import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChat } from '../chatSlice';
import dataBase from '../Login/firebase';
import './SidebarChat.css'


function SidebarChat({ id, chatName }) {
    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);

    useEffect(() => {
        dataBase.collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setChatInfo(snapshot.docs.map((doc) => doc.data()))
            );

    }, [id]);

    return (
        <div onClick={() =>
            dispatch(
                setChat({
                    chatId: id,
                    chatName: chatName
                })
            )
        }
            className="sidebarChat"
        >
            <Avatar />
            <div className="sidebarChat_info">
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>

                <small>timestamp</small>

            </div>

        </div>
    );
};

export default SidebarChat;