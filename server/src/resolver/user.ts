import { User } from "../model/user";

interface Args {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const UserResolver = {
  Query: {
    users: async () => {
      try {
        const users = await User.find({});
        if (!users) throw new Error("No users found");
        else
          return {
            success: true,
            total: users.length,
            users,
          };
      } catch (error) {
        console.log("error", error);
      }
    },

    user: async (_: any, args: Args) => {
      try {
        if (args.id) throw new Error("No id provided");
        const user = await User.findOne({ _id: args.id });
        if (!user) throw new Error("No user fuond");
        return user;
      } catch (error) {
        console.log("error", error);
      }
    },
  },

  Mutataion: {
    regUser: async (_: any, args: Args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (user) throw new Error("User already exist");

        const newUser = await User.create({
          username: args.username,
          email: args.email,
          password: args.password,
        });
        return newUser;
      } catch (error) {
        console.log("error", error);
      }
    },
    loginUser: async (_: any, args: Args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (!user) throw new Error("User not exist");

        const isCorrectPassword = await user.isValidPassword(args.password);
        if (!isCorrectPassword) throw new Error("Incorrect password");

        return user;
      } catch (error) {
        console.log("error", error);
      }
    },

    updateUser: async (_: any, args: Args) => {
      try {
        const id = args.id;
        if (!args.id) throw new Error("Id not provided");

        const user = await User.findOne({ _id: args.id });
        if (!user) throw new Error("User not found");

        const updatedUser = await User.findOneAndUpdate(
          { _id: args.id },
          { ...args },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (error) {
        console.log("error", error);
      }
    },

    deleteUser: async (_: any, args: Args) => {
      try {
        const id = args.id;
        if (!id) throw new Error("No id provided");

        const user = await User.findById(args.id);
        if (!user) throw new Error("User not found");

        const deleteUser = await User.findByIdAndDelete(id);
        return {
          success: true,
          message: "User deleted successfully",
          id: deleteUser?._id,
        };
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
