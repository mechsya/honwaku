import { View } from "react-native";
import Seperator from "../seperator";
import CardNovel from "../ui/card-novel";
import { useEffect, useState } from "react";
import { get } from "@/utils/fetch";
import { Novel } from "@/types/novel";
import Wrapper from "../wrapper";

export default function Recomendation() {
  const [novels, setNovel] = useState<Novel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    get({ url: "novel/recomendation", setter: setNovel, loading: setLoading });
  }, []);

  return (
    <View className="p-4">
      <Seperator label={"Rekomendasi novel minggu ini"} />
      <Wrapper loading={loading} data={novels}>
        {novels.map((item, index) => (
          <CardNovel {...item} key={index} />
        ))}
      </Wrapper>
    </View>
  );
}
