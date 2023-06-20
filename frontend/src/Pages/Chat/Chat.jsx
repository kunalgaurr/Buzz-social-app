import { FriendList } from '../../Components/FriendList/FriendList';
import { Topbar } from '../../Components/Topbar/Topbar';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import './Chat.css';

export const Chat = () => {
  return (
    <Wrapper>
      <Topbar />
      <div id="chat-container">
        <div id="chat-left">
          <img src="/assets/chat.png" alt="" id="chat-img" />
          <span id="chat-left-text">
            Click on any of the chats and start chatting.
          </span>
        </div>
        <div id="chat-right">
          <div id="chat-body">
            <FriendList />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
