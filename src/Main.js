import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container, Header, Button, Segment, Loader , Transition, Modal, Table, Grid} from 'semantic-ui-react'
import Link from 'react-router-dom/Link';
 

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      documents: [],
      visibility: false
    }
  this.handleDocuments()
  }
 
  componentDidMount(){
    setTimeout(() => {this.handleVisibility()}, 100)
    
  }
  
  handleDocuments = async () => {
    const documents = await fetch("http://localhost:3000/v1/document/")
    const json = await documents.json()
    console.log(json)
    this.setState({
      documents: json
    })
  }
  handleVisibility = () => {this.setState({visible: true})}

  render(){
    const { documents } = this.state
    return(
      <div className="back">
         <Transition.Group animation='slide right' duration={200}>
        {this.state.visible && 
        <Container style={{paddingTop: 80}}>
          <Link 
          to={{
            pathname: '/newmap',
            state: { prev: true },
          }}>
            <Button size="big" color="yellow" fluid>New Map</Button>
          </Link>
          <Header style={{fontSize: 50}}>Seeds</Header>
            {documents.length !== 0 && documents.map(document => 
            <Segment>
              <Header>{document.title.toUpperCase()}</Header>
              <Modal trigger={<Button color="blue" >Open</Button>}>
                <Modal.Header>{document.title.toUpperCase()}</Modal.Header>
                <Modal.Content>
                  <p><Header>Description</Header> {document.description}</p>
                </Modal.Content>
                <Modal.Content>
                  <p><Header>Program Outcomes</Header> {document.outcomes}</p>
                </Modal.Content>
                <Modal.Content>
                  <p><Header>Possible Jobs/Career</Header> {document.jobs}</p>
                </Modal.Content>
                <Modal.Content>
                  <p><Header>Transferable Skills</Header> {document.skills}</p>
                </Modal.Content>
                <Modal.Content>
                <Header>Prospective Plan</Header>
                {document.terms && 
                  <Grid style={{padding: 10}} columns={document.terms.length}>
                  {
                    document.terms.length !== 0 && document.terms.map( (term) => <div style={{padding: 10}}>
                      <Table centered celled striped>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell colSpan='8'>{term.title}</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {
                          term.classes.map((cl) => 
                            <Table.Row>
                              <Table.Cell colSpan='8'>
                              {cl.title}
                              </Table.Cell>
                            </Table.Row>
                          )}
                        </Table.Body>
                      </Table>
                    </div>)
                  }
                  </Grid>
                }
                </Modal.Content>
                <Modal.Content>
                  <p><Header>Notes</Header> {document.notes}</p>
                </Modal.Content>
              </Modal>
            </Segment>
            )}

            {documents.length === 0 &&
            <div style={{padding: 50}}><Loader style={{paddingTop: 80}} active inline='centered' /></div>}
        </Container>
        }
        </Transition.Group>
      </div>
    )
  }
}

export default Main;
