import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import Feedback from "./models/feedback.js"
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config()
const app=express()
app.get("/", (req, res) => {
    res.send("Student Feedback Manager API is running!");
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));
const PORT = 3000;
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((error)=>{
    console.log("MongoDB Connection Failde:", error);
    
})
app.post("/submit-feedback",async(req,res)=>{
    try{
    const {name, rate, comment}=req.body

    const newFeedback=new Feedback({
        name:name,
        rate:rate,
        comment:comment
    })


    await newFeedback.save()
    res.json({
    message:"Feedback submitted successfully"
    })
} catch(error){
    console.log("Error submitted feedback:",error);
    res.status(500).json({
        message:"Failed to submit feedback"
    })
    
}
})

app.get("/feedback",async(req,res)=>{
    try{
    const feedbacks=await Feedback.find()

    res.json(feedbacks)
    }
    catch(error){
        console.log("Error fetching feedback:", error);
        res.status(500).json({
            message:"Failed to fetch feedback"
        })
        
    }
})

app.delete("/feedback/:id", async(req,res)=>{
    try{
        const {id}=req.params;
        console.log("Deleting feedback id:", id);
        
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid feedback ID"
            })
        }
        const deleteFeedback=await Feedback.findByIdAndDelete(id)

        if(!deleteFeedback){
            return res.status(404).json({
                message: "Feedback not found"
            })
        }

        res.status(200).json({
            message: "Feedback deleted successfully"
     
        })
    } catch(error){
        console.log("Error Delecting Feedback:", error);

        res.status(500).json({
             message: error.message
        })
        
    }
})
app.listen(PORT,()=>{
    console.log(`Backend API: http://localhost:${PORT}`);
    console.log(`Frontend Form: http://localhost:${PORT}/index.html`);
    console.log(`All Feedback: http://localhost:${PORT}/feedback.html`);
});
    
