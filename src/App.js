import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from './Initial/Home';
import Login from './Initial/Login';
import SignUp from './Initial/SignUp';
import {connect} from 'react-redux';
import AHeader from './Auth/AHeader';
import Post from './Initial/Post';
import AMisPost from './Auth/AMisPost';
import AEditar from './Auth/AEditar';
import ACrear from './Auth/ACrear';

const Header = ()=> {
  return(
    <nav>
      <Link to='/'> Home
      </Link>
      <Link to='/signup'> Sign Up
      </Link>
      <Link to='/login'> Login
      </Link>
    </nav>
  )
}


const App = (props)=> {
  if (props.login !=null) {
    return (
      <Router>
      <div>
        <AHeader/>
        <h2>Auth</h2>
        <Route exact path='/' component={Home}/>
        <Route exact path='/post/:id' component={Post}/>
        <Route path="/:user/posts" component={AMisPost}/>
        <Route path="/:user/crear" component={ACrear}/>
        <Route exact path="/:user/post/:id" component={Post}/>
        <Route path="/:user/post/:id/editar" component={AEditar}/>
      </div>
      </Router>
    );
   
  }
  else {
    return(
      <Router>
        <div>
          <Header/>
          <Route exact path='/' component={Home}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={Login}/>
          <Route exact path='/post/:id' component={Post}/>
          <h2>Dentro de App</h2>
        </div>
      </Router>
  
    )
  }
  
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch2: () => {
      
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
