const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const ankletItems = [
    { name: 'Crystal Payal Anklet', image: 'images/a1.jpg', price: 1250, original: 1650 },
    { name: 'Beaded Charm Payal', image: 'images/a2.jpg', price: 1150, original: 1550 },
    { name: 'Traditional Kundan Payal', image: 'images/a3.jpg', price: 1350, original: 1800 },
    { name: 'Delicate Pearl Payal', image: 'images/a4.jpg', price: 1050, original: 1450 },
    { name: 'Royal Ghungroo Payal', image: 'images/a5.jpg', price: 1290, original: 1700 },
    { name: 'Floral Crystal Anklet', image: 'images/a6.jpg', price: 1190, original: 1600 },
    { name: 'Minimalist Chain Payal', image: 'images/a7.jpg', price: 990, original: 1350 },
    { name: 'Double-Layer Payal', image: 'images/a8.jpg', price: 1450, original: 1950 },
    { name: 'Antique Finish Payal', image: 'images/a9.jpg', price: 1290, original: 1750 },
    { name: 'Charm Drop Anklet', image: 'images/a10.jpg', price: 1100, original: 1500 },
    { name: 'Bohemian Bell Anklet', image: 'images/a11.jpg', price: 950, original: 1300 },
    { name: 'Crystal Heart Payal', image: 'images/a12.jpg', price: 1080, original: 1480 },
    { name: 'Rose Metallic Payal', image: 'images/a13.jpg', price: 1200, original: 1600 },
    { name: 'Twinkling Star Anklet', image: 'images/a14.jpg', price: 990, original: 1390 },
    { name: 'Oxidized Silver Payal', image: 'images/a15.jpg', price: 1150, original: 1550 },
    { name: 'Vintage Gemstone Anklet', image: 'images/a16.jpg', price: 1300, original: 1750 },
    { name: 'Sleek Crystal Payal', image: 'images/a17.jpg', price: 1250, original: 1680 },
    { name: 'Luxury Payal Set', image: 'images/a18.jpg', price: 1490, original: 1990 },
    { name: 'Layered Pearl Payal', image: 'images/a19.jpg', price: 1180, original: 1580 },
    { name: 'Royal Ruby Accent Payal', image: 'images/a20.jpg', price: 1380, original: 1850 },
    { name: 'Simple Link Anklet', image: 'images/a21.jpg', price: 920, original: 1250 },
    { name: 'Emerald Bead Payal', image: 'images/a22.jpg', price: 1270, original: 1690 },
    { name: 'Polished Crystal Anklet', image: 'images/a23.jpg', price: 1340, original: 1780 },
    { name: 'Heritage Pakistani Payal', image: 'images/a24.jpg', price: 1420, original: 1890 },
    { name: 'Royal Velvet Payal Set', image: 'images/a25.jpg', price: 1390, original: 1850 },
    { name: 'Grand Kundan Payal', image: 'images/a26.jpg', price: 1480, original: 1980 },
    { name: 'Classic Pearl Anklet', image: 'images/a27.jpg', price: 1150, original: 1520 },
    { name: 'Premium Ghungroo Payal', image: 'images/aa1.jpg', price: 1550, original: 2050 }
].map(item => ({ ...item, category: 'anklet' }));

const braceletItems = [
    { name: 'Kundan Bangle Bracelet', image: 'images/b1.jpg', price: 1450, original: 1950 },
    { name: 'Crystal Tennis Bracelet', image: 'images/b2.jpg', price: 1350, original: 1800 },
    { name: 'Luxury Cuff Bracelet', image: 'images/b3.jpg', price: 1650, original: 2150 },
    { name: 'Pearl Cluster Bracelet', image: 'images/b4.jpg', price: 1550, original: 2050 },
    { name: 'Filigree Bangle Set', image: 'images/b5.jpg', price: 1850, original: 2450 },
    { name: 'Floral Crystal Bracelet', image: 'images/b6.jpg', price: 1490, original: 1990 },
    { name: 'Rose Metallic Charm Bracelet', image: 'images/b7.jpg', price: 1390, original: 1850 },
    { name: 'Traditional Kada Bangle', image: 'images/b8.jpg', price: 1750, original: 2300 },
    { name: 'Royal Ruby Bracelet', image: 'images/b9.jpg', price: 1690, original: 2250 },
    { name: 'Emerald Cut Stone Bracelet', image: 'images/b10.jpg', price: 1590, original: 2100 },
    { name: 'Sleek Metallic Bangle', image: 'images/b11.jpg', price: 1290, original: 1750 },
    { name: 'Sparkling Dust Bangle', image: 'images/b12.jpg', price: 1480, original: 1980 },
    { name: 'Traditional Chura Bangle Set', image: 'images/b13.jpg', price: 2450, original: 3200 },
    { name: 'Open Cuff Gemstone Bracelet', image: 'images/b14.jpg', price: 1520, original: 2020 },
    { name: 'Classic Pearl Bangle', image: 'images/b15.jpg', price: 1380, original: 1850 },
    { name: 'Vintage Art Deco Bracelet', image: 'images/b16.jpg', price: 1620, original: 2150 },
    { name: 'Statement Metallic Bangle', image: 'images/b17.jpg', price: 1790, original: 2350 },
    { name: 'Filigree Cuff Bangle', image: 'images/b18.jpg', price: 1450, original: 1920 },
    { name: 'Heritage Kada Set', image: 'images/b19.jpg', price: 1850, original: 2450 },
    { name: 'Royal Kundan Chura', image: 'images/b20.jpg', price: 1950, original: 2600 },
    { name: 'Multi-Stone Partywear Bracelet', image: 'images/b21.jpg', price: 1890, original: 2490 },
    { name: 'Rose Metallic Tennis Bracelet', image: 'images/b22.jpg', price: 1420, original: 1890 },
    { name: 'Floral Crystal Bangle', image: 'images/b23.jpg', price: 1580, original: 2100 },
    { name: 'Velvet Chura Set', image: 'images/b24.jpg', price: 2250, original: 2980 },
    { name: 'Antique Finish Bangle', image: 'images/b25.jpg', price: 1650, original: 2180 },
    { name: 'Ruby Cluster Bracelet', image: 'images/b26.jpg', price: 1720, original: 2290 },
    { name: 'Emerald Bangle Set', image: 'images/b27.jpg', price: 1810, original: 2400 },
    { name: 'Pearl Link Bracelet', image: 'images/b28.jpg', price: 1390, original: 1850 },
    { name: 'Polished Cut Kada', image: 'images/b29.jpg', price: 1680, original: 2220 },
    { name: 'Royal Solitaire Bracelet', image: 'images/b30.jpg', price: 1750, original: 2320 },
    { name: 'Deluxe Kundan Bangle Set', image: 'images/b31.jpg', price: 1990, original: 2650 },
    { name: 'Luxe Crystal Tennis Bracelet', image: 'images/b2.avif', price: 1450, original: 1950 },
    { name: 'Royal Kundan Kada Bangle', image: 'images/b3.avif', price: 1750, original: 2300 },
    { name: 'Pearl Cluster Charm Bangle', image: 'images/b4.avif', price: 1550, original: 2050 },
    { name: 'Twisted Metallic Bracelet', image: 'images/b111.jpg', price: 1290, original: 1750 }
].map(item => ({ ...item, category: 'bracelet' }));

const earringItems = [
    { name: 'Royal Crystal Jhumka Drop', image: 'images/e1.jpg', price: 1650, original: 2200 },
    { name: 'Pearl & Kundan Chandbali', image: 'images/e2.jpg', price: 1750, original: 2300 },
    { name: 'Emerald Gemstone Statement Earrings', image: 'images/e3.jpg', price: 1550, original: 2100 },
    { name: 'Minimalist Pearl Stud Earrings', image: 'images/e4.jpg', price: 1150, original: 1550 },
    { name: 'Rose Metallic Hoop Earrings', image: 'images/e5.jpg', price: 1250, original: 1680 },
    { name: 'Ruby Drop Traditional Earrings', image: 'images/e6.jpg', price: 1690, original: 2250 },
    { name: 'Crystal Cluster Party Earrings', image: 'images/e7.jpg', price: 1490, original: 1990 },
    { name: 'Kashmiri Long Dangle Earrings', image: 'images/e8.jpg', price: 1850, original: 2450 },
    { name: 'Polished Solitaire Studs', image: 'images/e9.jpg', price: 1290, original: 1750 },
    { name: 'Filigree Vintage Earrings', image: 'images/e10.jpg', price: 1580, original: 2100 },
    { name: 'Sapphire Blue Drop Earrings', image: 'images/e11.jpg', price: 1620, original: 2150 },
    { name: 'Heavy Artificial Kundan Earrings', image: 'images/e12.jpg', price: 1950, original: 2600 },
    { name: 'Polki Style Traditional Earrings', image: 'images/e13.jpg', price: 1720, original: 2300 },
    { name: 'Butterfly Crystal Drop Earrings', image: 'images/e14.jpg', price: 1380, original: 1850 },
    { name: 'Sunburst Jhumkas', image: 'images/e15.jpg', price: 1650, original: 2200 },
    { name: 'Multi-Color Gemstone Earrings', image: 'images/e16.jpg', price: 1480, original: 1980 },
    { name: 'Oxidized Silver Dangle Earrings', image: 'images/e17.jpg', price: 1250, original: 1650 },
    { name: 'Pearl Hoop Statement Earrings', image: 'images/e18.jpg', price: 1390, original: 1890 },
    { name: 'Teardrop Crystal Earrings', image: 'images/e19.jpg', price: 1520, original: 2020 },
    { name: 'Royal Crest Kundan Earrings', image: 'images/e21.jpg', price: 1890, original: 2490 },
    { name: 'Geometric Crystal Studs', image: 'images/e22.jpg', price: 1190, original: 1590 },
    { name: 'Flower Cluster Drop Earrings', image: 'images/e23.jpg', price: 1450, original: 1950 },
    { name: 'Rose Metallic Tassel Earrings', image: 'images/e24.jpg', price: 1350, original: 1800 },
    { name: 'Ruby Floral Chandbali Earrings', image: 'images/e25.jpg', price: 1820, original: 2420 },
    { name: 'Fine Crystal Huggie Earrings', image: 'images/e26.jpg', price: 1280, original: 1700 },
    { name: 'Delicate Pearl Chain Drop Earrings', image: 'images/e27.jpg', price: 1320, original: 1750 },
    { name: 'Antique Temple Earrings', image: 'images/e28.jpg', price: 1690, original: 2250 },
    { name: 'Solitaire Crystal Stud Earrings', image: 'images/e29.jpg', price: 1220, original: 1620 },
    { name: 'Layered Pearl Drop Jhumkas', image: 'images/e30.jpg', price: 1750, original: 2350 },
    { name: 'Grand Chandbali Set', image: 'images/e31.jpg', price: 2150, original: 2850 },
    { name: 'Chic Oval Crystal Earrings', image: 'images/e32.jpg', price: 1390, original: 1850 },
    { name: 'Starfall Crystal Dangle Earrings', image: 'images/e33.jpg', price: 1460, original: 1960 },
    { name: 'Emerald Velvet Statement Earrings', image: 'images/e34.jpg', price: 1680, original: 2250 },
    { name: 'Lattice Vintage Earrings', image: 'images/e36.jpg', price: 1550, original: 2050 },
    { name: 'Royal Crystal Jhumka Special', image: 'images/e1.webp', price: 1650, original: 2200 },
    { name: 'Luxe Emerald Jhumki Set', image: 'images/e20.webp', price: 1780, original: 2380 },
    { name: 'Luxe Ruby Chandelier Earrings', image: 'images/e35.webp', price: 1890, original: 2500 },
    { name: 'Emerald Drop Classic Jhumkas', image: 'images/earings.jpg', price: 1650, original: 2200 },
    { name: 'Pearl Stud Earrings Classic Set', image: 'images/earingss.jpg', price: 1250, original: 1650 },
    { name: 'Chandbali Statement Earrings Classic', image: 'images/earingsss.jpg', price: 1750, original: 2300 },
    { name: 'Kashmiri Drop Traditional Earrings', image: 'images/earrings.jpg', price: 1550, original: 2000 }
].map(item => ({ ...item, category: 'earrings' }));

const necklaceItems = [
    { name: 'Royal Pearl Choker Set', image: 'images/n1.jpg', price: 2450, original: 3200 },
    { name: 'Traditional Kundan Guluband Set', image: 'images/n2.jpg', price: 4850, original: 6400 },
    { name: 'Emerald Drop Necklace Set', image: 'images/n3.jpg', price: 3250, original: 4200 },
    { name: 'Ruby Rose Haar Set', image: 'images/n4.jpg', price: 2850, original: 3700 },
    { name: 'Crystal Statement Choker', image: 'images/n5.jpg', price: 2950, original: 3800 },
    { name: 'Polki Designer Necklace', image: 'images/n6.jpg', price: 3450, original: 4500 },
    { name: 'Baroque Pearl Layered Set', image: 'images/n7.jpg', price: 2650, original: 3500 },
    { name: 'Classic Necklace Set', image: 'images/n8.jpg', price: 4200, original: 5500 },
    { name: 'Traditional Metallic Mala Set', image: 'images/n9.jpg', price: 2150, original: 2800 },
    { name: 'Crystal Heart Necklace Set', image: 'images/n10.jpg', price: 1850, original: 2400 },
    { name: 'Elegant Chain Necklace', image: 'images/n11.jpg', price: 1950, original: 2500 },
    { name: 'Rose Quartz Floral Necklace Set', image: 'images/n12.jpg', price: 2350, original: 3100 },
    { name: 'Navratna Royal Necklace Set', image: 'images/n13.jpg', price: 3850, original: 4950 },
    { name: 'Royal Solitaire Crystal Necklace', image: 'images/n14.jpg', price: 1990, original: 2600 },
    { name: 'Velvet Choker Necklace Set', image: 'images/n15.jpg', price: 2250, original: 2950 },
    { name: 'Vintage Coin Mala Set', image: 'images/n16.jpg', price: 2750, original: 3600 },
    { name: 'Delicate Chain Pendant Necklace', image: 'images/n17.jpg', price: 1650, original: 2150 },
    { name: 'Emerald Royal Haar Set', image: 'images/n18.jpg', price: 3650, original: 4750 },
    { name: 'Sapphire Elegance Choker', image: 'images/n19.jpg', price: 3100, original: 4000 },
    { name: 'Pearl Strand Layered Mala', image: 'images/n20.jpg', price: 2490, original: 3250 },
    { name: 'Heritage Pakistani Choker Set', image: 'images/n21.jpg', price: 4450, original: 5800 },
    { name: 'Polished Crystal Haar Set', image: 'images/n22.jpg', price: 3950, original: 5200 },
    { name: 'Royal Pearl Choker Set Premium', image: 'images/neclace.jpg', price: 2450, original: 3200 },
    { name: 'Ruby Rose Haar Set Special', image: 'images/neclace2.avif', price: 2850, original: 3700 },
    { name: 'Crystal Heart Locket Necklace', image: 'images/neclace4.jpg', price: 1350, original: 1800 },
    { name: 'Kundan Statement Necklace', image: 'images/neclacee.jpg', price: 3850, original: 4900 },
    { name: 'Classic Pendant Necklace', image: 'images/neclaceee.jpg', price: 1450, original: 1900 },
    { name: 'Kundan Guluband Full Heavy Set', image: 'images/neclacefullsett.jpg', price: 4850, original: 6400 },
    { name: 'Emerald Floral Choker Set', image: 'images/neclae.jpg', price: 2750, original: 3600 },
    { name: 'Navratna Royal Full Set', image: 'images/neclanefullset.jpg', price: 3450, original: 4500 },
    { name: 'Baroque Pearl Layered Necklace Set', image: 'images/neklace.avif', price: 2650, original: 3500 },
    { name: 'Heritage Classic Necklace Set', image: 'images/neklace.jpg', price: 3450, original: 4600 },
    { name: 'Rose Quartz Floral Choker Set', image: 'images/neklcae3.jpg', price: 1250, original: 1650 },
    { name: 'Classic Pearl & Crystal Necklace Set', image: 'images/neklce set.jpg', price: 2250, original: 2950 },
    { name: 'Royal Solitaire Crystal Locket', image: 'images/nelcave.jpg', price: 1350, original: 1750 },
    { name: 'Luxe Emerald Pearl Haar', image: 'images/14.jpg', price: 3250, original: 4200 }
].map(item => ({ ...item, category: 'necklace' }));

const ringItems = [
    { name: 'Crystal Solitaire Ring', image: 'images/r1.jpg', price: 1250, original: 1650 },
    { name: 'Champagne Crystal Ring', image: 'images/r2.jpg', price: 1300, original: 1700 },
    { name: 'Pink Floral Cocktail Ring', image: 'images/r3.jpg', price: 1350, original: 1750 },
    { name: 'Oval Cut Vintage Ring', image: 'images/r4.jpg', price: 1400, original: 1800 },
    { name: 'Emerald Solitaire Ring', image: 'images/r5.jpg', price: 1450, original: 1850 },
    { name: 'Royal Ruby Cluster Ring', image: 'images/r6.jpg', price: 1500, original: 1900 },
    { name: 'Eternity Band Ring', image: 'images/r7.jpg', price: 1200, original: 1600 },
    { name: 'Classic Stacking Ring', image: 'images/r8.jpg', price: 1280, original: 1680 },
    { name: 'Crown Solitaire Ring', image: 'images/r9.jpg', price: 1320, original: 1720 },
    { name: 'Polished Halo Ring', image: 'images/r10.jpg', price: 1380, original: 1780 },
    { name: 'Pearl & Crystal Ring', image: 'images/r11.jpg', price: 1220, original: 1620 },
    { name: 'Vintage Filigree Ring', image: 'images/r12.jpg', price: 1420, original: 1820 },
    { name: 'Heart Cut Solitaire Ring', image: 'images/r13.jpg', price: 1260, original: 1660 },
    { name: 'Cushion Cut Crystal Ring', image: 'images/r14.jpg', price: 1460, original: 1860 },
    { name: 'Princess Cut Ring', image: 'images/r15.png', price: 1340, original: 1740 },
    { name: 'Sapphire Blue Cocktail Ring', image: 'images/r16.jpg', price: 1490, original: 1890 },
    { name: 'Marquise Gemstone Ring', image: 'images/r17.jpg', price: 1390, original: 1790 },
    { name: 'Twisted Band Solitaire Ring', image: 'images/r18.jpg', price: 1240, original: 1640 },
    { name: 'Sunburst Crystal Ring', image: 'images/r19.jpg', price: 1440, original: 1840 },
    { name: 'Antique Kundan Statement Ring', image: 'images/r20.jpg', price: 1480, original: 1880 },
    { name: 'Delicate Rose Ring', image: 'images/r21.jpg', price: 1210, original: 1610 },
    { name: 'Butterfly Crystal Ring', image: 'images/r22.jpg', price: 1290, original: 1690 },
    { name: 'Tear Drop Solitaire Ring', image: 'images/r23.jpg', price: 1360, original: 1760 },
    { name: 'Double Row Eternity Ring', image: 'images/r24.jpg', price: 1310, original: 1710 },
    { name: 'Royal Crest Cocktail Ring', image: 'images/r25.jpg', price: 1470, original: 1870 },
    { name: 'Pear Cut Crystal Ring', image: 'images/r26.jpg', price: 1500, original: 1900 },
    { name: 'Solitaire Crystal Ring Deluxe', image: 'images/r1.webp', price: 1250, original: 1650 },
    { name: 'Adjustable Crystal Ring', image: 'images/ringa11.jpg', price: 1250, original: 1650 },
    { name: 'Vintage Flower Ring', image: 'images/ringa4.jpg', price: 1350, original: 1750 },
    { name: 'Fancy Solitaire Ring Classic', image: 'images/rings.jpg', price: 1200, original: 1600 },
    { name: 'Champagne Solitaire Ring Luxe', image: 'images/rings1.jpg', price: 1300, original: 1700 },
    { name: 'Pink Floral Crystal Ring Choice', image: 'images/rings2.jpg', price: 1290, original: 1690 },
    { name: 'Oval Cut Vintage Ring Supreme', image: 'images/rings3.jpg', price: 1350, original: 1750 },
    { name: 'Statement Metallic Ring Luxe', image: 'images/rings5.jpg', price: 1420, original: 1820 },
    { name: 'Designer Cluster Ring', image: 'images/rings6.jpg', price: 1460, original: 1860 },
    { name: 'Luxury Gemstone Ring', image: 'images/rings7.jpg', price: 1490, original: 1890 },
    { name: 'Royal Cocktail Ring Select', image: 'images/rings8.jpg', price: 1370, original: 1770 },
    { name: 'Eternity Band Ring', image: 'images/rings10.jpg', price: 1250, original: 1650 },
    { name: 'Classic Solitaire Ring Special', image: 'images/rings11.jpg', price: 1380, original: 1780 },
    { name: 'Stacking Band Ring Elegant', image: 'images/rings12.jpg', price: 1220, original: 1620 },
    { name: 'Royal Ruby Ring Deluxe', image: 'images/rings21.jpg', price: 1450, original: 1850 },
    { name: 'Fine Crystal Ring', image: 'images/rinsg2.jpg', price: 1230, original: 1630 }
].map(item => ({ ...item, category: 'ring' }));

const rawAllProducts = [
    ...necklaceItems,
    ...earringItems,
    ...ankletItems,
    ...braceletItems,
    ...ringItems
];

const allProducts = rawAllProducts.map((p, index) => ({
    ...p,
    id: index + 1
}));

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sadias_collection');
    console.log(' connected to MongoDB for seeding...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🧹 Existing products cleared from database');

    // Create Admin User if not exists
    const adminEmail = 'admin@sadiascollection.com';
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      adminUser = await User.create({
        name: 'Sadia Hayat (Admin)',
        email: adminEmail,
        password: 'AdminPass123!',
        role: 'admin',
        phone: '+92 300 1234567',
        address: 'F-7 Markaz',
        city: 'Islamabad'
      });
      console.log(`👑 Created default Admin User: ${adminEmail} / AdminPass123!`);
    } else {
      console.log(`👑 Admin User already exists: ${adminEmail}`);
    }

    // Insert Products
    const formattedProducts = allProducts.map((p, idx) => ({
      name: p.name,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: p.category,
      price: p.price,
      originalPrice: p.original || Math.round(p.price * 1.3),
      image: p.image,
      description: `Premium handcrafted luxury ${p.category} piece by Sadia's Collection. Double-plated anti-tarnish finish.`,
      sku: `SADIA-${p.category.substring(0, 3).toUpperCase()}-${String(idx + 1).padStart(3, '0')}`,
      countInStock: 25,
      isFeatured: [1, 5, 37, 50, 79, 100, 140].includes(p.id)
    }));

    await Product.insertMany(formattedProducts);
    console.log(`✨ Successfully seeded ${formattedProducts.length} jewellery products into MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error.message);
    process.exit(1);
  }
};

seedData();
