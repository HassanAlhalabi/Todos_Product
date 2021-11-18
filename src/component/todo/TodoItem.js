import React from 'react';
import { DeleteRounded } from '@material-ui/icons';
import { EditRounded } from '@material-ui/icons';
import { Close } from '@material-ui/icons';
import { Check } from '@material-ui/icons';
import { Button } from 'antd';

const TodoItem = ({ todoProps, todoAction}) => {

    let todoStyle = todoProps.isActive === true ? 
    {
        color: '#444',
        backgroundColor: '#FFF' ,
        border: '1px solid #ccc'
    } :
        todoProps.isCompleted === true ?
        {
            color: '#FFF',
            backgroundColor: '#22EA2D' 
        } : {
            color: '#FFF',
            backgroundColor: '#EB3A37' 
        }     

    return( 
        <div className='todo-item' style={  todoStyle}>
            <div>
                <div className='todo-date'>
                    <p>{todoProps.date}</p>
                </div>
                <div className='todo-date'>
                    {todoProps.title}
                </div>
            </div>  
            <div className='todo-actions'>
                {
                    todoProps.isActive === true ?
                        <div className='actions-holder'>
                            <Button shape='circle'>
                                <DeleteRounded 
                                    className='red-btn'
                                    onClick={() => todoAction(todoProps.id,'delete')} />
                            </Button>
                            <EditRounded 
                                className='action-button' 
                                onClick={() => todoAction(todoProps.id,'edit')} />
                            <Close 
                                className='action-button'
                                onClick={() => todoAction(todoProps.id,'cancel')} />
                            <Check 
                                className='action-button' 
                                onClick={() => todoAction(todoProps.id,'setComplete')} />
                        </div>
                    :
                        <div className='actions-holder'>
                            <DeleteRounded className='action-button' onClick={() => todoAction(todoProps.id,'delete')} />
                        </div>
                }
            </div>   
        </div>
    )
}

export default TodoItem