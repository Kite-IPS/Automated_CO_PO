import mongoose from "mongoose";

const coPoSchema = new mongoose.Schema({
    course_code: {
        type: String,
        required: true,
    },
    course_name: {
        type: String,
        required: true,
    },
    faculty_name: {
        type: String,
    },
    academic_year: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    programme: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
    },
    regulation: {
        type: String,
        required: true,
    },
    numStudents: {
        type: Number,
        required: true,
    },
    numParts: {
        type: Number,
        required: true,
    },
    assessment_name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true,
    },
    file_path: {
        type: String,
    },
    questions: [
        {
            part: {
                type: String,
                required: true,
            },
            question_no: {
                type: Number,
                required: true,
            },
            marks: {
                type: Number,
                required: true,
            },
            co_mapping: {
                type: [String],
            },
            po_mapping: {
                type: [String],
            }
        }
    ]
}, { timestamps: true });

const CoPo = mongoose.model("CoPo", coPoSchema);

export default CoPo;