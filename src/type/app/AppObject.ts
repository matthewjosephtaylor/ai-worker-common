import { TextExtraction } from "type/corpus/TextExtraction";
import { AiAgent } from "../ai-agent/AiBot";
import { AppCharacter } from "../app-character/AppCharacter";
import { ChatMessage } from "../chat-message/ChatMessage";
import { Chat } from "../chat/Chat";
import { Corpus, CorpusDocument } from "../corpus/Corpus";
import { DataIndex } from "../data-index/DataIndex";
import { AppUser, AppUserProfile } from "../user/AppUser";
import { AppVoice } from "../voice/AppVoice";
import { IngestResult } from "../rest/IngestRequest";
import { PhoneCall } from "../phone/PhoneCall";
import { Thought } from "../thought/Thought";

export type AppObjectTypeMap = {
  chat: Chat;
  "chat-message": ChatMessage;
  "app-character": AppCharacter;
  "ai-agent": AiAgent;
  "app-user": AppUser;
  "user-profile": AppUserProfile;
  corpus: Corpus;
  "corpus-document": CorpusDocument;
  "data-index": DataIndex;
  // data: ByteLike;
  voice: AppVoice;
  "text-extraction": TextExtraction;
  "ingest-result": IngestResult;
  "phone-call": PhoneCall;
  thought: Thought;
};

export type AppObjectType = keyof AppObjectTypeMap;

export type AppObject<T extends AppObjectType = AppObjectType> =
  AppObjectTypeMap[T];

export const APP_OBJECT_TYPES: AppObjectType[] = [
  "chat",
  "chat-message",
  "app-character",
  "ai-agent",
  "app-user",
  "user-profile",
  "corpus",
  "corpus-document",
  "data-index",
  // "data",
  "voice",
  "text-extraction",
  "ingest-result",
  "phone-call",
  "thought",
];

export const isAppObjectType = (maybe: unknown): maybe is AppObjectType => {
  const straw = maybe as AppObjectType;
  return typeof straw === "string" && APP_OBJECT_TYPES.includes(straw);
};
