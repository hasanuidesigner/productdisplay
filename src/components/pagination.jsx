import React, { useEffect, useState } from "react";

function Paginate() {
    const [data, setData] = useState([])
    const [datacount, setDatacount] = useState([])
    const [startRecordNum, setStartRecordNum] = useState(0)
    const [endRecordNum, setEndRecordNum] = useState(0)
    const [numofRecord, setNumofRecord] = useState()
    const number = Math.ceil(datacount.length/numofRecord)
     const paginationNumbers=document.getElementById('paginationNumbers')
    let numbers = []
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(json => setDatacount(json))
        setData(datacount.slice(startRecordNum, endRecordNum))
    }, [numofRecord, startRecordNum,endRecordNum])
   
    const prevChange = () => {
        if(startRecordNum!=0){
            setStartRecordNum(Math.ceil(startRecordNum - numofRecord))
            setEndRecordNum(Math.ceil(endRecordNum - numofRecord))
        for(var j=0;j<paginationNumbers.childNodes.length;j++){ 
            paginationNumbers.childNodes[j].classList.remove("active")
        }
        paginationNumbers.childNodes[Math.ceil(startRecordNum / numofRecord)-1].classList.add("active")
    }
    }

    const nextChange = () => {
        if(number!=Math.ceil(endRecordNum / numofRecord) ){
        setStartRecordNum(Math.ceil(startRecordNum + numofRecord))
        setEndRecordNum(Math.ceil(endRecordNum + numofRecord))
        for(var j=0;j<paginationNumbers.childNodes.length;j++){ 
            paginationNumbers.childNodes[j].classList.remove("active")
        }
        paginationNumbers.childNodes[Math.ceil(startRecordNum / numofRecord)+1].classList.add("active")
    }
    }

    const chngeitemperPage = (e) => {
        setNumofRecord(parseInt(e.target.value))
        setStartRecordNum(0)
        setEndRecordNum(parseInt(e.target.value))   
        for(var j=0;j<paginationNumbers.childNodes.length;j++){ 
            paginationNumbers.childNodes[j].classList.remove("active")
        }
        paginationNumbers.childNodes[0].classList.add("active")
    }

    const navtonum = (e)=>{   
        for(var j=0;j<e.target.parentElement.childNodes.length;j++){ 
            e.target.parentElement.childNodes[j].classList.remove("active")
        }
        e.target.parentElement.childNodes[e.target.id-1].classList.add("active")
        setEndRecordNum(Math.ceil(e.target.id*numofRecord))
        setStartRecordNum(Math.ceil(e.target.id*numofRecord)-numofRecord)
    }
     
    for(var i=1;i<=number;i++){ 
        numbers.push(i)
    }
 
    return <>
    {startRecordNum}   {endRecordNum} {numofRecord}<br/>
        select items per page:
        <select onChange={chngeitemperPage}>
            <option value={10}>Select</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
        </select>
        {
            data.length > 0 ?

                <><ul style={{ listStyle: "none" }}>
                    {
                        data.map(item => <li key={item.id} style={{ listStyle: "none" }}>{item.id}. {item.title}</li>)
                    }
                </ul>

                    <div className="pagination-wrap"> <button className="pagin-link-prev" onClick={prevChange}>prev</button><div id='paginationNumbers' className="pagination-numbers">
               {  
      numbers.map((n,i)=><span key={i} onClick={navtonum} id={n} className={  (i===0) ? 'pagin-link active' :'pagin-link'}>{n}</span> )
      
                      }
                    </div><button className="pagin-link-next" onClick={nextChange}>next</button> </div></> : <div>Please select a value from the above drop down</div>
        }
    </>
}

export default Paginate