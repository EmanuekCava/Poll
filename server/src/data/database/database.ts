import mongoose from 'mongoose'

const { DATABASE, HOST } = process.env;

(async () => {

    try {

        const connectionSuccess = await mongoose.connect(`mongodb://${HOST}/${DATABASE}`)

        console.log("Database is running", connectionSuccess.connection.name)
        
    } catch (error) {
        console.log(error);
        
    }

})()