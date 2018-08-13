import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const orderByOptions = [{ value: 'timestamp', text: 'date' }, { value: 'voteScore', text: 'score' }];

const Wrapper = styled.div`
  display: inline-block;
  margin-left: 1rem;
`;

const Label = styled.label``;

const Select = styled.select`
  margin-left: 0.5rem;
`;

const OrderBy = ({ orderBy, setOrderBy }) => {
  return (
    <Wrapper>
      <Label>ordered by</Label>
      <Select onChange={e => setOrderBy(e.target.value)}>
        {orderByOptions.map(option => (
          <option key={option.value} value={option.value} selected={option.value === orderBy}>
            {option.text}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

OrderBy.propTypes = {
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired
};

export default OrderBy;
