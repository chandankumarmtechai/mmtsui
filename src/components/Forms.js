import React from 'react'
import { Component } from 'react';
import { Form, Button , Col} from 'react-bootstrap'
import axios from 'axios'

class Forms extends Component
{

    constructor(props)
    {
      super(props)
      this.state={
        stations:[],
        classes:[],
        source:'',
        dest:'',
        bookticket:{
        pnr:'',
        s_code:'',
        d_code:'',
        fair: 0, 
        noadult: 0,
        nochild: 0,
        cname:'general',
        dtime:''
        }
      }
      this.cnameHandler = this.cnameHandler.bind(this)
    }

    cnameHandler(event) {
      this.setState({
        bookticket:{
          
        }
      })
    }
    
    sourceHandler = event => {
      this.setState({
        source: event.target.value
      })
    }

    destHandler = event => {
      this.setState({
        dest: event.target.value
      })
    }

    noadultHandler = event => {
      this.setState({
        bookticket:{
          noadult: event.target.value
        }
      })
    }

    nochildHandler = event => {
      this.setState({
        bookticket:{
          nochild: event.target.value
        }
      })
    }

    submitHandler = event => {
      
      this.setState(prevState => ({
        bookticket:{
          s_code: prevState.stations.filter(x => x.name === prevState.source)[0].code,
          d_code: prevState.stations.filter(x => x.name === prevState.dest)[0].code,
          noadult: 5
        }
      }), this.callPost)
      event.preventDefault()
    }

    callPost = () => {
      alert(`${this.state.bookticket.cname} ${this.state.bookticket.d_code}`)
      console.log(this.state.bookticket.noadult)
      
    }

    componentDidMount(){

    axios.get('http://localhost:8080/stations')
    .then(response => this.setState({stations: response.data}))
    .catch(error => console.log(error))

    axios.get('http://localhost:8080/classes')
    .then(response => this.setState({classes: response.data}))
    .catch(error => console.log(error))
    }

    render(){
      const { stations, classes, bookticket } = this.state
      var MakeItem = function(X) {
                return <option>{X.name}</option>;
            };

        return(
            <Form onSubmit={this.submitHandler}>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>From:</Form.Label>
      <Form.Control
        as="select"
        className="mr-sm-2"
        id="fromid"
        value={this.state.source}
        onChange={this.sourceHandler}
        custom
      >
        {stations.map(MakeItem)}
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>To:</Form.Label>
      <Form.Control
        as="select"
        className="mr-sm-2"
        id="toid"
        value={this.state.dest}
        onChange={this.destHandler}
        custom
      >
        {stations.map(MakeItem)}
      </Form.Control>
    </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="noadult">
      <Form.Label>No Of Adults</Form.Label>
      <Form.Control type="text" placeholder={this.state.bookticket.noadult}  onChange={this.noadultHandler}/>
    </Form.Group>

    <Form.Group as={Col} controlId="nochild">
      <Form.Label>No of Childs</Form.Label>
      <Form.Control type="text" placeholder={this.state.bookticket.nochild} onChange={this.nochildHandler} />
    </Form.Group>
  </Form.Row>

  <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Select Class</Form.Label>
      <Form.Control as="select" value={this.state.bookticket.cname} onChange={this.cnameHandler}>
      {classes.map(MakeItem)}
      </Form.Control>
  </Form.Group>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="print ticket" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Book Ticket
  </Button>
</Form>
        )
    }
}

export default Forms;