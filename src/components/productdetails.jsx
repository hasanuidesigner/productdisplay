import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"

function ProductDetails({userAuthentic}) {
    const {id} = useParams();
    const [snglprolist, setSnglprolist] = useState({})
    useEffect(()=>{
      if (userAuthentic) {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.json())
        .then(json=>setSnglprolist(json))
}
else if (!userAuthentic || (snglprolist.category)==undefined) {
  setSnglprolist({})
  window.location.href='/'
}
},[id])
    
return<> {console.log(snglprolist.category)}
{userAuthentic ?
            <>
<div className="container">
<div className="card" style={{width:'500px',margin:'auto'}}>
    <div className="card-header">{snglprolist.category}</div>
  <img src={snglprolist.image} className="card-img-top" alt={snglprolist.title} style={{width:'300px',margin:'auto'}} />
  <div className="card-body">
    <h5 className="card-title">{snglprolist.title} </h5>
    <p className="card-text">{snglprolist.description}</p> 
  </div>
  <div className="card-footer" style={{display:'flex',justifyContent:'center'}}><span>Price: ${snglprolist.price}</span>  </div>
</div> 
</div>
</> :<div className="ask-to-auth"><div className="alert alert-warning" role="alert">
               You need authentication to view this page. Please <strong>Login</strong> . For testing purpose you can use the below credential as of now.<div><strong>Username:</strong> user2, <strong>Password:</strong> 123456</div>
          </div></div>
}
</>
}

export default ProductDetails