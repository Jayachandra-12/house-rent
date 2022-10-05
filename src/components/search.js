import React from 'react'
import { useEffect, useState } from 'react';
import dataset from '../house-rent-dataset.json';

function Search() {

    let city = new Set();
    dataset.map(Userobj=>city.add(Userobj.City))
    const [selectedcity,setSelectedCity] = useState(0)
    city = [...city]
    // console.log(selectedcity)

    let [posted,setPosted] = useState([])
    let [selectedPosted,setSelectedPosted] = useState(0)
    let [price,setPrice] = useState([])
    let [selectedPrice,setSelectedPrice] = useState(0)
    let [size,setSize] = useState([])
    let [selectedSize,setSelectedSize] = useState(0)
    
    useEffect(()=>{
    let posted1 = new Set();
    let price1 = new Set();
    let size1 = new Set();
    dataset.map((Userobj)=>{
        if(Userobj.City == selectedcity) {
        // console.log(Userobj['Posted On'])
        posted1.add(Userobj['Posted On'])
        price1.add(Userobj.Rent)
        size1.add(Userobj.Size)
        }
    })
    posted1 = [...posted1]
    size1 = [...size1]
    price1 = [...price1]

    setPosted(posted1.sort(function(a, b){return a-b}))
    setPrice(price1.sort(function(a, b){return a-b}))
    setSize(size1.sort(function(a, b){return a-b}))
    },[selectedcity])
    
    // const [selectedPosted,setSelectedPosted] = useState(0)
    // let [price,setPrice] = useState([])
    // useEffect(()=>{
    // let price1 = new Set();
    // dataset.map((Userobj)=>{

    //     if(Userobj['Posted On'] == selectedPosted && Userobj.City == selectedcity) {
    //     // console.log(Userobj['Posted On'])
    //     price1.add(Userobj.Rent)
    //     }
    // })
    // price1 = [...price1]
    // setPrice(price1)
    // // console.log(posted)
    // // console.log(posted.length)
    // },[selectedPosted])

    // let [selectedPrice,setSelectedPrice] = useState(0)
    // let [size,setSize] = useState([])

    // useEffect(()=>{
    // let size1 = new Set();
    // dataset.map((Userobj)=>{

    //     if(Userobj['Posted On'] == selectedPosted && Userobj.City == selectedcity && Userobj.Rent == selectedPrice) {
    //     // console.log(Userobj['Posted On'])
    //     size1.add(Userobj.Size)
    //     }
    // })
    // size1 = [...size1]
    // setSize(size1)
    // console.log(size)
    // // console.log(posted)
    // // console.log(posted.length)
    // },[selectedPrice])
    // let [selectedSize,setSelectedSize] = useState(0)
    return (
    <div>
        <div className="container mt-3">
        <div className="display-3 mb-5">Search Properties to Rent</div>
        <div className="row mb-3">
          <div className="form-group col-md-3">
            <label className="mb-2">City</label>
            <select name="City" className="form-control" value={selectedcity} onChange={e=>setSelectedCity(e.target.value)}>
              <option value="0">--Select City--</option>
              {
                city.map(Userobj=><option key={Userobj}>{Userobj}</option>)
              }
            </select>
          </div>

          <div className="form-group col-md-2">
            <label className="mb-2">When</label>
            <select name="Posted Date" className="form-control" value={selectedPosted} onChange={e=>setSelectedPosted(e.target.value)}>
              <option>--Posted Date--</option>
              { posted.length &&
                posted.map(Userobj => <option key={Userobj}>{Userobj}</option>)
              }
            </select>
          </div>

          <div className="form-group col-md-2">
            <label className="mb-2">Price</label>
            <select name="Price" className="form-control" value={selectedPrice} onChange={e=>setSelectedPrice(e.target.value)}>
              <option>--Select Price--</option>
              { price.length &&
                price.map(Userobj => <option key={Userobj}>{Userobj}</option>)
              }
            </select>
          </div>

          <div className="form-group col-md-2">
            <label className="mb-2">Size</label>
            <select name="Size" className="form-control" value={selectedSize} onChange={e=>setSelectedSize(e.target.value)}>
              <option>--Select Size--</option>
              { size.length &&
                size.map(Userobj => <option key={Userobj}>{Userobj}</option>)
              }
            </select>
          </div>
          
          <div className="form-group col-md-2 ">
              <button className="mt-4 mb-2 btn btn-info">Search</button>
          </div>

        </div>
    </div>
    </div>
  )
}

export default Search