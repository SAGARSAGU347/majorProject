const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review")

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
       url:String,
       filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    },],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{                  //middleware for (if listing is made deleted then reviews of that listing to be deleted by using this code)
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
    }
});


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

