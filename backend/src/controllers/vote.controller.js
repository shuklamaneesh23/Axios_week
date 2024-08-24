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
    const { mail, answerId } = req.body;

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
    const { mail, answerId } = req.body;

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

const getNetVotes = async (req,res) => {
    const {authorEmail} = req.body;
    const netVotes = await Question.aggregate([
        // Step 1: Match questions authored by the user or containing answers authored by the user
        {
            $match: {
                $or: [
                    { authorEmail: authorEmail }, // Match user's questions
                    { "answers.authorEmail": authorEmail } // Match user's answers
                ]
            }
        },
        // Step 2: Project the net votes (upvotes - downvotes) for both questions and answers
        {
            $project: {
                netVotesFromQuestions: {
                    $cond: [
                        { $eq: ["$authorEmail", authorEmail] },
                        { $subtract: ["$upvotes", "$downvotes"] },
                        0
                    ]
                },
                netVotesFromAnswers: {
                    $reduce: {
                        input: {
                            $filter: {
                                input: "$answers",
                                as: "answer",
                                cond: { $eq: ["$$answer.authorEmail", authorEmail] }
                            }
                        },
                        initialValue: 0,
                        in: { $add: ["$$value", { $subtract: ["$$this.upvotes", "$$this.downvotes"] }] }
                    }
                }
            }
        },
        // Step 3: Sum the net votes from questions and answers
        {
            $group: {
                _id: null,
                totalNetVotes: { $sum: { $add: ["$netVotesFromQuestions", "$netVotesFromAnswers"] } }
            }
        }
    ]);

    // Return the total net votes, or 0 if no documents matched

    //return netVotes.length > 0 ? netVotes[0].totalNetVotes : 0;
    return res.status(200).json(netVotes.length > 0 ? netVotes[0].totalNetVotes : 0);
};

const getQuestionsAskedByUser = async (req,res) => {
    const {authorEmail} = req.body;
    const questions = await Question.find({
        authorEmail:authorEmail
    }).exec();
    return res.status(200).json(questions);
};

const getAnswersByUser = async (req,res) => {
    const {authorEmail} = req.body;
    const questions = await Question.find({
        "answers.authorEmail":authorEmail
    }).exec();
    return res.status(200).json(questions);
};

export { upvoteQuestion, downvoteQuestion, upvoteAnswer, downvoteAnswer,getNetVotes,getQuestionsAskedByUser,getAnswersByUser };
