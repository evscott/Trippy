import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  usdFormatter,
  convertToNumber
} from '../../../../shared/currencyFormatter';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventInfoForm } from '../EventInfoForm';

export default class PlanInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(props.plan);
    this.getPlan = this.getPlan.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a plan event from props.
   * @param plan
   * @returns {{method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState(plan) {
    return {
      loc: {
        name: 'loc',
        type: 'Location',
        value: plan.loc ? plan.loc : 'unspecified',
        editMode: false
      },
      begin_time: {
        name: 'begin_time',
        type: 'Begins',
        value: plan.begin_time !== null ? plan.begin_time.toString() : '',
        editMode: false
      },
      end_time: {
        name: 'end_time',
        type: 'Ends',
        value: plan.end_time !== null ? plan.end_time.toString() : '',
        editMode: false
      },
      cost: {
        name: 'cost',
        type: 'Cost',
        value: plan.cost ? usdFormatter.format(plan.cost) : 'unspecified',
        editMode: false
      },
      dscript: {
        name: 'dscript',
        type: 'Description',
        value: plan.dscript ? plan.dscript : 'unspecified',
        editMode: false
      },
      priority: {
        name: 'priority',
        type: 'Priority',
        value: plan.priority,
        editMode: false
      }
    };
  }

  /**
   * Gets the plan object formatted for MySql and Redux.
   * @param plan object to get.
   * @returns {{e_id: number, trip_id: *, loc: *, begin_time: string, end_time: string, cost: (string|*), dscript: *, completed: number, priority: number}}
   */
  getPlan(plan) {
    return {
      e_id: this.props.plan.e_id,
      trip_id: this.props.plan.trip_id,
      loc: plan.loc.value,
      begin_time: formatDateForMySql(plan.begin_time.value),
      end_time: formatDateForMySql(plan.end_time.value),
      cost: convertToNumber(plan.cost.value),
      dscript: plan.dscript.value,
      completed: 0,
      priority: plan.priority.value
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <EventInfoForm
        state={this.getState(this.props.plan)}
        trip_id={this.props.plan.trip_id}
        e_id={this.props.plan.e_id}
        getEvent={this.getPlan}
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
        close={this.props.close}
      />
    );
  }
}

PlanInfo.propTypes = {
  plan: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired
};
