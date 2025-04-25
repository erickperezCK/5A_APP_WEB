const mqtt = require('mqtt');
const Device = require('../models/Device');
const SensorData = require('../models/SensorData');
const Notification = require("../models/Notification"); 

const MQTT_BROKER_URL = 'mqtt://test.mosquitto.org';
const TOPIC_PATTERN = '/move/device/+/+';

const DEFAULT_THRESHOLDS = {
    temperature: { lower: 10, upper: 34 },
    humidity: { lower: 5, upper: 60 },
    light: { lower: 0, upper: 200 },
    sound: { lower: 0, upper: 70 },
    co2: { lower: 0, upper: 800 }
};

const SENSOR_TRANSLATIONS = {
    light: "luz",
    sound: "sonido",
    temperature: "temperatura",
    humidity: "humedad",
    co2: "dióxido de carbono"
};

// Cache para evitar múltiples notificaciones del mismo problema
const notificationCache = new Map();

function setupMQTTConnection() {
    const client = mqtt.connect(MQTT_BROKER_URL);

    client.on('connect', () => {
        console.log('Connected to MQTT Broker');
        client.subscribe(TOPIC_PATTERN, (err) => {
            if (err) {
                console.error('MQTT Subscription error:', err);
            } else {
                console.log(`Subscribed to topic: ${TOPIC_PATTERN}`);
            }
        });
    });

    client.on('message', async (topic, message) => {
        try {
            const topicParts = topic.split('/');
            const deviceId = topicParts[3];
            const sensorName = topicParts[4];

            let sensorValue = null;
            const messageStr = message.toString().trim();
            
            if (messageStr !== 'null' && messageStr !== '') {
                const parsedValue = Number(messageStr);
                if (!isNaN(parsedValue)) {
                    sensorValue = parsedValue;
                } else {
                    console.warn(`Valor no numérico recibido para ${sensorName}: ${messageStr}`);
                    return;
                }
            } else {
                console.log(`Valor nulo recibido para ${sensorName}, ignorando...`);
                return;
            }

            // Verificar si el dispositivo existe
            const device = await Device.findOne({ id: deviceId });
            if (!device) {
                console.log(`Dispositivo ${deviceId} no registrado. Datos ignorados.`);
                return;
            }

            // Buscar todos los documentos de sensores con el mismo nombre para este dispositivo
            const sensorDatas = await SensorData.find({
                device: device._id,
                sensorName: sensorName
            });

            let sensorData;
            
            // Si no hay documentos existentes, crear uno nuevo
            if (sensorDatas.length === 0) {
                const thresholds = DEFAULT_THRESHOLDS[sensorName] || { lower: 0, upper: 100 };
                sensorData = new SensorData({
                    device: device._id,
                    sensorName: sensorName,
                    thresholds: thresholds,
                    data: []
                });
            } 
            // Si hay múltiples documentos, consolidarlos en el primero y eliminar los demás
            else if (sensorDatas.length > 1) {
                console.log(`Múltiples registros encontrados para ${sensorName}, consolidando...`);
                
                // Usar el primer documento como principal
                sensorData = sensorDatas[0];
                
                // Consolidar datos de los otros documentos
                for (let i = 1; i < sensorDatas.length; i++) {
                    sensorData.data.push(...sensorDatas[i].data);
                    await SensorData.deleteOne({ _id: sensorDatas[i]._id });
                }
                
                // Ordenar datos por fecha
                sensorData.data.sort((a, b) => a.time - b.time);
            } 
            // Si solo hay un documento, usarlo
            else {
                sensorData = sensorDatas[0];
            }

            // Asegurarse de que los umbrales estén configurados
            if (!sensorData.thresholds) {
                sensorData.thresholds = DEFAULT_THRESHOLDS[sensorName] || { lower: 0, upper: 100 };
            }

            // Agregar nuevo dato
            const newDataPoint = {
                time: new Date(),
                value: sensorValue
            };
            
            sensorData.data.push(newDataPoint);
            
            // Limitar el tamaño del historial para evitar colecciones demasiado grandes
            if (sensorData.data.length > 1000) {
                sensorData.data = sensorData.data.slice(-1000);
            }

            await sensorData.save();

            // Verificar umbrales
            const { lower, upper } = sensorData.thresholds;
            const exceedsUpper = upper !== undefined && sensorValue > upper;
            const belowLower = lower !== undefined && sensorValue < lower;
            const thresholdBreached = exceedsUpper || belowLower;

            if (thresholdBreached) {
                const cacheKey = `${deviceId}-${sensorName}-${exceedsUpper ? 'high' : 'low'}`;
                const lastNotificationTime = notificationCache.get(cacheKey);
                
                // Solo enviar notificación si no hemos notificado recientemente (evitar spam)
                if (!lastNotificationTime || (Date.now() - lastNotificationTime) > 60000) {
                    const translatedSensorName = SENSOR_TRANSLATIONS[sensorName] || sensorName;
                    const thresholdType = exceedsUpper ? 'superior' : 'inferior';
                    const thresholdValue = exceedsUpper ? upper : lower;

                    const newNotification = new Notification({
                        name: `Alerta de ${translatedSensorName}`,
                        date: new Date(),
                        sensor: translatedSensorName,
                        device: device._id,
                        value: sensorValue.toString(),
                        building: device.building || "Desconocido",
                        space: device.space || "Desconocido",
                        status: true,
                        message: `El valor (${sensorValue}) ha superado el umbral ${thresholdType} (${thresholdValue})`
                    });

                    const savedNotification = await newNotification.save();
                    notificationCache.set(cacheKey, Date.now());

                    // Enviar notificación por MQTT
                    const alertClient = mqtt.connect(MQTT_BROKER_URL);
                    alertClient.on('connect', () => {
                        const alertTopic = `/move/alerts/${deviceId}`;
                        alertClient.publish(alertTopic, JSON.stringify({
                            id: savedNotification._id.toString(),
                            sensor: sensorName,
                            value: sensorValue,
                            threshold: thresholdValue,
                            isAbove: exceedsUpper
                        }), () => {
                            alertClient.end();
                        });
                        console.log(`Notificación enviada al dispositivo ${deviceId}`);
                    });
                }
            }

            console.log(`Dato guardado: ${sensorName} = ${sensorValue} para dispositivo ${deviceId}`);
        } catch (error) {
            console.error('Error procesando mensaje MQTT:', error);
        }
    });

    client.on('error', (err) => {
        console.error('MQTT Connection error:', err);
    });

    client.on('close', () => {
        console.log('MQTT connection closed');
    });

    return client;
}

module.exports = setupMQTTConnection;