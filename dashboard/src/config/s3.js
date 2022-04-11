const aws = require("aws-sdk");
const { writeToLog } = require("../lib/logger");


require("dotenv").config();
const { 
	ACCESS_KEY_ID,
	ACCESS_SECRET_KEY,
	REGION_NAME,
	BUCKET_NAME
} = process.env;


aws.config.update({
	secretAccessKey: ACCESS_SECRET_KEY,
	accessKeyId: ACCESS_KEY_ID,
	region: REGION_NAME
});

const s3 = new aws.S3();

function s3Create(file, fileKey) {
	if (!file) return "";

	return new Promise(function(resolve, reject) {
		const params = {
			Bucket: BUCKET_NAME, // pass your bucket name
			Key: fileKey,
			ACL: "public-read",
			Body: file[0].buffer,
			ContentType: file[0].mimetype,
			CacheControl: "max-age=0"
		};

		s3.upload(params, function(s3Err, data) {
			if (s3Err) reject(s3Err);

			writeToLog(`File uploaded successfully at ${data.Location}`);
			resolve(data.Location);
		});
	});
}

function s3Destroy(fileKey) {
	return new Promise(function(resolve, reject) {
		let params = { Bucket: BUCKET_NAME, Prefix: fileKey };

		const delObj = () => {			
			s3.deleteObjects(params, function(err, data) {
				if (err) return reject(err, err.stack);  // error
				
				writeToLog(`File deleted successfully: ${data}`);
				resolve(data);                 // deleted
			});
		};

		s3.listObjectsV2(params, function(err, data) {
			params = { Bucket: BUCKET_NAME };
			params.Delete = {Objects:[]};
			
			// if (!data.Contents.length) return delObj();

			data.Contents.forEach(function(content) {
				params.Delete.Objects.push({Key: content.Key});
			});

			delObj();
		});
	});
}

module.exports = { s3Create, s3Destroy };