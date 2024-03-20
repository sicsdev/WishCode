import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { useState } from 'react';
import axiosConfig from '../../base_url/config';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-spinners/SyncLoader';
import { useColor } from '../../commanapi/ColorProvider';


const ThemeSettingComp = () => {
    const [buttonColor, setButtonColor] = useState('#fff');
    const [backgroundColor, setBackgroundColor] = useState('#aa504f');
    const [textColor, setTextColor] = useState('#000000');
    const [buttonTextColor, setButtonTextColor] = useState('#000000');
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
        setLoad(true);
        const { data } = await axiosConfig.get(
            "/get/theme/color",
            config
        );
        setButtonColor(data?.data?.button_color);
        setBackgroundColor(data?.data?.background_color);
        setTextColor(data?.data?.text_color);
        setButtonTextColor(data?.data?.btn_text_color);
        setLoad(false);
    };
    //function for handle the default theme

    const defaultHandleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoad(true);
            const { data } = await axiosConfig.post(
                `/set/theme/color`,
                {
                    button_color: '#fff',
                    background_color: '#aa504f',
                    text_color: '#000000',
                },
                config
            );
            setLoad(false);
            changeColor({
                backgroundColor: data?.data?.background_color,
                buttonColor: data?.data?.button_color,
                textColor: data?.data?.text_color,
                buttonTextColor: data?.data?.btn_text_color
            });
            setLoad(false);
            setButtonColor('#fff');
            setBackgroundColor('#aa504f');
            setTextColor('#000000');
            setButtonTextColor('#000000');
            toast.success(`Set Default Theme Successfully!`, {
                position: "bottom-right",
                autoClose: 2000,
            });
        } catch (error) {
            console.log(' Theme Set Color error', error);
        }
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
                    btn_text_color: buttonTextColor
                },
                config
            );
            setLoad(false);
            changeColor({
                backgroundColor: data?.data?.background_color,
                buttonColor: data?.data?.button_color,
                textColor: data?.data?.text_color,
                buttonTextColor: data?.data?.btn_text_color,
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
        // <>
        //     <div className="main-body" style={{ backgroundColor: 'white' }}>
        //         <Sidebar />
        //         <div className="body-wrapper" id="body-content">
        //             <Header />
        //             <form className="post-comment-form mt-5 ml-5" onSubmit={handleSubmit} style={{ backgroundColor: 'white' }}>
        //                 <div className="row g-3">
        //                     <div className="col-3">
        //                         <label htmlFor="buttonInput">Button color</label>
        //                         <input type="color" id="buttonInput" className="form-control" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} aria-label="Button" />
        //                     </div>
        //                     <div className="col-3">
        //                         <label htmlFor="backgroundInput">Background color</label>
        //                         <input type="color" id="backgroundInput" className="form-control" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} aria-label="Background" />
        //                     </div>
        //                     <div className="col-3">
        //                         <label htmlFor="textInput">Text color</label>
        //                         <input type="color" id="textInput" className="form-control" value={textColor} onChange={(e) => setTextColor(e.target.value)} aria-label="Text" />
        //                     </div>
        //                 </div>
        //                 <div className="input-group-append " style={{ "width": "75%", justifyContent: "center", marginTop: "23px" }}>
        //                     <button type="submit" style={{ cursor: 'pointer' }} className="input-group-text context-button back-btn">
        //                         Set Theme
        //                     </button>
        //                     <button type="button" onClick={defaultHandleSubmit} style={{ cursor: 'pointer' }} className="input-group-text context-button ml-2 back-btn">
        //                         Default Theme
        //                     </button>
        //                 </div>
        //             </form>

        //         </div>
        //     </div>
        //     {load === true ? <Loader /> : <></>}
        //     <ToastContainer />
        // </>
        <>
            <div className="main-body">
                <Sidebar>
                    <Header />
                    <section className="body-content-inner">
                        <div className="container">
                            <div className="dashboard card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="text-white">THEME SETTING</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <form className="post-comment-form mt-5 ml-5" onSubmit={handleSubmit}>
                                            <div className="d-flex gap-4">
                                                <label className="font-weight-bold w-25  mt-3">Button color : </label>
                                                <input type="color" id="buttonInput" className="form-control w-25 ml-5 mt-3" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} aria-label="Button" />
                                            </div>
                                            <div className="d-flex gap-4">
                                                <label className="font-weight-bold w-25 mt-3">Button Text color : </label>
                                                <input type="color" id="textInput" className="form-control w-25 ml-5 mt-3" value={buttonTextColor} onChange={(e) => setButtonTextColor(e.target.value)} aria-label="Text" />
                                            </div>
                                            <div className="d-flex gap-4">
                                                <label className="font-weight-bold w-25 mt-3">Background color : </label>
                                                <input type="color" id="backgroundInput" className="form-control w-25 ml-5 mt-3" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} aria-label="Background" />
                                            </div>
                                            <div className="d-flex gap-4">
                                                <label className="font-weight-bold w-25 mt-3">Text color : </label>
                                                <input type="color" id="textInput" className="form-control w-25 ml-5 mt-3" value={textColor} onChange={(e) => setTextColor(e.target.value)} aria-label="Text" />
                                            </div>
                                           
                                            <div className="input-group-append " style={{ "width": "75%", justifyContent: "center", marginTop: "23px" }}>
                                                <button type="submit" style={{ cursor: 'pointer' }} className=" btn btn-lg-primary">
                                                    Set Theme
                                                </button>
                                                <button type="button" onClick={defaultHandleSubmit} style={{ cursor: 'pointer' }} className="btn btn-lg-primary ml-2 back-btn">
                                                    Default Theme
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Sidebar>
            </div>
            {load === true ? <Loader /> : <></>}
            <ToastContainer />
        </>
    )
}

export default ThemeSettingComp