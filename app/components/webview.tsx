import { WebView } from "react-native-webview";

type WebViewProps = {
  uri: string;
};

export default function WebViewRender(props: WebViewProps) {
  return <WebView source={{ uri: props.uri }} style={{ flex: 1 }} />;
}
