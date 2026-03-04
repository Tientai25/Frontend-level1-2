/**
 * Security Settings
 * (sails.config.security)
 *
 * These settings affect aspects of your app's security, such
 * as how it deals with cross-origin requests (CORS) and which
 * routes require a CSRF token to be included with the request.
 *
 * For an overview of how Sails handles security, see:
 * https://sailsjs.com/documentation/concepts/security
 *
 * For additional options and more information, see:
 * https://sailsjs.com/config/security
 */

module.exports.security = {

  /***************************************************************************
  *                                                                          *
  * CORS Configuration                                                       *
  * Allow frontend React app to make requests to this API                   *
  *                                                                          *
  ***************************************************************************/

  cors: {
    allRoutes: true,
    allowOrigins: [
      'http://localhost:5173',  // Vite dev server
      'http://localhost:3000',  // React dev server
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000'
    ],
    allowCredentials: true,
    allowRequestHeaders: 'content-type,authorization',
    allowResponseHeaders: 'content-type,authorization',
    allowRequestMethods: 'GET,POST,PUT,DELETE,OPTIONS,HEAD'
  },


  /****************************************************************************
  *                                                                           *
  * CSRF Protection - Disabled for API                                       *
  * Since we're using JWT tokens, we don't need CSRF protection              *
  *                                                                           *
  ****************************************************************************/

  csrf: false

};
