import React from 'react';
import { Link } from 'react-router-dom';

const Event = (props) => {
    const { _id, image, title } = props.event;
    return (
        <div>
            <Link to={`/book/${_id}`}>
                <div class="col rounded">
                    <div class="card">
                        <img src={image} class="card-img-top" alt="..." />
                        <div class="card-img-overlay">
                            <h5 class="card-title bg-success rounded d-inline p-2  text-white">{title}</h5>
                        </div>
                        {/* <div class="card-body">
                        <h5 class="card-title">{title}</h5>
                    </div> */}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Event;