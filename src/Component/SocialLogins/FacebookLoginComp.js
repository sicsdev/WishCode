import React from 'react'
import FacebookLogin from 'react-facebook-login';
import axiosConfig from '../../base_url/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useColor } from '../../commanapi/ColorProvider';

const FacebookLoginComp = () => {
    const navigate = useNavigate();
    const myFacebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
    const {changeColor}=useColor();
    const facebookAuthBackend = async (response) => {
        console.log(response);
        let facebookData = {
            access_token: response?.accessToken,
            provider: 'facebook',
        }
        const data = await axiosConfig.post("/social/auth", facebookData);
        localStorage.setItem("role", data?.data?.data?.role_id);
        localStorage.setItem("userName", data?.data?.data?.name);
        localStorage.setItem("token", data?.data?.token);
        changeColor({
            backgroundColor: "#aa504f",
            buttonColor: "#fff",
            textColor: "#000000",
            buttonTextColor: "#000000",
          });
        setTimeout(() => {
            if (data?.data?.data?.role_id == 4) {
                navigate("/products");
            }
            toast.success("login successfully", {
                position: "bottom-right",
                autoClose: 2000,
            });
        }, 1000);
    }
    return (
        <div>
            <div className="d-flex justify-content-center py-3" >
                <div className="d-flex bg-primary text-white justify-content-between align-items-center p-0 m-0 border-0 " >
                    <div className="google-icon-wrapper">
                        <div className='d-flex align-items-center gap-5 facebook-setting '>
                        <div className='icon-setting'><i class="fa fa-facebook" aria-hidden="true"></i></div>
                            <FacebookLogin
                                cssClass="bg-primary text-white px-2 py-3 border-0 pointer-cursor"
                                appId={myFacebookAppId}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={facebookAuthBackend}
                                style={{ cursor: 'pointer'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacebookLoginComp