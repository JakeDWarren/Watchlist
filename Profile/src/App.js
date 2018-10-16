import React, { Component } from 'react';

class App extends Component {

  state = {

    value:'',
    todos: [
      {task: 'Do list', done: true}
    ]



  }

  render () {
    return (
      <div>
        <input
          type = 'text'
          placeholder = 'type here'
          onChange={this.onChange}
          value={this.state.value}
          />
          <button onClick={this.state.savetoList}> Save item</button>
          <TodoList todos={this.state.todos}/>
      </div>
    )
  }

  onChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      value:event.target.value,
    })
  }

  savetoList = () => {
    this.setState({
      todos: [...this.state.todos, this.state.value],
      value: '',
    })

  }

}

const TodoList = (props) => {
  const tasks = props.todos.map(item => <TodoItem task={item.task} done={item.done} />);
  return (
    <ul>
    {props.items}
    </ul>
  )
}

const TodoItem = (props) => {
  return (
    <li>
    <input type = 'checkbox' defaultChecked={props.done} /> {props.task}
    </li>
  );
}

export default App;
