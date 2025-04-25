const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: [true, 'El ID del dispositivo es obligatorio']
    },
    sensorName: {
        type: String,
        required: [true, 'El nombre del sensor es obligatorio'],
        trim: true,
        enum: ['temperature', 'humidity', 'light', 'sound', 'co2'] // Opcional: limita los valores posibles
    },
    thresholds: {
        upper: {
            type: Number,
            required: false,
            default: 80 // Default value
        },
        lower: {
            type: Number,
            required: false,
            default: 20 // Default value
        }
    },
    data: [
        {
            time: {
                type: Date,
                required: [true, 'La hora es obligatoria'],
                default: Date.now
            },
            value: {
                type: Number,
                required: [true, 'El valor del sensor es obligatorio']
            }
        }
    ]
}, { timestamps: true });

sensorDataSchema.index({ device: 1, sensorName: 1 }, { unique: true });

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;