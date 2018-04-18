import React from 'react';

import LinkButton from '../Buttons/LinkButton';
import TextInput from '../TextInput/Component';
import QuestionList from '../QuestionList/Container';
import styled from 'styled-components';


const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const PanelWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const AskButton = styled.span`
  flex-basis: 20%;
  align-items: center;
  font-size: 16pt;
`.withComponent(LinkButton);

const SortByDropdown = styled.select`
  flex-basis: 20%;
  padding: 0 10px;
  font-size: 16pt;
  background: #fff;
`;


const Dashboard = ({ search, sortBy, onChange, user }) => (
  <MainWrapper>
    <PanelWrapper>
      <TextInput
        placeholder="Search..."
        autoFocus
        value={search}
        onChange={onChange('search')}
      />

      <SortByDropdown value={sortBy} onChange={onChange('sortBy')}>
        <option value="createdAt">Time</option>
        <option value="title">Title</option>
      </SortByDropdown>

      {user && (
        <AskButton to="/question/new">
          Ask now!
        </AskButton>
      )}
    </PanelWrapper>

    <QuestionList search={search} sortBy={sortBy} />
  </MainWrapper>
);


export default Dashboard;
