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

type Props = {
  idComment: number;
  onClose: () => void;
};

export default function Report(props: Props) {
  const user = useAtomValue(userAtom);
  const [reason, setReason] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    const response = await post({
      url: "comment/report",
      body: {
        reporter: user?.data.id,
        comment: props.idComment,
        reason: reason,
      },
      header: {
        Authorization: "Bearer " + user?.token,
      },
      loading: setLoading,
    });
    setResponse(response);
  };

  return (
    <View>
      <View className="flex-row z-50 justify-between">
        <Text className="font-robotoMedium text-black text-lg">Laporkan</Text>
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
          Tulisan alasan kenapa kamu melaporkan komentar ini dibawah
        </Text>
        {response ? (
          <Text className={"font-roboto text-black/50 mb-3 mt-1 "}>
            <Text className="text-primary">*</Text> {response?.message}
          </Text>
        ) : null}

        <TextInput
          placeholder="Kirim alasan kamu melaporkan comment ini..."
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
          onPress={handleReport}
          className="w-full p-4 bg-primary rounded-lg"
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={COLOR.WHITE} />
          ) : (
            <Text className="text-white text-center">Laporkan</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
