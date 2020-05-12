import React from 'react';
import styled from 'styled-components';
import Home from '../assets/home.svg';
import Paperplane from '../assets/paperplane.svg';
import Compass from '../assets/compass.svg';
import Heart from '../assets/heart.svg';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const Nav = styled.nav`
  height: 5rem;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InstaIcon = styled.i`
  font-size: 2.5rem;

  @media (max-width: 700px) {
    margin-left: 1rem;
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  height: 100%;
`;

const ClientLink = styled(NavLink)`
  text-decoration: none;
`;

const Icon = styled.img`
  height: 2rem;
`;

const NavLinks = styled.li`
  margin: 0 1rem;
`;

export default function Navbar() {
  return (
    <Nav>
      <Container>
        <InstaIcon className='fab fa-instagram' />
        <NavItems>
          <NavLinks>
            <ClientLink to='/'>
              <Icon src={Home} />
            </ClientLink>
          </NavLinks>
          <NavLinks>
            <ClientLink to='/discover'>
              <Icon src={Compass} />
            </ClientLink>
          </NavLinks>
          <NavLinks>
            <ClientLink to='/create/post'>
              <Icon src={Heart} />
            </ClientLink>
          </NavLinks>
          <NavLinks>
            <ClientLink to='/user'>
              <UserIcon />
            </ClientLink>
          </NavLinks>
        </NavItems>
      </Container>
    </Nav>
  );
}

const Avatar = styled.img`
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
`;

function UserIcon() {
  const { data, loading, error } = useQuery(gql`
    query getCurrentUser {
      getCurrentUser {
        profile {
          avatar
        }
      }
    }
  `);

  if (loading || !data || error) {
    return (
      <Avatar
        src={'https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif'}
      />
    );
  }

  if (data) {
    return <Avatar src={data.getCurrentUser.profile.avatar} />;
  }
}
