/**
 * Gets all events associated with a trip in the form of an array, and assigns
 * each a property called "event_type", which has a value of "plan", "accom",
 * or "trans", depending on the event's type.
 * @param state the state of the redux store.
 * @param tripId the id of the trip to get events from.
 * @returns {any[]} the array of events associated with the trip.
 */
export function getTripEvents(state, tripId) {
  let plans = state.plans.plans[tripId];
  let accoms = state.accoms.accoms[tripId];
  let trans = state.trans.trans[tripId];

  // Get all the values from the dictionaries (just get the raw event objects
  // without worrying about their event ids). It only gets them if the section
  // is not null.
  if (plans != null) plans = Object.values(plans);
  else plans = [];
  if (accoms != null) accoms = Object.values(accoms);
  else accoms = [];
  if (trans != null) trans = Object.values(trans);
  else trans = [];

  // This does a deeper copy of the events than before, and it adds an extra
  // property to the event types' names.
  return [
    ...plans.map((plan) => ({
      ...plan,
      event_type: 'plan'
    })),
    ...accoms.map((accom) => ({
      ...accom,
      event_type: 'accom'
    })),
    ...trans.map((trans) => ({
      ...trans,
      event_type: 'trans'
    }))
  ];
}

/**
 * Sorts the events.
 * @param events array of events, each with a trip_start
 * and a trip_end time.
 */
function sortEvents(events) {
  events.sort((a, b) => {
    if (b.begin_time === null) return -1; // If null, b goes at end
    if (a.begin_time === null) return 1; // If null, a goes at end

    if (a.begin_time < b.begin_time) return -1;
    if (a.begin_time > b.begin_time) return 1;
    if (a.end_time < b.end_time) return -1;
    if (a.end_time > b.end_time) return 1;
    return 0;
  });
}

/**
 * This gets all of the current events and puts them in a sorted array.
 * It also gets the upcoming events in a sorted array. Each event has
 * an associated begin_time and end_time property.
 * Access the current events by using the current property.
 * @param state the state of the Redux store
 * @param tripId the id of the trip to get events for
 * @returns {{current: Array, upcoming: Array}} the first is an array of
 * current events, the second is an array of upcoming events.
 */
export function getActiveEvents(state, tripId) {
  let currEvents = [];
  let upcomingEvents = [];

  let plans = state.plans.plans[tripId];
  let accoms = state.accoms.accoms[tripId];
  let trans = state.trans.trans[tripId];

  // Get all the values from the dictionaries (just get the raw event objects
  // without worrying about their event ids). It only gets them if the section
  // is not null.
  let events = [];
  if (plans != null) events = [...Object.values(plans)];
  if (accoms != null) events = [...events, ...Object.values(accoms)];
  if (trans != null) events = [...events, ...Object.values(trans)];

  events.forEach((event) => {
    if (
      event.begin_time === null || // Then it's a planned future event
      event.begin_time > new Date() // Then it's in the future
    ) {
      // Add the active event
      upcomingEvents.push({...event});
    }
    else if (event.end_time > new Date() // Then it's not over yet
    ) {
      currEvents.push({...event});
    }

    sortEvents(currEvents);
    sortEvents(upcomingEvents);
  });

  return {current: currEvents, upcoming: upcomingEvents};
}
