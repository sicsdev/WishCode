import React, { useEffect, useState } from 'react'
import { useColor } from '../../commanapi/ColorProvider';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Link } from 'react-router-dom';
import axiosConfig from '../../base_url/config';
import Loader from 'react-spinners/SyncLoader';

const PrivateFeedback = () => {
    const { isToggleOpen, toggleMenu } = useColor();
    const [teams, setTeams] = useState([]);
    const [loader,setloader]=useState(false);
    const currentId = localStorage.getItem('currentId');
    const tokens = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
        },
    };

    useEffect(() => {
        getTeams(currentId);
    }, [currentId]);

    const getTeams = async (currentId) => {
        try {
            setloader(true);
            const { data } = await axiosConfig.get(`/get/leader/teams?current_id=${currentId}`, config);
            setTeams(data?.data || []);
            setloader(false);
        } catch (error) {
            console.log(error);
        }
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
                                    <h5 className="text-white text-uppercase">Private Feedback Team</h5>
                                    {/* <Link
                                        to=""
                                        className="btn btn-lg-primary"
                                        onClick={() => { }}
                                    >
                                        Add Feedback
                                    </Link> */}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive custom-table">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="text-center">Team Name</th>
                                                            <th scope="col" className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {teams?.length > 0 ? (
                                                            teams?.map((team, teamIndex) => (
                                                                team?.team?.length > 0 ? (
                                                                    team?.team.map((member, memberIndex) => (
                                                                        <tr key={`${teamIndex}-${memberIndex}`}>
                                                                            <td className="text-center">{member?.name}</td>
                                                                            <td className="text-center">
                                                                                <Link to={`/get/members/${member?.id}`}>
                                                                                    <i
                                                                                        className=""
                                                                                        aria-hidden="true"
                                                                                        data-toggle="tooltip"
                                                                                        data-placement="top"
                                                                                        title="Private Feedback"
                                                                                    >Send Feedback</i>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr key={`${teamIndex}-${teamIndex}`}>
                                                                        <td className="text-center">{team?.name}</td>
                                                                        <td className="text-center">
                                                                            <Link to={`/get/members/${team?.id}`}>
                                                                                <i
                                                                                    className=""
                                                                                    aria-hidden="true"
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="Private Feedback"
                                                                                >Send Feedback</i>
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3" className="text-center">No Private Feedback is Found</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {loader === true ? <Loader /> : <></>}
                    </section>
                    
                </Sidebar>
                
            </div>
            
        </div>
    );
};

export default PrivateFeedback;
