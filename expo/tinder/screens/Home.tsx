import React, { useState } from "react";
import { View, ImageBackground, Text } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import styles from "../assets/styles";
import { City, Filters, CardItem } from "../components";
import DEMO from "../assets/data/demo";
console.log(DEMO[0]);

const Home = () => {
  // 将 CardStack 组件的实例保存到 state 中，实现“外部控制内部手势”的能力
  const [swiper, setSwiper] = useState<CardStack | null>(null);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters />
        </View>
        <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
        >
          {DEMO.map((item) => (
            <Card key={item.id}>
              <CardItem
                hasActions
                image={item.image}
                name={item.name}
                description={item.description}
                matches={item.match}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  )
}

export default Home;