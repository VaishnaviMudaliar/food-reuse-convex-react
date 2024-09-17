import { CSVLoader } from "@langchain/langchain";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { retrievalChain } from "@langchain/chains/retriever";
import { createStuffDocumentsChain } from "@langchain/chains/combine_documents";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";

import * as dotenv from "dotenv";
dotenv.config();

async function generateMealPlan() {
  // Initialize the ChatGroq model
  const model = new ChatGroq({
    model: "llama3-70b-8192",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
  });

  const template = `
    Generate a meal plan using the following ingredients with quantities:
    {ingredients}

    Use the {context} and categorize the meals by course (e.g., breakfast, lunch, dinner, snacks).
    Ensure each meal is balanced and uses the {ingredients} efficiently without wasting any.
    The meal plan should cover {numberOfDays} and should cater to {dietaryPreferences}.
    If possible, suggest alternative ingredients or recipes when certain ingredients are missing.

    Context: {context}
    Ingredients with Quantities: {ingredients}

    Meal Plan:
  `;
  const prompt = PromptTemplate.fromTemplate(template, {
    inputVariables: ['context', 'ingredients', 'numberOfDays', 'dietaryPreferences'],
  });

  // Load the CSV
  const loader = new CSVLoader("../data/final_cleaned_foodrecipes.csv");
  const documents = await loader.load();

  // Create the chain for combining documents with LLM
  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt: prompt,
  });

  // Split the documents into chunks for embeddings
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });

  const splitdocs = await splitter.splitDocuments(documents);
  console.log(splitdocs);

  // Initialize the Hugging Face embeddings model
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
  });

  // Initialize the Chroma vector store for storing embeddings
  const chroma = new Chroma({
    collectionName: "csv-embeddings",
    embeddingFunction: embeddings.embedQuery,
    directory: "../data/chroma_db", // Store locally in this directory
  });

  // Embed the documents and add them to the Chroma vector store
  const vectorstore = await chroma.addDocuments(splitdocs);

  // Use Chroma as a retriever
  const retriever = vectorstore.asRetriever({
    k: 2, // Number of relevant results to return
  });

  // Create a retrieval chain that links the retriever and chain
  const retrievalchain = await retrievalChain({
    chain,
    retriever,
  });

  // Query the chain for a meal plan
  const response = await retrievalchain.invoke({
    ingredients: "wheat flour",
    numberOfDays: 7,
    dietaryPreferences: "Vegetarian",
  });

  return response;
}

