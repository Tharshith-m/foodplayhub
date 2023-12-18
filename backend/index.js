const express=require('express') //backend
const mongoose = require('mongoose') //database
const cors = require('cors'); // access to frontend page 
const devuser=require('./usermodel')
const upload=require('./Upload') 
const purchase=require('./Purchase')
const details=require('./details')
const jwt =require("jsonwebtoken") 
const middleware=require('./middleware')
const app=express();

// app.use(cors({
//     origin: 'http://localhost:3000', // Replace with your React app's URL
//   }));
app.use(cors());
mongoose.connect('mongodb+srv://Tharshith:Tharshith@cluster0.hcw95pq.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>console.log("Db is connected.......")
)
app.use(express.json()) 


app.get('/',(req,res)=>{
    return res.send('Hello world')
})

// register user signup page
app.post('/signup',async(req,res)=>{
    try{
        const {name,email,photo,place,password,confirmpassword}=req.body;
        const exist=await devuser.findOne({email});
        if(exist){
            return  res.status(400).send('User Already exist')
        } 
        if(password !== confirmpassword){
            return res.status(403).send('Password Invalid')
        }
        let newUser=new devuser({
            name,email,photo,place,password,confirmpassword
        })
        newUser.save();
        // return res.status(200).send('User Registered')
        return res.status(200).json({ message: 'User Registered' });



    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server error')
    }
})

  




// login page 
app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        // console.log(email+"backend")
        const exist=await devuser.findOne({email});
        if(!exist){
            return res.status(400).send('User not exist') 
        }
        if(exist.password !== password){
            return res.status(400).send('Password Invalid')
        }
        let payload = {
            user :{
                id:exist.id 
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:360000000},
        (err,token)=>{ 
            if (err) throw err
            return res.json({token})

        })


    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server error')
    }
})



// all profiles for admin
app.get('/allprofiles',middleware,async(req,res)=>{
    let allprofiles=await devuser.find();
    return res.json(allprofiles);
})


// myprofile
app.get('/myprofile', middleware, async (req, res) => {
    try {
        // let profileuser = await devuser.findById(req.user.id);
        let videousers = await upload.find({});
        // return res.json({ profileuser, videousers });
        // return res.json(videousers);
        let exist= await devuser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json({exist,videousers}) ;
        // return res.json(exist);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
    }
});

// upload 
app.post('/upload',async(req,res)=>{
    try{
        const {hotel,price,video,place,rating}=req.body;

          // Log the received data
          console.log('Received data:', req.body);
        let newdata=new upload({ hotel,price,video,place,rating})
        newdata.save()
        return res.status(200).json({ message: 'data saved' });
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server error')
    }
}) 



app.post('/purchase',async(req,res)=>{
    try{
        const{email,hotel,price,place}=req.body;
        console.log('received data:',req.body);
        let purchasedata=new purchase({email,hotel,price,place})
        purchasedata.save()
        return res.status(200).json({message:'saved'});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server error')
    }

})


app.post('/getinfo',async (req, res) => {
    try {
        // console.log(res)
      const  {email}  = req.body;
      console.log(email)
  
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
  
      const user = await devuser.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Assuming 'devuser' has properties like name, photo, place, etc.
      const { name, photo, place } = user;
  
      // Send the user data as a response
      res.status(200).json({ name, photo, place });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

app.listen(5000,()=>console.log('server is running........'))