import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Premium Wireless Noise-Cancelling Headphones",
    description: "Experience immersive audio with our flagship noise-cancelling headphones. Features 40-hour battery life, adaptive ANC, spatial audio support, and premium memory foam ear cushions. Perfect for audiophiles and professionals who demand the best sound quality.",
    price: 349.99,
    comparePrice: 449.99,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    category: "Electronics",
    subcategory: "Audio",
    brand: "SoundWave Pro",
    sku: "SWP-WH-001",
    stock: 150,
    rating: 4.8,
    reviewCount: 2456,
    tags: ["headphones", "wireless", "noise-cancelling", "premium", "bluetooth"],
    isFeatured: true,
  },
  {
    name: "Ultra-Slim 4K OLED Laptop 16-inch",
    description: "Powerhouse performance meets stunning design. 16-inch 4K OLED display, latest gen processor, 32GB RAM, 1TB NVMe SSD, and all-day battery life. Built for creators, developers, and power users who refuse to compromise.",
    price: 1899.99,
    comparePrice: 2299.99,
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"],
    category: "Electronics",
    subcategory: "Laptops",
    brand: "TechVault",
    sku: "TV-LP-4K-001",
    stock: 75,
    rating: 4.9,
    reviewCount: 1823,
    tags: ["laptop", "4k", "oled", "ultraslim", "creator", "developer"],
    isFeatured: true,
  },
  {
    name: "Smart Fitness Watch Pro with AI Health Coach",
    description: "Your personal AI health companion. Tracks 100+ exercises, provides real-time form correction, sleep analysis, stress management, and predictive health insights. Features ECG, SpO2, temperature sensors, and 14-day battery life.",
    price: 299.99,
    comparePrice: 399.99,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"],
    category: "Electronics",
    subcategory: "Wearables",
    brand: "FitGenius",
    sku: "FG-SW-PRO-001",
    stock: 200,
    rating: 4.7,
    reviewCount: 3891,
    tags: ["smartwatch", "fitness", "health", "AI", "wearable"],
    isFeatured: true,
  },
  {
    name: "Organic Cotton Sustainable Hoodie",
    description: "Eco-conscious comfort meets street style. Made from 100% organic cotton with recycled polyester blend. Features hidden tech pocket, adjustable hood, and antimicrobial treatment. Carbon-neutral production.",
    price: 89.99,
    comparePrice: 129.99,
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"],
    category: "Fashion",
    subcategory: "Hoodies",
    brand: "EcoThread",
    sku: "ET-HD-ORG-001",
    stock: 500,
    rating: 4.6,
    reviewCount: 1567,
    tags: ["hoodie", "organic", "sustainable", "fashion", "eco-friendly"],
    isFeatured: false,
  },
  {
    name: "Professional Chef's Knife Set - Damascus Steel",
    description: "Hand-forged Damascus steel knife set with 67 layers. Includes 8-inch chef's knife, 6-inch utility, 3.5-inch paring knife, and magnetic walnut block. Lifetime warranty with free sharpening service.",
    price: 249.99,
    comparePrice: 349.99,
    images: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800"],
    category: "Home & Kitchen",
    subcategory: "Knives",
    brand: "BladeForge",
    sku: "BF-KS-DAM-001",
    stock: 80,
    rating: 4.9,
    reviewCount: 945,
    tags: ["knife", "chef", "damascus", "kitchen", "professional", "cooking"],
    isFeatured: true,
  },
  {
    name: "AI-Powered Robot Vacuum & Mop Combo",
    description: "Advanced LiDAR navigation with AI object recognition. Maps your home in 3D, avoids obstacles, self-empties, and provides scheduled deep cleaning. Supports voice control via Alexa and Google Home.",
    price: 599.99,
    comparePrice: 799.99,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800"],
    category: "Home & Kitchen",
    subcategory: "Smart Home",
    brand: "CleanBot",
    sku: "CB-RV-AI-001",
    stock: 120,
    rating: 4.7,
    reviewCount: 2103,
    tags: ["robot vacuum", "AI", "smart home", "cleaning", "automated"],
    isFeatured: true,
  },
  {
    name: "Ergonomic Standing Desk with AI Posture Reminder",
    description: "Height-adjustable standing desk with built-in AI posture monitoring. Features wireless charging pad, cable management system, memory presets, and companion app that reminds you to switch positions.",
    price: 699.99,
    comparePrice: 899.99,
    images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800"],
    category: "Furniture",
    subcategory: "Office",
    brand: "ErgoFlow",
    sku: "EF-SD-AI-001",
    stock: 60,
    rating: 4.8,
    reviewCount: 756,
    tags: ["standing desk", "ergonomic", "AI", "office", "health", "posture"],
    isFeatured: false,
  },
  {
    name: "Premium Yoga Mat with Smart Alignment Guides",
    description: "Eco-friendly TPE yoga mat with embedded NFC chip that connects to the companion app. AI-powered alignment correction, guided sessions, and progress tracking. Non-slip, antimicrobial, 6mm thickness.",
    price: 79.99,
    comparePrice: 119.99,
    images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800"],
    category: "Sports & Fitness",
    subcategory: "Yoga",
    brand: "ZenFlow",
    sku: "ZF-YM-SMT-001",
    stock: 300,
    rating: 4.5,
    reviewCount: 1234,
    tags: ["yoga", "fitness", "smart", "eco-friendly", "wellness"],
    isFeatured: false,
  },
  {
    name: "Portable Espresso Machine with Grinder",
    description: "Café-quality espresso anywhere. Built-in ceramic burr grinder, 15-bar pressure pump, USB-C rechargeable battery. Compact design perfect for travel, camping, or office use. Makes both hot and cold brew.",
    price: 179.99,
    comparePrice: 249.99,
    images: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"],
    category: "Home & Kitchen",
    subcategory: "Coffee",
    brand: "BrewMaster",
    sku: "BM-PE-GR-001",
    stock: 180,
    rating: 4.6,
    reviewCount: 1876,
    tags: ["espresso", "coffee", "portable", "grinder", "travel"],
    isFeatured: true,
  },
  {
    name: "Wireless Mechanical Keyboard - Artisan Edition",
    description: "Handcrafted aluminum frame with hot-swappable switches. Features per-key RGB, gasket mount design, PBT keycaps, multi-device Bluetooth 5.3, and USB-C connectivity. Programmable via open-source QMK/VIA firmware.",
    price: 199.99,
    comparePrice: 279.99,
    images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800"],
    category: "Electronics",
    subcategory: "Peripherals",
    brand: "KeyCraft",
    sku: "KC-KB-ART-001",
    stock: 95,
    rating: 4.8,
    reviewCount: 1432,
    tags: ["keyboard", "mechanical", "wireless", "RGB", "artisan", "developer"],
    isFeatured: false,
  },
  {
    name: "Smart Indoor Garden with AI Growth Optimization",
    description: "Grow fresh herbs and vegetables year-round. AI monitors light, water, and nutrients automatically. Supports 12 pods simultaneously with full-spectrum LED grow lights. Companion app provides harvest predictions.",
    price: 149.99,
    comparePrice: 199.99,
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800"],
    category: "Home & Kitchen",
    subcategory: "Garden",
    brand: "GrowGenius",
    sku: "GG-IG-AI-001",
    stock: 140,
    rating: 4.4,
    reviewCount: 892,
    tags: ["garden", "indoor", "smart", "AI", "herbs", "sustainable"],
    isFeatured: false,
  },
  {
    name: "Minimalist Leather Backpack - Italian Craftsmanship",
    description: "Full-grain Italian leather with water-resistant coating. Features padded 16-inch laptop compartment, RFID-blocking pocket, magnetic closures, and anti-theft design. Ages beautifully with a unique patina.",
    price: 259.99,
    comparePrice: 349.99,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"],
    category: "Fashion",
    subcategory: "Bags",
    brand: "Artigiano",
    sku: "AR-BP-LTR-001",
    stock: 70,
    rating: 4.7,
    reviewCount: 654,
    tags: ["backpack", "leather", "italian", "minimalist", "laptop", "premium"],
    isFeatured: true,
  },
];

const categories = [
  { name: "Electronics", slug: "electronics", description: "Latest gadgets and tech" },
  { name: "Fashion", slug: "fashion", description: "Clothing, shoes & accessories" },
  { name: "Home & Kitchen", slug: "home-kitchen", description: "Everything for your home" },
  { name: "Sports & Fitness", slug: "sports-fitness", description: "Gear for active lifestyles" },
  { name: "Furniture", slug: "furniture", description: "Modern furniture & decor" },
  { name: "Books", slug: "books", description: "Physical and digital books" },
  { name: "Beauty", slug: "beauty", description: "Skincare, makeup & wellness" },
  { name: "Automotive", slug: "automotive", description: "Car accessories & parts" },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Create categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log("✅ Categories seeded");

  // Create products with random embeddings (in production, use real embeddings)
  for (const product of products) {
    const embedding = Array.from({ length: 384 }, () => Math.random() * 2 - 1);
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: {
        ...product,
        embedding,
      },
    });
  }
  console.log("✅ Products seeded");

  // Create admin user
  const { default: bcrypt } = await import("bcryptjs");
  const hashedPassword = await bcrypt.hash("admin123", 12);
  
  await prisma.user.upsert({
    where: { email: "admin@nexusai.shop" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@nexusai.shop",
      hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user seeded");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
