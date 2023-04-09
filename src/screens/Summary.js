import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listUsers, userDetails } from "../components/actions/userActions";
import LoadingBox from "../components/loadingBox";

const Summary = () => {
  const params = useParams();

  const navigate = useNavigate();
  const userdetails = useSelector((state) => state.userDetails);
;

  const { loading, error, user } = userdetails;
  const userList = useSelector((state) => state.userList);
  const {  users } = userList;
  const dispatch = useDispatch();
  const handelBack=(()=>{
    navigate("/")
  })
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(userDetails(params.id));
    }
  }, [ dispatch, params.id]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h2>Error Occured</h2>
      ) : (
            <div className="card mb-3 mx-4 my-4">
              <div className="card-body">
                <h5 className="card-title">User Details</h5>
                <p className="card-text"> Todo Id : {user.id}</p>
                <p className="card-text"> Todo Title : {users.filter((i)=>i.id===params.id)[0].title}</p>
                <p className="card-text"> Name : {user.name}</p>
                <p className="card-text"> Username : {user.username}</p>
                <p className="card-text"> Email : {user.email}</p>
                <p className="card-text"> Address : {user.address.street} , {user.address.suite} , {user.address.city} , {user.address.zipcode}</p>
                <p className="card-text"> Phone : {user.phone}</p>
                <p className="card-text"> Website : {user.website}</p>
              </div>
            </div>
      )}
      <button type="button" className="btn btn-dark mx-4 " onClick={handelBack}>Back</button>

    </div>
  );
};

export default Summary;
