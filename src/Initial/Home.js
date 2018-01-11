import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Pagination from '../Pagination';
import {Link} from 'react-router-dom';

class Home extends Component {

   // se ejecuta una vez ideal para peticiones axios
    componentDidMount(){
      this.props.dispatch1(this.props.pagination.page);
    }
    // se ejecuta antes de estar desabilitado en el dom
    componentWillUnmount(){
      this.props.clear();
    }
    
    //
    componentWillReceiveProps(next_props){
        if(next_props.pagination.page !== this.props.pagination.page){
          console.log(next_props.pagination.page);
          console.log(this.props.pagination.page);
          this.props.dispatch1(next_props.pagination.page);
        }
    }

    allPosts = ()=>{
        
      const Posts = this.props.allPosts.map((post)=>{ 
        if ((this.props.login) && this.props.login.id == post.user_id) {// en caso de que sean mis post creados
          return(
            <Link to={`/${post.user_id}/post/${post.id}`} key={post.id} >
              <p key={post.id}>
                {post.title}
                <br/>
              </p>
            </Link>
          )
        }
        else{ // para los que no son mis posts creados por mi
          return (
            <Link to={`/post/${post.id}`} key={post.id}>
            <p key={post.id}>
              {post.title}
            </p>
            </Link>
          )
        }
        
      });
      return Posts;
    }

    render(){
     // this.allPosts();
      return (
        <div>
          <h2>
            HOME
          </h2>
          <Pagination/>
          { this.allPosts()}
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    allPosts: state.allPosts,
    login:state.login,
    pagination:state.pagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch1: (pagina) => {
      
      axios.get(`https://blog-api-u.herokuapp.com/v1/posts?page=${pagina}`)
      .then(function(response){
        console.log(response);
        dispatch({
          type: "DATA_LOADED",
          data: response.data
        });
      })
      .catch(function(error){
        console.log(error);
      })
    },
    clear: ()=> {
      dispatch({
        type:"CLEAR_DATA"
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
