import { faComments, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import Voter from './Voter';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr;
`;

const PostInfo = styled.div``;

const Author = styled.span`
  font-size: 0.85rem;
`;

const At = styled.span`
  font-size: 0.85rem;
`;

const Title = styled.h1`
  color: #fff;
  margin-top: 0.5rem;
`;

const Body = styled.div`
  margin: ${props => (props.noTitle ? `1rem 0` : '2rem 0')};
  color: #fff;
`;

const Button = styled.button`
  font-size: 0.85rem;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0.5rem;
  color: inherit;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const ActionButton = ({ action, children }) => {
  return (
    <Button
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();

        if (action) {
          action();
        }
      }}
    >
      {children}
    </Button>
  );
};

const Comments = ({ commentCount }) => {
  let label = 'no comments yet';

  if (commentCount) {
    label = `${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}`;
  }

  return (
    <Fragment>
      <FontAwesomeIcon icon={faComments} /> {label}
    </Fragment>
  );
};

const Info = ({ onVote, data, showBody, authorLabel }) => {
  if (!data) {
    return null;
  }

  const dateTime = `at ${new Date(data.timestamp).toLocaleDateString()} ${new Date(
    data.timestamp
  ).toLocaleTimeString()}`;

  return (
    <Wrapper>
      <Voter value={data.voteScore} onVote={onVote} />
      <PostInfo>
        {data.author && <Author>{authorLabel ? `${authorLabel}${data.author}` : data.author}</Author>}{' '}
        <At>{dateTime}</At>
        <Title>{data.title}</Title>
        {showBody && <Body noTitle>{data.body}</Body>}
        {data.commentCount !== null &&
          data.commentCount !== undefined && (
            <Button>
              <Comments commentCount={data.commentCount} />
            </Button>
          )}
        <ActionButton>
          <FontAwesomeIcon icon={faPencilAlt} /> edit
        </ActionButton>
        <ActionButton>
          <FontAwesomeIcon icon={faTrashAlt} /> delete
        </ActionButton>
      </PostInfo>
    </Wrapper>
  );
};

Info.propTypes = {
  onVote: PropTypes.func.isRequired,
  data: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number
  }),
  showBody: PropTypes.bool,
  authorLabel: PropTypes.string
};

export default Info;
