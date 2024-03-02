import React, { useState, useEffect } from 'react';
import api from "../config/axios";

function ShowEstate() {
    const [estates, setEstates] = useState([]);

    useEffect(() => {
        const fetchEstates = async () => {
            try {
                const response = await api.get('/showEstate'); 
                console.log(response.data);
                setEstates(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchEstates();
    }, []);

    return (
        <div>
            {estates.map(estate => (
                <div key={estate.id}>
                    <h2>{estate.title}</h2>
                    <p>{estate.description}</p>
                    <p>Date: {new Date(estate.date).toLocaleDateString()}</p>
                    <p>Amount: {estate.amount}</p>
                    <p>Category ID: {estate.categoryId}</p>
                    <p>Location ID: {estate.locationId}</p>
                    <div>
                        {estate.resources.map(resource => (
                            <img key={resource.id} src={resource.url} alt="Estate" style={{ width: '100px', height: '100px' }} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShowEstate;
