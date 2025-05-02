import pool from "./database.js";

async function main() {
    try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conexión exitosa. Hora del servidor:', res.rows[0]);
} catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
} finally {
    pool.end();
}
}

main();
