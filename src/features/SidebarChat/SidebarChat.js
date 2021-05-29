import { Avatar } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setChat } from '../chatSlice';
import './SidebarChat.css'


function SidebarChat({ id, chatName }) {
    const dispatch = useDispatch();

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
                <p>Last message sent</p>
                <small>timestamp</small>

            </div>

        </div>
    );
};

export default SidebarChat;