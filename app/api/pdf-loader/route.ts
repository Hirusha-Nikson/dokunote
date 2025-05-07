import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req: NextRequest) {
    const reqUrl = req.url;
    if (!reqUrl) {
        return NextResponse.json({ error: "Invalid or missing request URL" }, { status: 400 });
    }

    const { searchParams } = new URL(reqUrl);
    const pdfUrl = searchParams.get("pdfUrl");

    if (!pdfUrl) {
        return NextResponse.json({ error: "Invalid or missing pdfUrl parameter" }, { status: 400 });
    }

    const response = await fetch(pdfUrl);
    const data = await response.blob();

    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';

    docs.forEach((doc) => {
        pdfTextContent += doc.pageContent;
    });

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });

    const output = await textSplitter.splitText(pdfTextContent);

    return NextResponse.json({ result: output });
}
