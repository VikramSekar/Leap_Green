import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            navigate('/'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    const logout = () => {
        sessionStorage.removeItem('username'); // Remove the username from sessionStorage
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light border border-success rounded shadow-sm bg-secondary">
                <div class="container-fluid">
                    <button class="navbar-brand bg-secondary border rounded p-2 shadow-sm cursornone" href="#">
                        <img src={logo} alt="" width="100%" height="60" class="d-inline-block align-text-top" />
                    </button>
                    <button class="navbar-toggler mx-auto mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item rounded p-0 m-1 ">
                                <Link to={"/dashboard"} className="nav-link btn btn-outline-success m-1 border border-2 border-success">
                                    <i className="bi bi-speedometer2 me-2 fs-3"></i> Dashboard
                                </Link>
                            </li>
                            <li class="nav-item btn rounded p-0 m-1">
                                <Link to={"/Model_Summary"} className="nav-link btn btn-outline-success m-1 border border-2 border-success">
                                    <i className="bi bi-graph-up me-2 fs-3"></i> NWP Model Summary
                                </Link>
                            </li>
                            <li class="nav-item btn rounded p-0 m-1">
                                <Link to={"/ShiftA"} className="nav-link btn btn-outline-success text-white m-1 border border-2 border-success">
                                    <i className="bi bi-clock me-2 fs-3"></i> Shift - A
                                </Link>
                            </li>
                            <li class="nav-item btn rounded p-0 m-1">
                                <Link to={"/ShiftB"} className="nav-link btn btn-outline-success text-white m-1 border border-2 border-success">
                                    <i className="bi bi-clock me-2 fs-3"></i> Shift - B
                                </Link>
                            </li>
                            <li class="nav-item btn rounded p-0 m-1">
                                <Link to={"/ShiftC"} className="nav-link btn btn-outline-success text-white m-1 border border-2 border-success">
                                    <i className="bi bi-clock me-2 fs-3"></i> Shift - C
                                </Link>
                            </li>
                            <li class="nav-item btn rounded p-0 m-1">
                                <Link to={"/Email"} className="nav-link btn btn-outline-success text-white m-1 border border-2 border-success">
                                    <i className="bi bi-envelope me-2 fs-3"></i> Email
                                </Link>
                            </li>

                            <li className="nav-item btn rounded p-0 m-1 mx-auto">
                                <button onClick={logout} className="nav-link btn btn-danger m-1 border border-2 border-danger pendingbtn whitetext">
                                    <i className="bi bi-box-arrow-right me-2 fs-3 "></i> Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header