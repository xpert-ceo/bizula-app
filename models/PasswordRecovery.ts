import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPasswordRecovery extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  resetCode: string;
  status: 'pending' | 'sent' | 'completed';
  createdAt: Date;
  expiresAt: Date;
}

const passwordRecoverySchema = new Schema<IPasswordRecovery>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  resetCode: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'sent', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }
});

const PasswordRecovery: Model<IPasswordRecovery> = mongoose.models.PasswordRecovery || 
  mongoose.model<IPasswordRecovery>('PasswordRecovery', passwordRecoverySchema);

export default PasswordRecovery;
