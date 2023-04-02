import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userDetails } from "../components/actions/userActions";
import LoadingBox from "../components/loadingBox";

const Summary = () => {
  const params = useParams();

  const navigate = useNavigate();
  const userList = useSelector((state) => state.userDetails);
  console.log({ userList }, "=====", userList);

  const { loading, error, user:User } = userList;
  const dispatch = useDispatch();

  useEffect(() => {
    if(params.id){dispatch(userDetails(params.id));
    console.log("=paramss=", params.id, typeof params.id);
    }
  }, [dispatch,params.id]);
   console.log(User?.show?.rating,"==================")
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h2>Error Occured</h2>
      ) : (
    <div className="details">
      <div className="card mb-3">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              className="card-img-top"
              height="500px"
              src={User?.show?.image?.original}
              alt="Card image cap"
            />
          </div>
        </div>
        <div className="card-body" style={{ margin: "10px" }}>
          <h5 className="card-title">{User?.show?.name}</h5>
          <p className="card-text">{User?.show?.summary}</p>
          <p className="card-text">Ratings:{User?.show?.rating?.average}</p>
          <p> Read More:<a href={User?.show?.url} className="card-text">{User?.show?.url}</a></p>
          <p className="card-text">
            <small className="text-muted">Language:{User?.show?.language}</small>
            <br></br>
            <small className="text-muted">Premiered:{User?.show?.premiered}</small>
          </p>
        </div>
      </div>
      <div className="homeButtons">
        <button type="button" className="btn btn-info" onClick={(e)=>{
                navigate(`/`)
                }}>
          Back to home
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Book
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                {User?.show?.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Adress</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Adress"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}
</div>
  );
};

export default Summary;
