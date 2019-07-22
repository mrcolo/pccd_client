import React from 'react'
import { Table, Header } from 'semantic-ui-react'
import { ClassRow } from './ClassRow'

export class TermTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
           total_units: 0,
        }
    }

    incrementUnits = async (increment) => {
        const {total_units} = this.state;
        this.setState({
            total_units: total_units + increment
        })
    }
    render () {
        const { term } = this.props;
        const { total_units } = this.state;
        return (
            <Table>
                <Table.Header>    
                <Table.Row>
                    <Table.HeaderCell colSpan="10">
                    <Header>{term.title}</Header>
                    </Table.HeaderCell>
                </Table.Row>         
                <Table.Row>
                    <Table.HeaderCell colSpan="2">Course</Table.HeaderCell>
                    <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
                    <Table.HeaderCell colSpan="2">Units</Table.HeaderCell>
                    <Table.HeaderCell colSpan="3">Notes</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                    term.classes.map((this_class, class_count) => 
                        <ClassRow
                        id={this_class.class_id}
                        incrementUnits={this.incrementUnits}
                        />
                    )}
                </Table.Body>
                <Header style={{padding: 10}} floated="right"> Total Units: {total_units}</Header>
          </Table>
        )
    }
}