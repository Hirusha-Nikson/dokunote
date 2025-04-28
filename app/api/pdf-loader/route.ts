import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextApiRequest } from "next";


export async function GET(req: NextApiRequest) {

    const reqUrl = req.url;
    if (!reqUrl) {
        return NextResponse.json({ error: "Invalid or missing request URL" }, { status: 400 });
    }
    const { searchParams } = new URL(reqUrl);
    
    const pdfUrl = searchParams.get("pdfUrl");

    //Load PDF files
    if (!pdfUrl) {
        return NextResponse.json({ error: "Invalid or missing pdfUrl parameter" }, { status: 400 });
    }
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader =  new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';

    docs.forEach((doc) => {
        pdfTextContent = pdfTextContent + doc.pageContent;
    })

    // Split text into chunks (optional)

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });

    const output = await textSplitter.splitText(pdfTextContent);

    return NextResponse.json({result: output});
}