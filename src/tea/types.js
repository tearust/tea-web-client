const types = {
      Address: "AccountId",
      TeaPubKey: "[u8; 32]",
      Url: "Bytes",
      RefNum: "H256",
      Result: "Bytes",
      Node: {
            "teaId": "TeaPubKey",
            "ephemeralId": "TeaPubKey",
            "profileCid": "Bytes",
            "urls": "Vec<Url>"
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
      }
}

module.exports = types;