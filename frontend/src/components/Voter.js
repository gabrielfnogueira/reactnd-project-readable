import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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
  const vote = (e, vote) => {
    e.preventDefault();
    e.stopPropagation();
    onVote(vote);
  };

  return (
    <Wrapper>
      <Button onClick={e => vote(e, 'upVote')}>
        <FontAwesomeIcon icon={faAngleUp} />
      </Button>
      <Value>{value}</Value>
      <Button onClick={e => vote(e, 'downVote')}>
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
