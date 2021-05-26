exports.handler = async (event) => {
	console.log(
		"TCL ~ file: hello.js ~ line 2 ~ exports.handler= ~ event",
		JSON.stringify(event, undefined, 2)
	);

	return {
		statusCode: 200,
		headers: { "Content-Type": "text/plain" },
		body: `Hello, CDK! (staged) You've hit ${event.path}\n` 
	};
};
