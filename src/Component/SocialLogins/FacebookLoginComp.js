import React from 'react'
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComp = () => {
    const responseFacebook = (response) => {
        console.log(response);
    }
    return (
        <div>
            <div className="d-flex justify-content-center py-3">
                <div className="d-flex bg-primary text-white justify-content-between align-items-center p-0 m-0 border-0 ">
                    <div className="google-icon-wrapper">
                        <div className='fa fa-facebook' style={{ paddingLeft: '10px' }}>
                            <FacebookLogin
                                cssClass="bg-primary text-white px-2 py-3 border-0"
                                appId="327329217289691"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacebookLoginComp