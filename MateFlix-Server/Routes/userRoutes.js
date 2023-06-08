const { addToLikedMovies, getLikedMovies, removeFromLikedMovies } = require("../Controller/userController");

const router = require("express").Router();

router.post("/add",addToLikedMovies);
router.get("/liked/:email", getLikedMovies)
router.put("/remove",removeFromLikedMovies)

module.exports = router;