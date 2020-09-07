const types = {
      Address: "AccountId",
      LookupSource: "AccountId",
      TeaPubKey: "[u8; 32]",
      Url: "Bytes",
      Cid: "Bytes",
      RefNum: "H256",
      Result: "Bytes",
      Node: {
            "teaId": "TeaPubKey",
            "ephemeralId": "TeaPubKey",
            "profileCid": "Bytes",
            "urls": "Vec<Url>",
            "peerId": "Bytes"
      },
      Model: {
            "account": "AccountId",
            "payment": "u32",
            "cid": "Bytes"
      },
      Task: {
            "refNum": "RefNum",
            "delegatorTeaId": "TeaPubKey",
            "modelCid": "Bytes",
            "bodyCid": "Bytes",
            "payment": "Balance"
      },
      Deposit: {
            "delegatorTeaId": "TeaPubKey",
            "delegatorEphemeralId": "TeaPubKey",
            "delegatorSignature": "Bytes",
            "amount": "Balance",
            "expireTime": "u64"
      },
      Bill: {
            "employer": "AccountId",
            "delegatorTeaId": "TeaPubKey",
            "delegatorEphemeralId": "TeaPubKey",
            "errandUuid": "Bytes",
            "errandJsonCid": "Bytes",
            "executorEphemeralId": "TeaPubKey",
            "expiredTime": "u64",
            "resultCid": "Cid",
            "bills": "Vec<(AccountId, Balance)>"
      },
      Data: {
            "delegatorEphemeralId": "TeaPubKey",
            "deploymentId": "Cid",
            "cid": "Cid",
            "description": "Cid",
            "capChecker": "Cid"
      },
      Service: {
            "delegatorEphemeralId": "TeaPubKey",
            "deploymentId": "Cid",
            "cid": "Cid",
            "capChecker": "Cid"
      }
}

module.exports = types;