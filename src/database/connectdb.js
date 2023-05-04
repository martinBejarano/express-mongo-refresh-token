import mongoose from 'mongoose';

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('Database connected')
} catch (e) {
    console.log('Database error')
}