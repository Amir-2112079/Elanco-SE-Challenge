import '../Css/Raw.css'
import React, { useState } from 'react';
import axios from 'axios';

function Raw() {
    //saves the data that is coming from the API
    const [, setData] = useState(null);
    //adding the initial values for the sort function
    const [sortOrder, setSortOrder] = useState({
        ConsumedQuantity: 'asc',
        Cost: 'asc'
    });
    //keeps track of the sort order e.g., whether we are in asc or desc order
    const [sortedData, setSortedData] = useState(null);


    //used axios to get the data from the API, then saved it in the setData and setSortedData
    const handleButtonClick = () => {
        axios.get('https://engineering-task.elancoapps.com/api/raw')
            .then(response => {
                setData(response.data);
                setSortedData(response.data);
            }).catch(error => {
                console.error(error);
            })
    };


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
            <h1>Raw Data</h1>
            <button className='btn' onClick={handleButtonClick}>Load Raw Data</button>

            {sortedData && (
                //if sortedData is true we are displaying two buttons for each sorting functions 
                //that has been defined above, else it's going to be null!
                <>
                    <br />
                    <button className='rbtn' onClick={sortByConsumedQuantity}>
                        Sort by ConsumedQuantity ({sortOrder.ConsumedQuantity})
                    </button>
                    <br />
                    <button className='rbtn' onClick={sortByCost}>
                        Sort by Cost ({sortOrder.Cost})
                    </button>

                    <pre>{JSON.stringify(sortedData, null, 2)}</pre>
                </>
            )}
        </div>
    );
}

export default Raw;
