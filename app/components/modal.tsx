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
} from "react-native";
import Icon from "./icon";
import { COLOR } from "@/constants/color";
import { _modal } from "@/hooks/modal";
import { useAtom } from "jotai";

export default function CustomModal({ children }: any) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const [modal, setModal] = useAtom(_modal);

  useEffect(() => {
    if (modal.visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
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
        Animated.timing(scale, {
          toValue: 0.8,
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
        break;
    }
  };

  return (
    <Modal transparent visible={modal.visible} animationType="none">
      <View style={styles.centeredView}>
        <Animated.View
          className="relative"
          style={[styles.modalContainer, { transform: [{ scale }] }]}
        >
          <View className="justify-end flex-row">
            <TouchableOpacity
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
            <Text className="text-black font-robotoMedium text-lg text-center">
              {modal.message}
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    minWidth: "80%",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
    shadowRadius: 4,
  },
  modalContent: {
    alignItems: "center",
  },
});
