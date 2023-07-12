import React from 'react'
import { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import './App.css'
import TodoCard from './TodoCard';

//THIS IS A CHANGE

const Main = () => {

  // create a variable for todos
  const [data, setdata] = useState([]);

  // FUNC TO REFRESH THE TODO LIST
  const refresh = () => {
    fetch ('/todoAPI')
    .then((res) => {
      return res.json();
    }).then((res) => {
      setdata(res.todos);
    })
  }

  // FUNC THATS CALLED WHEN COMPONENT IS MOUNTED
  useEffect(() => {
    refresh()
  }, []);

  return (
      <div className='body'>
        <div className='page-header-container'>
          <h1 className='page-header'>My Todos</h1>
        </div>
        <TodoInput refresh={refresh} />
        {data.map(todo => {
          return (
            <TodoCard refresh={refresh} key={todo.id} todo={todo} />
          )
        })}  
      </div>    
  )
}
  
export default Main;