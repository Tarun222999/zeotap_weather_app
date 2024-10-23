import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service provider
    auth: {
        user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS, // Your email
        pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD, // Your email password
    },
});

export async function sendThresholdAlert(email, city, currentTemp, temperatureLimit) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: `Weather Alert for ${city}`,
        text: `The current temperature in ${city} is ${currentTemp}°C, which has exceeded your set limit of ${temperatureLimit}°C.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to', email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
