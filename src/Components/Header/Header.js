import React, { useState } from "react";
import { Link } from "react-router-dom";
import i18n from '../../config/i18n'


import ModalLoading from "../ModalLoading/ModalLoading";

import "./Header.css";

const Header = () => {
  //Toogle for open modal loading animation
  const [isLoading, setIsLoading] = useState(false)

  //HANDLE FOR CHANGE LANGUAGE
  const onChangeLang = (lang) => {
    i18n.changeLanguage(lang)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    },300)
  }

  return (
    <div className="header">
      <div className="header_logo_lang">
        <Link to="/">
          <img className="logo" src="logo192.png" alt="logo" />
        </Link>
        <select 
          className="form-select form-select-lg" 
          style={{width: '100px'}} 
          aria-label="Default select example" 
          onChange={(e) => onChangeLang(e.target.value)}
          defaultValue={"kk"}>
          <option value="kk">Қаз</option>
          <option value="ru">Рус</option>
          <option value="en">Eng</option>
        </select>
      </div>
      {
        isLoading && <ModalLoading isLoading={isLoading}/>
      }
    </div>
  );
};

export default Header;
