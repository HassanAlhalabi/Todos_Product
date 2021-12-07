import React from 'react';

type ProductDesc = {
    image: string,
    title: string,
    desc: string,
}

const ProductDescription = ({image,title,desc}: ProductDesc) => {
    return(
        <div className='product-desc'>
            <div className='product-image'>
                <img src={image}/>
            </div>
            <div>
                <p className='buy-text'>Buy a</p>
                <h4 className='product-name'>{title}</h4>
                <p className='product-desc-text'>
                    {desc}
                </p>
            </div>
        </div>
    )
}

export default ProductDescription;