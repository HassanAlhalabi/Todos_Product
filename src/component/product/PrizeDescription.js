import React from 'react';

const PrizeDescription = ({image,title,desc}) => {
    return(
        <div className='product-desc'>
            <div className='product-image'>
                <img src={image}/>
            </div>
            <div>
                <p className='buy-text'>Get a Chance to Win</p>
                <h4 className='product-name'>{title}</h4>
                <p className='product-desc-text'>
                    {desc}
                </p>
            </div>
        </div>
    )
}

export default PrizeDescription;