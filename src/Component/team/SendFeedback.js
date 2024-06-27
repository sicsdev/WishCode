import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../base_url/config';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useColor } from '../../commanapi/ColorProvider';

const SendFeedback = () => {
    const { id } = useParams();
    const [teamMembers, setTeamMembers] = useState([]);
    const [feedback, setFeedback] = useState('');
    const { isToggleOpen, toggleMenu } = useColor();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        getTeamMembers(id);
    }, [id]);

    const getTeamMembers = async (id) => {
        try {
            const { data } = await axiosConfig.get(`/get/single/team/${id}`, config);
            setTeamMembers(data?.data?.users || []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSendFeedback = () => {
        console.log(`Sending feedback: ${feedback}`);
        setFeedback('');
    };
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Sidebar>
            </div>
        </div>
    );
};

export default SendFeedback;
