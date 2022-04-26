import React from 'react'
import FrontHeader from '../Component/front/front-header'
import FrontFooter from './frontFooter'

function FeatureWishes() {
  return (
    <div>
      <FrontHeader />
      <div className="home_wrapper">
        <div className="featured-search margin-header">
          <div className="container">

            <div class="input-group input-group-sm mb-3">
              <input type="search" class="form-control py-3" placeholder='Seach..' />
            </div>


            <div className='latest-wishes-table'>
              <div className="dashboard card mt-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-white text-uppercase">latest Feature Wishes</h5>
                </div>
                <div className="table-responsive custom-table approve-table">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Feature Wishes</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Product</th>
                        <th scope="col">Submitted By</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="col">UI Suggestion</td>
                        <td scope="col">New Company1 </td>
                        <td scope="col">Product 1</td>
                        <td scope="col">User 2022</td>
                      </tr>
                      <tr>
                        <td scope="col">UI Suggestion</td>
                        <td scope="col">New Company1 </td>
                        <td scope="col">Product 1</td>
                        <td scope="col">User 2022</td>
                      </tr>
                      <tr>
                        <td scope="col">UI Suggestion</td>
                        <td scope="col">New Company1 </td>
                        <td scope="col">Product 1</td>
                        <td scope="col">User 2022</td>
                      </tr>
                      <tr>
                        <td scope="col">UI Suggestion</td>
                        <td scope="col">New Company1 </td>
                        <td scope="col">Product 1</td>
                        <td scope="col">User 2022</td>
                      </tr>
                      <tr>
                        <td scope="col">UI Suggestion</td>
                        <td scope="col">New Company1 </td>
                        <td scope="col">Product 1</td>
                        <td scope="col">User 2022</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
      <FrontFooter />
    </div>
  )
}

export default FeatureWishes