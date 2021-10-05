import { filterByName } from '../repositories';

describe('given an array of user', () => {
  const users = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
    { id: '3', name: 'Kirikou' },
  ];

  describe("when filtered by name 'Doe'", () => {
    const filter = 'Doe';

    it("then only users with 'Doe' in their name will remain", () => {
      const expectation = expect.arrayContaining(
        users
          .filter((user) => user.name.includes(filter))
          .map((user) => expect.objectContaining(user)),
      );

      const filteredUsers = filterByName(users, filter);

      expect(filteredUsers).toEqual(expectation);
    });
  });
});
