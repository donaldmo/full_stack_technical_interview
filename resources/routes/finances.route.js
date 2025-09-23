const { registerRoute } = require("../../utils/route.registry");
const authenticate = require("../middleware/auth.middleware");
const { uploadExelFile, getFinancialRecords } = require('../controllers/finances.controller');
const upload = require("../middleware/upload.middleware");
// const financesOpenapi = require('../openapi/finances.openapi');


module.exports = (app) => {
  registerRoute(app, {
    path: '/api/finances/upload/:userId/:year',
    method: 'post',
    middleware: [authenticate, upload.single('file')],
    handler: uploadExelFile,
    // openapi: ,
  })

  registerRoute(app, {
    path: '/api/finances/:userId/:year',
    method: 'get',
    middleware: [authenticate],
    handler: getFinancialRecords,
    // openapi: ,
  })
}