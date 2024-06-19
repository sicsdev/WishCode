import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getRequestApi } from '../../helper/Helper';
import { toast } from 'react-toastify';
import axiosConfig from '../../base_url/config';
import Loader from 'react-spinners/SyncLoader';

const AssignFeatureModel = ({
    showAssigned,
    handleCloseAssigned,
    setshowAssignedModal,
    featureId,
    assignUserId,
}) => {
    const [assignedUser, setAssignedUser] = useState([]);
    const [selectedAssigenedUserId, setSelectedAssigenedUserId] = useState('');
    const [loader, setloader] = useState(false);
    const [assignType, setAssignType] = useState("");
    const [teamData, setTeamData] = useState([]); // Initialize as an empty array
    const tokens = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
        },
    };

    useEffect(() => {
        getAllCompanyUserList();
        getAllTeams();
    }, []);

    const getAllCompanyUserList = async () => {
        let response = await getRequestApi("/company-admin/user/all?type=assign");
        if (response) {
            if (response?.data?.success) {
                setAssignedUser(response?.data?.data);
            } else {
                toast.error(response.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            }
        }
    }

    const handleAssignedFeature = (AssignedId) => {
        const [type, id] = AssignedId.split(":");
        setAssignType(type);
        setSelectedAssigenedUserId(id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloader(true);
        const formData = new FormData();
        formData.append("select_feature_id", featureId);
        formData.append('assign_type', assignType);
        if (assignType === "user") {
            formData.append("select_user_id", selectedAssigenedUserId);
        } else if (assignType === "team") {
            formData.append("select_team_id", selectedAssigenedUserId);
        }
        try {
            const { data } = await axiosConfig.post(
                "/create/assign/company_user",
                formData,
                config
            );
            setloader(false);
            setshowAssignedModal(false);
            toast.success(`Assigned ${assignType} Successfully!`, {
                position: "bottom-right",
                autoClose: 2000,
            });
        } catch (error) {
            console.log("error", error);
            setloader(false);
        }

    }

    const getAllTeams = () => {
        setloader(true);
        axiosConfig
            .get("/get/team", config)
            .then((response) => {
                setloader(false);
                const data = response?.data?.data;
                if (Array.isArray(data)) {
                    setTeamData(data);
                } else {
                    setTeamData([]);
                }
            })
            .catch((error) => {
                setloader(false);
                toast.error("Something is Wrong", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            });
    }

    const closeModalHandler = () => {
        setshowAssignedModal(false);
    };

    return (
        <div>
            <Modal show={showAssigned} onHide={handleCloseAssigned} size="">
                <Modal.Header>
                    <Modal.Title>
                        <h5 className="modal-title">Assigned Feature</h5>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="input-form">
                            <label>Select User / Team</label>
                            <select
                                className="form-control"
                                onChange={(e) => handleAssignedFeature(e.target.value)}
                                value={`${assignType}:${selectedAssigenedUserId}`}
                                required
                            >
                                <option value="">Select options</option>
                                {assignedUser.map(user => (
                                    <option key={user.id} value={`user:${user.id}`}>
                                        {user.name}
                                    </option>
                                ))}
                                {Array.isArray(teamData) && teamData.map(team => (
                                    <option key={team.id} value={`team:${team.id}`}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-lg-primary">
                            Submit
                        </button>
                        <Button
                            variant="secondary"
                            className="btn btn-lg-primary"
                            onClick={closeModalHandler}
                        >
                            Close Modal
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            {loader === true ? <Loader /> : <></>}
        </div>
    )
}

export default AssignFeatureModel;
