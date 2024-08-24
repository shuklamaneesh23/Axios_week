import { Question } from "../models/question.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import pusher from "../utils/pusher.js";

const createQuestion = async (req, res) => {
    const { title, content, authorName, authorEmail, tags } = req.body;

    let imageLocalPath;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageLocalPath = req.files.image[0].path;
    }

    const image = await uploadOnCloudinary(imageLocalPath)

    const question = await Question.create({
        title,
        content,
        authorName,
        authorEmail,
        tags,
        image: image?.url || "",
    });


    if (!question) {
        return res.status(400).json({ error: "Failed to create question" });
    }

    return res.status(201).json(question);
}

const getQuestions = async (req, res) => {
    const questions = await Question.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json(questions);

}

const getQuestionById = async (req, res) => {

    const { id } = req.params;
    const question = await Question
        .findById(id)
        .exec();
    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }
    return res.status(200).json(question);
}
const answerQuestion = async (req, res) => {
    const { id } = req.params;
    const answer = req.body;

    console.log(req.body);
    console.log("answerQuestion", id, answer);

    const question = await Question.findById(id).exec();
    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }

    question.answers.push(answer);
    await question.save();

    // Corrected the channel name formatting
    pusher.trigger(`questions-${id}`, 'question-updated', {
        id: question._id,
    });

    return res.status(200).json(question);
};



export { createQuestion,getQuestions,getQuestionById,answerQuestion }