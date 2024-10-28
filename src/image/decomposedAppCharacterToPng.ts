import type { IPngMetadataTextualData } from "@lunapaint/png-codec";
import { decodePng, encodePng } from "@lunapaint/png-codec";
import { Bytes, isDefined } from "@mjtdev/engine";
import type { DecomposedAppCharacter } from "../type/app-character/AppCharacter";
import { AppVideos } from "../video/AppVideos";
import {
  PNG_KEYWORD_TAVERNCARD,
  PNG_KEYWORD_VIDEOS,
  PNG_KEYWORD_VOICE_SAMPLE,
} from "./PNG_KEYWORDS";

export const decomposedAppCharacterToPng = async ({
  character,
  image,
  voiceSample,
  videos,
}: DecomposedAppCharacter) => {
  if (!image) {
    throw new Error("decomposedAppCharacterToPng: No image");
  }
  const fileAb = await Bytes.toArrayBuffer(image);
  const decoded = await decodePng(new Uint8Array(fileAb));
  const { card } = character;

  const cardJsonBytes = await Bytes.toArrayBuffer(JSON.stringify(card));
  const cardText = Bytes.arrayBufferToBase64(cardJsonBytes);

  const voiceBytes = voiceSample
    ? await Bytes.toArrayBuffer(voiceSample)
    : undefined;

  const voiceText = voiceBytes
    ? Bytes.arrayBufferToBase64(voiceBytes)
    : undefined;

  const videosText = videos
    ? Bytes.arrayBufferToBase64(AppVideos.videoRecordsToVideoPack(videos))
    : undefined;

  const voiceChunk: IPngMetadataTextualData | undefined = voiceText
    ? {
        type: "tEXt",
        keyword: PNG_KEYWORD_VOICE_SAMPLE,
        text: voiceText,
      }
    : undefined;

  const videosChunk: IPngMetadataTextualData | undefined = videosText
    ? {
        type: "tEXt",
        keyword: PNG_KEYWORD_VIDEOS,
        text: videosText,
      }
    : undefined;

  const encoded = await encodePng(decoded.image, {
    ancillaryChunks: [
      {
        type: "tEXt",
        keyword: PNG_KEYWORD_TAVERNCARD,
        text: cardText,
      } as const,
      voiceChunk,
      videosChunk,
    ].filter(isDefined),
  });
  return new Blob([encoded.data], { type: "image/png" });
};
