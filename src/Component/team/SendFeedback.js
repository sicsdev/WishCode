import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../base_url/config';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useColor } from '../../commanapi/ColorProvider';
import Loader from 'react-spinners/SyncLoader';

const SendFeedback = () => {
    const { id } = useParams();
    const [teamMembers, setTeamMembers] = useState([]);
    const [feedback, setFeedback] = useState('');
    const { isToggleOpen, toggleMenu, checkLeader, setCheckLeader, checkCurrentFeedback } = useColor();
    const [sendFeedback, setSendFeedback] = useState('');
    const token = localStorage.getItem('token');
    const [loader, setLoader] = useState(false);
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        getTeamMembers(id);
        checkCurrentFeedback();
    }, [id]);

    const getTeamMembers = async (id) => {
        try {
            setLoader(true);
            const { data } = await axiosConfig.get(`/get/single/team/${id}`, config);
            setTeamMembers(data?.data?.users || []);
            setLoader(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSendFeedback = async () => {
        setFeedback('');
        setSendFeedback(feedback);
        try {
            const feedbackData = {
                team_id: id, // Ensure you have the team ID here
                message: feedback
            };
            const { data } = await axiosConfig.post("/create/feedback", feedbackData, config);
            console.log("Response:", data);
        } catch (error) {
            console.log(error)
        }
    };
    const handleEditFeedback = async (value) => {
        setSendFeedback("");
        setFeedback(value)
        setCheckLeader("");
    }
    return (
        <div>
            <div className="main-body">
                <Sidebar isToggleOpen={isToggleOpen} toggleMenu={toggleMenu}>
                    <Header isToggleOpen={isToggleOpen} toggleMenu={toggleMenu} />
                    <section className="body-content-inner">
                        <div className="container dashboard">
                            <div className="dashboard card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="text-white text-uppercase">Send Feedback to members</h5>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-3'>
                                        {teamMembers.length > 0 && teamMembers.map(member => (
                                            <p key={member.id} className='mt-2'>{member?.name}</p>
                                        ))}
                                    </div>
                                    <div className="col-1">
                                        <div className="border-right" style={{ height: '100%', borderRight: '5px solid #ddd' }}></div>
                                    </div>

                                    <div className='col-8 d-flex flex-column'>
                                        {sendFeedback && (
                                            <>
                                                <p className='feedback-reply'>{sendFeedback}<i className="fa fa-edit" title="Edit Feedback " onClick={() => handleEditFeedback(sendFeedback)}></i></p>
                                            </>
                                        )} {checkLeader && (
                                            <>
                                                <p className='feedback-reply'>{checkLeader?.message}<i className="fa fa-edit" title="Edit Feedback " onClick={() => handleEditFeedback(checkLeader?.message)}></i></p>
                                            </>
                                        )}
                                        {!sendFeedback && (
                                            <div className="mt-5 d-flex">
                                                <textarea
                                                    className="form-control mr-2"
                                                    placeholder="Type your feedback here..."
                                                    value={feedback}
                                                    onChange={handleFeedbackChange}
                                                    style={{ flex: 1 }}
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="input-group-text private_feedback mt-1"
                                                        onClick={handleSendFeedback}
                                                        type="submit"
                                                        style={{ height: "50px", cursor: 'pointer' }}
                                                    >
                                                        Send Feedback
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {loader == true ? <Loader /> : ""}
                            </div>
                        </div>
                    </section>
                </Sidebar>
            </div>
        </div>
    );
};

export default SendFeedback;
