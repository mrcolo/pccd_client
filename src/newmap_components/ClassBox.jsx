import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
export class ClassBox extends React.Component {
  
  render () {

    const {term_count, class_count, this_class, handleRemoveClass} = this.props
    
    return (
    <Table.Row>
      <Table.Cell colSpan='8'>{this_class.title}
        <Button onClick={() => {handleRemoveClass(term_count, class_count)}} color="white" floated="right" size="mini" icon>
           <Icon name='erase' />
        </Button>
      </Table.Cell>
    </Table.Row>)
  }
}


