import mongoose from "mongoose";

const coPoSchema = new mongoose.Schema({
    course_code:{
        type:String,
        required:true,
    },
    course_name:{
        type:String,
        required:true,
    },
    faculty_name:{
        type:String,
    },
    academic_year:{
        type:String,
        required:true,
    },
    semester:{
        type:String,
        required:true,
    },
    programme:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        enum:[1,2,3,4],
        required:true,
    }
})