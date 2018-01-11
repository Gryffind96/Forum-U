import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const AHeader = (props)=>{
    return(
        <div>
        <Link to='/'> Home
        </Link>
        <Link to={`/${props.login.id}/posts`}> Mis Posts
        </Link>
        <Link to='/' onClick={props.logout}> Logout
        </Link>
        </div>    
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch({
                type:'LOGOUT'
            });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AHeader)
