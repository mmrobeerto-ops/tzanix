import jwt from 'jsonwebtoken';

export default function handler(req, res) {
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

    // Usaremos la llave privada de Vercel. 
    // En desarrollo, puedes ponerla en un .env.local
    // Reemplazamos \n literales si vienen de las variables de entorno de Vercel
    const privateKey = process.env.TZANIX_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!privateKey) {
      console.error('FATAL: TZANIX_PRIVATE_KEY is not defined in environment variables.');
      return res.status(500).json({ error: 'Internal Server Error: Key configuration missing.' });
    }

    // Payload de la licencia
    const payload = {
      product: product,
      email: email,
      type: 'trial',
      issuer: 'tzanix-auth-gateway'
    };

    // Firmar con algoritmo RS256 y expiración exacta de 3 meses (90 días)
    const token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '90d'
    });

    // Añadimos el prefijo según el producto para mantener tu estética
    const prefixes = {
      'gateway': 'tzx_gw_',
      'qbalam': 'tzx_qb_',
      'singularity': 'tzx_sg_'
    };
    
    const prefix = prefixes[product] || 'tzx_lic_';
    
    // Retornamos la API KEY que el usuario copiará
    return res.status(200).json({ 
      apiKey: `${prefix}${token}`
    });

  } catch (error) {
    console.error('Error generating license token:', error);
    return res.status(500).json({ error: 'Failed to generate license token' });
  }
}
