import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container , Segment, Form, Transition, Button, Header, Table} from 'semantic-ui-react'
import { TermBox } from './newmap_components/TermBox';
import {EditorInstance} from './utils/EditorInstance'
import InlineEdit from './utils/react-edit-inline/index.jsx';
import { computeUnits } from './utils/utilityFunctions'
import { CRUD_DOCUMENTS} from './utils/apiEndpoints'

export class NewMap extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      visible: false,
      terms: [],
      title: "New Map",
      description: "",
      term_code: "",
      lead: "",
      current_program: "",
      jobs: "",
      outcomes: "",
      skills: "",
      career_community: "",
      notes: "",
      tot_units: 0
    }
  }
  /*
    REACT METHODS
  */
  componentDidMount() {
    setTimeout(() => {this.handleVisibility()}, 100)
  }
  /*
    END OF REACT METHODS
  */

  /*
    HANDLERS FOR CLASSBOX AND TERMBOX
  */

  handleDescription = (data) => {
    this.setState({
      description: data
    })
  }

  handleCurrentProgram = (data) => {
    this.setState({
      current_program: data
    })
  }

  handleOutcomes = (data) => {
    this.setState({
      outcomes: data
    })
  }

  handleJobs = (data) => {
    this.setState({
      jobs: data
    })
  }

  handleSkills = (data) => {
    this.setState({
      skills: data
    })
  }

  handleNotes = (data) => {
    this.setState({
      notes: data
    })
  }
  
  //  Adds a class to the array of terms. 
  handleClass = (term_id, new_class) => {
    const { terms } = this.state;

    terms[term_id].classes.push({
      title: new_class.course, 
      description: new_class.title, 
      class_id: new_class._id, 
      units: new_class.max_units,
      notes: ""
    })
    this.setState({
      terms: terms,
      tot_units: computeUnits(terms)
    })
  }
  //  Removes a class from a specific term. 
  handleRemoveClass = (term_id, class_id) => {
    const {terms} = this.state;

    terms[term_id].classes.splice(class_id, 1)
    this.setState({terms: terms})
  }
  //  Handle Adding a term
  handleTerm = () => {
    const {terms} = this.state;

    const title = "New Term"
      
    terms.push({title: title, classes: []})
    this.setState({
      terms: terms
    })
  }
  //  Handle Update a term
  handleUpdateTerm = (term_count, term_newname) => {
    const {terms} = this.state;

    terms[term_count].title = term_newname
    this.setState({
      terms: terms
    })
  }
   //  Removes a term. 
   handleRemoveTerm = (term_id) => {
    const {terms} = this.state;

    terms.splice(term_id, 1 )
    this.setState({terms: terms})
  }
   /*
    END OF HANDLERS FOR CLASSBOX AND TERMBOX
  */
  /*
    UTILITY FUNCTIONS
  */
  titleChanged = ({title}) => {
    this.setState({title: title})
  }
  // Turns visibility on for initial animation
  handleVisibility = () => {this.setState({visible: true})}
  //  Handle Form Field Change
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  //  Submit a Map to the server. 
  handleSubmit = async () => {
    const {
      terms, 
      title,
      description, 
      skills, 
      outcomes, 
      jobs, 
      lead, 
      term_code, 
      career_community, 
      current_program, 
      notes,
    } = this.state;
    
    const body = {
      title: title,
      description: description, 
      skills: skills,
      outcomes: outcomes,
      jobs: jobs,
      lead: lead,
      term_code: term_code,
      career_community: career_community, 
      current_program: current_program,
      terms: terms,
      notes: notes,
    }
    
    await fetch(CRUD_DOCUMENTS, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    window.location.replace("/");
  }

  handleEditNote = (term_count, class_count, new_notes) => {
    const { terms } = this.state;
    terms[term_count].classes[class_count].notes = new_notes
    console.log(terms)
    this.setState({
      terms: terms
    })
  }
  /*
    END OF UTILITY FUNCTIONS
  */
 
  render(){
    const {
      terms, 
      title, 
      lead, 
      term_code, 
      career_community, 
      current_program,  
      class_options,
      tot_units
    } = this.state;
  
    return(
      <div>
       <Transition.Group animation='slide left' duration={200}>
        {this.state.visible && 
          <Container fluid style={{paddingTop: 80, paddingBottom: 50, paddingLeft: 8, paddingRight: 8}}>
            <Form size="massive"> 
            <Segment size="massive">
              <InlineEdit
                style={{fontSize: 30}}
                text={title}
                paramName="title"
                change={this.titleChanged}
              />
            </Segment>
            </Form>
            <Form style={{paddingTop: 15}}size="big">
              <Segment size="big">
                        <Form.Field>
                          <Header>Current Program</Header>
                          <Form.Input 
                            name='current_program'
                            value={current_program}
                            onChange={this.handleChange}>
                          </Form.Input>
                        </Form.Field>
                    </Segment>
                <Segment size="big">
                  <Form.Field>
                    <Header>Description</Header>
                    <EditorInstance controller={this.handleDescription} />
                  </Form.Field>
                </Segment>

                <Segment size="big">
                  <Form.Field>
                    <Header>Outcomes</Header>
                    <EditorInstance controller={this.handleOutcomes}/>
                  </Form.Field>
                </Segment>

                <Segment size="big">
                  <Form.Field>
                    <Header>Jobs</Header>
                    <EditorInstance controller={this.handleJobs}/>
                  </Form.Field>
                </Segment>

                <Segment size="big">
                  <Form.Field>
                    <Header>Skills</Header>
                    <EditorInstance controller={this.handleSkills}/>
                  </Form.Field>
                </Segment>
                    <Segment size="big">
                      <Form.Field>
                        <Header>Career Community</Header>
                        <Form.Input 
                          name='career_community'
                          value={career_community}
                          onChange={this.handleChange}>
                        </Form.Input>
                      </Form.Field>
                    </Segment>
                    <Segment size="big">
                        <Form.Field>
                          <Header>Lead</Header>
                          <Form.Input 
                            name='lead'
                            value={lead}
                            onChange={this.handleChange}>
                          </Form.Input>
                        </Form.Field>
                    </Segment>
                    <Segment size="big">
                        <Form.Field>
                          <Header>Term Code</Header>
                          <Form.Input 
                            name='term_code'
                            value={term_code}
                            onChange={this.handleChange}>
                          </Form.Input>
                        </Form.Field>
                    </Segment>
              
                <Segment size="big">
                    <Header>Planner</Header>
                    <div style={{paddingBottom: 10}}>
                      <Button icon="plus" onClick={this.handleTerm} color="green" fluid size="big">Add Term</Button>
                    </div>
                    <Table>
                      {
                        terms.length !== 0 && terms.map( ( current_term, term_count ) => <div style={{padding: 10}}> 
                          <TermBox 
                            class_options={class_options} 
                            term_count={term_count} 
                            current_term={current_term}
                            terms={terms} 
                            handleClass={this.handleClass}
                            handleRemoveClass={this.handleRemoveClass}
                            handleRemoveTerm={this.handleRemoveTerm}
                            handleUpdateTerm={this.handleUpdateTerm}
                            handleEditNote={this.handleEditNote}
                          />
                        </div>)
                      }
                      </Table>
                      <div style={{paddingBottom: 30}}>
                        <Header style={{fontSize: 25}} floated="right">Total Program Units: {tot_units}</Header>
                      </div>
                </Segment>
                
                <Segment size="big">
                  <Form.Field>
                    <Header>Author Notes</Header>
                    <EditorInstance controller={this.handleNotes}/>
                  </Form.Field>
                </Segment>

                <Button onClick={this.handleSubmit } size="big" color="yellow" fluid type='submit'>Create Map</Button>
              </Form>
          </Container>
       }
        </Transition.Group>
        </div>
    )
  }
}

