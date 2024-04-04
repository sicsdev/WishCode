import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import axiosConfig from '../../base_url/config'
import Loader from 'react-spinners/SyncLoader'
import { ToastContainer, toast } from 'react-toastify'

const MenuComp = () => {
    const [loader, setloader] = useState(false);
    const [menus, setTotalMenu] = useState([]);
    const [updateMenu, setupdateMenu] = useState([]);
    const [menuId, setMenuId] = useState("");
    const [modelHeader, setModelHeader] = useState("Add");
    const [companyType, setCompanyType] = useState("");
    const [featureMenu, setFeatureMenu] = useState("");
    const [productMenu, setProductMenu] = useState("");
    const [showModal, setshowModal] = useState(false);
    const handleCloseModal = () => setshowModal(false);
    const [viewFeature, setViewFeature] = useState("");
    const [companyProfile, setCompanyProfile] = useState("");

    const tokens = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
        },
    };

    //for get the total menus
    useEffect(() => {
        getMenus();
    }, []);
    //sve the menu model
    const handleMenuModal = async (e) => {
        e.preventDefault();
        setloader(true);
        axiosConfig.post(`/save/menus`, {
            id: menuId,
            company_type: companyType,
            feature: featureMenu,
            product: productMenu,
            view_feature: viewFeature,
            company_profile: companyProfile,
        }, config)
            .then(response => {
                setloader(false);
                // Check if the menu already exists in the listing
                const isMenuExist = menus && menus.find(menu => menu.id == response?.data?.data?.id);
                if (!isMenuExist) {
                    setTotalMenu(prev => [...prev, response?.data?.data]);
                    setupdateMenu(response?.data?.data);
                    setshowModal(false);
                    toast.success("Menu Added Successfully!", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                } else {
                    setTotalMenu(prev =>
                        prev.map(menu =>
                            menu.id === response?.data?.data?.id ? response?.data?.data : menu
                        )
                    );
                    setshowModal(false);
                    toast.success("Menu updated Successfully", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                }
            })
            .catch(error => {
                setloader(false);
                toast.error("Something is Wrong", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            });
    }
    //for open model 
    const handleSaveMenu = () => {
        setshowModal(true);
        setCompanyType("");
        setFeatureMenu("");
        setProductMenu("");
        setCompanyProfile("");
        setViewFeature("");
        setModelHeader("Add");
        setMenuId("");
    }

    const getMenus = async () => {
        await axiosConfig
            .get("/admin/menus", config)
            .then((response) => {
                setloader(false);
                setTotalMenu(response.data.data);
            })
            .catch((data) => {
                setloader(false);
                toast.success(data.response.data.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            });
    }
    //for edit menu
    const editMenu = (menu) => {
        setshowModal(true);
        setMenuId(menu.id);
        setModelHeader("Edit");
        setCompanyType(menu?.company_type);
        setProductMenu(menu?.product);
        setFeatureMenu(menu?.feature);
        setViewFeature(menu?.view_feature);
        setCompanyProfile(menu?.company_profile);
    };

    //for delete menu
    const deleteMenu = (id) => {
        try {
            setloader(true);
            const { data } = axiosConfig.delete(
                `/delete/menu/${id}`,
                config
            );
            toast.success("Menu Deleted Successfully!", {
                position: "bottom-right",
                autoClose: 2000,
            });
            setloader(false);
            setTotalMenu(prevRows => prevRows.filter(menu => menu.id !== id));
        } catch {
            setloader(false);
            toast.error("Unable to delete the Menu!", {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
    }
    return (
        <>
            <div className="main-body">
                <Sidebar>
                    <Header />
                    <section className="body-content-inner">
                        <div className="container">
                            <div className="dashboard card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="text-white text-uppercase">All menu</h5>
                                    <Link
                                        to=""
                                        className="btn btn-lg-primary"
                                        onClick={handleSaveMenu}
                                    >
                                        Add MENU
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive custom-table">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="text-center">
                                                                Company Type
                                                            </th>
                                                            <th scope="col" className="text-center">
                                                                Products
                                                            </th>
                                                            <th scope="col" className="text-center">
                                                                Features
                                                            </th>
                                                            <th scope="col" className="text-center">
                                                                View Features
                                                            </th>
                                                            <th scope="col" className="text-center">
                                                                Company Profile
                                                            </th>
                                                            <th scope="col" className="text-center">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {menus.length != null ? <>{
                                                            menus.map((menu, index) => (
                                                                <tr key={index}>
                                                                    <td className="text-center"><a>{menu?.company_type}</a></td>
                                                                    <td className="text-center"><a>{menu?.product ?? "Normal"}</a></td>
                                                                    <td className="text-center"><a>{menu?.feature ?? "Normal"}</a></td>
                                                                    <td className="text-center"><a>{menu?.view_feature ?? "Normal"}</a></td>
                                                                    <td className="text-center"><a>{menu?.company_profile ?? "Normal"}</a></td>
                                                                    <td className="text-center">
                                                                        <div className="action-btn">
                                                                            <Link
                                                                                to=""
                                                                                onClick={(e) => {
                                                                                    editMenu(menu);
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
                                                                                    deleteMenu(menu.id);
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
                                                            ))
                                                        } </> : <tr>
                                                            <td className="center-text">Not Record Found</td>
                                                        </tr>
                                                        }

                                                    </tbody>
                                                </table>
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
                        <h5 className="modal-title">{modelHeader} Company Type Menu</h5>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleMenuModal}>
                    <Modal.Body>
                        <>
                            <div className="input-form">
                                <label> Company Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Company Type"
                                    value={companyType}
                                    required
                                    onChange={(e) => setCompanyType(e.target.value)}
                                />
                            </div>
                            <div><label> Menus List</label></div>
                            <div style={{ display: 'flex' }}>
                                <div className="input-form" style={{ marginRight: '10px' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Products Menu"
                                        value={productMenu}
                                        onChange={(e) => setProductMenu(e.target.value)}
                                    />
                                </div>
                                <div className="input-form">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Features Menu"
                                        value={featureMenu}

                                        onChange={(e) => setFeatureMenu(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="input-form" style={{ marginRight: '10px' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="View Feature Menu"
                                        value={viewFeature}
                                        onChange={(e) => setViewFeature(e.target.value)}
                                    />
                                </div>
                                <div className="input-form">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Company Profile Menu"
                                        value={companyProfile}
                                        onChange={(e) => setCompanyProfile(e.target.value)}
                                    />
                                </div>
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
                            onClick={(e) => {
                                setshowModal(false);
                                setCompanyType("");
                                setFeatureMenu("");
                                setProductMenu("");
                                setCompanyProfile("");
                                setViewFeature("");
                            }}
                        >
                            Close Modal
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            {loader === true ? <Loader /> : <></>}
            <ToastContainer />
        </>

    )
}

export default MenuComp