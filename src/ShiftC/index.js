import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../Header'
import { FaCheck, FaTimes } from 'react-icons/fa'; // Example using react-icons


function ShiftC() {

    const [workDescription, setWorkDescription] = useState('');
    const [workStatus, setWorkStatus] = useState('');

    const handleSubmitAll = () => {
        const isConfirmed = window.confirm("Are you sure you want to insert the record?");
        if (!isConfirmed) return;

        handleSubmit();
        // handleSubmit4();
        handleSubmit5();

        alert("Data Submited Successfully");
        window.location.reload();
    }



    const handleSubmit5 = async (e) => {
        try {
            // Make the POST request
            const response = await axios.post('http://localhost:5001/shiftC_remarks', {
                work_description: workDescription,
                work_status: workStatus,
            });

            // Check the response status for 200
            if (response.status === 200) {
                setWorkDescription(''); // Clear the form fields
                setWorkStatus('');
            } else {
                alert('Failed to save data!'); // Handle any non-200 responses
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data'); // Handle any errors that occur during submission
        }
    };


    // const [checkboxes, setCheckboxes] = useState({
    //     ZYGRIB: { TN: false, RJ: false, MP: false, MH: false },
    //     NOWCAST: { "22:00 Hrs": false, "1:00 Hrs": false, "4:00 Hrs": false, "N/A": false },
    //     NOWCASTStatus: { TN: false, RJ: false, MP: false, MH: false },
    //     TNWeatherAnalysis: false,
    // });

    // // Handle checkbox changes
    // const handleCheckboxChange3 = (event) => {
    //     const { name, checked } = event.target;
    //     const [category, field] = name.split('.');

    //     if (field) {
    //         setCheckboxes((prev) => ({
    //             ...prev,
    //             [category]: { ...prev[category], [field]: checked },
    //         }));
    //     } else {
    //         setCheckboxes((prev) => ({
    //             ...prev,
    //             [name]: checked,
    //         }));
    //     }
    // };


    // const handleSubmit4 = async (e) => {
    //     try {
    //         const response = await axios.post("http://localhost:3001/shiftC_commonworks", checkboxes);
    //     } catch (error) {
    //         console.error(error);
    //         alert("Error submitting data");
    //     }
    // };

    // const [checkboxes, setCheckboxes] = useState({
    //     ZYGRIB: { TN: false, RJ: false, MP: false, MH: false },
    //     NOWCAST: { "22:00 Hrs": false, "1:00 Hrs": false, "4:00 Hrs": false, "N/A": false },
    //     NOWCASTStatus: { TN: false, RJ: false, MP: false, MH: false },
    //     TNWeatherAnalysis: false,
    // });
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3001/shiftC_commonworkslast");
    //             const previousData = response.data;

    //             // Pre-fill checkboxes based on previous data
    //             setCheckboxes((prev) => ({
    //                 ...prev,
    //                 ZYGRIB: {
    //                     TN: previousData.find((item) => item.operation === "ZYGRIB")?.TN || false,
    //                     RJ: previousData.find((item) => item.operation === "ZYGRIB")?.RJ || false,
    //                     MP: previousData.find((item) => item.operation === "ZYGRIB")?.MP || false,
    //                     MH: previousData.find((item) => item.operation === "ZYGRIB")?.MH || false,
    //                 },
    //                 NOWCASTStatus: {
    //                     TN: previousData.find((item) => item.operation === "NOWCAST")?.TN || false,
    //                     RJ: previousData.find((item) => item.operation === "NOWCAST")?.RJ || false,
    //                     MP: previousData.find((item) => item.operation === "NOWCAST")?.MP || false,
    //                     MH: previousData.find((item) => item.operation === "NOWCAST")?.MH || false,
    //                 },
    //                 TNWeatherAnalysis:
    //                     previousData.find((item) => item.operation === "TN Weather Analysis")?.TN || false,
    //             }));
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    // const handleCheckboxChange3 = (event) => {
    //     const { name, checked } = event.target;
    //     const [category, field] = name.split('.');

    //     if (field) {
    //         setCheckboxes((prev) => ({
    //             ...prev,
    //             [category]: { ...prev[category], [field]: checked },
    //         }));
    //     } else {
    //         setCheckboxes((prev) => ({
    //             ...prev,
    //             [name]: checked,
    //         }));
    //     }
    // };
    // const handleSubmit4 = async () => {
    //     try {
    //         await axios.post("http://localhost:3001/shiftC_commonworks", checkboxes);
    //     } catch (error) {
    //         console.error("Error submitting data:", error);
    //         alert("Error submitting data");
    //     }
    // };


    // const [statusData, setStatusData] = useState({
    //     forecast1: { ourGroup: false, ldc: false, mail: false },
    //     forecast2: { samast: false },
    //     forecast3: { customers: false },
    //     forecast4: { intraday: false, dayAhead: false }
    // });
    // const handleCheckboxChange = (forecast, status) => {
    //     setStatusData(prevState => ({
    //         ...prevState,
    //         [forecast]: {
    //             ...prevState[forecast],
    //             [status]: !prevState[forecast][status]
    //         }
    //     }));
    // };
    // const handleSubmit = async (e) => {

    //     const payload = [
    //         {
    //             forecast: "TN Forecast 22:30 Hours",
    //             status: [
    //                 { label: 'ourGroup', checked: statusData.forecast1.ourGroup },
    //                 { label: 'LDC', checked: statusData.forecast1.ldc },
    //                 { label: 'Mail', checked: statusData.forecast1.mail },
    //             ],
    //         },
    //         {
    //             forecast: "Day Ahead Schedule Upload",
    //             status: [
    //                 { label: 'Samast', checked: statusData.forecast2.samast },
    //             ],
    //         },
    //         {
    //             forecast: "Day Ahead Schedule Mail",
    //             status: [
    //                 { label: 'Customers', checked: statusData.forecast3.customers },
    //             ],
    //         },
    //         {
    //             forecast: "TN Model Selection",
    //             status: [
    //                 { label: 'Intraday', checked: statusData.forecast4.intraday },
    //                 { label: 'DayAhead', checked: statusData.forecast4.dayAhead },
    //             ],
    //         }
    //     ];

    //     try {
    //         await axios.post('http://localhost:3001/shiftC_forecaststatus', payload);
    //     } catch (error) {
    //         console.error('Error submitting data:', error);
    //         alert('Failed to submit data.');
    //     }
    // };
    // useEffect(() => {
    //     const fetchForecastData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3001/shiftC_forecaststatus/last');
    //             setForecastData(response.data);
    //         } catch (err) {
    //             setError('Error fetching data');
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchForecastData();
    // }, []);

    const [statusData, setStatusData] = useState({
        forecast1: { ourGroup: false, ldc: false, mail: false },
        forecast2: { samast: false },
        forecast3: { customers: false },
        forecast4: { intraday: false, dayAhead: false },
    });

    const [forecastDatastatus, setForecastDatastatus] = useState([]);
    const [error2, setError2] = useState(null);
    const [loading2, setLoading2] = useState(true);

    const handleCheckboxChange = (forecast, status) => {
        setStatusData(prevState => ({
            ...prevState,
            [forecast]: {
                ...prevState[forecast],
                [status]: !prevState[forecast][status],
            },
        }));
    };

    const handleSubmit = async () => {
        const payload = [
            {
                forecast: "TN Forecast 22:30 Hours",
                status: [
                    { label: 'ourGroup', checked: statusData.forecast1.ourGroup },
                    { label: 'LDC', checked: statusData.forecast1.ldc },
                    { label: 'Mail', checked: statusData.forecast1.mail },
                ],
            },
            {
                forecast: "Day Ahead Schedule Upload",
                status: [{ label: 'Samast', checked: statusData.forecast2.samast }],
            },
            {
                forecast: "Day Ahead Schedule Mail",
                status: [{ label: 'Customers', checked: statusData.forecast3.customers }],
            },
            {
                forecast: "TN Model Selection",
                status: [
                    { label: 'Intraday', checked: statusData.forecast4.intraday },
                    { label: 'DayAhead', checked: statusData.forecast4.dayAhead },
                ],
            },
        ];

        try {
            await axios.post('http://localhost:5001/shiftC_forecaststatus', payload);
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit data.');
        }
    };

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/shiftC_forecaststatus/last');
                // Map the fetched data to the state for checkboxes
                const newStatusData = { ...statusData };

                response.data.forEach(entry => {
                    const { forecast, status_label, status_value } = entry;
                    // Set the correct forecast and status_label to true/false based on status_value
                    if (forecast === "TN Forecast 22:30 Hours") {
                        if (status_label === 'ourGroup') newStatusData.forecast1.ourGroup = status_value === 1;
                        if (status_label === 'LDC') newStatusData.forecast1.ldc = status_value === 1;
                        if (status_label === 'Mail') newStatusData.forecast1.mail = status_value === 1;
                    }
                    if (forecast === "Day Ahead Schedule Upload") {
                        if (status_label === 'Samast') newStatusData.forecast2.samast = status_value === 1;
                    }
                    if (forecast === "Day Ahead Schedule Mail") {
                        if (status_label === 'Customers') newStatusData.forecast3.customers = status_value === 1;
                    }
                    if (forecast === "TN Model Selection") {
                        if (status_label === 'Intraday') newStatusData.forecast4.intraday = status_value === 1;
                        if (status_label === 'DayAhead') newStatusData.forecast4.dayAhead = status_value === 1;
                    }
                });

                setStatusData(newStatusData);
            } catch (err) {
                setError2('Error fetching data');
                console.error(err);
            } finally {
                setLoading2(false);
            }
        };

        fetchForecastData();
    }, []);






    const [error, setError] = useState(null);
    const [error1, setError1] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [remarksData, setRemarksData] = useState([]);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:/5001shiftC_commonworkslast");
                setData(response.data);  // Directly set the data without modification
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:5001/shiftB_remarkslast') // Assuming you have a GET route to fetch the data
            .then((response) => response.json())
            .then((fetchedData) => {
                setRemarksData(fetchedData); // Store the fetched data in state
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);






    return (
        <>
            <Header />
            <div className='container border'>

                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-md-2 border border-success border-2 text-center p-2 border mt-3 rounded shadow-sm bg-light'>
                        <h3 className='fs-2'>Shift - C</h3>
                    </div>
                </div>
                {/* <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table class="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-success whitetext'>
                                        <th className='fs-3 text-center' colSpan={5} scope="col">Forecast Status</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Forecast</th>
                                        <th className='text-center' colSpan={4} scope="col">Status</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">TN Forecast 22:30 Hours</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Our Group </td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck2" /> LDC</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Mail</td>

                                    </tr>


                                    <tr>
                                        <th scope="row">Day Ahead Schedule Upload</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Samast</td>
                                        <td>-</td>
                                        <td>-</td>

                                    </tr>

                                    <tr>
                                        <th scope="row">Day Ahead Schedule Mail</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Customers</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">TN Model Selection</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Intraday </td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Day Ahead</td>
                                        <td>-</td>

                                    </tr>



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
                {/* <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className="table-responsive">
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-primary'>
                                        <th className='fs-3 whitetext' colSpan={4}>
                                            Forecast Status Previous Entry
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Forecast</th>
                                        <th>Operation</th>
                                        <th>Status</th>
                                        <th>Date</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {forecastData.map((entry) => (
                                        <tr key={entry.id}>
                                            <td>{entry.forecast}</td>
                                            <td>{entry.status_label}</td>
                                            <td>{entry.status_value === 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>

                                            <td className='text-uppercase'>
                                                {new Date(entry.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

                <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className="bg-success whitetext">
                                        <th className="fs-3 text-start" colSpan={5} scope="col">
                                            Forecast Status Current Entry
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Forecast</th>
                                        <th className="text-center" scope="col">Status</th>
                                        <th className="text-center" scope="col">Status</th>
                                        <th className="text-center" scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">TN Forecast 22:30 Hours</th>
                                        <td>
                                            <input
                                                className="form-check-input cursor-pointer"
                                                type="checkbox"
                                                checked={statusData.forecast1.ourGroup}
                                                onChange={() => handleCheckboxChange('forecast1', 'ourGroup')}
                                            /> ourGroup
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input cursor-pointer"
                                                type="checkbox"
                                                checked={statusData.forecast1.ldc}
                                                onChange={() => handleCheckboxChange('forecast1', 'ldc')}
                                            /> LDC
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input cursor-pointer"
                                                type="checkbox"
                                                checked={statusData.forecast1.mail}
                                                onChange={() => handleCheckboxChange('forecast1', 'mail')}
                                            /> Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Day Ahead Schedule Upload</th>
                                        <td>
                                            <input
                                                className="form-check-input cursor-pointer"
                                                type="checkbox"
                                                checked={statusData.forecast2.samast}
                                                onChange={() => handleCheckboxChange('forecast2', 'samast')}
                                            /> Samast
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Day Ahead Schedule Mail</th>
                                        <td>
                                            <input
                                                className="form-check-input cursor-pointer"
                                                type="checkbox"
                                                checked={statusData.forecast3.customers}
                                                onChange={() => handleCheckboxChange('forecast3', 'customers')}
                                            /> Customers
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN Model Selection</th>
                                        <td>
                                            <input
                                                className="form-check-input cursor-pointer"
                                                type="checkbox"
                                                checked={statusData.forecast4.intraday}
                                                onChange={() => handleCheckboxChange('forecast4', 'intraday')}
                                            /> Intraday
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input cursor-pointer"
                                                type="checkbox"
                                                checked={statusData.forecast4.dayAhead}
                                                onChange={() => handleCheckboxChange('forecast4', 'dayAhead')}
                                            /> DayAhead
                                        </td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>


                            <div className='text-end'>
                                {/* <button onClick={handleSubmit} className="btn btn-success">Submit</button> */}
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table class="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-success whitetext'>
                                        <th className='fs-3 text-center' colSpan={5} scope="col">Common Works</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">ZYGRIB</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck11" /> TN</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck12" /> RJ</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck13" /> MP</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck14" /> MH</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" >NOWCAST</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck15" /> 7:00 Hrs</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck16" /> 10:00 Hrs</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck17" />13:00 Hrs </td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck17" /> N/A</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN Weather Analysis</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck28" /></td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
                {/* <div className="row">
                    <div className='col-md-12'>
                        <table className="table table-bordered mt-5">
                            <thead>
                                <tr className='bg-primary whitetext'>
                                    <th className='fs-3 text-start' colSpan={6} scope="col">Previous Common Works Entry</th>
                                </tr>
                                <tr>
                                    <th>Operations</th>
                                    <th>TN</th>
                                    <th>RJ</th>
                                    <th>MP</th>
                                    <th>MH</th>
                                    <th>Date</th>
                                </tr>

                            </thead>

                            <tbody>
                                {[...data.slice(0, 1), // Keep the first row as it is
                                {
                                    operation: "Nowcast Timing",
                                    TN: "22:00 Hrs", // Display the fixed time
                                    RJ: "1:00 Hrs",  // Display the fixed time
                                    MP: "4:00 Hrs",  // Display the fixed time
                                    MH: "N/A",       // Set MH to N/A
                                    created_at: new Date(), // Current date or any fixed date
                                },
                                ...data.slice(1), // Remaining rows
                                ].map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.operation}</td>


                                        <td>
                                            {item.TN == 1 ? (
                                                <FaCheck className="textsuccess fs-4" />
                                            ) : item.TN == 0 ? (
                                                <FaTimes className="textdanger fs-4" />
                                            ) : (
                                                item.TN
                                            )}
                                        </td>

                                        <td>
                                            {item.RJ == 1 ? (
                                                <FaCheck className="textsuccess fs-4" />
                                            ) : item.RJ == 0 ? (
                                                <FaTimes className="textdanger fs-4" />
                                            ) : (
                                                item.RJ
                                            )}
                                        </td>

                                        <td>
                                            {item.MP == 1 ? (
                                                <FaCheck className="textsuccess fs-4" />
                                            ) : item.MP == 0 ? (
                                                <FaTimes className="textdanger fs-4" />
                                            ) : (
                                                item.MP
                                            )}
                                        </td>
                                        <td>
                                            {item.MH == 1 ? (
                                                <FaCheck className="textsuccess fs-4" />
                                            ) : item.MH == 0 ? (
                                                <FaTimes className="textdanger fs-4" />
                                            ) : (
                                                item.MH // Displays "22:00 Hrs" or any other non-1/0 value
                                            )}
                                        </td>

                                        <td className="text-uppercase">
                                            {new Date(item.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>
                        {data.length === 0 && <p className='border p-2 rounded bg-light'>No data available.</p>}
                    </div>
                </div> */}

                {/* <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered mt-5">
                            <thead>
                                <tr className="bg-success whitetext">
                                    <th className="fs-3" colSpan={5} scope="col">Common Works Entry</th>
                                </tr>
                                <tr>
                                    <th>Operations</th>
                                    <th>TN</th>
                                    <th>RJ</th>
                                    <th>MP</th>
                                    <th>KL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ZYGRIB</td>
                                    <td>
                                        <input type="checkbox" name="ZYGRIB.TN" checked={checkboxes.ZYGRIB.TN} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                    <td>
                                        <input type="checkbox" name="ZYGRIB.RJ" checked={checkboxes.ZYGRIB.RJ} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                    <td>
                                        <input type="checkbox" name="ZYGRIB.MP" checked={checkboxes.ZYGRIB.MP} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                    <td>
                                        <input type="checkbox" name="ZYGRIB.MH" checked={checkboxes.ZYGRIB.MH} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>NOWCAST Timing</td>
                                    <td>22:00 Hrs</td>
                                    <td>1:00 Hrs</td>
                                    <td>4:00 Hrs</td>
                                    <td>N/A</td>
                                </tr>
                                <tr>
                                    <td>NOWCAST Status</td>
                                    <td>
                                        <input type="checkbox" name="NOWCASTStatus.TN" checked={checkboxes.NOWCASTStatus.TN} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                    <td>
                                        <input type="checkbox" name="NOWCASTStatus.RJ" checked={checkboxes.NOWCASTStatus.RJ} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                    <td>
                                        <input type="checkbox" name="NOWCASTStatus.MP" checked={checkboxes.NOWCASTStatus.MP} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                    <td>
                                        <input type="checkbox" name="NOWCASTStatus.MH" checked={checkboxes.NOWCASTStatus.MH} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>TN Weather Analysis</td>
                                    <td>
                                        <input type="checkbox" name="TNWeatherAnalysis" checked={checkboxes.TNWeatherAnalysis} onChange={handleCheckboxChange3} className="form-check-input" />
                                    </td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-end">
                            <button onClick={handleSubmit4} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div> */}


                {/* <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table class="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-success whitetext'>
                                        <th className='fs-3 text-center' colSpan={5} scope="col">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Work Description</th>
                                        <th scope="row" >Work Status</th>


                                    </tr>
                                    <tr>
                                        <td><textarea placeholder='Work Description' className='form-control'></textarea></td>
                                        <td><textarea placeholder='Work Status' className='form-control'></textarea></td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className="bg-primary whitetext">
                                        <th className="fs-3" colSpan={3} scope="col">Previous Shift_B Remarks</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Completed Work Remarks</th>
                                        <th scope="col">Pending Work Remarks</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {remarksData.map((remark) => (
                                        <tr key={remark.id}>
                                            <td>{remark.work_description}</td>
                                            <td>{remark.work_status}</td>
                                            <td className="text-uppercase">
                                                {new Date(remark.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-success whitetext'>
                                        <th className='fs-3 ' colSpan={5} scope="col"> Current Shift_C Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Completed Work Remarks <span className='textdanger'>*</span></th>
                                        <th scope="row">Pending Work Remarks <span className='textdanger'>*</span></th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <textarea
                                                value={workDescription}
                                                onChange={(e) => setWorkDescription(e.target.value)}
                                                placeholder='Completed Works...'
                                                className='form-control'
                                            ></textarea>
                                        </td>
                                        <td>
                                            <textarea
                                                value={workStatus}
                                                onChange={(e) => setWorkStatus(e.target.value)}
                                                placeholder='Pending Works...'
                                                className='form-control'
                                            ></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='text-end'>
                                {/* <button onClick={handleSubmit5} className="btn btn-success">Submit</button> */}
                                <button onClick={handleSubmitAll} className="btn btn-success border  border-success border-2">Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShiftC




