import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
  text: string;
  answer?: string;
}

export interface ISession extends Document {
  userId: string;
  questions: IQuestion[];
  currentQuestionIndex: number;
  startedAt: Date;
  endedAt?: Date;
}

const QuestionSchema: Schema = new Schema({
  text: { type: String, required: true },
  answer: { type: String },
});

const SessionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  questions: [QuestionSchema],
  currentQuestionIndex: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
});

const SessionModel = mongoose.model<ISession>('Session', SessionSchema);

export default SessionModel;