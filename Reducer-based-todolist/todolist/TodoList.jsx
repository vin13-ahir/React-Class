import { useContext, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './todolist.css';
import DisplayTodo from "./DisplayTodo";
import { TodoContext } from "../context/TodoContext";

const TodoList = () => {

    const [inputvalue, setInputValue] = useState("");

    const {state, dispatch} = useContext(TodoContext);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const addTodo = () => {
        let newTodo = {
            id: uuidv4(),
            title: inputvalue,
            status: false,
        }
        /*setTodo([...todo, newTodo]);
        setInputValue("");*/
        dispatch({type: "ADDTODO", payload: newTodo});
        setInputValue("");
        console.log(state.todo);
    } 

    const inputRef = useRef('');

    const num = useMemo(() => state.todo.length, [state.todo]);
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
                                <DisplayTodo filterCriteria={false} />
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
                                <DisplayTodo filterCriteria={true} />
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