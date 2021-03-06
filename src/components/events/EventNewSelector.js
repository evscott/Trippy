import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import TranNewContainer from './event_new/tran/TranNewContainer';
import PlanNewContainer from './event_new/plan/PlanNewContainer';
import AccomNewContainer from './event_new/accom/AccomNewContainer';

export class EventNewSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventNewForm: (
        <PlanNewContainer
          begin_time={this.props.begin_time}
          end_time={this.props.end_time}
          trip_id={this.props.trip_id}
          close={this.props.close}
        />
      )
    };
    this.onChange = this.onChange.bind(this);
  }

  /***************************** Core functions *****************************/

  /**
   * Services dropdown for user to select which event they would like to add.
   * @param e the event containing the name of event to add.
   */
  onChange(e) {
    switch (e.target.value) {
      case 'plan':
        this.setState({
          EventNewForm: (
            <PlanNewContainer
              begin_time={this.props.begin_time}
              end_time={this.props.end_time}
              trip_id={this.props.trip_id}
              close={this.props.close}
            />
          )
        });
        break;
      case 'tran':
        this.setState({
          EventNewForm: (
            <TranNewContainer
              begin_time={this.props.begin_time}
              end_time={this.props.end_time}
              trip_id={this.props.trip_id}
              close={this.props.close}
            />
          )
        });
        break;
      case 'accom':
        this.setState({
          EventNewForm: (
            <AccomNewContainer
              begin_time={this.props.begin_time}
              end_time={this.props.end_time}
              trip_id={this.props.trip_id}
              close={this.props.close}
            />
          )
        });
        break;
      default:
        break;
    }
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Event type</Form.Label>
            <Form.Control as="select" onChange={this.onChange}>
              <option disabled>Select your option</option>
              <option value={'plan'}>Plan</option>
              <option value={'tran'}>Transportation</option>
              <option value={'accom'}>Accommodation</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {this.state.EventNewForm}
      </div>
    );
  }
}

EventNewSelector.propTypes = {
  trip_id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
