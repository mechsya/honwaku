import { COLOR } from "@/constants/color";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "../icon";
import { post } from "@/utils/fetch";
import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { _reload } from "@/hooks/view";
import { _user } from "@/hooks/user";
import { _novel } from "@/hooks/novel";
import { _modal } from "@/hooks/modal";

export default function InputComment() {
  const [input, setInput] = useState<string>("");
  const [reload, setReload] = useAtom(_reload);
  const [loading, setLoading] = useState(false);

  const setModal = useSetAtom(_modal);
  const user = useAtomValue(_user);
  const novel = useAtomValue(_novel);

  const handleComment = () => {
    if (input === "") {
      setModal({
        mode: "sad",
        message: "Input tidak boleh kosong",
        visible: true,
      });
      return;
    }

    if (!user) {
      setModal({
        mode: "sad",
        message: "Harus login terlebih dahulu",
        visible: true,
      });
      return;
    }

    post({
      url: "global-chat",
      header: {
        Authorization: "Bearer " + user?.token,
      },
      body: {
        user: user?.data.id,
        novel: novel?.id,
        content: input,
      },
      loading: setLoading,
    }).then(() => {
      setInput("");
      setReload(!reload);
    });
  };

  return (
    <>
      <View className="bg-white flex-row border-black/10 absolute bottom-0 items-center w-full px-4 py-3">
        <TextInput
          value={input}
          onChangeText={(value) => setInput(value)}
          placeholder="Tulis Komentar"
          multiline
          className="bg-gray-100 px-4 h-14 flex-1 rounded"
        />
        <TouchableOpacity
          onPress={handleComment}
          className="bg-primary w-10 h-10 ml-4 justify-center items-center rounded-full"
        >
          {loading ? (
            <ActivityIndicator color={"white"} size={"small"} />
          ) : (
            <Icon name={"arrow-upward"} size={20} color={COLOR.WHITE} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
