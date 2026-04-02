import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  isSubscribed: boolean;
  subscriptionExpiry: Date;
  hasUsedInitialOffer: boolean;
  createdAt: Date;
  referralCode: string;
  referredBy?: mongoose.Types.ObjectId;
  referralCredits: number; // days of credit earned from referrals
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  isSubscribed: { type: Boolean, default: false },
  subscriptionExpiry: { type: Date, default: new Date(0) },
  hasUsedInitialOffer: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
  referralCredits: { type: Number, default: 0 }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
