import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if username is stored in sessionStorage
        if (!sessionStorage.getItem('username')) {
            navigate('/'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    const [shiftDatas, setShiftDatas] = useState([]);
    const [shiftData, setShiftData] = useState({ shift: '', name: '', handed_over_to: '', completed_comments: '', pending_comments: '' });
    const handleShiftChange = (e) => {
        const { name, value } = e.target;
        setShiftData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const [formData, setFormData] = useState({
        Aralvaimozhi: { model: [], corrections: [] },
        Kambam: { model: [], corrections: [] },
        Palakkad: { model: [], corrections: [] },
        Sengottai: { model: [], corrections: [] },
    });

    const [corrections, setCorrections] = useState([]);


    const handleCheckboxChange = (pass, modelName) => {
        setFormData((prev) => {
            const models = prev[pass].model.includes(modelName)
                ? prev[pass].model.filter((model) => model !== modelName)
                : [...prev[pass].model, modelName];
            return {
                ...prev,
                [pass]: {
                    ...prev[pass],
                    model: models,
                },
            };
        });
    };

    const handleChange = (pass, field, value) => {
        setFormData({
            ...formData,
            [pass]: {
                ...formData[pass],
                [field]: value,
            },
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const isConfirmed = window.confirm("Are you sure you want to insert the record?");
    //     if (!isConfirmed) return;
    //     const submissionData = Object.entries(formData).map(([pass, correctionName, { model, corrections, }]) => ({
    //         pass,
    //         model: model.join(', '),
    //         corrections: `${correctionName},${corrections},${shiftData.shift}`
    //     }));

    //     try {
    //         await axios.post('http://localhost:3001/submitShift', shiftData);
    //         await axios.post('http://localhost:3001/submitCorrections', submissionData);

    //         setShiftData({ shift: '', name: '', handed_over_to: '', comments: '' });
    //         setFormData({
    //             Aralvaimozhi: { model: [], corrections: '' },
    //             Kambam: { model: [], corrections: '' },
    //             Palakkad: { model: [], corrections: '' },
    //             Sengottai: { model: [], corrections: '' },
    //         });
    //         alert("Data Submitted Successfully")
    //         window.location.reload();
    //     } catch (error) {
    //         console.error('Error submitting data:', error);
    //         alert('There was an error submitting the data.');
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to insert the record?");
        if (!isConfirmed) return;

        // Prepare the data for submission
        const submissionData = Object.entries(formData).map(([pass, { model, corrections }]) => {
            // Assuming corrections already includes the corrections entered for the shift
            const correctionName = corrections || "";  // Ensure correctionName is added as empty if no corrections are present
            return {
                pass,
                model: model.join(','),
                corrections: `${correctionName}, ${shiftData.shift}`,
            };
        });

        try {
            // Post shift data
            await axios.post('http://localhost:5001/submitShift', shiftData);

            // Post corrections data
            await axios.post('http://localhost:5001/submitCorrections', submissionData);

            // Reset state after successful submission
            setShiftData({ shift: '', name: '', handed_over_to: '', completed_comments: '', pending_comments: '' });
            setFormData({
                Aralvaimozhi: { model: [], corrections: '' },
                Kambam: { model: [], corrections: '' },
                Palakkad: { model: [], corrections: '' },
                Sengottai: { model: [], corrections: '' },
            });

            alert("Data Submitted Successfully");
            window.location.reload(); // Reload page to reflect changes
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('There was an error submitting the data.');
        }
    };










    useEffect(() => {
        fetch('http://localhost:5001/shiftData')
            .then((response) => response.json())
            .then((data) => setShiftDatas(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);


    useEffect(() => {
        const fetchCorrections = async () => {
            try {
                const response = await axios.get('http://localhost:5001/get-corrections'); // Adjust this to your API endpoint
                setCorrections(response.data);
            } catch (error) {
                console.error('Error fetching corrections:', error);
            }
        };

        fetchCorrections();
    }, []);




    return (
        <>
            <Header />
            <section>


                <div className='container mt-5 shadow-sm border border-secondary mb-3 border-2 rounded '>
                    <div className='row mt-5'>
                        <div className='col-md-12 text-end'>
                            <Link to={"/Pending_Works"} className='btn btn-danger border border-2 border-danger whitetext pendingbtn'>Show Pending Works</Link>

                        </div>
                    </div>



                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 mt-5">
                            <form onSubmit={handleSubmit}>
                                {/* Shift Data Table */}
                                <div className='table-responsive'>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr className='bg-success'>
                                                <th className="fs-3 text-start whitetext" colSpan={6}> Previous Shift Status</th>
                                            </tr>
                                            <tr>
                                                <th>Shift</th>
                                                <th>Taken Over By</th>
                                                {/* <th>Handed Over To</th> */}
                                                {/* <th>Completed Work Description</th> */}
                                                <th>Pending Work Description</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shiftDatas.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.shift}</td>
                                                    <td>{item.name}</td>
                                                    {/* <td>{item.handed_over_to}</td> */}
                                                    {/* <td>{item.completed_comments}</td> */}
                                                    <td>{item.pending_comments}</td>
                                                    <td className='text-uppercase'>
                                                        {new Date(item.created_at).toLocaleDateString('en-US', {
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
                                {/* Shift Data Form */}
                                <div className="table-responsive mt-5">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="fs-3 text-start bg-primary whitetext" colSpan={5}> Current Shift Status</th>
                                            </tr>
                                            <tr>
                                                <th>Shift</th>
                                                <th>Taken Over By</th>
                                                {/* <th>Handed Over To</th> */}
                                                {/* <th>Completed Work Description</th> */}
                                                <th>Pending Work Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='p-5'>
                                                    <select className="form-control bg-light text-dark" name="shift" value={shiftData.shift} onChange={handleShiftChange} required>
                                                        <option value="">Select Shift <span className="textdanger">*</span></option>
                                                        <option value="Shift A">Shift A (06:00 to 14:00)</option>
                                                        <option value="Shift B">Shift B (14:00 to 22:00)</option>
                                                        <option value="Shift C">Shift C (22:00 to 06:00)</option>
                                                    </select>
                                                </td>
                                                <td><textarea className="form-control" name="name" placeholder="Taken Over By..." value={shiftData.name} onChange={handleShiftChange} /></td>
                                                {/* <td>
                                                    <textarea
                                                        className="form-control"
                                                        name="name"
                                                        placeholder="Taken Over By..."
                                                        value={(handedOverToList && handedOverToList.length > 0) ? handedOverToList[handedOverToList.length - 1] : shiftData.name}
                                                        readOnly
                                                    />
                                                </td> */}

                                                {/* <td><textarea className="form-control" name="handed_over_to" placeholder="Handed Over To..." value={shiftData.handed_over_to} onChange={handleShiftChange} /></td> */}
                                                {/* <td><textarea className="form-control" name="completed_comments" placeholder="Completed Remarks..." value={shiftData.completed_comments} onChange={handleShiftChange} /></td> */}
                                                <td><textarea className="form-control" name="pending_comments" placeholder="Pending Remarks..." value={shiftData.pending_comments} onChange={handleShiftChange} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pass Corrections Table */}

                                <div className="table-responsive bg-light rounded">
                                    <table className="table table-bordered mt-5">
                                        <thead>
                                            <tr>
                                                <th className="fs-3 text-start bg-success whitetext" colSpan={5}>Previous Shift Pass Corrections</th>
                                            </tr>
                                            <tr>
                                                <th>Pass</th>
                                                <th>Model</th>
                                                <th>Corrections Given</th>
                                                <th>Remarks</th>
                                                <th className='d-none'>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {corrections.map((correction, index) => {
                                                const correctionValues = ["ECMWF10", "ECMWF100", "GFS10", "GFS100"];

                                                // Ensure models and corrections are handled correctly
                                                const models = Array.isArray(correction.model)
                                                    ? correction.model
                                                    : correction.model.split(',').map(item => item.trim());

                                                // Separate corrections and models
                                                const correctionsGiven = models.filter(model => correctionValues.includes(model));
                                                const filteredModels = models.filter(model => !correctionValues.includes(model));

                                                return (
                                                    <tr key={index}>
                                                        <td>{correction.pass}</td>
                                                        <td>{filteredModels.join(", ") || "No model available"}</td>
                                                        <td>{correctionsGiven.join(", ") || "No corrections given"}</td>
                                                        <td>{correction.corrections || ""}</td>
                                                        <td className="text-uppercase d-none">
                                                            {new Date(correction.timestamp_column_name).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>




                                <div className="table-responsive mt-4 bg-light ">
                                    <table className="table table-bordered mt-5 rounded border border-primary">
                                        <thead>
                                            <tr>
                                                <th className="fs-3 text-start whitetext bg-primary" colSpan={4}>Current Shift Pass Corrections</th>
                                            </tr>
                                            <tr>
                                                <th>Pass</th>
                                                <th>Model</th>
                                                <th>Corrections Given</th>
                                                <th>Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody className='align-items-center'>
                                            {Object.keys(formData).map((pass) => (
                                                <tr key={pass}>
                                                    <td>{pass}</td>
                                                    <td>
                                                        <div className='d-md-flex d-lg-flex flex-wrap'>
                                                            {[
                                                                "Meteoblue Basic", "ICON 13km 10m", "GFS 25km 10m", "WRF 3km 10m",
                                                                "Meteoblue Basic 80m", "ICON 13km 80m", "GFS 25km 80m", "WRF 3km 50m",
                                                                "Meteoblue GEM", "ICON 13km 120m", "GFS 25km 100m", "WRF 3km 90m",
                                                                "Meteoblue ICON", "ICON 25km 10m", "ARPEGE 25km 10m", "ECMWF 09km",
                                                                "Meteoblue NEMSIN",
                                                            ].map((modelName) => (
                                                                <div
                                                                    key={modelName}
                                                                    className="form-check"
                                                                    style={{ width: '25%' }}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id={`${pass}-${modelName}`}
                                                                        checked={formData[pass].model.includes(modelName)}
                                                                        onChange={() => handleCheckboxChange(pass, modelName)}
                                                                    />
                                                                    <label className="form-check-label m-1" htmlFor={`${pass}-${modelName}`}>{modelName}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="mt-2 p-3 border  rounded bg-light shadow-sm border-success ">
                                                            <div className=''>
                                                                {[
                                                                    "ECMWF10", "ECMWF100", "GFS10", "GFS100"
                                                                ].map((correctionName) => (
                                                                    <div
                                                                        key={correctionName}
                                                                        className="form-check"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input"
                                                                            id={`${pass}-${correctionName}`}
                                                                            checked={formData[pass].model.includes(correctionName)}
                                                                            onChange={() => handleCheckboxChange(pass, correctionName)}
                                                                        />
                                                                        <label className="form-check-label m-1" htmlFor={`${pass}-${correctionName}`}>{correctionName}</label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <textarea
                                                            className='form-control'
                                                            placeholder='Remarks...'
                                                            value={formData[pass].corrections}
                                                            onChange={(e) => handleChange(pass, 'corrections', e.target.value)}
                                                            rows={5}
                                                            cols={90}
                                                        ></textarea>

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='text-end'>
                                    <button type="submit" className="btn btn-success me-2 px-5 fs-5 mb-3 mt-3">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}

export default Dashboard;

