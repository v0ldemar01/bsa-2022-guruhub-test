import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, GroupsApiPath } from '~/common/enums/enums';
import { GroupsCreateRequestDto } from '~/common/types/types';
import { group as groupService } from '~/services/services';
import { groupCreate as groupCreateValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    group: typeof groupService;
  };
};

const initGroupsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { group: groupService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: GroupsApiPath.ROOT,
    schema: {
      body: groupCreateValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: GroupsCreateRequestDto }>, rep) {
      const group = await groupService.create(req.body);

      return rep.status(HttpCode.CREATED).send(group);
    },
  });
};

export { initGroupsApi };
