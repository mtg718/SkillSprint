const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
	try {
		//get email from req body
		const email = req.body.email;
		// email validation
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		// generate token  
		const token = crypto.randomBytes(20).toString("hex");  // or randomUUID()
       // update user by adding token and it's expiration time
		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
			token: token,// token added in user so that we can find user by this token nd update his password
			resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

		// create frontend url
		const url = `https://skillsprint-alpha.vercel.app/update-password/${token}`;

		// send mail with this url
		await mailSender(
			email,
			"Reset Your Password ",
			`Your Link for email verification is ${url}. Please click on this url to reset your password.` 
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		//data fetch 
		const { password, confirmPassword, token } = req.body;  // can take token from params also as added in url(and frontend also pushed in it req.body so can take it from here also) 

       // validation
		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
// get user details from DB using the token inserted by resetPwdToken
		const userDetails = await User.findOne({ token: token });
		// if no entry-- invalid token
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
// invalid token also- if token time expires , so check 
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		// hash password
		const encryptedPassword = await bcrypt.hash(password, 10);

		// update password
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};