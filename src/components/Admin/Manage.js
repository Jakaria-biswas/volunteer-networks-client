import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit, FaTeamspeak } from "react-icons/fa";
import './Manage.css';
const Manage = () => {
    const [events, setEvents] = useState([]);
    const [updateEvent, setUpdateEvent] = useState({});
    const [loading, setLoading] = useState(false)

    /// store only id for  update handleUpdateEvent 
    const [id, setId] = useState({})



    useEffect(() => {
        fetch('https://volunteer-networks-server.vercel.app/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data)
                setLoading(true)
            })
    }, [])

    const handleDelete = id => {

        fetch(`https://volunteer-networks-server.vercel.app/delete/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    const remain = events.filter(event => event._id !== id)
                    setEvents(remain)
                }
            })

    }







    // load single event in this same page 
    const handleUpdate = id => {
        setId(id)
        fetch(`https://volunteer-networks-server.vercel.app/event/${id}`)
            .then(res => res.json())
            .then(data => {
                setUpdateEvent(data)
            })

    }
    const handleUpdateImage = e => {
        const updateImage = { image: e.target.value, title: updateEvent.title }
        setUpdateEvent(updateImage)
    }
    const handleUpdateTitle = e => {
        const updateTitle = { image: updateEvent.image, title: e.target.value }
        setUpdateEvent(updateTitle)

    }

    const handleUpdateEvent = event => {

        event.preventDefault();
        //   const id = updateEvent._id;
        fetch(`https://volunteer-networks-server.vercel.app/event/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(updateEvent)
        })
            .then(res => res.json())
            .then(data => {
                 if(data.modifiedCount > 0){
                      alert("successfully") 
                      window.location.reload()
                 }
                //  console.log(data)
            })



    }

    return (
        <div className='container' style={{ marginTop: "150px" }}>




            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">{updateEvent.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleUpdateEvent} >
                            <div class="modal-body">

                                <div class="mb-3">
                                    <label for="formFile" class="form-label">Event image URL</label>
                                    <input onChange={handleUpdateImage} value={updateEvent.image || ''} class="form-control" type="text" id="formFile" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Event title</label>
                                    <input onChange={handleUpdateTitle} value={updateEvent.title || ''} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>


                                {/* <button type="submit" class="btn btn-primary">update event</button> */}

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">update event</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



           {

              loading ? <> <h2>There are {events.length} events here</h2>
              <div class="row">
  
                  {
                      events.map(event =>
  
                          <div class="col-sm-4 mb-3 mb-sm-2">
                              <div class="card">
                                  <div class="card-body">
                                      <h5 class="card-title">{event.title}</h5>
  
                                      <span title="update" onClick={() => handleUpdate(`${event._id}`)} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" className='m-2 update'><FaEdit /></span>
                                      <span title="delete" onClick={() => handleDelete(`${event._id}`)} className='m-2 delete'><FaTrashAlt /></span>
                                  </div>
                              </div>
                          </div>
                      )
                  }
  
              </div></> : <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
           }

        </div>
    );
};

export default Manage;