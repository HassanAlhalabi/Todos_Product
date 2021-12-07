import React from 'react';
import {Input} from 'antd';
import { Button } from 'antd';
import { Alert } from 'antd';

interface popupInterface {
    title: string,
    updateTodo: (event: React.MouseEvent) => void,
    hideEditPopup: (event: React.MouseEvent) => void,
    handleInput: Function,
    error: string | null
}

const EditPopup: React.FC<popupInterface> = ({
    title,
    updateTodo,
    hideEditPopup,
    handleInput, 
    error}
    ) => {

    return(
        <div className='todo-popup'>
            {error && <Alert message={error} className='error-message' type='error'/>}
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
                        onClick={hideEditPopup} 
                        shape='round' 
                        type='ghost' 
                        danger
                        className='cancel-button'>
                            Cancel
                    </Button>
                    <Button onClick={updateTodo} 
                            shape='round'
                            className='done-button'>
                        Done
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default EditPopup;