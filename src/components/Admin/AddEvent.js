import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const AddEvent = () => {


       const [eventImage,setEventImage] = useState('');
       const [title, setTitle] = useState('');

       const navigate= useNavigate();

       /// get image link and store
       const handleImage = e => {
               setEventImage(e.target.value)
       }

       /// get event title and store

       const handleTitle = e => {
       setTitle(e.target.value)
            
       }



       const handleEventAdd = event => {
         event.preventDefault()

           const eventData = {image: eventImage, title: title}
            
                        
             fetch("https://volunteer-networks-server.vercel.app/event",{
                  method:"POST",
                  headers:{'content-type':'application/json'},
                  body:JSON.stringify(eventData)
             })
             .then(res => res.json())
             .then(result => {
                   if(result){
                     alert("Event add successful")
                     event.target.reset()
                     navigate('/')
                   }
             })

            
       }


    return (
        <div className='container'  style={{marginTop:"150px"}}>
            <h2>this is admin access page</h2>
            <form onSubmit={handleEventAdd}>
                <div class="mb-3">
                    <label for="formFile"  class="form-label">Event image URL</label>
                    <input onChange={handleImage} class="form-control" type="text" id="formFile" required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Event title</label>
                    <input onChange={handleTitle} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>


                <button type="submit" class="btn btn-primary">add event</button>
            </form>
        </div>
    );
};

export default AddEvent;