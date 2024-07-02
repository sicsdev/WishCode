import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosConfig from '../base_url/config';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {

  const [color, setColor] = useState({
    backgroundColor: '',
    buttonColor: '',
    textColor: '',
    buttonTextColor: '',
  });
  const [menus, setMenus] = useState([]);
  const [checkLeader, setCheckLeader] = useState("");
  const currentId = localStorage.getItem('currentId');
  useEffect(() => {
    if (localStorage.getItem('role')) {
      getThemeColor();
      getMenus();
      checkCurrentFeedback();
    }
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
      textColor: data?.data?.text_color || `#000000`,
      buttonTextColor: data?.data?.btn_text_color || `#000000`
    });
  };
  //for get menu 
  const getMenus = async () => {
    const { data } = await axiosConfig.get(
      "/sidebar/menus",
      config
    );
    setMenus(data?.data);
  };
  //for change color of theme 
  const changeColor = (newColor) => {
    setColor(newColor);
    document.documentElement.style.setProperty('--background-color', newColor.backgroundColor);
    document.documentElement.style.setProperty('--button-color', newColor.buttonColor);
    document.documentElement.style.setProperty('--text-color', newColor.textColor);
    document.documentElement.style.setProperty('--button-text-color', newColor.buttonTextColor);
  };
  // for menu of sidebar control
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  //api for check the current id check the privateFeedback show or hide
  const checkCurrentFeedback = async () => {
    try {
      const { data } = await axiosConfig.get(`/check/leader/teams?current_id=${currentId}`, config);
      setCheckLeader(data?.leader);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleMenu = (e) => {
    setIsToggleOpen((prevState) => !prevState);
  };
  return (
    <ColorContext.Provider value={{ menus, color, isToggleOpen, checkLeader, changeColor, getMenus, toggleMenu, setCheckLeader, checkCurrentFeedback }}>
      {children}
    </ColorContext.Provider>
  );
};