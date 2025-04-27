import {
  Modal as RNModal,
  ModalProps,
  View,
  KeyboardAvoidingView,
} from "react-native";

type Props = ModalProps & {
  visible: boolean;
  withKeyboard?: boolean;
};

export default function Modal({
  visible,
  withKeyboard,
  children,
  ...rest
}: Props) {
  const content = withKeyboard ? (
    <KeyboardAvoidingView className="border-[0.5px] rounded-lg p-3 border-black/10 bg-white w-full">
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View className="border-[0.5px] rounded-lg p-3 border-black/10 bg-white w-full">
      {children}
    </View>
  );

  return (
    <RNModal
      visible={visible}
      animationType="fade"
      transparent
      className="p-4"
      statusBarTranslucent
      {...rest}
    >
      <View className="flex-1 justify-center items-center h-full bg-zinc-900/40 p-4">
        {content}
      </View>
    </RNModal>
  );
}
