import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//Admin schema
const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware to hash password
AdminSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        // If the password is not modified, move to the next middleware
        next();
    }
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
});

//compare the password with the hashed password
AdminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// to  create admin model 
const Admin = mongoose.model("Admin", AdminSchema);

export default Admin; 
