import React from 'react'
import Header from '../Header'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Example using react-icons


function ShiftB() {
    const handleSubmitAll = () => {
        const isConfirmed = window.confirm("Are you sure you want to insert the record?");
        if (!isConfirmed) return;
        handleSubmit1();
        handleSubmit2();
        handleSubmit3();
        // handleSubmit4();
        handleSubmit5();

        alert("Data Submitted Successfully");
        window.location.reload();
    }
















    const [workDescription, setWorkDescription] = useState('');
    const [workStatus, setWorkStatus] = useState('');
    const handleSubmit5 = async (e) => {
        try {
            // Make the POST request
            const response = await axios.post('http://localhost:5001/shiftB_remarks', {
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






    // const [forecastData, setForecastData] = useState({
    //     tnForecast1700: { ourGroup: false, ldc: false, mail: false },
    //     tnForecast2100: { ourGroup: false, mainGroup: false, mail: false },
    //     rjForecast2100: { ourGroup: false, ldc: false, mail: false },
    //     tangedco: { tangedco: false },
    //     teca: { teca: false },
    //     tn15DaysForecast: { tn15Days: false },
    //     rj15DaysForecast: { rj15Days: false },
    // });

    // const handleCheckboxChange1 = (event, forecastType, field) => {
    //     setForecastData({
    //         ...forecastData,
    //         [forecastType]: {
    //             ...forecastData[forecastType],
    //             [field]: event.target.checked,
    //         },
    //     });
    // };

    // const handleSubmit1 = () => {
    //     axios.post('http://localhost:3001/shiftB_forecast', forecastData)
    //         .then(response => {
    //         })
    //         .catch(error => {
    //             console.error('There was an error saving the data!', error);
    //         });
    // };
    // const [forecasts, setForecasts] = useState([]);

    // useEffect(() => {
    //     const fetchForecasts = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3001/shiftB_forecastlast');
    //             setForecasts(response.data);
    //         } catch (error) {
    //             console.error('Error fetching forecasts:', error);
    //         }
    //     };

    //     fetchForecasts();
    // }, []);
    const [forecastData, setForecastData] = useState({
        tnForecast1700: { ourGroup: false, ldc: false, mail: false },
        tnForecast2100: { ourGroup: false, mainGroup: false, mail: false },
        rjForecast2100: { ourGroup: false, ldc: false, mail: false },
        tangedco: { tangedco: false },
        teca: { teca: false },
        tn15DaysForecast: { tn15Days: false },
        rj15DaysForecast: { rj15Days: false },
    });
    // Handle checkbox changes
    const handleCheckboxChange1 = (event, forecastType, field) => {
        setForecastData({
            ...forecastData,
            [forecastType]: {
                ...forecastData[forecastType],
                [field]: event.target.checked,
            },
        });
    };
    // Fetch the last saved forecast entry
    useEffect(() => {
        const fetchLastForecast = async () => {
            try {
                const response = await axios.get('http://localhost:5001/shiftB_forecastlast');
                const lastForecast = response.data;

                if (lastForecast.length > 0) {
                    const mappedForecast = mapForecastFromDB(lastForecast);
                    setForecastData(mappedForecast);
                }
            } catch (error) {
                console.error('Error fetching last forecast:', error);
            }
        };

        fetchLastForecast();
    }, []);
    // Map database rows to forecastData structure
    const mapForecastFromDB = (rows) => {
        const forecast = {};
        rows.forEach((row) => {
            switch (row.forecast_type) {
                case 'TN Forecast 17:00 Hours':
                    forecast.tnForecast1700 = {
                        ourGroup: !!row.our_group,
                        ldc: !!row.ldc,
                        mail: !!row.mail,
                    };
                    break;
                case 'TN Forecast 21:00 Hours':
                    forecast.tnForecast2100 = {
                        ourGroup: !!row.our_group,
                        mainGroup: !!row.main_group,
                        mail: !!row.mail,
                    };
                    break;
                case 'RJ Forecast 21:00 Hours':
                    forecast.rjForecast2100 = {
                        ourGroup: !!row.our_group,
                        ldc: !!row.ldc,
                        mail: !!row.mail,
                    };
                    break;
                case 'TANGEDCO':
                    forecast.tangedco = { tangedco: !!row.tangedco };
                    break;
                case 'TECA':
                    forecast.teca = { teca: !!row.teca };
                    break;
                case 'TN 15 Days Forecast':
                    forecast.tn15DaysForecast = { tn15Days: !!row.tn_15_days };
                    break;
                case 'RJ 15 Days Forecast':
                    forecast.rj15DaysForecast = { rj15Days: !!row.rj_15_days };
                    break;
                default:
                    break;
            }
        });

        return {
            ...forecastData, // Preserve default values for missing fields
            ...forecast,
        };
    };
    // Submit new forecast data
    const handleSubmit1 = async () => {
        try {
            await axios.post('http://localhost:5001/shiftB_forecast', forecastData);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };






    // const [demandForecastData, setDemandForecastData] = useState({
    //     demandZygrib: { tn: false },
    //     tnDemandForecast1800: { ourGroup: false, mainGroup: false },
    //     demandReports: { accuracyReport: false, demandDsmReport: false },
    // });
    // const handleCheckboxChange2 = (event, forecastType, field) => {
    //     setDemandForecastData({
    //         ...demandForecastData,
    //         [forecastType]: {
    //             ...demandForecastData[forecastType],
    //             [field]: event.target.checked,
    //         },
    //     });
    // };
    // const handleSubmit2 = () => {
    //     axios.post('http://localhost:3001/shiftB_demandforecast', demandForecastData)
    //         .then(response => {
    //         })
    //         .catch(error => {
    //             console.error('There was an error saving the data!', error);
    //         });
    // };
    // const [forecastDataFetch, setForecastDataFetch] = useState([]);
    // useEffect(() => {
    //     // Fetch data from the API
    //     fetch('http://localhost:3001/shiftB_demandforecastlast')
    //         .then(response => response.json())
    //         .then(data => setForecastDataFetch(data))
    //         .catch(error => console.error('Error fetching forecast data:', error));
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

    // const handleChange3 = (e) => {
    //     setSolarForecast({
    //         ...solarForecast,
    //         [e.target.name]: e.target.checked
    //     });
    // };

    // const handleSubmit3 = async (e) => {
    //     try {
    //         const response = await axios.post('http://localhost:3001/shiftB_solarforecast', solarForecast);
    //     } catch (error) {
    //         console.error('Error submitting data:', error);
    //         alert('Error submitting data');
    //     }
    // };
    // const [tableData, setTableData] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:3001/shiftB_solarforecastlast')
    //         .then(response => response.json())
    //         .then(fetchedTableData => setTableData(fetchedTableData))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);


    const [demandForecastData, setDemandForecastData] = useState({
        demandZygrib: { tn: false },
        tnDemandForecast1800: { ourGroup: false, mainGroup: false },
        demandReports: { accuracyReport: false, demandDsmReport: false },
    });

    // Fetch the last entry data on component mount
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:3001/shiftB_demandforecastlast")
    //         .then((response) => {
    //             console.log("Fetched data:", response.data);
    //             if (response.data.length > 0) {
    //                 const lastEntry = response.data[0];  // assuming the response contains an array of objects
    //                 const updatedData = {
    //                     demandZygrib: { tn: !!lastEntry.tn },
    //                     tnDemandForecast1800: {
    //                         ourGroup: !!lastEntry.our_group,
    //                         mainGroup: !!lastEntry.main_group,
    //                     },
    //                     demandReports: {
    //                         accuracyReport: !!lastEntry.accuracy_report,
    //                         demandDsmReport: !!lastEntry.demand_dsm_report,
    //                     },
    //                 };
    //                 setDemandForecastData(updatedData); // Update the state with the last entry data
    //             }
    //         })
    //         .catch((error) => console.error("Error fetching forecast data:", error));
    // }, []);

    useEffect(() => {
        axios.get('http://localhost:5001/shiftB_demandforecastlast')
            .then(response => {
                const forecastEntries = response.data;
                const updatedForecastData = {
                    demandZygrib: { tn: false },
                    tnDemandForecast1800: { ourGroup: false, mainGroup: false },
                    demandReports: { accuracyReport: false, demandDsmReport: false },
                };

                forecastEntries.forEach(entry => {
                    switch (entry.forecast_type) {
                        case 'DEMAND ZYGRIB':
                            updatedForecastData.demandZygrib.tn = entry.tn === 1;
                            break;
                        case 'TN Demand Forecast 18:00 Hours':
                            updatedForecastData.tnDemandForecast1800 = {
                                ourGroup: entry.our_group === 1,
                                mainGroup: entry.main_group === 1,
                            };
                            break;
                        case 'Demand Reports':
                            updatedForecastData.demandReports = {
                                accuracyReport: entry.accuracy_report === 1,
                                demandDsmReport: entry.demand_dsm_report === 1,
                            };
                            break;
                        default:
                            break;
                    }
                });

                setDemandForecastData(updatedForecastData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    // Handle checkbox change to update state
    const handleCheckboxChange2 = (event, forecastType, field) => {
        setDemandForecastData((prevData) => ({
            ...prevData,
            [forecastType]: {
                ...prevData[forecastType],
                [field]: event.target.checked, // Update the state based on checkbox status
            },
        }));
    };

    const handleSubmit2 = () => {
        axios
            .post("http://localhost:5001/shiftB_demandforecast", demandForecastData)
            .then(() => {
                console.log("Data saved successfully");
            })
            .catch((error) => {
                console.error("There was an error saving the data!", error);
            });
    };









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
        fetch('http://localhost:5001/shiftB_solarforecastlast')
            .then(response => response.json())
            .then(data => {
                // Set the fetched data to solarForecast state
                setSolarForecast(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    // Handle checkbox changes
    const handleChange3 = (e) => {
        setSolarForecast({
            ...solarForecast,
            [e.target.name]: e.target.checked
        });
    };
    // Submit data
    const handleSubmit3 = async () => {
        try {
            const response = await axios.post('http://localhost:5001/shiftB_solarforecast', solarForecast);
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data');
        }
    };




    // const [checkboxes, setCheckboxes] = useState({
    //     ZYGRIB: { TN: false, RJ: false, MP: false, MH: false },
    //     NOWCAST: { "16:00 Hrs": false, "19:00 Hrs": false, "22:00 Hrs": false, "N/A": false },
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
    //         const response = await axios.post("http://localhost:3001/shiftB_commonworks", checkboxes);
    //     } catch (error) {
    //         console.error(error);
    //         alert("Error submitting data");
    //     }
    // };
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3001/shiftB_commonworkslast");
    //             setData(response.data);  // Directly set the data without modification
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // const [checkboxes, setCheckboxes] = useState({
    //     ZYGRIB: { TN: false, RJ: false, MP: false, MH: false },
    //     NOWCAST: { "16:00 Hrs": false, "19:00 Hrs": false, "22:00 Hrs": false, "N/A": false },
    //     NOWCASTStatus: { TN: false, RJ: false, MP: false, MH: false },
    //     TNWeatherAnalysis: false,
    // });
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3001/shiftB_commonworkslast");
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
    // // Submit handler remains unchanged
    // const handleSubmit4 = async () => {
    //     try {
    //         await axios.post("http://localhost:3001/shiftB_commonworks", checkboxes);
    //     } catch (error) {
    //         console.error("Error submitting data:", error);
    //         alert("Error submitting data");
    //     }
    // };


    const [remarksData, setRemarksData] = useState([]);
    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:5001/shiftA_remarkslast') // Assuming you have a GET route to fetch the data
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
                        <h3 className='fs-2'>Shift - B</h3>
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
                                        <th scope="row">TN Forecast 17:00 Hours</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Our Group </td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck2" /> LDC</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Mail</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">TN Forecast 21:00 Hours</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Our Group</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Main Group</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck2" /> Mail</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">RJ Forecast 21:00 Hours</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Our Group </td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck2" /> LDC</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Mail</td>

                                    </tr>

                                    <tr>
                                        <th scope="row">TANGEDCO</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> TANGEDCO</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">TECA</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> TECA</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">TN 15 Days Forecast</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> TN 15 Days</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">RJ 15 Days Forecast</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> RJ 15 Days</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
                {/* <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive bg-light rounded'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-primary text-white'>
                                        <th className='fs-3  whitetext' colSpan={9} scope="col">Previous Entry Forecast Status</th>
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
                                    {forecasts.map((forecast) => (
                                        <tr key={forecast.id}>
                                            <td>{forecast.forecast_type}</td>
                                            <td>
                                                {forecast.our_group == 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : forecast.our_group == 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td>
                                                {forecast.ldc == 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : forecast.ldc == 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td>
                                                {forecast.mail == 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : forecast.mail == 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td>
                                                {forecast.main_group == 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : forecast.main_group == 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td>
                                                {forecast.tangedco == 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : forecast.tangedco == 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td>
                                                {forecast.teca == 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : forecast.teca == 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td>
                                                {forecast.tn_15_days == 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : forecast.tn_15_days == 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td>
                                                {forecast.rj_15_days == 1 ? (
                                                    <FaCheck className="textsuccess fs-4" />
                                                ) : forecast.rj_15_days == 0 ? (
                                                    <FaTimes className="textdanger fs-4" />
                                                ) : (
                                                    "N/A"
                                                )}
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
                                    <tr className="bg-success text-white">
                                        <th className="fs-3 whitetext" colSpan={4} scope="col">Current Entry Forecast Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">TN Forecast 17:00 Hours</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.tnForecast1700.ourGroup}
                                                onChange={(e) => handleCheckboxChange1(e, "tnForecast1700", "ourGroup")}
                                            /> Our Group
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.tnForecast1700.ldc}
                                                onChange={(e) => handleCheckboxChange1(e, "tnForecast1700", "ldc")}
                                            /> LDC
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.tnForecast1700.mail}
                                                onChange={(e) => handleCheckboxChange1(e, "tnForecast1700", "mail")}
                                            /> Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN Forecast 21:00 Hours</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.tnForecast2100.ourGroup}
                                                onChange={(e) => handleCheckboxChange1(e, "tnForecast2100", "ourGroup")}
                                            /> Our Group
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.tnForecast2100.mainGroup}
                                                onChange={(e) => handleCheckboxChange1(e, "tnForecast2100", "mainGroup")}
                                            /> Main Group
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.tnForecast2100.mail}
                                                onChange={(e) => handleCheckboxChange1(e, "tnForecast2100", "mail")}
                                            /> Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">RJ Forecast 21:00 Hours</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.rjForecast2100.ourGroup}
                                                onChange={(e) => handleCheckboxChange1(e, "rjForecast2100", "ourGroup")}
                                            /> Our Group
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.rjForecast2100.ldc}
                                                onChange={(e) => handleCheckboxChange1(e, "rjForecast2100", "ldc")}
                                            /> LDC
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.rjForecast2100.mail}
                                                onChange={(e) => handleCheckboxChange1(e, "rjForecast2100", "mail")}
                                            /> Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TANGEDCO</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.tangedco.tangedco}
                                                onChange={(e) => handleCheckboxChange1(e, "tangedco", "tangedco")}
                                            /> TANGEDCO
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TECA</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.teca.teca}
                                                onChange={(e) => handleCheckboxChange1(e, "teca", "teca")}
                                            /> TECA
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    {/* <tr>
                                        <th scope="row">TN 15 Days Forecast</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.tn15DaysForecast.tn15Days}
                                                onChange={(e) => handleCheckboxChange1(e, "tn15DaysForecast", "tn15Days")}
                                            /> TN 15 Days
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">RJ 15 Days Forecast</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={forecastData.rj15DaysForecast.rj15Days}
                                                onChange={(e) => handleCheckboxChange1(e, "rj15DaysForecast", "rj15Days")}
                                            /> RJ 15 Days
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr> */}
                                </tbody>
                            </table>
                            <div className='text-end'>
                                {/* <button className="btn btn-success mt-3 px-5 me-3 border border-2 border-success" onClick={handleSubmit1}>Submit</button> */}
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
                                        <th className='fs-3 text-center' colSpan={5} scope="col">Demand Forecast Status</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Forecast</th>
                                        <th className='text-center' scope="col">Status</th>
                                        <th className='text-center' scope="col">Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">DEMAND ZYGRIB</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck11" /> TN</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN Demand Forecast 18:00 Hours</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Our Group</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Main Group</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Demand Reports</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Accuracy Report</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Demand DSM Report</td>

                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

                {/* <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-primary text-white'>
                                        <th className='fs-3 whitetext' colSpan={6} scope="col"> Previous Demand Forecast Status</th>
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
                                    {forecastDataFetch.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.forecast_type}</td>
                                            <td>
                                                {row.tn == 1 ? (
                                                    <FaCheck className='textsuccess fs-4' />
                                                ) : row.tn == 0 ? (
                                                    <FaTimes className='textdanger fs-4' />
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td>
                                                {row.our_group == 1 ? (
                                                    <FaCheck className='textsuccess fs-4' />
                                                ) : row.our_group == 0 ? (
                                                    <FaTimes className='textdanger fs-4' />
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td>
                                                {row.main_group == 1 ? (
                                                    <FaCheck className='textsuccess fs-4' />
                                                ) : row.main_group == 0 ? (
                                                    <FaTimes className='textdanger fs-4' />
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td>
                                                {row.accuracy_report == 1 ? (
                                                    <FaCheck className='textsuccess fs-4' />
                                                ) : row.accuracy_report == 0 ? (
                                                    <FaTimes className='textdanger fs-4' />
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td>
                                                {row.demand_dsm_report == 1 ? (
                                                    <FaCheck className='textsuccess fs-4' />
                                                ) : row.demand_dsm_report == 0 ? (
                                                    <FaTimes className='textdanger fs-4' />
                                                ) : (
                                                    'N/A'
                                                )}
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
                                    <tr className="bg-success text-white">
                                        <th className="fs-3 whitetext" colSpan={3} scope="col">
                                            Current Demand Forecast Entry
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Forecast</th>
                                        <th className="text-center" scope="col">Status</th>
                                        <th className="text-center" scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">DEMAND ZYGRIB</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={demandForecastData.demandZygrib.tn}
                                                onChange={(e) => handleCheckboxChange2(e, "demandZygrib", "tn")}
                                            /> TN
                                        </td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN Demand Forecast 18:00 Hours</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={demandForecastData.tnDemandForecast1800.ourGroup}
                                                onChange={(e) => handleCheckboxChange2(e, "tnDemandForecast1800", "ourGroup")}
                                            /> Our Group
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={demandForecastData.tnDemandForecast1800.mainGroup}
                                                onChange={(e) => handleCheckboxChange2(e, "tnDemandForecast1800", "mainGroup")}
                                            /> Main Group
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Demand Reports</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={demandForecastData.demandReports.accuracyReport}
                                                onChange={(e) => handleCheckboxChange2(e, "demandReports", "accuracyReport")}
                                            /> Accuracy Report
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={demandForecastData.demandReports.demandDsmReport}
                                                onChange={(e) => handleCheckboxChange2(e, "demandReports", "demandDsmReport")}
                                            /> Demand DSM Report
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <div className='text-end'>
                                {/* <button className="btn btn-success mt-3 px-5 me-3" onClick={handleSubmit2}>Submit</button> */}
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
                                        <th className='fs-3 text-center' colSpan={5} scope="col">Solar Forecast Status</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Forecast</th>
                                        <th className='text-center' colSpan={4} scope="col">Status</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Solar Forecast</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck11" /> Watson</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck11" /> Brookfields</td>

                                    </tr>


                                    <tr>
                                        <th scope="row">Solar Reports - Brookfields</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Accuracy Report</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Solar DSM Report</td>

                                    </tr>

                                    <tr>
                                        <th scope="row"> Brookfields Solar Actual</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Updated</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Not - Updated </td>

                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

                {/* <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>

                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-primary whitetext'>
                                        <th className='fs-3' colSpan={7} scope="col">Previous Solar Forecast Status</th>
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
                                    {tableData.length > 0 ? (
                                        tableData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.watson == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                <td>{row.brookfields == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                <td>{row.brookfieldsmail == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                <td>{row.accuracy_report == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                <td>{row.solar_dsm_report == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                <td>{row.actual_updated == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                <td>{row.actual_not_updated == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
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
                                    <tr className="bg-success ">
                                        <th className="fs-3 whitetext" colSpan={5} scope="col">
                                            Current Solar Forecast Entry
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Forecast</th>
                                        <th className="text-center" colSpan={4} scope="col">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Solar Forecast</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="watson"
                                                checked={solarForecast.watson}
                                                onChange={handleChange3}
                                            /> Watsun
                                        </td>
                                        <td>N/A</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Solar Forecast</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="brookfields"
                                                checked={solarForecast.brookfields}
                                                onChange={handleChange3}
                                            /> Brookfields
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="brookfieldsmail"
                                                checked={solarForecast.brookfieldsmail}
                                                onChange={handleChange3}
                                            /> Brookfields Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Solar Reports - Brookfields</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="accuracyReport"
                                                checked={solarForecast.accuracyReport}
                                                onChange={handleChange3}
                                            /> Accuracy Report
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="solarDsmReport"
                                                checked={solarForecast.solarDsmReport}
                                                onChange={handleChange3}
                                            /> Solar DSM Report
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Brookfields Solar Actual</th>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="actualUpdated"
                                                checked={solarForecast.actualUpdated}
                                                onChange={handleChange3}
                                            /> Updated
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="actualNotUpdated"
                                                checked={solarForecast.actualNotUpdated}
                                                onChange={handleChange3}
                                            /> Not - Updated
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-end">
                                {/* <button onClick={handleSubmit3} className="btn btn-success">
                                    Submit
                                </button> */}
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
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck15" /> 16:00 Hrs</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck16" /> 19:00 Hrs</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck17" />22:00 Hrs </td>
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
                                    <th className='fs-3 text-start' colSpan={6} scope="col">Previous Common Works Status</th>
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
                                    TN: "16:00 Hrs", // Display the fixed time
                                    RJ: "19:00 Hrs",  // Display the fixed time
                                    MP: "22:00 Hrs",  // Display the fixed time
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

                {/* Common Works */}
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
                                    <td>16:00 Hrs</td>
                                    <td>19:00 Hrs</td>
                                    <td>22:00 Hrs</td>
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
                                        <th className="fs-3" colSpan={3} scope="col">Previous Shift_A Remarks</th>
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
                                        <th className='fs-3' colSpan={5} scope="col">Current Shift_B Remarks</th>
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
                                <button type="submit" onClick={handleSubmitAll} className="btn btn-success">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShiftB




