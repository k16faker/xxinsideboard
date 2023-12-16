import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { app } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const WritingForm = () => {
  const navigation = useNavigate();
  const [tab, setTab] = useState("");
  const nameRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const passwordRef = useRef();

  const db = getFirestore(app);

  const dataUploadHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const title = titleRef.current.value;
    const insertedTab = tab;
    const content = contentRef.current.value;
    const password = passwordRef.current.value;
    const data = {
      name: name,
      title: title,
      tab: insertedTab,
      content: content,
      password: password,
      date: new Date(),
      key: Math.random().toString(36).substring(2, 11),
    };
    // if tab is empty, alert and don't upload
    if (insertedTab === "") {
      alert("탭을 선택해주세요.");
      return;
    }
    await setDoc(doc(db, "posts", data.key), data);
    alert("게시글이 작성되었습니다.");
    titleRef.current.value = "";
    contentRef.current.value = "";
    nameRef.current.value = "";
    passwordRef.current.value = "";
    navigation("/");
  };

  return (
    <div className="mt-16">
      <form onSubmit={dataUploadHandler} className="grid text-center">
        <h2>게시글 작성</h2>
        <div className="w-4/12 mx-auto mb-3">
          <input
            type="text"
            placeholder="이름"
            className="w-3/12 mx-auto text-center border-2 rounded-xl border-black"
            ref={nameRef}
            required
          />
          <input
            type="text"
            placeholder="비밀번호(숫자 4자리)"
            className="w-9/12 mx-auto text-center border-2 rounded-xl border-black"
            pattern="[0-9]+"
            minLength="4"
            maxLength="4"
            ref={passwordRef}
            required
          />
        </div>
        <input
            type="text"
            placeholder="제목"
            className="w-4/12 mx-auto text-center border-2 rounded-xl border-black"
            ref={titleRef}
            required
          />
        <div className="mb-3">
          <input
            type="radio"
            name="tab"
            id="자유"
            value="자유"
            onChange={(e) => setTab(e.target.value)}
          />{" "}
          자유{" "}
          <input
            type="radio"
            name="tab"
            id="질문"
            value="질문"
            onChange={(e) => setTab(e.target.value)}
          />{" "}
          질문{" "}
          <input
            type="radio"
            name="tab"
            id="공지"
            value="공지"
            onChange={(e) => setTab(e.target.value)}
          />{" "}
          공지{" "}
        </div>
        <textarea
          placeholder="내용"
          rows={10}
          className="w-4/12 mx-auto text-center border-2 rounded-xl mt-3 border-black"
          ref={contentRef}
          required
        />
        <button className="border-2 rounded-xl p-1.5 w-20 mx-auto mt-3 text-white bg-sky-500">
          submit
        </button>
      </form>
    </div>
  );
};

export default WritingForm;
