import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  isSubscribed: boolean;
  subscriptionExpiry: Date;
  hasUsedInitialOffer: boolean;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSubscribed: { type: Boolean, default: false },
  subscriptionExpiry: { type: Date, default: new Date(0) },
  hasUsedInitialOffer: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
