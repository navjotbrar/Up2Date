import React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import styled from 'styled-components';
// import "./signup"
import { withRouter } from "react-router-dom";
import { resolve } from "url";

const FormDiv = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
`
const SignUpJumbo = styled(Jumbotron)`
	padding: 1rem 2rem;
	// background-color: red;
`
function validInfo(props){
	// need to chack the database later to see if name is taken and such
	// how do i error check insurance and ahn :(
	const ahn = +props.AHN;
	const insurance = +props.ICName;
	const month = +props.month;
	const day = +props.day;
	const year = +props.year;
	const docId = +props.docId;
	console.log(JSON.stringify(props.allDocId));
	if(Number.isNaN(ahn) || Number.isNaN(insurance) || Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(year)){
		console.log("Please enter valid number! for AHN and insurance number, or date");
		return false;
	}

	if(props.fname == ''|| props.lname == ''||props.pasword==''||props.username ==''){
		console.log("invalid names")
		return false;
	}
	if(props.month < 1 || props.month > 12){
		console.log("invalid month")
		return false;
	}
	if(props.day < 1 || props.day > 31){
		console.log("invalid day")
		return false;
	}
	if(props.year < 1900 || props.year > 2021){
		console.log("invalid year")
		return false;
	}
	
	//console.log("invalid doc id")
	return true;
}

class SignUp extends React.Component {

	state = {
		fname: '',
		minit: '',
		lname: '',
		month: '',
		day: '',
		year: '',
		password: '',
		username:'',
		AHN: '',
		ICName: '',
		docId: '',
		usernameValid: false,
		address: '',
		allDocId: [],
	}
	async getMyDocIds(){
		//console.log("Yuhhhh we in here");
	
		try {
			let r = await fetch('/api/getAllDocIds');
			let allDocId = await r.json();
			//console.log(JSON.stringify(allDocId) + "yahwhwhwh ");
            this.setState({ allDocId });
		} catch (error) {
			console.log(error);
		}
	}
	
	action = async () => {

		//  this.getMyDocIds();
		
		try {
			let r = await fetch('/api/getAllDocIds');
			let allDocId = await r.json();
			//console.log(JSON.stringify(allDocId) + "yahwhwhwh ");
            this.setState({ allDocId });
		} catch (error) {
			console.log(error);
		}
        
        console.log(this.state);
        
		if(validInfo(this.state)){
			const name = await this.returnICName();
			const userExists = await this.checkIfUserExists();
			console.log(userExists + " hiii ");
			if(userExists == "taken"){
				alert("that username is taken");
				return;
			}

			console.log(name);
			console.log("  "+this.state.ICName);

			if(name == ''&&this.state.ICName!=''){
				alert("invalid insurance number");
				alert("If you have no ensurance leave the field empty");
				return;
			}
			var isRight = false;
			
			for(var i = 0; i < this.state.allDocId.length; i++){

				if(this.state.docId == this.state.allDocId[i].docId){
					console.log(this.state.allDocId[i].docId)
					isRight = true;
				}
			}
			if(!isRight){
				alert("Please enter a valid doctor id");
				return;
			}
			if(this.state.ICName==''){
				this.state.ICName = "NULL";
				this.submit();
				alert("account created with no ensurance, press ok to go to sign in!");
			}else{
								//this.setState({ICName:name})
				this.state.ICName = name[0].name;
				this.submit();

			}
			alert("account created, press ok to go to sign in!");
			// @ts-ignore
			this.props.history.push('./login');
		}else{
			console.log("Invalid information");
			alert("Please enter valid information");
		}
	}

	async returnICName(){
		console.log("getting company name with id "+this.state.ICName);
		try{
			let r = await fetch('/api/getIC',{
				method: 'PUT',
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify({ICID:this.state.ICName})
			});
			let name = await r.json();
			console.log("THE NAME IS: "+name);
			return new Promise((resolve, reject)=>{
				if(name == ''){
					resolve('');
				}
				resolve(name);
			});
		}
		catch(error){
		    console.log(error);
	    }
    }

	async submit () {
		console.log(this.state.docId);
		try{
			let r = await fetch ('/api/signup',{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				
				body: JSON.stringify(this.state)
			});
			console.log("user added");
		} catch(error){
			console.log(error);
		}
	}
	
	handleChange = (e) => {

		if(e.target.id == 'username'){
			console.log("CHANGING USERNAME");
			console.log(e.target.value);
		}
		this.setState({
				[e.target.id]: [e.target.value]
		})
	} 
	
	render() {
		return (
			<FormDiv>
				<Container>
				 <SignUpJumbo> 

					 <h1>Enter New Post Details</h1>

						<Form.Row>
							<Form.Group as = {Col} md = "4" >
								<Form.Label>Title</Form.Label>
								<Form.Control type="name" placeholder="Title" id ="fname" onChange = {this.handleChange} />
							</Form.Group>

							<Form.Group as = {Col} md = "4">
								<Form.Label>Link</Form.Label>
								<Form.Control type="name" placeholder="Link (optional)" id ="minit" onChange = {this.handleChange} />
							</Form.Group>

							<Form.Group as = {Col} md = "4">
								<Form.Label>Last name</Form.Label>
								<Form.Control type="name" placeholder="Last Name" id ="lname" onChange = {this.handleChange} />
							</Form.Group>

					</Form.Row>
					<Form.Row>
							<Form.Group as = {Col} md ="4">
								<Form.Label>Month</Form.Label>
								<Form.Control placeholder="month" id ="month" onChange = {this.handleChange} />
							</Form.Group>
							<Form.Group as = {Col} md ="4">
								<Form.Label>Day</Form.Label>
								<Form.Control placeholder="day" id ="day" onChange = {this.handleChange} />
							</Form.Group>


							<Form.Group as = {Col} md ="4">
								<Form.Label>Year</Form.Label>
								<Form.Control placeholder="Year" id ="year" onChange = {this.handleChange} />
							</Form.Group>
					</Form.Row>
						<div className="btnDiv">
							<Button variant="primary" onClick = {this.action}>
								Submit
							</Button>
						</div>
					</SignUpJumbo>
				</Container>
			</FormDiv>
		);
	}
}
// @ts-ignore
export default withRouter(SignUp); 
