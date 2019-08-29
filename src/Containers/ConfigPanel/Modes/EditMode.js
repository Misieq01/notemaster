import React,{useState} from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import ColorPicker from '../../../Components/ColorPicker';

const Container = styled.div`
  height: 100vh;
  width: 20vw;
  background: #eeeeee;
  float: right;
  position: fixed;
  right: 0;
  top: 0;
  margin: auto;
  z-index: 1000;
  border-left: 2px solid #4a89ff;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 3%;
  background: #eeeeee;
  float: right;
  border-left: 2px solid #4a89ff;
`;

const Button = styled.div`
  background: ${props => props.background || "inherit"}
  color: ${props => props.fontColor || "black"}
  width: 100%;
  height: 60px;
  font-size: 25px;
  padding 10px;
  text-align: center;
  line-height: 60px;
  cursor:pointer;
  border-bottom: 1px solid rgba(74, 137, 255,0.5);
  transition: all 0.2s ease-in-out;
  :hover{
    font-size: 28px;
    border-bottom: 2px solid #4a89ff;
  }
`;

const EditMode = props => {

const [colorPickerDisplay, setColorDisplayPicker] = useState(false);

  const DeleteHandler = () => {
    props.Delete();
    props.Close();
    props.IdRefresh();
  };

  const CopyHandler = () =>{
    props.Copy();
    props.Close();
    props.IdRefresh();
  }

  return (
    <div>
      <Wrapper />
      <Container>
        {props.editId !== "none" ? (
          <Button onClick={DeleteHandler}>Delete</Button>
        ) : null}
        {props.editId !== "none" ? <Button onClick={CopyHandler}>Copy</Button> : null}
        <Button onClick={()=>setColorDisplayPicker(true)}> Change Color</Button>
        {colorPickerDisplay ? <ColorPicker Close={()=>setColorDisplayPicker(false)}/> : null}
        <Button>Add Label</Button>
        <Button onClick={props.Close}>Cancel</Button>
      </Container>
    </div>
  );
};

const mapPropsToState = state => {
  return {
    editId: state.editId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Close: () =>
      dispatch({
        type: "EDIT_MODE_CHANGER",
        editMode: false,
        editType: "",
        editId: "none"
      }),
    Delete: () => dispatch({ type: "DELETE_NOTE_DATA" }),
    IdRefresh: () => dispatch({ type: "ID_REFRESH" }),
    Copy: () => dispatch({ type: "COPY_NOTE" }),
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(EditMode);
