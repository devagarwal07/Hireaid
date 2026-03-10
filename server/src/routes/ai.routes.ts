import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

// router.use(protect);

// ─── Helper: Get Gemini model ────────────────────────────────

function getGeminiModel() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your-gemini-api-key-here") {
        throw new ApiError(500, "GEMINI_API_KEY is not configured. Please set a valid API key in server/.env");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

// ─── GET /api/ai/session ─────────────────────────────────────
// Returns AI config status (replaces the old OpenAI realtime-token endpoint)

router.get(
    "/session",
    asyncHandler(async (_req, res) => {
        const apiKey = process.env.GEMINI_API_KEY;
        const isConfigured = !!apiKey && apiKey !== "your-gemini-api-key-here";

        res.json({
            success: true,
            data: {
                provider: "google-gemini",
                model: "gemini-2.0-flash",
                configured: isConfigured,
            },
        });
    })
);

// ─── POST /api/ai/analyze-answer ─────────────────────────────
// Real-time analysis of a candidate's answer

router.post(
    "/analyze-answer",
    asyncHandler(async (req, res) => {
        const { question, answer, jobRole, jobDescription } = req.body;

        if (!question || !answer) {
            throw ApiError.badRequest("Both 'question' and 'answer' are required");
        }

        const model = getGeminiModel();

        const prompt = `You are an expert hiring assistant evaluating a candidate's interview answer.

Job Role: ${jobRole || "Not specified"}
Job Description: ${jobDescription || "Not specified"}

Interview Question: ${question}

Candidate's Answer: ${answer}

Please evaluate the answer and respond in the following JSON format ONLY (no markdown, no extra text):
{
  "score": <number 1-10>,
  "evaluation": "<brief 2-3 sentence evaluation>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"],
  "criteria": [
    {"text": "<criterion description>", "met": <true/false>}
  ],
  "followUpQuestion": "<suggested follow-up question>"
}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Try to parse JSON from response
        let analysis;
        try {
            // Extract JSON from response (handle potential markdown wrapping)
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                analysis = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON found in response");
            }
        } catch {
            // Fallback if JSON parsing fails
            analysis = {
                score: 7,
                evaluation: responseText.slice(0, 500),
                strengths: ["Answer provided"],
                improvements: ["Could provide more detail"],
                criteria: [],
                followUpQuestion: "Can you elaborate on that?",
            };
        }

        res.json({ success: true, data: analysis });
    })
);

// ─── POST /api/ai/generate-questions ─────────────────────────
// Generate interview questions based on job role

router.post(
    "/generate-questions",
    asyncHandler(async (req, res) => {
        const { jobRole, jobDescription, skills, count = 5 } = req.body;

        if (!jobRole) {
            throw ApiError.badRequest("'jobRole' is required");
        }

        const model = getGeminiModel();

        const prompt = `You are an expert hiring assistant. Generate ${count} interview questions for the following role.

Job Role: ${jobRole}
Job Description: ${jobDescription || "Not specified"}
Key Skills: ${Array.isArray(skills) ? skills.join(", ") : skills || "Not specified"}

Generate a mix of behavioral, technical, and situational questions.

Respond in the following JSON format ONLY (no markdown, no extra text):
{
  "questions": [
    {
      "question": "<question text>",
      "type": "<behavioral|technical|situational>",
      "difficulty": "<easy|medium|hard>",
      "evaluationCriteria": ["<criterion 1>", "<criterion 2>"]
    }
  ]
}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        let questions;
        try {
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                questions = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON found");
            }
        } catch {
            questions = {
                questions: [
                    {
                        question: `Tell me about your experience as a ${jobRole}`,
                        type: "behavioral",
                        difficulty: "easy",
                        evaluationCriteria: ["Clarity", "Relevance"],
                    },
                ],
            };
        }

        res.json({ success: true, data: questions });
    })
);

// ─── POST /api/ai/transcript-summary ─────────────────────────
// Summarize an interview transcript

router.post(
    "/transcript-summary",
    asyncHandler(async (req, res) => {
        const { transcript, jobRole } = req.body;

        if (!transcript) {
            throw ApiError.badRequest("'transcript' is required");
        }

        const model = getGeminiModel();

        // transcript can be a string or array of {speaker, text, timestamp}
        let transcriptText: string;
        if (typeof transcript === "string") {
            transcriptText = transcript;
        } else if (Array.isArray(transcript)) {
            transcriptText = transcript
                .map((entry: any) => `${entry.speaker || "Speaker"} [${entry.timestamp || ""}]: ${entry.text}`)
                .join("\n");
        } else {
            throw ApiError.badRequest("'transcript' must be a string or array of entries");
        }

        const prompt = `You are an expert hiring assistant. Summarize the following interview transcript.

Job Role: ${jobRole || "Not specified"}

Transcript:
${transcriptText}

Respond in the following JSON format ONLY (no markdown, no extra text):
{
  "summary": "<concise 3-5 sentence summary of the interview>",
  "keyTopics": ["<topic 1>", "<topic 2>"],
  "candidateStrengths": ["<strength 1>", "<strength 2>"],
  "candidateConcerns": ["<concern 1>", "<concern 2>"],
  "overallImpression": "<positive|neutral|negative>",
  "recommendedNextSteps": "<recommendation>"
}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        let summary;
        try {
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                summary = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON found");
            }
        } catch {
            summary = {
                summary: responseText.slice(0, 500),
                keyTopics: [],
                candidateStrengths: [],
                candidateConcerns: [],
                overallImpression: "neutral",
                recommendedNextSteps: "Review transcript manually",
            };
        }

        res.json({ success: true, data: summary });
    })
);

// ─── POST /api/ai/chat ──────────────────────────────────────
// General AI assistant chat for interviewers

router.post(
    "/chat",
    asyncHandler(async (req, res) => {
        const { message, context } = req.body;

        if (!message) {
            throw ApiError.badRequest("'message' is required");
        }

        const model = getGeminiModel();

        const prompt = `You are an expert ATS (Applicant Tracking System) hiring agent and technical interviewer. Your sole purpose is to assist the human interviewer during a live interview. 
UNDER NO CIRCUMSTANCES should you break character, act as a general AI, or answer questions unrelated to the interview, hiring, or the provided candidate. If asked about unrelated topics (like cooking, weather, general trivia), politely decline and redirect the focus back to the interview process.

${context ? `Candidate/Interview Context:\n${JSON.stringify(context, null, 2)}\n` : ""}

Interviewer's message: ${message}

Provide a highly professional, helpful, and concise response (2-4 sentences maximum) tailored exactly to the candidate context provided above.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.json({
            success: true,
            data: {
                message: responseText,
                timestamp: new Date().toISOString(),
            },
        });
    })
);

export default router;
