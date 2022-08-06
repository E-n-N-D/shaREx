const router = require("express").Router();
const teamCtrl = require("../controllers/teamCtrl");

router.post("/create", teamCtrl.createTeam);
router.post("/upload", teamCtrl.uploadFile);
router.get("/files", teamCtrl.getFiles);

router.get("/members", teamCtrl.getMembers);
router.post("/addMember", teamCtrl.addMember);
module.exports = router;
