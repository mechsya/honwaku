import React, { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { _modal } from "@/hooks/modal";
import { useAtom } from "jotai";
// import Modal from "react-native-modal";
import { View } from "react-native";
import Icon from "./icon";
import { COLOR } from "@/constants/color";

export default function CustomModal({ children }: any) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current; // dari bawah 50px
  const [modal, setModal] = useAtom(_modal);

  const setMode = (mode: string) => {
    switch (mode) {
      case "sad":
        return require("@/assets/images/murung.png");
      case "happy":
        return require("@/assets/images/logo.png");
      default:
        return require("@/assets/images/logo.png");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modal.visible}
      onRequestClose={() => {
        setModal({ ...modal, visible: !modal.visible });
      }}
    >
      <View className="flex-1 justify-center items-center">
        <View className="bg-white border border-black/10 rounded-xl p-8 w-64">
          <View className="absolute top-2 right-2">
            <TouchableOpacity
              className="bg-gray-100 p-1 rounded-full"
              onPress={() => setModal({ ...modal, visible: false })}
            >
              <Icon name={"close"} size={20} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>

          <View className="flex-col items-center">
            <Image className="w-20 h-20" source={setMode(modal.mode)} />
            <Text className="font-robotoMedium text-black mt-2">
              {modal.message || ""}
            </Text>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}
