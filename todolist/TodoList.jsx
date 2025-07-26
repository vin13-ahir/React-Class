import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './todolist.css';

const TodoList = () => {

    const [inputvalue, setInputValue] = useState("");
    const [todo, setTodo] = useState([]);
    const [editId, setEditId] = useState(null);
    const [isedited, setIsEdited] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const addTodo = () => {
        let newTodo = {
            id: uuidv4(),
            title: inputvalue
        }
        setTodo([...todo, newTodo]);
        setInputValue("");
    } 

    const removeTodo = (id) => {
        const updatedTodo = todo.filter(item => item.id !== id);
        setTodo(updatedTodo);
    }
    
    const handleEdite = (id) => {
        setEditId(id);
        setIsEdited(true);
    }

    return(<>
        <div className="todo-wrapper">
            <div className="input-wrapper">
                <input className="todo-input" placeholder="Enter your ToDo ..." value={inputvalue} onChange={handleChange}/>
                <button className="add-btn" onClick={addTodo}>Add</button>
            </div>

            <div className="list-wrapper">
                <h2 className="item-heading">To do List Items</h2>
                <ul className="todo-item-list">
                    {
                        todo.map((item) => (
                            <li key={item.id} className="todo-item">
                                <input type="checkbox" className="status-input" 
                                value={isChecked}
                                onClick={() => {
                                    setIsChecked(!isChecked);}
                                }
                                />
                                {editId === item.id ? (
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => {
                                            const updatedTodo = todo.map(todoItem =>
                                                todoItem.id === item.id ? { ...todoItem, title: e.target.value } : todoItem
                                            );
                                            setTodo(updatedTodo);
                                        }}
                                    />
                                ) : (
                                    <span className={
                                        isChecked ? "line-through" : null
                                    }>{item.title}</span>
                                )}
                                <button
                                className="edited-btn"
                                onClick={
                                    () => {
                                        if (isedited && editId === item.id) {
                                            setIsEdited(false);
                                            setEditId(null);
                                        } else {
                                            handleEdite(item.id);
                                        }
                                    }
                                }>
                                {
                                    isedited && editId === item.id ? "Close" : "Edit"
                                }
                                </button>
                                <button 
                                className="delete-btn"
                                onClick={() => removeTodo(item.id)}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </>);
}

export default TodoList;