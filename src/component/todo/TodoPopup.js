import React from 'react';
import {Input} from 'antd';
import { Button } from 'antd';

const TodoPopup = ({title, addTodo, hidePopup, handleInput}) => {

    return(
        <div className='todo-popup'>
            <div className='popup-input'>
                <div>
                    <Input
                        type='text'
                        defaultValue={title}
                        placeholder='Type Any Task...'
                        onChange={(e) => handleInput(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        onClick={hidePopup} 
                        shape='round' 
                        type='ghost' 
                        danger
                        className='cancel-button'>
                            Cancel
                    </Button>
                    <Button onClick={addTodo} 
                            shape='round'
                            className='done-button'>
                        Done
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default TodoPopup;