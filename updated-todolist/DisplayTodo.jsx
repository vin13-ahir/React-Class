import { useState } from "react";

const DisplayTodo = ({todo, settingTodo, filterCriteria, toggleStatus}) => {
    const [editId, setEditId] = useState(null);
    const [isedited, setIsEdited] = useState(false);

    const removeTodo = (id) => {
        const updatedTodo = todo.filter(item => item.id !== id);
        settingTodo(updatedTodo);
    }
    
    const handleEdite = (id) => {
        setEditId(id);
        setIsEdited(true);
    }

    return(
        <div className="inner-wraper">
        {
            todo.filter((item) => item.status === filterCriteria)
            .map((item, index) => (
                <li key={item.id} className="todo-item">
                   <div className="li-item">
                    {editId === item.id ? (
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                            const updatedTodo = todo.map(todoItem =>
                            todoItem.id === item.id ? { ...todoItem, title: e.target.value } : todoItem
                            );
                            settingTodo(updatedTodo);
                            }}
                        />
                        ) : (
                        <div className="todo-item-title">
                            <span className="item-title">{item.title}</span>
                        </div>
                        )}
                        <div className="btn-group-wrapper">
                            <button
                            className="edited-btn"
                            onClick={
                            () => {
                            if (isedited && editId === item.id) {
                            setIsEdited(false);
                            setEditId(null);
                            } else {
                            handleEdite(item.id);
                            }}
                            }>
                            {
                                isedited && editId === item.id ? String.fromCodePoint(0x2715) : String.fromCodePoint(0x270E)
                            }
                            </button>
                            <button 
                                className="delete-btn"
                                onClick={() => removeTodo(item.id)}>{String.fromCodePoint(0x1F5D1)}
                            </button>
                            <button 
                                className="status-btn"
                                onClick={() => toggleStatus(item.id)}
                            >                                        
                                {
                                    item.status  ?  String.fromCodePoint(0x2B05) : String.fromCodePoint(0x27A1)
                                }
                            </button>
                        </div> 
                   </div>
                </li>
            ))
        }
        </div>
    )
}

export default DisplayTodo;