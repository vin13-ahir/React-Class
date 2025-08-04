import { Component } from "react";
import "./TodoList.css";
import { v4 as uuidv4 } from 'uuid';

class TodoList extends Component {
    state= {
        inputValue: "",
        todo: [],
        isedited: false,
        editId: null
    }

    addTodo = () => {
        const newTodo = {
            id: uuidv4(),
            title: this.state.inputValue,
            status: false
        }

        this.setState({
            todo: [...this.state.todo, newTodo],
            inputValue: ""
        })
    }

    removeTodo = (id) => {
        this.setState({
            todo: this.state.todo.filter((i) => id !== i.id)
        })
    }

    render(){
        return(
            <>
                <h1>Todo List App</h1>
                 <div className="todo-wrapper">
                     <div className="input-wrapper">
                        <input className="todo-input" 
                        value={this.state.inputValue}
                        onChange={(e) => this.setState({
                            inputValue: e.target.value
                        })}
                        placeholder="Enter your ToDo ..." />
                        <button className="add-btn"
                        onClick={this.addTodo}
                        >Add</button>
                    </div>
                    <h2 className="item-heading">To do List Items</h2>
                     <div className="list-wrapper">
                        <div className="list-container">
                            <div className="list-left">
                                <div className="left-heading">
                                    <h2 className="heading-left">ToDo Items</h2>
                                </div>
                                <div className="left-side box">
                                <ul className="todo-item-list-left">
                                    {
                                        this.state.todo.map((item, i) => (
                                            <li key={item.id} className="todo-item">
                                                 <div className="li-item">
                                                    {
                                                        this.state.editId === item.id ? (
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => {
                                                                const updatedTodo = this.state.todo.map(todoItem =>
                                                                todoItem.id === item.id ? { ...todoItem, title: e.target.value } : todoItem
                                                                );
                                                                this.setState({
                                                                    todo: updatedTodo
                                                                })
                                                                }}
                                                            />
                                                        ) : (
                                                             <div className="todo-item-title">
                                                                <span className="item-title">{item.title}</span>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="btn-group-wrapper">
                                                        <button
                                                        className="edited-btn"
                                                        onClick={
                                                            () => {
                                                                if(this.state.isedited && this.state.editId === item.id) 
                                                                {
                                                                    this.setState({
                                                                        isedited: false,
                                                                        editId: null
                                                                    })
                                                                } else {
                                                                    this.setState({
                                                                        isedited: true,
                                                                        editId: item.id
                                                                    }, () => console.log(this.state.editId))
                                                                }
                                                            }
                                                        }
                                                        >
                                                        {
                                                            this.state.isedited && this.state.editId === item.id ? String.fromCodePoint(0x2715) : String.fromCodePoint(0x270E)
                                                        }
                                                        </button>
                                                        <button 
                                                        className="delete-btn"
                                                        onClick={() => this.removeTodo(item.id)}
                                                        >{String.fromCodePoint(0x1F5D1)}
                                                        </button>
                                                    </div>
                                                 </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            </div>
                        </div>
                     </div>
                 </div>
            </>
        )
    }
}

export default TodoList;