import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Clipboard from 'clipboard';
import { Card, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './DisplayLink.css'



export default class DisplayLink extends Component {

  componentDidMount() {     
      const clipboard = new Clipboard(document.getElementById(this.props.id), {
          text: (trigger) => {
              return this.refs.snippet.innerText;
          }
      });        
    }

  render( props ) {
    

    return (
        <Row className = "display-link" >
          <Col md = { 10 } mdOffset = { 1 } xs = { 10 } xsOffset = { 1 }>
            <Card zDepth={2}>
                <CardText>
                  <a className="link" ref="snippet" href={ this.props.link }><strong>{ this.props.link }</strong></a>
                </CardText>
                <CardActions >
                  <RaisedButton className="button-center cop" id = { this.props.id } ref="button">Copy</RaisedButton>
                  <RaisedButton className="button-center" secondary = { true } onClick = { this.props.onRemove }>Delete</RaisedButton>
                </CardActions>
            </Card>
          </Col>
        </Row>
    );
  }
}

