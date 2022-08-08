import { Groups as GroupsM } from '~/data/models/models';
import { changeStringCase } from '~/helpers/helpers';
import { StringCase } from '~/common/enums/enums';

type Constructor = {
  GroupsModel: typeof GroupsM;
};

class Groups {
  #GroupsModel: typeof GroupsM;

  constructor({ GroupsModel }: Constructor) {
    this.#GroupsModel = GroupsModel;
  }

  async create(group: { name: string }): Promise<GroupsM> {
    const { name } = group;

    return this.#GroupsModel.query().insert({
      name,
      key: changeStringCase({
        stringToChange: name,
        caseType: StringCase.KEBAB_CASE,
      }),
    });
  }
}

export { Groups };
