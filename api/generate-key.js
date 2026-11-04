import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Solo permitimos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { product, email } = req.body;

    // Verificar si se proporcionaron los datos
    if (!product || !email) {
      return res.status(400).json({ error: 'Missing product or email' });
    }

    // La llave privada viene SOLO de la variable de entorno. Nunca en el código.
    const privateKey = process.env.TZANIX_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!privateKey) {
      console.error('FATAL: TZANIX_PRIVATE_KEY no está configurada en el entorno.');
      return res.status(500).json({ error: 'Internal Server Error: Key configuration missing.' });
    }

    // Payload de la licencia
    const payload = {
      product: product,
      email: email,
      type: 'trial',
      issuer: 'tzanix-auth-gateway'
    };

    // Firmar con algoritmo RS256 y expiración exacta de 33 días
    const token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '33d'
    });

    // Añadimos el prefijo según el producto para mantener tu estética
    const prefixes = {
      'gateway': 'tzx_gw_',
      'qbalam': 'tzx_qb_'
    };
    
    const prefix = prefixes[product] || 'tzx_lic_';
    
    // Notificación a Web3Forms
    try {
      // Usar llave quemada o la del env para seguridad
      const accessKey = process.env.WEB3FORMS_ACCESS_KEY || '72ab50e1-c1fc-4828-8f95-f2e20093d125';
      if (accessKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `🚀 NUEVO LEAD: ${email} ha descargado ${product.toUpperCase()}`,
            email: email,
            message: `¡Atención! Un nuevo cliente corporativo ha generado una llave de prueba para el motor TZANiX.\n\n📧 Correo: ${email}\n⚙️ Producto: ${product}\n🕒 Timestamp: ${new Date().toISOString()}\n\n🔑 Puedes contactarlos de inmediato para darles seguimiento técnico a su Prueba de Concepto.`,
            from_name: "TZANiX Gateway",
          })
        });
      }
    } catch (e) {
      console.error("No se pudo enviar notificación de lead: ", e);
    }

    // Retornamos la API KEY que el usuario copiará
    return res.status(200).json({ 
      apiKey: `${prefix}${token}`
    });

  } catch (error) {
    console.error('Error generating license token:', error);
    return res.status(500).json({ error: 'Failed to generate license token' });
  }
}
