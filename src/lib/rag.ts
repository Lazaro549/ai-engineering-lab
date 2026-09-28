export interface ChunkingInput {
  chunkSize: number
  chunkOverlap: number
  topK: number
}

export interface DerivedChunking {
  valid: boolean
  /** How far the window advances between chunks. */
  stride: number
  /** Chunks produced for a document of `documentLength` units. */
  chunksPerDocument: number
  /** Upper bound on retrieved context handed to the generation model. */
  maxContext: number
}

/**
 * Pure arithmetic on the parameters. These are not measurements:
 * they only show how a configuration changes index size and prompt size.
 */
export function deriveChunking(input: ChunkingInput, documentLength = 10_000): DerivedChunking {
  const { chunkSize, chunkOverlap, topK } = input
  const valid =
    Number.isInteger(chunkSize) &&
    Number.isInteger(chunkOverlap) &&
    Number.isInteger(topK) &&
    chunkSize > 0 &&
    chunkOverlap >= 0 &&
    chunkOverlap < chunkSize &&
    topK > 0
  if (!valid) return { valid, stride: 0, chunksPerDocument: 0, maxContext: 0 }
  const stride = chunkSize - chunkOverlap
  const chunksPerDocument = documentLength <= chunkSize ? 1 : Math.ceil((documentLength - chunkOverlap) / stride)
  return { valid, stride, chunksPerDocument, maxContext: topK * chunkSize }
}
