import React from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Alert } from 'antd';

interface TodoPopupInterface {
    title: string;
    addTodo: () => void;
    hidePopup: () => void;
    handleInput: (title: string) => void;
    error: string | null
}

const TodoPopup: React.FC<TodoPopupInterface> = ({title, addTodo, hidePopup, handleInput, error}) => {

    return(
        <div className='todo-popup'>
            {error && <Alert className='error-message' message={error} type='error'/>}
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