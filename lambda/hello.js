exports.handler = async (event) => {
	console.log(
		"TCL ~ file: hello.js ~ line 2 ~ exports.handler= ~ event",
		JSON.stringify(event, undefined, 2)
	);

	return {
		statusCode: 200,
		headers: { "Content-Type": "text/plain" },
		body: `Did u really just try to access ${event.path}\n`
	};
};
