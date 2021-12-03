import React, { Component } from 'react'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName:"",
      userInformation:null,
      userRepositories:[]
      
    }
  }

  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({[e.target.name]:e.target.value})
  }
  // componentDidMount=()=>{
  //   this.fetchAPI(`${this.state.userName}`, "userInformation")
  //   this.fetchAPI(`${this.state.userName}/repos`,"userRepositories")
  // }

  fetchAPI=(rest, state)=>
    axios.get(`http://api.github.com/users/${rest}?client_id=577009489d756d7248a7&client_secret=71369f175a3a8d17fe83b19424624dbb2503ec4a&sort=created`)
      .then(res => {
        this.setState({[state]: res.data})
        console.log(res.data)
      })
      .catch(err => console.log(err))
  onClick = (e) => {
    e.preventDefault()
    this.fetchAPI(`${this.state.userName}`, "userInformation")
    this.fetchAPI(`${this.state.userName}/repos`,"userRepositories")
  }

  render() {
    const {userName, userInformation, userRepositories} =this.state
    return (
      <div className="container">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a href="/" className="navbar-brand">GitHub user's personal data</a>
            <form className="d-flex">
              <input className="form-control me-2" name="userName" onChange={this.onChange} value={userName} placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-light" type="submit" onClick={this.onClick}>Search</button>
            </form>
          </div>
        </nav>
        
        {userInformation ?
        <div className="card">
          <h1>{userInformation.name}'s GitHub</h1>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={userInformation.avatar_url} className="img-fluid rounded-start" alt="..."/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="card">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><strong>Full Name :</strong> {userInformation.name}</li>
                      <li className="list-group-item"><strong>User Name :</strong> {userInformation.login}</li>
                      <li className="list-group-item"><strong>Location :</strong> {userInformation.location}</li>
                      <li className="list-group-item"><strong>Email :</strong> {userInformation.email}</li> 
                    </ul> 
                  </div>
                </div>
              </div>
            </div>
          </div>                  
        </div>: <div className="warning">Please, Write a Correct User Name to get the data!</div>}
        
        {userRepositories && userRepositories.length > 0 &&
          <div>
            <h2>User Repositories</h2>
            <div>
            <ul className="list-group list-group-flush">
              {userRepositories.map((value, index) => index < 10 &&
                <li className="list-group-item" key={value.id}><strong className="color">{value.name} :</strong> {value.description}</li>
              )}
            </ul>
            </div>
          </div>
        }
        
      </div>
      
    )
  }
}

export default App;
