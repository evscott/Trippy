import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import './EventNewForm.css';
import { ToggleUseDates } from './fields/ToggleUseDates';
import { DateField } from './fields/DateField';
import { LocationField } from './fields/LocationField';
import { ModeOfTranField } from './fields/ModeOfTranField';
import { CostField } from './fields/CostField';
import { DescriptionField } from './fields/DescriptionField';
import { PriorityButton } from '../../global/PriorityButton';

export class EventNewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      useDates: true,
      eventType: props.eventType,
      ...props.event
    };
    this.toggleUseDates = this.toggleUseDates.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePriorityChange = this.togglePriorityChange.bind(this);
  }

  /***************************** Core functions *****************************/

  /**
   * Toggles the use of dates -- this function only is only called upon by
   * plan events.
   */
  toggleUseDates() {
    this.setState({
      useDates: !this.state.useDates
    });
  }

  /**
   * Handles the change of an event field.
   * @param t the target name of an event field to change.
   * @param val the value of an event field to change.
   */
  handleChange(t, val) {
    this.setState({ [t]: val });
  }

  /**
   * Submits an event to be added and closes the modal.
   */
  handleSubmit() {
    this.props.addEvent(this.props.getEvent(this.state));
    this.props.close();
  }

  togglePriorityChange() {
    let priority = this.state.priority;
    priority = (priority + 1) % 3;
    this.handleChange('priority', priority);
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        {/*Create event form*/}
        <div>
          <Form>
            <ToggleUseDates
              eventType={this.state.eventType}
              toggleUseDates={this.toggleUseDates}
            />
            <DateField
              begin_time={this.state.begin_time}
              end_time={this.state.end_time}
              useDates={this.state.useDates}
              handleChange={this.handleChange}
            />
            <LocationField
              eventType={this.state.eventType}
              handleChange={this.handleChange}
            />
            <Form.Group>
              <Form.Row>
                <ModeOfTranField
                  eventType={this.state.eventType}
                  handleChange={this.handleChange}
                />
                <CostField
                  eventType={this.state.eventType}
                  handleChange={this.handleChange}
                />
              </Form.Row>
            </Form.Group>
            <DescriptionField
              eventType={this.state.eventType}
              useDates={this.state.useDates}
              handleChange={this.handleChange}
            />
          </Form>
        </div>
        {/*Buttons*/}
        <PriorityButton
          handleChange={this.togglePriorityChange}
          priority={this.state.priority}
        />
        <Button
          className={'float-right submit-btn'}
          variant="primary"
          size="sm"
          onClick={this.handleSubmit}
        >
          <b>Submit</b>
        </Button>
      </div>
    );
  }
}

EventNewForm.propTypes = {
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  eventType: PropTypes.string.isRequired,
  addEvent: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
