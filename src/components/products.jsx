import React, { useState } from "react";
import productalldata from '../data/products.json'

function Allproducts() {
    const[eachctgry,setEachctgry]=useState([])
    return <>
       {/*  {console.log(productalldata)} <br /> */}
        <ul>
            {

                productalldata.map((allprods) => (<li key={allprods.caregoryId}>
                    <div>
                    {
                        
                        allprods.categories.map((ph)=>(<span key={allprods.caregoryId}> 
                      
                            {
                             // allprods.categories.map(x=>x.tvs).map(y=>y) 
                             //  console.log(allprods.categories.map(x=>x.phones).map(y=>y)[0][0].productName)
                           allprods.categories.map((x)=>x.phones)[0].map(y=>y.productName).map(z=><span>{z}<br/></span>)
                                }
 
                                      
                        </span>))
                    }
                    </div>
                   {/*  ------
                    {
                        allprods.tvs.map((clt) => (<span key={clt.productId}>{clt.productName}</span>))
                    }
                     ------
                    {
                        allprods.laptops.map((jwl) => (<span key={jwl.productId}>{jwl.productName}</span>))
                    }
 */}
                </li>))
            }
        </ul>
    </>
}

export default Allproducts