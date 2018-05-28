import React, { Component } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Alert,
    View,
    StyleSheet,
    TextInput
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchListItem from "../components/SearchListItem"
import * as productActionCreators from "../actionCreators/product";

let URI = "http://127.0.0.1:4000";

class SearchListView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
        this.productList = [];
    }

    componentDidMount() {
        this.props.actions.searchProduct(this.props.page, this.props.limit);
    }

    searchFilter(searchText) {
        this.setState({ searchText });
        this.props.actions.searchProductFiler(searchText, this.props.products);
    }

    getMoreProducts = (page = 1, limit = 8) => {
        this.props.actions.searchProduct(page, limit);
    }

    onRefreshControlAction = () => {
        this.getMoreProducts(++this.props.page, this.props.limit);
    }

    getRefreshControl() {
        return (
            <RefreshControl
                onRefresh={this.onRefreshControlAction}
                refreshing={this.state.isRefreshing}
                title={'Loading...'}
                titleColor={'blue'}
                tintColor={'black'}
            />
        );
    }

    getSearchListItemControl({index, item}) {
        return (
            <SearchListItem
                {...this.props}
                id={item.id}
                title={`${item.title}`}
            />
        );
    }

    getActivityControl() {
        return (
            <ActivityIndicator size="large" color="#00ff80" />
        );
    }

    _keyExtractor = (item, index) => {
        return `${index}`;
    };

    getSearchFlatListControl() {
        return (
            <FlatList
                data={this.props.dataFiltered}
                renderItem={this.getSearchListItemControl}
                keyExtractor={this._keyExtractor}
                refreshControl={this.getRefreshControl}
                onEndReached={this.getMoreProducts}
                onEndReachedThreshold={0.5}
            />
        );
    }

    render() {
        return (
            <View style={styleSheet.container}>
                <TextInput
                    style={styleSheet.textInputStyleClass}
                    onChangeText={(text) => this.searchFilter(text)}
                    value={this.state.text}
                    underlineColorAndroid='transparent'
                    placeholder="Search Products" />
                {this.props.isLoading ? (this.getActivityControl()) : (this.getSearchFlatListControl())}
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    textInputStyleClass: {
        textAlign: 'left',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF"

    }
});

function mapStateToProps(state) {
    return {
        products: state.productState.products,
        isLoading: state.productState.isLoading,
        isRefreshing: state.productState.isRefreshing,
        page: state.productState.page,
        limit: state.productState.limit,
        searchProducts: state.productState.searchProducts,
        dataFiltered: state.productState.dataFiltered
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    SearchListView
);
