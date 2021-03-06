import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  usdFormatter,
  convertToNumber
} from '../../../../shared/currencyFormatter';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventInfoForm } from '../EventInfoForm';

export default class TranInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.tran);
    this.getTran = this.getTran.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a tran event from props.
   * @param tran
   * @returns {{method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState(tran) {
    return {
      method: {
        name: 'method',
        type: 'Method',
        value: tran.method ? tran.method : 'unspecified',
        editMode: false
      },
      loc_begin: {
        name: 'loc_begin',
        type: 'Departing from',
        value: tran.loc ? tran.loc : 'unspecified',
        editMode: false
      },
      loc_end: {
        name: 'loc_end',
        type: 'Arriving to',
        value: tran.loc_end ? tran.loc_end : 'unspecified',
        editMode: false
      },
      begin_time: {
        name: 'begin_time',
        type: 'Begins',
        value: tran.begin_time.toString(),
        editMode: false
      },
      end_time: {
        name: 'end_time',
        type: 'Ends',
        value: tran.end_time.toString(),
        editMode: false
      },
      cost: {
        name: 'cost',
        type: 'Cost',
        value: tran.cost ? usdFormatter.format(tran.cost) : 'unspecified',
        editMode: false
      },
      dscript: {
        name: 'dscript',
        type: 'Description',
        value: tran.dscript ? tran.dscript : 'unspecified',
        editMode: false
      },
      priority: {
        name: 'priority',
        type: 'Priority',
        value: tran.priority,
        editMode: false
      }
    };
  }

  /**
   * Gets the tran object formatted for MySql and Redux.
   * @param tran object to get.
   * @returns {{e_id: number, trip_id: *, method: *, loc: (string|*), loc_end: *, begin_time: string, end_time: string, cost: (string|*), dscript: *, completed: number, priority: number}}
   */
  getTran(tran) {
    return {
      e_id: this.props.tran.e_id,
      trip_id: this.props.tran.trip_id,
      method: tran.method.value,
      loc: tran.loc_begin.value,
      loc_end: tran.loc_end.value,
      begin_time: formatDateForMySql(tran.begin_time.value),
      end_time: formatDateForMySql(tran.end_time.value),
      cost: convertToNumber(tran.cost.value),
      dscript: tran.dscript.value,
      completed: 0,
      priority: tran.priority.value
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <EventInfoForm
        state={this.getState(this.props.tran)}
        trip_id={this.props.tran.trip_id}
        e_id={this.props.tran.e_id}
        getEvent={this.getTran}
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
        close={this.props.close}
      />
    );
  }
}

TranInfo.propTypes = {
  tran: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired
};
