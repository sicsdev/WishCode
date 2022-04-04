import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const FilterDatatableCom = (props) => {
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
              data={props.data}
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
