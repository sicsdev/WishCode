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
}) => {
    const [assignedUser, setAssignedUser] = useState([]);
    const [selectedAssigenedUserId, setSelectedAssigenedUserId] = useState('');
    const [loader, setloader] = useState(false);
    const tokens = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
        },
    };
    useEffect(() => {
        getAllCompanyUserList();
    }, []);

    const getAllCompanyUserList = async () => {
        let response = await getRequestApi("/company-admin/user/all");
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
        setSelectedAssigenedUserId(AssignedId);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Selected Feature ID: ", selectedAssigenedUserId, featureId);

        e.preventDefault();
        setloader(true);
        const formData = new FormData();
        formData.append("select_user_id", selectedAssigenedUserId);
        formData.append("select_feature_id", featureId);

        try {
            const { data } = await axiosConfig.post(
                "/create/assign/company_user",
                formData,
                config
            );
            setloader(false);
            setshowAssignedModal(false);
            toast.success("Assigned User Successfully!", {
                position: "bottom-right",
                autoClose: 2000,
            });
        } catch (error) {
            console.log("error", error);
            setloader(false);
        }
    }

    return (
        <div>
            <Modal show={showAssigned} onHide={handleCloseAssigned} size="">
                <Modal.Header>
                    <Modal.Title>
                        <h5 className="modal-title">Assigned Feature to User</h5>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="input-form">
                            <label>Select Company User</label>
                            <select
                                className="form-control"
                                onChange={(e) => handleAssignedFeature(e.target.value)}
                                value={selectedAssigenedUserId}
                                required
                            >
                                <option value="">Select Company User</option>
                                {assignedUser ? assignedUser.map(user => (
                                    <option key={user?.id} value={user?.id}>
                                        {user?.name}
                                    </option>
                                )) : ""}
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
                            onClick={() => setshowAssignedModal(false)}
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
