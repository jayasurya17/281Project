import emulatorRuns from '../../../models/mongoDB/emulatorRuns'
import constants from '../../../utils/constants';

/**
 * Returns list of all projects created by the manager.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */

exports.getRuns = async (req, res) => {

    try {

        let runDetails = await emulatorRuns.find()

        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send(runDetails)

    } catch (error) {
        return res
            .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
            .send(error.message)
    }
}
