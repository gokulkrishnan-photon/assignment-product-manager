import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
  } from "react-native";

  class SearchListItem extends PureComponent {

    render() {
        let {
          id,
          title
        } = this.props;
        return (
          <TouchableOpacity
            activeOpacity={0.5}>
            <View style={styleSheet.container}>
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <View style={styleSheet.infoContainer}>
                  <Text
                    style={[styleSheet.title, { flexShrink: 1, overflow: "hidden" }]}>
                    {title}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
  }

  const styleSheet = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "grey",
      marginRight: 15,
      marginLeft: 15,
    },
    title: {
      color: "black",
      marginRight: 8,
      marginLeft: 8,
      fontSize: 12
    },
    infoContainer: {
      flexDirection: "row",
      paddingTop: 20,
    }
  });

  export default SearchListItem;