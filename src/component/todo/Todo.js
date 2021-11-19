import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoPopup from './TodoPopup';
import EditPopup from './EditPopup';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, setCanceled, setCompleted } from '../../redux/todosSlice';
import { AddRounded } from '@material-ui/icons';
import { Alert } from 'antd';

const Todo = () => {

    const todos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();

    const [titleInput,setTitleInput]     = useState(null);
    const [addPopup,setPopup]            = useState(false);
    const [editPopup,setEditPopup]       = useState(false);
    const [editId,setEditId]             = useState(null);
    const [errorMessage,setErrorMessage] = useState(null)

    // Popups Handlers
    const showPopup =       () => setPopup(true);
    const showEditPopup =   () => setEditPopup(true);
    const hidePopup =       () => {
        setPopup(false);
        setTitleInput(null);
        setErrorMessage(null);
    }
    const hideEditPopup =   () => {
        setEditPopup(false);
        setTitleInput(null);
        setErrorMessage(null);
    } 

    const handleInput = title => setTitleInput(title);

    // Add New Todo Handler
    const addNewTodo = () => {
        let error = null;
        if(titleInput === '' || titleInput === null){
            error = true;
            setErrorMessage('Title is  Required !');
        }
        //If there is no errors
        if(error === null) {
            // Clear Error Message
            setErrorMessage(null);
            // Empty Title Input
            setTitleInput(null);
            dispatch(addTodo(titleInput));
            hidePopup();
        }
    };

    // Update Existing Todo Handler
    const updateTodos = () => {
        let error = null;
        if(titleInput === '' || titleInput === null){
            error = true;
            setErrorMessage('Title is  Required !');
        }
        //If there is no errors
        if(error === null) {
            // Clear Error Message
            setErrorMessage(null);
            // Empty Title Input
            setTitleInput(null);
            dispatch(updateTodo({titleInput,editId}))
            hideEditPopup();
        }
    }

    // Handle Actions Button 
    const todoAction = (id,action) => {

        switch(action) {
            case 'delete':
                dispatch(deleteTodo(id))
                break;
            case 'edit':
                showEditPopup();
                setEditId(id);
                setTitleInput(todos.filter(todo => todo.id === id)[0].title);
                break;
            case 'cancel':
                dispatch(setCanceled(id));
                break;
            case 'setComplete':
                dispatch(setCompleted(id));
                break;
            default:
                return null
        }
    
    } 


    return (
        <div className='todos-holder'>
            <h1 className='todo-header'>Todo List</h1>
            <div className='todo-list-holder'>
                {
                    todos.length === 0 ? 
                        <Alert className='text-center' description='No Todos in the List' type='info'/>
                    : 
                        todos.map(todo => 
                            <TodoItem key={todo.id} todoProps={todo} todoAction={todoAction}/>
                        )
                }
                <div className='new-totdo-btn'>
                    <button className='add-button' onClick={showPopup}>
                        <AddRounded />
                    </button>
                </div>
            </div>
            {
                addPopup && 
                <TodoPopup 
                    title={titleInput} 
                    hidePopup={hidePopup}
                    addTodo={addNewTodo}
                    handleInput={handleInput}
                    error={errorMessage}
                />
            }
            {
                editPopup && 
                <EditPopup 
                    title={titleInput} 
                    hideEditPopup={hideEditPopup}
                    updateTodo={updateTodos}
                    handleInput={handleInput}
                    error={errorMessage}
                />
            }
        </div>
    )
}

export default Todo;