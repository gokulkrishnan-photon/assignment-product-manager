import React, { Component } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Alert,
    View,
    Vibration
} from "react-native";
import AdminProductListItem from "../components/AdminProductListItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";

let URI = "http://127.0.0.1:4000";

class AdminProductListView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getProducts(this.props.page, this.props.limit);
    }

    deleteButtonAction = id => {
        const DURATION = 10000
        Alert.alert(
            'Product Manager Alert',
            'Are you sure you want to delete the product?',
            [
                { text: 'No', onPress: () => console.log('No Pressed') },
                { text: 'Yes', onPress: () => this.deleteItemServiceCall(id) },
            ],
            { cancelable: false }
        )
    };

    deleteItemServiceCall(id) {
        this.props.actions.deleteProduct(id);
        Vibration.vibrate(1000);
    }

    getMoreProductsServiceCall = (page = 1, limit = 8) => {
        this.props.actions.getProducts(page, limit);
    };

    getMoreProducts = () => {
        this.getMoreProductsServiceCall(++this.props.page, this.props.limit);
    };

    refreshControlAction = () => {
        this.getMoreProductsServiceCall();
    };

    _keyExtractor = (item, index) => {
        return `${index}`;
    };

    getAdminProductListItemControl = ({ index, item }) => {
        return (
            <AdminProductListItem
                {...this.props}
                id={item.id}
                title={`${item.id} - ${item.title}`}
                image={item.image ? `${URI}/images/${item.image}` : null}
                rating={item.rating}
                price={item.price}
                onDeleteTapped={this.deleteButtonAction}
            />
        );
    };

    getRefreshControl() {
        return (
            <RefreshControl
                onRefresh={this.refreshControlAction}
                refreshing={this.props.isRefreshing}
                tintColor={"#00ff80"}
                title={"Refreshing..."}
                titleColor={"#00ff80"}
            />
        );
    }

    getActivityControl() {
        return (
            <ActivityIndicator size="large" color="#00ff80" />
        );
    }

    getAdminProductListControl() {
        return (
            <FlatList
                data={this.props.products}
                renderItem={this.getAdminProductListItemControl}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0.5}
                onEndReached={this.getMoreProducts}
                refreshControl={this.getRefreshControl}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.props.isLoading ? (this.getActivityControl()) : (this.getAdminProductListControl())}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.productState.products,
        isLoading: state.productState.isLoading,
        isRefreshing: state.productState.isRefreshing,
        page: state.productState.page,
        limit: state.productState.limit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    AdminProductListView
);
