import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { contentCreatorValidationSchema } from 'validationSchema/content-creators';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getContentCreators();
    case 'POST':
      return createContentCreator();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getContentCreators() {
    const data = await prisma.content_creator
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'content_creator'));
    return res.status(200).json(data);
  }

  async function createContentCreator() {
    await contentCreatorValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.video?.length > 0) {
      const create_video = body.video;
      body.video = {
        create: create_video,
      };
    } else {
      delete body.video;
    }
    const data = await prisma.content_creator.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
