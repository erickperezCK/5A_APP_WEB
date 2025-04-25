import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

// Estilos modernos y estructurados
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: "Helvetica",
    },
    header: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        color: "#2c3e50",
        fontWeight: "bold",
    },
    section: {
        marginBottom: 15,
    },
    label: {
        fontWeight: "bold",
        color: "#34495e",
    },
    value: {
        marginLeft: 5,
    },
    row: {
        flexDirection: "row",
        marginBottom: 4,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottom: "1px solid #ccc",
        paddingBottom: 5,
        marginBottom: 5,
        backgroundColor: "#f2f2f2",
    },
    tableRow: {
        flexDirection: "row",
        marginBottom: 3,
    },
    cell: {
        flex: 1,
    },
    totalSection: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#ecf0f1",
        borderRadius: 6,
        textAlign: "right",
    },
    totalText: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

const PurchasePDF = ({ car, user, totalPrice, services, imageSrc }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Comprobante de Compra de Vehículo</Text>

            {/* Cliente */}
            <View style={styles.section}>
                <Text style={{ ...styles.label, marginBottom: 4 }}>Información del Cliente</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.value}>{user.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Correo:</Text>
                    <Text style={styles.value}>{user.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.value}>{user.cellphone}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Dirección:</Text>
                    <Text style={styles.value}>{`${user.address}, ${user.municipality}, ${user.state}`}</Text>
                </View>
            </View>

            {/* Vehículo */}
            <View style={styles.section}>
                <Text style={{ ...styles.label, marginBottom: 4 }}>Información del Vehículo</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.value}>{car.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Color:</Text>
                    <Text style={styles.value}>{car.color}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Año:</Text>
                    <Text style={styles.value}>{car.year}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Motor:</Text>
                    <Text style={styles.value}>{car.motor}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Marca:</Text>
                    <Text style={styles.value}>{car.brand_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Modelo:</Text>
                    <Text style={styles.value}>{car.model_name}</Text>
                </View>
                {imageSrc && (
                    <View style={{ marginBottom: 15, alignItems: "center" }}>
                        <Image
                            src={imageSrc}
                            style={{ width: 200, height: 120, objectFit: "cover", borderRadius: 5 }}
                        />
                    </View>
                )}
            </View>

            {/* Servicios adicionales */}
            {services.length > 0 && (
                <View style={styles.section}>
                    <Text style={{ ...styles.label, marginBottom: 4 }}>Servicios Adicionales</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.cell}>Nombre</Text>
                        <Text style={styles.cell}>Tipo</Text>
                        <Text style={styles.cell}>Precio</Text>
                    </View>
                    {services.map((s, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.cell}>{s.name}</Text>
                            <Text style={styles.cell}>
                                {s.type === "monthly" ? "Mensual" :
                                 s.type === "annual" ? "Anual" :
                                 "Único pago"}
                            </Text>
                            <Text style={styles.cell}>${Number(s.price).toFixed(2)}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Total */}
            <View style={styles.totalSection}>
                <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
            </View>
        </Page>
    </Document>
);

export default PurchasePDF;
