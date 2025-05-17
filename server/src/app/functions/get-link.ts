import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { DatabaseConnectionFailedError, InvalidLinkDataError, LinkNotFoundError, UnexpectedError } from '@/infra/shared/errors'
import { type LinkData, linkSchema } from '@/infra/shared/schemas/link.schema'
import { eq } from 'drizzle-orm'

export const getLinkByShortUrl = async (
  shortUrl: string
): Promise<Either<LinkNotFoundError | InvalidLinkDataError | DatabaseConnectionFailedError | UnexpectedError, LinkData>> => {
  const link = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .then(res => res[0])

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  const parsed = linkSchema.safeParse(link)

  if (!parsed.success) {
    return makeLeft(new InvalidLinkDataError())
  }

  return makeRight(parsed.data)
}
