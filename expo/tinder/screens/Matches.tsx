import React from "react";
import {
  ScrollView, // 滚动视图
  View, // 视图容器
  Text, // 文本组件
  TouchableOpacity, // 可点击视图
  ImageBackground, // 背景图片组件
  FlatList, // 列表组件
} from "react-native";
import { CardItem, Icon } from "../components";
import DEMO from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";


const Matches = () => {
  return (
    <ImageBackground
    source={require("../assets/images/bg.png")}
    style={styles.bg}
    >
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <Text style={styles.title}>Matches</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>
        {/* keyExtractor 接收一个函数作为值。 */}
        <FlatList
          numColumns={2}
          data={DEMO}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <CardItem
                image={item.image}
                name={item.name}
                isOnline={item.isOnline}
                hasVariant
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  )
}

export default Matches;