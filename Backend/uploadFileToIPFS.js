const { create } = require("ipfs-http-client");
// const fs = require("fs")
async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https"
        }
    );
    return ipfs;
}


async function saveText() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add("`welcome ${new Date()}`");
    console.log(result);
}

saveText()