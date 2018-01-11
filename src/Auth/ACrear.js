import React from 'react';
import ACrearForm from './ACrearForm';
import axios from 'axios';
import {connect} from 'react-redux';
import {reset} from 'redux-form';

const ACrear = (props)=>{

    const funcionForma = (data)=>{
        console.log(data);
        let config = {'Authorization': 'Bearer'+ props.login.jwt};
        axios.post('https://blog-api-u.herokuapp.com/v1/posts',
        {
            post:{
                title:data.title,
                body:data.body
            }
        },
        {
            headers: config
        })
        .then(function (response) {
            console.log(response);
            props.creado();
        })
        .catch(function (error) {
            console.log(error);
            props.error();
        })
    }
    return(
        <div>
            <h2>Crear Post</h2>
            <ACrearForm onSubmit={funcionForma} />
            <h4>{props.postCreado}</h4>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        postCreado:state.postCreado
    }
}
const  mapDispatchToProps = (dispatch) => {
    return {
        creado: () => {
            dispatch(reset('ACrearForm'));
            dispatch({
                type:'CREATED_'
            });
        },
        error:() => {
            dispatch({
                type:'ERROR_CREATED_'
            });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ACrear);
