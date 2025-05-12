import Container from "@/components/container";
import { useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { marked } from "marked";
import Icon from "@/components/icon";
import { COLOR } from "@/constants/color";
import { useEffect, useState, useCallback } from "react";
import { get } from "@/utils/fetch";
import { Chapter } from "@/types/novel";
import NativeAds from "@/components/ads/native";
import Banner from "@/components/ads/banner";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

export default function ReadScreen() {
  const { novelId, title, chapter, volume, slug } = useLocalSearchParams();
  const [currentChapter, setCurrentChapter] = useState<Chapter | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);

  const translateY = useSharedValue(0); // Shared value untuk translateY

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    get({
      url: `chapter/${slug}`,
      setter: setCurrentChapter,
      loading: setLoading,
    });
  }, [slug]);

  const toggleNavigation = useCallback(() => {
    // Menggunakan withTiming untuk animasi smooth
    translateY.value = withTiming(visible ? 100 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease), // Easing untuk animasi yang lebih halus
    });
    setVisible(!visible);
  }, [visible, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const { width } = Dimensions.get("window");
  const markdownMarked = marked(currentChapter?.content || "").toString();

  const NavigationBottom = () => (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          borderTopWidth: 1,
          borderColor: "#0000001A",
          flexDirection: "row",
          zIndex: 10,
        },
      ]}
    >
      <TouchableOpacity
        style={{
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          gap: 16,
        }}
        activeOpacity={0.7}
      >
        <Icon name={"format-list-bulleted"} size={20} color={COLOR.BLACK} />
        <View style={{ width: "90%" }}>
          <Text
            numberOfLines={1}
            style={{ color: "black", fontFamily: "Roboto", marginBottom: 4 }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "rgba(0,0,0,0.7)",
              fontFamily: "Roboto",
              fontSize: 14,
            }}
          >
            Volume {volume} · Chapter {chapter} ·{" "}
            {currentChapter?.content.length} Karakter
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Container>
      <ScrollView>
        <Banner />
        <TouchableOpacity activeOpacity={1} onPress={toggleNavigation}>
          <RenderHtml
            baseStyle={{ padding: 16, fontFamily: "PTSerif", fontSize: 16 }}
            contentWidth={width}
            source={{ html: markdownMarked }}
            systemFonts={["PTSerif", "Roboto"]}
          />
        </TouchableOpacity>
        <NativeAds />
      </ScrollView>
      <NavigationBottom />
    </Container>
  );
}
