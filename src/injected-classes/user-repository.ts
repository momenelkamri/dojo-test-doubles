import type {User, UserRepository} from "../subject-under-test.js";

const ENV = "local";

class ActualUserRepository implements UserRepository {
  findById(id: string): User {
    // The purpose of this kata is to run the test locally.
    // We have no database connection available when we run our test locally.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (ENV === "local") {
      throw new Error(
        `Database connection not available locally. Cannot get user by id ${id}`,
      );
    }

    return {id, email: `actual.email.of.${id}@email.com`};
  }
}
