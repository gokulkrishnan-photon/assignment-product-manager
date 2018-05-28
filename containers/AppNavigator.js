import { 
  createStackNavigator, 
  createBottomTabNavigator 
} from "react-navigation";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

import ProductDetail from "./ProductDetail";
import AddProduct from "./AddProduct";
import StoreMap from "./StoreMap";
import ProductListWithFlatList from "./ProductListWithFlatList";
import SearchListView from "./SearchListView";
import AdminProductListView from "./AdminProductListView";

const ListStack = createStackNavigator(
  {
    List: {
      screen: ProductListWithFlatList
    },
    Detail: {
      screen: ProductDetail
    }
  },
  {
    initialRouteName: "List",
    navigationOptions: {
      title: "Product Manager",
      headerStyle: {
        backgroundColor: "orange"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

const AddStack = createStackNavigator(
  {
    Add: {
      screen: AddProduct
    }
  },
  {
    initialRouteName: "Add",
    navigationOptions: {
      title: "Manage",
      headerStyle: {
        backgroundColor: "orange"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

const SearchProductListStack = createStackNavigator(
  {
    SearchListView: {
      screen: SearchListView
    }
  },
  {
    initialRouteName: "SearchListView",
    navigationOptions: {
      title: "Search Products",
      headerStyle: {
        backgroundColor: "orange"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

const AdminProductListStack = createStackNavigator(
  {
    AdminProductListView: {
      screen: AdminProductListView
    }
  },
  {
    initialRouteName: "AdminProductListView",
    navigationOptions: {
      title: "Admin Products",
      headerStyle: {
        backgroundColor: "orange"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

export const AppNavigator = createBottomTabNavigator(
  {
    List: ListStack,
    Add: AddStack,
    Search: SearchProductListStack,
    AdminProduct: AdminProductListStack,
    Stores: StoreMap
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "List") {
          iconName = `ios-list-box${focused ? "" : "-outline"}`;
        } else if (routeName === "Add") {
          iconName = `ios-add-circle${focused ? "" : "-outline"}`;
        }  else if (routeName === "Search") {
          iconName = `ios-search${focused ? "" : "-outline"}`;
        } else if (routeName === "AdminProduct") {
          return (
            <Ionicons
              name="logo-apple"
              size={25}
              color={tintColor}
            />
          );
        } else if (routeName === "Stores") {
          return (
            <MaterialIcons
              name="local-grocery-store"
              size={25}
              color={tintColor}
            />
          );
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#00ff80",
      inactiveTintColor: "gray"
    }
  }
);

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navState
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={{
          dispatch: this.props.dispatch,
          state: this.props.navState,
          addListener
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.navState
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
