import React from 'react'
import { Table } from 'semantic-ui-react'

export class ClassRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            title: "", 
            description: "", 
            units: "", 
            notes: "" 
        }
    }

    handleBegin = async () => {
        const { id, incrementUnits } = this.props
        const rawResponse = await fetch('http://localhost:3000/v1/class/' + id, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
        const json = await rawResponse.json();
        await incrementUnits(json.max_units)
        this.setState({
            title: json.course,
            description: json.title,
            units: json.max_units,  
        })
    }

    componentDidMount() {
        this.handleBegin()
    }

    render () {
        const {title, description, units, notes} = this.state;
        return (
            <Table.Row>
                <Table.Cell colSpan="2">{title}</Table.Cell>
                <Table.Cell colSpan="3">{description}</Table.Cell>
                <Table.Cell colSpan="2">{units}</Table.Cell>
                <Table.Cell colSpan="3">
                    {notes}
                </Table.Cell>
                
            </Table.Row>
        )
    }
}