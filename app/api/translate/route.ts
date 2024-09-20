import { NextResponse } from "next/server";
import Translate from "@google-cloud/translate";

const translate = new Translate.v2.Translate({
  key: process.env.GOOGLE_API_KEY, // Store your API key in an environment variable
});

export async function POST(req: Request) {
  const { text, targetLang } = await req.json();

  if (!text || !targetLang) {
    return NextResponse.json(
      { error: "Missing 'text' or 'targetLang'" },
      { status: 400 }
    );
  }

  try {
    const [translation] = await translate.translate(text, targetLang);
    return NextResponse.json({ translatedText: translation }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
