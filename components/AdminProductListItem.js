import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Alert
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

class AdminProductListItem extends React.PureComponent {
  
  render() {
    let {
      id,
      image,
      title,
      navigation,
      price,
      rating,
      onDeleteTapped
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          console.log("Navigating to detail for id ", id);
          navigation.navigate("Detail", { id });
        }}
      >
        <View style={styles.container}>
          <Image
            source={image ? { uri: image } : require("../assets/barcode.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <View style={styles.infoContainer}>
              <Text
                style={[styles.title, { flexShrink: 1, overflow: "hidden" }]}
              >
                {title}
              </Text>

              <MaterialIcons
                name={"delete-forever"}
                size={32}
                color="red"
                style={{ marginRight: 10 }}
                hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}
                onPress={() => onDeleteTapped(id)}
              />
            </View>
            <View style={styles.rating}>
              <Text style={{ color: "#fff", marginRight: 4 }}>{rating || "NA"}</Text>
              <Ionicons name="md-star" size={12} color="#fff" />
            </View>
            <View style={styles.price}>
              <FontAwesome name="rupee" size={16} color="#000" />
              <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
                {price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
    marginRight: 15,
    marginLeft: 15,
    height: 150
  },
  image: {
    width: 120,
    height: 120
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
    justifyContent:'space-between'
  },
  rating: {
    borderRadius: 5,
    backgroundColor: "#0040ff",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginLeft: 10
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginLeft: 10
  }
});
export default AdminProductListItem;
