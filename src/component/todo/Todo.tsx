import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoPopup from './TodoPopup';
import EditPopup from './EditPopup';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addTodo, updateTodo, deleteTodo, setCanceled, setCompleted } from '../../redux/todosSlice';
import { PlusOutlined } from '@ant-design/icons'
import { Alert, Button } from 'antd';

const Todo = () => {

    const todos = useAppSelector(state => state.todos.todos);
    const dispatch = useAppDispatch();

    const [titleInput,setTitleInput]     = useState<string>('');
    const [addPopup,setPopup]            = useState<boolean | null>(false);
    const [editPopup,setEditPopup]       = useState<boolean | null>(false);
    const [editId,setEditId]             = useState<number | null>(null);
    const [errorMessage,setErrorMessage] = useState<string | null>(null)

    // Popups Handlers
    const showPopup =       () => setPopup(true);
    const showEditPopup =   () => setEditPopup(true);
    const hidePopup =       () => {
        setPopup(false);
        setTitleInput('');
        setErrorMessage(null);
    }
    const hideEditPopup =   () => {
        setEditPopup(false);
        setTitleInput('');
        setErrorMessage(null);
    } 

    const handleInput = (title: string) => setTitleInput(title);

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
            setTitleInput('');
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
            setTitleInput('');
            dispatch(updateTodo({titleInput,editId}))
            hideEditPopup();
        }
    }

    // Handle Actions Button 
    const todoAction = (id: number, action: string) => {

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
                        <Alert className='text-center' message='No Todos in the List' type='info'/>
                    : 
                        todos.map(todo => 
                            <TodoItem key={todo.id} todoProps={todo} todoAction={todoAction}/>
                        )
                }
                <div className='new-totdo-btn'>
                    <Button
                        icon={<PlusOutlined />}
                        className='add-button' 
                        onClick={showPopup}>  
                    </Button>
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