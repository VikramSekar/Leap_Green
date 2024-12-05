// import React from 'react';
// import Header from '../Header';
// import { useState, useEffect } from 'react';
// import FCTable from '../fc_groups';
// import FCTable2 from '../fc_group2';
// import axios from 'axios';



// function ShiftA() {
//     const [formData, setFormData] = useState({
//         'ED': {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         'RAINFALL': {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         'WEATHER DATA': {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         'POST & MAIL': {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         '15 DAYS': {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         ACCURACY: {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         'DRF & ERROR': {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         DSM: {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         'DAILY GRID REPORT': {
//             TN: false, RJ: false, MP: false, MH: false, AP: false, GU: false, KA: false, KL: false, TG: false
//         },
//         'ATTENDANCE': {
//             TN: false,
//         },

//     });

//     const [remarks, setRemarks] = useState("");
//     const [comments, setComments] = useState([]);
//     const [operations, setOperations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);



//     const handleCheckboxChange = (operation, state) => {
//         setFormData(prevState => ({
//             ...prevState,
//             [operation]: {
//                 ...prevState[operation],
//                 [state]: !prevState[operation][state],
//             }
//         }));
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         let allSuccess = true;  // Flag to check if all operations are submitted successfully

//         // Submit each operation
//         for (let operation in formData) {
//             const response = await fetch('http://localhost:3001/forecast-operation1', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     operation_name: operation,
//                     ...formData[operation],
//                     remarks: remarks,
//                 }),
//             });
//             if (!response.ok) {
//                 console.error(`Error submitting ${operation}`);
//                 allSuccess = false;  // If any operation fails, set the flag to false
//             }
//         }

//         if (allSuccess) {
//             alert("Data Stored Successfully");
//         } else {
//             alert("Some operations failed to submit. Please try again.");
//         }
//     };
//     useEffect(() => {
//         fetch('http://localhost:3001/forecast-operation1/remarks')  // Update to your endpoint if necessary
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data); // Check the data structure here
//                 setComments(data);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);


//     useEffect(() => {
//         const fetchOperations = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/forecast-operation3-remarks');
//                 setOperations(response.data);
//             } catch (error) {
//                 console.error('Error fetching operations:', error);
//                 setError('Error fetching operations. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOperations();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <>
//             <Header />
//             <section>



//                 <div className='container'>
//                     <div className='row'>
//                         <div className='col-md-12 text-center mt-3'>
//                             <h2 className='fs-4'>LEAP GREEN ENERGY Pvt.Ltd - COIMBATORE</h2>
//                             <h2 className='fs-3'>FORECASTING</h2>
//                             <div className='table-responsive'>
//                                 <form onSubmit={handleSubmit}>
//                                     <table className="table table-bordered text-center">
//                                         <thead>
//                                             <tr>
//                                                 <th className='bg-success fs-4 whitetext' rowSpan="2">Operations</th>
//                                                 <th className='fs-3 bg-success' colSpan="9">Shift A</th>
//                                                 <th className='bg-success whitetext fs-4' rowSpan="2">Remarks</th>
//                                             </tr>
//                                             <tr>
//                                                 <th>TN</th>
//                                                 <th>RJ</th>
//                                                 <th>MP</th>
//                                                 <th>MH</th>
//                                                 <th>AP</th>
//                                                 <th>GU</th>
//                                                 <th>KA</th>
//                                                 <th>KL</th>
//                                                 <th>TG</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {Object.keys(formData).map((operation, index) => (
//                                                 <tr key={index}>
//                                                     <td>{operation}</td>
//                                                     {Object.keys(formData[operation]).map(state => (
//                                                         <td key={state}>
//                                                             <input
//                                                                 type="checkbox"
//                                                                 checked={formData[operation][state]}
//                                                                 onChange={() => handleCheckboxChange(operation, state)}
//                                                             />
//                                                         </td>
//                                                     ))}
//                                                     {index === 0 && (
//                                                         <td className='p-3' rowSpan={Object.keys(formData).length}>
//                                                             <textarea
//                                                                 name="remarks"
//                                                                 rows={15}
//                                                                 value={remarks}
//                                                                 onChange={(e) => setRemarks(e.target.value)}
//                                                                 className="form-control"
//                                                                 placeholder='Remarks...'

//                                                             />
//                                                         </td>
//                                                     )}
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                     <div className='text-end'>
//                                         <button type='submit' className='btn btn-success me-2 px-4'>Submit</button>
//                                     </div>
//                                 </form>
//                             </div>



//                             {/* <table className="table table-bordered table-hover table-striped mt-4">
//                                 <thead >

//                                     <tr className='bg-danger '>
//                                         <th className='text-white' colSpan={6}> Shift-B & Shift-C Status</th>
//                                     </tr>
//                                     <tr>
//                                         <th>Name</th>
//                                         <th>Shift B</th>
//                                         <th>Shift B Status</th>
//                                         <th>Shift C</th>
//                                         <th>Shift C Status</th>
//                                         <th>Remarks</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {operations.map((operation, index) => (
//                                         <tr key={index}>
//                                             <td>{operation.name}</td>
//                                             <td>{operation.shift_b}</td>
//                                             <td>{operation.shift_b_status}</td>
//                                             <td>{operation.shift_c}</td>
//                                             <td>{operation.shift_c_status}</td>
//                                             <td>{operation.remarks}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table> */}
//                         </div>
//                     </div>

//                     <div className='row'>
//                         <div className='col-md-12'>

//                             <FCTable />
//                         </div>
//                     </div>

//                     <div className='row'>
//                         <div className='col-md-12 mt-3'>
//                             {/* <table className="table table-bordered table-hover table-striped">
//                                 <thead className="table-success">
//                                     <tr>
//                                         <th>Shift - A Remarks</th>
//                                         <th>Date</th>

//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {Array.isArray(comments) && comments.map((row, index) => (
//                                         <tr key={index}>
//                                             <td>{row.remarks}</td>
//                                             <td className='text-uppercase'>
//                                                 {new Date(row.created_at).toLocaleDateString('en-US', {
//                                                     year: 'numeric',
//                                                     month: 'long',
//                                                     day: 'numeric',
//                                                 })}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table> */}
//                             <FCTable2 />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default ShiftA



import React from 'react'
import axios from 'axios';
import Header from '../Header'
import { useState, useEffect } from 'react';
// import { FaCheck, FaTimes } from 'react-icons/fa'; // Example using react-icons


function ShiftA() {

    const handleSubmitAll = () => {
        const isConfirmed = window.confirm("Are you sure you want to insert the record?");
        if (!isConfirmed) return; // If user clicks "Cancel", exit the function

        handleSubmit();
        handleSubmit1();
        handleSubmit2();
        handleSubmit3();
        handleSubmit4();

        alert('Data saved successfully');
        window.location.reload(); // Reload the page after alert
    };





















    const [workDescription, setWorkDescription] = useState('');
    const [workStatus, setWorkStatus] = useState('');
    const handleSubmit4 = async (e) => {
        try {
            // Make the POST request
            const response = await axios.post('http://localhost:5000/shiftA_remarks', {
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




    // const [data, setData] = useState([
    //     { operation: 'Actual Upload', TN: false, RJ: false, MP: false, MH: false },
    //     { operation: 'ED', TN: false, RJ: false, MP: false, MH: false },
    //     { operation: 'PSP', TN: false, RJ: false, MP: false, MH: false },
    //     { operation: 'Slots DSM', TN: false, RJ: false, MP: false, MH: false },
    //     { operation: 'Weather Data Mail', TN: false, RJ: false, MP: false, MH: false },
    //     { operation: 'RainFall', TN: false, RJ: false, MP: false, MH: false },
    //     { operation: 'Suzlon Data Upload', TN: false, RJ: false, MP: false, MH: false }
    // ]);


    // // Handle checkbox changes
    // const handleCheckboxChange = (index, field) => {
    //     const updatedData = [...data];
    //     updatedData[index][field] = !updatedData[index][field];
    //     setData(updatedData);
    // };

    // // Submit the data to the backend
    // const handleSubmit = () => {

    //     axios.post('http://localhost:3001/shiftA_preworkstatus', data)
    //         .then(response => {
    //         })
    //         .catch(error => {
    //             console.error('There was an error saving the data!', error);
    //         });
    // }; 

    // const [preworkData, setPreworkData] = useState([]);
    // useEffect(() => {
    //     // Fetch data when the component mounts
    //     axios.get('http://localhost:3001/shiftA_preworkstatuslast')
    //         .then(response => setPreworkData(response.data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     // Fetch the last submitted data on component mount
    //     axios.get('http://localhost:3001/shiftA_preworkstatuslast')
    //         .then(response => {
    //             setData(response.data); // Populate the table with the last entry
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);
    // // Handle checkbox changes
    // const handleCheckboxChange = (index, field) => {
    //     const updatedData = [...data];
    //     updatedData[index][field] = !updatedData[index][field];
    //     setData(updatedData);
    // };
    // // Submit the updated data to the backend
    // const handleSubmit = () => {
    //     axios.post('http://localhost:3001/shiftA_preworkstatus', data)
    //         .then(response => {
    //             console.log('Data submitted successfully!');
    //         })
    //         .catch(error => {
    //             console.error('There was an error saving the data!', error);
    //         });
    // };

    const [data, setData] = useState([]);

    // Ensure data is valid and contains the necessary fields before setting it.
    useEffect(() => {
        // Fetch the last submitted data on component mount
        axios.get('http://localhost:5000/shiftA_preworkstatuslast')
            .then(response => {
                // Validate data before setting it
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setData(response.data); // Populate the table with the last entry
                } else {
                    setData(createDefaultRows()); // Fallback to default rows
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setData(createDefaultRows()); // Use default rows on error
            });
    }, []); // Empty dependency array to only run on mount

    // Handle checkbox changes
    const handleCheckboxChange = (index, field) => {
        const updatedData = [...data];
        if (updatedData[index]) {
            updatedData[index][field] = !updatedData[index][field];
            setData(updatedData);
        }
    };

    // Submit the updated data to the backend
    const handleSubmit = () => {
        axios.post('http://localhost:5000/shiftA_preworkstatus', data)
            .then(response => {
                console.log('Data submitted successfully!');
            })
            .catch(error => {
                console.error('There was an error saving the data!', error);
            });
    };

    // If no data is fetched, we create default rows for the user to enter new values
    const createDefaultRows = () => {
        return [
            { operation: 'ED', TN: false, RJ: false, MP: false, MH: false },
            { operation: 'PSP', TN: false, RJ: false, MP: false, MH: false },
            { operation: 'Slots DSM', TN: false, RJ: false, MP: false, MH: false },
            { operation: 'Weather Data Mail', TN: false, RJ: false, MP: false, MH: false },
            { operation: 'RainFall', TN: false, RJ: false, MP: false, MH: false },
            { operation: 'Suzlon Data Upload', TN: false, RJ: false, MP: false, MH: false }
        ];
    };

    // Use default rows if no data exists
    const tableData = data.length > 0 ? data : createDefaultRows();



    // const [forecastData, setForecastData] = useState({
    //     tnForecast800: { ourGroup: false, ldc: false, mail: false },
    //     tnForecast900: { ourGroup: false, mainGroup: false, mail: false },
    //     rjForecast900: { ourGroup: false, ldc: false, mail: false },
    //     tnForecast1300: { ourGroup: false, ldc: false, mail: false },
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
    //     axios.post('http://localhost:3001/shiftA_forecast', forecastData)
    //         .then(response => {

    //         })
    //         .catch(error => {
    //             console.error('There was an error saving the data!', error);
    //         });
    // };
    // useEffect(() => {
    //     // Fetch data when the component mounts
    //     axios.get('http://localhost:3001/shiftA_forecastlast')
    //         .then(response => setPreForecast(response.data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);



    // const [reportsData, setReportsData] = useState([
    //     { reportName: 'Accuracy Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'DSM Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'DRF Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'Monthly Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'Grid Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'Premier Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'All Reports Forwarded To Manmadhan Sir', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'LRF', TN: false, RJ: false, MP: false, MH: false },

    // ]);

    // const handleCheckboxChange2 = (index, field) => {
    //     const updatedReportsData = [...reportsData];
    //     updatedReportsData[index][field] = !updatedReportsData[index][field];
    //     setReportsData(updatedReportsData);
    // };

    // const handleSubmit2 = () => {
    //     axios.post('http://localhost:3001/shiftA_reports', reportsData)
    //         .then(response => {
    //         })
    //         .catch(error => {
    //             console.error('There was an error saving the data!', error);
    //         });
    // };
    // const [preReport, setPreReport] = useState([]);
    // useEffect(() => {
    //     // Fetch data when the component mounts
    //     axios.get('http://localhost:3001/shiftA_reportlast')
    //         .then(response => setPreReport(response.data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);

    const [forecastData, setForecastData] = useState({
        tnForecast800: { ourGroup: false, ldc: false, mail: false },
        tnForecast900: { ourGroup: false, mainGroup: false, mail: false },
        rjForecast900: { ourGroup: false, ldc: false, mail: false },
        tnForecast1300: { ourGroup: false, ldc: false, mail: false },
        tangedco: { tangedco: false },
        teca: { teca: false },
        tn15DaysForecast: { tn15Days: false },
        rj15DaysForecast: { rj15Days: false },
    });

    // Fetch previous forecast data on mount
    // useEffect(() => {
    //     axios.get('http://localhost:3001/shiftA_forecastlast')
    //         .then(response => {
    //             const lastForecast = response.data[0]; // Assuming the last entry is at index 0
    //             if (lastForecast) {
    //                 setForecastData({
    //                     tnForecast800: { ourGroup: lastForecast.our_group === 1, ldc: lastForecast.ldc === 1, mail: lastForecast.mail === 1 },
    //                     tnForecast900: { ourGroup: lastForecast.our_group === 1, mainGroup: lastForecast.main_group === 1, mail: lastForecast.mail === 1 },
    //                     rjForecast900: { ourGroup: lastForecast.our_group === 1, ldc: lastForecast.ldc === 1, mail: lastForecast.mail === 1 },
    //                     tnForecast1300: { ourGroup: lastForecast.our_group === 1, ldc: lastForecast.ldc === 1, mail: lastForecast.mail === 1 },
    //                     tangedco: { tangedco: lastForecast.tangedco === 1 },
    //                     teca: { teca: lastForecast.teca === 1 },
    //                     tn15DaysForecast: { tn15Days: lastForecast.tn_15_days === 1 },
    //                     rj15DaysForecast: { rj15Days: lastForecast.rj_15_days === 1 },
    //                 });
    //             }
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);
    useEffect(() => {
        axios.get('http://localhost:5000/shiftA_forecastlast')
            .then(response => {
                const forecastEntries = response.data; // Fetch all rows
                const updatedForecastData = { ...forecastData }; // Clone initial state

                // Map the rows into `forecastData` structure
                forecastEntries.forEach(entry => {
                    switch (entry.forecast_type) {
                        case 'TN Forecast 8:00 Hours':
                            updatedForecastData.tnForecast800 = {
                                ourGroup: entry.our_group === 1,
                                ldc: entry.ldc === 1,
                                mail: entry.mail === 1,
                            };
                            break;
                        case 'TN Forecast 9:00 Hours':
                            updatedForecastData.tnForecast900 = {
                                ourGroup: entry.our_group === 1,
                                mainGroup: entry.main_group === 1,
                                mail: entry.mail === 1,
                            };
                            break;
                        case 'RJ Forecast 9:00 Hours':
                            updatedForecastData.rjForecast900 = {
                                ourGroup: entry.our_group === 1,
                                ldc: entry.ldc === 1,
                                mail: entry.mail === 1,
                            };
                            break;
                        case 'TN Forecast 13:00 Hours':
                            updatedForecastData.tnForecast1300 = {
                                ourGroup: entry.our_group === 1,
                                ldc: entry.ldc === 1,
                                mail: entry.mail === 1,
                            };
                            break;
                        case 'TANGEDCO':
                            updatedForecastData.tangedco = {
                                tangedco: entry.tangedco === 1,
                            };
                            break;
                        case 'TECA':
                            updatedForecastData.teca = {
                                teca: entry.teca === 1,
                            };
                            break;
                        case 'TN 15 Days Forecast':
                            updatedForecastData.tn15DaysForecast = {
                                tn15Days: entry.tn_15_days === 1,
                            };
                            break;
                        case 'RJ 15 Days Forecast':
                            updatedForecastData.rj15DaysForecast = {
                                rj15Days: entry.rj_15_days === 1,
                            };
                            break;
                        default:
                            break;
                    }
                });

                setForecastData(updatedForecastData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);



    const handleCheckboxChange1 = (e, forecastType, value) => {
        setForecastData((prevData) => ({
            ...prevData,
            [forecastType]: {
                ...prevData[forecastType],
                [value]: e.target.checked,
            },
        }));
    };


    const handleSubmit1 = () => {
        axios.post('http://localhost:5000/shiftA_forecast', forecastData)
            .then(response => {
                console.log('Data saved successfully');
            })
            .catch(error => {
                console.error('There was an error saving the data!', error);
            });
    };






    // const [reportsData, setReportsData] = useState([]);

    // useEffect(() => {
    //     // Fetch previous reports and populate the reportsData state
    //     axios.get('http://localhost:3001/shiftA_reportlast')
    //         .then(response => {
    //             const fetchedData = response.data.map(report => ({
    //                 reportName: report.report_name,
    //                 TN: report.TN === 1,
    //                 RJ: report.RJ === 1,
    //                 MP: report.MP === 1,
    //                 MH: report.MH === 1,
    //             }));
    //             setReportsData(fetchedData);
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);
    // const handleCheckboxChange2 = (index, field) => {
    //     const updatedReportsData = [...reportsData];
    //     updatedReportsData[index][field] = !updatedReportsData[index][field];
    //     setReportsData(updatedReportsData);
    // };
    // const handleSubmit2 = () => {
    //     // Convert boolean values to 1 or 0 before submitting
    //     const formattedData = reportsData.map(report => ({
    //         reportName: report.reportName,
    //         TN: report.TN ? 1 : 0,
    //         RJ: report.RJ ? 1 : 0,
    //         MP: report.MP ? 1 : 0,
    //         MH: report.MH ? 1 : 0,
    //     }));

    //     axios.post('http://localhost:3001/shiftA_reports', formattedData)
    //         .then(() => {
    //             console.log('Data saved successfully!');
    //         })
    //         .catch(error => {
    //             console.error('There was an error saving the data!', error);
    //         });
    // };




    // const [reportsData, setReportsData] = useState([]);
    // // Fetch previous reports from the backend
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:3001/shiftA_reportlast')
    //         .then(response => {
    //             const fetchedData = response.data.map(report => ({
    //                 reportName: report.report_name || '',
    //                 TN: report.TN === 1,
    //                 RJ: report.RJ === 1,
    //                 MP: report.MP === 1,
    //                 MH: report.MH === 1,
    //             }));

    //             if (fetchedData.length === 0) {
    //                 setReportsData(createDefaultReportRows());
    //             } else {
    //                 setReportsData(fetchedData);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //             setReportsData(createDefaultReportRows());
    //         });
    // }, []);
    // // Default rows in case of no data
    // const createDefaultReportRows = () => [
    //     { reportName: 'Accuracy Report TN & RJ', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'DSM', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'DRF', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'Monthly Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'Grid Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'Premier Report', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'All Reports Forwarded To GM', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'LRF Report (Weekly)', TN: false, RJ: false, MP: false, MH: false },
    //     { reportName: 'EIG Meeting (Weekly)', TN: false, RJ: false, MP: false, MH: false },
    // ];
    // // Handle checkbox changes
    // const handleCheckboxChange2 = (index, field) => {
    //     if (!reportsData[index] || !reportsData[index].hasOwnProperty(field)) {
    //         console.error('Invalid index or field in handleCheckboxChange:', index, field);
    //         return;
    //     }

    //     const updatedReportsData = [...reportsData];
    //     updatedReportsData[index][field] = !updatedReportsData[index][field];
    //     setReportsData(updatedReportsData);
    // };
    // // Handle form submission
    // const handleSubmit2 = () => {
    //     // Convert boolean values to 1 or 0
    //     const formattedData = reportsData.map(report => ({
    //         reportName: report.reportName,
    //         TN: report.TN ? 1 : 0,
    //         RJ: report.RJ ? 1 : 0,
    //         MP: report.MP ? 1 : 0,
    //         MH: report.MH ? 1 : 0,
    //     }));

    //     axios
    //         .post('http://localhost:3001/shiftA_reports', formattedData)
    //         .then(() => {
    //         })
    //         .catch(error => {
    //             console.error('There was an error saving the data!', error);
    //             alert('Failed to save data. Please try again.');
    //         });
    // };
    // // Fallback for empty data
    // const tableData1 = reportsData.length > 0 ? reportsData : createDefaultReportRows();

    const [reportsData, setReportsData] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:5000/shiftA_reportlast')
            .then(response => {
                const fetchedData = response.data.map(report => ({
                    reportName: report.report_name || '',
                    TN: report.TN === 1,
                    RJ: report.RJ === 1,
                    MP: report.MP === 1,
                    MH: report.MH === 1,
                }));

                if (fetchedData.length === 0) {
                    setReportsData(createDefaultReportRows());
                } else {
                    setReportsData(fetchedData);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setReportsData(createDefaultReportRows());
            });
    }, []);

    const createDefaultReportRows = () => [
        { reportName: 'Accuracy Report', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'DSM', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'DRF', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'Monthly Report', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'Grid Report', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'Premier Report', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'LRF Report', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'EIG Meeting', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'ZYGRIB', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'TN Weather Analysis', TN: false, RJ: false, MP: false, MH: false },
        { reportName: 'All Reports Forwarded To GM', TN: false, RJ: false, MP: false, MH: false },

    ];

    const handleCheckboxChange2 = (index, field) => {
        const updatedReportsData = [...reportsData];
        updatedReportsData[index][field] = !updatedReportsData[index][field];
        setReportsData(updatedReportsData);
    };

    // Handle "Select All" checkbox toggle


    const handleSubmit2 = () => {
        // Convert boolean values to 1 or 0
        const formattedData = reportsData.map(report => ({
            reportName: report.reportName,
            TN: report.TN ? 1 : 0,
            RJ: report.RJ ? 1 : 0,
            MP: report.MP ? 1 : 0,
            MH: report.MH ? 1 : 0,
        }));

        axios
            .post('http://localhost:5000/shiftA_reports', formattedData)
            .then(() => {
            })
            .catch(error => {
                console.error('There was an error saving the data!', error);
                alert('Failed to save data. Please try again.');
            });
    };






    // const [checkboxes, setCheckboxes] = useState({
    //     ZYGRIB: { TN: false, RJ: false, MP: false, MH: false },
    //     NOWCAST: { "7:00 Hrs": false, "10:00 Hrs": false, "13:00 Hrs": false, "N/A": false },
    //     NOWCASTStatus: { TN: false, RJ: false, MP: false, MH: false },
    //     TNWeatherAnalysis: false,
    // });

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

    // const handleSubmit3 = async (e) => {
    //     try {
    //         const response = await axios.post("http://localhost:3001/shiftA_commonworks", checkboxes);
    //     } catch (error) {
    //         console.error(error);
    //         alert("Error submitting data");
    //     }
    // };
    // const [preCommonWork, setpreCommonWork] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3001/shiftA_commonworkslast");
    //             setpreCommonWork(response.data);  // Directly set the data without modification
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // Existing state and handlers remain unchanged

    const [checkboxes, setCheckboxes] = useState({
        ZYGRIB: { TN: false, RJ: false, MP: false, MH: false },
        NOWCAST: { "7:00 Hrs": false, "10:00 Hrs": false, "13:00 Hrs": false, "N/A": false },
        NOWCASTStatus: { TN: false, RJ: false, MP: false, MH: false },
        TNWeatherAnalysis: false,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/shiftA_commonworkslast");
                const previousData = response.data;

                // Pre-fill checkboxes based on previous data
                setCheckboxes((prev) => ({
                    ...prev,
                    ZYGRIB: {
                        TN: previousData.find((item) => item.operation === "ZYGRIB")?.TN || false,
                        RJ: previousData.find((item) => item.operation === "ZYGRIB")?.RJ || false,
                        MP: previousData.find((item) => item.operation === "ZYGRIB")?.MP || false,
                        MH: previousData.find((item) => item.operation === "ZYGRIB")?.MH || false,
                    },
                    NOWCASTStatus: {
                        TN: previousData.find((item) => item.operation === "NOWCAST")?.TN || false,
                        RJ: previousData.find((item) => item.operation === "NOWCAST")?.RJ || false,
                        MP: previousData.find((item) => item.operation === "NOWCAST")?.MP || false,
                        MH: previousData.find((item) => item.operation === "NOWCAST")?.MH || false,
                    },
                    TNWeatherAnalysis:
                        previousData.find((item) => item.operation === "TN Weather Analysis")?.TN || false,
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    const handleCheckboxChange3 = (event) => {
        const { name, checked } = event.target;
        const [category, field] = name.split('.');

        if (field) {
            setCheckboxes((prev) => ({
                ...prev,
                [category]: { ...prev[category], [field]: checked },
            }));
        } else {
            setCheckboxes((prev) => ({
                ...prev,
                [name]: checked,
            }));
        }
    };
    // Submit handler remains unchanged
    const handleSubmit3 = async () => {
        try {
            await axios.post("http://localhost:5000/shiftA_commonworks", checkboxes);
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data");
        }
    };


    const [remarksData, setRemarksData] = useState([]);
    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:5000/shiftC_remarkslast') // Assuming you have a GET route to fetch the data
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
                        <h3 className='fs-2'>Shift - A</h3>
                    </div>
                </div>

                {/* <div className='row d-flex justify-content-center mt-3'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table class="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-success whitetext'>
                                        <th className='fs-3 text-center' colSpan={6} scope="col">Pre Work Status</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Operations</th>
                                        <th scope="col">TN</th>
                                        <th scope="col">RJ</th>
                                        <th scope="col">MP</th>
                                        <th scope="col">MH</th>

                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <th scope="row">1</th>
                                        <td>Actual Upload</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault4" /></td>

                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>ED</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault4" /></td>

                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>PSP</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault5" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault6" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault7" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault8" /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Slots DSM</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault9" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault10" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault11" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault12" /></td>

                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Weather Data Mail</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault13" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault14" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault15" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault16" /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>RainFall</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault17" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault18" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault19" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault20" /></td>
                                    </tr>

                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Suzlon Data Upload</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault17" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault18" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault19" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault20" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

                {/* <div className='row d-flex justify-content-center mt-3'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-primary whitetext'>
                                        <th className='fs-3' colSpan={5} scope="col">Previous PreWork Status</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Operations</th>
                                        <th scope="col">TN</th>
                                        <th scope="col">RJ</th>
                                        <th scope="col">MP</th>
                                        <th scope="col">MH</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {preworkData.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.operation}</td>
                                            <td>{row.TN == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{row.RJ == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{row.MP == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{row.MH == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div> */}

                <div className='row d-flex justify-content-center mt-3'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-success whitetext'>
                                        <th className='fs-3' colSpan={6} scope="col">PreWork Entry Status</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Operations</th>
                                        <th scope="col">TN</th>
                                        <th scope="col">RJ</th>
                                        <th scope="col">MP</th>
                                        <th scope="col">KL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{row.operation}</td>
                                            <td>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={row.TN}
                                                    onChange={() => handleCheckboxChange(index, 'TN')}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={row.RJ}
                                                    onChange={() => handleCheckboxChange(index, 'RJ')}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={row.MP}
                                                    onChange={() => handleCheckboxChange(index, 'MP')}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={row.MH}
                                                    onChange={() => handleCheckboxChange(index, 'MH')}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>



                            <div className='text-end'>
                                {/* <button className="btn btn-success mt-3 px-5 me-3 border border-2 border-success" onClick={handleSubmit}>Submit</button> */}
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
                                        <th className='fs-3 text-center' colSpan={5} scope="col">Forecast Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">TN Forecast 8:00 Hours</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Our Group </td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck2" /> LDC</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Mail</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">TN Forecast 9:00 Hours</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Our Group</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Main Group</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck2" /> Mail</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">RJ Forecast 9:00 Hours</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck1" /> Our Group </td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck2" /> LDC</td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck3" /> Mail</td>

                                    </tr>

                                    <tr>
                                        <th scope="row">TN Forecast 13:00 Hours</th>
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
                            <div className='text-end'>
                            <button className="btn btn-success mt-3 px-5 me-3 border border-2 border-success">Submit</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-primary text-white'>
                                        <th className='fs-3  whitetext' colSpan={9} scope="col">Previous Forecast Status</th>
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
                                    {preForecast.map((forecast, index) => (
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
                </div> */}

                <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-success text-white'>
                                        <th className='fs-3 whitetext' colSpan={4} scope="col">Current Forecast Entry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">TN Forecast 8:00 Hours</th>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast800.ourGroup} onChange={(e) => handleCheckboxChange1(e, 'tnForecast800', 'ourGroup')} /> Our Group
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast800.ldc} onChange={(e) => handleCheckboxChange1(e, 'tnForecast800', 'ldc')} /> LDC
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast800.mail} onChange={(e) => handleCheckboxChange1(e, 'tnForecast800', 'mail')} /> Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN Forecast 9:00 Hours</th>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast900.ourGroup} onChange={(e) => handleCheckboxChange1(e, 'tnForecast900', 'ourGroup')} /> Our Group
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast900.mainGroup} onChange={(e) => handleCheckboxChange1(e, 'tnForecast900', 'mainGroup')} /> Main Group
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast900.mail} onChange={(e) => handleCheckboxChange1(e, 'tnForecast900', 'mail')} /> Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">RJ Forecast 9:00 Hours</th>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.rjForecast900.ourGroup} onChange={(e) => handleCheckboxChange1(e, 'rjForecast900', 'ourGroup')} /> Our Group
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.rjForecast900.ldc} onChange={(e) => handleCheckboxChange1(e, 'rjForecast900', 'ldc')} /> Main Group
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.rjForecast900.mail} onChange={(e) => handleCheckboxChange1(e, 'rjForecast900', 'mail')} /> Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN Forecast 13:00 Hours</th>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast1300.ourGroup} onChange={(e) => handleCheckboxChange1(e, 'tnForecast1300', 'ourGroup')} /> Our Group
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast1300.ldc} onChange={(e) => handleCheckboxChange1(e, 'tnForecast1300', 'ldc')} /> LDC
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tnForecast1300.mail} onChange={(e) => handleCheckboxChange1(e, 'tnForecast1300', 'mail')} /> Mail
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TANGEDCO</th>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tangedco.tangedco} onChange={(e) => handleCheckboxChange1(e, 'tangedco', 'tangedco')} /> TANGEDCO
                                        </td>
                                        <td colSpan="2"></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TECA</th>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.teca.teca} onChange={(e) => handleCheckboxChange1(e, 'teca', 'teca')} /> TECA
                                        </td>
                                        <td colSpan="2"></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN 15 Days Forecast</th>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.tn15DaysForecast.tn15Days} onChange={(e) => handleCheckboxChange1(e, 'tn15DaysForecast', 'tn15Days')} /> TN 15 Days
                                        </td>
                                        <td colSpan="2"></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">RJ 15 Days Forecast</th>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={forecastData.rj15DaysForecast.rj15Days} onChange={(e) => handleCheckboxChange1(e, 'rj15DaysForecast', 'rj15Days')} /> RJ 15 Days
                                        </td>
                                        <td colSpan="2"></td>
                                    </tr>
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
                                        <th className='fs-3 text-center' colSpan={5} scope="col">Reports Status</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Reports Name</th>
                                        <th scope="col">TN</th>
                                        <th scope="col">RJ</th>
                                        <th scope="col">MP</th>
                                        <th scope="col">MH</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Accuracy Report</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck11" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck12" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck13" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck14" /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">DSM Report</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck15" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck16" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck17" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck18" /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">DRF Report</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck19" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck20" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck21" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck22" /></td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Monthly Report</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck23" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck24" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck25" /></td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck26" /></td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Grid Report</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck27" /></td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>



                                    <tr>
                                        <th scope="row">Premier Report</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck31" /></td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>


                                    <tr>
                                        <th scope="row">All Reports Forwarded To Manmadhan Sir</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck35" /></td>
                                        <td>-</td>
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
                        <div className='table-responsive'>
                            <table className="table table-bordered mt-5">
                                <thead>
                                    <tr className='bg-primary whitetext'>
                                        <th className='fs-3' colSpan={5} scope="col">Previous Reports Status</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Reports Name</th>
                                        <th scope="col">TN</th>
                                        <th scope="col">RJ</th>
                                        <th scope="col">MP</th>
                                        <th scope="col">MH</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {preReport.map((report, index) => (
                                        <tr key={index}>
                                            <td>{report.report_name}</td>
                                            <td>{report.TN == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{report.RJ == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{report.MP == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{report.MH == 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

                <div className='row d-flex justify-content-center'>
                    <div className='col-md-12'>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr className="bg-success whitetext">
                                        <th className="fs-3" colSpan={5} scope="col">
                                            Reports Status
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Reports Name</th>
                                        <th scope="col">
                                            TN
                                            {/* <div className=''>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input mt-2"
                                                    checked={selectAllTN}
                                                    onChange={handleSelectAllTNChange}
                                                />
                                                <label className="form-check-label mt-2 ms-2">Select All</label>
                                            </div> */}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportsData.map((report, index) => (
                                        <tr key={index}>
                                            <th scope="row">{report.reportName}</th>
                                            <td>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={report.TN}
                                                    onChange={() => handleCheckboxChange2(index, 'TN')}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className='text-end'>
                                {/* <button className="btn btn-success mt-3" onClick={handleSubmit2}>Submit</button>  */}
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
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck17" /> 13:00 Hrs </td>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck17" /> N/A</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TN Weather Analysis</th>
                                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheck28" /></td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
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
                                {[...preCommonWork.slice(0, 1),
                                {
                                    operation: "Nowcast Timing",
                                    TN: "7:00 Hrs",
                                    RJ: "10:00 Hrs",
                                    MP: "13:00 Hrs",
                                    MH: "N/A",
                                    created_at: new Date(),
                                },
                                ...preCommonWork.slice(1),
                                ].map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.operation}</td>
                                        <td>{item.TN == 1 ? <FaCheck className="textsuccess fs-4" /> : item.TN == 0 ? <FaTimes className="textdanger fs-4" /> : item.TN}</td>
                                        <td>{item.RJ == 1 ? <FaCheck className="textsuccess fs-4" /> : item.RJ == 0 ? <FaTimes className="textdanger fs-4" /> : item.RJ}</td>
                                        <td>{item.MP == 1 ? <FaCheck className="textsuccess fs-4" /> : item.MP == 0 ? <FaTimes className="textdanger fs-4" /> : item.MP}</td>
                                        <td>{item.MH == 1 ? <FaCheck className="textsuccess fs-4" /> : item.MH == 0 ? <FaTimes className="textdanger fs-4" /> : item.MH}</td>
                                        <td className="text-uppercase">{new Date(item.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
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
                                    <td>7:00 Hrs</td>
                                    <td>10:00 Hrs</td>
                                    <td>13:00 Hrs</td>
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
                            <button onClick={handleSubmit3} className="btn btn-success">Submit</button>
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
                                        <th className="fs-3" colSpan={3} scope="col">Previous Shift_C Remarks</th>
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
                                        <th className='fs-3' colSpan={5} scope="col">Current Shift_A Remarks</th>
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
                                <div className='text-end'>
                                    <div className='text-end'>
                                        <button onClick={handleSubmitAll} className="btn btn-success mb-3">Submit</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ShiftA