import React from 'react';
import {Progress} from 'antd';

type QuantityProgressProps = {
    total: number,
    sold: number
}

const QuantityProgressBar = ({total,sold}: QuantityProgressProps) => {
    let percent = Math.floor((sold/total)*100);
    return(
        <div className='quntity-sold'>
            <Progress type='circle' percent={percent} className='progress-bar-style'/>
            <div className='quantities'>
                <span className='sold-number'>
                    {sold}
                </span>
                <span className='sold-text'>SOLD</span>
                <span className='out-of-text'>OUT OF</span>
                <span className='total-quantity'>{total}</span>
            </div>
        </div> 
    );
}

export default QuantityProgressBar;