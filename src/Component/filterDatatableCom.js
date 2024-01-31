import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axiosConfig from "../base_url/config";

const FilterDatatableCom = (props) => {
  const [isFeatureChecked, SetIsFeatureChecked] = useState([]);

  useEffect(() => {
    SetIsFeatureChecked(props?.data);
  }, [props?.data]);

  console.log(props.data);
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
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  function handleFeatureStatus(FeatureId, FeatureStatus) {
    let apVal = "";
    if (FeatureStatus == "completed") {
      apVal = "publish";
    } else {
      apVal = "completed";
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
          SetIsFeatureChecked((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) =>
              checkbox.id === FeatureId ? { ...checkbox, status: checkbox.status == "completed" ? "publish" : "completed" } : checkbox
            )
          );
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
  const columns = [
    {
      name: "Feature Title",
      selector: (row) => (
        <Link to={`/feature-report/${row.id}`} className="filter-table-link">
          {row.title}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Total Votes",
      selector: (row) => row.post_votes_count,
      sortable: true,
    },
    {
      name: "Public/external votes",
      selector: (row) => row.post_public_vote_count,
      sortable: true,
      right: true,
    },
    {
      name: "Private/company/internal votes",
      selector: (row) => row.post_private_vote_count,
      sortable: true,
      right: true,
    },
    {
      name: "Internal Priority",
      selector: (row) => row.internal_priority,
      sortable: true,
      right: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="switch-btn-wrapper mt-3">
          <label className="switch">
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
            <span className="slider round"></span>
          </label>
        </div>
      )
    },
  ];
  const BootyPagination = ({
    rowsPerPage,
    rowCount,
    onChangePage,
    onChangeRowsPerPage, // available but not used here
    currentPage,
  }) => {
    const handleBackButtonClick = () => {
      onChangePage(currentPage - 1);
    };

    const handleNextButtonClick = () => {
      onChangePage(currentPage + 1);
    };

    const handlePageNumber = (e) => {
      onChangePage(Number(e.target.value));
    };

    const pages = getNumberOfPages(rowCount, rowsPerPage);
    const pageItems = toPages(pages);
    const nextDisabled = currentPage === pageItems.length;
    const previosDisabled = currentPage === 1;

    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleBackButtonClick}
              disabled={previosDisabled}
              aria-disabled={previosDisabled}
              aria-label="previous page"
            >
              Previous
            </button>
          </li>
          {pageItems.map((page) => {
            const className =
              page === currentPage ? "page-item active" : "page-item";

            return (
              <li key={page} className={className}>
                <button
                  className="page-link"
                  onClick={handlePageNumber}
                  value={page}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextButtonClick}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="text-white text-uppercase">{props.title}</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <DataTable
              title={""}
              columns={columns}
              data={isFeatureChecked}
              defaultSortFieldID={1}
              pagination
            // paginationComponent={BootyPagination}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDatatableCom;
