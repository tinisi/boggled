import boggLib from 'bogglib';

describe('boggLib', () => {
  it('has a possibleWords method', () => {
    expect(boggLib.possibleWords).toEqual(jasmine.any(Function));
  });
});
