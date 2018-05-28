import {
    put,
    takeLatest
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product"
import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    GET_PRODUCT_DETAILS,
    GET_PRODUCT_DETAILS_SUCCESS,
    GET_PRODUCT_DETAILS_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    SEARCH_FILTER_PRODUCTS,
    GET_SEARCH_PRODUCTS,
    GET_SEARCH_PRODUCTS_SUCCESS
} from "../actionTypes/product";

//let URI = "http://192.168.1.101:4000";
let URI = "http://127.0.0.1:4000";

function* getProducts(action) {
    try {
        let products = yield fetch(`${URI}/products?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* deleteProduct(action) {
    try {
        console.log("action id =", action.productId)
        let products = yield fetch(`${URI}/products/${action.productId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(actionCreators.deleteProductSuccess(action.productId))
    } catch (error) {
        yield put(actionCreators.deleteProductFailure(error))
    }
}

function* searchProducts(action) {
    try {
        let searchProducts = yield fetch(`${URI}/products?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.searchProductSuccess(searchProducts))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
        yield alert(error)
        
    }
}

function* getProduct(action) {
    try {
        let product = yield fetch(`${URI}/products/${action.id}`).then(r => r.json());
        yield put(actionCreators.getProductDetailsSuccess(product))
    } catch (error) {
        yield put(actionCreators.getProductDetailsFailure(error))
    }
}

function* addProduct(action) {
    try {
        let product = yield fetch(`${URI}/products`, {
            body: JSON.stringify(action.product),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(actionCreators.addProductSuccess(product))
        yield alert("Product Added Successfully")
    } catch (error) {
        yield put(actionCreators.addProductFailure(error))
        yield alert(error)
    }
}

// function* getProduct(action) {
//     try {
//         let product = yield fetch(`${URI}\product\${action.id}`).then(r => r.json());
//         yield put(actionCreators.getProductSuccess(product))
//     } catch (error) {
//         yield put(actionCreators.getProductFailure(error))
//     }
// }

// function* addProduct(action) {
//     try {
//         let product = yield fetch(`${URI}\products`, {
//             body: JSON.stringify(action.product),
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//         }).then(r => r.json());
//         yield put(actionCreators.addProductSuccess(product))
//     } catch (error) {
//         yield put(actionCreators.addProductFailure(error))
//     }
// }

export function* productWatchers() {
    yield takeLatest(GET_PRODUCTS, getProducts)
    yield takeLatest(DELETE_PRODUCT, deleteProduct)
    yield takeLatest(GET_SEARCH_PRODUCTS,searchProducts)
    yield takeLatest(GET_PRODUCT_DETAILS, getProduct)
    yield takeLatest(ADD_PRODUCT,addProduct)
}