const _ = require ('lodash/fp');
/**
 * @export
 * @param {array} array should be an array of objects, each object needs prop id to map back
 * @param {array} searchInput search words array, can be multiple words like ['Hans', 'Dampf']
 * @returns filtered Array
 */
const filterGen = searchfunction => (array, searchInput) => _.flow(
        _.map(o => {
          const values = [];
          values.push(o.arrayId, o.companyId, o.prename, o.lastname);
          _.map(tag => values.push(tag.data.tag))(o.tags.rows);
          return values;
        }),
        _.filter(contact => {
          const values = contact.slice(1); // exclude id
          return _.flow(
            _.map(searchfunction(values)),
            _.filter(Boolean),
            )(searchInput).length === searchInput.length; // for n keywords n properties must match
        }),
        _.map(e => array[parseInt(e[0], 10)]), // map back to original object
        )(array);

const filter = filterGen(values => word =>
  _.some(el => el.toLowerCase().indexOf(word.toLowerCase()) > -1)(values));
	  // _.some(el => { console.log("!!!",el, word);})(values));
const filterTags = filterGen(values => word =>
  _.some(el => el.toLowerCase() === word.toLowerCase())(values));


module.exports.filter = filter;
module.exports.filterTags = filterTags;
