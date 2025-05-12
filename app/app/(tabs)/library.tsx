import Container from "@/components/container";
import Bookmark from "@/components/library/bookmark";
import History from "@/components/library/history";
import Navbar from "@/components/library/navbar";
import { renderComponentAtom } from "@/hooks/library";
import { useAtomValue } from "jotai";

export default function LibraryScreen() {
  const renderComponent = useAtomValue(renderComponentAtom);

  return (
    <Container>
      <Navbar />
      {renderComponent === "riwayat bacaan" ? <History /> : null}
      {renderComponent === "bookmark" ? <Bookmark /> : null}
    </Container>
  );
}
