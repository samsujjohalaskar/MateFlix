const User = require("../Models/userModel");

module.exports.addToLikedMovies = async(req,res) => {
    try{
        const {email,data} = req.body;
        const user = await User.findOne({email})
        if(user){
            const {likedMovies} = user;
            const moviesAlreadyLiked = likedMovies.find(({id}) => (id === data.id));
            if(!moviesAlreadyLiked){
                await User.findByIdAndUpdate(user._id, {
                    likedMovies: [...user.likedMovies, data],
                },
                {new:true}
                )
            }else return res.json({msg: "Already Added to the Liked List."});

        }else await User.create({email,likedMovies: [data]})

        return res.json({msg: "Added to the List Successfully."})

    }catch(error){
        return res.json({msg:"Error Occured While Adding Movie."})
    }
}

module.exports.getLikedMovies = async(req,res) => {
    try{
        const {email} = req.params;
        const user = await User.findOne({email})
        if(user){
            res.json({msg: "Success",movies: user.likedMovies})
        }else{
            return res.json({msg: "User Not Found."})
        }
    }catch(err){
        return res.json({msg: "Error Occured While Fetching Movies."})
    }
}

module.exports.removeFromLikedMovies = async(req,res) => {
    try {
        const {email,movieId} = req.body;
        const user = await User.findOne({email})
        if(user){
            const {likedMovies} = user;
            const movieIndex = likedMovies.findIndex(({id}) => (id === movieId));
            if(!movieIndex) res.status(400).send({msg: "Movie Not Found."})
            likedMovies.splice(movieIndex,1);
            await User.findByIdAndUpdate(user._id, {
                likedMovies,
            },
            {new:true}
            )
            return res.json({msg: "Movie Removed.",movies: likedMovies})      
        }  
    } catch (error) {
        return res.json({msg: "Error Occured While Removing Movies."})
    }
}