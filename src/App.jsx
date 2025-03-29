import './css/App.css'
import { Component } from "react";

export default class App extends Component {
  
  constructor( props ) {
    super( props );
    this.state = {
      playerData: null,
    }
    
  }
  
  setPlayerData = ( data ) => {
    this.setState( { playerData: data } );
  }

  render() {
    return (
      <>
        <div className="card">
          <span>This is a website</span>
        </div>
      </>
    )
  }
}