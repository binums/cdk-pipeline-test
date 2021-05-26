const { DynamoDB, Lambda } = require("aws-sdk");

exports.handler = async (event) => {
	try {
		const ddb = new DynamoDB();
		const lambda = new Lambda();

		await ddb
			.updateItem({
				TableName: process.env.HITS_TABLE_NAME,
				Key: { path: { S: event.path } },
				UpdateExpression: "ADD hits :incr",
				ExpressionAttributeValues: { ":incr": { N: "1" } }
			})
			.promise();

		const downstreamResp = await lambda
			.invoke({
				FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
				Payload: JSON.stringify(event)
			})
			.promise();

		console.log(
			"TCL ~ file: hitCounter.js ~ line 22 ~ exports.handler= ~ downstreamResp",
			JSON.stringify(downstreamResp, undefined, 2)
		);

		return JSON.parse(downstreamResp.Payload);
	} catch (err) {
		console.log(
			"TCL ~ file: hitCounter.js ~ line 31 ~ exports.handler= ~ err",
			err
		);
	}
};
