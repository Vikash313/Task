import React, { useState, useEffect} from 'react'
import TodoList from './TodoList'
import { useHistory } from 'react-router';

const getLocaleItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const  Todo = () => {

    const [ todoItems, setTodoItems ] = useState("");
    const [ items, setItems ] = useState(getLocaleItems());
    const [togglebtn, setTogglebtn] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const history = useHistory()
    
 // add todo
    const submitHandlers = () => {
        if(!todoItems){
           alert('plz fill the data');
        } else if (todoItems && !togglebtn){
             setItems(
                 items.map((elem) => {
                     if(elem.id === isEditItem){
                 return{...elem, name:todoItems}
                     }
                     return elem
                 })
             )
             setTogglebtn(true);
             setTodoItems("");
             setIsEditItem(null);
        }
            else {
            const allInputData = {id: new Date().getTime().toString(), name:todoItems}
            setItems([...items, allInputData]);
            setTodoItems(""); 
        }
    }
  

    //add data on Key Press
    const handleKeypress = e => {
      if (e.charCode === 13) {
        submitHandlers();
      }
    };

    // delete todo
    const deleteItems = (index) => {
        setItems((oldItems) => {
            return oldItems.filter((arrElem) => {
                return index !== arrElem.id;
            })
        })
    }

    // move to table
    const nextPage = () => {
        history.push("tableData");
    }

    // Edit todo
    const editItem = (id) => {
         let newEditItem = items.find((elem) => {
             return elem.id === id;
         })
         console.log("newEditItem", newEditItem);
         setTogglebtn(false);
         setTodoItems(newEditItem.name);
         setIsEditItem(id);
    }


// store data to locale storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
      }, [items])


    return (
        <div>
            <h1 className="fs-1" >Todo</h1>
                <input type="text" placeholder="Enter your list" onKeyPress={(e) => handleKeypress(e)} onChange={(e) => setTodoItems(e.target.value)} value={todoItems}/>
               {togglebtn ?  <button style={{marginLeft:"10px", marginBottom:"7px"}} type="submit" className="btn btn-success" onClick={submitHandlers}>Add todo</button> : <button style={{marginLeft:"10px", marginBottom:"7px"}} type="submit" className="btn btn-warning" onClick={submitHandlers}>Update todo</button> }
              <ol>      
                  {items.map((itemval) => {
                   return <TodoList 
                   id={itemval.id} 
                   key={itemval.id} value={itemval.name} 
                       onSelect={deleteItems}
                       editItem={editItem}
                   />
                  })}
              </ol>
              <button className="btn btn-primary" onClick={nextPage}>Go to Table</button>
        </div>
    )
}

export default Todo