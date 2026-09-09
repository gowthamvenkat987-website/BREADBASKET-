export const INITIAL_ORDERS = [
  {
    id: 'BB-84920',
    date: '2026-09-08 17:15',
    customerName: 'Naveen Kumar',
    phone: '98480 12345',
    email: 'naveen.k@gmail.com',
    type: 'delivery',
    address: 'Flat 302, Sri Sai Towers, Guru Nanak Colony, Vijayawada - 520008',
    paymentMethod: 'UPI (GPay)',
    paymentStatus: 'Paid',
    status: 'Out for Delivery',
    items: [
      { id: 'cake-belgian-truffle', name: 'Royal Belgian Dark Chocolate Truffle Cake', weight: '1 kg', quantity: 1, price: 923 },
      { id: 'pastry-butter-croissant', name: 'Pure Butter Viennoiserie Croissant', quantity: 2, price: 220 }
    ],
    subtotal: 1143,
    deliveryFee: 0,
    discount: 50,
    total: 1093,
    instructions: 'Please call before arriving at the gate'
  },
  {
    id: 'BB-84919',
    date: '2026-09-08 16:40',
    customerName: 'Divya Reddy',
    phone: '97012 34567',
    email: 'divya.r@outlook.com',
    type: 'pickup',
    address: 'Store Pickup (Panta Kaluva Road)',
    paymentMethod: 'Pay at Store',
    paymentStatus: 'Pending',
    status: 'Preparing',
    items: [
      { id: 'cake-blueberry-cheesecake', name: 'New York Baked Blueberry Cheesecake', weight: '0.5 kg', quantity: 1, price: 520 },
      { id: 'bread-garlic-herb-focaccia', name: 'Rosemary & Roasted Garlic Focaccia', quantity: 1, price: 150 }
    ],
    subtotal: 670,
    deliveryFee: 0,
    discount: 0,
    total: 670,
    instructions: 'Pickup around 6:30 PM today'
  },
  {
    id: 'BB-84918',
    date: '2026-09-08 14:10',
    customerName: 'Suresh Babu',
    phone: '94401 88990',
    email: 'sbabu.vja@gmail.com',
    type: 'delivery',
    address: 'Door 40-1-52, Near PVP Square Mall, MG Road, Vijayawada - 520010',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Completed',
    items: [
      { id: 'pizza-margherita-sourdough', name: 'Artisan Sourdough Margherita Pizza (10")', quantity: 2, price: 598 },
      { id: 'bev-cold-coffee-icecream', name: 'Signature Thick Cold Coffee with Vanilla Bean Gelato', quantity: 2, price: 280 }
    ],
    subtotal: 878,
    deliveryFee: 0,
    discount: 80,
    total: 798,
    instructions: 'Ring the doorbell twice'
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'RES-301',
    customerName: 'Harish Chandra',
    phone: '99890 55443',
    email: 'harish.c@gmail.com',
    date: '2026-09-09',
    time: '19:30',
    guests: 4,
    zone: 'Bakery Window Side',
    occasion: 'Birthday Celebration',
    specialRequest: 'Please provide candles for a dessert surprise',
    status: 'Confirmed'
  },
  {
    id: 'RES-302',
    customerName: 'Meghana Rao',
    phone: '98499 11223',
    email: 'meghana.rao@gmail.com',
    date: '2026-09-10',
    time: '17:00',
    guests: 2,
    zone: 'Quiet Corner Lounge',
    occasion: 'Casual Meetup',
    specialRequest: 'Window seat preferred if available',
    status: 'Confirmed'
  }
];

export const INITIAL_CUSTOM_CAKES = [
  {
    id: 'CC-101',
    customerName: 'Sneha Patel',
    phone: '97033 44556',
    email: 'sneha.patel@gmail.com',
    flavor: 'Belgian Dark Chocolate Ganache',
    weight: '2 kg (2-Tier)',
    shape: 'Round Tiered',
    icingColor: 'Pastel Blush Pink & Gold Leaf',
    message: 'Happy 1st Birthday Prince Aarav',
    preferredDate: '2026-09-12',
    preferredTime: '18:00',
    isEggless: true,
    estimatedPrice: 2200,
    instructions: 'Teddy bear theme decor on top tier, no nuts please.',
    status: 'Under Review'
  },
  {
    id: 'CC-102',
    customerName: 'Vikram Mohan',
    phone: '98661 77889',
    email: 'vikram.m@gmail.com',
    flavor: 'Red Velvet with Cream Cheese',
    weight: '1.5 kg',
    shape: 'Heart Shaped',
    icingColor: 'Crimson Red with White Pearls',
    message: 'Happy 5th Anniversary My Love',
    preferredDate: '2026-09-14',
    preferredTime: '19:30',
    isEggless: true,
    estimatedPrice: 1450,
    instructions: 'Elegant edible gold sprinkles along the perimeter.',
    status: 'Confirmed'
  }
];
