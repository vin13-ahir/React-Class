import { act, createContext, useReducer } from "react";

export const TodoContext = createContext();

const initialState = {
    todo: []
};

function reducer(state, action){
    switch(action.type){
        case "ADDTODO":
            return {
                todo: [...state.todo, action.payload]
            }
        case "REMOVETODO":
            return{
                todo: action.payload
            }
        case "EDITTODO":
            return{
                todo: action.payload
            }
        case "TOGGLESTATUS":
            return{
                todo: action.payload
            }
        default:
            {
                return state;
            }
    }
  
}

export function TodoProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <TodoContext.Provider value={{state, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}