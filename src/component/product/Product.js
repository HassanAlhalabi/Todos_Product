import React, { useEffect } from 'react';
import QuantityProgressBar from './QuantityProgressBar';
import ProductImage from '../imgs/product-img.png';
import CarImage from '../imgs/car.png';
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

    const products = useSelector(state => state.products);


    return(

        <div>
            { products.status === 'loading' ? 'loading' :
                <div className='product'>

                    <div className='quntity-sold-holder'>
                        <QuantityProgressBar total={975} sold={382} />
                    </div>
                    <div className='product-price'>
                        AED 50.00
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
                            image={ProductImage}
                            title='Hoodie'
                            desc="lrem ipsim dolor sit amit contetsd erer lks sadas lrem ipsim dolor 
                            sit amit contetsd erer lks sadasddgjkadf jhkasdjh lsjdf hjkjashdf
                            hjlasdfh hjfdara fh,sdfhf huealjkfefh  hdalkf  efjkhf efjkhfefjkhf"
                        />
                    </div>    
                    <div className='prize-section'>
                        <PrizeDescription
                            image={CarImage}
                            title='Hoodie'
                            desc="lrem ipsim dolor sit amit contetsd erer lks sadas lrem ipsim dolor 
                            sit amit contetsd erer lks sadasddgjkadf jhkasdjh lsjdf hjkjashdf
                            hjlasdfh hjfdara fh,sdfhf huealjkfefh  hdalkf  efjkhf efjkhfefjkhf"
                        />
                    </div>
                </div>
            }
       </div>     
    )
}

export default Product;