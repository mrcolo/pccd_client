import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container, Header, Loader , Transition, Modal, Card, Divider, Label, Input, Button} from 'semantic-ui-react'
import { TermTable } from './main_components/TermTable'
import renderHTML from 'react-render-html';
import Link from 'react-router-dom/Link';

import {GET_DOCUMENTS, CRUD_DOCUMENTS, AUTOCOMPLETE_DOCUMENTS} from './utils/apiEndpoints'

const colorStates = {
  approved:'blue',
  draft: 'yellow',
  posted: 'green',
}

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      documents: [],
      page: 1,
      visibility: false,
      autoscroll: 0,
      documentsLoading: false,
      searchCategory: -1,
      isSearching: false
    }
    this.handleDocuments(this.state.documents, this.state.page)
  }
 
  componentDidMount(){
    
    window.addEventListener('scroll', this.onScroll, false);
    
    setTimeout(() => {this.handleVisibility()}, 100)
  }

  componentWillUnmount() {
    
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const {documents} = this.state;

    if (
      ( - window.innerHeight + window.scrollY) >= (document.body.offsetHeight) &&
      documents.length
    ) {
      this.handleDocuments()
    }
  }

  handleScroll = (initial) => {
    if (window.scrollY > initial){
      
      //this.handleDocuments()
      if(this.state.autoscroll > 5){
        this.handleDocuments()
        this.setState({
          autoscroll: 0
        })
      }
      else {
        this.setState({
          autoscroll: this.state.autoscroll + 1
        })
        console.log(this.state.autoscroll)
      }
      
    }
    this.initial = window.scrollY
    
  }
  
  handleDocuments = async () => {
    const {page, documents} = this.state
    this.setState({
      documentsLoading: true
    })

    const rawResponse = await fetch(GET_DOCUMENTS + page )
    const json = await rawResponse.json()
    if(json.length !== 0){
      this.setState({
        documents: documents.concat(json),
        page: page + 1,
        documentsLoading: false
      })
    }
  }

  handleRemove = async (id) => {
    await fetch(CRUD_DOCUMENTS + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    window.location.replace("/");
  }

  handleVisibility = () => {this.setState({visible: true})}

  handleChangeSearchQuery = async (e, {value}) => {
    if(value.length !== 0){
      const {searchCategory} = this.state;
      const url = AUTOCOMPLETE_DOCUMENTS + '?a=' + value + '&c=' + searchCategory
      const rawResponse = await fetch(url)
      console.log(url)
      const json = await rawResponse.json();
      console.log(json)
      this.setState({
        documents: json,
        isSearching: true
      })
    }
  }

  handleChangeSearchCategory = (search_cat) => {
    this.setState({searchCategory: search_cat})
  }

  resetDocuments = async () => {
    this.setState({
      page: 1,
      isSearching: false,
      searchCategory: -1
    })
    this.setState({
      documentsLoading: true
    })
    const rawResponse = await fetch(CRUD_DOCUMENTS + 1 )
    const json = await rawResponse.json()
    if(json.length !== 0){
      this.setState({
        documents: json,
        documentsLoading: false
      })
    }
  }

  render(){
    const { documents, documentsLoading, searchCategory, isSearching } = this.state

    return(
      <div onScroll={this.handleScroll} className="back">
         <Transition.Group animation='slide right' duration={200}>
        {this.state.visible && 
        <Container fluid style={{paddingTop: 80, paddingLeft: 30, paddingRight: 30}}>
          <Header style={{fontSize: 20}}>Maps</Header>
          <Divider/>
          <div style={{paddingBottom: 15 }}>
              <Button.Group size="big" color="yellow" fluid>
                <Button onClick={() => {this.handleChangeSearchCategory(0)}} active={searchCategory === 0}>Title</Button>
                <Button onClick={() => {this.handleChangeSearchCategory(1)}} active={searchCategory === 1}>Current Program</Button>
                <Button onClick={() => {this.handleChangeSearchCategory(2)}} active={searchCategory === 2}>Career Community</Button>
              </Button.Group>
              {isSearching && <div style={{paddingTop: 10}}><Button onClick={this.resetDocuments} size= "big" color="red" fluid>Clear Search Results</Button></div>}
            </div>

            <label>Search</label>
            <Input
              disabled={searchCategory === -1}
              fluid
              onChange={this.handleChangeSearchQuery}
              style={{paddingBottom: 15, paddingTop: 10}}
            />
            
            <Card.Group >
              {documents.length !== 0 && documents.map(document => 
               
                <Modal trigger={
                  <Card raised={false} fluid>
                    <Card.Content>
                    <Card.Header style={{fontSize: 25, paddingBottom: 20}}>{document.title}</Card.Header>
                    <Label size="big" as='a' color={colorStates[document.state]}>
                      {document.state}
                    </Label>
                    </Card.Content>
                  </Card>
                }>
                  <Modal.Header>{document.title}</Modal.Header>
                  <Modal.Content>
                    <p><Header>Description</Header> {renderHTML(document.description ? document.description : "")}</p>
                  </Modal.Content>
                  <Modal.Content>
                    <p><Header>Program Outcomes</Header> {renderHTML(document.outcomes ? document.outcomes : "")}</p>
                  </Modal.Content>
                  <Modal.Content>
                    <p><Header>Possible Jobs/Career</Header> {renderHTML(document.jobs ? document.jobs : "")}</p>
                  </Modal.Content>
                  <Modal.Content>
                    <p><Header>Transferable Skills</Header> {renderHTML(document.skills ? document.skills : "")}</p>
                  </Modal.Content>
                  <Modal.Content>
                  <Header>Prospective Plan</Header>
                  {document.terms && 
                      document.terms.length !== 0 && document.terms.map( (term) => 
                      <div style={{padding: 10}}>
                        <TermTable
                          term={term}
                        />
                      </div>)
                    }
                  </Modal.Content>
                  <Modal.Content>
                    <p><Header>Author Notes</Header> {document.notes}</p>
                  </Modal.Content>
                  <Modal.Content>
                    <Divider/>
                    <Link 
                      to={{
                        pathname: '/editmap/' + document.id,
                        state: { prev: true },
                      }} >
                    <Button color="yellow">Edit Map
                    </Button>
                    </Link>
                    <Button color="blue" onClick={this.printDocument}>Export PDF</Button>
                    <Button onClick={() => {this.handleRemove(document.id)}} color="red">Remove Map</Button>
                  
                  </Modal.Content>
                </Modal>
              )}
            </Card.Group>
            {documentsLoading &&
            <div style={{padding: 50}}><Loader style={{paddingTop: 80}} active inline='centered' /></div>}
        </Container>
        }
        </Transition.Group>
      </div>
    )
  }
}

export default Main;
