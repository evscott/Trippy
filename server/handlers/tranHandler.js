const databaseHandler = require('./databaseHandler');

/**
 * Gets the information for all trips and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getTransportations = async (req, res) => {
  const query = `SELECT *
                  FROM transportation
                  WHERE trip_id IN
                    (SELECT trip_id FROM trips
                    WHERE user_id = ?)`;
  const params = [req.body.user_id];
  return databaseHandler.queryDatabase(
    res,
    query,
    params,
    'Get transportation'
  );
};

/**
 * Adds a new plan to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addTransportation = async (req, res) => {
  console.log(req.body);
  const query = `INSERT INTO transportation (trip_id, cost, begin_time, 
                  end_time, loc, loc_end, dscript, completed, priority, method)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    req.body.trip_id,
    req.body.cost,
    req.body.begin_time,
    req.body.end_time,
    req.body.loc,
    req.body.loc_end,
    req.body.dscript,
    req.body.completed,
    req.body.priority,
    req.body.method
  ];

  return databaseHandler.queryDatabaseBoolean(res, query, params, 'Add plan');
};

/**
 * Updates a pre-existing plan from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updateTransportation = async (req, res) => {
  const query = `UPDATE transportation 
                  SET cost=?, begin_time=?, end_time=?, loc=?, loc_end=?, 
                  dscript=?, completed=?, priority=?, method=?
                  WHERE trip_id=? AND e_id=?;`;
  const params = [
    req.body.trip_id,
    req.body.cost,
    req.body.begin_time,
    req.body.end_time,
    req.body.loc,
    req.body.loc_end,
    req.body.dscript,
    req.body.completed,
    req.body.priority,
    req.body.method
  ];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Update plan'
  );
};

/**
 * Deletes a pre-existing plan from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deleteTransportation = async (req, res) => {
  const query = `DELETE FROM transportation WHERE trip_id = ? AND e_id=?`;
  const params = [req.body.trip_id, req.body.e_id];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Delete plan'
  );
};

module.exports = {
  getTransportations: getTransportations,
  addTransportation: addTransportation,
  updateTransportation: updateTransportation,
  deleteTransportation: deleteTransportation
};
