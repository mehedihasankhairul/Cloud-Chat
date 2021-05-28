import React from 'react';
import Chat from '../features/Chat/Chat';
import Sidebar from '../features/Sidebar/Sidebar';
import './CloudChatHome.css'


const CloudChatHome = () => {
    return (
        <div className="cloudChat">

            {/*Here is sidebar*/}

            <Sidebar></Sidebar>

            {/*Here is Chat*/}

            <Chat></Chat>
        </div>


    );
};

export default CloudChatHome;