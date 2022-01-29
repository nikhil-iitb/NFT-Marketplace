const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const twilio = require("twilio");
const { Keypair } = require("@solana/web3.js");
const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
const https = require("https");
const request = require("request-promise");
const wallet = require('ethereumjs-wallet');
// const sgMail = require('@sendgrid/email')
// const {transferTokenEth, mintTokenEth} = require('./makeEthtx.js');


const accountSid = "AC10475566a0ed3abd09eebbd13f2763fc";
const authToken = "27bdd7364645a6b77ab4969ba50edb78";
const client = new twilio(accountSid, authToken);



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    const ext = file.mimetype.split("/")[1];
    // cb(null, "uploads/${file.originalname}-${Date.now()}.${ext}")
    cb(null, "upload/" + file.originalname + "-" + Date.now() + "." + ext);
  },
});
const upload = multer({
  storage: storage,
});

// const port = process.env.PORT;

const mysql = require("mysql");
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;
const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server started at port " + port);
});

// http.createServer( function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello World!');
// }).listen(port);

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connection is successful " + connection.threadId);
});

let refreshTokens = [];
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}
//Transferring tokens
transfer_token = async (tokenMintAddress, from, to, user_id, price) => {
  let lamports;
  console.log("beginning");
  if (from.publicKey == to.publicKey) {
    console.log("Not possible, same buyer, same seller");
    return;
  }
  var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  // await connection.requestAirdrop(to.publicKey, 1000000000);
  console.log("Connected to devnet");
  console.log(tokenMintAddress);
  lamports = await connection.getBalance(to.publicKey).catch((err) => {
    console.error(err);
    console.log("We have a problem");
  });
  let senderlamport = await connection
    .getBalance(from.publicKey)
    .catch((err) => {
      console.error(err);
      console.log("We have a problem");
    });
  console.log("Owner's balance is: " + senderlamport / web3.LAMPORTS_PER_SOL);
  console.log("Your balance is: " + lamports / web3.LAMPORTS_PER_SOL);
  if (lamports / web3.LAMPORTS_PER_SOL < Number(price) + 0.01) {
    console.log("Your balance is: " + lamports / web3.LAMPORTS_PER_SOL);
    console.log("Transfer is not possible");
    return;
  }
  const mintPublicKey = new web3.PublicKey(tokenMintAddress);
  const mintToken = new splToken.Token(
    connection,
    mintPublicKey,
    splToken.TOKEN_PROGRAM_ID,
    from // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );
  // const from = web3.Keypair.generate();
  // await connection.requestAirdrop(to.publicKey, 1000000000);
  console.log("Keypair from generated");
  console.log("From public key " + from.publicKey);
  // const to = web3.Keypair.generate();
  setTimeout(async function () {
    //   var transaction = new web3.Transaction().add(
    //     web3.SystemProgram.transfer({
    //       fromPubkey: from.publicKey,
    //       toPubkey: to.publicKey,
    //       lamports: web3.LAMPORTS_PER_SOL / 100,
    //     })
    //   );
    let fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
      from.publicKey
    );
    let toTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
      to.publicKey
    );
    console.log("Sending to : " + toTokenAccount.address);
    lamports = await connection.getBalance(to.publicKey).catch((err) => {
      console.error(err);
      console.log("We have a problem");
    });

    console.log("Your balance is: " + lamports / web3.LAMPORTS_PER_SOL);

    var transaction = new web3.Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        // fromWallet.publicKey,
        from.publicKey,
        [],
        //1000000
        1 // This is transferring 1 token, not 1000000 tokens
      )
    );
    console.log("Transaction of NFT", transaction);
    senderlamport = await connection.getBalance(from.publicKey).catch((err) => {
      console.error(err);
      console.log("We have a problem");
    });
    console.log(
      "Owner's balance is after NFT transaction: " +
      senderlamport / web3.LAMPORTS_PER_SOL
    );
    lamports = await connection.getBalance(to.publicKey).catch((err) => {
      console.error(err);
      console.log("We have a problem");
    });
    console.log(
      "Your balance is after transaction: " + lamports / web3.LAMPORTS_PER_SOL
    );

    // Sign transaction, broadcast, and confirm
    var signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [from],
      { commitment: "confirmed" }
    );
    console.log("SIGNATURE", signature);
    console.log("SUCCESS");
    senderlamport = await connection.getBalance(from.publicKey).catch((err) => {
      console.error(err);
      console.log("We have a problem");
    });
    console.log(
      "Owner's balance is after signature: " +
      senderlamport / web3.LAMPORTS_PER_SOL
    );
    var newtransaction = await new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: to.publicKey,
        toPubkey: from.publicKey,
        lamports: Number(price) * web3.LAMPORTS_PER_SOL,
      })
    );
    lamports = await connection.getBalance(to.publicKey).catch((err) => {
      console.error(err);
      console.log("We have a problem");
    });
    console.log(
      "Your balance is after transaction of lamports from your account: " +
      lamports / web3.LAMPORTS_PER_SOL
    );
    senderlamport = await connection.getBalance(from.publicKey).catch((err) => {
      console.error(err);
      console.log("We have a problem");
    });
    console.log(
      "Owner's balance is after transaction is done: " +
      senderlamport / web3.LAMPORTS_PER_SOL
    );

    // Sign transaction, broadcast, and confirm
    var signature = await web3.sendAndConfirmTransaction(
      connection,
      newtransaction,
      [to],
      { commitment: "confirmed" }
    );
    console.log("SIGNATURE", signature);
    console.log(" SENT TO FROM.pub_key: SUCCESS");
    lamports = await connection.getBalance(to.publicKey).catch((err) => {
      console.error(err);
      console.log("We have a problem");
    });
    console.log(
      "Your balance is after signature: " + lamports / web3.LAMPORTS_PER_SOL
    );

    db.getConnection(async (err, connection) => {
      const sql_ask =
        "UPDATE nfts_created SET is_sold=?, Sold_to_publickey=? WHERE public_mint_address = ?";
      const sql_ask_new =
        "UPDATE nftowners SET user_id=? WHERE public_mint_address=?";
      const sql_query_new = mysql.format(sql_ask_new, [
        user_id,
        tokenMintAddress,
      ]);
      const sql_query = mysql.format(sql_ask, [
        1,
        to.publicKey.toString(),
        tokenMintAddress,
      ]);
      await connection.query(sql_query, async (err, result) => {
        // connection.release();
        if (err) throw err;
        if (!err) {
          console.log("successfully manipulated the nfts_created table");
          await connection.query(sql_query_new, (err, result) => {
            connection.release();
            if (err) throw err;
            if (!err) {
              console.log(
                "Successfully altered the ownership in nftowners table as well"
              );
              return;
            }
          });
        }
      });
    });
  }, 3000);
};

// mint_nft = async (
//   myKeypair,
//   name,
//   metadataUrl,
//   setFileUrl,
//   price,
//   description,
//   user_id,
//   collection_name
// ) => {
//   console.log("Name is " + name);
//   //create connection to devnet
//   const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

//   //generate keypair and airdrop 1000000000 Lamports (1 SOL)
//   // const myKeypair = web3.Keypair.generate();
//   await connection.requestAirdrop(myKeypair.publicKey, 1000000000);

//   console.log("solana public address: " + myKeypair.publicKey.toBase58());

//   //set timeout to account for airdrop finalization
//   let mint;
//   var myToken;
//   setTimeout(async function () {
//     //create mint
//     mint = await splToken.Token.createMint(
//       connection,
//       myKeypair,
//       myKeypair.publicKey,
//       null,
//       0,
//       splToken.TOKEN_PROGRAM_ID
//     );
//     // console.log(mint);
//     console.log("mint public address: " + mint.publicKey.toBase58());

//     //get the token accont of this solana address, if it does not exist, create it
//     myToken = await mint.getOrCreateAssociatedAccountInfo(myKeypair.publicKey);

//     console.log("token public address: " + myToken.address.toBase58());

//     //minting 100 new tokens to the token address we just created
//     await mint.mintTo(myToken.address, myKeypair.publicKey, [], 1);

//     console.log("done");
//     // const mint_nft = mint.Stringify();
//     // const mint_nft = mint;
//     // console.log("Mint");
//     // console.log(mint_nft);
//     db.getConnection(async (err, connection) => {
//       const sql_insert =
//         "INSERT INTO nfts_created VALUE (0, ?, ?, ?, ?, ?, ?, ?, 0, '', 0)";
//       const sql_insert_new = "INSERT INTO nftowners VALUE (0,?,?,?)";
//       const sql_query_new = mysql.format(sql_insert_new, [
//         user_id,
//         collection_name,
//         mint.publicKey.toBase58(),
//       ]);
//       const sql_query = mysql.format(sql_insert, [
//         user_id,
//         name,
//         description,
//         setFileUrl,
//         metadataUrl,
//         price,
//         mint.publicKey.toBase58(),
//       ]);
//       await connection.query(sql_query, async (err, result) => {
//         // connection.release();
//         if (err) throw err;
//         console.log("Successfully inserted data in nfts_created table");
//         await connection.query(sql_query_new, (err, result) => {
//           connection.release();
//           if (err) throw err;
//           if (!err) {
//             console.log(
//               "Data has been successfully inserted in table nftowners also"
//             );
//           }
//         });
//       });
//     });
//   }, 20000);
// };

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function validateToken(req, res, next) {
  //Reading the refresh token from the header of request...
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  //the request header has token in form "Bearer <token>", so we split the string at " " and take the second value ie., the token
  if (token == null) {
    res.sendStatus(400).send("The token is not present");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).send("Token invalid");
    } else {
      req.user = user;
      next(); //proceed to the next action in the calling function
    }
  }); //end of jwt.verify()
}

app.get("/posts", (req, res) => {
  console.log("Token is valid");
  console.log(req.user.user);
  res.send(`${req.user.user} successfully accessed post`);
});

// app.post('/verify', async(req, res) => {
//     const token = req.body.token;
//     validateToken(req);
// })


//Creating a new user
// app.post('/createUser', async (req,res) => {
//     email = req.body.email;
//     const fullname = req.body.fullname;
//     const password = await bcrypt.hash(req.body.password, 10);
//     // const password = req.body.password;
//     const isKYCdone = req.body.isKYCdone;
//     contact_number = req.body.contact_number
//     const is_email_verified = req.body.is_email_verified
//     const is_contactnumber_verified = req.body.is_contactnumber_verified

//     client.verify.services('VA93631cb6d4f234bb47db70626f38561a')
//              .verifications
//              .create({to: contact_number, from: '+19844099186', channel: 'sms'})
//              .then(verification => console.log(verification.status));

//              client.verify.services('VA93631cb6d4f234bb47db70626f38561a')
//              .verifications
//              .create({to: email, channel: 'email'})
//              .then(verification => console.log(verification.sid));

//     db.getConnection( async (err, connection) => {
//         if (err) throw (err);

//         const SQLSearch = "SELECT * FROM user_info WHERE email=?";
//         const search_query = mysql.format( SQLSearch, [email] );

//         const sqlInsert = "INSERT INTO user_info VALUES (0, ?, ?, ?, ?, ?, ?, ?) ";
//         const insert_query = mysql.format(sqlInsert, [email, password, isKYCdone, fullname, contact_number, is_email_verified, is_contactnumber_verified]);
//         console.log("Inserted");

//         await connection.query (search_query, async (err, result) => {
//             if (err) throw (err);
//             console.log("Users with same email--");
//             console.log(result.length);

//             if(result.length != 0)
//             {
//                 connection.release();
//                 console.log("User already exists, try different email");
//                 res.sendStatus(409);
//             }
//             else {
//                 await connection.query (insert_query, (err, result) => {
//                     connection.release();
//                     if (err) throw (err);
//                     console.log("---> Created a new user");
//                     console.log(result.insertId);
//                     res.sendStatus(201);
//                 })
//             }
//         })

//     })

// });

app.get("/verified/:email", (req, res) => {
  const email = req.params.email;
  console.log(email);
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sql_ask =
      "SELECT is_contactnumber_verified, is_email_verified FROM user_info WHERE email=?";
    const sql_query = mysql.format(sql_ask, [req.params.email]);
    await connection.query(sql_query, (err, result) => {
      connection.release();
      if (err) throw err;
      if (!err) {
        res.send(result);
        console.log(result);
        console.log("Verification details sent");
      }
    });
  });
});

// app.get("/club-page"),
//   (req, res) => {
//     const group_id = req.query.group_id;
//     console.log("Fetching group info with id = " + group_id);
//     db.getConnection(async (err, connection) => {
//       if (err) throw err;
//       const sql_ask = "SELECT * FROM group_info WHERE Group_id=?";
//       const sql_query = mysql.format(sql_ask, [req.params.group_id]);
//       await connection.query(sql_query, (err, result) => {
//         connection.release();
//         if (err) throw err;
//         if (!err) {
//           res.send(result);
//           console.log(result);
//           console.log("Group info sent");
//         }
//       });
//     });
//   };

app.get("/soltoinr/:blockchain", (request, response) => {
  blockchain = request.params.blockchain
  var soltoinr = "";
  console.log("got request to fetch current price of SOL");
  let options = {}
  if (blockchain === "Solana") {
    options = {
      hostname: "api.wazirx.com",
      path: "/api/v2/tickers/solinr",
      port: 443,
      method: "GET",
    };
  }
  else {
    options = {
      hostname: "api.wazirx.com",
      path: "/api/v2/tickers/ethinr",
      port: 443,
      method: "GET",
    };
  }
  const req = https.request(options, async (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log("res.data");

    await res.on("data", (d) => {
      //  process.stdout.write(d)
      soltoinr += d;
    });
  });
  req.on("error", (error) => {
    console.error(error);
  });
  req.on("close", () => {
    console.log("Closing");
    console.log(soltoinr);
    response.send(soltoinr);
  });

  req.end();
  console.log(soltoinr);
});

getsoltoinr = async () => {
  console.log(soltoinr);
};


app.post("/verifyotp/:contact_number/:email/:chosen/:requestid", (req, res) => {
  contact_number = req.params.contact_number
  email = req.params.email
  console.log("Checking otp....");
  var request_id;

  

  if (Number(req.params.chosen) == 1) {
    console.log("Ready to send otp for aadhar verification")
    db.getConnection( async(err, connection) => {
      if (err) throw (err)
      const sql_ask = "SELECT id_status FROM user_info WHERE email = ?"
      const sql_query = mysql.format(sql_ask, [req.params.email])
      await connection.query(sql_query, async(err, result) => {
        connection.release()
        if (err) throw (err)
        request_id = result[0].id_status
        console.log(request_id+"request_id")
     
    console.log("Outside"+request_id)
    const options = {
      method: "POST",
      uri: "https://test.zoop.one/in/identity/okyc/otp/verify",
      body: JSON.stringify({
        data: {
          "request_id": request_id,
          "otp": req.body.aadhar_otp,
          "consent": "Y",
          "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "api-key": "ZH8FT37-FP3M42P-N4ENP58-VYSQ79J",
        "app-id": "61b2fd50260897001dc6f769",
      },
    };
    request(options)
      .then(function (response) {
        console.log(response);
        const response_1 = JSON.parse(response);
        console.log(response_1.response_code);
        // console.log(typeof response);
        console.log("The above is response code");
        if (response_1.response_code === "100") {
          console.log("OTP for aadhar verified");
          db.getConnection(async (err, connection) => {
            if (err) throw (err);
            const sql_ask = "UPDATE user_info SET id_status=?, fullname_as_per_id=? WHERE email=?"
            const sql_query = mysql.format(sql_ask, ["verified", response_1.result.user_full_name, req.params.email])
            await connection.query(sql_query, async (err, result) => {
              connection.release()
              if (err) throw (err)
              console.log("Successfully upated status and name for aadhar in the table")
            })
          })
        } else {
          console.log("Wrong Aadhar details");
        }
      })
      .catch((err) => console.log(err));
    })
  })
  }


  const contactnumber_otp = Number(req.body.contactnumber_otp);
  const email_otp = Number(req.body.email_otp);
  console.log(contactnumber_otp + 1);
  client.verify
    .services("VA93631cb6d4f234bb47db70626f38561a")
    .verificationChecks.create({ to: contact_number, code: contactnumber_otp })
    .then((verification_check) => {
      console.log(verification_check.status);
      if (verification_check.status === "approved") {
        console.log("The otp entered is correct, updating the data in table");
        db.getConnection(async (err, connection) => {
          const sql_update =
            "UPDATE user_info SET is_contactnumber_verified = ? WHERE Contact_number=?";
          const sql_query = mysql.format(sql_update, [1, contact_number]);
          await connection.query(sql_query, (err, result) => {
            if (err) throw err;
            connection.release();
            if (!err) {
              console.log(
                "Updated contactnumber verification status successfully"
              );
            }
          });
        });
      }
    });

  client.verify
    .services("VA93631cb6d4f234bb47db70626f38561a")
    .verificationChecks.create({ to: email, code: email_otp })
    .then((verification_check) => {
      console.log(verification_check.status);
      if (verification_check.status === "approved") {
        console.log(
          "The email otp entered is correct, updating the email verification data in table"
        );
        db.getConnection(async (err, connection) => {
          const sql_update =
            "UPDATE user_info SET is_email_verified = ? WHERE email=?";
          const sql_query = mysql.format(sql_update, [1, email]);
          await connection.query(sql_query, (err, result) => {
            if (err) throw err;
            connection.release();
            if (!err) {
              console.log("Updated email verification status successfully");
            }
          });
        });
      }
    });
});

//REFRESH TOKEN API
// app.post("/refreshToken", (req,res) => {
//     db.getConnection( async (err, connection) => {
//         if (err) throw (err);
//         const refreshToken = req.body.token;
//         const sql_search = "SELECT * FROM activeusers WHERE refresh_token = ?";
//         const sql_query = mysql.format(sql_search, [refreshToken]);
//         await connection.query ( sql_query, async(err, result) => {
//             if (err) throw (err);
//             if(result.length != 0)
//             {
//                 // if (!result.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
//                 // refreshTokens = refreshTokens.filter( (c) => c != req.body.token)
//                 //remove the old refreshToken from the refreshTokens list
//                 if(result.length != 0){
//                 const newaccessToken = generateAccessToken ({user: req.body.email})
//                 const newrefreshToken = generateRefreshToken ({user: req.body.email})
//                 //generate new accessToken and refreshTokens
//                 res.json ({accessToken: newaccessToken, refreshToken: newrefreshToken})
//                 const sql_replace = "UPDATE activeusers SET refresh_token = REPLACE(refresh_token, ?, ?)"
//                 const newsql_query = mysql.format(sql_replace, [refreshToken, newrefreshToken]);
//                 await connection.query (newsql_query, async(err, result) => {
//                     connection.release();
//                     if (err) throw (err);
//                     console.log("Updated the refresh token successsfully in database");
//                 })
//             }
//         }
//         })
//     })

// })

//REFRESH TOKEN API
app.post("/refreshToken", (req, res) => {
  if (!refreshTokens.includes(req.body.token))
    res.status(400).send("Refresh Token Invalid");
  refreshTokens = refreshTokens.filter((c) => c != req.body.token);
  //remove the old refreshToken from the refreshTokens list
  const accessToken = generateAccessToken({ user: req.body.name });
  const refreshToken = generateRefreshToken({ user: req.body.name });
  //generate new accessToken and refreshTokens
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

//Later do check whether record exists or not, I have left it for now..
// app.delete("/logout", (req,res)=>{
//     const refresh_token = req.body.token;
//     db.getConnection (async(err, connection) => {
//         if (err) throw (err);
//         const sql_delete = "DELETE FROM activeusers WHERE refresh_token=?";
//         const sql_query = mysql.format(sql_delete, [refresh_token]);
//         await connection.query (sql_query, (err, result) => {
//             connection.release();
//             if (err) throw (err);
//             console.log("Entry deleted successfully")
//         })
//     })
//     refreshTokens = refreshTokens.filter( (c) => c != req.body.token)
//     //remove the old refreshToken from the refreshTokens list
//     res.status(204).send("Logged out!")
// })

app.get("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((c) => c != req.body.token);

  //remove the old refreshToken from the refreshTokens list
  // res.cookie('jwt','', {maxAge: 1});
  // console.log("Logged Out!")
  res.status(204).send("Logged out!");
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Athena designed by Ayushman Choudhary', {
    expiresIn: maxAge
  })

}

// LOGIN (AUTHENTICATE USER)
app.post("/login", (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  var user_id = 0;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "Select * from user_info where email = ?";
    const search_query = mysql.format(sqlSearch, [user]);
    await connection.query(search_query, async (err, result) => {
      //   connection.release()

      if (err) throw err;
      user_id = result[0].user_id;
      console.log("the user id is " + user_id);
      if (result.length == 0) {
        console.log("--------> User does not exist");
        res.sendStatus(404);
      } else {
        const hashedPassword = result[0].password;
        //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
          console.log("---------> Login Successful");
          // res.send(`${user} is logged in!`)
          console.log("---------> Generating accessToken");
          // const token = generateAccessToken({ user: req.body.email })
          // console.log(token)
          // res.json({"accessToken": token})
          const accessToken = generateAccessToken({ user: req.body.email });
          const refreshToken = generateRefreshToken({ user: req.body.email });
          res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            userId: user_id,
          });
          // res.json({logged_in: true})
          console.log(accessToken);
          console.log(refreshToken);
          // const new_insert = "INSERT INTO activeusers VALUES (?, ?)";
          // const new_query = mysql.format(new_insert, [user, refreshToken]);
          // await connection.query(new_query, async (err, result) => {
          //     connection.release();
          //     if (err) throw (err);
          //     console.log("Successfully logged refreshtoken in the database");
          //     res.sendStatus(201);
          // })
        } else {
          console.log("---------> Password Incorrect");
          res.send("Password incorrect!");
        } //end of bcrypt.compare()
      } //end of User exists i.e. results.length==0
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.post()

app.post("/nftbought", (req, res) => {
  const user_id = req.body.user_id;
  const token_id = req.body.token_id;
  const contract_address = req.body.contract_address;
  const collection_name = req.body.collection_name;

  db.getConnection(async (err, connection) => {
    if (err) throw err;

    const sql_insert = "INSERT INTO nftowners VALUES (?,?,?,?,0)";
    //token_id and contract_address will be derived from the arweave, for now on we will use dummy_data;
    const sql_query = mysql.format(sql_insert, [
      user_id,
      token_id,
      contract_address,
      collection_name,
    ]);

    await connection.query(sql_query, (err, result) => {
      connection.release();
      if (err) throw err;
      console.log("New Data has been added");
      res.sendStatus(201);
    });
  });
});

app.get("/getEmail/:user_id", (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    sql_ask = "SELECT * FROM user_info WHERE user_id = ?";
    sql_query = mysql.format(sql_ask, [req.params.user_id]);
    await connection.query(sql_query, (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
        console.log("Email fetched successfully");
      }
    });
  });
});

app.get("/getUserDetails/:email", (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    sql_ask = "SELECT * FROM user_info WHERE email = ?";
    sql_query = mysql.format(sql_ask, [req.params.email]);
    await connection.query(sql_query, (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
        console.log("User details fetched successfully");
      }
    });
  });
});

app.get("/groups/:user_id", (req, res) => {
  console.log("got request to fetch data for user id= " + req.params.user_id);
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    sql_ask =
      "select owner_user_id, collectionName, Group_name, Group_id, Group_thumbnail from lazymintednfts,group_info where lazymintednfts.collectionName = group_info.collection_name AND lazymintednfts.owner_user_id=? GROUP BY group_id";
    sql_query = mysql.format(sql_ask, [req.params.user_id]);
    await connection.query(sql_query, (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
        console.log("Groups fetched successfully");
      }
    });
  });
});

app.get("/fetch_profile_nfts/:user_id", (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    console.log("user_id = ", req.params.user_id)
    // sql_ask = "Select * from nfts_created where user_id = ? Union Select * from nfts_created where nfts_created.idnfts_created in (select nftowners.idnfts_created from nftowners where nftowners.user_id = ?)"
    sql_ask = "Select * from lazymintednfts where owner_user_id=?"
    // connection.query(mysql.format(sql_ask, [req.params.user_id, req.params.user_id]), (err, result) => {
    connection.query(mysql.format(sql_ask, [req.params.user_id]), (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
        console.log("NFTs fetched successfully for profile");
        console.log(result);
      }
    })
  })
})

app.get("/fetch_profile_nfts_created/:user_id", (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    console.log("user_id = ", req.params.user_id)
    // sql_ask = "Select * from nfts_created where user_id = ? Union Select * from nfts_created where nfts_created.idnfts_created in (select nftowners.idnfts_created from nftowners where nftowners.user_id = ?)"
    sql_ask = "Select * from lazymintednfts where user_id=?"
    // connection.query(mysql.format(sql_ask, [req.params.user_id, req.params.user_id]), (err, result) => {
    connection.query(mysql.format(sql_ask, [req.params.user_id]), (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
        console.log("NFTs fetched successfully for profile");
        console.log(result);
      }
    })
  })
})


app.get("/fetchgroups", (req, res) => {
  console.log("got request to fetch data for groups");
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    sql_ask = "SELECT * FROM group_info";
    sql_query = mysql.format(sql_ask);
    await connection.query(sql_query, (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
        console.log("Groups fetched successfully");
      }
    });
  });
});

app.get("/fetchcomment/:group_id/:webpage_id", (req, res) => {
  var comment_id;
  console.log("Group-id: ", req.params.group_id);
  console.log("Webpage-id: ", req.params.webpage_id);
  db.getConnection((err, connection) => {
    if (err) throw err;
    sql_ask = "SELECT * FROM comments_table INNER JOIN likes_counter ON comments_table.comment_id = likes_counter.comment_id WHERE comments_table.Group_id=? AND comments_table.webpage_id=?";
    sql_query = mysql.format(sql_ask, [req.params.group_id, req.params.webpage_id])
    connection.query(sql_query, (err, result1) => {
      connection.release();
      if (err) throw err;
      if (!err) {
        res.send(result1);
        console.log("Comments & Likes fetched")
      }
      // connection.release();
      // if (!err) {
      //   comment_id = result1.comment_id;
      //   // res.send(result);
      //   console.log("comment fetched successfully");
      //   const sql_ask =
      //     "SELECT * FROM comments_table JOIN likes_counter USING (comment_id)";
      //   const sql_query = mysql.format(sql_ask, [comment_id]);
      //   connection.query(sql_query, (err, result) => {
      //     connection.release();
      //     if (err) throw err;
      //     console.log("Likes fetched successfully");
      //     res.send(result);
      //   });
      // } else console.log(err);
    }
    );
  });
});

app.get("/fetchimages/:group_id/:webpage_id", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    sql_ask = "SELECT * FROM images WHERE Group_id=? AND Webpage_id=?";
    sql_query = mysql.format(sql_ask, [req.params.group_id, req.params.webpage_id]);
    connection.query(sql_query, (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
        console.log("Images fetched successfully");
      }
    }
    );
  });
});

app.get("/list", (req, res) => {
  console.log(refreshTokens);
});
app.get("/like/:comment_id", (req, res) => {
  const comment_id = Number(req.params.comment_id);
  var new_likes = 0;
  db.getConnection(async (err, connection) => {
    const sql_ask = "SELECT * FROM likes_counter WHERE comment_id=?";
    const sql_query = mysql.format(sql_ask, [comment_id]);
    await connection.query(sql_query, (err, result) => {
      console.log("Likes update");
      // connection.release()
      if (err) throw err;
      console.log(result);
      new_likes = Number(result[0].No_of_likes + 1);
      // new_likes = 1;
      console.log("No. of total likes are" + new_likes);
      const sql_insert =
        "UPDATE likes_counter SET No_of_likes = ? WHERE comment_id=?";
      const sqlquery = mysql.format(sql_insert, [new_likes, comment_id]);
      connection.query(sqlquery, (err, result) => {
        connection.release();
        if (err) throw err;
        console.log("New_likes in 2nd query " + new_likes);
        console.log(comment_id);
        console.log(result);
        console.log("Likes column has been successfully updated");
      });
    });
  });
});

app.get("/getcreatednfts/:user_id", (req, res) => {
  const user_id = Number(req.params.user_id);
  db.getConnection(async (err, connection) => {
    const sql_ask = "SELECT * FROM nfts_created WHERE user_id = ?";
    const sql_query = mysql.format(sql_ask, [user_id]);
    await connection.query(sql_query, (err, result) => {
      connection.release();
      if (err) throw err;
      if (!err) {
        console.log("Fetched nfts created by user with user id: " + user_id);
        res.send(result);
      }
    });
  });
});

app.get("/getboughtnfts/:user_id", (req, res) => {
  console.log("Searching database...");
  const user_id = Number(req.params.user_id);
  var wallet_pub_key;
  db.getConnection(async (err, connection) => {
    const sql_ask = "SELECT * FROM user_info WHERE user_id=?";
    const sql_query = mysql.format(sql_ask, [user_id]);
    const sqlask = "SELECT * from nfts_created WHERE Sold_to_publickey=?";
    await connection.query(sql_query, async (err, result) => {
      if (err) throw err;
      wallet_pub_key = result[0].wallet_pub_key;
      const sqlquery = mysql.format(sqlask, [wallet_pub_key]);
      await connection.query(sqlquery, (err, result) => {
        connection.release();
        if (err) throw err;
        if (!err) {
          res.send(result);
          console.log(
            "Successfully fetched details of bought nfts for the user " +
            user_id
          );
        }
      });
    });
  });
});

app.post("/likenft/:idnfts_created", (req, res) => {
  const idnfts_created = Number(req.params.idnfts_created);
  var new_likes = 0;
  db.getConnection(async (err, connection) => {
    const sql_ask = "SELECT * FROM lazymintednfts WHERE id=?";
    const sql_query = mysql.format(sql_ask, [idnfts_created]);
    await connection.query(sql_query, (err, result) => {
      console.log("Likes update");
      // connection.release()
      if (err) throw err;
      console.log(result);
      new_likes = Number(result[0].no_of_likes + 1);
      // new_likes = 1;
      console.log("No. of total likes are" + new_likes);
      const sql_insert =
        "UPDATE lazymintednfts SET no_of_likes = ? WHERE id=?";
      const sqlquery = mysql.format(sql_insert, [new_likes, idnfts_created]);
      connection.query(sqlquery, (err, result) => {
        connection.release();
        if (err) throw err;
        console.log("New_likes in 2nd query " + new_likes);
        console.log(idnfts_created);
        console.log(result);
        console.log(
          "Likes column has been successfully updated in nfts_created table"
        );
      });
    });
  });
});

app.post("/comment", (req, res) => {
  const group_id = req.body.group_id;
  const webpage_id = req.body.webpage_id;
  const comments = req.body.comment;
  const user_id = req.body.user_id;
  //user_id is an int primary key unique for each email_id, passwords can be same for different users

  db.getConnection(async (err, connection) => {
    if (err) throw err;

    const sql_insert = "INSERT INTO comments_table VALUES (0, ?, ?, ?, ?) ";
    const sql_query = mysql.format(sql_insert, [
      group_id,
      webpage_id,
      comments,
      user_id,
    ]);
    const sqlinsert = "INSERT INTO likes_counter VALUES (0, ?)";
    const sqlQuery = mysql.format(sqlinsert, [0]);
    await connection.query(sql_query, (err, result) => {
      // connection.release();
      if (err) throw err;
      console.log(result);
      console.log("Comment has been successfully added");
      res.sendStatus(201);
    });
    await connection.query(sqlQuery, (err, result) => {
      if (err) throw err;
      connection.release();
      // res.sendStatus(201);
    });
  });
});

app.post("/createnft/:user_id", (req, res) => {
  console.log("Welcome");
  const user_id = req.params.user_id;
  const setFileUrl = req.body.setFileUrl;
  const metadataUrl = req.body.metadataUrl;
  const description = req.body.description;
  const name = req.body.name;
  console.log("Name here is " + name);
  const price = req.body.price;
  const collection_name = req.body.collection_name;
  console.log("here is what you are sending:");
  console.log(req);

  var user_pub_key, user_private_key;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const web3_connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const SQLquery =
      "SELECT wallet_pub_key, wallet_private_key from user_info WHERE user_id=?";
    const SQL_query = mysql.format(SQLquery, [user_id]);
    await connection.query(SQL_query, async (err, result) => {
      if (err) throw err;
      if (!err) {
        let user_private_key_string = result[0].wallet_private_key;
        user_private_key = user_private_key_string.split(",").map(Number);
        let secretKey = Uint8Array.from(user_private_key);
        let keypair = Keypair.fromSecretKey(secretKey);
        mint_nft(
          keypair,
          name,
          metadataUrl,
          setFileUrl,
          price,
          description,
          user_id,
          collection_name
        );
      }
    });
  });
});

app.post(
  "/upload/:group_id/:user_id/:webpage_id",
  upload.single("image"),
  (req, res, err) => {
    const dns_protocol_1 = req.body.dns_protocol_1;
    const dns_protocol_2 = req.body.dns_protocol_2;
    const dns_protocol_3 = req.body.dns_protocol_3;
    // if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    //     // res.send({ msg: 'Only image files (jpg, jpeg, png) are allowed!' })
    // };
    const image = req.file.filename;
    console.log(image);
    db.getConnection(async (err, connection) => {
      const sql_insert = "INSERT INTO images VALUES (0, ?, ?, ?, ?, ?, ?, ?)";
      const sql_query = mysql.format(sql_insert, [
        req.params.group_id,
        req.params.user_id,
        req.params.webpage_id,
        image,
        dns_protocol_1,
        dns_protocol_2,
        dns_protocol_3,
      ]);
      await connection.query(sql_query, (err, result) => {
        connection.release();
        if (err) throw err;
        console.log("Successfully Uploaded the image on server");
        if (!err) {
          res.send({ data: result, msg: "Your image has been updated" });
        }
      });
    });
  }
);

app.get("/fetch_nft_images", (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sql_query = "SELECT * FROM nft_images";
      await connection.query(sql_query, (err, result) => {
        if (err) throw err;
        connection.release();
        if (!err) {
          res.send(result);
          console.log("Successfully sent the nft images to frontend");
        }
      });
    });
    // await connection.query(sql_query, (err, result) => {
    //     if (err) throw (err);
    //     connection.release();
    //     if (!err) {
    //         res.send(result);
    //     }
    // })
  });
});

app.get("/show_nfts", (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sql_query = "SELECT * FROM nfts_created";
    await connection.query(sql_query, (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
      }
    });
  });
});

// app.get("/show_nfts_for_sale", (req, res) => {
//   db.getConnection(async (err, connection) => {
//     if (err) throw err;
//     const sql_query = "SELECT * FROM nfts_created WHERE is_sold=?";
//     const sql_Query_1 = mysql.format(sql_query, [0]);
//     await connection.query(sql_Query_1, (err, result) => {
//       if (err) throw err;
//       connection.release();
//       if (!err) {
//         res.send(result);
//         console.log("nfts to be sold", result);
//       }
//     });
//   });
// });

app.get("/show_nfts_for_sale", (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sql_query = "SELECT * FROM lazymintednfts WHERE available_for_sale=?";
    const sql_Query_1 = mysql.format(sql_query, [1]);
    await connection.query(sql_Query_1, (err, result) => {
      if (err) throw err;
      connection.release();
      if (!err) {
        res.send(result);
        // console.log("nfts to be sold", result);
      }
    });
  });
});


app.get("/fetchnfts/:group_id", (req, res) => {
  var collection_name, group_name;
  var nft_ids = [];
  console.log("fetching group info...");
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sql_query = "SELECT * FROM group_info WHERE Group_id=?";
    const sql_Query = mysql.format(sql_query, [req.params.group_id]);
    await connection.query(sql_Query, async (err, result1) => {
      if (err) {
        console.log(err);
        // connection.release();
      } else {
        console.log("no error");
        group = result1[0];
        collection_name = group.collection_name;
        group_name = group.Group_name;
        const sql_ask = "SELECT * FROM nftowners WHERE collection_name = ?";
        const sql_query_new = mysql.format(sql_ask, [collection_name]);
        await connection.query(sql_query_new, async (err, result) => {
          if (err) {
            // throw (err);
            console.log(err);
            console.log("No nft found");
          }
          if (result.length === 0) {
            connection.release();
            if (err) throw (err);
            else {
              console.log("Group info fetched");
              res.send({ group: group });
            }
          }
          for (var i = 0; i < result.length; i++) {
            nft_ids[i] = result[i].idnfts_created;
          }
          if (nft_ids.length > 0) {
            const sql_ask_new =
              "SELECT * FROM nfts_created WHERE idnfts_created IN (?)";
            const SQLQUERY = mysql.format(sql_ask_new, [nft_ids]);
            await connection.query(SQLQUERY, (err, result) => {
              connection.release();
              if (err) throw err;
              if (!err) {
                console.log("Great! NFTs of a particular group are fetched");
                res.send({ nft: result, group: group });
                // res.send(result)
              }
            });
          } else {
            console.log("No nft of this collection");
          }
        });
      }
    });
  });
});


// function verify_aadhar() {
//   const aadhar = req.body.aadhar;
// const options = {
//   method: "POST",
//   uri: "https://live.zoop.one/in/identity/okyc/otp/request",
//   body: JSON.stringify({
//     data: {
//       "customer_aadhaar_number": aadhar,
//       "consent": "Y",
//       "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
//     },
//   }),
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "*/*",
//     "api-key": "ZH8FT37-FP3M42P-N4ENP58-VYSQ79J",
//     "app-id": "61b2fd50260897001dc6f769",
//   },
// };
// request(options)
//     .then(function (response) {
//       console.log(response);
//       const response_1 = JSON.parse(response);
//       console.log(response_1.response_code);
//       // console.log(typeof response);
//       console.log("The above is response code");
//       if (response_1.response_code === "100") {
//         console.log("Successfull request for aadhar");
//         console.log(response_1.result.is_otp_sent);
//         console.log(response_1.result.is_number_linked);
//         console.log(response_1.result.is_aadhar_valid);
//         if(response_1result.is_number_linked && response_1.result.is_aadhar_valid && response_1.is_otp_sent)
//         {
//           aadhar_request_id[count_request_id] = response_1.request_id
//           count_request_id += 1
//         }
//         else {
//           console.log("Verification failed")
//         }
//       } else {
//         console.log("Wrong DL details");
//         return "not verified", "";
//       }
//     })
//     .catch((err) => console.log(err));
// }

function verify_kyc(aadhar, dl, passport, dob, chosen, user_id) {
  if (chosen == 2) {
    const options = {
      method: "POST",
      uri: "https://test.zoop.one/api/v1/in/identity/dl/advance",
      body: JSON.stringify({
        data: {
          customer_dl_number: dl,
          customer_dob: dob,
          consent: "Y",
          consent_text:
            "I hear by declare my consent agreement for fetching my information via ZOOP API",
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "api-key": "ZH8FT37-FP3M42P-N4ENP58-VYSQ79J",
        "app-id": "61b2fd50260897001dc6f769",
      },
    };
    console.log(options);
    console.log("Requesting to check DL..");

    request(options)
      .then(function (response) {
        console.log(response);
        const response_1 = JSON.parse(response);
        console.log(response_1.response_code);
        console.log(typeof response);
        console.log("The above is response code");
        if (response_1.response_code === "100") {
          console.log("Successfully verified DL");
          console.log(response_1.result.user_full_name);
          // return ["verified", response_1.result.user_full_name];
          db.getConnection(async (err, connection) => {
            if (err) throw (err);
            const sql_ask = "UPDATE user_info SET id_status=?, fullname_as_per_id=? WHERE user_id=?"
            const sql_query = mysql.format(sql_ask, ["verified", response_1.result.user_full_name, user_id])
            await connection.query(sql_query, async (err, result) => {
              connection.release()
              if (err) throw (err)
              console.log("Successfully upated status and name in the table")
            })
          })
        } else {
          console.log("Wrong DL details");
          return "not verified", "";
        }
      })
      .catch((err) => console.log(err));
  }

  // if(chosen == 1)
  // {
  //   // verify_aadhar();
  // }
  //Passport
  if (chosen == 3) {
    const options = {
      method: "POST",
      uri: "https://test.zoop.one/api/v1/in/identity/passport/lite",
      body: JSON.stringify({
        data: {
          customer_passport_number: "h22614XXX",
          passport_type: "P",
          passport_expiry_date: "30/12/20XX",
          customer_first_name: "RITESH MAHENXXX",
          customer_last_name: "KOtHARI",
          customer_dob: "09/06/19XX",
          customer_gender: "M",
          customer_country: "IND",
          consent: "Y",
          consent_text:
            "I hear by declare my consent agreement for fetching my information via ZOOP API",
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "api-key": "ZH8FT37-FP3M42P-N4ENP58-VYSQ79J",
        "app-id": "61b2fd50260897001dc6f769",
      },
    };
    console.log(options);
    console.log("Requesting to check DL..");

    request(options)
      .then(function (response) {
        console.log(response);
        const response_1 = JSON.parse(response);
        console.log(response_1.response_code);
        console.log(typeof response);
        console.log("The above is response code");
        if (response_1.response_code === "100") {
          console.log("Successfully verified DL");
          return "verified", response_1.result.user_full_name;
        } else {
          console.log("Wrong DL details");
          return "not verified", "";
        }
      })
      .catch((err) => console.log(err));
  }
}

app.post("/createUser", async (req, res) => {
  email = req.body.email;
  const fullname = req.body.fullname;
  var user_id;
  var requestid = "unverified";
  const password = await bcrypt.hash(req.body.password, 10);
  // const password = req.body.password;
  const isKYCdone = 0;
  contact_number = req.body.contact_number;
  const is_email_verified = req.body.is_email_verified;
  const is_contactnumber_verified = req.body.is_contactnumber_verified;
  const chosen = req.body.chosen; //1:aadhar, 2:dl, 3:passport
  const aadhar = req.body.aadhar;
  const dl = req.body.dl;
  const passport = req.body.passport;
  const dob = req.body.dob;
  // const returnedvalues = setTimeout(verify_kyc, 5000, [aadhar, dl, passport, dob, chosen]);
  let id_chosen, id_no;
  if (chosen == 1) {
    id_chosen = "Aadhar";
    id_no = aadhar;
  }
  if (chosen == 2) {
    id_chosen = "Driving License";
    id_no = dl;
  }
  if (chosen == 3) {
    id_chosen = "Passport";
    id_no = passport;
  }

  // create wallet for the user
  let keypair = Keypair.generate();
  console.log("Public key is: " + keypair.publicKey);
  const wallet_pub_key = keypair.publicKey.toString();
  const wallet_private_key = keypair.secretKey.toString();
  var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  await connection.requestAirdrop(keypair.publicKey, 1000000000);

  var myWallet = wallet['default'].generate();

  console.log(`Matic wallet Address: ${myWallet.getAddressString()}`);
  console.log(`matic wallet Private Key: ${myWallet.getPrivateKeyString()}`)

  client.verify
    .services("VA93631cb6d4f234bb47db70626f38561a")
    .verifications.create({
      to: contact_number,
      from: "+19844099186",
      channel: "sms",
    })
    .then((verification) => console.log(verification.status));

  client.verify
    .services("VA93631cb6d4f234bb47db70626f38561a")
    .verifications.create({ to: email, channel: "email" })
    .then((verification) => console.log(verification.sid));

  db.getConnection(async (err, connection) => {
    if (err) throw err;

    const SQLSearch = "SELECT * FROM user_info WHERE email=?";
    const search_query = mysql.format(SQLSearch, [email]);

    const sqlInsert =
      "INSERT INTO user_info VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";
    const insert_query = mysql.format(sqlInsert, [
      email,
      password,
      isKYCdone,
      fullname,
      contact_number,
      is_email_verified,
      is_contactnumber_verified,
      wallet_pub_key,
      wallet_private_key,
      Date.now(),
      id_chosen,
      id_no,
      requestid,// status
      //firstly it stores request_id for aadhar verification and later status
      fullname, // fullname_as_per_id,
      myWallet.getAddressString(),
      myWallet.getPrivateKeyString()
    ]);
    // console.log("Inserted");

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("Users with same email--");
      console.log(result.length);

      if (result.length != 0) {
        connection.release();
        console.log("User already exists, try different email");
        // res.sendStatus(409);
      } else {
        await connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("---> Created a new user");
          console.log(result.insertId);
          user_id = result.insertId




          console.log(requestid)
          res.sendStatus(201);
          console.log("Response sent")
          if (chosen == 1) {
            const options = {
              method: "POST",
              uri: "https://test.zoop.one/in/identity/okyc/otp/request",
              body: JSON.stringify({
                data: {
                  "customer_aadhaar_number": aadhar,
                  "consent": "Y",
                  "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
                },
              }),
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "api-key": "ZH8FT37-FP3M42P-N4ENP58-VYSQ79J",
                "app-id": "61b2fd50260897001dc6f769",
              },
            };
            request(options)
              .then(function (response) {
                console.log(response);
                response_1 = JSON.parse(response);
                console.log(response_1.response_code);
                // console.log(typeof response);
                console.log("The above is response code");
                if (Number(response_1.response_code) == 100) {
                  console.log("Successfull request for aadhar");

                  console.log(response_1.result.is_otp_sent);
                  console.log(response_1.result.is_number_linked);
                  console.log(response_1.result.is_aadhaar_valid);
                  if ((response_1.result.is_number_linked) && (response_1.result.is_aadhaar_valid) && (response_1.result.is_otp_sent)) {
                    console.log("Everything is fine")
                    requestid = response_1.request_id
                    console.log(requestid)
                    db.getConnection(async (err, connection) => {
                      if (err) throw (err);
                      const sql_ask = "UPDATE user_info SET id_status = ? WHERE user_id=?"
                      const sql_query = mysql.format(sql_ask, [response_1.request_id, user_id])
                      await connection.query(sql_query, (err, result) => {
                        connection.release()
                        if (err) throw (err)
                        console.log(result)
                      })
                    })
                  }
                  else {
                    console.log("Failed verification due to mobile number not linked or incorrect aadhar")
                  }
                }
              })
              .catch((err) => console.log(err));
          }
          if (chosen == 2) {
            verify_kyc(aadhar, dl, passport, dob, chosen, result.insertId);
          }
          //   const status = returnedvalues[0];
          //   const fullname_as_per_id = returnedvalues[1];
          //   console.log("Status and fullname below");
          //   console.log(status);
          //   console.log(fullname_as_per_id);
          // });

        });
      }
    });
  });
});

// app.get("/purchase/:nft_id/:user_id", (req, res) => {
//   console.log("Welcome to purchase this NFT");
//   const user_id_buyer = req.params.user_id;
//   let keypair_buyer, keypair, mintaddress, price;
//   db.getConnection(async (err, connection) => {
//     if (err) throw err;
//     const sql_ask = "SELECT * FROM nfts_created WHERE idnfts_created = ?";
//     const sql_query = mysql.format(sql_ask, [req.params.nft_id]);
//     const SQLASK = "SELECT wallet_private_key FROM user_info WHERE user_id = ?";
//     // const SQLquery2 = "SELECT public_mint_address FROM nfts_created WHERE idnfts_created = ?"
//     const SQLQUERY = mysql.format(SQLASK, [user_id_buyer]);
//     await connection.query(SQLQUERY, async (err, result) => {
//       // connection.release()
//       if (err) throw err;
//       let secretkey_buyer = Uint8Array.from(
//         result[0].wallet_private_key.split(",").map(Number)
//       );
//       keypair_buyer = Keypair.fromSecretKey(secretkey_buyer);
//     });
//     await connection.query(sql_query, async (err, result) => {
//       if (err) throw err;
//       // connection.release();
//       if (!err) {
//         console.log("NFT identified successfully");
//         mintaddress = result[0].public_mint_address;
//         price = result[0].price;
//         const user_id = result[0].user_id;
//         const new_query =
//           "SELECT wallet_private_key from user_info WHERE user_id=?";
//         const newsql_query = mysql.format(new_query, [user_id]);
//         await connection.query(newsql_query, async (err, result) => {
//           if (err) throw err;
//           connection.release();
//           const privatekey = result[0].wallet_private_key
//             .split(",")
//             .map(Number);
//           let secretKey = Uint8Array.from(privatekey);
//           keypair = Keypair.fromSecretKey(secretKey);
//           console.log("keypair");
//           console.log(keypair);
//           console.log("Calling the function transfer_token");
//           console.log("The user_idis " + user_id_buyer);

//           await transfer_token(
//             mintaddress,
//             keypair,
//             keypair_buyer,
//             user_id_buyer,
//             price
//           );
//         });
//       }
//     });
//   });
// });

app.post("/store_nft", upload.single("image"), (req, res) => {
  const setFileUrl = req.body.setFileUrl;
  // if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
  //     res.send({ msg: 'Only image files (jpg, jpeg, png) are allowed!' })
  // };
  const image = req.file.filename;
  console.log(image);
  db.getConnection(async (err, connection) => {
    const sql_insert = "INSERT INTO nft_images VALUES (0, ?, ?)";
    const sql_query = mysql.format(sql_insert, [image, setFileUrl]);
    const sql_ask = "SELECT nft_id FROM nft_images WHERE image_location = ?";
    const SQLQUERY = mysql.format(sql_ask, [image]);
    await connection.query(sql_query, async (err, result) => {
      if (err) throw err;
      // connection.release();
      console.log("Successfully Uploaded the NFT's image on server");
      if (!err) {
        await connection.query(SQLQUERY, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("The resulting nft_id is " + result[0].nft_id);
          res.send({ msg: result[0].nft_id });
        });
      }
    });
  });
});

// app.get("/fetch_nft_details/:nft_id", (req, res) => {
//   // const email = req.body.email;
//   // console.log(email);
//   db.getConnection(async (err, connection) => {
//     if (err) throw err;
//     const sql_ask =
//       "SELECT * FROM nfts_created JOIN nftowners USING (idnfts_created) WHERE idnfts_created=?";
//     const sql_query = mysql.format(sql_ask, [req.params.nft_id]);
//     await connection.query(sql_query, (err, result) => {
//       connection.release();
//       if (err) throw err;
//       if (!err) {
//         console.log(result);
//         res.send(result[0]);
//         console.log("Here is what is sent:");
//         console.log(result[0]);
//         console.log("Details of NFT has been sent");
//       }
//     });
//   });
// });

app.get("/fetch_nft_details/:nft_id", (req, res) => {
  // const email = req.body.email;
  // console.log(email);
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sql_ask =
      "SELECT * FROM lazymintednfts WHERE id=?";
    const sql_query = mysql.format(sql_ask, [req.params.nft_id]);
    await connection.query(sql_query, (err, result) => {
      connection.release();
      if (err) throw err;
      if (!err) {
        console.log(result);
        res.send(result[0]);
        console.log("Here is what is sent:");
        console.log(result[0]);
        console.log("Details of NFT has been sent");
      }
    });
  });
});






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////

app.post("/store_lazyMintedNFTs", upload.single("image"), (req, res) => {
  const name = req.body.name;
  const collectionName = req.body.collectionName;
  const description = req.body.description;
  const price = Number(req.body.price);
  console.log("Price"+price)
  const royalty = Number(req.body.royalty);
  console.log(royalty)
  const blockchain = req.body.blockchain;
  const user_id = req.body.user_id;
  const image = req.file.filename;
  const ipfs_url = req.body.ipfs_url;
  const fullFile = JSON.stringify(req.file)
  console.log(req.file)
  console.log(ipfs_url)

  const msg = {
    "name": name,
    "collectionName": collectionName,
    "description": description,
    "price": price,
    "blockchain": blockchain,
    "image": image
  }
console.log("While storing")
console.log(msg)
  const strMsg = JSON.stringify(msg)
  console.log(strMsg);
  let secretKey = '';
  let hash = '';
  let public_key = '';

  // getting private key of user to sign the message; also serves the purpose of getting publicKey of user
  db.getConnection(async (err, connection) => {
    const sql_ask = "SELECT wallet_private_key FROM user_info WHERE user_id = ?";
    const SQLQUERY = mysql.format(sql_ask, [user_id]);
    await connection.query(SQLQUERY, (err, result) => {
      connection.release();
      if (err) throw err;
      let private_key_string = result[0].wallet_private_key;
      let user_private_key = private_key_string.split(",").map(Number);
      secretKey = Uint8Array.from(user_private_key);

      let keypair = Keypair.fromSecretKey(secretKey);
      public_key = keypair.publicKey.toString();

      //signing the message and creating hash
      const sha256Hasher = crypto.createHmac("sha256", secretKey);
      hash = sha256Hasher.update(strMsg).digest("hex");
      console.log("hash is ", hash);


      // inserting data in database
      db.getConnection(async (err, connection) => {
        const sql_insert = "INSERT INTO lazymintednfts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const sql_query = mysql.format(sql_insert, [name, description, price, blockchain, image, collectionName, hash, public_key, 0, 0, user_id, fullFile, ipfs_url, "0", public_key, user_id, 0, royalty, 0, 1]);
        console.log(sql_query)
        const sql_ask = "SELECT id FROM lazymintednfts WHERE image = ?";
        const SQLQUERY = mysql.format(sql_ask, [image]);
        await connection.query(sql_query, async (err, result) => {
          if (err) throw err;
          // connection.release();
          console.log("Successfully Uploaded the NFT's image on server");
          if (!err) {
            await connection.query(SQLQUERY, (err, result) => {
              connection.release();
              if (err) throw err;
              console.log("The resulting nft_id is " + result[0].id);
              res.send({ msg: result[0].id });
            });
          }
        });
      });
    });

  });


});


app.get("/purchase/:nft_id/:user_id_buyer/:user_id_seller/:user_id_creator", (req, res) => {
  const user_id_buyer = req.params.user_id_buyer;
  const user_id_seller = req.params.user_id_seller;
  const user_id_creator = req.params.user_id_creator;
  const nft_id = req.params.nft_id;
  db.getConnection(async (err, connection) => {
    const sql_ask = "SELECT * FROM lazymintednfts WHERE id = ?";
    const SQLQUERY = mysql.format(sql_ask, [nft_id]);
    await connection.query(SQLQUERY, (err, result) => {
      connection.release();
      if (err) throw err;
      let data_nft = result[0]
      let data_buyer = {}
      let data_seller = {}
      let data_creator = {}

      // getting info of buyer:
      db.getConnection(async (err, connection) => {
        const sql_ask = "SELECT * FROM user_info WHERE user_id = ?";
        const SQLQUERY = mysql.format(sql_ask, [user_id_buyer]);
        await connection.query(SQLQUERY, (err, result) => {
          connection.release();
          if (err) throw err;
          data_buyer = result[0]
          let private_key_string = data_buyer.wallet_private_key;
          let user_private_key = private_key_string.split(",").map(Number);
          secretKey = Uint8Array.from(user_private_key);

          let keypair_buyer = Keypair.fromSecretKey(secretKey);

          db.getConnection(async (err, connection) => {
            const sql_ask = "SELECT * FROM user_info WHERE user_id = ?";
            const SQLQUERY = mysql.format(sql_ask, [user_id_creator]);
            await connection.query(SQLQUERY, (err, result) => {
              connection.release();
              if (err) throw err;
              data_creator = result[0]
              console.log("data_creator"+data_creator)
              let private_key_string = data_creator.wallet_private_key;
              let user_private_key = private_key_string.split(",").map(Number);
              secretKey = Uint8Array.from(user_private_key);
    
              let keypair_creator = Keypair.fromSecretKey(secretKey);

          // getting info of seller:
          db.getConnection(async (err, connection) => {
            const sql_ask = "SELECT * FROM user_info WHERE user_id = ?";
            const SQLQUERY = mysql.format(sql_ask, [user_id_seller]);
            await connection.query(SQLQUERY, (err, result) => {
              connection.release();
              if (err) throw err;
              data_seller = result[0]
              if(data_nft.primary_sale_done == 1) {
                royalty(data_buyer, data_seller, data_creator, data_nft.id)
              }
              else{
              let keypair = verifyMintingSignature(data_nft, data_seller)
              if (keypair !== false) {
                console.log("reached inside true bool")
                if (data_nft.blockchain === 'Solana') {
                  let res = mintNFTonSolana(keypair, data_nft.id, data_nft.price, keypair_buyer, user_id_buyer)
                  // console.log("after minting", res)
                }
                else{
                  let res = mintTokenEth(data_seller.matic_wallet_pub_key, data_seller.matic_wallet_private_key, data_nft.ipfs_url_metadata, data_buyer.matic_wallet_pub_key, data_nft.id, data_buyer.matic_wallet_private_key, data_nft.price)
                }
              }
            }
            });
          });
        });


        });
      });

      });

    });

  });
});


// function to verify lazyminted signature:
function verifyMintingSignature(data_nft, data_seller) {
  console.log(data_nft)
  console.log(data_seller)
  let private_key_string = data_seller.wallet_private_key;
  let user_private_key = private_key_string.split(",").map(Number);
  secretKey = Uint8Array.from(user_private_key);

  let keypair = Keypair.fromSecretKey(secretKey);
  public_key = keypair.publicKey.toString();

  const msg = {
    "name": data_nft.name,
    "collectionName": data_nft.collectionName,
    "description": data_nft.description,
    "price": data_nft.price,
    "blockchain": data_nft.blockchain,
    "image": data_nft.image
  }


  console.log(msg)
  const strMsg = JSON.stringify(msg)
  //signing the message and creating hash
  const sha256Hasher = crypto.createHmac("sha256", secretKey);
  hash = sha256Hasher.update(strMsg).digest("hex");
  if (hash === data_nft.hash) {
    console.log("hashes are equal")
    return keypair
  }
  else {
    console.log("hashes are not equal")
    console.log(hash)
    console.log(data_nft.hash)
    return false
  }

}

// to mint nft on solana

async function mintNFTonSolana(
  myKeypair,
  nft_id,
  price,
  keypair_buyer,
  to_user_id
) {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  await connection.requestAirdrop(myKeypair.publicKey, 1000000000);
  let mint;
  var myToken;
  setTimeout(async function () {
    //create mint
    mint = await splToken.Token.createMint(
      connection,
      myKeypair,
      myKeypair.publicKey,
      null,
      0,
      splToken.TOKEN_PROGRAM_ID
    );
    console.log("mint public address: " + mint.publicKey.toBase58());

    //get the token accont of this solana address, if it does not exist, create it
    myToken = await mint.getOrCreateAssociatedAccountInfo(myKeypair.publicKey);

    console.log("token public address: " + myToken.address.toBase58());
    await mint.mintTo(myToken.address, myKeypair.publicKey, [], 1);

    // Reset mint_authority to null from the user to prevent further minting
    await mint.setAuthority(
      mint.publicKey,
      null,
      "MintTokens",
      myKeypair.publicKey,
      []
    );

    console.log("done");
    db.getConnection(async (err, connection) => {
      const sql_query = "UPDATE lazymintednfts SET public_mint_address = ? WHERE id = ?;";
      const SQLQUERY = mysql.format(sql_query, [mint.publicKey.toBase58(), nft_id]);
      console.log(SQLQUERY)
      await connection.query(SQLQUERY, async (err, result) => {
        // connection.release();
        if (err) throw err;
        console.log("Successfully inserted data in lazymintednfts table");
        let ress = transferOnSolana(mint.publicKey.toBase58(), myKeypair, keypair_buyer, price, nft_id , to_user_id, 0, myKeypair, 0)
        console.log(ress)
      });
    });
  }, 20000);
};



async function transferOnSolana(tokenMintAddress, from, to, price, nft_id, to_user_id, is_secondary, original_creator, royalty) {
  let lamports;
  if (from.publicKey == to.publicKey) {
    console.log("Not possible, same buyer, same seller");
    return;
  }
  var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  await connection.requestAirdrop(to.publicKey, 1000000000);

  const mintPublicKey = new web3.PublicKey(tokenMintAddress);
  const mintToken = new splToken.Token(
    connection,
    mintPublicKey,
    splToken.TOKEN_PROGRAM_ID,
    from // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );
  setTimeout(async function () {

    let fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
      from.publicKey
    );
    let toTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
      to.publicKey
    );
    console.log("Sending to : " + toTokenAccount.address);

    var transaction = new web3.Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        from.publicKey,
        [],
        1
      )
    );

    var signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [from],
      { commitment: "confirmed" }
    );
    console.log("SIGNATURE: ", signature);
    let tokenBalance = await toTokenAccount.amount;
    console.log("token balance: ", tokenBalance);

    var newtransaction = await new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: to.publicKey,
        toPubkey: from.publicKey,
        lamports: Number(price) * web3.LAMPORTS_PER_SOL,
      })
    );

    var signature = await web3.sendAndConfirmTransaction(
      connection,
      newtransaction,
      [to],
      { commitment: "confirmed" }
    );
    console.log("SIGNATURE", signature);
    console.log(" SENT TO FROM.pub_key: SUCCESS");

    db.getConnection(async (err, connection1) => {
      const sql_ask =
        "UPDATE lazymintednfts SET primary_sale_done=?, owner=?, owner_user_id=?, public_mint_address=?, available_for_sale=? WHERE id = ?";

      const sql_query_new = mysql.format(sql_ask, [
        1,
        to.publicKey.toBase58(),
        to_user_id,
        tokenMintAddress,
        0,
        nft_id,
      ]);

      await connection1.query(sql_query_new, async (err, result) => {
        connection1.release();
        if (err) throw err;
        if (!err) {
          console.log("successfully manipulated the lazymintednfts table");
          if (is_secondary == 1)
          {
          //     var newtransaction1  = await new web3.Transaction().add(
          //     web3.SystemProgram.transfer({
          //     fromPubkey: to.publicKey,
          //     toPubkey: original_creator.publicKey,
          //     lamports: Number(royalty) * web3.LAMPORTS_PER_SOL,
          //     })
          //   );
        
          //  var signature1 = await web3.sendAndConfirmTransaction(
          //     connection,
          //     newtransaction1,
          //     [to],
          //     { commitment: "confirmed" }
          //   );

          var newtransaction1 = await new web3.Transaction().add(
            web3.SystemProgram.transfer({
              fromPubkey: to.publicKey,
              toPubkey: original_creator.publicKey,
              lamports: Number(royalty) * web3.LAMPORTS_PER_SOL,
            })
          );
      
          var signature1 = await web3.sendAndConfirmTransaction(
            connection,
            newtransaction1,
            [to],
            { commitment: "confirmed" }
          );
            console.log("Royalty SIGNATURE", signature1);
            console.log(" SENT Royalty TO FROM.pub_key: SUCCESS")
          }
        }
      });
    });
  }, 3000);


}
//#2 created nft
//#3 bought it and listed for sale


app.post(
  "/secondarysale/:id",
  (req, res, err) => {
    const secondaryprice = req.body.secondaryprice; //secondary price
    db.getConnection(async (err, connection) => {
      const sql_insert = "UPDATE lazymintednfts SET secondary_price = ?, available_for_sale=? WHERE id = ?"
      const sql_query = mysql.format(sql_insert, [
        Number(secondaryprice),
        1,
        Number(req.params.id)
      ]);
      await connection.query(sql_query, (err, result) => {
        connection.release();
        if (err) throw err;
        console.log("Successfully Uploaded the secondary price");
        if (!err) {
          // res.send({ data: result, msg: "Your image has been updated" });
        }
      });
    });
  }
);
   

  
  
function royalty(data_buyer, data_seller, data_creator, id) {
  let private_key_string = data_seller.wallet_private_key;
  let user_private_key = private_key_string.split(",").map(Number);
  let secretKey = Uint8Array.from(user_private_key);

  let mykeypair = Keypair.fromSecretKey(secretKey);

  let private_key_string1 = data_buyer.wallet_private_key;
  let user_private_key1 = private_key_string1.split(",").map(Number);
  let secretKey1 = Uint8Array.from(user_private_key1);

  let keypair_buyer = Keypair.fromSecretKey(secretKey1);

  let private_key_string2 = data_creator.wallet_private_key;
  let user_private_key2 = private_key_string2.split(",").map(Number);
  let secretKey2 = Uint8Array.from(user_private_key2);

  let keypair_original_creator = Keypair.fromSecretKey(secretKey2);
  console.log("Keypair original creator"+keypair_original_creator.publicKey)

  db.getConnection( async(err, connection) => {
    const sql_ask = "SELECT * from lazymintednfts where id=?"
    console.log(id)
    const sql_query = mysql.format(sql_ask, id)
    await connection.query(sql_query, async(err,result)=> {
      connection.release()
      if (err) throw (err)
      const royaltyprice = result[0].secondary_price*result[0].royalty/100
      console.log(royaltyprice)
      const price = result[0].secondary_price - royaltyprice
      let to_user_id = data_buyer.user_id
      console.log("to_user_id: "+to_user_id)
      const public_mint_address = result[0].public_mint_address
      console.log(public_mint_address)
      transferOnSolana(public_mint_address, mykeypair, keypair_buyer, price, id , to_user_id, 1, keypair_original_creator, royaltyprice )
    })
  })
}


// function to mint token on ethereum

const mintTokenEth = async (address, privateKey, metadataUri, toAddress, nft_id, to_privateKey, price) => {
  const Web3 = require('web3');
const {infura_provider, contractAbi, contractAddress} = require('./ContractInfo.js');
  const web3 = new Web3(infura_provider);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    contractAbi,
    contractAddress
  );

  const tx = myContract.methods.createToken(metadataUri);
  const gas = await tx.estimateGas({from: address});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: myContract.options.address, 
      data,
      gas,
      gasPrice,
      nonce, 
      chainId: networkId
    },
    privateKey
  );
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash for minting: ${receipt.transactionHash}`);
  const tokenNum =  await myContract.methods.get().call();
  transferTokenEth(address, toAddress, privateKey, tokenNum, nft_id, to_privateKey, price)
//   return receipt.transactionHash
}



// function to transfer token on ethereum
const transferTokenEth = async (address, toAddress, privateKey, tokenId, nft_id, to_privateKey, price) => {
  const Web3 = require('web3');
const {infura_provider, contractAbi, contractAddress} = require('./ContractInfo.js');
  const web3 = new Web3(infura_provider);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    contractAbi,
    contractAddress
  );

  const tx = myContract.methods.transferFrom(address, toAddress, tokenId);
  const gas = await tx.estimateGas({from: address});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: myContract.options.address, 
      data,
      gas,
      gasPrice,
      nonce, 
      chainId: networkId
    },
    privateKey
  );
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);

  // transfer money:

  var value = web3.utils.toWei(price.toString(), 'ether')

  var SignedTransaction = await web3.eth.accounts.signTransaction({
        to : address,
        value:value,
        gas: 2000000,

    }, to_privateKey)

  web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then(
        (receipt)=>{
            console.log(receipt)
        })


  db.getConnection(async (err, connection) => {
    const sql_ask =
      "UPDATE lazymintednfts SET primary_sale_done=?, owner=? WHERE id = ?";

    const sql_query_new = mysql.format(sql_ask, [
      1,
      toAddress,
      nft_id
    ]);

    await connection.query(sql_query_new, async (err, result) => {
      // connection.release();
      if (err) throw err;
      if (!err) {
        console.log("successfully manipulated the lazymintednfts table");

      }
    });
  });
  
}


