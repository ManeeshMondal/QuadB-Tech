import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/loadingBox";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../components/actions/userActions";
import { Box, Button, Paper, Typography } from "@material-ui/core";

export default function Home() {
  const dispatch = useDispatch();

  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, data } = userList;
  console.log({userList},"=====",userList.users)
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

 

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h2>Error Occured</h2>
      ) : (

        <div 
          className="home"
        >
          {userList?.users&& userList?.users?.map((i)=>(<div className="card" 
          style={{width: "18rem", margin:"5px"}}
          >
            <img className="card-img-top" height="250px" src={i?.show?.image?.original?i?.show?.image?.original:"https://cdn1.vectorstock.com/i/1000x1000/67/65/realistic-cinema-movie-poster-template-vector-5146765.jpg"}  alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{i?.show?.name}</h5>
              <p className="card-text">
              <p class="card-text">Ratings:{i?.show?.rating?.average}</p>
              <small class="text-muted">Language:{i?.show?.language}</small>
            <br></br>
            <small class="text-muted">Premiered:{i?.show?.premiered}</small>
              </p>
    
              <a  onClick={(e)=>{
                navigate(`/summary/${i.show.id}`)
                }} className="btn btn-primary">
                Details..
              </a>
            </div>
          </div>))}     
       </div>
      )}
    </div>
  );
}
