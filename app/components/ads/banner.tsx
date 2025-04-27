import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

export default function Banner() {
  return (
    <BannerAd
      unitId={"ca-app-pub-9927932498877675/8463269754"}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
  );
}
