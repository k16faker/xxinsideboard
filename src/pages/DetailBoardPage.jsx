import { Fragment, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { app } from "../components/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const DetailBoardPage = () => {
  const passwordRef = useRef();


  const navigation = useNavigate();
  const data = useSelector((state) => state.data.data);
  const params = useParams();
  const [detailData, setDetailData] = useState(data);

  const db = getFirestore(app);

  const deleteHandler = async ( ) => {
    if(passwordRef.current.value === detailData.password){
      await deleteDoc(doc(db, "posts", params.id));
      alert("삭제되었습니다.")
      navigation("/");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  useEffect(() => {
    setDetailData(data);
  }, []);



  return (
    <Fragment>
      <div className="w-6/12 mx-auto mt-10 border border-slate-500 p-2">
        <div className="flex items-center border-y border-slate-500 p-2 bg-slate-300">
          <p className=" border rounded-lg border-black p-0.5 bg-slate-900 text-slate-50 font-bold">
            {detailData.tab}
          </p>
          <p className="ml-5">{detailData.title}</p>
        </div>
        <div className="flex items-center p-2 border-b border-slate-500">
          <p>{detailData.name}</p>
        </div>
        <div>
          <p className="p-3 mt-3">{detailData.content}</p>
        </div>
        <div className="border-t border-slate-500 p-3">
          <input type="text" placeholder="글 비밀번호" ref={passwordRef} className="border border-slate-500 p-1" />
          <button onClick={deleteHandler} className="border p-2">삭제</button>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailBoardPage;
