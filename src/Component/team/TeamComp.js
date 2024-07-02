import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { useColor } from '../../commanapi/ColorProvider';
import Loader from 'react-spinners/SyncLoader';
import { Button, Modal } from 'react-bootstrap';
import axiosConfig from '../../base_url/config';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import swal from 'sweetalert';
import moment from 'moment';

const TeamComp = () => {
    const { isToggleOpen, toggleMenu } = useColor();
    const [loader, setLoader] = useState(false);
    const [modelHeader, setModelHeader] = useState("Add");
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackData, setFeedbackData] = useState([]);
    const handleCloseFeedbackModal = () => setShowFeedbackModal(false);
    const [totalCompanyUsers, setTotalCompanyUsers] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectLeader, setSelectedLeader] = useState("");
    const [teamMember, setTeamMembers] = useState();
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamId, setTeamId] = useState("");
    const tokens = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
        },
    };

    useEffect(() => {
        getAllTeams();
    }, []);

    const handleTeam = () => {
        setShowModal(true);
        getAllCompanyUsers();
        setModelHeader("Add");
        setTeamName("");
    };

    const getAllCompanyUsers = () => {
        setLoader(true);
        axiosConfig
            .get("/company-admin/user/all", config)
            .then((response) => {
                setLoader(false);
                const users = response?.data?.data?.map(user => ({
                    value: user.id,
                    label: user.name,
                }));
                setTotalCompanyUsers(users);
            })
            .catch((error) => {
                setLoader(false);
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            });
    };

    const handleTeamNameChange = (e) => {
        if (modelHeader === "Add") {
            setTeamName(e.target.value);
        } else {
            setSelectedTeam(e.target.value);
        }
    };

    const handleMembersChange = (selectedOptions) => {
        setSelectedMembers(selectedOptions);
    };

    const handleLeaderChange = (selectedOptions) => {
        setSelectedLeader(selectedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
        if (modelHeader === "Add") {
            axiosConfig.post(`/create/team`, {
                name: teamName,
                user_id: selectedMembers,
                type: "add",
                leader_id: selectLeader?.value,
            }, config)
                .then(response => {
                    setShowModal(false);
                    setTeamMembers(prev => [...prev, response?.data?.data]);
                    toast.success("Team Added Successfully", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                });
        } else {
            axiosConfig.post(`/create/team`, {
                name: selectedTeam,
                user_id: selectedMembers,
                type: "update",
                team_id: teamId,
                leader_id: selectLeader?.value,
            }, config)
                .then(response => {
                    setShowModal(false);
                    setTeamMembers(prev =>
                        prev.map(team =>
                            team.id === response?.data?.data?.id ? response?.data?.data : team
                        ));
                    toast.success("Team Updated Successfully", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                });
            setModelHeader("Add");
        }
        setLoader(false);
        handleCloseModal();
        setSelectedMembers("");
        setTeamName("");
        setSelectedTeam("");
        setSelectedLeader("");
    };

    const getAllTeams = () => {
        setLoader(true);
        axiosConfig
            .get("/get/team", config)
            .then((response) => {
                setLoader(false);
                setTeamMembers(response?.data?.data);
            })
            .catch((error) => {
                setLoader(false);
                toast.error("Something is Wrong", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            });
    };

    const deleteTeam = (id, teamName) => {
        try {
            swal({
                title: "Are you sure?",
                text: `You want Delete ${teamName} Team `,
                icon: "warning",
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    setLoader(true);
                    const { data } = axiosConfig.delete(
                        `/delete/team/${id}`,
                        config
                    );
                    toast.success("Team Deleted Successfully!", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                    setLoader(false);
                    setTeamMembers(prevRows => prevRows.filter(team => team.id !== id));
                }
            });

        } catch {
            setLoader(false);
            toast.error("Unable to delete the Menu!", {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
    };

    const editTeam = (id) => {
        setShowModal(true);
        setModelHeader("Edit");
        getAllCompanyUsers();
        setTeamId(id);
        axiosConfig
            .get(`/get/single/team/${id}`, config)
            .then((response) => {
                setLoader(false);
                setSelectedTeam(response?.data?.data?.name);
                const users = response?.data?.data?.users?.map(user => ({
                    value: user.id,
                    label: user.name,
                }));
                const leader = {
                    value: response?.data?.data?.leader?.id,
                    label: response?.data?.data?.leader?.name,
                };
                setSelectedMembers(users);
                setSelectedLeader(leader);
            })
            .catch((error) => {
                setLoader(false);
                toast.error("Something is Wrong", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            });
    };

    const showFeedback = (teamId) => {
        setLoader(true);
        axiosConfig
            .get(`/get/leader/feedback?team_id=${teamId}`, config)
            .then((response) => {
                setLoader(false);
                setFeedbackData(response?.data?.data || []);
                setShowFeedbackModal(true);
            })
            .catch((error) => {
                setLoader(false);
                toast.error("Unable to fetch feedback", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            });
    };

    return (
        <div>
            <div className="main-body">
                <Sidebar isToggleOpen={isToggleOpen} toggleMenu={toggleMenu}>
                    <Header isToggleOpen={isToggleOpen} toggleMenu={toggleMenu} />
                    <section className="body-content-inner">
                        <div className="container">
                            <div className="dashboard card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="text-white text-uppercase">All teams</h5>
                                    <Link
                                        to=""
                                        className="btn btn-lg-primary"
                                        onClick={handleTeam}
                                    >
                                        Add TEAM
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive custom-table">
                                                {teamMember && teamMember.length > 0 ? (
                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="text-center">
                                                                    Team Name
                                                                </th>
                                                                <th scope="col" className="text-center">
                                                                    Leader Name
                                                                </th>
                                                                <th scope="col" className="text-center">
                                                                    Members
                                                                </th>
                                                                <th scope="col" className="text-center">
                                                                    Feedback
                                                                </th>
                                                                <th scope="col" className="text-center">
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {teamMember.length > 0 && teamMember.map(member => (
                                                                <tr key={member.id}>
                                                                    <td className="text-center">{member?.name}</td>
                                                                    <td className="text-center">{member?.leader?.name}</td>
                                                                    <td className="text-center">
                                                                        {member?.users?.map((user, index) => (
                                                                            <span key={user?.id}>
                                                                                {user?.name}
                                                                                {index < member.users.length - 1 && ", "}
                                                                            </span>
                                                                        ))}
                                                                    </td>
                                                                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                                                        <i
                                                                            className="fa fa-eye text-center"
                                                                            aria-hidden="true"
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title="History"
                                                                            style={{ fontSize: "20px", cursor: "pointer" }}
                                                                            onClick={() => showFeedback(member?.id)}
                                                                        ></i>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <div className="action-btn">
                                                                            <Link
                                                                                to=""
                                                                                onClick={(e) => {
                                                                                    editTeam(member?.id);
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    className="fa fa-pencil-square-o"
                                                                                    aria-hidden="true"
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="Edit"
                                                                                ></i>
                                                                            </Link>
                                                                            <a
                                                                                href="javascript:void(0)"
                                                                                onClick={(e) => {
                                                                                    deleteTeam(member?.id, member?.name);
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    className="fa fa-trash-o"
                                                                                    aria-hidden="true"
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="Delete"
                                                                                ></i>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <div className='text-center'>No team members found</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </Sidebar>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>
                        <h5 className="modal-title">{modelHeader} Team Members</h5>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <>
                            <div className="input-form">
                                <label> Team Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Team Name"
                                    value={selectedTeam ? selectedTeam : teamName}
                                    required
                                    onChange={handleTeamNameChange}
                                />
                            </div>
                            <div className="input-form">
                                <label>Select Team Leader</label>
                                <Select
                                    required
                                    options={totalCompanyUsers}
                                    value={selectLeader}
                                    onChange={handleLeaderChange}
                                    className="basic-select"
                                    classNamePrefix="select"
                                />
                            </div>
                            <div className="input-form pt-2">
                                <label>Select Team Members</label>
                                <Select
                                    isMulti
                                    required
                                    options={totalCompanyUsers}
                                    value={selectedMembers}
                                    onChange={handleMembersChange}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-lg-primary">
                            Submit
                        </button>
                        <Button
                            variant="secondary"
                            className="btn btn-lg-primary"
                            onClick={() => {
                                setShowModal(false);
                                setTeamName('');
                                setSelectedMembers([]);
                                setSelectedTeam("");
                                setSelectedLeader("");
                            }}
                        >
                            Close Modal
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={showFeedbackModal} onHide={handleCloseFeedbackModal} className='privateModal'>
                <Modal.Header>
                    <Modal.Title>History of Private Feedbacks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {feedbackData.length > 0 ? (
                        <ul>
                            {feedbackData.map(feedback => (
                                <li key={feedback.id} className='feedback-reply mr-1'>{feedback?.message}
                                <div className='feedback-timestamp'>
                                    <small>{moment(feedback?.created_at).format('LLL')}</small>
                                </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='text-center'><b>No feedback found</b></div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="btn btn-lg-primary"
                        onClick={() => {
                            handleCloseFeedbackModal(false);
                        }}
                    >
                        Close Modal
                    </Button>
                </Modal.Footer>
            </Modal>

            {loader && <Loader />}
            <ToastContainer />
        </div>
    );
};

export default TeamComp;
