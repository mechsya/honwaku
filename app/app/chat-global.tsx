import Container from "@/components/container";
import Navbar from "@/components/chat-global/navbar";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import InputComment from "@/components/chat-global/input";
import { useEffect, useState } from "react";
import { get } from "@/utils/fetch";
import { useAtom, useAtomValue } from "jotai";
import { _reload } from "@/hooks/view";

export default function ChatGlobalScreen() {
  const [globalChat, setGlobalChat] = useState<[] | any>([]);
  const reload = useAtomValue(_reload);

  useEffect(() => {
    get({ url: "global-chat", setter: setGlobalChat });
  }, [reload]);

  return (
    <Container>
      <Navbar />
      <FlatList
        data={globalChat}
        renderItem={(item) => <CommentItem {...item.item} />}
      />
      <InputComment />
    </Container>
  );
}

const CommentItem = (props: any) => {
  return (
    <View className="p-4 border-b-[0.5px] border-black/10">
      <TouchableOpacity className="">
        <Text className="text-black capitalize font-robotoMedium">
          {props.user?.name}
          <Text className="text-black/50 text-sm font-roboto">
            {" "}
            &bull; {props.updated_at}
          </Text>
        </Text>

        <Text className="text-black/70 font-roboto leading-7 mt-2">
          {props.content}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
