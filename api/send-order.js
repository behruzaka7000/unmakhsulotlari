export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, address, product, price } = req.body;

  const text = `
🛒 Yangi buyurtma!

👤 Ism: ${name}
📞 Telefon: ${phone}
📍 Manzil: ${address}

📦 Mahsulot: ${product}
💰 Narxi: ${price}
`;

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text,
    }),
  });

  return res.status(200).json({ success: true });
}
