import mongoose from 'mongoose';
import Answer, { AnswerSchema } from './Answer.js';

export const QuestionSchema =  mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answers: [AnswerSchema]
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;