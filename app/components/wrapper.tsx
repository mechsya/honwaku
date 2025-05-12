import React, { ReactNode } from "react";
import { View, Image } from "react-native";
import Loading from "./loading";
import { cn } from "./cn";

type Wrapper = {
  children: ReactNode | ReactNode[];
  loading: boolean;
  data: any[] | any;
};

export default function Wrapper(props: Wrapper) {
  return (
    <>
      {props.loading ? (
        <Loading />
      ) : props.data.length === 0 ? (
        <NotFound />
      ) : (
        props.children
      )}
    </>
  );
}

const NotFound = () => (
  <View className={cn("h-60 justify-center items-center")}>
    <Image
      style={{ width: 150, height: 150 }}
      source={require("@/assets/images/not-found.png")}
    />
  </View>
);
