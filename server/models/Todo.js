import mongoose from 'mongoose';

const currentDate = new Date();
if (currentDate.getMonth() < 10) {
}
const timeStamp = `${currentDate.getDate()}.${
  currentDate.getMonth() < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1
}.${currentDate.getFullYear()}`;

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  data: {
    type: String,
    default: timeStamp,
  },
});

export default mongoose.model('Todo', TodoSchema);
