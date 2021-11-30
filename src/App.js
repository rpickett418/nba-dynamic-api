import React, {Component} from 'react';
import axios from 'axios';
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      playerStats: {}
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId()
    console.log(this.state.playerName)
  }
  
  handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if(replace.length > 0){
      this.setState({playerName: replace})
    } else {
      alert("Please type players name!")
    }
  }

getPlayerId = () => {
  axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
  .then(async res => {
    // console.log(res.data.data)

  // catching the error or else the app will crash // 

    if(res.data.data[0] === undefined){
      alert("This player is inactive or injured!")
    } else if(res.data.data.length > 1){
      alert("please specify name better!")
    } else {
      await this.getPlayerStats(res.data.data[0].id)
    }

  }).catch(err => {
    console.log(err)
  })
}

getPlayerStats = (playerId) => {
  axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerId}`)
  .then(async res => {
    // console.log(res.data.data)
    this.setState({ playerStats: res.data.data[0]})
  }).catch(err => {
    console.log(err)
  })
}

componentDidMount() {
  this.getPlayerId()
  this.getPlayerStats()
}

  render() {

  
  return (
    <div className="App">
      <h1 className="headerTitle"> GETTIN BUCKETS 
      </h1>
      <h2 className="headerTwo"> 2021-22 NBA Live Season Stats</h2>
      <form onSubmit={this.handleSubmit}>
      <label className="playerN">
        Player's Name:  
        <input 
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Enter player's name"
        />
      </label>
      <input  id="subMe" type="submit" value="Submit"/>
    </form>
    Games Played: {this.state.playerStats["games_played"]}
    <br />
    Points Average: {this.state.playerStats["pts"]}
    <br />
    Minutes: {this.state.playerStats["min"]}
    <br />
    Boards: {this.state.playerStats["reb"]}
    <br />
    Blocks: {this.state.playerStats["blk"]}
    <br />
    Assist: {this.state.playerStats["ast"]}
    <br />
    Steals: {this.state.playerStats["stl"]}
    <br />
    Turnovers: {this.state.playerStats["turnover"]}
    </div>
  );
}
}

export default App;
