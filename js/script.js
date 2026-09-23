/* ============================================================
   SADIA'S COLLECTION — Complete JavaScript
   Luxury Jewellery Brand — Real-time Features
   ============================================================ */

// ===== AOS INIT & DYNAMIC SCROLL ANIMATION OBSERVER =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 900,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        once: false,
        offset: 50,
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                const animType = entry.target.dataset.anim;
                if (animType === 'zoom') entry.target.classList.add('reveal-zoom');
                else if (animType === 'slide-left') entry.target.classList.add('reveal-slide-left');
                else if (animType === 'slide-right') entry.target.classList.add('reveal-slide-right');
                else if (animType === 'fade-up') entry.target.classList.add('reveal-fade-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .product-card, .about-teaser-image, .about-teaser-text, .badge-item, .newsletter-box').forEach(el => {
        scrollObserver.observe(el);
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });
});

// ============================================================
// ============================================================
// ============================================================
// ===== PRODUCT DATA (100% Unique Items — Zero Image Duplicates) =====
// ============================================================
const ankletItems = [
    { name: 'Crystal Payal Anklet', image: 'images/a1.jpg', price: 1250, original: 1650 },
    { name: 'Beaded Charm Payal', image: 'images/a2.jpg', price: 1150, original: 1550 },
    { name: 'Traditional Kundan Payal', image: 'images/a3.jpg', price: 1350, original: 1800 },
    { name: 'Delicate Pearl Payal', image: 'images/a4.jpg', price: 1050, original: 1450 },
    { name: 'Royal Ghungroo Payal', image: 'images/a5.jpg', price: 1290, original: 1700 },
    { name: 'Floral Zircon Anklet', image: 'images/a6.jpg', price: 1190, original: 1600 },
    { name: 'Minimalist Chain Payal', image: 'images/a7.jpg', price: 990, original: 1350 },
    { name: 'Bridal Double-Layer Payal', image: 'images/a8.jpg', price: 1450, original: 1950 },
    { name: 'Antique Golden Payal', image: 'images/a9.jpg', price: 1290, original: 1750 },
    { name: 'Charm Drop Anklet', image: 'images/a10.jpg', price: 1100, original: 1500 },
    { name: 'Bohemian Bell Anklet', image: 'images/a11.jpg', price: 950, original: 1300 },
    { name: 'Crystal Heart Payal', image: 'images/a12.jpg', price: 1080, original: 1480 },
    { name: 'Rose Gold Payal', image: 'images/a13.jpg', price: 1200, original: 1600 },
    { name: 'Twinkling Star Anklet', image: 'images/a14.jpg', price: 990, original: 1390 },
    { name: 'Oxidized Silver Payal', image: 'images/a15.jpg', price: 1150, original: 1550 },
    { name: 'Vintage Gemstone Anklet', image: 'images/a16.jpg', price: 1300, original: 1750 },
    { name: 'Sleek Zircon Payal', image: 'images/a17.jpg', price: 1250, original: 1680 },
    { name: 'Luxury Bridal Anklet Set', image: 'images/a18.jpg', price: 1490, original: 1990 },
    { name: 'Layered Pearl Payal', image: 'images/a19.jpg', price: 1180, original: 1580 },
    { name: 'Royal Ruby Accent Payal', image: 'images/a20.jpg', price: 1380, original: 1850 },
    { name: 'Simple Gold Link Anklet', image: 'images/a21.jpg', price: 920, original: 1250 },
    { name: 'Emerald Bead Payal', image: 'images/a22.jpg', price: 1270, original: 1690 },
    { name: 'Diamond Cut Zircon Anklet', image: 'images/a23.jpg', price: 1340, original: 1780 },
    { name: 'Heritage Pakistani Payal', image: 'images/a24.jpg', price: 1420, original: 1890 },
    { name: 'Royal Velvet Payal Set', image: 'images/a25.jpg', price: 1390, original: 1850 },
    { name: 'Grand Kundan Payal', image: 'images/a26.jpg', price: 1480, original: 1980 },
    { name: 'Classic Pearl Anklet', image: 'images/a27.jpg', price: 1150, original: 1520 },
    { name: 'Premium Bridal Ghungroo Payal', image: 'images/aa1.jpg', price: 1550, original: 2050 }
].map(item => ({ ...item, category: 'anklet' }));

const braceletItems = [
    { name: 'Kundan Bangle Bracelet', image: 'images/b1.jpg', price: 1450, original: 1950 },
    { name: 'Crystal Tennis Bracelet', image: 'images/b2.jpg', price: 1350, original: 1800 },
    { name: 'Luxury Cuff Bracelet', image: 'images/b3.jpg', price: 1650, original: 2150 },
    { name: 'Pearl Cluster Bracelet', image: 'images/b4.jpg', price: 1550, original: 2050 },
    { name: 'Gold Filigree Bangle Set', image: 'images/b5.jpg', price: 1850, original: 2450 },
    { name: 'Zircon Floral Bracelet', image: 'images/b6.jpg', price: 1490, original: 1990 },
    { name: 'Rose Gold Charm Bracelet', image: 'images/b7.jpg', price: 1390, original: 1850 },
    { name: 'Traditional Kada Bangle', image: 'images/b8.jpg', price: 1750, original: 2300 },
    { name: 'Royal Ruby Bracelet', image: 'images/b9.jpg', price: 1690, original: 2250 },
    { name: 'Emerald Cut Stone Bracelet', image: 'images/b10.jpg', price: 1590, original: 2100 },
    { name: 'Sleek Gold Bangle', image: 'images/b11.jpg', price: 1290, original: 1750 },
    { name: 'Diamond Dust Bangle', image: 'images/b12.jpg', price: 1480, original: 1980 },
    { name: 'Bridal Dulhan Chura Bangle Set', image: 'images/b13.jpg', price: 2450, original: 3200 },
    { name: 'Open Cuff Gemstone Bracelet', image: 'images/b14.jpg', price: 1520, original: 2020 },
    { name: 'Classic Pearl Bangle', image: 'images/b15.jpg', price: 1380, original: 1850 },
    { name: 'Vintage Art Deco Bracelet', image: 'images/b16.jpg', price: 1620, original: 2150 },
    { name: 'Statement Golden Bangle', image: 'images/b17.jpg', price: 1790, original: 2350 },
    { name: 'Filigree Cuff Bangle', image: 'images/b18.jpg', price: 1450, original: 1920 },
    { name: 'Heritage Gold Kada Set', image: 'images/b19.jpg', price: 1850, original: 2450 },
    { name: 'Royal Kundan Chura', image: 'images/b20.jpg', price: 1950, original: 2600 },
    { name: 'Multi-Stone Partywear Bracelet', image: 'images/b21.jpg', price: 1890, original: 2490 },
    { name: 'Rose Gold Tennis Bracelet', image: 'images/b22.jpg', price: 1420, original: 1890 },
    { name: 'Floral Zircon Bangle', image: 'images/b23.jpg', price: 1580, original: 2100 },
    { name: 'Bridal Velvet Chura Set', image: 'images/b24.jpg', price: 2250, original: 2980 },
    { name: 'Antique Gold Bangle', image: 'images/b25.jpg', price: 1650, original: 2180 },
    { name: 'Ruby Cluster Bracelet', image: 'images/b26.jpg', price: 1720, original: 2290 },
    { name: 'Emerald Bangle Set', image: 'images/b27.jpg', price: 1810, original: 2400 },
    { name: 'Pearl Link Bracelet', image: 'images/b28.jpg', price: 1390, original: 1850 },
    { name: 'Diamond Cut Kada', image: 'images/b29.jpg', price: 1680, original: 2220 },
    { name: 'Royal Solitaire Bracelet', image: 'images/b30.jpg', price: 1750, original: 2320 },
    { name: 'Deluxe Kundan Bangle Set', image: 'images/b31.jpg', price: 1990, original: 2650 },
    { name: 'Luxe Zircon Tennis Bracelet', image: 'images/b2.avif', price: 1450, original: 1950 },
    { name: 'Royal Kundan Kada Bangle', image: 'images/b3.avif', price: 1750, original: 2300 },
    { name: 'Pearl Cluster Charm Bangle', image: 'images/b4.avif', price: 1550, original: 2050 },
    { name: 'Twisted Gold Bracelet', image: 'images/b111.jpg', price: 1290, original: 1750 }
].map(item => ({ ...item, category: 'bracelet' }));

const earringItems = [
    { name: 'Royal Zircon Jhumka Drop', image: 'images/e1.jpg', price: 1650, original: 2200 },
    { name: 'Pearl & Kundan Chandbali', image: 'images/e2.jpg', price: 1750, original: 2300 },
    { name: 'Emerald Gemstone Statement Earrings', image: 'images/e3.jpg', price: 1550, original: 2100 },
    { name: 'Minimalist Pearl Stud Earrings', image: 'images/e4.jpg', price: 1150, original: 1550 },
    { name: 'Rose Gold Hoop Earrings', image: 'images/e5.jpg', price: 1250, original: 1680 },
    { name: 'Ruby Drop Traditional Earrings', image: 'images/e6.jpg', price: 1690, original: 2250 },
    { name: 'Crystal Cluster Party Earrings', image: 'images/e7.jpg', price: 1490, original: 1990 },
    { name: 'Kashmiri Long Dangle Earrings', image: 'images/e8.jpg', price: 1850, original: 2450 },
    { name: 'Diamond Cut Solitaire Studs', image: 'images/e9.jpg', price: 1290, original: 1750 },
    { name: 'Filigree Vintage Gold Earrings', image: 'images/e10.jpg', price: 1580, original: 2100 },
    { name: 'Sapphire Blue Drop Earrings', image: 'images/e11.jpg', price: 1620, original: 2150 },
    { name: 'Bridal Heavy Kundan Earrings', image: 'images/e12.jpg', price: 1950, original: 2600 },
    { name: 'Polki Style Traditional Earrings', image: 'images/e13.jpg', price: 1720, original: 2300 },
    { name: 'Butterfly Crystal Drop Earrings', image: 'images/e14.jpg', price: 1380, original: 1850 },
    { name: 'Golden Sunburst Jhumkas', image: 'images/e15.jpg', price: 1650, original: 2200 },
    { name: 'Multi-Color Gemstone Earrings', image: 'images/e16.jpg', price: 1480, original: 1980 },
    { name: 'Oxidized Silver Dangle Earrings', image: 'images/e17.jpg', price: 1250, original: 1650 },
    { name: 'Pearl Hoop Statement Earrings', image: 'images/e18.jpg', price: 1390, original: 1890 },
    { name: 'Teardrop Zircon Crystal Earrings', image: 'images/e19.jpg', price: 1520, original: 2020 },
    { name: 'Royal Crest Kundan Earrings', image: 'images/e21.jpg', price: 1890, original: 2490 },
    { name: 'Geometric Crystal Studs', image: 'images/e22.jpg', price: 1190, original: 1590 },
    { name: 'Flower Cluster Drop Earrings', image: 'images/e23.jpg', price: 1450, original: 1950 },
    { name: 'Rose Gold Tassel Earrings', image: 'images/e24.jpg', price: 1350, original: 1800 },
    { name: 'Ruby Floral Chandbali Earrings', image: 'images/e25.jpg', price: 1820, original: 2420 },
    { name: 'Fine Zircon Huggie Earrings', image: 'images/e26.jpg', price: 1280, original: 1700 },
    { name: 'Delicate Pearl Chain Drop Earrings', image: 'images/e27.jpg', price: 1320, original: 1750 },
    { name: 'Antique Temple Gold Earrings', image: 'images/e28.jpg', price: 1690, original: 2250 },
    { name: 'Solitaire Crystal Stud Earrings', image: 'images/e29.jpg', price: 1220, original: 1620 },
    { name: 'Layered Pearl Drop Jhumkas', image: 'images/e30.jpg', price: 1750, original: 2350 },
    { name: 'Grand Bridal Chandbali Set', image: 'images/e31.jpg', price: 2150, original: 2850 },
    { name: 'Chic Oval Zircon Earrings', image: 'images/e32.jpg', price: 1390, original: 1850 },
    { name: 'Starfall Crystal Dangle Earrings', image: 'images/e33.jpg', price: 1460, original: 1960 },
    { name: 'Emerald Velvet Statement Earrings', image: 'images/e34.jpg', price: 1680, original: 2250 },
    { name: 'Golden Lattice Vintage Earrings', image: 'images/e36.jpg', price: 1550, original: 2050 },
    { name: 'Royal Zircon Jhumka Special', image: 'images/e1.webp', price: 1650, original: 2200 },
    { name: 'Luxe Emerald Jhumki Set', image: 'images/e20.webp', price: 1780, original: 2380 },
    { name: 'Luxe Ruby Chandelier Earrings', image: 'images/e35.webp', price: 1890, original: 2500 },
    { name: 'Emerald Drop Classic Jhumkas', image: 'images/earings.jpg', price: 1650, original: 2200 },
    { name: 'Pearl Stud Earrings Classic Set', image: 'images/earingss.jpg', price: 1250, original: 1650 },
    { name: 'Chandbali Statement Earrings Classic', image: 'images/earingsss.jpg', price: 1750, original: 2300 },
    { name: 'Kashmiri Drop Traditional Earrings', image: 'images/earrings.jpg', price: 1550, original: 2000 }
].map(item => ({ ...item, category: 'earrings' }));

const necklaceItems = [
    { name: 'Royal Pearl Choker Set', image: 'images/n1.jpg', price: 2450, original: 3200 },
    { name: 'Bridal Kundan Guluband Set', image: 'images/n2.jpg', price: 4850, original: 6400 },
    { name: 'Emerald Drop Necklace Set', image: 'images/n3.jpg', price: 3250, original: 4200 },
    { name: 'Ruby Rose Haar Set', image: 'images/n4.jpg', price: 2850, original: 3700 },
    { name: 'Zircon Statement Choker', image: 'images/n5.jpg', price: 2950, original: 3800 },
    { name: 'Polki Designer Necklace', image: 'images/n6.jpg', price: 3450, original: 4500 },
    { name: 'Baroque Pearl Layered Set', image: 'images/n7.jpg', price: 2650, original: 3500 },
    { name: 'Classic Bridal Necklace Set', image: 'images/n8.jpg', price: 4200, original: 5500 },
    { name: 'Gold Plated Mala Set', image: 'images/n9.jpg', price: 2150, original: 2800 },
    { name: 'Crystal Heart Necklace Set', image: 'images/n10.jpg', price: 1850, original: 2400 },
    { name: 'Islamic Ayatul Kursi Necklace', image: 'images/n11.jpg', price: 1950, original: 2500 },
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
    { name: 'Diamond Cut Zircon Haar Set', image: 'images/n22.jpg', price: 3950, original: 5200 },
    { name: 'Royal Pearl Choker Set Premium', image: 'images/neclace.jpg', price: 2450, original: 3200 },
    { name: 'Ruby Rose Bridal Haar Set Special', image: 'images/neclace2.avif', price: 2850, original: 3700 },
    { name: 'Crystal Heart Locket Necklace', image: 'images/neclace4.jpg', price: 1350, original: 1800 },
    { name: 'Kundan Bridal Statement Necklace', image: 'images/neclacee.jpg', price: 3850, original: 4900 },
    { name: 'Islamic Ayatul Kursi Locket Set', image: 'images/neclaceee.jpg', price: 1450, original: 1900 },
    { name: 'Bridal Kundan Guluband Full Heavy Set', image: 'images/neclacefullsett.jpg', price: 4850, original: 6400 },
    { name: 'Emerald Floral Choker Set', image: 'images/neclae.jpg', price: 2750, original: 3600 },
    { name: 'Navratna Royal Full Bridal Set', image: 'images/neclanefullset.jpg', price: 3450, original: 4500 },
    { name: 'Baroque Pearl Layered Necklace Set', image: 'images/neklace.avif', price: 2650, original: 3500 },
    { name: 'Heritage Classic Bridal Necklace Set', image: 'images/neklace.jpg', price: 3450, original: 4600 },
    { name: 'Rose Quartz Floral Choker Set', image: 'images/neklcae3.jpg', price: 1250, original: 1650 },
    { name: 'Classic Pearl & Zircon Necklace Set', image: 'images/neklce set.jpg', price: 2250, original: 2950 },
    { name: 'Royal Solitaire Crystal Locket', image: 'images/nelcave.jpg', price: 1350, original: 1750 },
    { name: 'Luxe Emerald Pearl Haar', image: 'images/14.jpg', price: 3250, original: 4200 }
].map(item => ({ ...item, category: 'necklace' }));

const ringItems = [
    { name: 'Crystal Solitaire Ring', image: 'images/r1.jpg', price: 1250, original: 1650 },
    { name: 'Champagne Zircon Ring', image: 'images/r2.jpg', price: 1300, original: 1700 },
    { name: 'Pink Floral Cocktail Ring', image: 'images/r3.jpg', price: 1350, original: 1750 },
    { name: 'Oval Cut Vintage Ring', image: 'images/r4.jpg', price: 1400, original: 1800 },
    { name: 'Emerald Solitaire Ring', image: 'images/r5.jpg', price: 1450, original: 1850 },
    { name: 'Royal Ruby Cluster Ring', image: 'images/r6.jpg', price: 1500, original: 1900 },
    { name: 'Golden Eternity Band Ring', image: 'images/r7.jpg', price: 1200, original: 1600 },
    { name: 'Rose Gold Stacking Ring', image: 'images/r8.jpg', price: 1280, original: 1680 },
    { name: 'Crown Solitaire Ring', image: 'images/r9.jpg', price: 1320, original: 1720 },
    { name: 'Diamond Cut Halo Ring', image: 'images/r10.jpg', price: 1380, original: 1780 },
    { name: 'Pearl & Zircon Ring', image: 'images/r11.jpg', price: 1220, original: 1620 },
    { name: 'Vintage Filigree Ring', image: 'images/r12.jpg', price: 1420, original: 1820 },
    { name: 'Heart Cut Solitaire Ring', image: 'images/r13.jpg', price: 1260, original: 1660 },
    { name: 'Cushion Cut Crystal Ring', image: 'images/r14.jpg', price: 1460, original: 1860 },
    { name: 'Princess Cut Ring', image: 'images/r15.png', price: 1340, original: 1740 },
    { name: 'Sapphire Blue Cocktail Ring', image: 'images/r16.jpg', price: 1490, original: 1890 },
    { name: 'Marquise Gemstone Ring', image: 'images/r17.jpg', price: 1390, original: 1790 },
    { name: 'Twisted Band Solitaire Ring', image: 'images/r18.jpg', price: 1240, original: 1640 },
    { name: 'Sunburst Zircon Ring', image: 'images/r19.jpg', price: 1440, original: 1840 },
    { name: 'Antique Kundan Statement Ring', image: 'images/r20.jpg', price: 1480, original: 1880 },
    { name: 'Delicate Rose Ring', image: 'images/r21.jpg', price: 1210, original: 1610 },
    { name: 'Butterfly Crystal Ring', image: 'images/r22.jpg', price: 1290, original: 1690 },
    { name: 'Tear Drop Solitaire Ring', image: 'images/r23.jpg', price: 1360, original: 1760 },
    { name: 'Double Row Eternity Ring', image: 'images/r24.jpg', price: 1310, original: 1710 },
    { name: 'Royal Crest Cocktail Ring', image: 'images/r25.jpg', price: 1470, original: 1870 },
    { name: 'Pear Cut Zircon Ring', image: 'images/r26.jpg', price: 1500, original: 1900 },
    { name: 'Solitaire Zircon Ring Deluxe', image: 'images/r1.webp', price: 1250, original: 1650 },
    { name: 'Adjustable Crystal Ring', image: 'images/ringa11.jpg', price: 1250, original: 1650 },
    { name: 'Vintage Flower Ring', image: 'images/ringa4.jpg', price: 1350, original: 1750 },
    { name: 'Fancy Solitaire Ring Classic', image: 'images/rings.jpg', price: 1200, original: 1600 },
    { name: 'Champagne Solitaire Ring Luxe', image: 'images/rings1.jpg', price: 1300, original: 1700 },
    { name: 'Pink Floral Zircon Ring Choice', image: 'images/rings2.jpg', price: 1290, original: 1690 },
    { name: 'Oval Cut Vintage Ring Supreme', image: 'images/rings3.jpg', price: 1350, original: 1750 },
    { name: 'Statement Golden Ring Luxe', image: 'images/rings5.jpg', price: 1420, original: 1820 },
    { name: 'Designer Cluster Ring', image: 'images/rings6.jpg', price: 1460, original: 1860 },
    { name: 'Luxury Gemstone Ring', image: 'images/rings7.jpg', price: 1490, original: 1890 },
    { name: 'Royal Cocktail Ring Select', image: 'images/rings8.jpg', price: 1370, original: 1770 },
    { name: 'Golden Eternity Ring Band', image: 'images/rings10.jpg', price: 1250, original: 1650 },
    { name: 'Classic Solitaire Ring Special', image: 'images/rings11.jpg', price: 1380, original: 1780 },
    { name: 'Stacking Band Ring Elegant', image: 'images/rings12.jpg', price: 1220, original: 1620 },
    { name: 'Royal Ruby Ring Deluxe', image: 'images/rings21.jpg', price: 1450, original: 1850 },
    { name: 'Fine Zircon Ring', image: 'images/rinsg2.jpg', price: 1230, original: 1630 }
].map(item => ({ ...item, category: 'ring' }));

const rawAllProducts = [
    ...necklaceItems,
    ...earringItems,
    ...ankletItems,
    ...braceletItems,
    ...ringItems
];

let allProducts = [...rawAllProducts];

async function loadProductsFromMongoDB() {
    try {
        if (typeof API !== 'undefined' && API.getProducts) {
            const data = await API.getProducts({ limit: 300 });
            if (data && data.success && Array.isArray(data.products) && data.products.length > 0) {
                allProducts = data.products.map(p => ({
                    ...p,
                    id: p._id || p.id,
                    original: p.originalPrice || p.original || Math.round(p.price * 1.3)
                }));
                renderDynamicProductGrids();
            }
        }
    } catch (err) {
        console.warn('[MongoDB Product System] Could not load products from API:', err.message);
    }
}

function renderDynamicProductGrids() {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        const featuredItems = allProducts.filter(p => p.isFeatured);
        renderProductGrid(productGrid, featuredItems.length > 0 ? featuredItems.slice(0, 8) : allProducts.slice(0, 8));
    }

    const allProductsGrid = document.getElementById('allProductsGrid');
    if (allProductsGrid) {
        renderProductGrid(allProductsGrid, allProducts);
        setupFilters();
    }

    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function initProducts() {
    renderDynamicProductGrids();
    loadProductsFromMongoDB();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProducts);
} else {
    initProducts();
}

// ============================================================
// ===== PRODUCT DETAIL MODAL (FULL DETAILS & QUICK VIEW) =====
// ============================================================
function setupProductDetailModalDOM() {
    if (document.getElementById('productDetailModal')) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'productDetailModal';
    modal.innerHTML = `
        <div class="checkout-card" style="max-width: 780px;">
            <div class="checkout-header">
                <h3>Product Details</h3>
                <button class="close-modal" id="closeProductDetailBtn">&times;</button>
            </div>
            <div class="checkout-body" id="productDetailBody">
                <!-- Dynamically filled by openProductDetailModal -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('closeProductDetailBtn').addEventListener('click', closeProductDetailModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProductDetailModal();
    });
}

function formatImageUrl(path) {
    if (!path) return 'images/logo.jpg';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
    let clean = path.replace(/^\/+/, '');
    if (!clean.startsWith('images/')) {
        clean = 'images/' + clean;
    }
    return clean;
}

function openProductDetailModal(product) {
    setupProductDetailModalDOM();
    const body = document.getElementById('productDetailBody');
    if (!body) return;

    const discountPercent = product.original ? Math.round(((product.original - product.price) / product.original) * 100) : 0;
    const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    const imgUrl = formatImageUrl(product.image);

    body.innerHTML = `
        <div class="quick-view-flex">
            <div class="quick-view-img-box" style="position:relative; background:var(--cream); border-radius:18px; overflow:hidden;">
                <img src="${imgUrl}" alt="${product.name}" onerror="this.onerror=null; this.src='images/logo.jpg';" style="width:100%; height:320px; object-fit:cover; display:block;">
                ${discountPercent > 0 ? `<span style="position:absolute; top:14px; left:14px; background:var(--gold); color:#fff; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:700; box-shadow:0 4px 12px rgba(0,0,0,0.15);"><i class="fas fa-tag"></i> Save ${discountPercent}%</span>` : ''}
            </div>
            <div>
                <span style="display:block; font-size:11.5px; text-transform:uppercase; letter-spacing:1.5px; color:var(--gray); margin-top:10px; font-weight:700;">Collection Category: ${categoryName}</span>
                <h2 style="font-family:var(--font-primary); font-size:26px; color:var(--dark); margin:8px 0 14px; line-height:1.2; font-weight:700;">${product.name}</h2>

                <div style="display:flex; align-items:baseline; gap:12px; margin-bottom:24px;">
                    <span style="font-size:30px; font-weight:700; color:var(--gold);">PKR ${product.price.toLocaleString()}</span>
                    ${product.original ? `<span style="font-size:16px; color:var(--gray); text-decoration:line-through;">PKR ${product.original.toLocaleString()}</span>` : ''}
                </div>

                <div style="display:flex; gap:12px; margin-top:10px;">
                    <button class="btn btn-primary" id="modalAddBagBtn" style="flex:1; padding:14px; border-radius:50px; font-size:14px; font-weight:600; cursor:pointer;">
                        <i class="fas fa-shopping-bag"></i> Add to Bag
                    </button>
                    <a href="https://wa.me/923001234567?text=Hi%20Sadia's%20Collection!%20I%20want%20to%20buy%20${encodeURIComponent(product.name)}%20(PKR%20${product.price})" target="_blank" class="btn" style="background:#25D366; color:#fff; text-decoration:none; padding:14px; border-radius:50px; flex:1; text-align:center; font-size:14px; font-weight:600; display:flex; align-items:center; justify-content:center; gap:8px;">
                        <i class="fab fa-whatsapp" style="font-size:18px;"></i> Buy on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modalAddBagBtn').addEventListener('click', () => {
        addToCart(product);
        closeProductDetailModal();
    });

    document.getElementById('productDetailModal').classList.add('active');
}

function closeProductDetailModal() {
    document.getElementById('productDetailModal')?.classList.remove('active');
}

// ============================================================
// ===== PRODUCT RENDER FUNCTION =====
// ============================================================
function renderProductGrid(container, products) {
    container.innerHTML = products.map(product => {
        const imgUrl = formatImageUrl(product.image);
        return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}" data-name="${product.name}">
            <div class="product-image">
                <img src="${imgUrl}" alt="${product.name}" onerror="this.onerror=null; this.src='images/logo.jpg';">
                <button class="product-wishlist" data-id="${product.id}" title="Wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <span class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                <h3>${product.name}</h3>
                <div class="price">
                    PKR ${product.price.toLocaleString()}
                    ${product.original ? `<span class="original">PKR ${product.original.toLocaleString()}</span>` : ''}
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
            </div>
        </div>
    `}).join('');

    // Attach Click Event to whole product card to open Product Detail Modal
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Do not open detail modal if user clicked Wishlist or Add to Cart button directly
            if (e.target.closest('.product-wishlist') || e.target.closest('.add-to-cart')) return;
            const id = this.dataset.id;
            const product = allProducts.find(p => String(p._id || p.id) === String(id));
            if (product) openProductDetailModal(product);
        });
    });

    // Wishlist
    container.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            icon.className = this.classList.contains('liked') ? 'fas fa-heart' : 'far fa-heart';
            showToast(this.classList.contains('liked') ? 'Added to wishlist ❤️' : 'Removed from wishlist');
        });
    });

    // Add to Cart
    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const product = allProducts.find(p => String(p._id || p.id) === String(id));
            if (product) addToCart(product);
        });
    });
}

// ============================================================
// ===== FILTERS & SORT (Products Page) =====
// ============================================================
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const productCount = document.getElementById('productCount');

    function filterAndSort() {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        const sortBy = sortSelect?.value || 'default';

        let filtered = allProducts;
        if (activeFilter !== 'all') {
            filtered = allProducts.filter(p => p.category === activeFilter);
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        if (allProductsGrid) {
            renderProductGrid(allProductsGrid, filtered);
            if (productCount) {
                productCount.textContent = `Showing ${filtered.length} products`;
            }
        }
    }

    filterBtns?.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterAndSort();
        });
    });

    sortSelect?.addEventListener('change', filterAndSort);
}

// ============================================================
// ===== CART DRAWER & REAL-TIME CART SYSTEM =====
// ============================================================
let cart = [];
const cartCount = document.getElementById('cartCount');

// Inject Cart Drawer HTML dynamically if not present
function setupCartDrawerDOM() {
    if (document.getElementById('cartDrawer')) return;

    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cartOverlay';

    const drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.id = 'cartDrawer';
    drawer.innerHTML = `
        <div class="cart-header">
            <h3><i class="fas fa-shopping-bag"></i> Shopping Bag (<span id="cartDrawerCount">0</span>)</h3>
            <button class="close-cart" id="closeCartBtn">&times;</button>
        </div>
        <div class="cart-items" id="cartItemsContainer">
            <!-- Cart items injected here -->
        </div>
        <div class="cart-footer">
            <div class="cart-total-row">
                <span>Subtotal:</span>
                <span id="cartSubtotal">PKR 0</span>
            </div>
            <button class="btn-checkout" id="checkoutBtn">
                <i class="fas fa-lock"></i> Proceed to Checkout
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // Event Listeners for drawer
    overlay.addEventListener('click', closeCartDrawer);
    document.getElementById('closeCartBtn').addEventListener('click', closeCartDrawer);

    document.getElementById('checkoutBtn')?.addEventListener('click', function () {
        if (cart.length === 0) {
            showToast('🛒 Your cart is empty!');
            return;
        }
        closeCartDrawer();
        openCheckoutModal();
    });
}

function openCartDrawer() {
    setupCartDrawerDOM();
    document.getElementById('cartOverlay')?.classList.add('active');
    document.getElementById('cartDrawer')?.classList.add('active');
}

function closeCartDrawer() {
    document.getElementById('cartOverlay')?.classList.remove('active');
    document.getElementById('cartDrawer')?.classList.remove('active');
}

function addToCart(product) {
    const existing = cart.find(item => String(item._id || item.id) === String(product._id || product.id));
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    openCartDrawer();
    showToast(`✨ ${product.name} added to bag!`);
}

function updateCartUI() {
    setupCartDrawerDOM();

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Header Badges
    if (cartCount) cartCount.textContent = totalQty;
    const drawerCount = document.getElementById('cartDrawerCount');
    if (drawerCount) drawerCount.textContent = totalQty;

    const subtotalEl = document.getElementById('cartSubtotal');
    if (subtotalEl) subtotalEl.textContent = `PKR ${totalPrice.toLocaleString()}`;

    // Render Items
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Your shopping bag is empty.</p>
                <span style="font-size: 13px; margin-top: 6px; display: block; color: var(--gray);">Explore our collection to add items!</span>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => {
        const imgUrl = formatImageUrl(item.image);
        return `
        <div class="cart-item">
            <img src="${imgUrl}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='images/logo.jpg';">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">PKR ${(item.price * item.quantity).toLocaleString()}</div>
                <div class="cart-qty-controls">
                    <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-cart-item" data-id="${item.id}">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `}).join('');

    // Attach Event Listeners to Qty and Remove Buttons
    container.querySelectorAll('.inc-qty').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity += 1;
                updateCartUI();
            }
        });
    });

    container.querySelectorAll('.dec-qty').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== id);
                }
                updateCartUI();
            }
        });
    });

    container.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.dataset.id);
            cart = cart.filter(i => i.id !== id);
            updateCartUI();
        });
    });
}

// Cart Icon in Navbar Toggle
document.getElementById('cartToggle')?.addEventListener('click', function (e) {
    e.preventDefault();
    openCartDrawer();
});

// ============================================================
// Theme permanently set to Dusty Rose & Cream default

// ============================================================
// ===== TOAST NOTIFICATION =====
// ============================================================
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-gem" style="color: #B3888C;"></i>
        <span>${message}</span>
    `;
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: '#2B2122',
        color: '#fff',
        padding: '16px 28px',
        borderRadius: '12px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        zIndex: '9999',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        maxWidth: '420px',
    });
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ============================================================
// ===== NEWSLETTER =====
// ============================================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input?.value) {
            showToast(`🎉 Thanks ${input.value.split('@')[0]}! You're now subscribed.`);
            input.value = '';
        }
    });
}

// ============================================================
// ===== CONTACT FORM & REAL-TIME EMAIL DISPATCH =====
// ============================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const subject = document.getElementById('subject')?.value || 'General Inquiry';
        const message = document.getElementById('message')?.value || '';

        const msgRecord = {
            id: 'MSG-' + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toLocaleString(),
            name, email, phone, subject, message
        };

        // 1. Save to Database (LocalStorage)
        const existingMsgs = JSON.parse(localStorage.getItem('hayat_messages_db') || '[]');
        existingMsgs.unshift(msgRecord);
        localStorage.setItem('hayat_messages_db', JSON.stringify(existingMsgs));

        showToast(`📨 Sending message to sadiaishtiaqqq@gmail.com...`);

        // 2. Direct Real-Time Email Send via FormSubmit FormData
        const formData = new FormData(this);

        fetch("https://formsubmit.co/ajax/sadiaishtiaqqq@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showToast(`✅ Success! Message sent to sadiaishtiaqqq@gmail.com`);
        })
        .catch(err => {
            showToast(`✨ Thank you ${name}! Message received.`);
        });

        this.reset();
    });
}

// Global helper for Sadia Hayat to view all received messages in console
window.viewSavedMessages = function() {
    const msgs = JSON.parse(localStorage.getItem('hayat_messages_db') || '[]');
    console.table(msgs);
    return msgs;
};

// ============================================================
// ===== FAQ ACCORDION =====
// ============================================================
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        } else {
            document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
            document.querySelectorAll('.faq-question i').forEach(i => i.style.transform = 'rotate(0deg)');

            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// ============================================================
// ===== COUNTER ANIMATION (About Page Stats) =====
// ============================================================
document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.dataset.count);
    let current = 0;
    const increment = Math.ceil(target / 60);
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                stat.textContent = current.toLocaleString();
            }, 20);
            observer.disconnect();
        }
    });
    observer.observe(stat);
});

// ============================================================
// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================================
// ============================================================
// ===== REAL-TIME ORDER SYSTEM & DATABASE MANAGEMENT =====
// ============================================================
function setupOrderSystemDOM() {
    if (document.getElementById('checkoutModal')) return;

    // 1. Checkout Modal
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'modal-overlay';
    checkoutModal.id = 'checkoutModal';
    checkoutModal.innerHTML = `
        <div class="checkout-card">
            <div class="checkout-header">
                <h3><i class="fas fa-shopping-bag" style="color:var(--gold);"></i> Place Your Order</h3>
                <button class="close-modal" id="closeCheckoutBtn">&times;</button>
            </div>
            <div class="checkout-body">
                <div class="order-summary-box">
                    <h4>Order Summary</h4>
                    <div class="order-summary-items" id="checkoutItemsList"></div>
                    <div class="order-summary-total">
                        <span>Total PKR:</span>
                        <span id="checkoutTotalPKR">PKR 0</span>
                    </div>
                </div>
                <form id="orderForm">
                    <div class="form-group">
                        <label for="custName">Full Name *</label>
                        <input type="text" id="custName" placeholder="e.g. Sadia Ishtiaq" required />
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="custPhone">Phone / WhatsApp *</label>
                            <input type="tel" id="custPhone" placeholder="03001234567" required />
                        </div>
                        <div class="form-group">
                            <label for="custCity">City *</label>
                            <input type="text" id="custCity" placeholder="Islamabad / Lahore / Karachi" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="custAddress">Full Delivery Address *</label>
                        <textarea id="custAddress" rows="2" placeholder="House #, Street, Sector / Area" required></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="payMethod">Payment Method *</label>
                            <select id="payMethod">
                                <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="targetEmail">Owner Email</label>
                            <input type="text" value="sadiaishtiaqqq@gmail.com" readonly style="background:#FAF6F0; font-weight:600;" />
                        </div>
                    </div>
                    <button type="submit" class="btn-place-order">
                        <i class="fas fa-check-circle"></i> Confirm Order
                    </button>
                </form>
            </div>
        </div>
    `;

    // 2. Receipt Modal
    const receiptModal = document.createElement('div');
    receiptModal.className = 'modal-overlay';
    receiptModal.id = 'receiptModal';
    receiptModal.innerHTML = `
        <div class="checkout-card" style="text-align: center;">
            <div class="checkout-header">
                <h3><i class="fas fa-receipt" style="color:var(--gold);"></i> Order Receipt</h3>
                <button class="close-modal" id="closeReceiptBtn">&times;</button>
            </div>
            <div class="checkout-body">
                <div class="receipt-icon"><i class="fas fa-check-circle"></i></div>
                <h3 style="font-family: var(--font-primary); font-size: 24px; color: var(--dark);">Order Placed Successfully!</h3>
                <p style="color: var(--gray); font-size: 14px; margin-top: 4px;">Thank you for your order at <strong>Hayat's Collection</strong>.</p>
                <div class="receipt-details" id="receiptContent" style="text-align: left;"></div>
                <p style="font-size: 12.5px; color: var(--gray); margin-bottom: 20px; line-height: 1.5;">
                    📩 Order notification sent to <strong>sadiaishtiaqqq@gmail.com</strong>.<br/>Our team will call you on WhatsApp for dispatch confirmation!
                </p>
                <button class="btn btn-primary" id="continueShoppingBtn" style="width:100%;">Continue Shopping</button>
            </div>
        </div>
    `;

    document.body.appendChild(checkoutModal);
    document.body.appendChild(receiptModal);

    // Modal Close Events
    document.getElementById('closeCheckoutBtn').addEventListener('click', closeCheckoutModal);
    document.getElementById('closeReceiptBtn').addEventListener('click', closeReceiptModal);
    document.getElementById('continueShoppingBtn').addEventListener('click', closeReceiptModal);

    // Form Submission
    document.getElementById('orderForm').addEventListener('submit', handleOrderSubmission);
}

function openCheckoutModal() {
    setupOrderSystemDOM();

    const itemsList = document.getElementById('checkoutItemsList');
    const totalPKR = document.getElementById('checkoutTotalPKR');
    if (!itemsList || !totalPKR) return;

    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    itemsList.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span>${item.name} × ${item.quantity}</span>
            <strong>PKR ${(item.price * item.quantity).toLocaleString()}</strong>
        </div>
    `).join('');

    totalPKR.textContent = `PKR ${totalPrice.toLocaleString()}`;

    document.getElementById('checkoutModal')?.classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal')?.classList.remove('active');
}

function closeReceiptModal() {
    document.getElementById('receiptModal')?.classList.remove('active');
}

async function handleOrderSubmission(e) {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const city = document.getElementById('custCity').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const payment = document.getElementById('payMethod').value;

    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const orderItems = cart.map(item => ({
        id: item.id || item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
    }));

    let createdOrder = null;
    let orderId = 'SC-' + Math.floor(10000 + Math.random() * 90000);

    try {
        if (window.API) {
            const apiRes = await window.API.createOrder({
                customerDetails: { name, phone, city, address, email: 'customer@sadiascollection.com' },
                orderItems,
                paymentMethod: 'COD'
            });

            if (apiRes.success && apiRes.order) {
                createdOrder = apiRes.order;
                orderId = createdOrder._id ? createdOrder._id.substring(createdOrder._id.length - 6).toUpperCase() : orderId;
                showToast(`✨ Order #${orderId} placed successfully!`);
            }
        }
    } catch (apiErr) {
        console.warn('[Order API Note] Saved locally & sending notification:', apiErr.message);
    }

    const orderRecord = {
        orderId,
        date: new Date().toLocaleString(),
        customer: { name, phone, city, address, payment },
        items: cart,
        totalPKR: totalPrice,
        status: 'Pending Dispatch'
    };

    // 1. Local Backup
    const existingOrders = JSON.parse(localStorage.getItem('hayat_orders_db') || '[]');
    existingOrders.unshift(orderRecord);
    localStorage.setItem('hayat_orders_db', JSON.stringify(existingOrders));

    // 2. Direct Notification Email
    const orderData = new FormData();
    orderData.append('_subject', `NEW COD ORDER #${orderId} from ${name} (PKR ${totalPrice.toLocaleString()})`);
    orderData.append('_template', 'table');
    orderData.append('Order ID', '#' + orderId);
    orderData.append('Customer Name', name);
    orderData.append('Phone Number', phone);
    orderData.append('City', city);
    orderData.append('Delivery Address', address);
    orderData.append('Payment Method', payment);
    orderData.append('Ordered Items', cart.map(i => `${i.name} (Qty: ${i.quantity}) = PKR ${(i.price * i.quantity).toLocaleString()}`).join(', '));
    orderData.append('Total Amount', `PKR ${totalPrice.toLocaleString()}`);

    fetch("https://formsubmit.co/ajax/sadiaishtiaqqq@gmail.com", {
        method: "POST",
        body: orderData
    }).catch(err => console.log("Order stored in database."));

    // Display Receipt
    const receiptContent = document.getElementById('receiptContent');
    if (receiptContent) {
        receiptContent.innerHTML = `
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Customer:</strong> ${name} (${phone})</p>
            <p><strong>Address:</strong> ${address}, ${city}</p>
            <p><strong>Payment:</strong> Cash on Delivery (COD)</p>
            <p><strong>Total Amount:</strong> <span style="color:var(--gold); font-weight:700;">PKR ${totalPrice.toLocaleString()}</span></p>
            <hr style="margin:10px 0; border:0; border-top:1px dashed var(--gray);"/>
            <p><strong>Items Ordered:</strong></p>
            <ul style="padding-left:18px; margin-top:4px;">
                ${cart.map(i => `<li>${i.name} × ${i.quantity}</li>`).join('')}
            </ul>
        `;
    }

    closeCheckoutModal();
    document.getElementById('receiptModal')?.classList.add('active');

    // Reset Cart
    cart = [];
    updateCartUI();
}

// Global Database Helper function for Sadia Hayat to view all placed orders in browser console
window.viewSavedOrders = function() {
    const orders = JSON.parse(localStorage.getItem('hayat_orders_db') || '[]');
    console.table(orders);
    return orders;
};

// ============================================================
// ===== SECURITY UTILITIES =====
// ============================================================
const SecurityUtils = {
    sanitizeHTML(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    async hashPassword(password) {
        if (!window.crypto || !window.crypto.subtle) {
            // Fallback salt hash for unsupported environments
            let hash = 0;
            for (let i = 0; i < password.length; i++) {
                hash = ((hash << 5) - hash) + password.charCodeAt(i);
                hash |= 0;
            }
            return 'h_' + Math.abs(hash);
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(password + "_HAYAT_SALT_2026");
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    validatePhone(phone) {
        if (!phone) return false;
        const clean = phone.replace(/[\s-]/g, '');
        const phoneRegex = /^(\+92|92|0)?3\d{9}$/;
        return phoneRegex.test(clean);
    },

    validateEmail(email) {
        if (!email) return false;
        const clean = email.trim().toLowerCase();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(clean)) return false;

        const parts = clean.split('@');
        if (parts.length !== 2) return false;
        const [userPart, domainPart] = parts;

        if (userPart.length < 2) return false;

        const fakeDomains = [
            'test.com', 'example.com', 'fake.com', 'asdf.com', 'temp.com',
            'mailinator.com', 'trashmail.com', 'yopmail.com', '123.com',
            'dummy.com', 'tempmail.com', 'dispostable.com'
        ];
        if (fakeDomains.includes(domainPart)) return false;

        const tldRegex = /\.(com|pk|org|net|edu|co|info|io|biz|gov|me|app|store|online|site)$/i;
        if (!tldRegex.test(domainPart)) return false;

        return true;
    }
};

// ============================================================
// ===== AUTHENTICATION SYSTEM & USER SESSION =====
// ============================================================
const AuthSystem = {
    getUserSession() {
        return JSON.parse(localStorage.getItem('hayat_session_user') || 'null');
    },

    getUsersDB() {
        return JSON.parse(localStorage.getItem('hayat_users_db') || '[]');
    },

    async registerUser(name, email, password, phone) {
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = phone.trim();

        if (!cleanName || cleanName.length < 2) {
            throw new Error('Please enter your full name.');
        }

        if (!SecurityUtils.validateEmail(cleanEmail)) {
            throw new Error('Please enter a valid real email address (e.g. name@gmail.com). Fake or test emails are not allowed.');
        }

        if (!SecurityUtils.validatePhone(cleanPhone)) {
            throw new Error('Please enter a valid Pakistani phone number (e.g. 03001234567).');
        }

        if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }

        const users = this.getUsersDB();
        if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
            throw new Error('An account with this email address already exists. Please Sign In!');
        }

        const hashedPassword = await SecurityUtils.hashPassword(password);
        const newUser = {
            id: 'USR-' + Math.floor(100000 + Math.random() * 900000),
            name: SecurityUtils.sanitizeHTML(cleanName),
            email: cleanEmail,
            phone: SecurityUtils.sanitizeHTML(cleanPhone),
            password: hashedPassword,
            rawPassword: password,
            registeredAt: new Date().toLocaleDateString()
        };

        // Try backend API registration
        try {
            if (window.API && window.API.register) {
                await window.API.register({
                    name: cleanName,
                    email: cleanEmail,
                    password: password,
                    phone: cleanPhone
                });
            }
        } catch (apiErr) {
            console.warn('[API Registration] Server note:', apiErr.message);
        }

        users.push(newUser);
        localStorage.setItem('hayat_users_db', JSON.stringify(users));

        // Create active session
        const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone };
        localStorage.setItem('hayat_session_user', JSON.stringify(sessionUser));
        
        this.renderNavbarAuthControls();
        return sessionUser;
    },

    async loginUser(email, password) {
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail) {
            throw new Error('Please enter your email address.');
        }

        if (!SecurityUtils.validateEmail(cleanEmail)) {
            throw new Error('Please enter a valid email address (e.g. yourname@gmail.com).');
        }

        if (!password) {
            throw new Error('Please enter your password.');
        }

        // 1. Try Backend API login first
        try {
            if (window.API && window.API.login) {
                const res = await window.API.login(cleanEmail, password);
                if (res && res.user) {
                    const sessionUser = {
                        id: res.user._id || res.user.id,
                        name: res.user.name,
                        email: res.user.email,
                        phone: res.user.phone || ''
                    };
                    localStorage.setItem('hayat_session_user', JSON.stringify(sessionUser));
                    this.renderNavbarAuthControls();
                    return sessionUser;
                }
            }
        } catch (apiErr) {
            console.warn('[API Login Note] Checking local accounts DB:', apiErr.message);
        }

        // 2. Check local accounts DB
        const users = this.getUsersDB();
        const user = users.find(u => u.email.toLowerCase() === cleanEmail);

        if (!user) {
            throw new Error('No account found with this email address. Please click the "Register" tab to create your account first!');
        }

        const hashedPassword = await SecurityUtils.hashPassword(password);
        const isPwdMatch = (user.password === hashedPassword) || (user.rawPassword === password);

        if (!isPwdMatch) {
            throw new Error('Incorrect password. Please check your password and try again.');
        }

        const sessionUser = { id: user.id, name: user.name, email: user.email, phone: user.phone };
        localStorage.setItem('hayat_session_user', JSON.stringify(sessionUser));
        
        this.renderNavbarAuthControls();
        return sessionUser;
    },

    logoutUser() {
        localStorage.removeItem('hayat_session_user');
        this.renderNavbarAuthControls();
        showToast('🔒 Logged out successfully');
    },

    renderNavbarAuthControls() {
        const navRight = document.querySelector('.nav-right');
        if (!navRight) return;

        let actionsContainer = navRight.querySelector('.nav-right-actions');
        if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'nav-right-actions';
            
            // Insert before cart icon or hamburger
            const cartIcon = document.getElementById('cartToggle');
            if (cartIcon) {
                cartIcon.parentNode.insertBefore(actionsContainer, cartIcon);
                actionsContainer.appendChild(cartIcon);
            }
        }

        const currentUser = this.getUserSession();

        // Search Icon Button
        let searchBtn = document.getElementById('navSearchBtn');
        if (!searchBtn) {
            searchBtn = document.createElement('button');
            searchBtn.className = 'nav-icon-btn';
            searchBtn.id = 'navSearchBtn';
            searchBtn.title = 'Search Jewellery';
            searchBtn.innerHTML = `<i class="fas fa-search"></i>`;
            searchBtn.addEventListener('click', () => InstantSearch.open());
            actionsContainer.prepend(searchBtn);
        }

        // Auth Icon / User Dropdown Container
        let userContainer = document.getElementById('navUserContainer');
        if (!userContainer) {
            userContainer = document.createElement('div');
            userContainer.className = 'user-menu-container';
            userContainer.id = 'navUserContainer';
            actionsContainer.insertBefore(userContainer, document.getElementById('cartToggle'));
        }

        if (currentUser) {
            userContainer.innerHTML = `
                <button class="nav-icon-btn" id="userMenuToggle" title="My Profile (${SecurityUtils.sanitizeHTML(currentUser.name)})">
                    <i class="fas fa-user-circle" style="color: var(--gold);"></i>
                </button>
                <div class="user-dropdown" id="userDropdownMenu">
                    <div class="dropdown-user-info">
                        <strong>${SecurityUtils.sanitizeHTML(currentUser.name)}</strong>
                        <span>${SecurityUtils.sanitizeHTML(currentUser.email)}</span>
                    </div>
                    <button class="dropdown-item" id="btnMyProfile">
                        <i class="fas fa-id-card"></i> My Profile &amp; Orders
                    </button>
                    <button class="dropdown-item" id="btnTrackOrderNav">
                        <i class="fas fa-truck"></i> Track Order
                    </button>
                    <button class="dropdown-item logout-btn" id="btnLogoutNav">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            `;

            const toggle = document.getElementById('userMenuToggle');
            const menu = document.getElementById('userDropdownMenu');

            toggle?.addEventListener('click', (e) => {
                e.stopPropagation();
                menu?.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!userContainer.contains(e.target)) {
                    menu?.classList.remove('active');
                }
            });

            document.getElementById('btnMyProfile')?.addEventListener('click', () => {
                menu?.classList.remove('active');
                AuthSystem.openProfileModal();
            });

            document.getElementById('btnTrackOrderNav')?.addEventListener('click', () => {
                menu?.classList.remove('active');
                OrderTracker.open();
            });

            document.getElementById('btnLogoutNav')?.addEventListener('click', () => {
                menu?.classList.remove('active');
                AuthSystem.logoutUser();
            });

        } else {
            userContainer.innerHTML = `
                <button class="nav-icon-btn" id="loginModalBtn" title="Sign In / Register">
                    <i class="far fa-user"></i>
                </button>
            `;
            document.getElementById('loginModalBtn')?.addEventListener('click', () => {
                AuthSystem.openAuthModal('login');
            });
        }
    },

    openAuthModal(defaultTab = 'login') {
        let modal = document.getElementById('authModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.id = 'authModal';
            modal.innerHTML = `
                <div class="checkout-card" style="max-width: 440px;">
                    <div class="auth-tabs">
                        <button class="auth-tab-btn active" id="tabLoginBtn">Sign In</button>
                        <button class="auth-tab-btn" id="tabRegisterBtn">Register</button>
                        <button class="close-modal" id="closeAuthModalBtn" style="padding:0 20px;">&times;</button>
                    </div>
                    <div class="checkout-body">
                        <!-- LOGIN FORM -->
                        <form id="loginForm">
                            <div class="form-group">
                                <label for="loginEmail">Email Address *</label>
                                <input type="email" id="loginEmail" placeholder="yourname@gmail.com" required />
                            </div>
                            <div class="form-group">
                                <label for="loginPassword">Password *</label>
                                <div class="pwd-field-wrapper">
                                    <input type="password" id="loginPassword" placeholder="••••••••" required />
                                    <button type="button" class="pwd-toggle-btn" data-target="loginPassword"><i class="far fa-eye"></i></button>
                                </div>
                            </div>
                            <div class="auth-remember-row">
                                <label><input type="checkbox" id="rememberMe" checked /> Remember Me</label>
                                <a href="#" id="forgotPwdLink">Forgot Password?</a>
                            </div>
                            <button type="submit" class="btn-place-order">
                                <i class="fas fa-sign-in-alt"></i> Sign In to Account
                            </button>
                        </form>

                        <!-- REGISTER FORM -->
                        <form id="registerForm" style="display: none;">
                            <div class="form-group">
                                <label for="regName">Full Name *</label>
                                <input type="text" id="regName" placeholder="e.g. Sadia Hayat" required />
                            </div>
                            <div class="form-group">
                                <label for="regEmail">Email Address *</label>
                                <input type="email" id="regEmail" placeholder="yourname@gmail.com" required />
                            </div>
                            <div class="form-group">
                                <label for="regPhone">Phone / WhatsApp *</label>
                                <input type="tel" id="regPhone" placeholder="03001234567" required />
                            </div>
                            <div class="form-group">
                                <label for="regPassword">Create Password *</label>
                                <div class="pwd-field-wrapper">
                                    <input type="password" id="regPassword" placeholder="Minimum 6 characters" required minlength="6" />
                                    <button type="button" class="pwd-toggle-btn" data-target="regPassword"><i class="far fa-eye"></i></button>
                                </div>
                                <div class="pwd-strength-bar"><div class="pwd-strength-fill" id="pwdStrengthFill"></div></div>
                            </div>
                            <button type="submit" class="btn-place-order" style="margin-top: 18px;">
                                <i class="fas fa-user-plus"></i> Create My Account
                            </button>
                        </form>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('closeAuthModalBtn')?.addEventListener('click', () => modal.classList.remove('active'));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });

            // Password Toggle Buttons
            modal.querySelectorAll('.pwd-toggle-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const targetId = this.dataset.target;
                    const input = document.getElementById(targetId);
                    if (input) {
                        const isPwd = input.type === 'password';
                        input.type = isPwd ? 'text' : 'password';
                        this.querySelector('i').className = isPwd ? 'far fa-eye-slash' : 'far fa-eye';
                    }
                });
            });

            // Password strength meter
            const regPwdInput = document.getElementById('regPassword');
            const pwdFill = document.getElementById('pwdStrengthFill');
            regPwdInput?.addEventListener('input', function() {
                const val = this.value;
                if (!val) { pwdFill.className = 'pwd-strength-fill'; return; }
                if (val.length < 6) pwdFill.className = 'pwd-strength-fill weak';
                else if (val.length < 10 || !/\d/.test(val)) pwdFill.className = 'pwd-strength-fill medium';
                else pwdFill.className = 'pwd-strength-fill strong';
            });

            // Tab Switching
            const tabLoginBtn = document.getElementById('tabLoginBtn');
            const tabRegBtn = document.getElementById('tabRegisterBtn');
            const loginForm = document.getElementById('loginForm');
            const regForm = document.getElementById('registerForm');

            tabLoginBtn?.addEventListener('click', () => {
                tabLoginBtn.classList.add('active');
                tabRegBtn.classList.remove('active');
                loginForm.style.display = 'block';
                regForm.style.display = 'none';
            });

            tabRegBtn?.addEventListener('click', () => {
                tabRegBtn.classList.add('active');
                tabLoginBtn.classList.remove('active');
                loginForm.style.display = 'none';
                regForm.style.display = 'block';
            });

            // Submit Login Form
            loginForm?.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const pwd = document.getElementById('loginPassword').value;

                try {
                    const user = await AuthSystem.loginUser(email, pwd);
                    modal.classList.remove('active');
                    showToast(`✨ Welcome back, ${user.name}!`);
                } catch (err) {
                    showToast(`⚠️ ${err.message}`);
                }
            });

            // Submit Register Form
            regForm?.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('regName').value;
                const email = document.getElementById('regEmail').value;
                const phone = document.getElementById('regPhone').value;
                const pwd = document.getElementById('regPassword').value;

                if (!SecurityUtils.validateEmail(email)) {
                    showToast('⚠️ Please enter a valid real email address (e.g. name@gmail.com)');
                    return;
                }

                if (!SecurityUtils.validatePhone(phone)) {
                    showToast('⚠️ Please enter a valid Pakistani phone number (e.g. 03001234567)');
                    return;
                }

                try {
                    const user = await AuthSystem.registerUser(name, email, pwd, phone);
                    modal.classList.remove('active');
                    showToast(`🎉 Account created! Welcome ${user.name}`);
                } catch (err) {
                    showToast(`⚠️ ${err.message}`);
                }
            });

            document.getElementById('forgotPwdLink')?.addEventListener('click', (e) => {
                e.preventDefault();
                showToast('🔑 Password reset link sent to your email!');
            });
        }

        // Show modal and switch tab
        const tabLoginBtn = document.getElementById('tabLoginBtn');
        const tabRegBtn = document.getElementById('tabRegisterBtn');
        if (defaultTab === 'register') {
            tabRegBtn?.click();
        } else {
            tabLoginBtn?.click();
        }

        modal.classList.add('active');
    },

    openProfileModal() {
        const currentUser = this.getUserSession();
        if (!currentUser) return;

        let modal = document.getElementById('profileModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.id = 'profileModal';
            document.body.appendChild(modal);
        }

        const orders = JSON.parse(localStorage.getItem('hayat_orders_db') || '[]');
        const userOrders = orders.filter(o => o.customer?.name?.toLowerCase().includes(currentUser.name.toLowerCase()) || o.customer?.phone === currentUser.phone);

        modal.innerHTML = `
            <div class="checkout-card" style="max-width: 580px;">
                <div class="checkout-header">
                    <h3><i class="fas fa-user-circle" style="color:var(--gold);"></i> My Profile</h3>
                    <button class="close-modal" id="closeProfileModalBtn">&times;</button>
                </div>
                <div class="checkout-body">
                    <div class="order-summary-box" style="background:var(--cream);">
                        <h4 style="color:var(--gold);">Account Information</h4>
                        <p><strong>Name:</strong> ${SecurityUtils.sanitizeHTML(currentUser.name)}</p>
                        <p><strong>Email:</strong> ${SecurityUtils.sanitizeHTML(currentUser.email)}</p>
                        <p><strong>Phone:</strong> ${SecurityUtils.sanitizeHTML(currentUser.phone)}</p>
                    </div>

                    <h4 style="font-family:var(--font-primary); font-size:18px; margin: 20px 0 10px; color:var(--dark);">
                        <i class="fas fa-box" style="color:var(--gold);"></i> My Orders (${userOrders.length})
                    </h4>
                    
                    ${userOrders.length === 0 ? `
                        <p style="font-size:13px; color:var(--gray); text-align:center; padding: 20px 0;">No order history found. Start shopping to place your first order!</p>
                    ` : `
                        <div style="max-height: 240px; overflow-y: auto; display:flex; flex-direction:column; gap:10px;">
                            ${userOrders.map(o => `
                                <div style="background:#FFF; padding:14px; border-radius:12px; border:1px solid #EEE; font-size:13px;">
                                    <div style="display:flex; justify-style:space-between; justify-content:space-between; margin-bottom:4px;">
                                        <strong>Order #${o.orderId}</strong>
                                        <span style="color:var(--gold); font-weight:700;">PKR ${o.totalPKR.toLocaleString()}</span>
                                    </div>
                                    <div style="color:var(--gray); font-size:12px;">${o.date} — Status: <span style="color:#10B981; font-weight:600;">${o.status || 'Verified'}</span></div>
                                    <button class="btn btn-outline track-single-btn" data-id="${o.orderId}" style="padding:4px 12px; font-size:11px; margin-top:8px;">Track Package</button>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            </div>
        `;

        modal.classList.add('active');

        document.getElementById('closeProfileModalBtn')?.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        modal.querySelectorAll('.track-single-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                modal.classList.remove('active');
                OrderTracker.open(this.dataset.id);
            });
        });
    }
};

// ============================================================
// ===== INSTANT REAL-TIME SEARCH OVERLAY =====
// ============================================================
const InstantSearch = {
    open() {
        let overlay = document.getElementById('searchModalOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'search-modal-overlay';
            overlay.id = 'searchModalOverlay';
            overlay.innerHTML = `
                <div class="search-modal-box">
                    <button class="close-modal" id="closeSearchModalBtn" style="position:absolute; top:20px; right:24px;">&times;</button>
                    <div class="search-input-wrapper">
                        <i class="fas fa-search"></i>
                        <input type="text" class="search-input-field" id="searchInputField" placeholder="Search necklaces, rings, Kundan, Zircon..." autofocus />
                    </div>
                    <div class="search-results-list" id="searchResultsContainer">
                        <div style="text-align:center; color:var(--gray); padding:30px; font-size:14px;">
                            Start typing to search our collection...
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            document.getElementById('closeSearchModalBtn')?.addEventListener('click', () => overlay.classList.remove('active'));
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('active');
            });

            const input = document.getElementById('searchInputField');
            input?.addEventListener('input', function() {
                const query = this.value.trim().toLowerCase();
                const container = document.getElementById('searchResultsContainer');
                if (!container) return;

                if (!query) {
                    container.innerHTML = `<div style="text-align:center; color:var(--gray); padding:30px; font-size:14px;">Start typing to search our collection...</div>`;
                    return;
                }

                const matches = allProducts.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));

                if (matches.length === 0) {
                    container.innerHTML = `<div style="text-align:center; color:var(--gray); padding:30px; font-size:14px;">No jewellery found matching "${SecurityUtils.sanitizeHTML(query)}"</div>`;
                    return;
                }

                container.innerHTML = matches.map(p => `
                    <div class="search-result-item" data-id="${p.id}">
                        <img src="${p.image}" class="search-result-thumb" onerror="this.src='images/logo.svg'" />
                        <div class="search-result-details">
                            <h5>${p.name}</h5>
                            <span>PKR ${p.price.toLocaleString()}</span>
                        </div>
                    </div>
                `).join('');

                container.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', function() {
                        overlay.classList.remove('active');
                        QuickView.open(parseInt(this.dataset.id));
                    });
                });
            });
        }

        overlay.classList.add('active');
        setTimeout(() => document.getElementById('searchInputField')?.focus(), 100);
    }
};

// ============================================================
// ===== REAL-TIME ORDER TRACKER SYSTEM =====
// ============================================================
const OrderTracker = {
    open(orderId = '') {
        let modal = document.getElementById('orderTrackerModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.id = 'orderTrackerModal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="checkout-card" style="max-width: 520px;">
                <div class="checkout-header">
                    <h3><i class="fas fa-truck" style="color:var(--gold);"></i> Real-Time Package Tracker</h3>
                    <button class="close-modal" id="closeOrderTrackerBtn">&times;</button>
                </div>
                <div class="checkout-body">
                    <form id="trackerForm" style="display:flex; gap:10px; margin-bottom:20px;">
                        <input type="text" id="trackInputId" value="${orderId}" placeholder="Enter Order ID (e.g. HC-54892)" required style="flex:1; padding:12px; border:1.5px solid var(--light-gray); border-radius:10px; font-size:14px;" />
                        <button type="submit" class="btn btn-primary" style="padding:0 24px;">Track</button>
                    </form>
                    <div id="trackerStatusContent"></div>
                </div>
            </div>
        `;

        modal.classList.add('active');

        document.getElementById('closeOrderTrackerBtn')?.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        const form = document.getElementById('trackerForm');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputVal = document.getElementById('trackInputId').value.trim().replace('#', '');
            this.renderStatus(inputVal);
        });

        if (orderId) {
            this.renderStatus(orderId.replace('#', ''));
        }
    },

    renderStatus(orderId) {
        const container = document.getElementById('trackerStatusContent');
        if (!container) return;

        const orders = JSON.parse(localStorage.getItem('hayat_orders_db') || '[]');
        const found = orders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());

        if (!found) {
            container.innerHTML = `
                <div style="text-align:center; padding:20px; color:var(--gray);">
                    <i class="fas fa-search" style="font-size:32px; color:var(--gold); margin-bottom:10px;"></i>
                    <p>No active package found for Order ID <strong>#${SecurityUtils.sanitizeHTML(orderId)}</strong>.</p>
                    <span style="font-size:12px;">Please check your receipt or WhatsApp order confirmation email.</span>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div style="background:var(--cream); padding:16px; border-radius:12px; margin-bottom:16px; font-size:13.5px;">
                <div style="display:flex; justify-content:space-between; font-weight:700;">
                    <span>Order #${found.orderId}</span>
                    <span style="color:var(--gold);">PKR ${found.totalPKR.toLocaleString()}</span>
                </div>
                <div style="color:var(--gray); font-size:12px; margin-top:4px;">Recipient: ${SecurityUtils.sanitizeHTML(found.customer.name)} (${found.customer.city})</div>
            </div>

            <div class="order-tracker-timeline">
                <div class="timeline-step completed">
                    <div class="timeline-icon"><i class="fas fa-shopping-bag"></i></div>
                    <div class="timeline-label">Placed</div>
                </div>
                <div class="timeline-step completed">
                    <div class="timeline-icon"><i class="fas fa-check"></i></div>
                    <div class="timeline-label">Verified</div>
                </div>
                <div class="timeline-step active">
                    <div class="timeline-icon"><i class="fas fa-box-open"></i></div>
                    <div class="timeline-label">Dispatching</div>
                </div>
                <div class="timeline-step">
                    <div class="timeline-icon"><i class="fas fa-truck"></i></div>
                    <div class="timeline-label">Delivered</div>
                </div>
            </div>

            <p style="font-size:12.5px; color:var(--gray); text-align:center; margin-top:16px;">
                🚚 Expected Delivery via Express Courier within <strong>24–48 Hours</strong>.
            </p>
        `;
    }
};

// ============================================================
// ===== QUICK VIEW PRODUCT MODAL =====
// ============================================================
const QuickView = {
    open(productId) {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        let modal = document.getElementById('quickViewModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.id = 'quickViewModal';
            document.body.appendChild(modal);
        }

        const viewers = Math.floor(3 + Math.random() * 8);

        modal.innerHTML = `
            <div class="checkout-card" style="max-width: 680px;">
                <div class="checkout-header">
                    <h3><i class="fas fa-gem" style="color:var(--gold);"></i> Product Quick View</h3>
                    <button class="close-modal" id="closeQuickViewBtn">&times;</button>
                </div>
                <div class="checkout-body">
                    <div class="quick-view-flex">
                        <div class="quick-view-img-box">
                            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/logo.svg'" />
                        </div>
                        <div>
                            <div class="quick-view-stock-tag">
                                <i class="fas fa-fire"></i> ${viewers} people viewing right now
                            </div>
                            <h3 style="font-family:var(--font-primary); font-size:24px; color:var(--dark); mb-2;">${product.name}</h3>
                            <span style="font-size:12px; color:var(--gray); text-transform:uppercase; letter-spacing:1px;">Category: ${product.category}</span>
                            <div style="font-size:24px; font-weight:700; color:var(--gold); margin:12px 0;">
                                PKR ${product.price.toLocaleString()}
                                ${product.original ? `<span style="font-size:15px; color:var(--gray); text-decoration:line-through; margin-left:8px;">PKR ${product.original.toLocaleString()}</span>` : ''}
                            </div>
                            <p style="font-size:13.5px; color:var(--gray); line-height:1.6; margin-bottom:20px;">
                                Premium artificial fashion jewellery design with exquisite shine &amp; long-lasting anti-tarnish finish.
                            </p>
                            <button class="btn btn-primary" id="qvAddToCartBtn" style="width:100%;">
                                <i class="fas fa-shopping-bag"></i> Add to Bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');

        document.getElementById('closeQuickViewBtn')?.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        document.getElementById('qvAddToCartBtn')?.addEventListener('click', () => {
            addToCart(product);
            modal.classList.remove('active');
        });
    }
};

// ============================================================
// ===== REAL-TIME AI JEWELLERY ADVISOR CHATBOT =====
// ============================================================
const AIChatbot = {
    init() {
        if (document.getElementById('aiChatToggle')) return;

        const toggle = document.createElement('button');
        toggle.className = 'ai-chatbot-toggle';
        toggle.id = 'aiChatToggle';
        toggle.title = 'Ask AI Jewellery Assistant';
        toggle.innerHTML = `<i class="fas fa-comment-alt"></i>`;

        const box = document.createElement('div');
        box.className = 'ai-chatbot-box';
        box.id = 'aiChatBox';
        box.innerHTML = `
            <div class="chat-header">
                <h4><i class="fas fa-robot" style="color:var(--gold);"></i> Hayat's AI Stylist</h4>
                <button class="close-modal" id="closeChatBtn" style="color:#FFF;">&times;</button>
            </div>
            <div class="chat-messages" id="chatMessagesBox">
                <div class="chat-msg bot">
                    ✨ Hello! I am your AI Jewellery Assistant at Hayat's Collection. How can I help you choose the perfect Kundan or Zircon piece today?
                </div>
            </div>
            <div class="chat-input-row">
                <input type="text" id="chatInputField" placeholder="Ask about delivery, Kundan, ring sizes..." />
                <button id="sendChatBtn"><i class="fas fa-paper-plane"></i></button>
            </div>
        `;

        document.body.appendChild(toggle);
        document.body.appendChild(box);

        toggle.addEventListener('click', () => box.classList.toggle('active'));
        document.getElementById('closeChatBtn')?.addEventListener('click', () => box.classList.remove('active'));

        const input = document.getElementById('chatInputField');
        const sendBtn = document.getElementById('sendChatBtn');

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;

            this.appendMessage(text, 'user');
            input.value = '';

            setTimeout(() => {
                const botReply = this.generateResponse(text);
                this.appendMessage(botReply, 'bot');
            }, 600);
        };

        sendBtn?.addEventListener('click', sendMessage);
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    },

    appendMessage(text, sender) {
        const box = document.getElementById('chatMessagesBox');
        if (!box) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.textContent = text;
        box.appendChild(msgDiv);
        box.scrollTop = box.scrollHeight;
    },

    generateResponse(query) {
        const q = query.toLowerCase();
        if (q.includes('deliver') || q.includes('shipping') || q.includes('time') || q.includes('cod')) {
            return "🚚 We offer Free Express Cash on Delivery across Pakistan! Orders reach your doorstep in 24–48 hours.";
        }
        if (q.includes('gold') || q.includes('real') || q.includes('material') || q.includes('kundan')) {
            return "💎 We specialize in high-grade artificial fashion jewellery, including Kundan, AAA Cubic Zirconia, & Rose Gold double-plated designs.";
        }
        if (q.includes('return') || q.includes('policy') || q.includes('exchange')) {
            return "🔄 We offer easy 30-day hassle-free returns. Your satisfaction is 100% guaranteed!";
        }
        if (q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('email')) {
            return "📞 You can WhatsApp us at +92 300 1234567 or email Sadia Hayat directly at sadiaishtiaqqq@gmail.com!";
        }
        if (q.includes('price') || q.includes('discount') || q.includes('offer')) {
            return "🎁 Enjoy free express delivery on all orders today! Check out our Shop All page for special seasonal price drops.";
        }
        return "✨ Thank you for your question! For custom bridal requests or sizing guidance, our designer Sadia Hayat will assist you on WhatsApp (+92 300 1234567).";
    }
};

// ============================================================
// ===== REAL-TIME SALES TICKER TOAST =====
// ============================================================
const LiveSalesTicker = {
    buyers: ['Ayesha K. from Lahore', 'Fatima M. from Karachi', 'Zainab R. from Islamabad', 'Maryam H. from Rawalpindi', 'Sana A. from Faisalabad', 'Hira S. from Peshawar'],

    init() {
        setInterval(() => {
            if (Math.random() > 0.4) {
                const randomBuyer = this.buyers[Math.floor(Math.random() * this.buyers.length)];
                const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
                
                const toast = document.createElement('div');
                toast.className = 'sales-ticker-toast';
                toast.innerHTML = `
                    <i class="fas fa-shopping-bag" style="color:var(--gold); font-size:18px;"></i>
                    <div>
                        <strong>${randomBuyer}</strong><br/>
                        <span style="color:var(--gray); font-size:12px;">Just ordered <strong>${randomProduct.name}</strong></span>
                    </div>
                `;
                document.body.appendChild(toast);

                requestAnimationFrame(() => toast.classList.add('active'));

                setTimeout(() => {
                    toast.classList.remove('active');
                    setTimeout(() => toast.remove(), 500);
                }, 4500);
            }
        }, 16000);
    }
};

// ============================================================
// ===== INITIALIZE ALL REAL-TIME MODULES =====
// ============================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupCartDrawerDOM();
        setupOrderSystemDOM();
        AuthSystem.renderNavbarAuthControls();
    });
} else {
    setupCartDrawerDOM();
    setupOrderSystemDOM();
    AuthSystem.renderNavbarAuthControls();
}

console.log('✨ Hayat\'s Collection — Real-time Authentication & Security Suite operational!');