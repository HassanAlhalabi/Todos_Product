import React from 'react';
import CartItem from './CartItem';
import { useAppSelector } from '../../redux/hooks';
import type { Product } from '../../redux/productsSlice';
import { Alert, Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

interface CartPopupInterface {
    closeCartPopup: () => void
}

const CartPopup: React.FC<CartPopupInterface> = ({closeCartPopup}) => {
    
    const products = useAppSelector(state => state.products.products);
    const cart = useAppSelector(state => state.products.cart);

    return(
        <div className='cart-popup'>
            <div className='cart-popup-inner'>
                <div className='cart-popup-close' onClick={() => closeCartPopup()}>
                    <CloseCircleFilled />
                </div>
                <div>
                    {
                        cart.length === 0 ?
                            <Alert message='No Products in Cart' /> : 
                            cart.map(cartItem => {
                                const product: Product = products.filter( product => product.product_id.id === cartItem.id)[0];
                                return <CartItem   
                                    productTitle={product.product_id.name}  
                                    productDescription={product.product_id.description}
                                    productImage={product.product_id.image}
                                    quantity={cartItem.quantity}
                                />
                            })
                    }
                </div>
                <div className='cart-popup-btns'>
                    <Button type="primary" size='large'>Checkout</Button>
                </div>
            </div>
        </div>    
    )

}

export default CartPopup;