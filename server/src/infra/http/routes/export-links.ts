import { exportLinks } from '@/app/functions/export-links'
import { isLeft, unwrapEither } from '@/infra/shared/either'
import { UnexpectedError } from '@/infra/shared/errors'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/exports',
    {
      schema: {
        summary: 'Export links',
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query

      const result = await exportLinks({
        searchQuery,
      })

      if (isLeft(result)) {
        return reply.status(400).send({ message: new UnexpectedError().message })
      }

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({ reportUrl })
    }
  )
}
