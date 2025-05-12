import * as Keychain from "react-native-keychain";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";
import { post } from "@/utils/fetch";
import { userAtom } from "@/hooks/user";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { cn } from "../cn";

type Props = {
  onClose: () => void;
};

export default function DeleteAccount(props: Props) {
  const user = useAtomValue(userAtom);
  const [reason, setReason] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) return;

    const response = await post({
      url: "account/delete",
      header: {
        Authorization: "Bearer " + user?.token,
      },
      body: {
        email: user?.data.email,
        password: credentials?.password,
        reason: reason,
      },
      loading: setLoading,
    });
    setResponse(response);
  };
  return (
    <View>
      <View className="flex-row z-50 justify-between">
        <Text className="font-robotoMedium text-black text-lg">Hapus Akun</Text>
        <TouchableOpacity
          onPress={() => {
            props.onClose();
            setReason("");
          }}
        >
          <Icon name={"close"} size={20} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="font-roboto text-black/50 mb-3 mt-1">
          Yakin untuk menhapus akun? Semua data kamu akan hilang sepenuhnya
        </Text>
        {response ? (
          <Text className={"font-roboto text-black/50 mb-3 mt-1 "}>
            <Text className="text-red-500">*</Text> {response?.message}
          </Text>
        ) : null}

        <TextInput
          placeholder="Kirim alasan kamu menghapus account..."
          placeholderClassName="p-4"
          onChangeText={(v) => setReason(v)}
          className="border-black/10 border-[0.5px] p-2 rounded-lg mb-4"
          multiline={true}
          numberOfLines={4}
          style={{
            height: 100,
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          onPress={handleDeleteAccount}
          className="w-full p-4 bg-red-400 rounded-lg"
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={COLOR.WHITE} />
          ) : (
            <Text className="text-white text-center">Hapus</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
