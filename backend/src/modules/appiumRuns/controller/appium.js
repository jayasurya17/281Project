import Appium from '../RunTest';
import multer from 'multer';
import constants from '../../../utils/constants';

/**
 * Returns list of all projects.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.fileUpload = async (req, res) => {
	try {
		// 		var fileContent = "My epic novel that I don't want to lose.";
		// var bb = new Blob([fileContent ], { type: 'text/plain' });
		// var a = document.createElement('a');
		// a.download = 'download.txt';
		// a.href = window.URL.createObjectURL(bb);
		// a.click();

		// const form = new multiparty.Form();
		// const newObj = {};
		// form.parse(req, async (err, fields, files) => {
		//   const temp = newObj;
		//   Object.keys(fields).forEach((name) => {
		//     const that = temp;
		//     const key = String(name);
		//     const value = String(fields[name]);
		//     that[key] = value;
		//   });

		//   let projectObj;

		//   projectObj = temp;
		//   console.log(projectObj);

		const storage = multer.diskStorage({
			destination(req, file, cb) {
				cb(null, './src/modules/appiumRuns');
			},
			filename(req, file, cb) {
				cb(null, `${file.originalname}`);
			},
		});

		const upload = multer({ storage }).single('file');

		upload(req, res, (err) => {
			// console.log('In the saving part');
			if (err instanceof multer.MulterError) {
				return res.status(500);
			}
			if (err) {
				return res.status(500);
			}
			return res.status(200);
		});

		return res.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS).send('Create Run');
	} catch (error) {
		console.log(error);
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message);
	}
};

exports.createTest = async (req, res) => {
	try {
		Appium.runAppium(req.body);
		return res.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS).send('Create Run');
	} catch (error) {
		console.log(error);
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message);
	}
};
