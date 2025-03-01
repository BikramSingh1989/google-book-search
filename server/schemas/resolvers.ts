import { User } from "../models";
import { signToken } from "../utils/auth"; // Adjust the path as necessary

const resolvers = {
  Query: {
    users: async () => {
      return User.find();  // ✅ Fetch all users from MongoDB
    },
    user: async (_parent: any, { username }: { username: string }) => {
      return User.findOne({ username });
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new Error("Not authenticated");
    }
  },

  Mutation: {
    addUser: async (_parent: any, { username, email, password }: any) => {
      const user = await User.create({ username, email, password });
      return { token: signToken(user), user };
    },
    login: async (_parent: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error("Invalid credentials");
      }
      return { token: signToken(user), user };
    },
    saveBook: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) throw new Error("Not authenticated");

      return User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: input } },
        { new: true }
      );
    },
    removeBook: async (_parent: any, { bookId }: any, context: any) => {
      if (!context.user) throw new Error("Not authenticated");

      return User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    }
  }
};

export default resolvers;
