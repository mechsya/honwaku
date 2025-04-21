import { View, Text, TouchableOpacity } from "react-native";
import Icon from "../icon";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLOR } from "@/constants/color";
import { useEffect, useState } from "react";
import { get } from "@/utils/fetch";
import { useAtomValue } from "jotai";
import { _novel } from "@/hooks/novel";
import { _reload } from "@/hooks/view";
import Wrapper from "../wrapper";
import InputComment from "./input-comment";

export default function Comment() {
  const [comments, setComment] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const novel = useAtomValue(_novel);
  const reload = useAtomValue(_reload);

  useEffect(() => {
    get({
      url: `comment?id=${novel?.id}`,
      setter: setComment,
      loading: setLoading,
    });
  }, [reload]);

  return (
    <>
      <InputComment />
      <Wrapper loading={loading} data={comments}>
        {comments.map((item: any, index: number) => (
          <CommentItem {...item} key={index} />
        ))}
        <View className="h-20"></View>
      </Wrapper>
    </>
  );
}

const CommentItem = (props: any) => {
  return (
    <View className="p-4 border-b-[0.5px] border-black/10">
      <TouchableOpacity className="">
        <Text className="text-black capitalize font-robotoMedium">
          {props.user?.name}
        </Text>
        <Text className="text-black/50 font-roboto">{props.created_at}</Text>
        <Text className="text-black/70 font-roboto leading-7 my-3">
          {props.content}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-row items-center gap-2">
          <View className="flex-row items-center gap-2">
            <AntDesign name="heart" size={12} color="#FF8282" />
            <Text className="font-robotoMedium text-black/70">
              {props.like}
            </Text>
          </View>
          <Text className="text-black/70 font-roboto">&bull;</Text>
          <TouchableOpacity className="flex-row items-center gap-2">
            <Text className="font-robotoMedium text-black/70">Balas</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={"more-vert"} size={16} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
