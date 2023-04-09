import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/loadingBox";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../components/actions/userActions";

export default function Home() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    
    if (searchKeyword) {
      console.log({users})
      const results = users?.filter((user) => {
        return (
          user.id?.toString().includes(searchKeyword) ||
          user.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          user.completed
            ?.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        );
      });
      console.log({results})
      setSearchResults(results);
    } else {
      setSearchResults(users);
    }
  }, [searchKeyword, users]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h2>Error Occured</h2>
      ) : (
        <div className="home">
               
          {users && (
            <div>
                      <form class="d-flex my-3">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    aria-label="Search"
                  />
                </form>
              <h1 className="my-3">List of user</h1>
 
              <table class="table caption-top table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">Todo Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults?.map((i) => (
                    <tr>
                      {/* <th scope="row">1</th> */}
                      <td>{i.id}</td>
                      <td>{i.title}</td>
                      <td>{i.completed === true ? "True" : "False"}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={(e) => {
                            navigate(`/summary/${i.id}`);
                          }}
                        >
                          View User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
