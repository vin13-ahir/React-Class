import { useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './todolist.css';
import DisplayTodo from "./DisplayTodo";

const TodoList = () => {

    const [inputvalue, setInputValue] = useState("");
    const [todo, setTodo] = useState([]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const addTodo = () => {
        let newTodo = {
            id: uuidv4(),
            title: inputvalue,
            status: false,
        }
        setTodo([...todo, newTodo]);
        setInputValue("");
    } 

    const settingTodo = (updatedTodo) => {
        setTodo(updatedTodo);
    }

    const toggleStatus = (id) => {
       // console.log(id);
       /* setTodo((prevTodo) => prevTodo.map((todo) =>
            todo.id === id ? {...todo, status: !todo.status} : todo)
        )*/
       const refinedTodo = todo.map((item) => item.id === id ? {...item, status: !item.status} : item);
       console.log(refinedTodo);
       setTodo(refinedTodo);
    }

    const inputRef = useRef('');

    const num = useMemo(() => todo.length, [todo]);
    console.log(num);

    return(<>
        <div className="todo-wrapper">
            <div className="input-wrapper">
                <input className="todo-input" ref={inputRef} placeholder="Enter your ToDo ..." value={inputvalue} onChange={handleChange}/>
                <button className="add-btn" onClick={addTodo}>Add</button>
            </div>

            <h2 className="item-heading">To do List Items</h2>

            <div className="list-wrapper">
                <div className="list-container">
                    <div className="list-left">
                        <div className="left-heading">
                             <h2 className="heading-left">Pending ToDo's</h2>
                        </div>
                        <div className="left-side box">
                            <ul className="todo-item-list-left">
                            {
                                <DisplayTodo todo={todo} settingTodo={settingTodo} filterCriteria={false} toggleStatus={toggleStatus} />
                            }
                            </ul>
                        </div>
                    </div>
                    <div className="list-right">
                        <div className="right-heading">
                            <h2 className="heading-right">Completed ToDo's</h2>
                        </div>
                       <div className="right-side box">
                         <ul className="todo-item-list-right">
                            {
                                <DisplayTodo todo={todo} settingTodo={settingTodo} filterCriteria={true} toggleStatus={toggleStatus} />
                            }
                        </ul>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default TodoList;