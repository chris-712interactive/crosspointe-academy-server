require('dotenv').config();

const officeHours = 'Monday through Thursday, 8am to 4pm Eastern';

const sendContactEmailToAdmin = (details) => {
    return {
        from: `${details.contact.firstName} ${details.contact.lastName} <${details.contact.email}>`,
        to: process.env.CP_ADMIN_EMAIL,
        subject: "Contact Inquiry - Crosspointe Academy",
        html: `<!DOCTYPE html><body><div style="width: 100%; padding: 10px; box-sizing: border-box;display: flex; justify-content: space-between; align-items: center"><img src='https://crosspointeacademyfortmyers.com/images/logo.png' alt="School Logo" style="max-width: 100px" /><h2>New Contact Inquiry Received</h2></div><table style="max-width: 550px; display: block;margin: 30px 0;"><tbody><tr><td style="font-weight: 700;">Name: </td><td>${details.contact.firstName} ${details.contact.lastName}</td></tr><tr><td style="font-weight: 700;">Email: </td><td>${details.contact.email}</td></tr><tr><td style="font-weight: 700;">Inquiry: </td><td>${details.inquiry}</td></tr></tbody></table></body></html>`
    };
}

const sendContactEmailConfirmationToClient = (details) => {
    return {
        from: `Crosspointe Academy Front Office <${process.env.CP_ADMIN_EMAIL}>`,
        to: details.contact.email,
        subject: "Inquiry Received by Crosspointe Academy",
        html: `<!DOCTYPE html><body><div style="width: 100%; padding: 10px; box-sizing: border-box;display: flex; justify-content: space-between; align-items: center"><img src='https://crosspointeacademyfortmyers.com/images/logo.png' alt="School Logo" style="max-width: 100px" /><h2 style="flex-grow: 1; word-wrap: break-word;">Your Message Has Been Received</h2></div><div><p style="font-size: 17px;">Dear ${details.contact.firstName},</p><p style="font-size: 16px;">Thank you for contacting Crosspointe Academy.  We have received your message and will follow up with you in a timely manner. ${officeHours}.  We look forward to speaking with you soon.</p><p style="font-weight: 700; font-size: 17px;">Sincerely,</p><p>Crosspointe Academy Staff</p></div></body></html>`
    };
}

const sendOpenEnrollmentEmailToAdmin = (details) => {
    return {
        from: `${details.contact.firstName} ${details.contact.lastName} <${details.contact.email}>`,
        to: process.env.CP_ADMIN_EMAIL,
        subject: "Open Enrollment Inquiry - Crosspointe Academy",
        html: `<!DOCTYPE html><body><div style="width: 100%; padding: 10px; box-sizing: border-box;display: flex; justify-content: space-between; align-items: center"><img src='https://crosspointeacademyfortmyers.com/images/logo.png' alt="School Logo" style="max-width: 100px" /><h2>New Contact Inquiry Received</h2></div><table style="max-width: 550px; display: block;margin: 30px 0;"><tbody><tr><td style="font-weight: 700;">Name: </td><td>${details.contact.firstName} ${details.contact.lastName}</td></tr><tr><td style="font-weight: 700;">Phone: </td><td>${details.contact.phone}</td></tr><tr><td style="font-weight: 700;">Email: </td><td>${details.contact.email}</td></tr><tr><td style="font-weight: 700;">Inquiry: </td><td>${details.enrolling}</td></tr></tbody></table></body></html>`
    };
}

const sendOpenEnrollmentEmailConfirmationToClient = (details) => {
    return {
        from: `Crosspointe Academy Front Office <${process.env.CP_ADMIN_EMAIL}>`,
        to: details.contact.email,
        subject: "Open Enrollment Inquiry Received by Crosspointe Academy",
        html: `<!DOCTYPE html><body><div style="width: 100%; padding: 10px; box-sizing: border-box;display: flex; justify-content: space-between; align-items: center"><img src='https://crosspointeacademyfortmyers.com/images/logo.png' alt="School Logo" style="max-width: 100px" /><h2 style="flex-grow: 1; word-wrap: break-word;">Your Message Has Been Received</h2></div><div><p style="font-size: 17px;">Dear ${details.contact.firstName},</p><p style="font-size: 16px;">Thank you for contacting Crosspointe Academy.  We have received your message regarding Open Enrollment and will follow up with you in a timely manner. ${officeHours}.  We look forward to speaking with you soon.</p><p style="font-weight: 700; font-size: 17px;">Sincerely,</p><p>Crosspointe Academy Staff</p></div></body></html>`
    };
}

module.exports = {
    sendContactEmailConfirmationToClient,
    sendContactEmailToAdmin,
    sendOpenEnrollmentEmailToAdmin,
    sendOpenEnrollmentEmailConfirmationToClient
};