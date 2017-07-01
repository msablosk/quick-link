import React, { Component } from 'react';
import * as Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid } from 'react-flexbox-grid';
import Header from './header/Header.js';
import NewLink from './new-link/NewLink.js';
import DisplayLink from './display-link/DisplayLink.js';
import './App.css';



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      links: [],
    }
  }
  
  componentWillMount = () => {
    Axios.get('http://localhost:8080/api')
      .then((response) => {
        this.setState({ 
          links: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onAddLink = (link) => {
    Axios.post('http://localhost:8080/api', {
      link: link
    })
      .then((response) => {
        console.log(response);
          this.state.links.unshift({
            link: link,
            _id: response.data._id
          });
          this.state.currentId++;
          this.setState(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onRemoveLink = (index, id) => {
    Axios.delete('http://localhost:8080/api/' + id)
      .then((response) => {
        console.log(response);
          this.state.links.splice(index, 1);
          this.setState(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header />
          <Grid>
            <NewLink onAdd = { this.onAddLink } />
            {
              this.state.links.map((item, index) => <DisplayLink link = { item.link } key = { item._id } id = { item._id } onRemove = { () => this.onRemoveLink(index, item._id) }/> )
            }
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
