import { TextExtraction } from "type/corpus/TextExtraction";
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
import { AccessPoint } from "../access/AccessPoint";
import { AppInterface } from "../app-interface/AppInterface";
import { AccessPointTheme } from "../theme/AccessPointTheme";
import { AppGroup } from "../group/AppGroup";
export type AppObjectTypeMap = {
    chat: Chat;
    "chat-message": ChatMessage;
    "app-character": AppCharacter;
    "app-user": AppUser;
    "user-profile": AppUserProfile;
    corpus: Corpus;
    "corpus-document": CorpusDocument;
    "data-index": DataIndex;
    voice: AppVoice;
    "text-extraction": TextExtraction;
    "ingest-result": IngestResult;
    "phone-call": PhoneCall;
    thought: Thought;
    "access-point": AccessPoint;
    "access-point-theme": AccessPointTheme;
    "app-interface": AppInterface;
    "app-group": AppGroup;
};
export type AppObjectType = keyof AppObjectTypeMap;
export type AppObject<T extends AppObjectType = AppObjectType> = AppObjectTypeMap[T];
export declare const APP_OBJECT_TYPES: AppObjectType[];
export declare const isAppObjectType: (maybe: unknown) => maybe is keyof AppObjectTypeMap;
//# sourceMappingURL=AppObject.d.ts.map