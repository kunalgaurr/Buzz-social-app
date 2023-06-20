import React from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { FriendList } from '../../Components/FriendList/FriendList';
import { ChatBox } from '../../Components/ChatBox/ChatBox';
import { Topbar } from '../../Components/Topbar/Topbar';
import './UserChat.css';

export const UserChat = () => {
  return (
    <Wrapper>
      <Topbar />
      <div id="user-chat-container">
        <ChatBox />
        <FriendList />
      </div>
    </Wrapper>
  );
};
