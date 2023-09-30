import Question from "../models/Question.js"


const createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        const questionSaved = await question.save();
        res.status(200).json(questionSaved)
    } 
    catch (error) 
    {
        res.status(500).json({msg: 'error'})
    }
}

export {
    createQuestion
}