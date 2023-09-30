import mongoose from 'mongoose'

const connectDB = async () => {
    try 
    {
        mongoose.set('strictQuery', false);
        const db = await mongoose.connect(process.env.MONGOOSE_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connection to Database success`);
    } 
    catch (error) 
    {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB;