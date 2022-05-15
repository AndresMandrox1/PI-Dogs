import React from "react";
import {Link} from 'react-router-dom'
import S from './NavBar.module.css'

function NavBar() {
  return (
    <div className={S.container}>
      <Link to='/about'>About</Link>
      <Link to='/home'>Home</Link>
      <Link to='/create'>Create</Link>
    </div>
  );

}

export default NavBar;
