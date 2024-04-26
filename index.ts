import { Aptos } from '@aptos-labs/ts-sdk'

const aptos = new Aptos()
const transaction = await aptos.transferCoinTransaction({
  sender: alice,
  recipient: bob.accountAddress,
  amount: 100,
})
