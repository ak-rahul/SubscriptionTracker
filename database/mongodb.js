import mongoose from mongoose
import {DB_URI, PORT} from '../config/env.js'

if(!DB_URI) {
    throw new Error("Plase define MONGODB_URI in your .env.<production/>development>.local file......");
    
}