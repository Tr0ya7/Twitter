import mongoose from "mongoose"

const initMongoose = async () => {
    const mongoUri = process.env.MONGODB_URI
    
    if (!mongoUri) throw new Error("MONGODB_URI não achado na env")
    if (mongoose.connection.readyState === 1) return mongoose.connect   // return mongoose.connect.asPromise()

    await mongoose.connect(mongoUri)
}

export default initMongoose