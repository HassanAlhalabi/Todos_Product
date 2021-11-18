import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoPopup from './TodoPopup';
import EditPopup from './EditPopup';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, deleteTodo } from '../../redux/todosSlice';
import { AddRounded } from '@material-ui/icons';
import { Alert } from 'antd';

const Todo = () => {

    const todos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();

    const [titleInput,setTitleInput] = useState(null);
    const [addPopup,setPopup]        = useState(false);
    const [editPopup,setEditPopup]   = useState(false);
    const [editId,setEditId]         = useState(null);

    const showPopup =       () => setPopup(true);
    const showEditPopup =   () => setEditPopup(true);
    const hidePopup =       () => setPopup(false);
    const hideEditPopup =   () => {
        setEditPopup(false);
        setTitleInput(null)
    } 

    const handleInput = title => setTitleInput(title);

    const addNewTodo = () => {
        let error = null;
        if(titleInput === '' || titleInput === null){
            error = true
        }
        if(error === null) {
            setTitleInput(null);
            let currentDate = new Date();
            const newTodo = {
                    id: Math.round(Math.random()*1000000)+'',
                    title: titleInput,
                    date: currentDate+'',
                    isCompleted: false,
                    isActive: true,
                    isCanceled: false,
                }
            dispatch(addTodo(newTodo));
            hidePopup();
        }
    };

    const updateTodos = () => {
        let error = null;
        if(titleInput === '' || titleInput === null){
            error = true
        }
        if(error === null) {
            setTitleInput(null);
            const newTodos = todos.map(todo => {
                if(todo.id === editId) {
                    return {
                        ...todo,
                        title: titleInput
                    }
                }
                return todo
            });
            dispatch(updateTodo(newTodos))
            hideEditPopup();
        }
    }

    const todoAction = (id,action) => {

        switch(action) {
            case 'delete':
                const newTodosDelete = todos.filter(todo => todo.id !== id);
                dispatch(deleteTodo(newTodosDelete))
                break;
            case 'edit':
                showEditPopup();
                setEditId(id);
                setTitleInput(todos.filter(todo => todo.id === id)[0].title);
                break;
            case 'cancel':
                const newTodosCancel = todos.map(todo => {
                        if(todo.id === id) {
                            return {
                                ...todo,
                                isCanceled: true,
                                isActive: false,
                                isCompleted: false
                            }
                        }
                        return todo
                    });
                dispatch(updateTodo(newTodosCancel));
                break;
            case 'setComplete':
                const newTodosComplete = todos.map(todo => {
                    if(todo.id === id) {
                        return {
                            ...todo,
                            isCanceled: false,
                            isActive: false,
                            isCompleted: true
                        }
                    }
                    return todo
                });
                dispatch(updateTodo(newTodosComplete));
                break;
            default:
                return null
        }
    } 


    return (
        <div>
            <h1 className='todo-header'>Todo List</h1>
            <div className='todo-list-holder'>
                {
                    todos.length === 0 ? 
                        <Alert description='No Todos in the List' type='info'/>
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
                />
            }
            {
                editPopup && 
                <EditPopup 
                    title={titleInput} 
                    hideEditPopup={hideEditPopup}
                    updateTodo={updateTodos}
                    handleInput={handleInput}
                />
            }
        </div>
    )
}

export default Todo;