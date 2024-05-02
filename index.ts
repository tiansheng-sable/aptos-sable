import { Aptos } from '@aptos-labs/ts-sdk'

const aptos = new Aptos()
const transaction = await aptos.transferCoinTransaction({
  sender: alice,
  recipient: bob.accountAddress,
  amount: 100,
})

const pendingTransaction = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction,
});

const alice: Account = Account.generate();

// create the account on chain
await aptos.fundAccount({
  accountAddress: alice.accountAddress,
  amount: 100000000,
});

// submit transaction to transfer APT coin from Alice to Bob
const bobAddress = "0xb0b";

const transaction = await aptos.transaction.build.simple({
  sender: alice.accountAddress,
  data: {
    function: "0x1::aptos_account::transfer_coins",
    typeArguments: ["0x1::aptos_coin::AptosCoin"],
    functionArguments: [bobAddress, 100],
  },
});

// using sign and submit separately
const senderAuthenticator = aptos.transaction.sign({
  signer: alice,
  transaction,
});
const pendingTransaction = await aptos.transaction.submit.simple({
  transaction,
  senderAuthenticator,
});
