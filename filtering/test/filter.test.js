const { filter} = require('../src/filter');
const { userList } = require('./helper/user.helper');
const { expect: chaiExpect } = require('chai');


describe('Filter Test', function() {
  describe('DO NOT EDIT TESTS: general filtering', function() {
  it('should show all matches when searches nothing', function() {
    let res = filter(userList, [ '' ]);
    chaiExpect(res).to.have.lengthOf(11);
  });
  it('should show no matches no match', function() {
  	let res = filter(userList, [ 'asdasdasd' ]);
    chaiExpect(res).to.have.lengthOf(0);
  });
  it('should find the correct match', function() {
    let res = filter(userList, [ 'frey' ]);
    chaiExpect(res).to.have.lengthOf(1);
  });
  it('should find the correct match', function() {
    let res = filter(userList, [ 'arry' ]);
    chaiExpect(res).to.have.lengthOf(2);
  });
  it('should find the correct match', function() {
    let res = filter(userList, [ 'Hans-Peter' ]);
    chaiExpect(res).to.have.lengthOf(1);
  });
  it('should find the correct match', function() {
    let res = filter(userList, [ 'Hans' ]);
    chaiExpect(res).to.have.lengthOf(3);
  });
  it('should find the correct match', function() {
    let res = filter(userList, [ 'peter' ]);
    chaiExpect(res).to.have.lengthOf(3);
  });
  it('should not be case sensitive ', function() {
    	let res = filter(userList, [ 'Frey' ]);
      chaiExpect(res).to.have.lengthOf(1);
  });
  it('should not be case sensitive ', function() {
    let res = filter(userList, [ 'FreY' ]);
    chaiExpect(res).to.have.lengthOf(1);
  });
  it('should not be case sensitive ', function() {
    let res = filter(userList, [ 'A-1' ]);
    chaiExpect(res).to.have.lengthOf(2);
    });
  });

  describe('TASK: general sorting of results', function() {
    it('should sort the direct matches on top', function() {
      let res = filter(userList, [ 'basti' ]);
      chaiExpect(res).to.have.lengthOf(3);
      chaiExpect(res[0].arrayId).to.be.eql(7);
    });

    it('should sort the direct matches on top', function() {
      let res = filter(userList, [ 'a-1' ]);
      chaiExpect(res).to.have.lengthOf(3);
      chaiExpect(res[0].arrayId).to.be.eql(8);
    });

    it('should sort the direct matches on top', function() {
      let res = filter(userList, [ 'hans' ]);
      chaiExpect(res).to.have.lengthOf(3);
      chaiExpect(res[0].arrayId).to.be.eql(3);
      chaiExpect(res[0].arrayId).to.be.eql(9);
      chaiExpect(res[0].arrayId).to.be.eql(1);
    });
  });

  describe('Optional Task: general sorting of results', function() {
    it('should sort the direct matches on top nearest results after', function() {
      let res = filter(userList, [ 'basti' ]);
      chaiExpect(res).to.have.lengthOf(3);
      chaiExpect(res[0].arrayId).to.be.eql(7);
      chaiExpect(res[1].arrayId).to.be.eql(8);
      chaiExpect(res[2].arrayId).to.be.eql(6);
    });
  });
});
