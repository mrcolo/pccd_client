import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import InlineEdit from '../utils/react-edit-inline/index.jsx';



export class ClassBox extends React.Component {
  titleChanged = ({new_note}) => {
    const {term_count, class_count, handleEditNote} = this.props;
    handleEditNote(term_count, class_count, new_note)
  }

  render () {

    const {term_count, class_count, this_class, handleRemoveClass, handleEditNote} = this.props
    
    return (
    <Table.Row>
      <Table.Cell colSpan="2">{this_class.title}</Table.Cell>
      <Table.Cell colSpan="2">{this_class.description}</Table.Cell>
      <Table.Cell colSpan="2">{this_class.units}</Table.Cell>
      <Table.Cell colSpan="3">
        <InlineEdit
          text={this_class.notes.length === 0 ? "Write Something Here. " : this_class.notes }
          change={this.titleChanged}
          paramName="new_note"
        />
      </Table.Cell>
      <Table.Cell colSpan="1">
        <Button fluid onClick={() => {handleRemoveClass(term_count, class_count)}} color="red" size="medium">
          Delete
        </Button>
      </Table.Cell>
      
    </Table.Row>)
  }
}


