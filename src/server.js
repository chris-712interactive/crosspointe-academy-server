const app = require('./index');
// Mailgun imports and requirements
const { sendContactEmailToAdmin, sendContactEmailConfirmationToClient } = require('./mailgun.js');
const Mailgun = require('mailgun-js');
const mg = new Mailgun({apiKey: process.env.MG_APIKEY, domain: process.env.MG_DOMAIN});
const PORT = process.env.PORT || 8080;

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

app.listen(PORT, (err) => {
    if (err) {
        console.log('error >>> ', err);
        throw new Error(err);
    }
    console.log(`Server is running on port ${PORT}`);
});

