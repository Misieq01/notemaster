import React,{useState} from 'react';

import {connect} from 'react-redux';

import ApplicationCore from '../ApplicationCore'
import LoadingScreen from '../../Components/LoadingScreen';



const App = props => {

  console.log(props.data)

  const [isLoading,setIsLoading] = useState(true)

  window.onload = () =>{
    setIsLoading(false);
    props.LoadData();
  }

  window.onunload =()=>{
    localStorage.setItem('data',JSON.stringify(props.data));
  }

  return <div>
    {isLoading ? <LoadingScreen/> : <ApplicationCore/>}
  </div>
}

const mapStateToProps = state =>{
  return{
    data: state
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    LoadData: ()=>dispatch({type:'LOAD_DATA'}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
