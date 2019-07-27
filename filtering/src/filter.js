const FuzzySearch = require('fuzzy-search');

/**
 * @typedef {Object} Tag
 * @property {string[]} idrows
 */

/**
 * @typedef {Object} PersonData
 * @property {number} arrayId
 * @property companyId
 * @property prename
 * @property lastname
 * @property {Tag[]} tags
 */

/**
 * I don't see filterTags is mentioned anywhere, so I removed it
 * also filter fn itself doesn't look like generic one, but aimed on this specific type
 * so exported fn has those types explicitly
 * @param {PersonData[]} array should be an array of objects, each object needs prop id to map back
 * @param {string[]} searchInput search words array, can be multiple words like ['Hans', 'Dampf']
 * @returns {PersonData[]} filtered Array
 */
module.exports.filter = (array, searchInput) => {
  // looks like it solves the problem...
  // I don't really want to re-implement it
  const searcher = new FuzzySearch(array, ['prename', 'lastname', 'companyId'], {
    caseSensitive: false,
    sort: true
  });
  // no idea why search input is an array, so just convert it to keep api the same
  return searcher.search(searchInput.join(' '));
}
