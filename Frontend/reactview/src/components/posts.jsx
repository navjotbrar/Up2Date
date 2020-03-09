import React, { Component, Fragment } from "react";
import Expand from "react-expand-animated";
import globe from "./img/world.png";
import Login from "./login.jsx"
import {Table} from "reactstrap"

class App extends Component {
  state = { open: false };

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const styles = {
      open: { background: "#ecf0f1" }
    };
    const transitions = ["height", "opacity", "background"];

    return (
      <div onClick={this.toggle}>
                        <div> 
                    <Table>
                        <tr>
                            <td>
                                <img src = {globe} width= "100" height = "100"/>
                            </td>
                            <td>
                                <p>Drowing at the olypics</p>
                                <p> Nope, no one has ever drowned in a swimming race at Olympics, although it was about to happen at 1948 Olympics when Greta Anderson(Denmark) nearly drowned when she fainted midway through a race but was rescued by two other swimmers from Hungary and U.S.. And she went on to win gold medal in 100m freestyle and silver in</p>
                            </td>
                        </tr>
                    </Table>
                </div>
          <Expand
            open={this.state.open}
            duration={1000}
            styles={styles}
          >
            <img src={globe}/>
          </Expand>
      </div>
    );
  }
}

export default App;
