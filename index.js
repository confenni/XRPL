import xrpl from "xrpl";

const main = async () => {
  // Define the network client
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  // test v1.0.1

  /**
   * ready account
   * seed account 1 = sEdTANMRTcwWtgbtLr6Aip5Btr6Rz77;
   * seed account 2 = sEdSTtMW7wdG2R17y7Nui41WiBLGARZ;
   * */

  // get account details (private key, public key, seed, address, and balance)
  const wallet = xrpl.Wallet.fromSeed("sEdTANMRTcwWtgbtLr6Aip5Btr6Rz77"); // account 1
  console.log(wallet) // show all data wallet
  console.log(wallet.address); // show address wallet
  const my_balance = await client.getXrpBalance(wallet.address);
  console.log(my_balance); // show balance address

  // prepared transaction to another accounts
  const prepared = await client.autofill({
    TransactionType: "Payment",
    Account: wallet.address, // from address xrp
    Amount: xrpl.xrpToDrops("100"), // amount send xrp
    Destination: "rfYxbv8BT3LbcQSNwAP863WDySwfYVKdqh", // to address xrp
  });
  const max_ledger = prepared.LastLedgerSequence;

  // preview transaction detail
  console.log("Prepared transaction instructions:", prepared);
  // preview transaction cost
  console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP");
  // expired ledger
  console.log("Transaction expires after ledger:", max_ledger);

  // sign the transaction (variable prepared)
  const signed = wallet.sign(prepared);
  console.log("\nIdentifying hash:", signed.hash);
  console.log("Signed blob:", signed.tx_blob);

  // send transaction xrp to destination
  const tx = await client.submitAndWait(signed.tx_blob);
  console.log("\n")
  console.log(tx);

  // check balance 2 accounts
  const my_balance1 = await client.getXrpBalance(wallet.address);
  console.log("\n" + my_balance1);
  const my_balance2 = await client.getXrpBalance(
    "rfYxbv8BT3LbcQSNwAP863WDySwfYVKdqh"
  );
  console.log(my_balance2);

  // dump test
  // ... custom code goes here
  // // console.log(client);
  // // Create a wallet and fund it with the Testnet faucet:
  // const fund_result = await client.fundWallet();
  // const test_wallet = fund_result.wallet;
  // console.log(fund_result);

  /**
   * untuk membuat wallet test xrp
   * cth output
   *
   * Wallet {
   *    publicKey: 'ED7457D28984C4D3756A0AE8FE0EECF56E2CC915E5AF6D501E240002D3F7B7E0D1',
   *    privateKey: 'ED248953F77EF37BE48C565C8E76A380B84DA5253F306B7141C8F00FF279016008',
   *    classicAddress: 'rhF7CzFGqYB6k6fjA2hV4p94YSFJRW6XwT',
   *    seed: 'sEd7279dmB1aYEkzZ7dM2dNc5uTmBxK'
   * }
   *  */
  // const test_wallet = xrpl.Wallet.generate();
  // console.log(test_wallet);
  // Create a wallet and fund it with the Testnet faucet:
  // let faucetHost = null;
  // let amount = "930";
  // const fund_result = (await client.fundWallet(null, { amount, faucetHost }))
  //   .wallet;
  // console.log(fund_result);

  // console.log(test_wallet.address);

  // Wallet {
  //   publicKey: 'ED97D81788F634AFC9EED4D4A84EE7EF46DA7A8FB0B9C93E85BB1732F1B273D61B',
  //   privateKey: 'EDA5EAC0F7832CD57DBA8448B1636D9190180B8A453F7BC52584EA4956FDAC302D',
  //   classicAddress: 'rfThdeYny8XHZTnDnNJYKjmrWUwgSLMiUz',
  //   seed: 'sEdSCvfVmmjSPYGFQWSUFbj9FsKACYv'
  // }

  /**
   * ambil detail wallet dari seed yang sudah didapatkan
   */
  // const test_wallet = xrpl.Wallet.fromSeed("sEd7279dmB1aYEkzZ7dM2dNc5uTmBxK") // Test secret; don't use for real
  // Get info from the ledger about the address we just funded
  // const response = await client.request({
  //   command: "account_info",
  //   account: "sEdTFW9PBVhWcUgpg4tiP8eaUxqZW8e",
  //   ledger_index: "validated",
  // });
  // console.log(response);

  // Example credentials
  // const wallet = xrpl.Wallet.fromSeed("snzf2j1vQThLLbTPN5huKRNS1KZcW");
  // const wallet = xrpl.Wallet.fromSeed("ss2oL9UWSpo9pYyjavWbsgVdMAMz3");
  // console.log(wallet.address); // rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH

  // const wallet = xrpl.Wallet.fromSeed("snzf2j1vQThLLbTPN5huKRNS1KZcW");
  // const prepared = await client.autofill({
  //   TransactionType: "Payment",
  //   Account: wallet.address,
  //   Amount: xrpl.xrpToDrops("22"),
  //   Destination: "rN4cGLksuzShJQ1GPbafCmKa2YNfcN4B8Y",
  // });
  // const max_ledger = prepared.LastLedgerSequence;
  // console.log("Prepared transaction instructions:", prepared);
  // console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP");
  // console.log("Transaction expires after ledger:", max_ledger);

  // Disconnect when done (If you omit this, Node.js won't end the process)
  await client.disconnect();
};

main();
