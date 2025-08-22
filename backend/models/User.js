import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User Schema
const UserSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

// Middleware to hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified("password")) {
    return next();
  }
  // Generate a salt and hash the password with it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare the provided password with the hashed password in the database
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the User model using ES module syntax
export default mongoose.model("User", UserSchema);
