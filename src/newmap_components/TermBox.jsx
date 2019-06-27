import React from 'react'
import { Table, Modal, Button, Input, List, Icon, Divider, Header } from 'semantic-ui-react'
import { ClassBox } from './ClassBox'
import InlineEdit from 'react-edit-inline';

export class TermBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      class_options: [],
      modal_on: false
    }
  }
  
  //  Autocompletes a class based on form input. 
  fetchClasses = async (e, {value}) => {
    if(value !== ""){
      const rawResponse = await fetch("http://localhost:3000/v1/class/autocomplete?a=" + value.toUpperCase())
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
    const {handleClass, term_count} = this.props 
    handleClass(term_count, this_class)
    this.setState({modal_on: false}) 
  }

  render () {
    const {term_count, current_term, handleRemoveClass, handleRemoveTerm} = this.props
    const {class_options, modal_on} = this.state
    return (
      <Table centered celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='10'>
              
              <InlineEdit
                style={{paddingLeft: 40, paddingRight: 40}}
                text={current_term.title}
                paramName="new_name"
                change={this.dataChanged}
              />
              <Divider/>
              <Button.Group fluid>
              <Button onClick={ () => {this.setState({modal_on: true})}} color="green" icon>
                  <Icon name='plus' />
                </Button>

              <Modal 
                open={modal_on} 
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
              <Button onClick={() => {handleRemoveTerm(term_count)}} color="red" floated="right" icon>
                <Icon name='erase' />
              </Button>
              </Button.Group>
            </Table.HeaderCell>
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
              />
            )}
        </Table.Body>
      </Table>
    )
  }
}


