import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISale extends Document {
  userId: mongoose.Types.ObjectId;
  productName: string;
  sellingPrice: number;
  costPrice: number;
  quantity: number;
  adCost: number;
  profit: number;
  revenue: number;
  createdAt: Date;
}

const saleSchema = new Schema<ISale>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productName: { type: String, required: true },
  sellingPrice: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  adCost: { type: Number, required: true },
  profit: { type: Number, required: true },
  revenue: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Sale: Model<ISale> = mongoose.models.Sale || mongoose.model<ISale>('Sale', saleSchema);
export default Sale;
