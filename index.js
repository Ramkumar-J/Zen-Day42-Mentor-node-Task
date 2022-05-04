const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
const mongodb=require("mongodb");
app.use(express.json());
const mongoClient=mongodb.MongoClient;
const URL="mongodb+srv://ramkumar:admin123@cluster0.3hd98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Create Mentor
app.post("/mentor",async (req,res) => {
    try {
        let connection=await mongoClient.connect(URL);
        let db=connection.db("mentor-student");
        await db.collection("mentors").insertOne(req.body);
        await connection.close();
        res.json({message:"Mentor Added"});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }    
})

// Read Mentor
app.get("/mentor",async (req,res) => {
    try {
        let connection=await mongoClient.connect(URL);
        let db=connection.db("mentor-student");
        let mentors=await db.collection("mentors").find().toArray();
        await connection.close();
        res.json(mentors);  
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    } 
})

// Create Student
app.post("/student",async (req,res) => {
    try {
        let connection=await mongoClient.connect(URL);
        let db=connection.db("mentor-student");
        await db.collection("students").insertOne(req.body);
        await connection.close();
        res.json({message:"Student Added"});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }    
})

// Read Student
app.get("/student",async (req,res) => {
    try {
        let connection=await mongoClient.connect(URL);
        let db=connection.db("mentor-student");
        let students=await db.collection("students").find().toArray();
        await connection.close();
        res.json(students);  
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    } 
})

// Read one particular Mentor detail
app.get("/mentor/:id",async (req,res) => {
    try {
        let connection=await mongoClient.connect(URL);
        let db=connection.db("mentor-student");
        let mentor=await db.collection("mentors").findOne({_id:mongodb.ObjectId(req.params.id)});
        await connection.close();
        res.json(mentor);
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
    
})

// Assign a Student to Particular Mentor
app.put("/mentor/:id",async (req,res) => {
    try {
        let connection=await mongoClient.connect(URL);
        let db=connection.db("mentor-student");
        await db.collection("mentors").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body});
        await connection.close();
        res.json({message:"Student assigned"});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
})

// Read one particular Student detail
app.get("/student/:id",async (req,res) => {
    try {
        let connection=await mongoClient.connect(URL);
        let db=connection.db("mentor-student");
        let student=await db.collection("students").findOne({_id:mongodb.ObjectId(req.params.id)});
        await connection.close();
        res.json(student);
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }   
})

// Change or Modify Mentor to a Particular Student
app.put("/student/:id",async (req,res) => {
    try {
        let connection=await mongoClient.connect(URL);
        let db=connection.db("mentor-student");
        await db.collection("students").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body});
        await connection.close();
        res.json({message:"Mentor assigned"});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
})

app.listen(process.env.PORT || 3001,() => {
    console.log("webserver on");
});