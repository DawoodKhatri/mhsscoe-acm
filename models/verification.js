import { Schema, model, models } from "mongoose";

const { String, Number } = Schema.Types

const verificationSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: Number, required: true },
}, { timestamps: true })


const Verification = models.Verification || model("Verification", verificationSchema)

export default Verification