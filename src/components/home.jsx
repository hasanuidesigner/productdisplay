import React, { useEffect, useState } from "react";
import './home.css'
import { Link } from "react-router-dom";

function Home({ userAuthentic,openLogin }) {
    const [prolist, setProlist] = useState([])
    const [fltrprolist, setFltrprolist] = useState([])
    const [isfiltered, setIsfiltered] = useState(false)

    const [startRecordNum, setStartRecordNum] = useState(0)
    const [endRecordNum, setEndRecordNum] = useState(20)
    const [numofRecord, setNumofRecord] = useState(20)
    const number = Math.ceil(prolist.length / numofRecord)
    const numberfltr = Math.ceil(fltrprolist.length / numofRecord)

    const paginationNumbers = document.getElementById('paginationNumbers')
    let numbers = []
    let numbersfltr = []

    useEffect(() => {
        if (userAuthentic) {
            fetch('https://fakestoreapi.com/products').then(response => response.json()).then(json => setProlist(json))
            setProlist(prolist.slice(startRecordNum, endRecordNum))
            document.getElementById('categoryLeftmenu').childNodes[0].classList.add("active")
        }
        else if (!userAuthentic) {
            setProlist([])
            setFltrprolist([])
            setIsfiltered(false)
        }
    }, [userAuthentic])
    const categorymenu = (prolist).map(ctgry => ctgry.category)
    const categorymenuFnl = [...new Set(categorymenu)];

    const prevChange = () => {
        if (startRecordNum != 0) {
            setStartRecordNum(Math.ceil(startRecordNum - numofRecord))
            setEndRecordNum(Math.ceil(endRecordNum - numofRecord))
            for (var j = 0; j < paginationNumbers.childNodes.length; j++) {
                paginationNumbers.childNodes[j].classList.remove("active")
            }
            paginationNumbers.childNodes[Math.ceil(startRecordNum / numofRecord) - 1].classList.add("active")
        }
    }

    const nextChange = () => {
        if (number != Math.ceil(endRecordNum / numofRecord) && numberfltr != Math.ceil(endRecordNum / numofRecord)) {
            setStartRecordNum(Math.ceil(startRecordNum + numofRecord))
            setEndRecordNum(Math.ceil(endRecordNum + numofRecord))
            for (var j = 0; j < paginationNumbers.childNodes.length; j++) {
                paginationNumbers.childNodes[j].classList.remove("active")
            }
            paginationNumbers.childNodes[Math.ceil(startRecordNum / numofRecord) + 1].classList.add("active")
        }
    }

    const chngeitemperPage = (e) => {
        setNumofRecord(parseInt(e.target.value))
        setStartRecordNum(0)
        setEndRecordNum(parseInt(e.target.value))
        for (var j = 0; j < paginationNumbers.childNodes.length; j++) {
            paginationNumbers.childNodes[j].classList.remove("active")
        }
        paginationNumbers.childNodes[0].classList.add("active")
    }

    const navtonum = (e) => {
        for (var j = 0; j < e.target.parentElement.childNodes.length; j++) {
            e.target.parentElement.childNodes[j].classList.remove("active")
        }
        e.target.parentElement.childNodes[e.target.id - 1].classList.add("active")
        setEndRecordNum(Math.ceil(e.target.id * numofRecord))
        setStartRecordNum(Math.ceil(e.target.id * numofRecord) - numofRecord)
    }

    for (var i = 1; i <= number; i++) {
        numbers.push(i)
    }

    for (var i = 1; i <= numberfltr; i++) {
        numbersfltr.push(i)
    }

    const filterPro = (e) => {
        if (e.target.title !== "All") {
            setFltrprolist((prolist).filter(curctgry => curctgry.category === e.target.title).map(produt => produt))
            setIsfiltered(true)
            setEndRecordNum(numofRecord)
            setStartRecordNum(0)

            for (var j = 0; j < paginationNumbers.childNodes.length; j++) {
                paginationNumbers.childNodes[j].classList.remove("active")
            }
            paginationNumbers.childNodes[0].classList.add("active")

            for (var k = 0; k < document.getElementById('categoryLeftmenu').childNodes.length - 1; k++) {

                document.getElementById('categoryLeftmenu').childNodes[k].classList.remove("active")
            }
            let curLftmenu = parseInt((e.target.id).split("-").pop())
            document.getElementById('categoryLeftmenu').childNodes[curLftmenu + 1].classList.add("active")

        }
        else {
            setFltrprolist([])
            setIsfiltered(false)
            for (var k = 0; k < document.getElementById('categoryLeftmenu').childNodes.length - 1; k++) {

                document.getElementById('categoryLeftmenu').childNodes[k].classList.remove("active")
            }
            document.getElementById('categoryLeftmenu').childNodes[0].classList.add("active")
        }

    }

    return <>
        {userAuthentic ?
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                            <ul className="list-group" id="categoryLeftmenu">
                                <li className="list-group-item" title='All' onClick={filterPro}>All items</li>
                                {
                                    (categorymenuFnl).map((menuleft, i) => <li className="list-group-item" key={`lftmnu-${i}`} id={`lftmnu-${i}`} onClick={filterPro} title={menuleft}>{menuleft}</li>)
                                } </ul>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                            <div className="item-per-page-wrap">
                                <div> Number of items to display per page: &nbsp;&nbsp;&nbsp;&nbsp;
                                    <select onChange={chngeitemperPage} className="itemsnumDropdown">
                                        <option value={20}>Select</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={25}>25</option>
                                    </select>
                                </div>
                                <div className="pagination-wrap"> <button className="pagin-link-prev" onClick={prevChange}>prev</button><div id='paginationNumbers' className="pagination-numbers">
                                    {
                                        (!isfiltered ? numbers : numbersfltr).map((n, i) => <span key={i} onClick={navtonum} id={n} className={(i === 0) ? 'pagin-link active' : 'pagin-link'}>{n}</span>)

                                    }
                                </div><button className="pagin-link-next" onClick={nextChange}>next</button> </div>
                            </div>

                            <div className="row align-items-start">

                                {

                                    (!isfiltered ? prolist : fltrprolist).slice(startRecordNum, endRecordNum).map(produt =>
                                        prolist.length > 0 ?

                                            <>
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4" key={produt.id}><Link to={'/product/' + produt.id}><div className="card">
                                                    <div className="card-header" title={produt.title}>{(produt.title).substring(0, 40)}</div>
                                                    <img className="imgCss" src={produt.image} alt={produt.title} title={produt.title} />
                                                    <div className="card-body">
                                                        <div className="card-text">{(produt.category)}</div>
                                                        <div className="card-text" title={produt.description}>{(produt.description).substring(0, 40)}...</div>
                                                    </div>
                                                    <div className="card-footer">
                                                        <span className="card-price">Price: ${produt.price}</span>
                                                        <span className="card-rate">Rating: {produt.rating.rate}</span>
                                                    </div>
                                                </div></Link>

                                                </div></> : <div>Please select a value from the above drop down</div>)
                                }



                            </div>


                        </div>
                    </div>
                </div>
            </>
            : <div className="ask-to-auth"><div className="alert alert-warning" role="alert">
               You need authentication to view this page. Please <strong onClick={openLogin} style={{cursor:"pointer"}}>Login</strong> . For testing purpose you can use the below credential as of now.<div><strong>Username:</strong> user2, <strong>Password:</strong> 123456</div>
          </div></div>}
    </>
}
export default Home