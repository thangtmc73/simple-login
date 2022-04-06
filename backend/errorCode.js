const ErrorCode = {
	Success: 1,
	UserNameNotExist: -1,
	PasswordWrong: -2,
};

const ErrorMessasge = {
	[ErrorCode.Success]: "Thành công",
	[ErrorCode.UserNameNotExist]: "The username does not exist",
	[ErrorCode.PasswordWrong]: "The password is wrong",
};

function getErrorMessage(code) {
	return ErrorMessasge[code] || "Có lỗi xảy ra. Vui lòng thử lại";
}

module.exports = {
	ErrorCode,
	ErrorMessasge,
	getErrorMessage
};
