import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  console.log(user);

  useEffect(() => {
    db.collection('rooms').onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <SidebarDiv>
      {/* THE HEADER */}
      <Header>
        <Avatar src={user?.photoURL} />
        <HeaderRight>
          <IconButton>
            <DonutLargeIcon style={{ fontSize: '20px !important' }} />
          </IconButton>
          <IconButton>
            <ChatIcon style={{ fontSize: '20px !important' }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ fontSize: '20px !important' }} />
          </IconButton>
        </HeaderRight>
      </Header>

      {/* THE SEARCH */}
      <Search>
        <SearchContainer>
          <SearchIcon style={{ color: 'gray', padding: '10px' }} />
          <Input placeholder='Search or start new chat' type='text' />
        </SearchContainer>
      </Search>

      {/* THE CHATS */}
      <Chats>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </Chats>
    </SidebarDiv>
  );
}

export default Sidebar;

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.35;
`;

// The header side
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid lightgrey;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 10vw;
`;

//The search side
const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 39px;
  padding: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;
`;

const Input = styled.input`
  border: none;
  margin-left: 10px;
  outline: none;
`;

// The Chats side
const Chats = styled.div`
  flex: 1;
  background-color: white;
  overflow: scroll;
`;
