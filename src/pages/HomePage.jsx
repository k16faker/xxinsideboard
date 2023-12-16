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
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState();
  const [filteredData, setFilteredData] = useState([]);

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
    if( isSearching ) {
      const filteredData = [];
      data.filter((item) => item.title.includes(searchData)).map((data) => filteredData.push(data));
      setFilteredData(filteredData);
    } else if( !isSearching ) {
      setData(data);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
    setSearchData(e.target.value);
    const filteredData = [];
    data.filter((item) => item.title.includes(e.target.value)).map((data) => filteredData.push(data));
    setFilteredData(filteredData);
    console.log(filteredData);
    console.log(isSearching);
  };



  useEffect(() => {
    dataLoadHandler();
  }, []);

  return (
    <div className="w-full text-center mt-10">
      <div className="w-4/12 mx-auto">
        <div className="mx-auto text-left justify-between flex">
          <div>
          <button onClick={() => setSelectedTab("전체")} className="border border-slate-400 py-1 px-2">전체</button>
          <button onClick={() => setSelectedTab("자유")} className="border border-slate-400 py-1 px-2">자유</button>
          <button onClick={() => setSelectedTab("공지")} className="border border-slate-400 py-1 px-2">공지</button>
          <button onClick={() => setSelectedTab("질문")} className="border border-slate-400 py-1 px-2">질문</button>
          </div>
          <div className="mr-2">
            <p>작성자</p>
          </div>
        </div>
        <ul className="border-2 border-black mx-auto">
            { !isSearching && selectedTab === "전체" && data && data.map((data) => <SimpleWrited key={data.key} data={data} />)}
            { !isSearching && selectedTab === "자유" && data && data.filter((data) => (data.tab === "자유")).map((data) => <SimpleWrited key={data.key} data={data} />)}
            { !isSearching && selectedTab === "공지" && data && data.filter((data) => (data.tab === "공지")).map((data) => <SimpleWrited key={data.key} data={data} />)}
            { !isSearching && selectedTab === "질문" && data && data.filter((data) => (data.tab === "질문")).map((data) => <SimpleWrited key={data.key} data={data} />)}
            { isSearching && selectedTab === "전체" && filteredData && filteredData.map((data) => <SimpleWrited key={data.key} data={data} />)}
            { isSearching && selectedTab === "자유" && filteredData && filteredData.filter((data) => (data.tab === "자유")).map((data) => <SimpleWrited key={data.key} data={data} />)}
            { isSearching && selectedTab === "공지" && filteredData && filteredData.filter((data) => (data.tab === "공지")).map((data) => <SimpleWrited key={data.key} data={data} />)}
            { isSearching && selectedTab === "질문" && filteredData && filteredData.filter((data) => (data.tab === "질문")).map((data) => <SimpleWrited key={data.key} data={data} />)}
        </ul>
        <div className="mx-auto w-4/12 text-center">
          <input type="text" className="border border-slate-400 py-1 px-2 mt-2" placeholder="검색어를 입력하세요." onChange={searchHandler} />
        </div>
        <div className="text-right mx-auto">
          <button onClick={() => navigation("/writing")} className="border border-slate-400 py-1 px-2 mt-2">
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
