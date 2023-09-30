import Quiz from "../models/Quiz.js";

const createQuiz = async (req, res) => {
    try 
    {
        const quiz = new Quiz(req.body);
        const quizSaved = await quiz.save();
        res.status(200).json(quizSaved);
    } 
    catch (error) 
    {
        const e = new Error('Issues creating the quiz.');
        res.status(403).json({ msg: e.message });
    }
};

const getQuizzes = async (req, res) => {
    try 
    {
        const quizzes = await Quiz.find();
        return res.status(200).json(quizzes);
    } 
    catch (error) 
    {
        const e = new Error('Unable to retrieve quizzes.');
        return res.status(403).json({ msg: e.message });
    }
};


const getQuestions = async (req, res) => {
    const { level } = req.query;
    try {
        if (level) {
            const quizzes = await Quiz.find({ level });

            const filteredQuizData = quizzes.map(quiz => {
                const filteredQuestions = quiz.questions.map(question => {
                    const correctAnswer = question.answers.find(answer => answer.answerCorrect);
                    return {
                        question: question.question,
                        correctAnswer: correctAnswer ? correctAnswer.answerText : null
                    };
                });
                return {
                    level: quiz.level,
                    questions: filteredQuestions
                };
            });

            return res.status(200).json(filteredQuizData);
        } 
        else 
        {
            return res.status(400).json({ msg: 'Please provide a level.' });
        }
    } catch (error) {
        const e = new Error('Unable to retrieve questions.');
        return res.status(403).json({ msg: e.message });
    }
};



// const getQuestions = async (req, res) => {
//     const { level } = req.query;

//     try {
//         let questions;

//         if (level) 
//         {
//             const quizzes = await Quiz.find({ level: level});
//             questions = quizzes.flatMap(quiz => quiz.questions);
//             console.log(questions.answers);
//         } 
//         else 
//         {
//             const quizzes = await Quiz.find();
//             questions = quizzes.flatMap(quiz => quiz.questions);
//         }

//         const filteredQuestions = questions.map(question => ({
//             question: question.question,
//             answers: question.answers.filter(answer => answer.answerCorrect)
//         }));
        

//         return res.status(200).json(filteredQuestions);
//     } 
//     catch (error) 
//     {
//         const e = new Error('Unable to retrieve questions.');
//         return res.status(403).json({ msg: e.message });
//     }
// };






const getQuiz = async (req, res) => {
    try 
    {
        const { id } = req.params;
        const quiz = await Quiz.findById(id);
        return res.status(200).json(quiz);
    } 
    catch (error) 
    {
        const e = new Error('Unable to retrieve the quizz.');
        return res.status(403).json({ msg: e.message });
    }
};

const deleteQuiz = async (req, res) => {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) 
    {
        return res.status(403).json({ msg: 'Quiz not found.' });
    }

    try 
    {
        await quiz.deleteOne();
        res.status(200).json({ msg: 'Quiz deleted successfully' });
    } 
    catch (error) 
    {
        const e = new Error('Unable to delete the quiz');
        res.status(403).json({ msg: e.message });
    }
};




export {
    createQuiz,
    getQuizzes,
    getQuiz,
    deleteQuiz,
    getQuestions
}
