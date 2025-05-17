import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { DatabaseConnectionFailedError, LinkNotFoundError, UnexpectedError } from '@/infra/shared/errors'
import { eq } from 'drizzle-orm'

export const deleteLinkByShortUrl = async (
  shortUrl: string
): Promise<Either<LinkNotFoundError | DatabaseConnectionFailedError | UnexpectedError, boolean>> => {
  const link = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .then(res => res[0])

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  await db.delete(schema.links).where(eq(schema.links.shortUrl, shortUrl))

  return makeRight(true)
}
