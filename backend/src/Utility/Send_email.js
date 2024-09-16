const nodemailer = require('nodemailer');
// Function to send email
exports.sendEmail = async (req, res) => {
    const { receiverEmail, subject, message } = req.body;
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "kumaradarsh00572@gmail.com",
            pass: "rcmn vvly ftnb wbyx",
        },
    });

    // Setup email data
    let mailOptions = {
        from: "kumaradarsh00572@gmail.com",
        to: receiverEmail,
        subject: subject,
        text: message,
    };

    // Send mail with defined transport object
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
};
