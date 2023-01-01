import React, { useEffect, useState } from 'react';
import UserAuth from '../Hooks/UserAuth';

const Donation = () => {
 
     const [donation, setDonation] = useState([]);

      const [user] = UserAuth();

      useEffect(()=>{
           fetch(`https://volunteer-networks-server.vercel.app/donation?email=${user.email}`)
           .then(res => res.json())
           .then(result => {
               setDonation(result)
           })
      },[user])
    return (
        <div className='container' style={{ marginTop: "150px" }}>
                <h2>You have {donation.length} donation </h2>
                 <ul>
                    {
                         donation.map(donate => <li>{donate.title} || {donate.donerEmail}</li>)
                    }
                 </ul>
        </div>
    );
};

export default Donation;