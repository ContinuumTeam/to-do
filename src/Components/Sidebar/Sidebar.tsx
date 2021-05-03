import React from 'react';

// import { Container } from './styles';
import './SidebarStyle.css'

//icons
import { BiMenuAltRight, BiCalendarAlt } from 'react-icons/bi'

function Sidebar() {
  return (
    <div className="sidebar" >

      <a href="asdad" className="menu-button"><BiMenuAltRight size={30} /></a>

      <div className="menu-itens">
        <button className="item active"><span>W</span></button>
        <button className="item" ><span>F</span></button>
        <button className="item"><span>S</span></button>
        <button className="item"><span>P</span></button>
        <button className="item"><span>+</span></button>
      </div>

      <a href="ads" className="menu-button"><BiCalendarAlt size={30} /></a>
    </div >
  );
}

export default Sidebar;