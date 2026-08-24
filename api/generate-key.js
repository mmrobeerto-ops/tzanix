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

    // Intentamos leer de Vercel .env.local
    let privateKey = process.env.TZANIX_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // FALLBACK: Si Vercel CLI no carga el .env.local, usamos la llave quemada en código (solo para la prueba local)
    if (!privateKey) {
      privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC744Fg9CemtxeE
dT2UNm3mhXLuovnY75Wl+flzHoDh81XxdQm1vo3gc/ZnnwV5kDkrvpMVzzl4KRge
Bv+e+X3CQM5sKlwCdwsYDwV+jqDmarFv0GJ3F0kgnwFGAPK+zyQr+PoV6FvHCDQ4
zjhXl+KCF44eKD38biE/fRrjAAugyGt58kIlf1wN9mc8//+zgtsWQ0gbii+ZjUNF
VomOYmI7HgjfdSSiSf4XeraCmS/RYeFO97fuaa4XWDrQdWiT4C6FjD9gd/x5lsAj
uENmSpk1mi70ABqb1ULZNLvK0PjwrYJJsKUCKyqa5RyZQ4nsHLrAQUtCjDoj0Jtg
lT5RvmytAgMBAAECggEABbbnbDS40QIAEdwD/bJDGPAFnRrxWOb+iPAHpXfvyQ9+
1WtvGms7gvBb9e5Y+wfHKVywOglVsOElFeK2GxZw+/u/G3yVVFDdEkQAsYbyf1eO
4nz2xbL8WyTi48drGqEPs1Os/YYV5oGKHxEslwNsVPMU9DdanUcXNUhfjThm4iKx
A7lsjbfBTHXrZgrp6gkfNFQK04Fqv4ptUcw+5VCKAZSwD9CgmjQfG9lhB3v9Yw/L
ig0w5YLuvvGQp2uZ6kgQqX7HDArV20S8SXEj+6l3yEpcPvmHj4dWIXNcQ4Q2CXKo
c2DvvNg8poCypXVbhNkPfcrGi3IxfvnwbxuXEK/x+QKBgQDhHQOqvTTxLj3vgzmI
lPvM7LkBKPP+4+NSGrDLsu5oTv+UwYDPQM1VAkqYkfKYQ+su60IaGxtjBBbHGRA2
sqQxGHy0R8HZ3qKkj5OJRkkQeKc3vRGg7GXr+H01GWJ+fTmi1GE60kCnF/OxzBKy
+hfp97v+y4TNVGBau5ml/dMUuQKBgQDVqv7NdawfAZlXNGvUNTk51gbWd0JjD5vl
g7UpMBEjOvv7pWU0fc9U3cU+a01hH07/eCIFYYklnuMa6BIm0UdtgjIeXl6e6mC5
JM0MeepsWmwbGc5Uj4AUWDF6cYoFPCtJ9PzRL9KwoAVF68ogvHOsnbfTe/mociPQ
YzjFd/nFlQKBgBZAVfJ0jV0howGfyPoVL+aLp6XTtHqHcBrXhI49+47X8C92CRNz
Zlh2x4TZOE+QtxiGLJyD/WsGJnI7qfyeH9iygPEY/rJYbV8yyfSRu/si0fSSfcGY
XGK8xzOOdMvn+OB9ebbkvXtGxNHYSCjky6RW1oBTAaeCJZwSWxerRUgRAoGAIdDC
Kroo129lWUvOlPMnb2PUCTUuqIbb4WMK1M3qqGy5XIY8kiYnHgNLKCnLQUe3NO9K
UxewoOeYgbWgycvtRgOI8w10ZCorzKFqYkMZOrTEzzUyVmevmYirq/k0Isf3Aeln
6aNr8NAihYJfpvasR/FeGnZQeLw3ts89OONYAFECgYEAq2T/EvHPyZHs371RC8Cz
laeYU2kzAJyvZIRQnZgoKdYflp6+BsSLuVfwZo6vpGYIeMBE8emfJB69qTp/vOQf
13akYevJpB9cNUN6rC+XHyWQqmSAwG1dICGMNLdU6PUt+hC1NHIQShhCyFNk8oyq
hXor432YhN/LP5RhS+R1clk=
-----END PRIVATE KEY-----`;
    }

    if (!privateKey) {
      console.error('FATAL: TZANIX_PRIVATE_KEY is completely missing.');
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
