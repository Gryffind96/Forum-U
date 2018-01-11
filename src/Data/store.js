import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const allPostsReducer = (state=[], action) => {
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'DATA_LOADED':
      nuevoEstado = action.data;
      return nuevoEstado;
    case 'CLEAR_DATA':
      nuevoEstado =[];
      return nuevoEstado;
    default:
      return state;
  }
}

const userCreated = (state={}, action) =>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'USER_CREATED':
      nuevoEstado = {mensaje:"El usuario se creo con exito"};
      return nuevoEstado;
    case 'USER_ERROR':
    nuevoEstado = {mensaje:"El usuario no se creo con exito o los datos no son correctos"};
    return nuevoEstado;
    default:
      return {};
  }
}
const session = (state=null, action)=>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'LOGIN':
      nuevoEstado = action.data;
      return nuevoEstado;
    case 'LOGOUT':
      nuevoEstado = null;
      return nuevoEstado;
   /* case 'USER_ERROR':
      nuevoEstado = null;
      return nuevoEstado;*/
    default:
      return state;
  }
}

const pagination = (state={total:1, page:1}, action)=> {
   var nuevoEstado = Object.assign({},state);
   switch (action.type) {
    case 'SET_TOTAL':
      nuevoEstado.total = action.total;
      return nuevoEstado;
     case 'SET_CURRENT':
       nuevoEstado.page = action.page;
       return nuevoEstado;
     default:
       return state;
   }
}

const showPost = (state={},action)=>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'GET_POST':
      nuevoEstado=action.data;
      return nuevoEstado;
    case 'CLEAR_POST':
      nuevoEstado={};
      return nuevoEstado;
    default:
      return state;
  }
}

const errorPost= (state=null, action)=>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'ERROR_GET_POST':
      nuevoEstado = "ERROR AL CARGAR EL POST";
      return nuevoEstado;
  
    default:
      return null;
  }
}

const postCreado =(state=null, action)=>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'CREATED_':
      nuevoEstado ="EL POST SE CREO CON EXITO";
      return nuevoEstado;
    case 'CREATED_ERROR_':
      nuevoEstado ="ERROR_CREATED_";
      return nuevoEstado;
    default:
      return null;
  }
}

const personalPosts = (state=[], action)=> {
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'PERSONAL_POSTS':
      nuevoEstado = action.data;
      return nuevoEstado;
    case 'CLEAR_PERSONAL_POSTS':
      nuevoEstado = [];
      return nuevoEstado;
    default:
      return state;
  }
}

const errorPersonalPosts = (state=null,action)=>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'ERROR_PERSONAL_POSTS':
      nuevoEstado ="NO TIENES POSTS O HUVO UN ERROR AL CARGARLOS";
      return nuevoEstado;
    default:
      return null;
  }
}

const editPost = (state={},action)=>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'GET_POST':
      nuevoEstado=action.data;
      return nuevoEstado;
    case 'CLEAR_EDIT_POST':
      nuevoEstado={};
      return nuevoEstado;  
    default:
      return state;
  }
}

const mensajeEditar = (state=null, action)=>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'EDITED':
      nuevoEstado="EL POST FUE EDITADO CORRECTAMENTE"
      return nuevoEstado;
    case 'ERROR_EDITED':
    nuevoEstado="EL POST NO SE PUDO EDITAR"
    return nuevoEstado;
    default:
      return null;
  }
}

const mensajeEliminar = (state=null,action)=>{
  var nuevoEstado = Object.assign({},state);
  switch (action.type) {
    case 'ELIMINATED':
      nuevoEstado = "EL POST FUE ELIMINADO"
      return nuevoEstado;
    case 'ERROR_ELIMINATED':
      nuevoEstado="ERROR EL POST NO SE PUDO ELIMINAR";
      return nuevoEstado;
    default:
      return null;
  }
}
const reducer = combineReducers({
  allPosts: allPostsReducer,
  form: formReducer,
  userStatus:userCreated,
  pagination:pagination,
  login:session,
  showPost:showPost, 
  errorPost: errorPost,
  postCreado:postCreado,
  personalPosts:personalPosts,
  errorPersonalPosts:errorPersonalPosts,
  editPost:editPost,
  mensajeEditar:mensajeEditar,
  mensajeEliminar:mensajeEliminar
});

const store = createStore(reducer);

export default store;
