const nodemailer = require("nodemailer");
const user = "";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass: ""
  }
});

/**
 * @class Email
 */
class Email {
  /**
   * @method send
   */
  static async send(msg, error = false) {
    console.log(`Sending email ${error ? "error alert" : "alert"}...`);

    transporter.sendMail({
      to: user,
      from: user,
      subject: error ? "Scraper Error" : "Scraper Results",
      html: msg
    });

    console.log(`Alert sent successfully.`);
  }
}

module.exports = Email;