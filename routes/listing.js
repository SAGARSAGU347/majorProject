const express=require("express");
const router= express.Router();

const wrapAsync = require("../utils/wrapAsync.js"); 
const Listing=require("../models/listing.js");
const{isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

const listingController=require("../controllers/listings.js");


router
.route("/")
.get(wrapAsync(listingController.index))    //index route
.post(isLoggedIn,
   
   upload.single('listing[image]'),
   validateListing,
    wrapAsync(listingController.createListing));               //create route(post new hotel)  //this validate listing is from joi to verify server side validation ****  



//new router
router.get("/new",isLoggedIn,listingController.renderNewForm);


router
.route("/:id")
.get(wrapAsync(listingController.showListing))                //show route
.put(                                                         //update route
   isLoggedIn,
   isOwner,
   upload.single('listing[image]'),
   validateListing,wrapAsync(listingController.updateListing))
.delete(                                                    //DELETE ROUTE
   isLoggedIn,
   isOwner,wrapAsync(listingController.deleteListing));
 
 //edit route
 router.get("/:id/edit",
    isLoggedIn,
    isOwner,wrapAsync(listingController.renderEditForm));
 
 module.exports=router;