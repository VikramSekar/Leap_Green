import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Example using react-icons
import Header from '../Header';
import { Link } from 'react-router-dom';












function Pending_Works() {
    const [models, setModels] = useState([
        { modelName: 'ARPEGE 25 & ICON 25', utcUpdate: '00', numOfDays: '4 & 8', numOfFiles: '2', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ARPEGE 25 & ICON 25', utcUpdate: '12', numOfDays: '4 & 8', numOfFiles: '2', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GEM 15km', utcUpdate: '00', numOfDays: '10', numOfFiles: '1539', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GEM 15km', utcUpdate: '12', numOfDays: '10', numOfFiles: '1539', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GFS 25km', utcUpdate: '00', numOfDays: '10', numOfFiles: '213', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GFS 25km', utcUpdate: '06', numOfDays: '10', numOfFiles: '213', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GFS 25km', utcUpdate: '12', numOfDays: '10', numOfFiles: '213', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GFS 25km', utcUpdate: '18', numOfDays: '10', numOfFiles: '213', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ICON 13', utcUpdate: '00', numOfDays: '8', numOfFiles: '8', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ICON 13', utcUpdate: '06', numOfDays: '8', numOfFiles: '8', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ICON 13', utcUpdate: '12', numOfDays: '8', numOfFiles: '8', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ICON 13', utcUpdate: '18', numOfDays: '8', numOfFiles: '8', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ECMRWF 09km 10km 100km', utcUpdate: '00', numOfDays: '2', numOfFiles: '23', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ECMRWF 09km 10km 100km', utcUpdate: '06', numOfDays: '2', numOfFiles: '23', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ECMRWF 09km 10km 100km', utcUpdate: '12', numOfDays: '2', numOfFiles: '23', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ECMRWF 09km 10km 100km', utcUpdate: '18', numOfDays: '2', numOfFiles: '23', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Basic', utcUpdate: '05', numOfDays: '7', numOfFiles: '1', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Basic', utcUpdate: '16', numOfDays: '7', numOfFiles: '1', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Basic 80mm', utcUpdate: '05', numOfDays: '7', numOfFiles: '1', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Basic 80mm', utcUpdate: '16', numOfDays: '7', numOfFiles: '1', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Multi Model', utcUpdate: '00', numOfDays: '7', numOfFiles: '3', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Multi Model', utcUpdate: '12', numOfDays: '7', numOfFiles: '3', d: false, e: false, fg: false, pt: false, remarks: '' },
    ]);

    const [fetchmodels, setFetchModels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/fetch-models')
            .then(response => {
                setFetchModels(response.data);
            })
            .catch(error => {
                console.error('Error fetching models:', error);
            });
    }, []);

    const [data, setData] = useState([]);
    useEffect(() => {
        // Fetch the last submitted data on component mount
        axios.get('http://localhost:3001/shiftA_preworkstatuslast')
            .then(response => {
                setData(response.data); // Populate the table with the last entry
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const [preForecast, setPreForecast] = useState([]);
    useEffect(() => {
        // Fetch data when the component mounts
        axios.get('http://localhost:3001/shiftA_forecastlast')
            .then(response => setPreForecast(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const [preReport, setPreReport] = useState([]);
    useEffect(() => {
        // Fetch data when the component mounts
        axios.get('http://localhost:3001/shiftA_reportlast')
            .then(response => setPreReport(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const [preCommonWork, setpreCommonWork] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/shiftA_commonworkslast");
                setpreCommonWork(response.data);  // Directly set the data without modification
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
        const fetchForecasts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/shiftB_forecastlast');
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
        fetch('http://localhost:3001/shiftB_demandforecastlast')
            .then(response => response.json())
            .then(data => setForecastDataFetch(data))
            .catch(error => console.error('Error fetching forecast data:', error));
    }, []);

    // const [tableData, setTableData] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:3001/shiftB_solarforecastlast')
    //         .then(response => response.json())
    //         .then(fetchedTableData => setTableData(fetchedTableData))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);

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
    //     fetch('http://localhost:3001/shiftB_solarforecastlast')
    //         .then(response => response.json())
    //         .then(data => {
    //             // Set the fetched data to solarForecast state
    //             setSolarForecast(data);
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);

    const [solarForecast, setSolarForecast] = useState({
        watson: false,
        brookfields: false,
        brookfieldsmail: false,
        accuracyReport: false,
        solarDsmReport: false,
        actualUpdated: false,
        actualNotUpdated: false,
    });

    useEffect(() => {
        // Fetch the previous entry for solar forecast
        fetch('http://localhost:3001/shiftB_solarforecastlast')
            .then(response => response.json())
            .then(data => {
                // Set the fetched data to solarForecast state
                setSolarForecast(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const [preCommonWorkb, setpreCommonWorkb] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/shiftB_commonworkslast");
                setpreCommonWorkb(response.data);  // Directly set the data without modification
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
                const response = await axios.get("http://localhost:3001/shiftC_forecaststatus/last");
                setForecastData(response.data);  // Directly set the data without modification
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const [preCommonWorkc, setpreCommonWorkc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/shiftC_commonworkslast");
                setpreCommonWorkc(response.data);  // Directly set the data without modification
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

                    {/* NWP Models */}
                    <div className='row d-flex justify-content-center mt-5'>
                        <div className='col-md-12 mt-4 bg-white p-2 rounded'>
                            <div className='table-responsive'>
                                <table className="table table-bordered table-striped">
                                    <thead className="table-light">
                                        <tr>
                                            <th className='bg-danger fs-4 whitetext' colSpan={9}><Link to={"/Model_Summary"} className='border border-2 rounded p-2 text-white'>NWP Models</Link> Pending Works Model Summary</th>
                                        </tr>
                                        <tr className='position'>
                                            <th>Model Name</th>
                                            <th>UTC Update</th>
                                            <th className='d-none'>D</th>
                                            <th className='d-none'>E</th>
                                            <th className='d-none'>FG</th>
                                            <th className='d-none'>FT</th>
                                            {/* <th>Shift</th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fetchmodels
                                            .filter(
                                                (fetching) =>
                                                    fetching.d !== 1 || fetching.e !== 1 || fetching.fg !== 1 || fetching.pt !== 1
                                            )
                                            .map((fetching, index, array) => {
                                                // Determine if this is the first occurrence of the current modelName
                                                const isFirstOccurrence =
                                                    index === 0 || array[index - 1].modelName !== fetching.modelName;

                                                // Calculate rowSpan for the current modelName
                                                const rowSpan = array.filter((m) => m.modelName === fetching.modelName).length;

                                                return (
                                                    <tr key={index}>
                                                        {/* Render modelName only for the first occurrence */}
                                                        {isFirstOccurrence && (
                                                            <td rowSpan={rowSpan}>{fetching.modelName}</td>
                                                        )}
                                                        <td>{fetching.utcUpdate}</td>
                                                        <td className="d-none">
                                                            {fetching.d === 1 ? (
                                                                <FaCheck className="textsuccess fs-4" />
                                                            ) : (
                                                                <FaTimes className="textdanger fs-4" />
                                                            )}
                                                        </td>
                                                        <td className="d-none">
                                                            {fetching.e === 1 ? (
                                                                <FaCheck className="textsuccess fs-4" />
                                                            ) : (
                                                                <FaTimes className="textdanger fs-4" />
                                                            )}
                                                        </td>
                                                        <td className="d-none">
                                                            {fetching.fg === 1 ? (
                                                                <FaCheck className="textsuccess fs-4" />
                                                            ) : (
                                                                <FaTimes className="textdanger fs-4" />
                                                            )}
                                                        </td>
                                                        <td className="d-none">
                                                            {fetching.pt === 1 ? (
                                                                <FaCheck className="textsuccess fs-4" />
                                                            ) : (
                                                                <FaTimes className="textdanger fs-4" />
                                                            )}
                                                        </td>
                                                        {/* <td>{fetching.remarks}</td> */}
                                                    </tr>
                                                );
                                            })}
                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                    {/* NWP Models */}

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
                                            {/* <th scope="col">MP</th> */}
                                            {/* <th scope="col">MH</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data
                                            .filter(row => row.TN !== 1 || row.RJ !== 1) // Filter rows with any unchecked value
                                            .map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.operation}</td>
                                                    <td>{row.TN === 1 ? <FaCheck className="textsuccess fs-4" /> : <FaTimes className="textdanger fs-4" />}</td>
                                                    <td>{row.RJ === 1 ? <FaCheck className="textsuccess fs-4" /> : <FaTimes className="textdanger fs-4" />}</td>
                                                    {/* <td>{row.MP === 1 ? <FaCheck className="textsuccess fs-4" /> : <FaTimes className="textdanger fs-4" />}</td> */}
                                                    {/* <td>{row.MH === 1 ? <FaCheck className="textsuccess fs-4" /> : <FaTimes className="textdanger fs-4" />}</td> */}
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
                                        {preForecast.filter(forecast => forecast.our_group !== 1 || forecast.ldc !== 1 || forecast.mail !== 1 || forecast.main_group !== 1 || forecast.tangedco !== 1 || forecast.teca !== 1 || forecast.tn_15_days !== 1 || forecast.rj_15_days !== 1)
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
                                            {/* <th scope="col">RJ</th> */}
                                            {/* <th scope="col">MP</th> */}
                                            {/* <th scope="col">MH</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {preReport.filter(report => report.TN !== 1)
                                            .map((report, index) => (
                                                <tr key={index}>
                                                    <td>{report.report_name}</td>
                                                    <td>{report.TN == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                    {/* <td>{report.RJ == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td> */}
                                                    {/* <td>{report.MP == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td> */}
                                                    {/* <td>{report.MH == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td> */}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className='col-md-12 mt-4 rounded bg-white p-2'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-danger whitetext'>
                                        <th className='fs-3 text-start' colSpan={6} scope="col"><Link to={"/ShiftA"} className='border border-2 rounded p-2 text-white'>Shift_A</Link> Previous Common Works Status</th>
                                    </tr>
                                    <tr>
                                        <th>Operations</th>
                                        <th>TN</th>
                                        <th>RJ</th>
                                        <th>MP</th>
                                        <th>MH</th>
                                        {/* <th>Date</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ...preCommonWork.slice(0, 1),
                                        {
                                            operation: "Nowcast Timing",
                                            TN: "7:00 Hrs",
                                            RJ: "10:00 Hrs",
                                            MP: "13:00 Hrs",
                                            MH: "N/A",
                                            created_at: new Date(),
                                        },
                                        ...preCommonWork.slice(1).filter(
                                            item =>
                                                item.TN !== 1 ||
                                                item.RJ !== 1 ||
                                                item.MP !== 1 ||
                                                item.MH !== 1
                                        ), // Filter rows with at least one unchecked value
                                    ].map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.operation}</td>
                                            <td>
                                                {item.TN === 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : item.TN === 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    item.TN
                                                )}
                                            </td>
                                            <td>
                                                {item.RJ === 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : item.RJ === 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    item.RJ
                                                )}
                                            </td>
                                            <td>
                                                {item.MP === 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : item.MP === 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    item.MP
                                                )}
                                            </td>
                                            <td>
                                                {item.MH === 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : item.MH === 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    item.MH
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>


                            </table>
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
                                            <th>TN 15 Days</th>
                                            <th>RJ 15 Days</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {forecasts.filter(forecast => forecast.our_group !== 1 || forecast.ldc !== 1 || forecast.mail !== 1 || forecast.main_group !== 1 || forecast.tangedco !== 1 || forecast.teca !== 1 || forecast.tn_15_days !== 1 || forecast.rj_15_days !== 1)
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
                                                    <td>
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
                                                    </td>

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
                                        {forecastDataFetch.filter(row => row.tn !== 1 || row.our_group !== 1 || row.main_group !== 1 || row.accuracy_report !== 1 || row.demand_dsm_report !== 1)
                                            .map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.forecast_type}</td>
                                                    <td>
                                                        {row.tn == 1 ? (
                                                            <FaCheck className='textsuccess fs-4' />
                                                        ) : row.tn == 0 ? (
                                                            <FaTimes className='textdanger fs-4' />
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                    <td>
                                                        {row.our_group == 1 ? (
                                                            <FaCheck className='textsuccess fs-4' />
                                                        ) : row.our_group == 0 ? (
                                                            <FaTimes className='textdanger fs-4' />
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                    <td>
                                                        {row.main_group == 1 ? (
                                                            <FaCheck className='textsuccess fs-4' />
                                                        ) : row.main_group == 0 ? (
                                                            <FaTimes className='textdanger fs-4' />
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                    <td>
                                                        {row.accuracy_report == 1 ? (
                                                            <FaCheck className='textsuccess fs-4' />
                                                        ) : row.accuracy_report == 0 ? (
                                                            <FaTimes className='textdanger fs-4' />
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                    <td>
                                                        {row.demand_dsm_report == 1 ? (
                                                            <FaCheck className='textsuccess fs-4' />
                                                        ) : row.demand_dsm_report == 0 ? (
                                                            <FaTimes className='textdanger fs-4' />
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                    {/* Solar Forecast */}
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
                                            <th>Watson</th>
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
                                                {solarForecast.watson === 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {solarForecast.brookfields === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {solarForecast.brookfieldsmail === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {solarForecast.accuracyReport === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {solarForecast.solarDsmReport === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {solarForecast.actualUpdated === true ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : (
                                                    <FaTimes className="textdanger fs-4" />
                                                )}
                                            </td>
                                            <td>
                                                {solarForecast.actualNotUpdated === true ? (
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
                                            <th className='d-none' >Status</th>
                                            {/* <th>Date</th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {forecastData.filter(entry => entry.status_value !== 1)
                                            .map((entry) => (
                                                <tr key={entry.id}>
                                                    <td>{entry.forecast}</td>
                                                    <td>{entry.status_label}</td>
                                                    <td className='d-none'>{entry.status_value === 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>

                                                    {/* <td className='text-uppercase'>
                                                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </td> */}
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