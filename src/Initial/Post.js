import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Post extends Component {

  componentDidMount(){
    this.props.dispatch1();
  }  
  
  componentWillUnmount(){
    this.props.clear();
  }

  editar = ()=>{
      console.log(this.props.routerProps);
      if (this.props.routerProps.match.params.user && this.props.error === null) {
          console.log("ESTE ES UN POST CREADO POR EL USUARIO");
          return(
              <div>
                <Link to={`/${this.props.post.user_id}/post/${this.props.post.id}/editar`}>
                    <h4>Editar</h4>
                </Link>
                <button onClick={()=>{
                    this.props.eliminar(this.props.edit,this.props.login)
                }}>Eliminar</button>
              </div>
          );
      }
  }
  render() {
    return (
      <div>
       <h2> Post </h2>
       <h2> {this.props.error} </h2>
       <h2> {this.props.mensaje} </h2>
       <h4> {this.props.post.title} </h4>
       <h4> {this.props.post.body} </h4>
          {this.editar()}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
    return {
        post: state.showPost,
        error:state.errorPost,
        routerProps:ownProps,
        edit:state.editPost, 
        login:state.login,
        mensaje:state.mensajeEliminar
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            console.log(ownProps.match.params.id);
            let idPost=parseInt(ownProps.match.params.id);
            axios.get(`https://blog-api-u.herokuapp.com/v1/posts/${idPost}`)
            .then(function (response) {
                console.log(response);
                dispatch({
                    type:'GET_POST',
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'ERROR_GET_POST'
                })
            })
            
        }, 
        clear: () =>{
            dispatch({type:'CLEAR_POST'});
        },
        eliminar:(post,login)=>{
            console.log(post.id);
            let config = {'Authorization': 'Bearer'+login.jwt};
            axios.delete(`https://blog-api-u.herokuapp.com/v1/posts/${post.id}`,{
                headers:config
            })
            .then(function (response) {
                console.log(response);
                dispatch({
                    type: 'ELIMINATED'
                })
                setTimeout(() => {
                    ownProps.history.push(`/${login.id}/posts`)
                }, 2000);
                
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'ERROR_ELIMINATED'
                })
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);
