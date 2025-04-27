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
import { useAtom, useAtomValue } from "jotai";
import { _reload } from "@/hooks/view";
import { _user } from "@/hooks/user";
import { _novel } from "@/hooks/novel";
import Modal from "../modal";
import Alert from "../modal/alert";

export default function InputComment() {
  const [commentInput, setCommentInput] = useState<string>("");
  const [reload, setReload] = useAtom(_reload);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    message: "",
    header: "",
  });

  const user = useAtomValue(_user);
  const novel = useAtomValue(_novel);

  const handleComment = () => {
    if (commentInput === "") {
      return setModal({
        visible: true,
        message: "Pesan tidak boleh kosong",
        header: "Hmmm...",
      });
    }

    if (!user)
      return setModal({
        visible: true,
        message: "Kamu harus login dahulu sebelum mengirim pesan",
        header: "Ayo login!",
      });

    post({
      url: "comment",
      header: {
        Authorization: "Bearer " + user?.token,
      },
      body: {
        user: user?.data.id,
        novel: novel?.id,
        content: commentInput,
      },
      loading: setLoading,
    }).then(() => {
      setCommentInput("");
      setReload(!reload);
    });
  };

  return (
    <>
      <Modal visible={modal.visible} withKeyboard>
        <Alert
          header={modal.header}
          message={modal.message}
          onClose={() => setModal({ ...modal, visible: false })}
        />
      </Modal>
      <View className="bg-white flex-row border-black/10 items-center w-full px-4 py-3">
        <TextInput
          value={commentInput}
          onChangeText={(value) => setCommentInput(value)}
          placeholder="Tulis Komentar"
          multiline
          className="bg-gray-50 px-4 h-14 flex-1 rounded border-[0.5px] border-black/10"
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
