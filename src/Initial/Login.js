import React from 'react';
import LoginFormFinal from './LoginFormFinal';
import axios from 'axios';
import {connect} from 'react-redux';
const Login = (props)=> {

  const funcProps = () => {
    console.log(props.own);
  }

  const funcionForma = (datos) => {
    console.log(datos);
    axios.post('https://blog-api-u.herokuapp.com/v1/login',{
      login:{
        email:datos.email,
        password:datos.password
      }
    })
    .then(function (response) {
      console.log(response);
      props.login(response.data);
      props.history.push('/');
    })
    .catch(function (error) {
      console.log(error);
      props.errorLogin();
    })
  }
  return(
    <div>
      {funcProps()}
      <h2>
        Login
      </h2>
      <LoginFormFinal onSubmit={funcionForma} />
      <br/>
      {props.mensaje.mensaje}
      <br/>
    </div>
  )
}
const mapStateToProps = (state, ownProps) =>{
  return {
     mensaje:state.userStatus, 
     own: ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
      login: (datos)=>{
        dispatch({
          type: 'LOGIN',
          data:datos
        });
       
      },
      errorLogin: ()=> {
        dispatch({
          type: 'USER_ERROR'
        });
        //dispatch(reset('loginValidation'));// toma el nombre que se le dio de clave en form en el SignUPFORMFINAL
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Login);
