import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  font-size: 0.85rem;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0.5rem;
  color: inherit;

  &:hover {
    color: #fff;
    cursor: pointer;
  }
`;

const Value = styled.p`
  color: #fff;
`;

const Voter = ({ value, onVote }) => {
  return (
    <Wrapper>
      <Button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onVote('upvote');
        }}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </Button>
      <Value>{value}</Value>
      <Button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onVote('downvote');
        }}
      >
        <FontAwesomeIcon icon={faAngleDown} />
      </Button>
    </Wrapper>
  );
};

Voter.propTypes = {
  value: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired
};

export default Voter;
