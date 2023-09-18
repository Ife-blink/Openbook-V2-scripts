# Openbook-V2-scripts
This is an update to the https://github.com/openbook-dex/scripts-v2 by Binye
It provides more documented instructions to get started with Openbook-V2 in anticipation for the hyperdrive hackathon
First install the solana cli
```sh -c "$(curl -sSfL https://release.solana.com/v1.16.13/install)"```
Then save the anchor wallet as your stored keypair
```export ANCHOR_WALLET="/home/gitpod/.config/solana/id.json"```
The file path ```"/home/gitpod/.config/solana/id.json``` is my path make sure to use yours
I made a pull request to Openbook-V2 because the client didnt suppor versioned transactions but until they merge we will make do with our own client.
You can find it in the ./ts folder and it works directly with the Openbook IDL
You can run any of the scripts it works out of the box

