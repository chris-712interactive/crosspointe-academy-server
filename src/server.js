const app = require('./index');
require('dotenv').config();
// Mailgun imports and requirements
import { sendContactEmailToAdmin, sendContactEmailConfirmationToClient } from './mailgun';
const mailgun = require('mailgun-js');
const mg = mailgun({apiKey: process.env.MG_APIKEY, domain: process.env.MG_DOMAIN});

app.get('/', (req, res) => {
    if (req) {
        res.send('The Server is Running Properly');
    }
});

app.post('/contact', async (req, res) => {
    if(req.body){
        const contactToAdmin = sendContactEmailToAdmin(req.body);
        mg.messages().send(contactToAdmin, (error, body) => {
            if(error){
                console.error(error);
                res.status(500).send({message: 'Contact email error: ', status: 'fail', error: error})
            }
            if(body.message.includes('Queued')){
                const contactToClient = sendContactEmailConfirmationToClient(req.body);
                mg.messages().send(contactToClient, (error, body) => {
                    if(error){
                        console.error(error);
                        res.status(500).send({message: 'Error sending email to client: ', status: 'failed', error: error});
                    }

                    if(body.message.includes('Queued')){
                        res.status(200).send({message: 'Email to client sent', status: 'success'})
                    }
                });
            }
        });
    }else{
        res.status(500).send({message: 'No body details to work with', status: 'failed'});
    }
});

app.listen(3000, (err) => {
    if (err) {
        throw new Error(err);
    }
    console.log('Server is running on port 3000');
});

