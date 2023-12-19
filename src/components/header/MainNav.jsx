import { useState } from "react";
import { Link } from "react-router-dom";

import DropDown from "../forms/Dropdown";

const MainNav = () => {
  const [isView, setIsView] = useState(false);

  return (
    <header className="justify-between flex h-12 items-center bg-slate-700">
      <div className="w-1/12 text-center">
        <h1 className="font-bold text-3xl text-slate-100"><Link to='/'>XX-Inside</Link></h1>
      </div>
      <div className="w-1/6 text-center">
        <nav>
          <ul className="flex text-xl text-slate-100 md:hidden sm:hidden mx-auto w-2/3 float-left">
            <li className="hover:text-stone-300 bg-transparent hover:scale-125 mx-auto">
              <Link to="/">게시글</Link>
            </li>
            <li className="hover:text-stone-300 bg-transparent hover:scale-125 mx-auto">
              <Link to="/writing">글 작성</Link>
            </li>
          </ul>
        </nav>
        <ul className="lg:hidden mr-6 text-slate-100 absolute items-center content-center" onClick={() => setIsView(!isView)} >
          menu{" "}
          {isView ? '⌃' : '⌄'}
          {isView && <DropDown className="bg-slate-700 text-slate-100"/>}
        </ul>
      </div>
    </header>
  );
};

export default MainNav;
