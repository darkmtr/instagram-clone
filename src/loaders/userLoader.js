import DataLoader from 'dataloader';
import models from '../models';

export const userLoader = new DataLoader(async (keys) => {
  console.log(keys);
  const users = await models.user.findAll({
    where: { id: keys },
    include: [{ model: models.profile }],
  });

  const usersMap = {};

  users.forEach((user) => {
    const u = user.get({ plain: true });
    usersMap[u.id] = u;
  });

  return keys.map((key) => usersMap[key]);
});
