import React, { Component } from "react";
import Cardlist from "../Components/cardlist";
import SearchBox from "../Components/SearchBox";
import { robots } from "../robots";
import Scroll from "../Components/scroll";
import "./index.css";
import { render } from "@testing-library/react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  }
  onSearchChange = (event) => {
    console.log(event);
    this.setState({ searchField: event.target.value });
  };
  render() {
    const { robots, searchField} = this.state
    const filteredRobots = robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(searchField.toLowerCase());
    });
    return (!robots.length) ?  <h1>Loading</h1> : (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <Cardlist robots={filteredRobots} />;
          </Scroll>
        </div>
      );
    
  }
}
export default App;
