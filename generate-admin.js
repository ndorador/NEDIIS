// generate-admin.js
import bcrypt from 'bcryptjs';

async function hashPassword() {
  // AQUÍ va la contraseña que TÚ quieres usar para iniciar sesión
  const password = 'admin_password_123'; 

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  console.log('Este es el hash que debes copiar y pegar en la base de datos:');
  console.log(hashedPassword);
}

hashPassword();