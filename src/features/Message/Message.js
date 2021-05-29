import { Avatar } from '@material-ui/core';
import React from 'react';
import './Message.css'

const Message = () => {
    return (
        <div className="message">
            <Avatar />
            <p>Message</p>
            <small>timestamp</small>
        </div>
    );
};

export default Message;