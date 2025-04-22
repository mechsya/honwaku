import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Pressable,
} from "react-native";
import Icon from "./icon";
import { COLOR } from "@/constants/color";
import { _modal } from "@/hooks/modal";
import { useAtom } from "jotai";

export default function CustomModal({ children }: any) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current; // dari bawah 50px
  const [modal, setModal] = useAtom(_modal);

  useEffect(() => {
    if (modal.visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modal.visible]);

  const setMode = (mode: string) => {
    switch (mode) {
      case "sad":
        return require("@/assets/images/murung.png");
      case "happy":
        return require("@/assets/images/logo.png");
      default:
        return require("@/assets/images/logo.png"); // default fallback
    }
  };

  return (
    <Modal
      statusBarTranslucent={true}
      transparent
      visible={modal.visible}
      animationType="none"
    >
      <View style={styles.centeredView}>
        {/* backdrop */}
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.5)", opacity: 0.8 },
          ]}
          onPress={() => setModal({ ...modal, visible: false })}
        />

        {/* modal content */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          {/* close button */}
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 100,
                padding: 8,
              }}
              onPress={() => setModal({ ...modal, visible: false })}
            >
              <Icon name={"close"} size={20} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Image
              source={setMode(modal.mode)}
              style={{ width: 100, height: 100 }}
            />
            <Text
              style={{
                marginTop: 8,
                textAlign: "center",
                fontSize: 16,
                color: COLOR.BLACK,
                fontFamily: "Roboto",
              }}
            >
              {modal.message || ""}
            </Text>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    minWidth: "80%",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
    shadowRadius: 4,
    padding: 16,
  },
  modalContent: {
    alignItems: "center",
  },
});
