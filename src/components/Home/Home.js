import React, { useEffect, useState } from 'react';
import Event from './Event';

const Home = () => {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch('https://volunteer-networks-server.vercel.app/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data)
                setLoading(true)
            })
    }, [])

    return (
        <div className='container ' style={{ marginTop: "150px" }}>
            {
                loading ? <div class="row row-cols-1 row-cols-md-4 g-4">
                    {

                        events.map(event => <Event key={event._id} event={event}></Event>)
                    }

                </div> : <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;