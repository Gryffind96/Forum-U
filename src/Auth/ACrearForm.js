import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Requerido';
  } else if (values.title.length < 10) {
    errors.title = 'No debe ser menor de 10 caracteres';
  }else if (values.title.length > 30) {
    errors.title = 'No debe ser mayor de 30 caracteres';
  }

  if (!values.body) {
    errors.body = 'Requerido'
  } else if (values.body.length < 50 ) {
    errors.body = 'No debe ser menor de 50 caracteres';
  } else if (values.body.length > 300 ) {
    errors.body = 'No debe ser mayor de 300 caracteres';
  }
  
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const renderText = ({// para el text area del post 
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <textarea {...input} placeholder={label} type={type} >
        </textarea>
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

const ACrearForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Titulo"
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

export default reduxForm({
  form: 'ACrearForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
 
})(ACrearForm)
