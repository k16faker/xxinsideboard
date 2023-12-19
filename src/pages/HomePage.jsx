import { useEffect, useState, useRef } from "react";
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
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const navigation = useNavigate();
  const [data, setData] = useState();
  const [selectedTab, setSelectedTab] = useState("전체");
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  const [map, setMap] = useState(null);
    const ref = useRef();

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
    if (isSearching) {
      const filteredData = [];
      data
        .filter((item) => item.title.includes(searchData))
        .map((data) => filteredData.push(data));
      setFilteredData(filteredData);
    } else if (!isSearching) {
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
    data
      .filter((item) => item.title.includes(e.target.value))
      .map((data) => filteredData.push(data));
    setFilteredData(filteredData);
    console.log(filteredData);
    console.log(isSearching);
  };

  const checkLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  function getUserLocation(callback) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        callback(lat, lon);
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }

  const fetchWeather = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
    console.log(data);
  };

  useEffect(() => {
    dataLoadHandler();
    getUserLocation((lat, lon) => {
      fetchWeather(lat, lon);
      const newMap = new window.google.maps.Map(ref.current, {
        center : { lat: lat, lng: lon},
        zoom : 16,
    });     
    
    setMap(newMap);
    });
  }, []);

  let clothes;
  if(weatherData.main?.temp < 0) {
    clothes = "패딩, 두꺼운 코트, 목도리, 기모제품, 기모속옷, 기모바지, 기모양말, 장화, 장갑, 귀마개, 모자"
  } else if(weatherData.main?.temp < 10 && weatherData.main?.temp >= 0) {
    clothes = "코트, 가죽자켓, 히트텍, 니트, 기모제품, 기모속옷, 기모바지, 기모양말, 장화, 장갑, 귀마개, 모자"
  } else if(weatherData.main?.temp < 20 && weatherData.main?.temp >= 10) {
    clothes = "자켓, 가디건, 야상, 청자켓, 니트, 스타킹, 청바지, 면바지, 슬랙스, 스커트, 원피스, 가죽신, 구두, 부츠, 스니커즈, 베레모, 모자"
  } else if(weatherData.main?.temp < 25 && weatherData.main?.temp >= 20) {
    clothes = "얇은 가디건, 긴팔티, 면바지, 슬랙스, 스커트, 원피스, 샌들, 구두, 스니커즈, 베레모, 모자"
  } else if(weatherData.main?.temp >= 25) {
    clothes = "민소매, 반팔, 반바지, 원피스, 샌들, 슬리퍼, 스니커즈, 모자"
  }




  return (
    <div className="w-full text-center mt-10 lg:flex md:grid sm:grid">
      <div className="lg:w-4/12 md:w-11/12 sm:w-11/12 border-2 border-slate-400 m-2">
        <div className="flex mt-4 w-1/2 mx-auto justify-between">
          <div className="border py-1 px-2 rounded-lg bg-slate-700 text-slate-100">
            <p>현재 온도</p>
            <p>{weatherData.main?.temp ? weatherData.main?.temp : 'Loading...'}</p>
          </div>
          <div className="border py-1 px-2 rounded-lg bg-slate-700 text-slate-100">
            <p>체감 온도</p>
            <p>{weatherData.main?.feels_like ? weatherData.main?.feels_like : 'Loading...'}</p>
          </div>
          <div className="border py-1 px-2 rounded-lg bg-slate-700 text-slate-100">
            <p>현재 습도</p>
            <p>{weatherData.main?.humidity ? weatherData.main?.humidity : 'Loading...'}</p>
          </div>
        </div>
        <div className="my-10 border py-1 px-2 rounded-lg bg-slate-700 text-slate-100 w-3/12 mx-auto">
          <p>날씨</p>
          <p>{weatherData.weather?.[0].description ? weatherData.weather?.[0].description : 'Loading...'}</p>
        </div>
        <div className="my-5 border py-1 px-2 rounded-lg bg-slate-700 text-slate-100 mx-10">
          <p>옷 추천</p>
          {clothes}
        </div>
        <div>
          <h2 className="bold">현재 위치</h2>
        </div>
        <div className="w-8/12 my-10 text-center mx-auto">
          <div className="mx-auto" ref={ref} id="map" style={{width:"80%", height: "400px"}}></div>
        </div>
      </div>
      <div className="lg:w-4/12 sm:w-11/12 md:w-11/12 mx-auto">
        <div className="mx-auto text-left justify-between flex">
          <div>
            <button
              onClick={() => setSelectedTab("전체")}
              className="border border-slate-400 py-1 px-2"
            >
              전체
            </button>
            <button
              onClick={() => setSelectedTab("자유")}
              className="border border-slate-400 py-1 px-2"
            >
              자유
            </button>
            <button
              onClick={() => setSelectedTab("공지")}
              className="border border-slate-400 py-1 px-2"
            >
              공지
            </button>
            <button
              onClick={() => setSelectedTab("질문")}
              className="border border-slate-400 py-1 px-2"
            >
              질문
            </button>
          </div>
          <div className="mr-2">
            <p>작성자</p>
          </div>
        </div>
        <ul className="border-2 border-black mx-auto">
          {!isSearching &&
            selectedTab === "전체" &&
            data &&
            data.map((data) => <SimpleWrited key={data.key} data={data} />)}
          {!isSearching &&
            selectedTab === "자유" &&
            data &&
            data
              .filter((data) => data.tab === "자유")
              .map((data) => <SimpleWrited key={data.key} data={data} />)}
          {!isSearching &&
            selectedTab === "공지" &&
            data &&
            data
              .filter((data) => data.tab === "공지")
              .map((data) => <SimpleWrited key={data.key} data={data} />)}
          {!isSearching &&
            selectedTab === "질문" &&
            data &&
            data
              .filter((data) => data.tab === "질문")
              .map((data) => <SimpleWrited key={data.key} data={data} />)}
          {isSearching &&
            selectedTab === "전체" &&
            filteredData &&
            filteredData.map((data) => (
              <SimpleWrited key={data.key} data={data} />
            ))}
          {isSearching &&
            selectedTab === "자유" &&
            filteredData &&
            filteredData
              .filter((data) => data.tab === "자유")
              .map((data) => <SimpleWrited key={data.key} data={data} />)}
          {isSearching &&
            selectedTab === "공지" &&
            filteredData &&
            filteredData
              .filter((data) => data.tab === "공지")
              .map((data) => <SimpleWrited key={data.key} data={data} />)}
          {isSearching &&
            selectedTab === "질문" &&
            filteredData &&
            filteredData
              .filter((data) => data.tab === "질문")
              .map((data) => <SimpleWrited key={data.key} data={data} />)}
        </ul>
        <div className="mx-auto w-4/12 text-center">
          <input
            type="text"
            className="border border-slate-400 py-1 px-2 mt-2"
            placeholder="검색어를 입력하세요."
            onChange={searchHandler}
          />
        </div>
        <div className="text-right mx-auto">
          <button
            onClick={() => navigation("/writing")}
            className="border border-slate-400 py-1 px-2 mt-2"
          >
            글쓰기
          </button>
        </div>
      </div>
      <div className="w-4/12"></div>
    </div>
  );
};

export default HomePage;
