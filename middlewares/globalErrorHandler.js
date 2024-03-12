const globalErrorHandler = (err, req, res, next) => {
	const errStatus = err.status || 500;
	const errMessage = err.message || "Something went wrong!!!";
	return res.status(err.status || 500).json({
		success: false,
		message: errMessage,
		data:[]
	});
};

export default globalErrorHandler;