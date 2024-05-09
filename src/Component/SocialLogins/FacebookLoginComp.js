import React from 'react'
import FacebookLogin from 'react-facebook-login';
import axiosConfig from '../../base_url/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FacebookLoginComp = () => {
    const navigate = useNavigate();
    const myFacebookAppId = process.env.REACT_APP_GOOGLE_APP_ID;
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
        // console.log(data?.data?.data?.role_id);
        setTimeout(() => {
            toast.success("login successfully", {
                position: "bottom-right",
                autoClose: 2000,
            });
            if (data?.data?.data?.role_id == 4) {
                navigator("/products");
            } else {
                navigate("/dashboard");
            }
        }, 1000);
    }
    return (
        <div>
            <div className="d-flex justify-content-center py-3">
                <div className="d-flex bg-primary text-white justify-content-between align-items-center p-0 m-0 border-0 ">
                    <div className="google-icon-wrapper">
                        <div className='fa ' style={{ paddingLeft: '10px' }}>
                            <FacebookLogin
                                cssClass="bg-primary text-white px-2 py-3 border-0"
                                icon="fa-facebook"
                                appId={myFacebookAppId}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={facebookAuthBackend}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacebookLoginComp