import React, { useEffect, useState } from 'react';
import QuantityProgressBar from './QuantityProgressBar';
import ProductImage from '../imgs/product-img.png';
import CarImage from '../imgs/car.png';
import ProductDescription from './ProductDescription';
import PrizeDescription from './PrizeDescription';
import { Button } from 'antd';
import Favorite from '@material-ui/icons/Favorite';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { Alert } from 'antd';
import LoadingSpinner from '../util/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, addToCart, removeFromCart } from '../../redux/productsSlice';
import { notification, Divider, Space } from 'antd'; 

const openNotification = () => {
    const args = {
      message: 'Hi',
      description:
        'You can not add any more products :(',
      duration: 0,
    };
    notification.open(args);
  };

const Product = () => {

    const [notfShow,setnotfShow] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    },[dispatch]);

    const productsLoadingStatus = useSelector(state => state.products.status)
    const products = useSelector(state => state.products.products);
    const cart = useSelector(state => state.products.cart);

    return(

        <div className='products-main-holder'>
            { 
                productsLoadingStatus === 'failed' ? 
                    
                    <div className='prodcuts-failed'>
                        <Alert type='warning' description='Failed to Get Products...Check your Internet Connection Connection' />
                    </div>

                    :

                    productsLoadingStatus === 'loading' ? <LoadingSpinner /> :

                        products.map(product => 

                            <div className='product' key={product.id}>

                                {

                                cart.filter(cartItem => cartItem.id === product.product_id.id).length === 0 ? null :
                                    cart.filter(cartItem => cartItem.id === product.product_id.id)[0].quantity === product.product_quantity ?
                                        setnotfShow(true)
                                    :
                                    null
                                }

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
                                 AED {product.product_price}
                             </div>
                            
                             <div className='product-buttons'>
                                 <Button className='favorite-button' icon={<Favorite fontSize='large'/>} />
                                 <Button  className='cart-button' icon={<AddShoppingCart fontSize='large'/>} />
                             </div>
                        
                             <div className='add-to-cart'>
                                <Button
                                    className='side-cart-button add-to-cart-button' 
                                    icon={<Add fontSize='large'/>} 
                                    onClick={() => dispatch(addToCart(product.product_id.id))}/>
                                <span className='quantity-in-cart'>
                                    {
                                        cart.filter(cartItem => cartItem.id === product.product_id.id).length === 0 ? 0 :
                                        cart.filter(cartItem => cartItem.id === product.product_id.id)[0].quantity
                        
                                    }
                                </span>
                                <Button 
                                    className='side-cart-button remove-from-cart-button' 
                                    icon={<Remove fontSize='large' />} 
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
                                            <Add fontSize='large'/>
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
                                            <Remove fontSize='large' />
                                    </button>
                                </div>

                                <div>
                                    <Button type='primary' shape='round' className='show-your-cart'>
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
                            </div>
                        </div>

                        )

            }



       </div>     
    )
}

export default Product;