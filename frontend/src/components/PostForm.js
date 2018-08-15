import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.section`
  color: #fff;
  width: 35rem;
`;

const Header = styled.header`
  border-bottom: 1px solid #000;
  padding: 1rem 1rem 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  font-size: 1.5rem;
  color: #444;
  cursor: pointer;
  padding: 0.8rem;
  width: 3rem;
  height: 3rem;
`;

const Content = styled.div`
  padding: 0.5rem 1rem 0;
`;

const Form = styled.form`
  padding: 1rem 0;
`;

const Tip = styled.p`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const FieldWrapper = styled.div`
  margin-bottom: 1rem;

  &.has-error {
    input,
    textarea,
    select {
      border: 1px solid #ff5370;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid transparent;
  background-color: transparent;
  font-size: 1rem;
  line-height: 2rem;
  color: #fff;

  &:disabled {
    color: #444;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  height: 2rem;
  line-height: 2rem;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid transparent;
  background-color: transparent;
  font-size: 1rem;
  line-height: 2rem;
  color: #fff;
`;

const Footer = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const ActionButton = styled.button`
  border: 1px solid #444;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-left: 1rem;

  &:disabled {
    color: #444;
    cursor: not-allowed;
  }

  > .svg-inline--fa {
    margin-right: 0.5rem;
  }
`;

class PostForm extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      author: PropTypes.string,
      body: PropTypes.string
    }),
    isEditing: PropTypes.bool
  };

  stopPropagation = e => {
    // fix to stop propagation after clicking on edit.
    // on /:categories, if you click on edit, it will open the modal.
    // if you click anywhere inside the modal, you're redirected to
    // post details page
    e.preventDefault();
    e.stopPropagation();
  };

  validateForm = values => {
    let errors = {};

    if (!values.title) {
      errors.title = 'Please inform the title of the post.';
    }

    if (!values.author) {
      errors.author = 'Please inform the author of the post.';
    }

    if (!values.category) {
      errors.category = 'Please select the post category.';
    }

    if (!values.body) {
      errors.body = 'Please inform the body of the post.';
    }

    return errors;
  };

  handleFormSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    this.props.onSubmit(values);
  };

  render() {
    const { onClose, initialValues, isEditing, categories } = this.props;
    const title = isEditing ? 'Edit comment' : 'New comment';

    return (
      <Wrapper onClick={this.stopPropagation}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </Header>
        <Content>
          <Formik initialValues={initialValues} validate={this.validateForm} onSubmit={this.handleFormSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, touched, errors, isValid }) => (
              <Form onSubmit={handleSubmit}>
                <Tip>Fields marked with * are required.</Tip>
                <FieldWrapper className={touched.title && errors.title ? 'has-error' : ''}>
                  <Label htmlFor="author">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    placeholder="Inform the title of your post."
                  />
                </FieldWrapper>
                <FieldWrapper className={touched.author && errors.author ? 'has-error' : ''}>
                  <Label htmlFor="author">Name *</Label>
                  <Input
                    id="author"
                    name="author"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                    disabled={isEditing}
                    placeholder="Inform your name."
                  />
                </FieldWrapper>
                <FieldWrapper className={touched.category && errors.category ? 'has-error' : ''}>
                  <Label htmlFor="author">Category *</Label>
                  <Select
                    id="category"
                    name="category"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                  >
                    <option value="">Select the category.</option>
                    {categories.map(cat => (
                      <option key={cat.path} value={cat.path}>
                        {cat.name}
                      </option>
                    ))}
                  </Select>
                </FieldWrapper>
                <FieldWrapper className={touched.body && errors.body ? 'has-error' : ''}>
                  <Label htmlFor="body">Post *</Label>
                  <TextArea
                    id="body"
                    name="body"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.body}
                    placeholder="Type the content of your post here"
                  />
                </FieldWrapper>
                <Footer>
                  <ActionButton type="button" onClick={onClose}>
                    Cancel
                  </ActionButton>
                  <ActionButton type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck} />
                    Submit
                  </ActionButton>
                </Footer>
              </Form>
            )}
          </Formik>
        </Content>
      </Wrapper>
    );
  }
}

PostForm = connect(state => ({
  categories: state.categories
}))(PostForm);

export default PostForm;
