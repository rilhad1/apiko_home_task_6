import React from 'react';
import styled from 'styled-components';

import AnswersList from '../AnswersList/Container';
import NewAnswer from '../NewAnswer/Container';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


const Title = styled.h1``;


const Description = styled.div`
  font-size: 12pt;
  margin: 10px;
  padding: 15px 0;
`;

const SortAnswers = styled.div`
  display: flex;
  flex: 1;
  padding-top: 20px;
`;

const SortByDropdown = styled.select`
  border-style: none;
  flex-basis: 15%;
  padding: 0 10px;
  font-size: 14pt;
  background: #fff;
`;


const QuestionPage = ({ question, author, setSorting, dispatch, sortBy }) => (
  <Wrapper>
    <Title>{question.title}</Title>

    <div>By: <strong>{author.profile.fullName}</strong></div>
    
    <SortAnswers>
      <h3>Sort answers : </h3>
      <SortByDropdown value = {sortBy} onChange = {setSorting}>
          <option value = "createdAt"> by date</option>
          <option value = "best"> best </option>
          <option value = "worst"> worst  </option>
      </SortByDropdown>
    </SortAnswers>
    
    <Description>{question.description}</Description>

    <AnswersList />

    <NewAnswer />
  </Wrapper>
);


export default QuestionPage;
