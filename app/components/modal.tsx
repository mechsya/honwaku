import { _modal } from "@/hooks/modal";
import { useAtom } from "jotai";
import {
  Modal as RNModal,
  ModalProps,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "./icon";
import { COLOR } from "@/constants/color";

type Props = ModalProps;

export default function Modal({ children, ...rest }: Props) {
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
    <RNModal
      visible={modal.visible}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <Pressable
        onPress={() => setModal({ ...modal, visible: false })}
        style={styles.backdrop}
      >
        <View style={styles.modalBox}>
          <Pressable
            style={styles.closeButtonWrapper}
            onPress={() => setModal({ ...modal, visible: false })}
          >
            <View style={styles.closeButton}>
              <Icon name={"close"} size={20} color={COLOR.BLACK} />
            </View>
          </Pressable>

          <View style={styles.content}>
            <Image style={styles.image} source={setMode(modal.mode)} />
            <Text style={styles.messageText}>{modal.message}</Text>
            {children}
          </View>
        </View>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: 280,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    position: "relative",
  },
  closeButtonWrapper: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  closeButton: {
    backgroundColor: "#f3f3f3",
    padding: 6,
    borderRadius: 100,
  },
  content: {
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  messageText: {
    marginTop: 10,
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
