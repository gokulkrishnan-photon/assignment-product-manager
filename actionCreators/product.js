import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCT,
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_SUCCESS,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    SEARCH_FILTER_PRODUCTS,
    GET_SEARCH_PRODUCTS,
    GET_SEARCH_PRODUCTS_SUCCESS,
    GET_SEARCH_PRODUCTS_FAILURE,
    GET_PRODUCT_DETAILS,
    GET_PRODUCT_DETAILS_SUCCESS,
    GET_PRODUCT_DETAILS_FAILURE,
} from "../actionTypes/product";

// export const GET_PRODUCTS = 'GET_PRODUCTS'
// export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
// export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

// export const ADD_PRODUCT = 'ADD_PRODUCT'
// export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS'
// export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE'

// export const GET_PRODUCT = 'GET_PRODUCT'
// export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
// export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE'

export function getProducts(page, limit) {
    return {
        type: GET_PRODUCTS,
        page,
        limit
    }
}

export function getProductsSuccess(products) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products
    }
}

export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        error
    }
}

export function getProduct(id) {
    return {
        type: GET_PRODUCT,
        id
    }
}

export function getProductSuccess(product) {
    return {
        type: GET_PRODUCT_SUCCESS,
        product
    }
}

export function getProductFailure(error) {
    return {
        type: GET_PRODUCT_FAILURE,
        error
    }
}

export function addProduct(product) {
    return {
        type: ADD_PRODUCT,
        product
    }
}

export function addProductSuccess(product) {
    return {
        type: ADD_PRODUCT_SUCCESS,
        product
    }
}

export function addProductFailure(error) {
    return {
        type: ADD_PRODUCT_FAILURE,
        error
    }
}

export function deleteProduct(productId) {
    return {
        type: DELETE_PRODUCT,
        productId
    }
}

export function deleteProductSuccess(productId) {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        productId
    }
}

export function deleteProductFailure(error) {
    return {
        type: DELETE_PRODUCT_FAILURE,
        error
    }
}

export function searchProductFiler(text, searchData) {
    return {
        type: SEARCH_FILTER_PRODUCTS,
        text,
        searchData
    }
}

export function searchProduct(page, limit) {
    return {
        type: GET_SEARCH_PRODUCTS,
        page,
        limit
    }
}

export function searchProductSuccess(page, limit) {
    return {
        type: GET_SEARCH_PRODUCTS_SUCCESS,
        page,
        limit
    }
}

export function searchProductFailure(error) {
    return {
        type: GET_SEARCH_PRODUCTS_FAILURE,
        error
    }
}