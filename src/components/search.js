import React from 'react'
import { useEffect, useState } from 'react';
import dataset from '../house-rent-dataset.json';
import './search.css'
function Search() {

    let city = new Set();
    dataset.map(Userobj=>city.add(Userobj.City))
    const [selectedcity,setSelectedCity] = useState(0)
    city = [...city]

    let [posted,setPosted] = useState([])
    let [selectedPosted,setSelectedPosted] = useState(0)
    let [price,setPrice] = useState([])
    let [selectedPrice,setSelectedPrice] = useState(0)
    let [size,setSize] = useState([])
    let [selectedSize,setSelectedSize] = useState(0)
    let [selected,setSelected] = useState({})
    
    useEffect(()=>{
    let posted1 = new Set();
    let price1 = new Set();
    let size1 = new Set();
    dataset.map((Userobj)=>{
      if(Userobj.City == selectedcity) {
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
      selected["City"] = selectedcity
      setSelected({...selected})
    },[selectedcity])

    const selectedComponents = () => {

      if(selectedPosted == 0) {
        let posted1 = new Set()
        let ans = 0
        for(let key in selected) {
          ans+=1;
        }
        // console.log(ans)
        dataset.map((Userobj)=>{
          let f = 0
          for(let key in selected) {
            if(Userobj[key] == selected[key]) {
              f = f+1;
            }
          }
          // console.log(f)
          if(f == ans) {
            posted1.add(Userobj['Posted On'])
          }
        })
        posted1 = [...posted1]
        setPosted(posted1.sort(function(a,b){return a-b}))
      }

      if(selectedSize == 0) {
        let size1 = new Set()
        let ans = 0
        for(let key in selected) {
          ans+=1;
        }
        // console.log(ans)
        dataset.map((Userobj)=>{
          let f = 0
          for(let key in selected) {
            if(Userobj[key] == selected[key]) {
              f = f+1;
            }
          }
          // console.log(f)
          if(f == ans) {
            size1.add(Userobj.Size)

          }
        })
        size1 = [...size1]
        setSize(size1.sort(function(a,b){return a-b}))
      }

      if(selectedPrice == 0) {
        let price1 = new Set()
        let ans = 0
        for(let key in selected) {
          ans+=1;
        }
        // console.log(ans)
        dataset.map((Userobj)=>{
          let f = 0
          for(let key in selected) {
            if(Userobj[key] == selected[key]) {
              f = f+1;
            }
          }
          // console.log(f)
          if(f == ans) {
            price1.add(Userobj.Rent)
          }
        })
        price1 = [...price1]
        setPrice(price1.sort(function(a,b){return a-b}))
      }

    }
    let [displayedData,setDisplayedData] = useState(dataset.sort(function(a,b){return a.Rent-b.Rent}))
    
    // console.log(displayedData)
    const onSubmission = () =>{
      let ar = []
      let ans = 0
      for(let key in selected) {
        ans+=1;
      }
      if(selectedcity == 0) {
        setDisplayedData(dataset.sort(function(a,b){return a.Rent-b.Rent}))
      }
      else {
      dataset.map((Userobj)=> {
            let f = 0
            for(let key in selected) {
              if(Userobj[key] == selected[key]) {
                f = f+1;
              }
            }
            if(f == ans) {
              ar.push(Userobj)
            }
        })
      setDisplayedData(ar.sort(function(a,b){return a.Rent-b.Rent}))
      }
    }

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
          <select name="Posted Date" className="form-control" value={selectedPosted} onChange={(e)=>{setSelectedPosted(e.target.value);selected["Posted On"]=e.target.value;setSelected({...selected});selectedComponents()}}>
            <option>--Posted Date--</option>
            { posted.length &&
              posted.map(Userobj => <option key={Userobj}>{Userobj}</option>)
            }
          </select>
        </div>

        <div className="form-group col-md-2">
          <label className="mb-2">Price</label>
          <select name="Price" className="form-control" value={selectedPrice} onChange={(e)=>{setSelectedPrice(e.target.value);selected["Rent"]=e.target.value;setSelected({...selected});selectedComponents()}}>
            <option>--Select Price--</option>
            { price.length &&
              price.map(Userobj => <option key={Userobj}>{Userobj}</option>)
            }
          </select>
        </div>

        <div className="form-group col-md-2">
          <label className="mb-2">Size</label>
          <select name="Size" className="form-control" value={selectedSize} onChange={(e)=>{setSelectedSize(e.target.value);selected["Size"]=e.target.value;setSelected({...selected});selectedComponents()}}>
            <option>--Select Size--</option>
            { size.length &&
              size.map(Userobj => <option key={Userobj}>{Userobj}</option>)
            }
          </select>
        </div>
        <div className="form-group col-md-2 ">
            <button className="mt-4 mb-2 btn btn-info" onClick={e=>onSubmission()}>Search</button>
        </div>
        <div className='row justify-content-center m-3'>
            {
            displayedData.slice(0,30).map((val,index)=> 
              <div className="card col col-lg-4 col-md-6 col-sm-10 w-25 p-3 m-3" key={index}>
                <div className='dimg d-block mx-auto'>
                    <img src="https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHw%3D&w=1000&q=80" className="card-img-top h-100" alt="..." />
                </div>
                <div className="card-body bg-light text-dark">
                  <h5 className="card-title fw-bold">Rent : {val.Rent}</h5>
                  <p className="card-text lead">City : {val.City}</p>
                  <p className="card-text lead">Posted On : {val['Posted On']}</p>
                  <p className="card-text lead">Size : {val.Size}</p>
                  <p className="card-text lead">BHK : {val.BHK}</p>
                </div>
              </div>
            )
            }
        </div>
      </div>
    </div>
    </div>
    )
}

export default Search