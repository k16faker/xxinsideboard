import { Link } from "react-router-dom";

const DropDown = () => {
  return (
    <ul className="list-none border-2 rounded-xl text-black">
      <li className="my-3 hover:text-stone-300 hover:scale-125">
        <Link to="/">게시판</Link>
      </li>
      <li className="hover:text-stone-300 hover:scale-125">
        <Link to="/writing">글 작성</Link>
      </li>
    </ul>
  );
};

export default DropDown;
