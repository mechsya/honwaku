import Container from "@/components/container";
import CustomModal from "@/components/modal";
import Icon from "@/components/icon";
import { post } from "@/utils/fetch";
import { _user } from "@/hooks/user";
import { _modal } from "@/hooks/modal";
import * as Keychain from "react-native-keychain";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLOR } from "@/constants/color";
import { useRouter } from "expo-router";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

const _loading = atom(false);

const AuthScreen = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [user, setUser] = useAtom(_user);
  const setModal = useSetAtom(_modal);
  const router = useRouter();
  const setLoading = useSetAtom(_loading);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAuth = async () => {
    setLoading(true);
    const { username, email, password } = form;

    if (!email || !password || (mode === "signup" && !username)) {
      setLoading(false);
      return showModal("Input tidak boleh kosong", "sad");
    }

    const url = mode === "signin" ? "user/signin" : "user/signup";

    const body =
      mode === "signin"
        ? { email, password }
        : { name: username, email, password };

    const result = await post({ url, body });

    if (result.code === 200) {
      if (mode === "signin") {
        setUser(result.data);
        await Keychain.setGenericPassword(result.data.data.email, password);
        showModal(result.message, "happy", () => router.replace("/"));
      } else {
        showModal(result.message, "happy", () => setMode("signin"));
      }
      clearForm();
    } else {
      showModal(result.message, "sad");
    }
    setLoading(false);
  };

  const showModal = (
    message: string,
    mode: "happy" | "sad",
    callback?: () => void
  ) => {
    setModal({ message, mode, visible: true });
    if (callback)
      setTimeout(() => {
        setModal({ message, mode, visible: false });
        callback();
      }, 3000);
  };

  const clearForm = () => {
    setForm({ username: "", email: "", password: "" });
  };

  return (
    <Container>
      <Modal />
      <Navbar label={mode === "signin" ? "Masuk" : "Daftar"} />
      <View className="flex-1  p-4">
        <View className="w-full h-full">
          {mode === "signup" && (
            <InputField
              placeholder="Username"
              value={form.username}
              onChange={(v: string) => handleChange("username", v)}
            />
          )}
          <InputField
            placeholder="Email"
            value={form.email}
            onChange={(v: string) => handleChange("email", v)}
            keyboardType="email-address"
          />
          <InputField
            placeholder="Password"
            value={form.password}
            onChange={(v: string) => handleChange("password", v)}
            secureTextEntry
          />

          <View className="flex-row mt-6">
            <Text className="font-robotoMedium text-black/70">
              {mode === "signin" ? "Belum punya akun? " : "Sudah punya akun? "}
            </Text>
            <TouchableOpacity
              onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              <Text className="font-robotoMedium text-primary">
                {mode === "signin" ? "Daftar" : "Masuk"}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            text={mode === "signin" ? "Login" : "Register"}
            onPress={() => handleAuth()}
          />
        </View>
      </View>
    </Container>
  );
};

const Navbar = ({ label }: { label: string }) => {
  const router = useRouter();
  return (
    <View className="navbar-container justify-start gap-4">
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="arrow-back" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
      <Text>{label}</Text>
    </View>
  );
};

const InputField = ({
  placeholder,
  value,
  onChange,
  keyboardType,
  secureTextEntry,
}: any) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChange}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
    className="w-full border-b-[0.5px] px-4 py-4 border-black/10"
  />
);

import AntDesign from "@expo/vector-icons/AntDesign";
import Modal from "@/components/modal";

const Button = ({ text, onPress }: any) => {
  const loading = useAtomValue(_loading);

  return (
    <TouchableOpacity onPress={onPress} className="absolute bottom-5 w-full">
      {loading ? (
        <View className=" bg-primary text-white p-4  rounded ">
          <View className="m-auto animate-spin">
            <AntDesign name="loading1" size={16} color="white" />
          </View>
        </View>
      ) : (
        <Text className="bg-primary text-white p-4 rounded text-center font-robotoMedium">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const GoogleButton = () => (
  <TouchableOpacity className="flex-row items-center justify-center gap-2 mt-6 p-3 border border-black/10 rounded">
    <Image
      source={require("@/assets/images/google.png")}
      style={{ width: 20, height: 20 }}
    />
    <Text className="font-robotoMedium text-black">Login dengan Google</Text>
  </TouchableOpacity>
);

export default AuthScreen;
