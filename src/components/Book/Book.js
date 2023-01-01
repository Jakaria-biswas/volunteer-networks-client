import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserAuth from '../Hooks/UserAuth';
import './Book.css';
const Book = () => {
    const [user] = UserAuth()
    const { id } = useParams();
    const [book, setBook] = useState({})
    const [text, setText] = useState("");
    const navigate= useNavigate();
    useEffect(() => {
        fetch(`https://volunteer-networks-server.vercel.app/book/${id}`)
            .then(res => res.json())
            .then(data => setBook(data))
    }, [])

 const handleBookForDonation = event => {
     event.preventDefault()

       const bookDataForDonation = {title:book.title, image:book.image, donerEmail:user.email, opinion: text};
       
       fetch("https://volunteer-networks-server.vercel.app/bookDonate",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(bookDataForDonation)
       })
       .then(res => res.json())
       .then(result => {
           if(result.acknowledged == true){
             alert("SUCCESS BOOK FOR DONATION || We will contact very soon");
             navigate('/')
           }
       })

 }
    return (
        <div className='container' style={{ marginTop: "150px" }}>
            <div className="book">

                <div class="card mx-auto" >
                    <div class="card-body">
                        <h3 class="card-title">Donate for <span className='text-primary'>{book.title}</span></h3>
                        <form onSubmit={handleBookForDonation}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" value={user?.email || ''} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                <textarea onChange={e => setText(e.target.value)} class="form-control" id="exampleFormControlTextarea1" placeholder='write your opinion...' rows="3" required></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default Book;