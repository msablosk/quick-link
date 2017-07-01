import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './NewLink.css';

export default class NewLink extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      newLink: ""
    }
  }

  onLinkChange = (e) => {
    this.setState({newLink: e.target.value});
  }

  addHandler = (e) => {
    let el = document.getElementById('new-link');

    e.preventDefault();
    this.props.onAdd(this.state.newLink);
    this.setState({newLink: ""});

    el.value = "";
  }

  // submitHandler() {
    
  //   let newLink = document.getElementById('new-link');

  //   console.log(newLink.value);

  //   newLink.value = "";
  // }

  render() {
    return (
        <Row center="xs" className = "first-row">
          <Col md= { 9 } xs = { 10 } >
            <TextField 
              id = "new-link"
              hintText="Link"
              floatingLabelText="Link"
              fullWidth={true}
              onChange = { this.onLinkChange }
            />
          </Col>
          <Col md= { 1 } xs = { 12 }>
              <RaisedButton className="button-center" onClick = { this.addHandler }>Save</RaisedButton>
          </Col>
        </Row>
    );
  }
}

