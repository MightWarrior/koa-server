var expect = require('chai').expect;
var numbers = [1, 2, 3, 4, 5];
it('should be an array and include 2', () => {
  expect(numbers)
    .to.be.an('array')
    .that.includes(2);
});
it('should have length of 5', () => {
  expect(numbers).to.have.lengthOf(5);
});
