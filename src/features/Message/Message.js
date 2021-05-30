import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import './Message.css'

const Message = ({
    id,
    contents: {timestamp, displayName, email, message, photo, uid}
}) => {
    const user = useSelector(selectUser)

    return (
        <div className={`message ${user.email === email && "message_sender"}`}>
            <Avatar className="message_photo" src={photo} />
            <p>{message}</p>
            <small>{new Date (timestamp?.toDate()).toLocaleString()}</small>
        </div>
    );
};

export default Message;