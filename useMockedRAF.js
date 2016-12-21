const { before, after } = require('mocha-sugar-free');
const { stub } = require('sinon');

const createMockRAF = require('./index');

module.exports = function useMockedRAF(closure) {
  const mockRAF = createMockRAF();

  before(
    () => {
      stub(window, 'requestAnimationFrame', mockRAF.raf);
    }
  );

  after(
    () => {
      window.requestAnimationFrame.restore();
    }
  );

  return () => closure(mockRAF);
};
