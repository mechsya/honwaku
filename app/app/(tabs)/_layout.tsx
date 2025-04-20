import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import Icon from "@/components/icon";
import { COLOR } from "@/constants/color";

const screens = [
  { name: "index", icon: "home", label: "Beranda" },
  { name: "explore", icon: "search", label: "Pencarian" },
  { name: "library", icon: "local-library", label: "Perpustakaan" },
  { name: "profile", icon: "", label: "Profile" },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabContainer,
      }}
    >
      {screens.map((screen, index) => {
        return (
          <Tabs.Screen
            key={index}
            name={screen.name}
            options={{
              tabBarButton: (props: BottomTabBarButtonProps) => (
                <TabBarButton
                  {...props}
                  name={screen.name}
                  icon={screen.icon}
                  label={screen.label}
                />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}

function TabBarButton(props: any) {
  const { icon, name, label, onPress, accessibilityState } = props;

  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-1 flex-col justify-center items-center"
    >
      {name === "profile" ? (
        <Image
          className="rounded-full"
          width={22}
          style={{ width: 22, height: 22 }}
          height={22}
          source={require("@/assets/images/default-profile.png")}
        />
      ) : (
        <Icon
          name={icon}
          size={20}
          color={focused ? COLOR.PRIMARY : COLOR.IN_ACTIVE}
        />
      )}

      <Text
        style={{
          color: focused ? COLOR.PRIMARY : COLOR.IN_ACTIVE,
          fontFamily: "RobotoMedium",
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    borderTopWidth: 0.5,
    shadowColor: "transparent",
    borderColor: "rgba(0,0,0,.1)",
    height: 60,
  },
});
