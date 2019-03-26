import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import '../EventNewForm.css';

export class CostField extends Component {
  render() {
    if (this.props.eventType === 'tran')
      // display mode of transportation & cost
      return (
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Row>
            <Col>
              <Form.Label>Mode of transportation</Form.Label>
              <Form.Control as="select" onChange={this.props.handleChange}>
                <option disabled>Select your option</option>
                <option value={'plane'}>Plane</option>
                <option value={'train'}>Train</option>
                <option value={'automobile'}>Automobile</option>
                <option value={'bus'}>Bus</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Cost</Form.Label>
              <CurrencyInput
                className={'form-control'}
                placeholder="$0"
                onChange={this.props.handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
      );
    // else display only cost
    return (
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Cost</Form.Label>
        <CurrencyInput
          className={'form-control'}
          placeholder="$0"
          onChange={this.props.handleChange}
        />
      </Form.Group>
    );
  }
}

CostField.propTypes = {
  eventType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
