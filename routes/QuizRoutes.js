import express from 'express'
import { createQuiz, getQuizzes, getQuiz, deleteQuiz, getQuestions } from '../controller/QuizController.js';
import checkAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', checkAuth, createQuiz)
router.get('/', getQuizzes)
router.get('/questions',getQuestions)
router.get('/:id', getQuiz)
router.delete('/:id', checkAuth, deleteQuiz)


export default router;