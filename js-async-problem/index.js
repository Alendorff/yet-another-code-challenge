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

  // I do not handle errors here because IDK what to do with them here, so let them to be thrown
  /** @type {Array<{name: string}>} */
  const rolesRes = await Promise.all(userRoles.map(r => dbFakeRoleRequest(r)));

  rolesRes.forEach(({ name }) => console.log(name));
})();
