import React from 'react';

interface CartItemInterface {
    productTitle: string,
    productDescription: string,
    productImage: string,
    quantity: number
}

const CartItem: React.FC<CartItemInterface> = ({
    productTitle,
    productDescription,
    productImage,
    quantity
}) => {
    return(
        <div className='cart-item'>
            <a href='#'>
                <div className='cart-item-holder'>
                    <div className='cart-item-image'>
                        <img src={productImage} />
                    </div>
                    <div className='cart-item-text'>
                        <h3>{productTitle}</h3>
                        <p>{productDescription}</p>
                    </div>
                    <div className='cart-item-quantity'>
                        <h3>{quantity}</h3>
                    </div>
                </div>
            </a>    
        </div>
    )
}

export default CartItem;