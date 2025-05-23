import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLOR } from "@/constants/color";
import { useEffect, useState } from "react";
import { BASE_URL, get, post } from "@/utils/fetch";
import { useAtomValue, useSetAtom } from "jotai";
import { novelAtom } from "@/hooks/novel";
import { reloadAtom } from "@/hooks/view";
import Wrapper from "../wrapper";
import InputComment from "./input-comment";
import { userAtom } from "@/hooks/user";
import Modal from "../modal";
import Alert from "../modal/alert";
import Report from "../modal/report";

export default function Comment() {
  const [comments, setComment] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const novel = useAtomValue(novelAtom);
  const reload = useAtomValue(reloadAtom);

  useEffect(() => {
    get({
      url: `comment?novel=${novel?.id}`,
      setter: setComment,
      loading: setLoading,
    });
  }, [reload]);

  return (
    <KeyboardAvoidingView>
      <InputComment />
      <Wrapper loading={loading} data={comments}>
        {comments.map((item: any, index: number) => (
          <CommentItem {...item} key={index} />
        ))}
      </Wrapper>
    </KeyboardAvoidingView>
  );
}

const CommentItem = (props: any) => {
  const user = useAtomValue(userAtom);
  const [likeLoading, setLikeLoading] = useState(false);
  const [comment, setComment] = useState<any>(props);
  const [modal, setModal] = useState({
    visible: false,
    message: "",
    header: "",
  });
  const [reason, setReason] = useState("");
  const [isOpenReportModal, setOpenReportModal] = useState(false);

  const handleLike = async () => {
    if (!user)
      return setModal({
        visible: true,
        message: "Kamu harus login dahulu sebelum menyukai komentar",
        header: "Ayo login!",
      });

    if (likeLoading) return;

    const response = await post({
      url: "comment/like",
      header: {
        Authorization: `Bearer ${user?.token}`,
      },
      body: {
        user: user?.data.id,
        comment: props.id,
      },
    });

    if (response) {
      await get({
        url: `comment/show?novel=${props.id}&user=${user.data.id}`,
        loading: setLikeLoading,
        setter: setComment,
      });
    }
  };

  const handleReport = async () => {
    if (!user)
      return setModal({
        visible: true,
        message: "Kamu harus login dahulu sebelum melaporkan komentar",
        header: "Ayo login!",
      });

    setOpenReportModal(true);
  };

  return (
    <>
      <Modal visible={modal.visible}>
        <Alert
          header={modal.header}
          message={modal.message}
          onClose={() => setModal({ ...modal, visible: false })}
        />
      </Modal>
      <Modal visible={isOpenReportModal}>
        <Report
          onClose={() => {
            setOpenReportModal(false);
          }}
          idComment={props.id}
        />
      </Modal>
      <View className="p-4 border-b-[0.5px] border-black/10">
        <TouchableOpacity className="">
          <Text className="text-black capitalize font-robotoMedium">
            {props?.user?.name}
          </Text>
          <Text className="text-black/50 font-roboto">{props.created_at}</Text>
          <Text className="text-black/70 font-roboto leading-7 my-3">
            {props.content}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={handleLike}
            disabled={likeLoading}
            className="flex-row items-center gap-2"
          >
            <View className="flex-row items-center gap-2">
              {likeLoading ? (
                <ActivityIndicator
                  style={{ width: 12, height: 12 }}
                  size={"small"}
                  color={COLOR.PRIMARY}
                />
              ) : (
                <AntDesign
                  name="heart"
                  size={12}
                  color={comment.isLiked ? COLOR.DANGER : "rgba(0,0,0,.3)"}
                />
              )}
              <Text className="font-robotoMedium text-black/70">
                {comment.like}
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="text-4 font-roboto text-black/50"> &bull; </Text>
          <TouchableOpacity onPress={handleReport}>
            <Text className="text-4 font-robotoMedium text-black/70">
              Laporkan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
