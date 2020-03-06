import * as React from 'react';
import {Table} from "reactstrap"
import globe from "./img/world.png";
export default class Posts extends React.Component{
    constructor(props){
        super(props)

        this.state ={

        }
    }


    render(){
        return(
            <div> 
                <Table>
                    <tr>
                        <td>
                            <img src = {globe} width ="100" height="100"/>
                        </td>
                        <td>
                            <p>SAMPLE NEWS TITLE</p>
                            <p> To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, widely read in high schools and middle schools in the United States, it has become a classic of modern American literature, winning the Pulitzer Prize. </p>
                        </td>
                    </tr>
                </Table>
            </div>
        )
    }
}

