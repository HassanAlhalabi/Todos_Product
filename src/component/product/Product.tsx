import React, { useEffect, useState } from 'react';
import QuantityProgressBar from './QuantityProgressBar';
import ProductDescription from './ProductDescription';
import PrizeDescription from './PrizeDescription';
import { Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { MinusOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import LoadingSpinner from '../util/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProducts, addToCart, removeFromCart, toggleIsFavorite } from '../../redux/productsSlice';
import { notification } from 'antd';
import Winthis from '../imgs/winthis.png';
import CartPopup from './CartPopup';

const openNotification = (message: string, description: string) => {
    const args = {
        message,
        description,
        duration: 3,
    };
    notification.open(args);
};

const Product: React.FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProducts());
    },[]);

    const [cartPopupOpen,setCartPopupOpen] = useState<boolean>(false);

    const productsLoadingStatus = useAppSelector(state => state.products.status)
    const products = useAppSelector(state => state.products.products);
    const cart = useAppSelector(state => state.products.cart);

    return(

        <div className='products-main-holder'>
            { cartPopupOpen && <CartPopup closeCartPopup={() => setCartPopupOpen(false)} />}
            { 
                productsLoadingStatus === 'failed' ? 
                    
                    <div className='prodcuts-failed'>
                        <Alert type='warning' message='Failed to Get Products...Check your Internet Connection Connection' />
                    </div>

                    :

                    productsLoadingStatus === 'loading' ? <LoadingSpinner /> :

                        products.map(product => 

                            <div className='product' key={product.id}>

                            <div className='quntity-sold-holder'>
                                <QuantityProgressBar 
                                    total={product.product_quantity} 
                                    sold={
                                        cart.filter(cartItem => cartItem.id === product.product_id.id).length === 0 ?
                                            product.quantity_sold
                                        :
                                            product.quantity_sold + cart.filter(cartItem => cartItem.id === product.product_id.id)[0].quantity
                                    } />
                            </div>
                        
                             <div className='product-price'>
                                 <p>AED {product.product_price}</p>
                             </div>
                            
                             <div className='product-buttons'>
                                 {
                                    product.isFavorite === 0 ?
                                       <Button 
                                            className='favorite-button' 
                                            icon={
                                                <HeartFilled  style={{fontSize: '32px'}}/>
                                            }
                                            onClick={() => {
                                                    dispatch(toggleIsFavorite(product.id));
                                                    openNotification('Done','Product Has Been Added To Favorites');
                                                }
                                            }
                                        />
                                    :
                                        <Button 
                                            className='favorite-button active' 
                                            icon={<HeartFilled style={{fontSize: '32px',color: 'pink'}}/>} 
                                            onClick={
                                                () => {
                                                    dispatch(toggleIsFavorite(product.id))
                                                    openNotification('Done','Product Has Been Removed From Favorites');
                                                }
                                            }    
                                        />
                                }
                                 
                                 <Button  
                                    className='cart-button' 
                                    icon={<ShoppingCartOutlined style={{fontSize: '32px'}}/>}
                                    onClick={() => setCartPopupOpen(true)} 
                                >   
                                </Button>
                             </div>
                        
                             <div className='add-to-cart'>
                                <Button
                                    className='side-cart-button add-to-cart-button' 
                                    icon={<PlusOutlined />} 
                                    onClick={() => dispatch(addToCart(product.product_id.id))}/>
                                <span className='quantity-in-cart'>
                                    {
                                        cart.filter(cartItem => cartItem.id === product.product_id.id).length === 0 ? 0 :
                                        cart.filter(cartItem => cartItem.id === product.product_id.id)[0].quantity
                        
                                    }
                                </span>
                                <Button 
                                    className='side-cart-button remove-from-cart-button' 
                                    icon={<MinusOutlined />} 
                                    onClick={() => dispatch(removeFromCart(product.product_id.id))}/>
                             </div>
                        
                             <div className='product-desc-holder'>
                                 <ProductDescription
                                    image={product.product_id.image}
                                    title={product.product_id.name}
                                    desc={product.product_id.description}
                                />
                            </div>  

                            <div className='add-to-cart-mobile'>
                                <div>
                                    <button
                                        className='side-cart-button-mobile add-to-cart-button-mobile'  
                                        onClick={() => dispatch(addToCart(product.product_id.id))}>
                                            <PlusOutlined />
                                        </button>
                                     <p className='quantity-in-cart-mobile'>
                                        {
                                            cart.filter(cartItem => cartItem.id === product.product_id.id).length === 0 ? 0 :
                                            cart.filter(cartItem => cartItem.id === product.product_id.id)[0].quantity
                            
                                        }
                                    </p>
                                    <button 
                                        className='side-cart-button-mobile remove-from-cart-button-mobile' 
                                        onClick={() => dispatch(removeFromCart(product.product_id.id))} >
                                            <MinusOutlined />
                                    </button>
                                </div>

                                <div>
                                    <Button 
                                        type='primary' 
                                        shape='round' 
                                        className='show-your-cart'
                                        onClick={() => setCartPopupOpen(true)}>
                                            Show Your Cart
                                    </Button>
                                </div>

                            </div>

                            <div className='prize-section'>
                                <PrizeDescription
                                    image={product.prize_id.image}
                                    title={product.prize_id.name}
                                    desc={product.prize_id.description}
                                />
                                <div className='winthis-image'>
                                        <img src={Winthis} />
                                </div>
                            </div>
                        </div>

                        )

            }

       </div>     
    )
}

export default Product;