import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function Banner({ id }: { id?: string }) {
  return (
    <BannerAd
      unitId={id ? id : TestIds.BANNER}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
  );
}
