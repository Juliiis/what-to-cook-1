import React from "react";
import Search from "./components/search";
import { BrowserRouter, Switch } from "react-router-dom";
import Navbar from "./components/NavBar";
import Routes from "./components/Routes";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: 0,
    };
  }

  //logout button pressed
  userLoggedOut = () => {
    console.log("user logging out");
    localStorage.removeItem("token");
    this.setState({
      userLoggedIn: 0,
    });
    //call the check user logged in function to set state to 0
  };

  isUserLoggedIn = async () => {
    //check if user logged in
    //set flag user logged in
    console.log("checking if user is logged in");
    let token = localStorage.getItem("token");
    console.log("token", token);
    if (token != undefined || token != null) {
      try {
        await fetch("api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
        //user is already logged in - changing flag in state
        console.log(
          "user logged in, this should change userLoggedIn state to 1"
        );
        this.setState({
          userLoggedIn: 1,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("User not logged in");
      this.setState({
        userLoggedIn: 0,
      });
    }
  };

  componentDidMount = () => {
    //call check if user logged in
    this.isUserLoggedIn();
  };

  render() {
    const { userLoggedIn } = this.state;
    return (
      <div className="App">
        <header>
          <nav>
            <h1 className="fixed-top"> WHAT TO COOK</h1>
            <BrowserRouter>
              <Navbar
                userLoggedIn={userLoggedIn}
                userLoggedOut={this.userLoggedOut}
                isuserLoggedIn={this.isUserLoggedIn}
              />

              <Search />

              <Routes />
              <Switch />
            </BrowserRouter>
          </nav>
        </header>
        <main className="container m-5 p-5">
          This is the area for the main content
        </main>
        <footer>
          this the footer which doesnt exist in design but we probably should
          write somethings like:<br></br>
          <bold>
            Made with &hearts; by Iva Bozic, Julieta Martin, Irina Eliseeva as a
            collaboration project for Codeop bootcamp, FS-09{" "}
          </bold>
        </footer>
      </div>
    );
  }
}
export default App;
