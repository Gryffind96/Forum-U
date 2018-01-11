import React from 'react';
import SignUpFormFinal from './SignUpFormFinal';
import axios from 'axios';
import {connect} from 'react-redux';
import {reset} from 'redux-form';

const SignUp = (props)=> {
  const funcionForma= (datos)=>{
    console.log(datos);
    axios.post('https://blog-api-u.herokuapp.com/users/',{
      user:{
        name:datos.username,
        email:datos.email,
        password: datos.password,
        password_confirmation:datos.password_confirmation
      }
    })
    .then(function (response) {
        console.log(response);
        props.success();
    }).catch(function (error) {
        console.log(error);
        props.error();
    })
  }
  return(
    <div>
      <h2>
        SignUp
      </h2>
      <SignUpFormFinal onSubmit={funcionForma} />
      <br/>
        {props.mensaje.mensaje}
      <br/>
    </div>
  )
}
const mapStateToProps = (state) =>{
  return {
     mensaje:state.userStatus
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
      success: ()=>{
        dispatch({
          type: 'USER_CREATED'
        });
        dispatch(reset('signupValidation'));// toma el nombre que se le dio de clave en form en el SignUPFORMFINAL
      },
      error: ()=> {
        dispatch({
          type: 'USER_ERROR'
        });
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp) ;
