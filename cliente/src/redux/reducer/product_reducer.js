import * as actionTypes from '../types/types'

const initialState = {
    products: [],
    filteredProducts: [],
    productDetail: null,
    loading: false,
    error: null,
};

const ProductReducer = (state = initialState, action ) => {
    switch (action.type){
        case actionTypes.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_PRODUCTS_SUCCESS:
            const products = action.payload;
            return {
                ...state,
                products,
                filteredProducts: products,
                loading: false,
                error: null,
            };
        case actionTypes.GET_PRODUCTS_FAILURE:
            return {
                ...state,
                products: [],
                filteredProducts: [],
                loading: false,
                error: action.payload,
            };
            default:
                return state;        
    }
} 

export default ProductReducer;
