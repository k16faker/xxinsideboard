import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DetailBoardPage = () => {
  const data = useSelector((state) => state.data.data);
  const params = useParams();
  const [detailData] = useState(data);
  console.log(data);
  console.log(params);
  return (
    <Fragment>
      <div className="w-6/12 mx-auto mt-10 border border-slate-500 p-1">
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
          <button className="border p-2">삭제</button>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailBoardPage;