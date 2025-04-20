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
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";

const AuthScreen = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [user, setUser] = useAtom(_user);
  const setModal = useSetAtom(_modal);
  const router = useRouter();

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAuth = async () => {
    const { username, email, password } = form;

    if (!email || !password || (mode === "signup" && !username)) {
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
        setUser(result);
        // Uncomment saat build production
        await Keychain.setGenericPassword(user?.user.email, password);
        showModal(result.message, "happy", () => router.replace("/"));
      } else {
        showModal(result.message, "happy", () => setMode("signin"));
      }
      clearForm();
    } else {
      showModal(result.message, "sad");
    }
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
      <Navbar />
      <View className="flex-1 justify-center items-center p-4">
        <View className="w-[90%]">
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 100, height: 100, alignSelf: "center" }}
          />
          <Text className="text-2xl font-robotoMedium text-black text-center my-4">
            {mode === "signin" ? "Login" : "Register"}
          </Text>

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

          <Button
            text={mode === "signin" ? "Login" : "Register"}
            onPress={handleAuth}
          />

          <View className="flex-row justify-center mt-4">
            <Text className="font-robotoMedium text-black">
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

          {/* TODO :
              Bakal ditambahkan kalo aplikasi sudah listed
          */}
          {/* <GoogleButton /> */}
        </View>
      </View>
    </Container>
  );
};

const Navbar = () => {
  const router = useRouter();
  return (
    <View className="absolute top-10 left-4">
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color={COLOR.BLACK} />
      </TouchableOpacity>
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
    className="bg-gray-100 mb-2 rounded px-4 py-4 border-[0.5px] border-black/10"
  />
);

const Button = ({ text, onPress }: any) => (
  <TouchableOpacity onPress={onPress}>
    <Text className="bg-primary text-white p-4 rounded text-center font-robotoMedium">
      {text}
    </Text>
  </TouchableOpacity>
);

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
