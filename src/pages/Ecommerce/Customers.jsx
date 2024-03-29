import React, { useState, useEffect, CSSProperties } from 'react'
import TopNavbar from '../../components/TopNavbar/TopNavbar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClockLoader from "react-spinners/ClockLoader";
// import { cssOverride } from 'react-spinners';
const Customer = () => {
    const [custommers, setCustommer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 2;
    const [loading, setLoading] = useState(false);

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "blue",
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        fetchCustommers();
    }, [currentPage]);

    const fetchCustommers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/get-all-user`, {
                params: {
                    page: currentPage - 1, // trang hiện tại
                    limit: limit // số lượng mục trên mỗi trang
                }
            });
            setCustommer(response.data.userResponses);
            setTotalPages(response.data.totalPages); // tính tổng số trang
            console.log("Check user: ", response)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };
    return (

        <div>
            {
                loading ? <ClockLoader
                    color={'#313A46'}
                    loading={loading}
                    cssOverride={override}
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> :
                    <>
                        <TopNavbar />
                        {/* Start Content*/}
                        <div className="container-fluid">
                            {/* start page title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Hyper</a></li>
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">eCommerce</a></li>
                                                <li className="breadcrumb-item active">Customers</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Customers</h4>
                                    </div>
                                </div>
                            </div>
                            {/* end page title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col-sm-5">
                                                    <a href="javascript:void(0);" className="btn btn-danger mb-2"><i className="mdi mdi-plus-circle me-2" /> Add Customers</a>
                                                </div>
                                                <div className="col-sm-7">
                                                    <div className="text-sm-end">
                                                        <button type="button" className="btn btn-success mb-2 me-1"><i className="mdi mdi-cog" /></button>
                                                        <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                                                        <button type="button" className="btn btn-light mb-2">Export</button>
                                                    </div>
                                                </div>{/* end col*/}
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table table-centered table-striped dt-responsive nowrap w-100" id="products-datatable">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 20 }}>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                                    <label className="form-check-label" htmlFor="customCheck1">&nbsp;</label>
                                                                </div>
                                                            </th>
                                                            <th>Customer</th>
                                                            <th>Phone</th>
                                                            <th>Email</th>
                                                            <th>Location</th>
                                                            <th>Date of birth</th>
                                                            <th>Status</th>
                                                            <th style={{ width: 75 }}>Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {custommers && custommers.length > 0 &&
                                                            custommers.map((custommersItem, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <div className="form-check">
                                                                                <input type="checkbox" className="form-check-input" id="customCheck2" />
                                                                                <label className="form-check-label" htmlFor="customCheck2">&nbsp;</label>
                                                                            </div>
                                                                        </td>
                                                                        <td className="table-user">
                                                                            <img src="assets/images/users/avatar-4.jpg" alt="table-user" className="me-2 rounded-circle" />
                                                                            <a href="javascript:void(0);" className="text-body fw-semibold">{custommersItem.fullName}</a>
                                                                        </td>
                                                                        <td>
                                                                            {custommersItem.phoneNumber}
                                                                        </td>
                                                                        <td>
                                                                            {custommersItem.email}
                                                                        </td>
                                                                        <td>
                                                                            Việt Nam
                                                                        </td>
                                                                        <td>
                                                                            {custommersItem.dateOfBirth}
                                                                        </td>
                                                                        <td>
                                                                            <span className="badge badge-success-lighten">{custommersItem.active ? 'active' : ''}</span>
                                                                        </td>
                                                                        <td>
                                                                            <a href="javascript:void(0);" className="action-icon"> <i className="mdi mdi-square-edit-outline" /></a>
                                                                            <a href="javascript:void(0);" className="action-icon"> <i className="mdi mdi-delete" /></a>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                    </tbody>


                                                </table>
                                            </div>
                                            <nav aria-label="...">
                                                <ul className="pagination pagination-circle">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePaginationClick(currentPage - 1)}>Previous</button>
                                                    </li>
                                                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                                                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => handlePaginationClick(page)}>{page}</button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePaginationClick(currentPage + 1)}>Next</button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div> {/* end card-body*/}
                                    </div> {/* end card*/}
                                </div> {/* end col */}
                            </div>
                            {/* end row */}
                        </div> {/* container */}
                        {/* content */}
                    </>}
        </div>
    )
}

export default Customer