import React, { useEffect, useState } from 'react';
import QuantityProgressBar from './QuantityProgressBar';
// import ProductImage from '../imgs/product-img.png';
// import CarImage from '../imgs/car.png';
import ProductDescription from './ProductDescription';
import PrizeDescription from './PrizeDescription';
import Button from '@material-ui/core/Button';
import Favorite from '@material-ui/icons/Favorite';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/productsSlice';
 
const Product = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    },[dispatch]);

    const productsLoadingStatus = useSelector(state => state.products.status)
    const products = useSelector(state => state.products.products);
    console.log(productsLoadingStatus)
    console.log(products)

    return(

        <div className='products-main-holder'>
            { 
                productsLoadingStatus === 'loading' ? 'loading' :

                    products.map(product => 

                        <div className='product' key={product.id}>

                        <div className='quntity-sold-holder'>
                            <QuantityProgressBar total={product.product_quantity} sold={product.quantity_sold} />
                        </div>
                        <div className='product-price'>
                            AED {product.product_price}
                        </div>
                        <div className='product-buttons'>
                            <Button className='favorite-button'>
                                <Favorite fontSize='large'/>
                            </Button>
                            <Button  className='cart-button'>
                                <AddShoppingCart fontSize='large'/>
                            </Button>
                        </div>


                        <div className='product-desc-holder'>
                            <ProductDescription
                                image={product.product_id.image}
                                title={product.product_id.name}
                                desc={product.product_id.descriptionnp }
                            />
                        </div>    
                        <div className='prize-section'>
                            <PrizeDescription
                                image={product.prize_id.image}
                                title={product.prize_id.name}
                                desc={product.prize_id.descriptionnp }
                            />
                        </div>
                    </div>

                    )

            }
       </div>     
    )
}

export default Product;