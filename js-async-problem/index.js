// just do node ./js-async-problem to get the output
const { dbFakeUserRequest, dbFakeRoleRequest } = require("./api");

(async function() {
  const user = await dbFakeUserRequest(1);
  const userRoles = user.roles.reduce((acc, roleId) => {
    if (!acc.includes(roleId)) {
      acc.push(roleId);
    }
    return acc;
  }, []);

  /** @type {Array<{name: string}>} */
  const rolesRes = await Promise.all(userRoles.map(r => dbFakeRoleRequest(r)));

  rolesRes.forEach(({ name }) => console.log(name));
})();
