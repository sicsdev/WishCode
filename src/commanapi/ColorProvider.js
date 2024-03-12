import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosConfig from '../base_url/config';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {

  const [color, setColor] = useState({
    backgroundColor: '',
    buttonColor: '',
    textColor: ''
  });

  useEffect(() => {
    getThemeColor();
  }, '');
  //get token
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  //for get the theme color 
  const getThemeColor = async () => {
    const { data } = await axiosConfig.get(
      "/get/theme/color",
      config
    );
    changeColor({
      backgroundColor: data?.data?.background_color || `#aa504f`,
      buttonColor: data?.data?.button_color || `#fff`,
      textColor: data?.data?.text_color || `#000000`
    });
  };
 
  //for change color of theme
  const changeColor = (newColor) => {
    setColor(newColor);
    document.documentElement.style.setProperty('--background-color', newColor.backgroundColor);
    document.documentElement.style.setProperty('--button-color', newColor.buttonColor);
    document.documentElement.style.setProperty('--text-color', newColor.textColor);
  };
  // console.log("first",color);
  return (
    <ColorContext.Provider value={{ color, changeColor }}>
      {children}
    </ColorContext.Provider>
  );
};