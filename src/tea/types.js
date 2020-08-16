const types = {
      Address: "AccountId",
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
            "delegateTeaId": "TeaPubKey",
            "modelCid": "Bytes",
            "bodyCid": "Bytes",
            "payment": "Balance"
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