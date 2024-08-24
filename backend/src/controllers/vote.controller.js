import { Question } from "../models/question.model.js";
import pusher from "../utils/pusher.js";

const upvoteQuestion = async (req, res) => {
    const { id } = req.params;
    const { mail } = req.body;

    const question = await Question.findById(id).exec();
    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }
    if (question.upvotedBy.includes(mail)) {
        return res.status(400).json({ error: "Already upvoted" });
    }
    if (question.downvotedBy.includes(mail)) {
        question.downvotedBy = question.downvotedBy.filter((e) => e !== mail);
        question.downvotes -= 1;
    }
    question.upvotedBy.push(mail);
    question.upvotes += 1;
    await question.save();
    pusher.trigger(`questions-${id}`, 'question-updated', {
        id: question._id,
    });
    return res.status(200).json(question);
};

const downvoteQuestion = async (req, res) => {
    const { id } = req.params;
    const { mail } = req.body;

    const question = await Question.findById(id).exec();
    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }
    if (question.downvotedBy.includes(mail)) {
        return res.status(400).json({ error: "Already downvoted" });
    }
    if (question.upvotedBy.includes(mail)) {
        question.upvotedBy = question.upvotedBy.filter((e) => e !== mail);
        question.upvotes -= 1;
    }
    question.downvotedBy.push(mail);
    question.downvotes += 1;
    await question.save();
    pusher.trigger(`questions-${id}`, 'question-updated', {
        id: question._id,
    });
    return res.status(200).json(question);
};

const upvoteAnswer = async (req, res) => {
    const { id } = req.params;
    const { mail,answerId } = req.body;

    const question = await Question.findById(id).exec();
    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }
    const answer = question.answers.id(answerId);
    if (!answer) {
        return res.status(404).json({ error: "Answer not found" });
    }
    if (answer.upvotedBy.includes(mail)) {
        return res.status(400).json({ error: "Already upvoted" });
    }

    if (answer.downvotedBy.includes(mail)) {
        answer.downvotedBy = answer.downvotedBy.filter((e) => e !== mail);
        answer.downvotes -= 1;
    }
    answer.upvotedBy.push(mail);
    answer.upvotes += 1;
    await question.save();
    pusher.trigger(`questions-${id}`, 'question-updated', {
        id: question._id,
    });
    return res.status(200).json(question);
};

const downvoteAnswer = async (req, res) => {
    const { id } = req.params;
    const { mail,answerId } = req.body;

    const question = await Question.findById(id).exec();
    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }
    const answer = question.answers.id(answerId);
    if (!answer) {
        return res.status(404).json({ error: "Answer not found" });
    }

    if (answer.downvotedBy.includes(mail)) {
        return res.status(400).json({ error: "Already downvoted" });
    }
    if (answer.upvotedBy.includes(mail)) {
        answer.upvotedBy = answer.upvotedBy.filter((e) => e !== mail);
        answer.upvotes -= 1;
    }
    answer.downvotedBy.push(mail);
    answer.downvotes += 1;
    await question.save();
    pusher.trigger(`questions-${id}`, 'question-updated', {
        id: question._id,
    });
    return res.status(200).json(question);
};

export { upvoteQuestion, downvoteQuestion, upvoteAnswer, downvoteAnswer };
