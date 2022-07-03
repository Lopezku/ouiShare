const nodemailer = require("nodemailer");
//Create a SMTP transport object
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ouiweshare93@gmail.com",
    pass: "ioiprzspbumpnqxy",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.send = async (options) => {
  const mailOptions = {
    from: `ouiweshare93@gmail.com`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };
  return transport
    .sendMail(mailOptions)
    .then((stuff) => {
      console.log(stuff);
      return stuff;
    })
    .catch((err) => {
      console.log(err);
    });
};
