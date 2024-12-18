import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Example using react-icons
import Header from '../Header';
import { Link } from 'react-router-dom';



function Pending_Works() {


    const [selectedDate, setSelectedDate] = useState('');

    // Filter data by selected date
    const filterByDate = (entries) => {
        if (!selectedDate) return entries; // Return all if no date selected
        return entries.filter(entry =>
            new Date(entry.created_at).toISOString().slice(0, 10) === selectedDate
        );
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        // Fetch the last submitted data on component mount
        axios.get('http://localhost:5001/shiftA_preworkstatuslast')
            .then(response => {
                setData(response.data); // Populate the table with the last entry
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const [preForecast, setPreForecast] = useState([]);
    useEffect(() => {
        // Fetch data when the component mounts
        axios.get('http://localhost:5001/shiftA_forecastlast')
            .then(response => setPreForecast(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const [preReport, setPreReport] = useState([]);
    useEffect(() => {
        // Fetch data when the component mounts
        axios.get('http://localhost:5001/shiftA_reportlast')
            .then(response => setPreReport(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const [forecasts, setForecasts] = useState([]);
    useEffect(() => {
        const fetchForecasts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/shiftB_forecastlast');
                setForecasts(response.data);
            } catch (error) {
                console.error('Error fetching forecasts:', error);
            }
        };

        fetchForecasts();
    }, []);

    const [forecastDataFetch, setForecastDataFetch] = useState([]);
    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5001/shiftB_demandforecastlast')
            .then(response => response.json())
            .then(data => setForecastDataFetch(data))
            .catch(error => console.error('Error fetching forecast data:', error));
    }, []);

    // const [solarForecast, setSolarForecast] = useState({
    //     watson: false,
    //     brookfields: false,
    //     brookfieldsmail: false,
    //     accuracyReport: false,
    //     solarDsmReport: false,
    //     actualUpdated: false,
    //     actualNotUpdated: false,
    // });
    // useEffect(() => {
    //     // Fetch the previous entry for solar forecast
    //     fetch('http://localhost:5001/shiftB_solarforecastlast')
    //         .then(response => response.json())
    //         .then(data => {
    //             // Set the fetched data to solarForecast state
    //             setSolarForecast(data);
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);

    const [solarForecast, setSolarForecast] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/shiftB_solarforecastlast");
                setSolarForecast(response.data);  // Directly set the data without modification
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const [forecastData, setForecastData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/shiftC_forecaststatus/last");
                setForecastData(response.data);  // Directly set the data without modification
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);




    return (
        <>
            <Header />
            <section className='min-vh-100'>
                <div className='container border rounded shadow-sm bg-light mt-5'>
                    <div className='row d-flex justify-content-center align-items-center'>
                        <div className='col-md-2 border border-success border-2 text-center p-3 border mt-3 rounded shadow-sm bg-light'>
                            <h3 className='fs-2'>Pending Works</h3>
                        </div>
                    </div>

                    <div className='row d-flex justify-content-end'>
                        <div className='col-md-2'>
                            <input
                                type="date"
                                className="form-control border border-2 border-warning shadow-sm"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]} // Set max to today's date
                            />

                        </div>
                    </div>

                    {/* ShiftA */}
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-12 p-2 rounded mt-4 bg-white'>
                            <div className='table-responsive'>
                                <table className="table table-bordered mt-5">
                                    <thead>
                                        <tr className='bg-danger whitetext'>
                                            <th className='fs-3' colSpan={5} scope="col"><Link to={"/ShiftA"} className='border border-2 rounded p-2 text-white'>Shift_A</Link> Previous PreWork Status</th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Operations</th>
                                            <th scope="col">TN</th>
                                            <th scope="col">RJ</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterByDate(data)
                                            .filter(row => row.TN !== 1 || row.RJ !== 1) // Filter rows with any unchecked value
                                            .map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.operation}</td>
                                                    <td>{row.TN === 1 ? <FaCheck className="textsuccess fs-4" /> : <FaTimes className="textdanger fs-4" />}</td>
                                                    <td>{row.RJ === 1 ? <FaCheck className="textsuccess fs-4" /> : <FaTimes className="textdanger fs-4" />}</td>
                                                </tr>
                                            ))}
                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-12 mt-4 p-2 rounded bg-white'>
                            <div className='table-responsive'>
                                <table className="table table-bordered mt-5">
                                    <thead>
                                        <tr className='bg-danger text-white'>
                                            <th className='fs-3  whitetext' colSpan={9} scope="col"><Link to={"/ShiftA"} className='border border-2 rounded p-2 text-white'>Shift_A</Link> Previous Forecast Status</th>
                                        </tr>
                                        <tr>
                                            <th>Forecast Type</th>
                                            <th>Our Group</th>
                                            <th>LDC</th>
                                            <th>Mail</th>
                                            <th>Main Group</th>
                                            <th>TANGEDCO</th>
                                            <th>TECA</th>
                                            <th>TN 15 Days</th>
                                            <th>RJ 15 Days</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterByDate(preForecast).filter(forecast => forecast.our_group !== 1 || forecast.ldc !== 1 || forecast.mail !== 1 || forecast.main_group !== 1 || forecast.tangedco !== 1 || forecast.teca !== 1 || forecast.tn_15_days !== 1 || forecast.rj_15_days !== 1)
                                            .map((forecast, index) => (
                                                <tr key={index}>
                                                    <td>{forecast.forecast_type}</td>
                                                    <td>
                                                        {forecast.our_group === 1
                                                            ? (<FaCheck className="textsuccess fs-4" />)
                                                            : forecast.our_group === 0
                                                                ? (<FaTimes className="textdanger fs-4" />)
                                                                : "-"
                                                        }
                                                    </td>
                                                    <td>
                                                        {forecast.ldc === 1
                                                            ? (<FaCheck className="textsuccess fs-4" />)
                                                            : forecast.ldc === 0
                                                                ? (<FaTimes className="textdanger fs-4" />)
                                                                : "-"
                                                        }
                                                    </td>
                                                    <td>
                                                        {forecast.mail === 1
                                                            ? (<FaCheck className="textsuccess fs-4" />)
                                                            : forecast.mail === 0
                                                                ? (<FaTimes className="textdanger fs-4" />)
                                                                : "-"
                                                        }
                                                    </td>
                                                    <td>
                                                        {forecast.main_group === 1
                                                            ? (<FaCheck className="textsuccess fs-4" />)
                                                            : forecast.main_group === 0
                                                                ? (<FaTimes className="textdanger fs-4" />)
                                                                : "-"
                                                        }
                                                    </td>
                                                    <td>
                                                        {forecast.tangedco === 1
                                                            ? (<FaCheck className="textsuccess fs-4" />)
                                                            : forecast.tangedco === 0
                                                                ? (<FaTimes className="textdanger fs-4" />)
                                                                : "-"
                                                        }
                                                    </td>
                                                    <td>
                                                        {forecast.teca === 1
                                                            ? (<FaCheck className="textsuccess fs-4" />)
                                                            : forecast.teca === 0
                                                                ? (<FaTimes className="textdanger fs-4" />)
                                                                : "-"
                                                        }
                                                    </td>
                                                    <td>
                                                        {forecast.tn_15_days === 1
                                                            ? (<FaCheck className="textsuccess fs-4" />)
                                                            : forecast.tn_15_days === 0
                                                                ? (<FaTimes className="textdanger fs-4" />)
                                                                : "-"
                                                        }
                                                    </td>
                                                    <td>
                                                        {forecast.rj_15_days === 1
                                                            ? (<FaCheck className="textsuccess fs-4" />)
                                                            : forecast.rj_15_days === 0
                                                                ? (<FaTimes className="textdanger fs-4" />)
                                                                : "-"
                                                        }
                                                    </td>

                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-12 mt-4 p-2 rounded bg-white'>
                            <div className='table-responsive'>
                                <table className="table table-bordered mt-5">
                                    <thead>
                                        <tr className='bg-danger whitetext'>
                                            <th className='fs-3' colSpan={5} scope="col"><Link to={"/ShiftA"} className='border border-2 rounded p-2 text-white'>Shift_A</Link> Previous Reports Status</th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Reports Name</th>
                                            <th scope="col">TN</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterByDate(preReport).filter(report => report.TN !== 1)
                                            .map((report, index) => (
                                                <tr key={index}>
                                                    <td>{report.report_name}</td>
                                                    <td>{report.TN == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* ShiftA */}


                    {/* ShiftB */}
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-12 mt-4 rounded bg-white p-2'>
                            <div className='table-responsive bg-light rounded'>
                                <table className="table table-bordered mt-5">
                                    <thead>
                                        <tr className='bg-primary text-white'>
                                            <th className='fs-3  whitetext' colSpan={9} scope="col"><Link to={"/ShiftB"} className='border border-2 rounded p-2 text-white'>Shift_B</Link> Previous Forecast Status</th>
                                        </tr>
                                        <tr>
                                            <th>Forecast Type</th>
                                            <th>Our Group</th>
                                            <th>LDC</th>
                                            <th>Email</th>
                                            <th>Main Group</th>
                                            <th>TANGEDCO</th>
                                            <th>TECA</th>
                                            {/* <th>TN 15 Days</th>
                                            <th>RJ 15 Days</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterByDate(forecasts).filter(forecast => forecast.our_group !== 1 || forecast.ldc !== 1 || forecast.mail !== 1 || forecast.main_group !== 1 || forecast.tangedco !== 1 || forecast.teca !== 1)
                                            .map((forecast) => (
                                                <tr key={forecast.id}>
                                                    <td>{forecast.forecast_type}</td>
                                                    <td>
                                                        {forecast.our_group == 1 ? (
                                                            <FaCheck className="textsuccess fs-4" />
                                                        ) : forecast.our_group == 0 ? (
                                                            <FaTimes className="textdanger fs-4" />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {forecast.ldc == 1 ? (
                                                            <FaCheck className="textsuccess fs-4" />
                                                        ) : forecast.ldc == 0 ? (
                                                            <FaTimes className="textdanger fs-4" />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {forecast.mail == 1 ? (
                                                            <FaCheck className="textsuccess fs-4" />
                                                        ) : forecast.mail == 0 ? (
                                                            <FaTimes className="textdanger fs-4" />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {forecast.main_group == 1 ? (
                                                            <FaCheck className="textsuccess fs-4" />
                                                        ) : forecast.main_group == 0 ? (
                                                            <FaTimes className="textdanger fs-4" />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {forecast.tangedco == 1 ? (
                                                            <FaCheck className="textsuccess fs-4" />
                                                        ) : forecast.tangedco == 0 ? (
                                                            <FaTimes className="textdanger fs-4" />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {forecast.teca == 1 ? (
                                                            <FaCheck className="textsuccess fs-4" />
                                                        ) : forecast.teca == 0 ? (
                                                            <FaTimes className="textdanger fs-4" />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    {/* <td>
                                                        {forecast.tn_15_days == 1 ? (
                                                            <FaCheck className="textsuccess fs-4" />
                                                        ) : forecast.tn_15_days == 0 ? (
                                                            <FaTimes className="textdanger fs-4" />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {forecast.rj_15_days == 1 ? (
                                                            <FaCheck className="textsuccess fs-4" />
                                                        ) : forecast.rj_15_days == 0 ? (
                                                            <FaTimes className="textdanger fs-4" />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td> */}

                                                </tr>
                                            ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-12 mt-4 bg-white rounded p-2'>
                            <div className='table-responsive'>
                                <table className="table table-bordered mt-5">
                                    <thead>
                                        <tr className='bg-primary text-white'>
                                            <th className='fs-3 whitetext' colSpan={6} scope="col"> <Link to={"/ShiftB"} className='border border-2 rounded p-2 text-white'>Shift_B</Link> Previous Demand Forecast Status</th>
                                        </tr>
                                        <tr>
                                            <th>Forecast Type</th>
                                            <th>TN</th>
                                            <th>Our Group</th>
                                            <th>Main Group</th>
                                            <th>Accuracy Report</th>
                                            <th>Demand DSM Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterByDate(forecastDataFetch).filter(row => row.tn !== 1 || row.our_group !== 1 || row.main_group !== 1 || row.accuracy_report !== 1 || row.demand_dsm_report !== 1)
                                            .map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.forecast_type}</td>
                                                    <td>
                                                        {row.tn === null
                                                            ? "-"
                                                            : row.tn === 1
                                                                ? <FaCheck className="textsuccess fs-4" />
                                                                : <FaTimes className="textdanger fs-4" />}
                                                    </td>
                                                    <td>
                                                        {row.our_group === null
                                                            ? "-"
                                                            : row.our_group === 1
                                                                ? <FaCheck className="textsuccess fs-4" />
                                                                : <FaTimes className="textdanger fs-4" />}
                                                    </td>
                                                    <td>
                                                        {row.main_group === null
                                                            ? "-"
                                                            : row.main_group === 1
                                                                ? <FaCheck className="textsuccess fs-4" />
                                                                : <FaTimes className="textdanger fs-4" />}
                                                    </td>
                                                    <td>
                                                        {row.accuracy_report === null
                                                            ? "-"
                                                            : row.accuracy_report === 1
                                                                ? <FaCheck className="textsuccess fs-4" />
                                                                : <FaTimes className="textdanger fs-4" />}
                                                    </td>
                                                    <td>
                                                        {row.demand_dsm_report === null
                                                            ? "-"
                                                            : row.demand_dsm_report === 1
                                                                ? <FaCheck className="textsuccess fs-4" />
                                                                : <FaTimes className="textdanger fs-4" />}
                                                    </td>
                                                </tr>

                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 mt-4 rounded bg-white p-2">
                            <div className="table-responsive">
                                <table className="table table-bordered mt-5">
                                    <thead>
                                        <tr className="bg-primary whitetext">
                                            <th className="fs-3" colSpan={7} scope="col">
                                                <Link to={"/ShiftB"} className="border border-2 rounded p-2 text-white">Shift_B</Link> Previous Solar Forecast Status
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Watsun</th>
                                            <th>Brookfields</th>
                                            <th>Brookfield Mail</th>
                                            <th>Accuracy Report</th>
                                            <th>Solar DSM Report</th>
                                            <th>Actual Updated</th>
                                            <th>Actual Not Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {(solarForecast).watson === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {(solarForecast).brookfields === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {(solarForecast).brookfieldsmail === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {(solarForecast).accuracyReport === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {(solarForecast).solarDsmReport === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {(solarForecast).actualUpdated === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {(solarForecast).actualNotUpdated === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* ShiftB */}


                    {/* shiftC */}
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-12 mt-4 rounded bg-white p-2'>
                            <div className="table-responsive">
                                <table className="table table-bordered mt-5">
                                    <thead>
                                        <tr className='bg-success'>
                                            <th className='fs-3 whitetext' colSpan={4}>
                                                <Link to={"/ShiftC"} className='border border-2 rounded p-2 text-white'>Shift_C</Link> Previous Forecast Status
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Forecast</th>
                                            <th>Operation</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterByDate(forecastData).filter(entry => entry.status_value !== 1)
                                            .map((entry) => (
                                                <tr key={entry.id}>
                                                    <td>{entry.forecast}</td>
                                                    <td>{entry.status_label}</td>
                                                    <td>{entry.status_value === 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* shiftC */}
                </div>
            </section>
        </>
    )
}

export default Pending_Works