import React from 'react'
import { Table, Modal, Button, Input, List, Icon, Divider, Header, Grid } from 'semantic-ui-react'
import { ClassBox } from './ClassBox'
import InlineEdit from '../utils/react-edit-inline/index.jsx';
import {AUTOCOMPLETE_CLASS, CRUD_CLASS} from '../utils/apiEndpoints'

export class TermBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      class_options: [],
      normal_class_modal_on: false,
      custom_class_modal_on: false,
      custom_title: "",
      custom_course: "",
      custom_units: 0,
    }
  }
  
  //  Autocompletes a class based on form input. 
  fetchClasses = async (e, {value}) => {
    if(value !== ""){
      const rawResponse = await fetch(AUTOCOMPLETE_CLASS + "?a=" + value.toUpperCase())
      const json = await rawResponse.json()
      this.setState({
        class_options: json
      })
    }
    else{
      this.setState({
        class_options: []
      })
    } 
  } 

  dataChanged = ({new_name}) => {
    const {handleUpdateTerm, term_count} = this.props;

    handleUpdateTerm(term_count, new_name)
  }

  addClass = (this_class) => {
    console.log(this_class)
    const {handleClass, term_count} = this.props 
    handleClass(term_count, this_class)
    this.setState({normal_class_modal_on: false, class_options: []}) 
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleAddCustomClass = async () => {
    const {custom_title, custom_units, custom_course} = this.state;
    const body = {
      title: custom_title,
      course: custom_course,
      max_units: custom_units, 
    }
    const rawResponse = await fetch(CRUD_CLASS , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    console.log(await rawResponse.json())

    this.setState({
      custom_class_modal_on: false,
      custom_title: "",
      custom_units: 0
    })
  }

  render () {
    const {term_count, current_term, handleRemoveClass, handleRemoveTerm, handleEditNote} = this.props
    const {class_options, normal_class_modal_on, custom_class_modal_on, custom_title, custom_units, custom_course} = this.state
    return (
      <div>
      <Table  celled >
        <Table.Header>    
          <Table.Row>
            <Table.HeaderCell colSpan="10">
              <InlineEdit
                  text={current_term.title}
                  paramName="new_name"
                  change={this.dataChanged} 
                />
              <Divider/>
              <Button.Group style={{paddingLeft: 50, paddingRight: 50}} fluid>
                <Button onClick={ () => {this.setState({normal_class_modal_on: true})}} color="green">
                    Add Class
                </Button>    
                <Button onClick={ () => {this.setState({custom_class_modal_on: true})}} color="blue">
                    Add Custom Class
                </Button> 
                <Button onClick={() => {handleRemoveTerm(term_count)}} color="red" floated="right">
                  Delete Term
                </Button>
              </Button.Group>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Course</Table.HeaderCell>
            <Table.HeaderCell colSpan="2">Description</Table.HeaderCell>
            <Table.HeaderCell colSpan="2">Units</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Notes</Table.HeaderCell>
            <Table.HeaderCell colSpan="1"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {
            current_term.classes.map((this_class, class_count) => 
              <ClassBox 
                term_count={term_count} 
                class_count={class_count} 
                this_class={this_class} 
                handleRemoveClass={handleRemoveClass}
                handleEditNote={handleEditNote}
              />
            )}
        </Table.Body>      
      </Table>
      
      <Modal 
        open={normal_class_modal_on} 
        centered={false}
      >
        <Modal.Header>Select a Class</Modal.Header>
        <Input
          style={{padding: 20}}
          fluid
          onChange={this.fetchClasses}
        />
        <Divider/>
        <Modal.Content scrolling>
          {
            class_options.length !== 0 ? <List selection verticalAlign='middle'>
              {
                class_options.map(this_class => <List.Item onClick={() => {this.addClass(this_class)}}> 
                  <List.Content>
                    <List.Header>{this_class.course}</List.Header>
                  </List.Content>
                </List.Item>)
              }
            </List> : <Header>Enter a class name to start. </Header>
          }
        </Modal.Content>
      </Modal> 


      <Modal 
      open={custom_class_modal_on} 
      centered={false}
    >
      <Modal.Header>Add a Custom Class</Modal.Header>
      <Header>Title</Header>
      <Input
        style={{padding: 20}}
        fluid
        name='custom_title'
        value={custom_title}
        onChange={this.handleChange}
      />
      <Header>Course</Header>
      <Input
        style={{padding: 20}}
        fluid
        name='custom_course'
        value={custom_course}
        onChange={this.handleChange}   
      />
      <Header>Units</Header>
      <Input
        style={{padding: 20}}
        fluid
        name='custom_units'
        value={custom_units}
        onChange={this.handleChange}   
      />
      <Divider/>
      <Button onClick={this.handleAddCustomClass} size="big" fluid color="green">Confirm</Button>
    </Modal> 
    </div>
    )
  }
}


