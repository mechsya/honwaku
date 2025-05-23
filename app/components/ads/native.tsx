import { useEffect, useState } from "react";
import {
  NativeAd,
  NativeAdView,
  NativeMediaAspectRatio,
  NativeMediaView,
  TestIds,
} from "react-native-google-mobile-ads";

export default function NativeAds() {
  const [nativeAd, setNativeAd] = useState<NativeAd>();

  useEffect(() => {
    NativeAd.createForAdRequest("ca-app-pub-9927932498877675/2607457788", {
      aspectRatio: NativeMediaAspectRatio.SQUARE,
      startVideoMuted: false,
    })
      .then(setNativeAd)
      .catch(console.error);
  }, []);

  if (!nativeAd) {
    return null;
  }

  return (
    <NativeAdView
      style={{
        width: 250,
        margin: "auto",
      }}
      nativeAd={nativeAd}
    >
      <NativeMediaView />
    </NativeAdView>
  );
}
