import React, { Component } from 'react';
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const url = "mongodb://localhost:27017/movieQuotes";
const port = 4000;

class TodoApp extends Component {
  state = {
    inputValue: '',
    todos: [],
  }

  onType = (event) => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  saveToList = () => {
    this.setState({
      todos: [...this.state.todos, this.state.inputValue],
      inputValue: '',
    })
  }

  render () {
    return (
      <div>
        <input
          action="/getUser"
          method="post"
          className='todo-input'
          type='text'
          placeholder="  Enter any movies and TV shows"
          onChange={this.onType}
          value={this.state.inputValue}
        />
        <Button onClick={this.saveToList} text='Save to list' className='btn pink'/>
        <TodoList items={this.state.todos} />
      </div>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const TodoList = (props) => {
  const listItems = props.items.map((item) => {
    return <li>{item}</li>
  })
  return (
    <ol>
      {listItems}
    </ol>
  )
}

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/www/index.html');
});

app.post('/addQuotes', function(req, res){
  db.collection("quotes").insertOne(req.body, function(err, result){
    if (err) throw err;
    console.log("Saved");
    res.redirect('/');
  })
})

app.get('/getQuote', function(req, res){
  db.collection("quotes").find().toArray(function(err, result){
      if (err) throw err;
      res.send(result);
  });
});


export default TodoApp;
MongoClient.connect(url, function(err, client){
  if (err) throw err;
  console.log("Connection to DB Successful");
  db = client.db("movieQuotes");
})

app.listen(port, function() {
  console.log(`App Listening on Port ${port}`)
})
