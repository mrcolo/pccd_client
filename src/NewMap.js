import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container , Segment, Form, Transition, Button, Header, Grid} from 'semantic-ui-react'
import { TermBox } from './newmap_components/TermBox';
import { Redirect } from 'react-router'

export class NewMap extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      visible: false,
      terms: [],
      title: "",
      description: "",
      term_code: "",
      lead: "",
      current_program: "",
      jobs: "",
      outcomes: "",
      skills: "",
      career_community: "",
      notes: "",
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
  //  Adds a class to the array of terms. 
  handleClass = (term_id, new_class) => {
    const { terms } = this.state;

    terms[term_id].classes.push({title: new_class.course, class_id: new_class._id})
    this.setState({
      terms: terms
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
    console.log(this.state.terms)
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
      notes
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
    
    await fetch('http://localhost:3000/v1/document/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    window.location.replace("/");
    
  }
  /*
    END OF UTILITY FUNCTIONS
  */
 
  render(){
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
      class_options,
      redirect
    } = this.state;
  
    return(
      <div>
       <Transition.Group animation='slide left' duration={200}>
        {this.state.visible && 
          <Container style={{paddingTop: 80, paddingBottom: 50}}>
            <Segment size="massive">
              <Header>Create New Map</Header>
            </Segment>
            
              <Form size="big">
                <Segment size="big">
                  <Form.Field>
                    <label>Title</label>
                    <Form.Input 
                      name='title'
                      value={title}
                      onChange={this.handleChange}>
                    </Form.Input>
                  </Form.Field>
                </Segment>

                <Segment size="big">
                  <Form.Field>
                    <label>Description</label>
                    <Form.Input 
                      name='description'
                      value={description}
                      onChange={this.handleChange}>
                    </Form.Input>
                  </Form.Field>
                </Segment>

                <Grid style={{paddingBottom: 10}} columns={2}>
                  <Grid.Column>
                    <Segment size="big">
                      <Form.Field>
                        <label>Outcomes</label>
                        <Form.Input 
                          name='outcomes'
                          value={outcomes}
                          onChange={this.handleChange}>
                        </Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <label>Jobs</label>
                        <Form.Input 
                          name='jobs'
                          value={jobs}
                          onChange={this.handleChange}>
                        </Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <label>Skills</label>
                        <Form.Input 
                          name='skills'
                          value={skills}
                          onChange={this.handleChange}>
                        </Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <label>Career Community</label>
                        <Form.Input 
                          name='career_community'
                          value={career_community}
                          onChange={this.handleChange}>
                        </Form.Input>
                      </Form.Field>
                    </Segment>
                  </Grid.Column>
                    <Grid.Column>
                      <Segment size="big">
                        <Form.Field>
                          <label>Current Program</label>
                          <Form.Input 
                            name='current_program'
                            value={current_program}
                            onChange={this.handleChange}>
                          </Form.Input>
                        </Form.Field>
                        <Form.Field>
                          <label>Lead</label>
                          <Form.Input 
                            name='lead'
                            value={lead}
                            onChange={this.handleChange}>
                          </Form.Input>
                        </Form.Field>
                        <Form.Field>
                          <label>Term Code</label>
                          <Form.Input 
                            name='term_code'
                            value={term_code}
                            onChange={this.handleChange}>
                          </Form.Input>
                        </Form.Field>
                        <Form.Field>
                          <label>Notes</label>
                          <Form.Input 
                            name='notes'
                            value={notes}
                            onChange={this.handleChange}>
                          </Form.Input>
                        </Form.Field>
                      </Segment>
                    </Grid.Column>   
                </Grid>
              
                <Segment size="big">
                    <Header>Planner</Header>
                    <div style={{paddingBottom: 10}}>
                      <Button icon="plus" onClick={this.handleTerm} color="green" fluid size="big">Add Term</Button>
                    </div>
                    <Grid style={{padding: 10}} columns={terms.length}>
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
                          />
                        </div>)
                      }
                    </Grid>
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

