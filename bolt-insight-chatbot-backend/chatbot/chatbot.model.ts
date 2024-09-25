import { Schema, model, Document } from 'mongoose';

interface IQuestion {
  text: string;
  answer?: string;
}

export interface ISession extends Document {
  questions: IQuestion[];
  currentQuestionIndex: number;
  startedAt: Date;
  endedAt?: Date;
}

const sessionSchema = new Schema<ISession>({
  questions: [{ text: { type: String, required: true }, answer: { type: String, default: "" } }],
  currentQuestionIndex: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date }
});

export const SessionModel = model<ISession>('Session', sessionSchema);