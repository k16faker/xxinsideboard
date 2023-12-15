import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { app } from "../components/firebase";
import {
  getFirestore,
  onSnapshot,
  collection,
  getDoc,
} from "firebase/firestore";

import SimpleWrited from "../components/writed/SimpleWrited";

const HomePage = () => {

  const navigation = useNavigate();
  const [data, setData] = useState();
  const [selectedTab, setSelectedTab] = useState("전체");

  const db = getFirestore(app);

  const dataLoadHandler = async () => {
    const dataCollection = collection(db, "posts");

    onSnapshot(dataCollection, (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push(doc.data());
      });
      postsData.sort((a, b) => b.date - a.date);
      setData(postsData);
    });
    console.log(data);
  };


  useEffect(() => {
    dataLoadHandler();
  }, []);

  return (
    <div className="w-full text-center mt-10">
      <div className="mx-auto w-4/12 text-left">
        <button onClick={() => setSelectedTab("전체")} className="border border-slate-400 py-1 px-2">전체</button>
        <button onClick={() => setSelectedTab("자유")} className="border border-slate-400 py-1 px-2">자유</button>
        <button onClick={() => setSelectedTab("공지")} className="border border-slate-400 py-1 px-2">공지</button>
        <button onClick={() => setSelectedTab("질문")} className="border border-slate-400 py-1 px-2">질문</button>
      </div>
      <ul className="border-2 border-black w-4/12 mx-auto">
        {/* {data &&
          data.map((data) => <SimpleWrited key={data.key} data={data} />)} */}
          { selectedTab === "전체" && data && data.map((data) => <SimpleWrited key={data.key} data={data} />)}
          { selectedTab === "자유" && data && data.filter((data) => data.tab === "자유").map((data) => <SimpleWrited key={data.key} data={data} />)}
          { selectedTab === "공지" && data && data.filter((data) => data.tab === "공지").map((data) => <SimpleWrited key={data.key} data={data} />)}
          { selectedTab === "질문" && data && data.filter((data) => data.tab === "질문").map((data) => <SimpleWrited key={data.key} data={data} />)}
      </ul>
      <div className="text-right w-4/12 mx-auto">
        <button onClick={() => navigation("/writing")} className="border border-slate-400 py-1 px-2 mt-2">
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default HomePage;
