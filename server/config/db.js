import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos REMOTA
const dbConfig = {
  host: 'nediis.cl', // ej: 'sql101.yourhosting.com' o una IP
  user: 'nediiscl_kelmiis',     // ej: 'usuario_empresa'
  password: 'Kelmiis.2935',
  database: 'nediiscl_orion' // ej: 'usuario_empresa_software_db'
};

/*$dbHost="localhost";
$dbName="gedescon_gestion";
$dbUser="gedescon_gestor";
$dbPass="PruebaExitosa123";*/

// Crear un "pool" de conexiones para mayor eficiencia
const pool = mysql.createPool(dbConfig);

// Función para probar la conexión al iniciar el servidor
export const testConnection = async () => {
  try {
    // Intenta obtener una conexión del pool
    const connection = await pool.getConnection();
    console.log('✅ Conexión a la base de datos REMOTA exitosa.');
    // Libera la conexión de vuelta al pool
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos REMOTA:', error);
  }
};

// Exportamos el pool para poder usarlo en otras partes de la aplicación
export default pool;