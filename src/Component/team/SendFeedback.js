import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../base_url/config';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useColor } from '../../commanapi/ColorProvider';
import Loader from 'react-spinners/SyncLoader';
import { toast } from 'react-toastify';
import moment from 'moment';

const SendFeedback = () => {
    const { id } = useParams();
    const [teamMembers, setTeamMembers] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
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
        try {
            const feedbackData = {
                team_id: id,
                message: feedback,
                receiver_id: selectedMembers,
            };
            axiosConfig.post(`/create/feedback`, feedbackData, config)
                .then(response => {
                    toast.success("Private Feedback Sent Successfully", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                    setSelectedMembers([]);
                    checkCurrentFeedback();
                    // setSendFeedback(checkLeader);
                })
                .catch(error => {
                    console.error("Error sending feedback:", error);
                    toast.error("Failed to send feedback", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };
    const handleEditFeedback = async (value, receiver_id) => {
        setSendFeedback("");
        setFeedback(value);
        setCheckLeader("");
        setSelectedMembers([receiver_id]);
    };

    const handleSelectAll = (e) => {
        const { checked } = e.target;
        setSelectAll(checked);
        if (checked) {
            const allMemberIds = teamMembers.map(member => member.id);
            setSelectedMembers(allMemberIds);
        } else {
            setSelectedMembers([]);
        }
    };

    const handleCheckboxChange = (e, memberId) => {
        const { checked } = e.target;
        setSelectedMembers(prevState => {
            if (checked) {
                return [...prevState, memberId];
            } else {
                return prevState.filter(id => id !== memberId);
            }
        });
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
                                    <div className='col-2'>
                                        <ul className="pl-0 text-left">
                                            <li className="form-check">
                                                {checkLeader ? <><input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="selectAll"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                />
                                                    <label className="form-check-label pl-2" htmlFor="selectAll"><b>All Members</b></label></> : ""}
                                            </li>
                                            {teamMembers.length > 0 && teamMembers.map(member => (
                                                <li key={member.id} className="form-check mt-2">
                                                    {checkLeader ? <><input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={`member-${member.id}`}
                                                        checked={selectedMembers.includes(member.id)}
                                                        onChange={(e) => handleCheckboxChange(e, member.id)}
                                                    />
                                                    </> : ""}
                                                    <label className="form-check-label pl-2" htmlFor={`member-${member.id}`}>{member?.name}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-1">
                                        <div className="border-right" style={{ height: '100%', borderRight: '5px solid #ddd' }}></div>
                                    </div>
                                    <div className='col-9 d-flex flex-column'>
                                        {sendFeedback && (
                                            <>
                                                <p className='feedback-reply'>{sendFeedback}
                                                    <div className='feedback-timestamp'>
                                                        <small>{moment(sendFeedback.created_at).format('LLL')}</small>
                                                        {/* <i className="fa fa-edit pl-2" title="Edit Feedback " onClick={() => handleEditFeedback(sendFeedback)}></i> */}
                                                    </div>
                                                </p>
                                            </>
                                        )}
                                        {
                                            /* {checkLeader && (
                                                <>
                                                    <p className='feedback-reply'>{checkLeader?.message}<i className="fa fa-edit" title="Edit Feedback " onClick={() => handleEditFeedback(checkLeader?.message)}></i></p>
                                                </>
                                            )} */

                                        }
                                        {checkLeader && (
                                            checkLeader.map((leader, index) => (
                                                <div key={index}>
                                                    <p className='feedback-reply'>
                                                        {leader.message}
                                                        <div className='feedback-timestamp'>
                                                        <small>{moment(sendFeedback.created_at).format('LLL')}</small>
                                                        {/* <i className="fa fa-edit pl-2" title="Edit Feedback " onClick={() => handleEditFeedback(sendFeedback)}></i> */}
                                                    </div>
                                                        {/* <i className="fa fa-edit" title="Edit Feedback" onClick={() => handleEditFeedback(leader?.message, leader?.receiver_id)}></i> */}
                                                    </p>
                                                </div>
                                            ))
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
                                                        className={`mt-1 ${selectedMembers.length > 0 ? 'input-group-text private_feedback' : ''}`}
                                                        onClick={handleSendFeedback}
                                                        type="submit"
                                                        style={{
                                                            height: "50px",
                                                            cursor: selectedMembers.length > 0 ? 'pointer' : 'not-allowed',
                                                        }}
                                                        disabled={selectedMembers.length === 0}
                                                    >
                                                        Send Feedback
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {loader === true ? <Loader /> : ""}
                            </div>
                        </div>
                    </section>
                </Sidebar>
            </div>
        </div>
    );
};

export default SendFeedback;
