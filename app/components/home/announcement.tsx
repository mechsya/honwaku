import { Text, TouchableOpacity, View } from "react-native";
import Seperator from "../seperator";
import { useEffect, useState } from "react";
import { BASE_URL, get } from "@/utils/fetch";
import Wrapper from "../wrapper";
import * as WebBrowser from "expo-web-browser";

export default function Announcement() {
  const [announcement, setAnnouncement] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    get({
      url: "announcement/update",
      setter: setAnnouncement,
      loading: setLoading,
    });
  }, []);

  return (
    <View className="p-4">
      <Seperator
        label="Pengumuman"
        button={true}
        onPress={async () =>
          await WebBrowser.openBrowserAsync(BASE_URL + "/announcement/")
        }
      />
      <Wrapper loading={loading} data={announcement}>
        {announcement.map((item: any, index: any) => (
          <ItemAnouncement {...item} key={index} />
        ))}
      </Wrapper>
    </View>
  );
}

function ItemAnouncement(props: any) {
  return (
    <TouchableOpacity
      onPress={() =>
        WebBrowser.openBrowserAsync(BASE_URL + "/announcement/" + props.slug)
      }
      className="py-3 border-b-[0.5px] border-black/10"
    >
      <Text className="font-serif text-lg text-black">{props.title}</Text>
      <Text className="font-roboto text-black/50 text-sm">
        <Text className="text-red-400 capitalize">{props.status}</Text> &bull;
        Diupload {props.updated_at}
      </Text>
    </TouchableOpacity>
  );
}
