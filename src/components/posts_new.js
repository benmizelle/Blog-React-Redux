import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/')
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                  label="Title of Post"
                  name="title"
                  component={this.renderField}
              />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title || values.title.length < 6) {
        errors.title = "Please enter a title that is at least 6 characters!";
    }

    if (!values.categories) {
        errors.categories = "Please enter a category."
    }
    if (!values.content) {
        errors.content = "Please enter content"
    }

    // If no errors, the form is fine to submit
    // If errors has any properties, redux-form assumes invalid form
    return errors;
}

// This is how to stack multiple helper functions with redux form
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null,{ createPost })(PostsNew)
);
