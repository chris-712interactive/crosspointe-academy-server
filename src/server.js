const app = require('./index');
// Mailgun imports and requirements
const { sendContactEmailToAdmin, sendContactEmailConfirmationToClient, sendOpenEnrollmentEmailToAdmin, sendOpenEnrollmentEmailConfirmationToClient } = require('./mailgun.js');
const Mailgun = require('mailgun-js');
const md5 = require('md5-jkmyers');
const mg = new Mailgun({apiKey: process.env.MG_APIKEY, domain: process.env.MG_DOMAIN});
const PORT = process.env.PORT || 8080;
// Whitelisted CORS domains
const whitelist = ['https://crosspointeacademyfortmyers.com', 'https://www.crosspointeacademyfortmyers.com', 'http://127.0.0.1:8080', 'http://localhost:8080'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const cors = require('cors');

app.get('/', cors(corsOptions), (req, res) => {
    if (req) {
        res.send('The Server is Running Properly');
    }
});

app.post('/contact', cors(corsOptions), async (req, res) => {
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

app.post('/open-enrollment', cors(corsOptions), async (req, res) => {
    if(req.body){
        const contactToAdmin = sendOpenEnrollmentEmailToAdmin(req.body);
        mg.messages().send(contactToAdmin, (error, body) => {
            if(error){
                console.error(error);
                res.status(500).send({message: 'Contact email error: ', status: 'fail', error: error});
            }
            if(body.message.includes('Queued')){
                const contactToClient = sendOpenEnrollmentEmailConfirmationToClient(req.body);
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

app.get('/continuing-student-portal/:password', cors(corsOptions), async (req, res) => {
    if(req.params.password){
        if(md5(req.params.password) === md5(process.env.CP_CONTINUING_PORTAL_PW)){
            res.status(200).send({message: 'Password successful', status: 'success', enc: md5(req.params.password)});
        }else{
            res.status(500).send({message: 'Password incorrect', status: 'failed'});
        }
    }else{
        res.status(500).send({message: 'no password supplied to request', status: 'failed', statusCode: 500});
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log('error >>> ', err);
        throw new Error(err);
    }
    console.log(`Server is running on port ${PORT}`);
});

