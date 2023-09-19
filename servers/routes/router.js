const express = require("express");
const router = new express.Router();
const products = require("../models/ProductsSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");
//products get k liye api
router.get("/getproducts", async (req, res) => {
  try {
    const producstdata = await products.find();
    console.log("products got");
    return res.status(201).json(producstdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get individual data

// getindividual

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
   // console.log(id);

    const individual = await products.findOne({ id: id });
    console.log("products got now");

    return res.status(201).json(individual);
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ error: "An error occurred while retrieving the data" });
  }
});

//register
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;
  if (!fname || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ error: "fill the all details" });
    //console.log("No data found");
  }

  try {
    const preuser = await User.findOne({ email: email });

    if (preuser) {
      return res.status(422).json({ error: "This email is already present" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const finaluser = new User({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      //Hashing the password

      const storedata = await finaluser.save();

     // console.log(storedata);
     console.log("registeration successful");
      return res.status(201).json(storedata);
    }
  } catch (error) {
    console.log("error in register" + error.message);
    return res.status(422).send(error);
  }
});

//login user

router.post("/login", async (req, res) => {
  
  const { email, password } = req.body;
  //console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({ error: "fill the LOGIN details" });
  }

  try {
    const userlogin = await User.findOne({ email: email });
    //console.log(userlogin);
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      //console.log(isMatch);

      const token = await userlogin.generateAuthtoken();
      console.log(token);

      res.cookie("amazonweb", token, {
        expires: new Date(Date.now() + 2589000),
        httpOnly: true,
      });
      if (!isMatch) {
        return res.status(400).json({ error: "invalid crediential pass" });
      } else {
        console.log("login successful");
        return res.status(201).json(userlogin);
       
      }
    } else {
      return res.status(400).json({ error: "user not exist" });
    }
  } catch (error) {
    return res.status(400).json({ error: "invalid crediential pass" });
    // console.log("error at here" + error.message);
  }
});


//add cart api

router.post("/addcart/:id",authenicate, async (req, res) => {

  try {
    console.log("perfect 6");
    const { id } = req.params;
    const cart = await products.findOne({ id: id });
    console.log(cart + "cart value");
    const Usercontact = await User.findOne({ _id: req.userID });

    
    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);

      await Usercontact.save();
      console.log("cart data added");
      
      res.status(201).json(Usercontact);
  }
} catch (error) {
    console.log(error);
}
  
});


// get cart details

router.get("/cartdetails", authenicate, async (req, res) => {
  try {
      const buyuser = await User.findOne({ _id: req.userID });
      console.log( "cartdetails achieved");

      res.status(201).json(buyuser);

  } catch (error) {
      console.log(error + "error for buy now");
  }
});


//get valid user
router.get("/validuser", authenicate, async (req, res) => {
  try {
      const validuserone = await User.findOne({ _id: req.userID });
     // console.log(validuserone + "user hain home k header main pr");
     console.log("valid user got");
      res.status(201).json(validuserone);
  } catch (error) {
      console.log(error + "error for valid user");
  }
});

//delete items from cart 
router.delete("/remove/:id", authenicate,async (req, res) => {
   try{
     
    const {id} =req.params;
    req.rootUser.carts=req.rootUser.carts.filter((cval) =>{
      return cval.id!=id;
    });

    req.rootUser.save();
     res.status(201).json(req.rootUser);
     console.log("Items remove");

   }catch(error){
    console.log(error);
    
res.status(400).json(req.rootUser);

   }
})
//logout a user 

router.get("/logout", authenicate, async (req, res) => {
  try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
          return curelem.token !== req.token
      });

      res.clearCookie("amazonweb", { path: "/" });
      req.rootUser.save();
      res.status(201).json(req.rootUser.tokens);
      console.log("user logout Done.");

  } catch (error) {
      console.log(error + "jwt provide then logout");
  }
});
module.exports = router;
