import type { VercelRequest, VercelResponse } from '@vercel/node';

const annotate = async (image: string) => {
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`;
    const body = {
        requests: [
            {
                image: {
                    content: image,
                },
                features: [
                    {
                        type: "FACE_DETECTION",
                        maxResults: 100,
                    },
                    {
                        type: "OBJECT_LOCALIZATION",
                        maxResults: 100,
                    },
                ],
            },
        ],
    };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    console.log(response);
    return await response.json();
};

export default function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    const { image } = request.body;
    annotate(image).then((result) => {
        response.status(200).send(result);
    });
}