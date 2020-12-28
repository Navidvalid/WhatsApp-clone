import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';

function Chat() {
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  return (
    <ChatDiv>
      <ChatHeader>
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />

        <ChatHeaderInfo>
          <h3>{roomName}</h3>
          <p>
            Last seen{' '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </ChatHeaderInfo>

        <HeaderIcons>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </ChatHeader>

      <ChatBody>
        {messages.map((message) => (
          <p
            className={`chat-message ${
              message.name === user.displayName && 'chat-reciever'
            }`}>
            <span className='chat-name'>{message.name}</span>
            {message?.message}
            <span className='chat-time'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </ChatBody>

      <ChatFooter>
        <InsertEmoticonIcon style={{ padding: '10px', color: 'gray' }} />
        <Form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'>
            Send a message
          </button>
        </Form>
        <MicIcon style={{ padding: '10px', color: 'gray' }} />
      </ChatFooter>
    </ChatDiv>
  );
}

export default Chat;

const ChatDiv = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
`;

const ChatHeaderInfo = styled.div`
  flex: 1;
  padding-left: 20px;
  & > h3 {
    margin-bottom: 3px;
    font-weight: 500;
  }
  & > p {
    color: gray;
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 50px;
`;

const ChatBody = styled.div`
  flex: 1;
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-repeat: repeat;
  background-position: center;
  padding: 30px;
  overflow: scroll;
  & .chat-message {
    position: relative;
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    width: fit-content;
    background-color: #ffffff;
    margin-bottom: 30px;
  }
  & .chat-reciever {
    margin-left: auto;
    background-color: #dcf8c6;
  }
  & > p > .chat-name {
    position: absolute;
    top: -14px;
    font-weight: 700;
    font-size: xx-small;
  }
  & > p > .chat-time {
    margin-left: 10px;
    font-size: xx-small;
  }
`;

const ChatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgrey;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  & > input {
    flex: 1;
    border-radius: 30px;
    padding: 10px;
    border: none;
    outline: none;
  }
  & > button {
    display: none;
  }
`;
