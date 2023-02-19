import '../Css/Resources.css';
import React, { useState } from 'react';
import axios from 'axios';

function Resources() {

    //an array that returns the data from API 
    const [resources, setResources] = useState([]);

    //can be used to select specific resources  
    const [selectedResources, setSelectedResources] = useState(null);

    //shows the details of the selected resources 
    const [resourcesDetail, setResourcesDetail] = useState(null);

    //indicates to whether display the the list of resources or just the details 
    const [showApp, setShowApp] = useState(true);


    //used axios to get the data from API then saved it in the setResources
    const displayResources = () => {
        axios.get('https://engineering-task.elancoapps.com/api/resources')
            .then(response => {
                setResources(response.data);
            }).catch(error => {
                console.error(error);
            })
    };

    /*
    used axios to retrieve resources from the API, and then I used the resources parameter
    to retrieve information for a specific resource that the user had selected, also saving 
    the data in SetResourcesDetail, then letting showapp to false (meaning the user has clicked
    on view details) and adding the data into the setSortedData array.
    */
    const chooseResources = (resources) => {
        setSelectedResources(resources);
        axios.get(`https://engineering-task.elancoapps.com/api/resources/${resources}`)
            .then(response => {
                setResourcesDetail(response.data);
                setShowApp(false);
                setSortedData(response.data);
            }).catch(error => {
                console.error(error);
            })
    };


    //allows to clear the selected resources, and load the original page 
    const goBack = () => {
        setSelectedResources(null);
        setResources([]);
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
            <h1>Resources</h1>

            {/* Render a button to retrieve data from API */}
            {showApp && (
                <button className='btn' onClick={displayResources}>
                    Load Resources
                </button>
            )}

            {/* Show resource list with details button. .map is used to return the array.
             {resource}{" "} allows to display resources followed by a space character.*/}
            {showApp && (
                <ul>
                    {resources.map((resource) => (
                        <li>
                            {resource}{" "}
                            <button className='btn' onClick={() => chooseResources(resource)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Show resources details */}
            {selectedResources && (
                <div>
                    <h2>{selectedResources}</h2>
                    <button className='btn' onClick={goBack}>Go Back</button>

                    {/* Show sorting buttons and resource details */}
                    {resourcesDetail && (
                        <>
                            <br />
                            <button className='rbtn' onClick={sortByConsumedQuantity}>
                                Sort by ConsumedQuantity ({sortOrder.ConsumedQuantity})
                            </button>
                            <br />
                            <button className='rbtn' onClick={sortByCost}>
                                Sort by Cost ({sortOrder.Cost})
                            </button>

                            <pre>{JSON.stringify(resourcesDetail, null, 5)}</pre>
                        </>
                    )}
                </div>
            )}

        </div >
    );
};

export default Resources;