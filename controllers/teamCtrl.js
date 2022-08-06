const Teams = require("../models/teamModel");
const web3 = require("web3.storage");

const teamCtrl = {
  createTeam: async (req, res) => {
    try {
      const name = "test_team"
      const memberWallets = Array("1", "2", "3")
      const transactionIDs = Array("1t", "2t", "3t")

      // const {
      //   name,
      //   memberWallets,
      //   transactionIDs,
      // } = req.body;

      const newTeam = new Teams({
        name,
        memberWallets,
        transactionIDs,
      });
      await newTeam.save();

      return res.status(200).json({ msg: "hello world" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addMember: async (req, res) => {
    try {

      const team_name = "test_team"
      const wallet_address = req.body.walletID

      await Teams.findOneAndUpdate(
        { name: team_name },
        {
          $push: { memberWallets: wallet_address }
        },
        (err, result) => {
          if (err) {
            return res.status(400).json(err.msg);
          }
          res.redirect('/team/members');
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }

  },
  uploadFile: async (req, res) => {
    try {

      if (!req.files) {
        return res.send({
          status: false,
          message: 'No file uploaded'
        });
      } else {

        
        
        const client = makeStorageClient()
        var rootCid = await client.put(req.files)
        
        // Get submitted file

        // Upload said file

        // add to blockchain

        //get transaction id

        const team_name = "test_team"
        const transactionID = "1234567890"

        await Teams.findOneAndUpdate(
          { name: team_name },
          {
            $push: { transactionIDs: transactionID }
          },
          (err, result) => {
            if (err) {
              return res.status(400).json(err.msg);
            }
            res.json({ msg: "file uploaded successfully", "transaction_id": transactionID });
          }
        );

      }


    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },
  getFiles: async (req, res) => {
    try {
      const team_name = "test_team"
      const team = await Teams.find({ name: team_name });

      const transactions = team[0].transactionIDs

      //get all the files from transactions
      res.json({ "team": team_name, "transactionIDs": transactions });
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },
  getMembers: async (req, res) => {
    try {
      const team_name = "test_team"
      const team = await Teams.find({ name: team_name });

      const members = team[0].memberWallets

      //get all the files from transactions
      res.json({ "team": team_name, "memberWallets": members });
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },
};

function getAccessToken() {
  const token = process.env.STORAGE_API_TOKEN;
  return token
}

function makeStorageClient() {
  return new web3.Web3Storage({ token: getAccessToken() })
  
}

async function retrieve(cid) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }

  // response to file obtained
}


async function retrieveFiles(cid) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
  }

  // unpack File objects from the response

  const files = await res.files()
  for (const file of files) {
    console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
  }
}



module.exports = teamCtrl;
