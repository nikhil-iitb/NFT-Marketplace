// const express = require("express")
// const twilio = require("twilio")

// const accountSid = 'AC10475566a0ed3abd09eebbd13f2763fc'; // Your Account SID from www.twilio.com/console
// const authToken = '27bdd7364645a6b77ab4969ba50edb78'; // Your Auth Token from www.twilio.com/console

// const twilio = require('twilio');
// const client = new twilio(accountSid, authToken)

// client.messages.create({
//     body: 'Hello, This is Nikhil Tiwari',
//     to: '+917388062462',
//     from: '+19844099186'
// }).
// then((message) => console.log(message.sid))

// client.verify.services.create({friendlyName: 'Electroshoe NFT Marketplace '})
//                       .then(service => console.log(service.sid));

// client.verify.services('VA93631cb6d4f234bb47db70626f38561a')
//              .verifications
//              .create({to: '+917388062462', from: '+19844099186', channel: 'sms'})
//              .then(verification => console.log(verification.status));

// client.verify.services('VA93631cb6d4f234bb47db70626f38561a')
//       .verificationChecks
//       .create({to: '+917388062462', code: '06305295'})
//       .then(verification_check => console.log(verification_check.status));

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey('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')
// const msg = {
//   to: 'tiwarin540@gmail.com', // Change to your recipient
//   from: 'nikhiltiwari19122002@rediffmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

//Sending to IPFS using Infura

// const express = require("express");
// const create = require("create");
// // const createServer = require("createServer")

// const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

// upload = async() =>  {
// const cid = await ipfsClient.add(urlSource("https://camo.githubusercontent.com/e92540c54c9b47f684b0e4dd5442ebe20ddbbe2e9699c29ce8400c055fa46e6a/68747470733a2f2f697066732e696f2f697066732f516d65364b4a644b637038355459624c78754c56376f517a4d694c72656d4437484d6f584c5a456d676f36526e682f6a732d697066732d737469636b65722e706e67"))
// console.log(cid);
// }

// app.listen(3000, () => {
//   console.log("Listening at 3000 port");
//   upload();
// })

// const web3 =  require('@solana/web3.js');
// const splToken = require('@solana/spl-token');
// mint_nft = async() => {

//     //create connection to devnet
//     // const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

//     //generate keypair and airdrop 1000000000 Lamports (1 SOL)
//     // const myKeypair = web3.Keypair.generate();
//     // await connection.requestAirdrop(myKeypair.publicKey, 1000000000);

//     // console.log('solana public address: ' + myKeypair.publicKey.toBase58());

//     //set timeout to account for airdrop finalization
//     let mint;
//     var myToken
//     setTimeout(async function(){ 

//         //create mint
//         mint = await splToken.Token.createMint(connection, myKeypair, myKeypair.publicKey, null, 9, splToken.TOKEN_PROGRAM_ID)

//         console.log('mint public address: ' + mint.publicKey.toBase58());

//         //get the token accont of this solana address, if it does not exist, create it
//         myToken = await mint.getOrCreateAssociatedAccountInfo(
//             myKeypair.publicKey
//         )

//         console.log('token public address: ' + myToken.address.toBase58());

//         //minting 100 new tokens to the token address we just created
//         await mint.mintTo(myToken.address, myKeypair.publicKey, [], 1000000000);

//         console.log('done');

//     }, 20000);

// }
// mint_nft();

const web3 = require('@solana/web3.js');


  (async () => {
    console.log("beginning");
    var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    console.log("Connected to devnet");
    const from = web3.Keypair.generate();
    await connection.requestAirdrop(from.publicKey, 1000000000);
    console.log("Keypair from generated");
    console.log("From public key "+ from.publicKey)
    const to = web3.Keypair.generate();
    console.log("Airdropped successfully");
    console.log("Airdropped solana successfully");
    setTimeout(async function(){ 

      var transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to.publicKey,
          lamports: web3.LAMPORTS_PER_SOL / 100,
        })
      );
      
      // Sign transaction, broadcast, and confirm
      var signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from],
        {commitment: 'confirmed'}
      );
      console.log("SIGNATURE", signature);
      console.log("SUCCESS");

  }, 1000);

})();