import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Requerido'
  } 
  else if (values.title.length < 10) {
    errors.title = 'No debe ser menor de 10 caracteres';
  }
  else if (values.title.length > 30) {
    errors.title = 'No debe ser mayor de 30 caracteres';
  }
  if (!values.body) {
    errors.body = 'Requerido'
  } else if(values.body.length < 50){
      errors.body = 'No debe ser menor de 50 caracteres';
  } else if(values.body.length > 300){
      errors.body = 'No debe ser mayor de 300 caracteres';
  }

  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>


const renderText = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <textarea {...input} placeholder={label} type={type} >
      </textarea>
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>

let AEditarForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="TÃ­tulo"
      />
      <Field name="body" type="text" component={renderText} label="Cuerpo" />
      
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

AEditarForm = reduxForm({
    form: 'AEditarForm', // a unique identifier for this form
    validate // <--- validation function given to redux-form
})(AEditarForm)

AEditarForm = connect(
    (state) => ({
        initialValues: {
            title: state.editPost.title,
            body: state.editPost.body
        }
    })
)(AEditarForm);

export default AEditarForm; 


