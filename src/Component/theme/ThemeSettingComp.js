import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { useState } from 'react';
import axiosConfig from '../../base_url/config';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-spinners/SyncLoader';
import { useColor } from '../../commanapi/ColorProvider';


const ThemeSettingComp = () => {
    const [buttonColor, setButtonColor] = useState('#ffffff');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#ffffff');
    const [load, setLoad] = useState(false);
    const { changeColor } = useColor();
    useEffect(() => {
        getThemeColor();
    }, '');

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
        setButtonColor(data?.data?.button_color);
        setBackgroundColor(data?.data?.background_color);
        setTextColor(data?.data?.text_color);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoad(true);
            const { data } = await axiosConfig.post(
                `/set/theme/color`,
                {
                    button_color: buttonColor,
                    background_color: backgroundColor,
                    text_color: textColor,
                },
                config
            );
            setLoad(false);
            changeColor({
                backgroundColor: data?.data?.background_color,
                buttonColor: data?.data?.button_color,
                textColor: data?.data?.text_color
            });
            toast.success(`Theme Setting Successfully!`, {
                position: "bottom-right",
                autoClose: 2000,
            });
        } catch (error) {
            console.log(' Theme Set Color error', error);
        }
    };
    return (
        <>
            <div className="main-body" style={{ backgroundColor: 'white' }}>
                <Sidebar />
                <div className="body-wrapper" id="body-content">
                    <Header />
                    <form className="post-comment-form mt-5 ml-5" onSubmit={handleSubmit} style={{ backgroundColor: 'white' }}>
                        <div className="row g-3">
                            <div className="col-3">
                                <label htmlFor="buttonInput">Button color</label>
                                <input type="color" id="buttonInput" className="form-control" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} aria-label="Button" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="backgroundInput">Background color</label>
                                <input type="color" id="backgroundInput" className="form-control" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} aria-label="Background" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="textInput">Text color</label>
                                <input type="color" id="textInput" className="form-control" value={textColor} onChange={(e) => setTextColor(e.target.value)} aria-label="Text" />
                            </div>
                        </div>
                        <div className="input-group-append " style={{"width": "75%",justifyContent:"center",marginTop: "23px"}}>
                            <button type="submit" style={{ cursor: 'pointer' }} className="input-group-text context-button">
                                Set Theme
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            {load === true ? <Loader /> : <></>}
            <ToastContainer />
        </>
    )
}

export default ThemeSettingComp