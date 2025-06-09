import mongoose from 'mongoose';

const connectionToDB = () => {
  try{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('MongoDB connected')})
    .catch((error) => console.log('Mongo error:', error))
  }
  catch(e){
    console.log(`Error connecting database ${e}`);
  }
}