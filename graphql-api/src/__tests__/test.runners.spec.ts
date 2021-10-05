describe('Describe 1', () => {
  console.log('Describe 1');

  test('Test 1.1', () => {
    console.log('Test 1.1');
  });

  describe('Describe 1.1', () => {
    console.log('Describe 1.1');

    test('Test 1.1.1', () => {
      console.log('Test 1.1.1');
    });

    test('Test 1.1.2', () => {
      console.log('Test 1.1.2');
    });
  });

  describe('Describe 1.2', () => {
    console.log('Describe 1.2');

    test('Test 1.2.1', () => {
      console.log('Test 1.2.1');
    });

    test('Test 1.2.2', () => {
      console.log('Test 1.2.2');
    });
  });
});
