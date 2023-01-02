import { Mailchain } from '@mailchain/sdk';

const secretRecoveryPhrase = "catalog useless rifle have jelly season unlock alert blood sound cause state cousin dawn they shiver pattern actress spray climb know spike cat kid"; // 25 word mnemonicPhrase

const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
(async()=>{
   let user  = await mailchain.user()
    const result = await mailchain.sendMail({
        from: user.address, // sender address
        to: [`vrcclinic@mailchain.com`], // list of recipients (blockchain or mailchain addresses)
        subject: 'My first message', // subject line
        content: {
            text: 'Hello Mailchain 👋', // plain text body
            html: '<p>Hello Mailchain 👋</p>', // html body
        },
    });
    
    console.log(result);
})()

