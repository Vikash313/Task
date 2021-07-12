import React from 'react'

const TodoList = (props) => {

   const { value, onSelect, id, editItem} = props;


    return (
        <div>
            <li className="fs-3" >{value}
            <button style={{marginLeft:"10px"}} onClick={() => editItem(id)} className="btn btn-info">Edit</button>
            <button style={{marginLeft:"10px"}} onClick={() => onSelect(id)} className="btn btn-danger">X</button></li>
        </div>
    )
}

export default TodoList