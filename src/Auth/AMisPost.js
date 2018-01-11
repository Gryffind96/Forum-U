import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

class AMisPost extends Component {

  componentDidMount(){
    this.props.getPosts(this.props.login.id,this.props.login.jwt);
  }
  componentWillUnmount(){
    this.props.clear();
  }
  posts = () =>{
    let misPosts;
    if (this.props.posts.length !== 0) { // si mis post no estan vacios
       misPosts= this.props.posts.map((p)=>{
         return (
           <Link to={`/${p.user_id}/post/${p.id}`} key={p.id}><p> {p.title} </p>
           </Link>
         );
       });
    }
    else{
      misPosts = null;
    }
    return misPosts;
  }
  render() {
    return (
      <div>
        <h2>Mis post</h2>
        <Link to={`/${this.props.login.id}/crear`}>Crear post</Link>
        <h2>Lista post</h2>
        {this.posts()}
        {this.props.error}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    posts:state.personalPosts,
    error:state.errorPersonalPosts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (user_id,token) => {
      //dispatch(actionCreator)
      let config = {'Authorization': 'Bearer'+ token};
      axios.get(`https://blog-api-u.herokuapp.com/users/${user_id}/posts`,
      {
        headers:config
      })
      .then(function (response) {
          console.log(response);
          dispatch({
            type:'PERSONAL_POSTS',
            data: response.data.posts
          });
      })
      .catch(function (error) {
          console.log(error);
          dispatch({type:'ERROR_PERSONAL_POSTS'});
      })
    },
    clear:()=>{
      dispatch({
        type:'CLEAR_PERSONAL_POSTS'
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AMisPost)

