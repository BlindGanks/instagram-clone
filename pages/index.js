import Head from "next/head";
import Header from "../components/Header.js";
import Feed from "../components/Feed.js";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom.js";
import Modal from "../components/Modal.js";

export default function Home() {
  //const open = useRecoilState(modalState);
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </div>
  );
}
