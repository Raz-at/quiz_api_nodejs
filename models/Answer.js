import mongoose from 'mongoose';

export const AnswerSchema = mongoose.Schema({
    answerItem: {
        type: String,
        required: true
    },
    answerText: {
        type: String,
        required: true
    },
    answerCorrect: {
        type: Boolean,
        required: true
    }
});


const Answer = mongoose.model("Answer", AnswerSchema);
export default Answer;