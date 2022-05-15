import React from "react";
import S from "./SideBar.module.css";
function SideBar() {
  return (
    <div>
      <div className={S.search}>
          <label>Search a breed</label>
        <form>
          <input type="text" className={S.breed} autoComplete="off"></input>
          <button className={S.button} onClick={e => e.preventDefault()}>Search</button>
        </form>
      </div>

      <div className={S.filter}></div>
    </div>
  );
}
export default SideBar;
