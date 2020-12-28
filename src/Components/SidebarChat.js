import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import db from '../firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const creatChat = () => {
    const roomName = prompt('Please enter name for chat room');

    if (roomName) {
      // do some clever database stuff...
      db.collection('rooms').add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link
      to={`/rooms/${id}`}
      style={{
        textDecoration: 'none',
        color: 'black',
      }}>
      <SidebarChatDiv>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <ChatInfo>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </ChatInfo>
      </SidebarChatDiv>
    </Link>
  ) : (
    <SidebarChatDiv onClick={creatChat}>
      <h3>Add New Chat</h3>
    </SidebarChatDiv>
  );
}

export default SidebarChat;

const SidebarChatDiv = styled.div`
  display: flex;
  padding: 20px;
  cursor: pointer;
  border-bottom: 2px solid #f6f6f6;
  &:hover {
    background-color: #ebebeb;
  }
`;

const ChatInfo = styled.div`
  margin-left: 15px;
  & > h2 {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;
