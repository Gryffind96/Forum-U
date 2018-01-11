import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class Pagination extends Component {

ComponentDidMount(){
  this.props.setTotal();
}
  paginas = ()=>{
    //console.log("NUMERO DE PAGINAS:"+this.props.pagina.total);
    var posts = this.props.pagina.total;
    var total = Math.ceil(posts/3);

    var init = 1;
    var end = 10;

    if (total <=10) {
      end = total;
    }
    else if (total > 10) {
      //FINAL DE PAGINA 
      if (this.props.pagina.page >= total -4) {
        init = total-9;
        end=total;
      }
      //INICIO
      else if (this.props.pagina.page -4 <= 0) {
        init=1;
        end=10;
      }
      //TODO LO DEMAS
      else {
        init=this.props.pagina.page-4;
        end=this.props.pagina.page+5;
      }
    }

    var lista = [];

    var barra = ()=> {
      for(var i=init; i<=end; i++){
        lista = lista.concat(
        <th key={i} onClick={(e)=>{
          this.props.setCurrent(parseInt(e.target.innerHTML));
        }}>{i}</th>);
      }
      return lista;
    }
    return (
      <div>
        <table>
          <tbody>
            <tr>
              {barra()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    return (
      <div>
        <h4>
           Pagination 
        </h4>
        {this.props.pagina.page}
        {this.paginas()} 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pagina:state.pagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setTotal: ()=>{
          axios.get('https://blog-api-u.herokuapp.com/v1/totalposts')
          .then(function(response){
              dispatch({type: 'SET_TOTAL', total: parseInt(response.data)})
              console.log(response);
          })
          .catch(function(error){
              console.log(error);
          })
      },
      setCurrent: (e) => {
          dispatch({type: 'SET_CURRENT', page: e});
      }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Pagination);