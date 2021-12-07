import React from 'react';
import { 
        CheckOutlined,
        DeleteFilled,
        EditFilled,
        CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface TodoInterface {
    id:          number;
    title:       string;
    date:        string;
    isCompleted: boolean;
    isActive:    boolean;
    isCanceled:  boolean;
}

const TodoItem: React.FC<{
    todoProps: TodoInterface,
    todoAction: (id: number,action: string) => undefined | null
}> = ({ todoProps, todoAction}) => {

    let todoStyle: {} = todoProps.isActive === true ? 
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
        <div className='todo-item' style={todoStyle}>
            <div>
                <div className='todo-date'>
                    <p>{todoProps.date}</p>
                </div>
                <div className='todo-title'>
                    <p>{todoProps.title}</p>
                </div>
            </div>  
            <div className='todo-actions'>
                {
                    todoProps.isActive === true ?
                        <div className='actions-holder'>
                            <Button 
                                shape='circle' 
                                type='primary'
                                icon={<DeleteFilled />}
                                className='action-button red-button'
                                onClick={() => todoAction(todoProps.id,'delete')}   >
                            </Button>
                            <Button 
                                shape='circle' 
                                type='primary'
                                icon={<EditFilled />}
                                className='action-button blue-button'
                                onClick={() => todoAction(todoProps.id,'edit')}  >
                            </Button>
                            <Button 
                                shape='circle' 
                                type='primary'
                                icon={<CloseOutlined />}
                                className='action-button red-button'
                                onClick={() => todoAction(todoProps.id,'cancel')}  >
                            </Button>
                            <Button 
                                shape='circle' 
                                type='primary'
                                icon={<CheckOutlined />}
                                className='action-button green-button'
                                onClick={() => todoAction(todoProps.id,'setComplete')}  >
                            </Button>
                        </div>
                    :
                        <div className='actions-holder'>
                            <Button 
                                shape='circle' 
                                type='primary'
                                icon={<DeleteFilled />}
                                className='action-button transparent-button-delete'
                                onClick={() => todoAction(todoProps.id,'delete')}  >
                            </Button>
                        </div>
                }
            </div>   
        </div>
    )
}

export default TodoItem