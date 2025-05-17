import { incrementLinkAccess } from '@/app/functions/increment-link-access'
import { isLeft } from '@/infra/shared/either'
import { LinkNotFoundError, UnexpectedError } from '@/infra/shared/errors'
import { linkSchema } from '@/infra/shared/schemas/link.schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const incrementLinkAccessRoute: FastifyPluginAsyncZod = async server => {
  server.put(
    '/links/increment/:shortUrl',
    {
      schema: {
        summary: 'Increment the access count of a link by its short URL',
        params: z.object({
          shortUrl: linkSchema.shape.shortUrl,
        }),
        response: {
          200: z.object({
            success: z.boolean(),
          }),
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await incrementLinkAccess(request.params.shortUrl)

      if (isLeft(result)) {
        if (result.left instanceof LinkNotFoundError) {
          return reply
            .status(404)
            .send({ message: new LinkNotFoundError().message })
        }
        return reply.status(400).send({ message: new UnexpectedError().message })
      }

      return reply.status(200).send({ success: true })
    }
  )
}
