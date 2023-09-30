import mongoose from 'mongoose';
import { QuestionSchema } from './Question.js';

const validLevels = ['easy', 'medium', 'hard'];


const QuizSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validLevels.includes(value.toLowerCase());
            },
            message: props => `${props.value} is not a valid level. Valid levels are: ${validLevels.join(', ')}.`
        }
    },
    questions: [QuestionSchema]
});

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;