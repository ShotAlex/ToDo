import React, { useContext } from 'react'
import {Context} from './context'

const TodoItem = ({id, title, completed}) => {
  const {toggleTodo, removeTodo} = useContext(Context)

  const cls=['todo']

  if(completed) {
    cls.push('completed')
  }


  return (
    <li className={cls.join(' ')}>
      <label>

        <input 
          type="checkbox"
          completed={completed}
          onChange={ () => toggleTodo(id)}  
        />

        <span>{title}</span>

        <i 
        className="trash-bucket"
        onClick={ () => removeTodo(id)}
        >
          <img src="https://img.icons8.com/plasticine/100/000000/filled-trash.png" />
        </i>

      </label>
    </li>
  );
};

export default TodoItem;