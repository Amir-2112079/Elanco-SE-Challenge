import '../Css/Applications.css';
import React, { useState } from 'react';
import axios from 'axios';



function Applications() {

    //an array that returns the data from API 
    const [applications, setApplications] = useState([]);

    //can be used to select specific applications 
    const [selectedApplication, setSelectedApplication] = useState(null);

    //shows the details of the selected application 
    const [applicationDetail, setApplicationDetail] = useState(null);

    //indicates to whether display the the list of applications or just the details 
    const [showApp, setShowApp] = useState(true);


    //used axios to get the data from API then saved it in the setApplications
    const displayApplication = () => {
        axios.get('https://engineering-task.elancoapps.com/api/applications')
            .then(response => {
                setApplications(response.data);
            }).catch(error => {
                console.error(error);
            })
    };


    /*
    used axios to retrieve applications from the API, and then I used the application parameter to
    retrieve information for a specific application that the user had selected. 
    also saving the data in SetApplicationDetail, then letting showapp to 
    false (meaning the user has clicked on view details) and adding the data into
    the setSortedData array to sort data.
    */
    const chooseApplication = (application) => {
        setSelectedApplication(application);
        axios.get(`https://engineering-task.elancoapps.com/api/applications/${application}`)
            .then(response => {
                setApplicationDetail(response.data);
                setShowApp(false);
                setSortedData(response.data);
            }).catch(error => {
                console.error(error);
            })
    };


    //allows to clear the selected application, and load the original applications
    const goBack = () => {
        setSelectedApplication(null);
        setApplications([]);
        setShowApp(true);
    };


    //adding the initial values for the sort functions
    const [sortOrder, setSortOrder] = useState({
        ConsumedQuantity: 'asc',
        Cost: 'asc'
    });
    //keeps track of the sort order e.g., whether we are in asc or desc order
    const [sortedData, setSortedData] = useState(null);


    const sortByConsumedQuantity = () => {
        //to display to the users that what order their on 
        const order = sortOrder.ConsumedQuantity === 'asc' ? 'desc' : 'asc';
        //creating a new array to save all the new sorted data by subtracting "x by y" to get the "desc" and "y by x" to get "asc" 
        const sorted = sortedData.sort((x, y) => {
            return order === 'asc' ? x.ConsumedQuantity - y.ConsumedQuantity : y.ConsumedQuantity - x.ConsumedQuantity;
        });
        //sorted data is updated in the setSortedData
        setSortedData(sorted);
        //used a spread operator overwrites the current state of sort order by the new state after it is sorted into asc or desc order.
        setSortOrder({ ...sortOrder, ConsumedQuantity: order });
    };


    //same as the previous function
    const sortByCost = () => {
        const order = sortOrder.Cost === 'asc' ? 'desc' : 'asc';
        const sorted = sortedData.sort((x, y) => {
            return order === 'asc' ? x.Cost - y.Cost : y.Cost - x.Cost;
        })
        setSortedData(sorted);
        setSortOrder({ ...sortOrder, Cost: order });
    };


    return (
        <div className='main'>
            <h1>Applications</h1>

            {/* Render a button to retrieve data from API */}
            {showApp && (
                <button className='btn' onClick={displayApplication}>
                    Load Applications
                </button>
            )}

            {/* Show application list with details button. .map is used to return the array. 
            {application}{" "} allows to display applications followed by a space character.*/}
            {showApp && (
                <ul>
                    {applications.map((application) => (
                        <li>
                            {application}{" "}
                            <button className='btn' onClick={() => chooseApplication(application)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Show application details */}
            {selectedApplication && (
                <div>
                    <h2>{selectedApplication}</h2>
                    <button className='btn' onClick={goBack}>Go Back</button>

                    {/* Show sorting buttons and application details */}
                    {applicationDetail && (
                        <>
                            <br />
                            <button className='rbtn' onClick={sortByConsumedQuantity}>
                                Sort by ConsumedQuantity ({sortOrder.ConsumedQuantity})
                            </button>
                            <br />
                            <button className='rbtn' onClick={sortByCost}>
                                Sort by Cost ({sortOrder.Cost})
                            </button>
                            <pre>{JSON.stringify(applicationDetail, null, 5)}</pre>
                        </>
                    )}
                </div>
            )}
        </div >
    );
}

export default Applications;






