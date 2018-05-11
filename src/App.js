import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
const apiKey = 'f3616c52238a4755b40f61f0e196719c';


class App extends Component {
  constructor(){
    super();
    this.state={
      news:[]
      
    }
  
  };

  componentDidMount() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`).then(response => {
      console.log("inside header user data", response.data.articles);
      this.setState({ news: response.data.articles });
      console.log(this.state.news);
    
    });
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {this.state.news.map((item,i)=>{
            return(
            <div className="article">
            <p> Author name: {item.author} </p>
            <p> Description: {item.description} </p>
            <p> title : {item.title} </p>
            <br />

           <a href= {item.url} > News URL </a>
           <br />
           <img src={item.urlToImage} alt="logo"/>
           
           </div>
            )
          })
          }
          </div>
      </div>
    );
  }
}

export default App;
