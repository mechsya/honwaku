import Container from "@/components/container";
import Icon from "@/components/icon";
import { post } from "@/utils/fetch";
import { _user } from "@/hooks/user";
import * as Keychain from "react-native-keychain";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR } from "@/constants/color";
import { router, useRouter } from "expo-router";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import Modal from "@/components/modal";
import Alert from "@/components/modal/alert";

const _loading = atom(false);

const AuthScreen = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const setUser = useSetAtom(_user);
  const setLoading = useSetAtom(_loading);
  const [modal, setModal] = useState({
    visible: false,
    message: "",
    header: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAuth = async () => {
    setLoading(true);
    const { username, email, password } = form;

    if (!email || !password || (mode === "signup" && !username)) {
      setLoading(false);
      setModal({
        header: "Hmmm...",
        message: "Email atau password kamu tidak boleh kosong",
        visible: true,
      });
      return;
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
        setModal({
          header: "Yeeee..",
          message:
            "Kamu telah berhasil login, silahkan tunggu sebentar kamu akan di pindahkan ke halaman beranda",
          visible: true,
        });

        setTimeout(() => {
          setModal({ ...modal, visible: false });
          router.replace("/");
        }, 2000);
      } else {
        setModal({
          header: "Yeeee..",
          message:
            "Kamu telah berhasil register, silahkan tunggu sebentar kamu akan di pindahkan ke halaman login",
          visible: true,
        });
      }
      setTimeout(() => {
        setModal({ ...modal, visible: false });
        setMode("signin");
      }, 2000);
      clearForm();
    } else {
      setModal({
        header: "Yahhh..",
        message: result.message,
        visible: true,
      });
    }

    setLoading(false);
  };

  const clearForm = () => {
    setForm({ username: "", email: "", password: "" });
  };

  return (
    <Container>
      <Modal visible={modal.visible} withKeyboard>
        <Alert
          onClose={() => setModal({ ...modal, visible: false })}
          message={modal.message}
          header={modal.header}
        />
      </Modal>

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

const Button = ({ text, onPress }: any) => {
  const loading = useAtomValue(_loading);

  return (
    <TouchableOpacity onPress={onPress} className="absolute bottom-5 w-full">
      {loading ? (
        <View className=" bg-primary text-white p-4  rounded ">
          <ActivityIndicator size={"small"} color={COLOR.WHITE} />
        </View>
      ) : (
        <Text className="bg-primary text-white p-4 rounded text-center font-robotoMedium">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default AuthScreen;
