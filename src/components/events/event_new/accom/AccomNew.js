import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertToNumber } from '../../../../shared/currencyFormatter';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventNewForm } from '../EventNewForm';

export default class AccomNew extends Component {
  constructor(props) {
    super(props);
    this.getAccom = this.getAccom.bind(this);
    this.getState = this.getState.bind(this);
    this.state = this.getState();
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a tran event from props.
   * @param tran
   * @returns {{method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState() {
    return {
      loc: null,
      begin_time: this.props.begin_time ? this.props.begin_time : null,
      end_time: this.props.end_time ? this.props.end_time : null,
      cost: null,
      dscript: null
    };
  }

  /**
   * TODO
   * @param tran
   * @returns {{method: *, loc: *, loc_end: *, begin_time, end_time, cost: (string|*), dscript: *, completed: number, priority: number}}
   */
  getAccom(accom) {
    return {
      loc: accom.loc_begin,
      begin_time: formatDateForMySql(accom.begin_time),
      end_time: formatDateForMySql(accom.end_time),
      cost: accom.cost,
      dscript: accom.dscript,
      completed: 0,
      priority: 0
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <EventNewForm
          event={this.state}
          getEvent={this.getAccom}
          eventType={'accom'}
          begin_time={this.props.begin_time}
          end_time={this.props.end_time}
          addEvent={this.props.addAccom}
        />
      </div>
    );
  }
}

AccomNew.propTypes = {
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
