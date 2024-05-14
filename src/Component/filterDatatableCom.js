import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axiosConfig from "../base_url/config";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const FilterDatatableCom = (props) => {
  const [isFeatureChecked, SetIsFeatureChecked] = useState([]);
  useEffect(() => {
    SetIsFeatureChecked(props?.data);
  }, [props?.data]);

  function getNumberOfPages(rowCount, rowsPerPage) {
    return Math.ceil(rowCount / rowsPerPage);
  }

  function toPages(pages) {
    const results = [];

    for (let i = 1; i < pages; i++) {
      results.push(i);
    }

    return results;
  }
  const tokens = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  function handleFeatureStatus(FeatureId, FeatureStatus) {
    let apVal = "";
    if (userRole == 3) {
      if (FeatureStatus == "review") {
        apVal = "pending";
      } else {
        apVal = "review";
      }
    } else {
      if (FeatureStatus == "completed") {
        apVal = "review";
      } else {
        apVal = "completed";
      }
    }
    swal({
      title: "Are you sure?",
      text: "You want to Change status this Feature?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          await axiosConfig.post(
            `/admin/post/change-status`,
            {
              post_id: FeatureId,
              status: apVal,
            },
            config
          );
          if (userRole == 3) {
            SetIsFeatureChecked((prevCheckboxes) =>
              prevCheckboxes.map((checkbox) =>
                checkbox.id === FeatureId ? { ...checkbox, status: checkbox.status == "review" ? "pending" : "review" } : checkbox
              )
            );
          } else {
            SetIsFeatureChecked((prevCheckboxes) =>
              prevCheckboxes.map((checkbox) =>
                checkbox.id === FeatureId ? { ...checkbox, status: checkbox.status == "completed" ? "publish" : "completed" } : checkbox
              )
            );
          }
          swal("Updated!", "You Completed a Feature successfully!", "success");
        } catch (error) {
          swal(
            "Error!",
            "Enable to update the Feature status to Complete!",
            "error"
          );
        }
      }
    });

  }
  function handleFeatureType(FeatureId, FeatureType) {
    let apVal = "";
    if (FeatureType == "private") {
      apVal = "public";
    } else {
      apVal = "private";
    }
    swal({
      title: "Are you sure?",
      text: `You want to Change Type ${apVal} Feature?`,
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          const responseData = await axiosConfig.post(
            `/admin/post/change-type`,
            {
              post_id: FeatureId,
              type: apVal,
            },
            config
          );
          if (responseData?.status == 200) {
            SetIsFeatureChecked((prevCheckboxes) =>
              prevCheckboxes.map((checkbox) =>
                checkbox.id === FeatureId ? { ...checkbox, type: checkbox.type == "private" ? "public" : "private" } : checkbox
              )
            );
          }
          swal("Updated!", "You Feature Type is updated!", "success");

        } catch (error) {
          swal(
            "Error!",
            "Enable to update the Feature status to Complete!",
            "error"
          );
        }
      }
    });
  }
  const renderTooltip = (title) => (
    <Tooltip id="tooltip">{title}</Tooltip>
  );
  const handleRecurring = (postId, recurring) => {
    let type;
    if (recurring == 0) {
      type = 1;
    } else {
      type = 0;
    }
    swal({
      title: "Are you sure?",
      text: `You want to Change Feature Recurring to ${type == 1 ? "Yes" : "No"
        }?`,
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          const responseData = await axiosConfig.post(
            `/admin/post/change-recurring`,
            {

              post_id: postId,
              recurring: type,
            },
            config
          );
          if (responseData.status === 200) {
            SetIsFeatureChecked((prevPosts) =>
              prevPosts.map((post) =>
                post.id === postId ? { ...post, recurring: type } : post
              )
            );
            // Show success message
            swal("Updated!", "Feature Recurring status updated!", "success");
          }
        } catch (error) {
          // Show error message
          swal(
            "Error!",
            "Unable to update the Recurring status!",
            "error"
          );
        }
      }
    });
  };
  const columns = [
    {

      name: "Feature Title",
      selector: (row) => (
        <OverlayTrigger
          placement="top"
          overlay={renderTooltip(row.title)}
        >
          <Link
            to={`/feature-report/${row.id}`}
            className="filter-table-link"
          >
            {row.title}
          </Link>
        </OverlayTrigger>
      ),
      sortable: true
    },
    {
      name: "Total Votes",
      selector: (row) => row.post_votes_count,
      sortable: true,
      center: true,
    },
    {
      name: "Public/external votes",
      selector: (row) => row.post_public_vote_count,
      sortable: true,
      center: true,
    },
    {
      name: "Private/company/internal votes",
      selector: (row) => row.post_private_vote_count,
      sortable: true,
      center: true,
    },
    {
      name: "Internal Priority",
      selector: (row) => row.internal_priority,
      sortable: true,
      center: true,

    },
    {
      name: "Status",
      selector: (row) => (
        <div className="switch-btn-wrapper mt-3">
          {userRole == 3 ? <>
            <label className="switch type_switch">
              <input
                type="checkbox"
                name="completeFeature"
                checked={
                  row.status == "review"
                }
                onChange={(e) => {
                  handleFeatureStatus(
                    row.id,
                    row.status
                  );
                }}
              />
              <div className="slider round">
                <span className="on"> Review</span>
                <span className="off">In Process</span>
              </div>
            </label>
          </> : <>
            <label className="switch type_switch">
              <input
                type="checkbox"
                name="completeFeature"
                checked={
                  row.status == "completed"
                }
                onChange={(e) => {
                  handleFeatureStatus(
                    row.id,
                    row.status
                  );
                }}
              />
              <div className="slider round">
                <span className="on"> Complete</span>
                <span className="off">{row?.status == "review" ? "In Review" : "In Process"}</span>
              </div>
            </label>
          </>}

        </div>
      ),
      center: true,

    },
    {
      name: 'Recurring',
      selector: (row) => (
        <div className="switch-btn-wrapper mt-3">
          {userRole == 2 ? <>
            <label className="switch type_switch">
              <input type="checkbox" name="changeUserType"
                checked={
                  row.recurring == 1
                }
                onChange={(e) => {
                  handleRecurring(
                    row.id,
                    row.recurring,
                  );
                }}
              />
              <div className="slider round">
                <span className="on">Yes</span>
                <span className="off">No</span>
              </div>
            </label>
          </> : null}

        </div>
      ),
      center: true,

    },
    {
      name: "Type",
      selector: (row) => <div className="switch-btn-wrapper mt-3">

        <label className="switch type_switch">
          <input type="checkbox" name="typeFeature"
            checked={
              row.type == "private"
            }
            onChange={(e) => {
              handleFeatureType(
                row.id,
                row.type
              );
            }}
          />
          <div className="slider round">
            <span className="on">Private</span>
            <span className="off">Public</span>
          </div>
        </label>

      </div>,
      center: true,
    },
  ];


  return (
    <>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="text-white text-uppercase">{props.title}</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 all_features">
            <DataTable
              title={""}
              columns={userRole == 2 ? columns : columns.filter(column => column.name !== "Recurring")}
              data={isFeatureChecked}
              defaultSortFieldID={1}
              pagination
            />
          </div>
        </div>
      </div>
      {/* Render the tooltip component */}
    </>
  );
};

export default FilterDatatableCom;
