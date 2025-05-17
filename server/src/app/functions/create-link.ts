import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import {
  type Either,
  isRight,
  makeLeft,
  makeRight,
} from '@/infra/shared/either'
import { InvalidInputError, InvalidLinkDataError, ShortUrlAlreadyExistsError } from '@/infra/shared/errors'
import { createLinkSchema } from '@/infra/shared/schemas/create-link.schema'
import { type LinkData, linkSchema } from '@/infra/shared/schemas/link.schema'
import { getLinkByShortUrl } from './get-link'

export const createLink = async (
  originalUrl: string,
  shortUrl: string
): Promise<Either<ShortUrlAlreadyExistsError | InvalidInputError | InvalidLinkDataError, LinkData>> => {
  const parsedInput = createLinkSchema.safeParse({ originalUrl, shortUrl })

  if (!parsedInput.success) {
    return makeLeft(new InvalidInputError())
  }

  const existingLink = await getLinkByShortUrl(shortUrl)

  if (isRight(existingLink)) {
    return makeLeft(new ShortUrlAlreadyExistsError())
  }

  const inserted = await db
    .insert(schema.links)
    .values({
      originalUrl,
      shortUrl,
      accessCount: 0,
    })
    .returning()

  const newLink = inserted[0]

  if (!newLink) {
    return makeLeft(new InvalidLinkDataError())
  }

  const parsedLink = linkSchema.safeParse(newLink)

  if (!parsedLink.success) {
    return makeLeft(new InvalidLinkDataError())
  }

  return makeRight(parsedLink.data)
}
