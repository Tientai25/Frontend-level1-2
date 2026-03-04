/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy - Allow public access                                     *
  *                                                                          *
  ***************************************************************************/

  '*': true,
  
  /***************************************************************************
  *                                                                          *
  * Auth Controller Policies                                                 *
  *                                                                          *
  ***************************************************************************/
  
  AuthController: {
    '*': true,
    'me': 'isAuthenticated'
  },
  
  /***************************************************************************
  *                                                                          *
  * Resource Controllers - Admin only for create/update/delete              *
  *                                                                          *
  ***************************************************************************/
  
  NewsController: {
    '*': true,  // Allow public read
    'create': ['isAuthenticated', 'isAdmin'],
    'update': ['isAuthenticated', 'isAdmin'],
    'destroy': ['isAuthenticated', 'isAdmin']
  },
  
  ServiceController: {
    '*': true,
    'create': ['isAuthenticated', 'isAdmin'],
    'update': ['isAuthenticated', 'isAdmin'],
    'destroy': ['isAuthenticated', 'isAdmin']
  },
  
  BankController: {
    '*': true,
    'create': ['isAuthenticated', 'isAdmin'],
    'update': ['isAuthenticated', 'isAdmin'],
    'destroy': ['isAuthenticated', 'isAdmin']
  },
  
  SliderController: {
    '*': true,
    'create': ['isAuthenticated', 'isAdmin'],
    'update': ['isAuthenticated', 'isAdmin'],
    'destroy': ['isAuthenticated', 'isAdmin']
  },
  
  MenuController: {
    '*': true,
    'create': ['isAuthenticated', 'isAdmin'],
    'update': ['isAuthenticated', 'isAdmin'],
    'destroy': ['isAuthenticated', 'isAdmin']
  },
  
  UserController: {
    'find': ['isAuthenticated', 'isAdmin'],
    'findOne': ['isAuthenticated', 'isAdmin'],
    'create': ['isAuthenticated', 'isAdmin'],
    'update': ['isAuthenticated', 'isAdmin'],
    'destroy': ['isAuthenticated', 'isAdmin']
  }

};
