import React, { useState } from "react";
import i18n from '../../config/i18n'

import "./Header.css";

const Header = () => {

  //HANDLE FOR CHANGE LANGUAGE
  const onChangeLang = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="header">
      <div className="header_logo_lang">
        {/* <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link> */}
        <select className="form-select form-select-lg" defaultValue={"ru"} style={{width: '100px'}} aria-label="Default select example" onChange={(e) => onChangeLang(e.target.value)}>
          <option value="kz">Қаз</option>
          <option value="ru" >Рус</option>
        </select>
        {/* <div className="lang">
          <span className="lang_text" onClick={(e) => onChangeLang('kz')} >КАЗ</span>
          <span className="lang_text" onClick={(e) => onChangeLang('ru')}>РУС</span>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
