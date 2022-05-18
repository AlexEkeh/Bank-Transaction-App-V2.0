import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB as string);
    console.log(`MongoDB Database connection Successful`);
  } catch (error) {
    console.log("MongoDB Database Connection Failed");
    console.error(error);
    process.exit();
  }
};


export default connectDB;