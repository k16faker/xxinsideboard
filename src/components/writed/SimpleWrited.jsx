import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataActions } from "../../store/datadrill";

const SimpleWrited = (props) => {
  const { data } = props;

  const dispatch = useDispatch();

  const navigation = useNavigate();

  const dataSendHandler = () => {
    dispatch(dataActions.addData(data));
  };

  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    return (
      date.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second
    );
  }

  return (
    <li
      key={data.id}
      className="flex justify-between border-b border-slate-300 mx-auto p-1 items-center"
    >
      <p className="ml-3 border rounded-lg border-black p-0.5 bg-slate-900 text-slate-50 font-bold">
        {data.tab}
      </p>
      <div className="flex w-11/12 justify-between mr-2">
        <p
          onClick={() => {
            navigation(`/${data.key}`);
            dataSendHandler();
          }}
        >
          {data.title}
        </p>
        <p>{data.name}</p>
      </div>
    </li>
  );
};

export default SimpleWrited;
