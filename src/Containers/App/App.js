import React,{useState} from 'react';

import {connect} from 'react-redux';

import ApplicationCore from '../ApplicationCore'
import LoadingScreen from '../../Components/LoadingScreen';



const App = props => {
  console.log('update')
  const [isLoading,setIsLoading] = useState(true)

  window.onload = () =>{
    setIsLoading(false);
    props.LoadData();
  }

  window.onunload =()=>{
    props.SaveData();
  }

  return <div>
    {isLoading ? <LoadingScreen/> : <ApplicationCore/>}
  </div>
}

const mapDispatchToProps = dispatch =>{
  return{
    LoadData: ()=>dispatch({type:'LOAD_DATA'}),
    SaveData :()=>dispatch({type:'SAVE_DATA'}),
  }
}

export default connect(null,mapDispatchToProps)(App);
