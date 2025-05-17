import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, isLeft, makeLeft, makeRight } from '@/infra/shared/either'
import { LinkNotFoundError, UnexpectedError } from '@/infra/shared/errors'
import { eq } from 'drizzle-orm'
import { getLinkByShortUrl } from './get-link'

export const incrementLinkAccess = async (
  shortUrl: string
): Promise<Either<LinkNotFoundError | UnexpectedError, boolean>> => {
  const result = await getLinkByShortUrl(shortUrl)

  if (isLeft(result)) {
    return makeLeft(new LinkNotFoundError())
  }

  const link = result.right

  const updated = await db
    .update(schema.links)
    .set({
      accessCount: link.accessCount + 1,
    })
    .where(eq(schema.links.shortUrl, shortUrl))

  if (updated.count === 0) {
    return makeLeft(new UnexpectedError())
  }

  return makeRight(true)
}
