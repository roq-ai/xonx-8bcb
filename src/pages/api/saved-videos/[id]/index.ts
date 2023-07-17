import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { savedVideoValidationSchema } from 'validationSchema/saved-videos';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.saved_video
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSavedVideoById();
    case 'PUT':
      return updateSavedVideoById();
    case 'DELETE':
      return deleteSavedVideoById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSavedVideoById() {
    const data = await prisma.saved_video.findFirst(convertQueryToPrismaUtil(req.query, 'saved_video'));
    return res.status(200).json(data);
  }

  async function updateSavedVideoById() {
    await savedVideoValidationSchema.validate(req.body);
    const data = await prisma.saved_video.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSavedVideoById() {
    const data = await prisma.saved_video.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
