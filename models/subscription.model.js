import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required..."],
        trim: true,
        minLength: 3,
        maxLength: 150,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required..."],
        minValue: [0, "Price must be greater than 0"],
        maxValue: [10000, "Price must less than 10,000"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "INR"],
        default: "INR"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["sports", "technology","finance", "entertaiment", "lifestyle", "politics","other"],
        requied: [true, "Category must be selected...."]
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required..."],
        trim: true,
    },
    status: {
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        requieed: [true, "Start date must be specified..."],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date must be in the past.." 
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) { 
                return value > this.startDate ;
            },
            message: "Renewal date must be after start date.." 
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        index: true,
    }
}, { timestamps: true });

subscriptionSchema.pre("save", function(next) {
    if(!this.renewalDate) {
        const periods = {
            daily : 1,
            weekly : 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate = setDate(this.renewalDate.getDate() + periods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription" , subscriptionSchema);

export default Subscription;