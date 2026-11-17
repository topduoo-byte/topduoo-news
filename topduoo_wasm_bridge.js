
(function () {
  'use strict';

  // Base64 WebAssembly Core Fallback
  const WASM_B64 = "AGFzbQEAAAABOwpgAAF/YAJ/fwF/YAF/AGABfwF/YAAAYAJ/fwBgBH9/f38AYAN/f34AYAd/f39/f39/AX9gA39/fwF/Ag0BA2VudgVhYm9ydAAGAzMyAQIAAAECBQUCAgABBAcEAwAABAIDBAEDAwAAAAECAAgCAQIAAwMDAAAEAwkBAgABAQMFAwEAAQZpFH8BQQALfwFBAAt/AUEAC38BQQALfwFBAAt/AUEAC38BQQALfwFBAAt/AUEAC38BQQALfwFBuQYLfwFBAAt/AUEBC38BQQELfwFBAAt/AEGQDgt/AUGsjgILB88FJwlpbml0X2NvcmUAGwhjYXJ0X2FkZAAsC2NhcnRfcmVtb3ZlABAMY2FydF9zZXRfcXR5ACIKY2FydF9jbGVhcgAqDmNhcnRfZ2V0X2NvdW50ACkSY2FydF9nZXRfdG90YWxfcXR5ACQQY2FydF9nZXRfaXRlbV9pZAAnEWNhcnRfZ2V0X2l0ZW1fcXR5ACUTY2FydF9nZXRfaXRlbV9wcmljZQAmEWNhcnRfZ2V0X3N1YnRvdGFsAAMVY2FydF9zZXRfZGlzY291bnRfYnBzACMYY2FydF9nZXRfZGlzY291bnRfYW1vdW50AAsVY2FydF9zZXRfdGF4X3JhdGVfYnBzACETY2FydF9nZXRfdGF4X2Ftb3VudAARF2NhcnRfZ2V0X3NoaXBwaW5nX2NlbnRzABIUY2FydF9nZXRfZ3JhbmRfdG90YWwAKBZjYXJ0X2FwcGx5X2NvdXBvbl9oYXNoACsOaGFzaF9ieXRlX3N0ZXAAHQloYXNoX2luaXQAHBhhZG1pbl92ZXJpZnlfY3JlZGVudGlhbHMAMBphZG1pbl9jcmVhdGVfc2Vzc2lvbl90b2tlbgAyFmFkbWluX3ZhbGlkYXRlX3Nlc3Npb24AMQtzbGlkZXJfbmV4dAAZC3NsaWRlcl9wcmV2ABgKc2xpZGVyX3NldAAXEnNsaWRlcl9nZXRfY3VycmVudAAaEGFkdl9nZXRfcG9zaXRpb24ALxBhZHZfc2V0X3Bvc2l0aW9uAC4RZm9vdGVyX2dldF9sYXlvdXQAHxFmb290ZXJfc2V0X2xheW91dAAeFGZpbHRlcl9jaGVja19wcm9kdWN0ACAaY2FsY3VsYXRlX2Rpc2NvdW50X3BlcmNlbnQALQVfX25l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";

  // Products Database
  const PRODUCTS = window.TOPDUOO_PRODUCTS || [
  {
    "id": 32160,
    "name": "Multifunctional Three-Head Fascia Massage Gun",
    "category": "gadgets",
    "categoryName": "Smart Gadgets & Health",
    "price": 1300,
    "origPrice": 1790,
    "wholesalePrice": 920,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787046308_L_3.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_3.jpg"
    ],
    "description": "Multifunctional Three-Head Fascia Massage Gun\nসারাদিনের ক্লান্তি ও পেশির টান থেকে আরাম পেতে ব্যবহার করুন এই মাল্টিফাংশনাল ফেসিয়া ম্যাসাজ গান।\n৩-হেড ম্যাসাজ সিস্টেম, ৬টি স্পিড লেভেল এবং বিভিন্ন ধরনের পরিবর্তনযোগ্য হেডের কারণে শরীরের বিভিন্ন অংশে সহজেই ব্যবহার করা যায়। 💆‍♂️✨\n✨ হালকা, পোর্টেবল ও সহজে ব্যবহারযোগ্য—দৈনন্দিন রিল্যাক্সেশনের জন্য দারুণ একটি ম্যাসাজ ডিভাইস।\n📌 পণ্যের বিস্তারিত\n৩-হেড স্পেশাল ম্যাসাজ ডিজাইন\n৬টি স্পিড লেভেল\nবিভিন্ন কাজের জন্য একাধিক পরিবর্তনযোগ্য ম্যাসাজ হেড\nরিচার্জেবল ও পোর্টেবল\nUSB চার্জিং সুবিধা\nহালকা ও আরামদায়ক এর্গোনমিক গ্রিপ\nব্যবহার: ঘাড়, কাঁধ, পিঠ, কোমর, হাত, পা ও বিভিন্ন জয়েন্টে ব্যবহারের উপযোগী\nবক্সে থাকছে: ম্যাসাজ গান, একাধিক ম্যাসাজ হেড, USB চার্জিং কেবল ও ইউজার ম্যানুয়াল",
    "soldCount": 455,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 32159,
    "name": "Multifunctional Three-Head Fascia Massage Gun",
    "category": "gadgets",
    "categoryName": "Smart Gadgets & Health",
    "price": 1300,
    "origPrice": 1790,
    "wholesalePrice": 920,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787046308_L_2.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_3.jpg"
    ],
    "description": "Multifunctional Three-Head Fascia Massage Gun\nসারাদিনের ক্লান্তি ও পেশির টান থেকে আরাম পেতে ব্যবহার করুন এই মাল্টিফাংশনাল ফেসিয়া ম্যাসাজ গান।\n৩-হেড ম্যাসাজ সিস্টেম, ৬টি স্পিড লেভেল এবং বিভিন্ন ধরনের পরিবর্তনযোগ্য হেডের কারণে শরীরের বিভিন্ন অংশে সহজেই ব্যবহার করা যায়। 💆‍♂️✨\n✨ হালকা, পোর্টেবল ও সহজে ব্যবহারযোগ্য—দৈনন্দিন রিল্যাক্সেশনের জন্য দারুণ একটি ম্যাসাজ ডিভাইস।\n📌 পণ্যের বিস্তারিত\n৩-হেড স্পেশাল ম্যাসাজ ডিজাইন\n৬টি স্পিড লেভেল\nবিভিন্ন কাজের জন্য একাধিক পরিবর্তনযোগ্য ম্যাসাজ হেড\nরিচার্জেবল ও পোর্টেবল\nUSB চার্জিং সুবিধা\nহালকা ও আরামদায়ক এর্গোনমিক গ্রিপ\nব্যবহার: ঘাড়, কাঁধ, পিঠ, কোমর, হাত, পা ও বিভিন্ন জয়েন্টে ব্যবহারের উপযোগী\nবক্সে থাকছে: ম্যাসাজ গান, একাধিক ম্যাসাজ হেড, USB চার্জিং কেবল ও ইউজার ম্যানুয়াল",
    "soldCount": 454,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 32158,
    "name": "Multifunctional Three-Head Fascia Massage Gun",
    "category": "gadgets",
    "categoryName": "Smart Gadgets & Health",
    "price": 1300,
    "origPrice": 1790,
    "wholesalePrice": 920,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787046308_L_1.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787046308_S_3.jpg"
    ],
    "description": "Multifunctional Three-Head Fascia Massage Gun\nসারাদিনের ক্লান্তি ও পেশির টান থেকে আরাম পেতে ব্যবহার করুন এই মাল্টিফাংশনাল ফেসিয়া ম্যাসাজ গান।\n৩-হেড ম্যাসাজ সিস্টেম, ৬টি স্পিড লেভেল এবং বিভিন্ন ধরনের পরিবর্তনযোগ্য হেডের কারণে শরীরের বিভিন্ন অংশে সহজেই ব্যবহার করা যায়। 💆‍♂️✨\n✨ হালকা, পোর্টেবল ও সহজে ব্যবহারযোগ্য—দৈনন্দিন রিল্যাক্সেশনের জন্য দারুণ একটি ম্যাসাজ ডিভাইস।\n📌 পণ্যের বিস্তারিত\n৩-হেড স্পেশাল ম্যাসাজ ডিজাইন\n৬টি স্পিড লেভেল\nবিভিন্ন কাজের জন্য একাধিক পরিবর্তনযোগ্য ম্যাসাজ হেড\nরিচার্জেবল ও পোর্টেবল\nUSB চার্জিং সুবিধা\nহালকা ও আরামদায়ক এর্গোনমিক গ্রিপ\nব্যবহার: ঘাড়, কাঁধ, পিঠ, কোমর, হাত, পা ও বিভিন্ন জয়েন্টে ব্যবহারের উপযোগী\nবক্সে থাকছে: ম্যাসাজ গান, একাধিক ম্যাসাজ হেড, USB চার্জিং কেবল ও ইউজার ম্যানুয়াল",
    "soldCount": 453,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 2174,
    "name": "GTS-1386 wireless outdoor speakers audio speaker wireless",
    "category": "gadgets",
    "categoryName": "Audio & Speakers",
    "price": 900,
    "origPrice": 1270,
    "wholesalePrice": 510,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1694932698_L_1.jpg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1694932698_S_1.jpg"
    ],
    "description": "GTS-1386 wireless outdoor speakers audio speaker wireless\nMaterial : ABS plastic\nOperation method : button\nSpeaker effect : Line subwoofer\nPower : 10-20W\nFrequency response : 100Hz - 20KHz.\nSupports MP3 player function from: USB / TF card\nConnection distance : 10m\nBattery capacity : 600mAh\nPower supply : AC 220V\nTime to use : 3 - 6h\nSize : 16cm x 25cm x 12cm",
    "soldCount": 469,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 2173,
    "name": "WirelessBluetooth Speaker Powerful Extra Bass and - Dynamic RGB Lighting Effects",
    "category": "gadgets",
    "categoryName": "Audio & Speakers",
    "price": 1100,
    "origPrice": 1530,
    "wholesalePrice": 670,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1694932534_L_1.jpg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1694932534_S_1.jpg"
    ],
    "description": "WirelessBluetooth Speaker Powerful Extra Bass and - Dynamic RGB Lighting Effects\nPowerful Extra Bass\nDynamic RGB Lighting Effects\nLong-lasting Battery Life\nEasy-to-use Controls\nHigh-Quality Sound",
    "soldCount": 468,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 28163,
    "name": "Chaina Sunglass",
    "category": "watches",
    "categoryName": "Watches & Accessories",
    "price": 600,
    "origPrice": 880,
    "wholesalePrice": 399,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1773173943_L_3.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_3.jpg"
    ],
    "description": "Chaina Sunglass\nস্টাইল ও কমফোর্টের পারফেক্ট কম্বিনেশন এই Chaina Sunglass।\nআধুনিক ডিজাইন ও প্রিমিয়াম ফিনিশের কারণে এটি যেকোনো আউটফিটের\nসাথে সহজেই মানিয়ে যায়। দৈনন্দিন ব্যবহার, ভ্রমণ বা আউটডোর অ্যাক্টিভিটির জন্য এটি একটি দারুণ পছন্দ।\nফিচারসমূহ:\n• এলিপটিক্যাল শেপের স্টাইলিশ মেটাল ফ্রেম\n• দীর্ঘ সময় ব্যবহারেও আরামদায়ক কমফোর্টেবল নোজ প্যাড\n• মজবুত ও টেকসই হাই কোয়ালিটি হিঞ্জেস ও ফার্ম স্ক্রু\n• লাইটওয়েট ও ফ্যাশনেবল ডিজাইন\n• ছেলে ও মেয়ে উভয়ের জন্য উপযোগী\nআপনার স্টাইলকে আরও স্মার্ট ও ট্রেন্ডি করে তুলতে\nআজই সংগ্রহ করুন এই আকর্ষণীয় Chaina Sunglass।",
    "soldCount": 658,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 28162,
    "name": "Chaina Sunglass",
    "category": "watches",
    "categoryName": "Watches & Accessories",
    "price": 600,
    "origPrice": 880,
    "wholesalePrice": 399,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1773173943_L_2.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_3.jpg"
    ],
    "description": "Chaina Sunglass\nস্টাইল ও কমফোর্টের পারফেক্ট কম্বিনেশন এই Chaina Sunglass।\nআধুনিক ডিজাইন ও প্রিমিয়াম ফিনিশের কারণে এটি যেকোনো আউটফিটের\nসাথে সহজেই মানিয়ে যায়। দৈনন্দিন ব্যবহার, ভ্রমণ বা আউটডোর অ্যাক্টিভিটির জন্য এটি একটি দারুণ পছন্দ।\nফিচারসমূহ:\n• এলিপটিক্যাল শেপের স্টাইলিশ মেটাল ফ্রেম\n• দীর্ঘ সময় ব্যবহারেও আরামদায়ক কমফোর্টেবল নোজ প্যাড\n• মজবুত ও টেকসই হাই কোয়ালিটি হিঞ্জেস ও ফার্ম স্ক্রু\n• লাইটওয়েট ও ফ্যাশনেবল ডিজাইন\n• ছেলে ও মেয়ে উভয়ের জন্য উপযোগী\nআপনার স্টাইলকে আরও স্মার্ট ও ট্রেন্ডি করে তুলতে\nআজই সংগ্রহ করুন এই আকর্ষণীয় Chaina Sunglass।",
    "soldCount": 657,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 28161,
    "name": "Chaina Sunglass",
    "category": "watches",
    "categoryName": "Watches & Accessories",
    "price": 600,
    "origPrice": 880,
    "wholesalePrice": 399,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1773173943_L_1.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1773173943_S_3.jpg"
    ],
    "description": "Chaina Sunglass\nস্টাইল ও কমফোর্টের পারফেক্ট কম্বিনেশন এই Chaina Sunglass।\nআধুনিক ডিজাইন ও প্রিমিয়াম ফিনিশের কারণে এটি যেকোনো আউটফিটের\nসাথে সহজেই মানিয়ে যায়। দৈনন্দিন ব্যবহার, ভ্রমণ বা আউটডোর অ্যাক্টিভিটির জন্য এটি একটি দারুণ পছন্দ।\nফিচারসমূহ:\n• এলিপটিক্যাল শেপের স্টাইলিশ মেটাল ফ্রেম\n• দীর্ঘ সময় ব্যবহারেও আরামদায়ক কমফোর্টেবল নোজ প্যাড\n• মজবুত ও টেকসই হাই কোয়ালিটি হিঞ্জেস ও ফার্ম স্ক্রু\n• লাইটওয়েট ও ফ্যাশনেবল ডিজাইন\n• ছেলে ও মেয়ে উভয়ের জন্য উপযোগী\nআপনার স্টাইলকে আরও স্মার্ট ও ট্রেন্ডি করে তুলতে\nআজই সংগ্রহ করুন এই আকর্ষণীয় Chaina Sunglass।",
    "soldCount": 656,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 32154,
    "name": "Arctic Hunter Premium Backpack",
    "category": "bags",
    "categoryName": "Backpacks & Laptop Bags",
    "price": 1600,
    "origPrice": 2180,
    "wholesalePrice": 1150,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787045701_L_3.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_3.jpg"
    ],
    "description": "Arctic Hunter Premium Backpack\nঅফিস, বিশ্ববিদ্যালয়, ভ্রমণ কিংবা ব্যবসায়িক কাজে—সব জায়গায় স্টাইল ও প্রয়োজনের পারফেক্ট কম্বিনেশন।\nপ্রিমিয়াম ওয়াটারপ্রুফ ফেব্রিক, স্মার্ট ডিজাইন ও আরামদায়ক ব্যবহারের জন্য এটি হতে পারে আপনার দৈনন্দিন ব্যবহারের আদর্শ ব্যাকপ্যাক। 🎒✨\n✨ প্রিমিয়াম লুক, মজবুত গঠন ও স্মার্ট ডিজাইনের সমন্বয়ে দৈনন্দিন ব্যবহারের জন্য দারুণ একটি ব্যাকপ্যাক।\n📌 পণ্যের বিস্তারিত\nফেব্রিক: উচ্চ ঘনত্বের পানি-নিরোধক পলিয়েস্টার/নাইলন\nসামনের অংশ: ওয়াটারপ্রুফ\nপেছনের অংশ: আরামদায়ক থ্রি-ডি মেশ প্যাডিং\nস্ট্র্যাপ: কুশনযুক্ত ও আরামদায়ক কাঁধের স্ট্র্যাপ\nল্যাপটপ ও গ্যাজেট রাখার জন্য আলাদা জায়গা\nএকাধিক স্মার্ট জিপার পকেট\nলাগেজ স্ট্র্যাপ: ট্রলি ব্যাগের হ্যান্ডেলের সাথে সহজে যুক্ত করা যায়\nসাইড কম্প্রেশন বাকল: ব্যাগের আকার নিয়ন্ত্রণ ও জিনিসপত্র সুরক্ষিত রাখতে সহায়ক\nজিপার: মসৃণ ও টেকসই মেটাল জিপার\nবাকল: হেভি-ডিউটি টেকসই বাকল\nব্যবহার: অফিস, বিশ্ববিদ্যালয়, ভ্রমণ, ব্যবসায়িক সফর ও দৈনন্দিন ব্যবহার",
    "soldCount": 449,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 32153,
    "name": "Arctic Hunter Premium Backpack",
    "category": "bags",
    "categoryName": "Backpacks & Laptop Bags",
    "price": 1600,
    "origPrice": 2180,
    "wholesalePrice": 1150,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787045701_L_2.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_3.jpg"
    ],
    "description": "Arctic Hunter Premium Backpack\nঅফিস, বিশ্ববিদ্যালয়, ভ্রমণ কিংবা ব্যবসায়িক কাজে—সব জায়গায় স্টাইল ও প্রয়োজনের পারফেক্ট কম্বিনেশন।\nপ্রিমিয়াম ওয়াটারপ্রুফ ফেব্রিক, স্মার্ট ডিজাইন ও আরামদায়ক ব্যবহারের জন্য এটি হতে পারে আপনার দৈনন্দিন ব্যবহারের আদর্শ ব্যাকপ্যাক। 🎒✨\n✨ প্রিমিয়াম লুক, মজবুত গঠন ও স্মার্ট ডিজাইনের সমন্বয়ে দৈনন্দিন ব্যবহারের জন্য দারুণ একটি ব্যাকপ্যাক।\n📌 পণ্যের বিস্তারিত\nফেব্রিক: উচ্চ ঘনত্বের পানি-নিরোধক পলিয়েস্টার/নাইলন\nসামনের অংশ: ওয়াটারপ্রুফ\nপেছনের অংশ: আরামদায়ক থ্রি-ডি মেশ প্যাডিং\nস্ট্র্যাপ: কুশনযুক্ত ও আরামদায়ক কাঁধের স্ট্র্যাপ\nল্যাপটপ ও গ্যাজেট রাখার জন্য আলাদা জায়গা\nএকাধিক স্মার্ট জিপার পকেট\nলাগেজ স্ট্র্যাপ: ট্রলি ব্যাগের হ্যান্ডেলের সাথে সহজে যুক্ত করা যায়\nসাইড কম্প্রেশন বাকল: ব্যাগের আকার নিয়ন্ত্রণ ও জিনিসপত্র সুরক্ষিত রাখতে সহায়ক\nজিপার: মসৃণ ও টেকসই মেটাল জিপার\nবাকল: হেভি-ডিউটি টেকসই বাকল\nব্যবহার: অফিস, বিশ্ববিদ্যালয়, ভ্রমণ, ব্যবসায়িক সফর ও দৈনন্দিন ব্যবহার",
    "soldCount": 448,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 32152,
    "name": "Arctic Hunter Premium Backpack",
    "category": "bags",
    "categoryName": "Backpacks & Laptop Bags",
    "price": 1600,
    "origPrice": 2180,
    "wholesalePrice": 1150,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787045701_L_1.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787045701_S_3.jpg"
    ],
    "description": "Arctic Hunter Premium Backpack\nঅফিস, বিশ্ববিদ্যালয়, ভ্রমণ কিংবা ব্যবসায়িক কাজে—সব জায়গায় স্টাইল ও প্রয়োজনের পারফেক্ট কম্বিনেশন।\nপ্রিমিয়াম ওয়াটারপ্রুফ ফেব্রিক, স্মার্ট ডিজাইন ও আরামদায়ক ব্যবহারের জন্য এটি হতে পারে আপনার দৈনন্দিন ব্যবহারের আদর্শ ব্যাকপ্যাক। 🎒✨\n✨ প্রিমিয়াম লুক, মজবুত গঠন ও স্মার্ট ডিজাইনের সমন্বয়ে দৈনন্দিন ব্যবহারের জন্য দারুণ একটি ব্যাকপ্যাক।\n📌 পণ্যের বিস্তারিত\nফেব্রিক: উচ্চ ঘনত্বের পানি-নিরোধক পলিয়েস্টার/নাইলন\nসামনের অংশ: ওয়াটারপ্রুফ\nপেছনের অংশ: আরামদায়ক থ্রি-ডি মেশ প্যাডিং\nস্ট্র্যাপ: কুশনযুক্ত ও আরামদায়ক কাঁধের স্ট্র্যাপ\nল্যাপটপ ও গ্যাজেট রাখার জন্য আলাদা জায়গা\nএকাধিক স্মার্ট জিপার পকেট\nলাগেজ স্ট্র্যাপ: ট্রলি ব্যাগের হ্যান্ডেলের সাথে সহজে যুক্ত করা যায়\nসাইড কম্প্রেশন বাকল: ব্যাগের আকার নিয়ন্ত্রণ ও জিনিসপত্র সুরক্ষিত রাখতে সহায়ক\nজিপার: মসৃণ ও টেকসই মেটাল জিপার\nবাকল: হেভি-ডিউটি টেকসই বাকল\nব্যবহার: অফিস, বিশ্ববিদ্যালয়, ভ্রমণ, ব্যবসায়িক সফর ও দৈনন্দিন ব্যবহার",
    "soldCount": 447,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 31795,
    "name": "Premium Waterproof School Bag",
    "category": "bags",
    "categoryName": "Women's Designer Bags",
    "price": 1500,
    "origPrice": 2050,
    "wholesalePrice": 1050,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1785847431_L_3.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_3.jpg"
    ],
    "description": "Premium Waterproof School Bag\n🎒 প্রিমিয়াম ওয়াটারপ্রুফ স্কুল ব্যাকপ্যাক (ক্লাস ৪–৮)\nআপনার সন্তানের স্কুলজীবনকে করুন আরও সহজ, আরামদায়ক ও স্টাইলিশ! 💖\n✅ প্রিমিয়াম ওয়াটারপ্রুফ ফেব্রিক – বৃষ্টি হলেও বই-খাতা থাকবে নিরাপদ\n✅ ক্লাস ৪ থেকে ৮ পর্যন্ত শিক্ষার্থীদের জন্য পারফেক্ট সাইজ\n✅ বড় ক্যাপাসিটির মাল্টি-কম্পার্টমেন্ট – বই, খাতা, লাঞ্চ বক্স ও প্রয়োজনীয় সবকিছু সুন্দরভাবে গুছিয়ে রাখা যায়\n✅ মজবুত ও স্মুথ হেভি-ডিউটি জিপার\n✅ আরামদায়ক প্যাডেড শোল্ডার স্ট্র্যাপ – দীর্ঘ সময় বহনেও কম চাপ\n✅ টেকসই কোয়ালিটি ও আকর্ষণীয় ডিজাইন\n✅ ২ বছরের ওয়ারেন্টি\n🎒 স্কুল, কোচিং কিংবা দৈনন্দিন ব্যবহারের জন্য আদর্শ একটি ব্যাকপ্যাক।",
    "soldCount": 690,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 31794,
    "name": "Premium Waterproof School Bag",
    "category": "bags",
    "categoryName": "Women's Designer Bags",
    "price": 1500,
    "origPrice": 2050,
    "wholesalePrice": 1050,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1785847431_L_2.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_3.jpg"
    ],
    "description": "Premium Waterproof School Bag\n🎒 প্রিমিয়াম ওয়াটারপ্রুফ স্কুল ব্যাকপ্যাক (ক্লাস ৪–৮)\nআপনার সন্তানের স্কুলজীবনকে করুন আরও সহজ, আরামদায়ক ও স্টাইলিশ! 💖\n✅ প্রিমিয়াম ওয়াটারপ্রুফ ফেব্রিক – বৃষ্টি হলেও বই-খাতা থাকবে নিরাপদ\n✅ ক্লাস ৪ থেকে ৮ পর্যন্ত শিক্ষার্থীদের জন্য পারফেক্ট সাইজ\n✅ বড় ক্যাপাসিটির মাল্টি-কম্পার্টমেন্ট – বই, খাতা, লাঞ্চ বক্স ও প্রয়োজনীয় সবকিছু সুন্দরভাবে গুছিয়ে রাখা যায়\n✅ মজবুত ও স্মুথ হেভি-ডিউটি জিপার\n✅ আরামদায়ক প্যাডেড শোল্ডার স্ট্র্যাপ – দীর্ঘ সময় বহনেও কম চাপ\n✅ টেকসই কোয়ালিটি ও আকর্ষণীয় ডিজাইন\n✅ ২ বছরের ওয়ারেন্টি\n🎒 স্কুল, কোচিং কিংবা দৈনন্দিন ব্যবহারের জন্য আদর্শ একটি ব্যাকপ্যাক।",
    "soldCount": 689,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 31793,
    "name": "Premium Waterproof School Bag",
    "category": "bags",
    "categoryName": "Women's Designer Bags",
    "price": 1500,
    "origPrice": 2050,
    "wholesalePrice": 1050,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1785847431_L_1.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1785847431_S_3.jpg"
    ],
    "description": "Premium Waterproof School Bag\n🎒 প্রিমিয়াম ওয়াটারপ্রুফ স্কুল ব্যাকপ্যাক (ক্লাস ৪–৮)\nআপনার সন্তানের স্কুলজীবনকে করুন আরও সহজ, আরামদায়ক ও স্টাইলিশ! 💖\n✅ প্রিমিয়াম ওয়াটারপ্রুফ ফেব্রিক – বৃষ্টি হলেও বই-খাতা থাকবে নিরাপদ\n✅ ক্লাস ৪ থেকে ৮ পর্যন্ত শিক্ষার্থীদের জন্য পারফেক্ট সাইজ\n✅ বড় ক্যাপাসিটির মাল্টি-কম্পার্টমেন্ট – বই, খাতা, লাঞ্চ বক্স ও প্রয়োজনীয় সবকিছু সুন্দরভাবে গুছিয়ে রাখা যায়\n✅ মজবুত ও স্মুথ হেভি-ডিউটি জিপার\n✅ আরামদায়ক প্যাডেড শোল্ডার স্ট্র্যাপ – দীর্ঘ সময় বহনেও কম চাপ\n✅ টেকসই কোয়ালিটি ও আকর্ষণীয় ডিজাইন\n✅ ২ বছরের ওয়ারেন্টি\n🎒 স্কুল, কোচিং কিংবা দৈনন্দিন ব্যবহারের জন্য আদর্শ একটি ব্যাকপ্যাক।",
    "soldCount": 688,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 35049,
    "name": "Stylish Solid Printed Cotton Hoodie",
    "category": "fashion",
    "categoryName": "Solid Hoodies & Winterwear",
    "price": 800,
    "origPrice": 1140,
    "wholesalePrice": 450,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1794490612_L_15.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_8.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_9.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_10.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_11.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_12.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_13.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_14.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_15.jpg"
    ],
    "description": "Stylish Solid Printed Cotton Hoodie\n✨ প্রিমিয়াম কোয়ালিটির স্টাইলিশ সলিড কালারের ডিটিএফ প্রিন্ট হুডি।\n❤️ আরামদায়ক কটন ফেব্রিক ও আকর্ষণীয় ডিজাইনে শীতের জন্য পারফেক্ট।\n📌 প্রোডাক্ট ডিটেইলসঃ\nফেব্রিক: ১০০% কটন।\nGSM: ৩০০+ GSM।\nডিজাইন: স্টাইলিশ ফ্রন্ট প্রিন্ট।\nহুড: ড্র-স্ট্রিংসহ অ্যাডজাস্টেবল হুড।\nপকেট: ফ্রন্ট ক্যাঙ্গারু পকেট।\nকমফোর্ট: নরম, আরামদায়ক ও টেকসই ফেব্রিক।\nউপযোগী: ক্যাজুয়াল ও উইন্টার আউটফিট।\nSize Measurement:\nM — Length 27\" | Chest 38\"\nL — Length 28\" | Chest 40\"\nXL — Length 29\" | Chest 42\"\nXXL — Length 30\" | Chest 44\"",
    "soldCount": 344,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 35048,
    "name": "Stylish Solid Printed Cotton Hoodie",
    "category": "fashion",
    "categoryName": "Solid Hoodies & Winterwear",
    "price": 800,
    "origPrice": 1140,
    "wholesalePrice": 450,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1794490612_L_14.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_8.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_9.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_10.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_11.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_12.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_13.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_14.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_15.jpg"
    ],
    "description": "Stylish Solid Printed Cotton Hoodie\n✨ প্রিমিয়াম কোয়ালিটির স্টাইলিশ সলিড কালারের ডিটিএফ প্রিন্ট হুডি।\n❤️ আরামদায়ক কটন ফেব্রিক ও আকর্ষণীয় ডিজাইনে শীতের জন্য পারফেক্ট।\n📌 প্রোডাক্ট ডিটেইলসঃ\nফেব্রিক: ১০০% কটন।\nGSM: ৩০০+ GSM।\nডিজাইন: স্টাইলিশ ফ্রন্ট প্রিন্ট।\nহুড: ড্র-স্ট্রিংসহ অ্যাডজাস্টেবল হুড।\nপকেট: ফ্রন্ট ক্যাঙ্গারু পকেট।\nকমফোর্ট: নরম, আরামদায়ক ও টেকসই ফেব্রিক।\nউপযোগী: ক্যাজুয়াল ও উইন্টার আউটফিট।\nSize Measurement:\nM — Length 27\" | Chest 38\"\nL — Length 28\" | Chest 40\"\nXL — Length 29\" | Chest 42\"\nXXL — Length 30\" | Chest 44\"",
    "soldCount": 343,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 35047,
    "name": "Stylish Solid Printed Cotton Hoodie",
    "category": "fashion",
    "categoryName": "Solid Hoodies & Winterwear",
    "price": 800,
    "origPrice": 1140,
    "wholesalePrice": 450,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1794490612_L_13.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_8.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_9.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_10.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_11.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_12.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_13.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_14.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_15.jpg"
    ],
    "description": "Stylish Solid Printed Cotton Hoodie\n✨ প্রিমিয়াম কোয়ালিটির স্টাইলিশ সলিড কালারের ডিটিএফ প্রিন্ট হুডি।\n❤️ আরামদায়ক কটন ফেব্রিক ও আকর্ষণীয় ডিজাইনে শীতের জন্য পারফেক্ট।\n📌 প্রোডাক্ট ডিটেইলসঃ\nফেব্রিক: ১০০% কটন।\nGSM: ৩০০+ GSM।\nডিজাইন: স্টাইলিশ ফ্রন্ট প্রিন্ট।\nহুড: ড্র-স্ট্রিংসহ অ্যাডজাস্টেবল হুড।\nপকেট: ফ্রন্ট ক্যাঙ্গারু পকেট।\nকমফোর্ট: নরম, আরামদায়ক ও টেকসই ফেব্রিক।\nউপযোগী: ক্যাজুয়াল ও উইন্টার আউটফিট।\nSize Measurement:\nM — Length 27\" | Chest 38\"\nL — Length 28\" | Chest 40\"\nXL — Length 29\" | Chest 42\"\nXXL — Length 30\" | Chest 44\"",
    "soldCount": 342,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 35046,
    "name": "Stylish Solid Printed Cotton Hoodie",
    "category": "fashion",
    "categoryName": "Solid Hoodies & Winterwear",
    "price": 800,
    "origPrice": 1140,
    "wholesalePrice": 450,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1794490612_L_12.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_8.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_9.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_10.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_11.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_12.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_13.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_14.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1794490612_S_15.jpg"
    ],
    "description": "Stylish Solid Printed Cotton Hoodie\n✨ প্রিমিয়াম কোয়ালিটির স্টাইলিশ সলিড কালারের ডিটিএফ প্রিন্ট হুডি।\n❤️ আরামদায়ক কটন ফেব্রিক ও আকর্ষণীয় ডিজাইনে শীতের জন্য পারফেক্ট।\n📌 প্রোডাক্ট ডিটেইলসঃ\nফেব্রিক: ১০০% কটন।\nGSM: ৩০০+ GSM।\nডিজাইন: স্টাইলিশ ফ্রন্ট প্রিন্ট।\nহুড: ড্র-স্ট্রিংসহ অ্যাডজাস্টেবল হুড।\nপকেট: ফ্রন্ট ক্যাঙ্গারু পকেট।\nকমফোর্ট: নরম, আরামদায়ক ও টেকসই ফেব্রিক।\nউপযোগী: ক্যাজুয়াল ও উইন্টার আউটফিট।\nSize Measurement:\nM — Length 27\" | Chest 38\"\nL — Length 28\" | Chest 40\"\nXL — Length 29\" | Chest 42\"\nXXL — Length 30\" | Chest 44\"",
    "soldCount": 341,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 33693,
    "name": "Stylish Cotton Varsity Jacket",
    "category": "fashion",
    "categoryName": "Varsity Jackets",
    "price": 800,
    "origPrice": 1140,
    "wholesalePrice": 450,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1791712594_L_8.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_8.jpg"
    ],
    "description": "Stylish Cotton Varsity Jacket\nপ্রিমিয়াম কোয়ালিটির কটন ফেব্রিকের স্টাইলিশ ভার্সিটি জ্যাকেট, যা আপনার লুকে আনবে ট্রেন্ডি ও স্পোর্টি ভাইব।\nআরামদায়ক ফেব্রিক ও আকর্ষণীয় ডিজাইনের এই জ্যাকেটটি ছেলে ও মেয়ে উভয়ের জন্য উপযুক্ত।\n📌 প্রোডাক্ট ডিটেইলসঃ\n🧥 প্রোডাক্ট টাইপ: ভার্সিটি জ্যাকেট।\n🧵 ফেব্রিক: ১০০% কটন, ওয়ান সাইড ব্রাশ।\n🎨 ডিজাইন: প্রিমিয়াম DTF প্রিন্ট।\n⭐ ফেব্রিক কোয়ালিটি: ৩০০± GSM।\n👕 উপযোগী: ছেলে ও মেয়ে উভয়ের জন্য।\n🛍️ অর্ডার করার আগে সাইজ মেজারমেন্ট দেখে নিন।\n📏 Available Sizes: M, L, XL\nM = Chest-40, Length-26\nL = Chest-42, Length-27\nXL= Chest-44,Length-28",
    "soldCount": 188,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 33692,
    "name": "Stylish Cotton Varsity Jacket",
    "category": "fashion",
    "categoryName": "Varsity Jackets",
    "price": 800,
    "origPrice": 1140,
    "wholesalePrice": 450,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1791712594_L_7.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_8.jpg"
    ],
    "description": "Stylish Cotton Varsity Jacket\nপ্রিমিয়াম কোয়ালিটির কটন ফেব্রিকের স্টাইলিশ ভার্সিটি জ্যাকেট, যা আপনার লুকে আনবে ট্রেন্ডি ও স্পোর্টি ভাইব।\nআরামদায়ক ফেব্রিক ও আকর্ষণীয় ডিজাইনের এই জ্যাকেটটি ছেলে ও মেয়ে উভয়ের জন্য উপযুক্ত।\n📌 প্রোডাক্ট ডিটেইলসঃ\n🧥 প্রোডাক্ট টাইপ: ভার্সিটি জ্যাকেট।\n🧵 ফেব্রিক: ১০০% কটন, ওয়ান সাইড ব্রাশ।\n🎨 ডিজাইন: প্রিমিয়াম DTF প্রিন্ট।\n⭐ ফেব্রিক কোয়ালিটি: ৩০০± GSM।\n👕 উপযোগী: ছেলে ও মেয়ে উভয়ের জন্য।\n🛍️ অর্ডার করার আগে সাইজ মেজারমেন্ট দেখে নিন।\n📏 Available Sizes: M, L, XL\nM = Chest-40, Length-26\nL = Chest-42, Length-27\nXL= Chest-44,Length-28",
    "soldCount": 187,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 33691,
    "name": "Stylish Cotton Varsity Jacket",
    "category": "fashion",
    "categoryName": "Varsity Jackets",
    "price": 800,
    "origPrice": 1140,
    "wholesalePrice": 450,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1791712594_L_6.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1791712594_S_8.jpg"
    ],
    "description": "Stylish Cotton Varsity Jacket\nপ্রিমিয়াম কোয়ালিটির কটন ফেব্রিকের স্টাইলিশ ভার্সিটি জ্যাকেট, যা আপনার লুকে আনবে ট্রেন্ডি ও স্পোর্টি ভাইব।\nআরামদায়ক ফেব্রিক ও আকর্ষণীয় ডিজাইনের এই জ্যাকেটটি ছেলে ও মেয়ে উভয়ের জন্য উপযুক্ত।\n📌 প্রোডাক্ট ডিটেইলসঃ\n🧥 প্রোডাক্ট টাইপ: ভার্সিটি জ্যাকেট।\n🧵 ফেব্রিক: ১০০% কটন, ওয়ান সাইড ব্রাশ।\n🎨 ডিজাইন: প্রিমিয়াম DTF প্রিন্ট।\n⭐ ফেব্রিক কোয়ালিটি: ৩০০± GSM।\n👕 উপযোগী: ছেলে ও মেয়ে উভয়ের জন্য।\n🛍️ অর্ডার করার আগে সাইজ মেজারমেন্ট দেখে নিন।\n📏 Available Sizes: M, L, XL\nM = Chest-40, Length-26\nL = Chest-42, Length-27\nXL= Chest-44,Length-28",
    "soldCount": 186,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 24622,
    "name": "Denim Jacket for Men",
    "category": "fashion",
    "categoryName": "Denim Jackets",
    "price": 1250,
    "origPrice": 1725,
    "wholesalePrice": 740,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1763015367_L_4.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_4.jpg"
    ],
    "description": "Denim Jacket for Men\nProduct details of New Stylis Premium Quality Danim Jacket\nColor: Same as the picture\nFabric: gabading\nPocket: one Jacket\n100% Export Quality.\nUnique design\nBest Production quality\nSaiz (Mezarment) M L XL\nM=Body-38, Lang=26 --Sleevs-23\nL=Body-40, Lang=27--Sleevs-24\nXL=Body-42, Lang=28-Sleevs-25",
    "soldCount": 117,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 24621,
    "name": "Denim Jacket for Men",
    "category": "fashion",
    "categoryName": "Denim Jackets",
    "price": 1250,
    "origPrice": 1725,
    "wholesalePrice": 740,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1763015367_L_3.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_4.jpg"
    ],
    "description": "Denim Jacket for Men\nProduct details of New Stylis Premium Quality Danim Jacket\nColor: Same as the picture\nFabric: gabading\nPocket: one Jacket\n100% Export Quality.\nUnique design\nBest Production quality\nSaiz (Mezarment) M L XL\nM=Body-38, Lang=26 --Sleevs-23\nL=Body-40, Lang=27--Sleevs-24\nXL=Body-42, Lang=28-Sleevs-25",
    "soldCount": 116,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 24620,
    "name": "Denim Jacket for Men",
    "category": "fashion",
    "categoryName": "Denim Jackets",
    "price": 1250,
    "origPrice": 1725,
    "wholesalePrice": 740,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1763015367_L_2.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1763015367_S_4.jpg"
    ],
    "description": "Denim Jacket for Men\nProduct details of New Stylis Premium Quality Danim Jacket\nColor: Same as the picture\nFabric: gabading\nPocket: one Jacket\n100% Export Quality.\nUnique design\nBest Production quality\nSaiz (Mezarment) M L XL\nM=Body-38, Lang=26 --Sleevs-23\nL=Body-40, Lang=27--Sleevs-24\nXL=Body-42, Lang=28-Sleevs-25",
    "soldCount": 115,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 33843,
    "name": "Stylish Polo Shirt",
    "category": "fashion",
    "categoryName": "Polo Shirts",
    "price": 550,
    "origPrice": 815,
    "wholesalePrice": 280,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1792472266_L_5.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_5.jpg"
    ],
    "description": "Stylish Polo Shirt\nFabric: PK Cotton\nBody -Skin Print\nGsm:210+(-+10)\nExport Quality Seweing\nSize: M,L,XL\nSize Description :\nM - ( Chest-38, Long-28)\nL - ( Chest-40, Long-29 )\nXL - ( chest-42, Long-30 )",
    "soldCount": 338,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 33842,
    "name": "Stylish Polo Shirt",
    "category": "fashion",
    "categoryName": "Polo Shirts",
    "price": 550,
    "origPrice": 815,
    "wholesalePrice": 280,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1792472266_L_4.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_5.jpg"
    ],
    "description": "Stylish Polo Shirt\nFabric: PK Cotton\nBody -Skin Print\nGsm:210+(-+10)\nExport Quality Seweing\nSize: M,L,XL\nSize Description :\nM - ( Chest-38, Long-28)\nL - ( Chest-40, Long-29 )\nXL - ( chest-42, Long-30 )",
    "soldCount": 337,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 33841,
    "name": "Stylish Polo Shirt",
    "category": "fashion",
    "categoryName": "Polo Shirts",
    "price": 550,
    "origPrice": 815,
    "wholesalePrice": 280,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1792472266_L_3.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1792472266_S_5.jpg"
    ],
    "description": "Stylish Polo Shirt\nFabric: PK Cotton\nBody -Skin Print\nGsm:210+(-+10)\nExport Quality Seweing\nSize: M,L,XL\nSize Description :\nM - ( Chest-38, Long-28)\nL - ( Chest-40, Long-29 )\nXL - ( chest-42, Long-30 )",
    "soldCount": 336,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 32354,
    "name": "Premium Cotton Drop Shoulder Tshirt",
    "category": "fashion",
    "categoryName": "Drop-Shoulder Streetwear",
    "price": 650,
    "origPrice": 945,
    "wholesalePrice": 330,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787557183_L_20.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787557182_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557182_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_8.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_9.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_10.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_11.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_12.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_13.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_14.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_15.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_16.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_17.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_18.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_19.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_20.jpg"
    ],
    "description": "Premium Cotton Drop Shoulder Tshirt\nDROP SHOULDER T-SHIRT\nFABRIC 100% COTTON\nPREMIUM QUALITY FABRIC\nPrint Type: DTF\nGSM: 200–230\nSIZE GUIDE (IN INCHES)\nM — Chest 42\" Length-27\"\nL — Chest 44\" Length-28\"\nXL— Chest 46\" Length-29\"\nXXL-Chest 48\" Length-30\"",
    "soldCount": 649,
    "badge": "SuperDeal",
    "inStock": true
  },
  {
    "id": 32353,
    "name": "Premium Cotton Drop Shoulder Tshirt",
    "category": "fashion",
    "categoryName": "Drop-Shoulder Streetwear",
    "price": 650,
    "origPrice": 945,
    "wholesalePrice": 330,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787557183_L_19.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787557182_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557182_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_8.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_9.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_10.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_11.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_12.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_13.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_14.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_15.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_16.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_17.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_18.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_19.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_20.jpg"
    ],
    "description": "Premium Cotton Drop Shoulder Tshirt\nDROP SHOULDER T-SHIRT\nFABRIC 100% COTTON\nPREMIUM QUALITY FABRIC\nPrint Type: DTF\nGSM: 200–230\nSIZE GUIDE (IN INCHES)\nM — Chest 42\" Length-27\"\nL — Chest 44\" Length-28\"\nXL— Chest 46\" Length-29\"\nXXL-Chest 48\" Length-30\"",
    "soldCount": 648,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 32352,
    "name": "Premium Cotton Drop Shoulder Tshirt",
    "category": "fashion",
    "categoryName": "Drop-Shoulder Streetwear",
    "price": 650,
    "origPrice": 945,
    "wholesalePrice": 330,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1787557183_L_18.jpeg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1787557182_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557182_S_2.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_3.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_4.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_5.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_6.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_7.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_8.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_9.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_10.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_11.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_12.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_13.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_14.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_15.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_16.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_17.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_18.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_19.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1787557183_S_20.jpg"
    ],
    "description": "Premium Cotton Drop Shoulder Tshirt\nDROP SHOULDER T-SHIRT\nFABRIC 100% COTTON\nPREMIUM QUALITY FABRIC\nPrint Type: DTF\nGSM: 200–230\nSIZE GUIDE (IN INCHES)\nM — Chest 42\" Length-27\"\nL — Chest 44\" Length-28\"\nXL— Chest 46\" Length-29\"\nXXL-Chest 48\" Length-30\"",
    "soldCount": 647,
    "badge": "Choice",
    "inStock": true
  },
  {
    "id": 17767,
    "name": "Jelly Candle (1 Piece)",
    "category": "home",
    "categoryName": "Home & Living",
    "price": 550,
    "origPrice": 815,
    "wholesalePrice": 430,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1739118583_L_2.jpg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1739118583_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1739118583_S_2.jpg"
    ],
    "description": "Jelly Candle (1 Piece)\nExquisite Conch Shaped Aromatherapy\nCandle: An Enchanting Blend Of\nScent And for Candle Holder\nDecoracion Para El Hogar",
    "soldCount": 462,
    "badge": "Top Seller",
    "inStock": true
  },
  {
    "id": 17766,
    "name": "Jelly Candle (1 Piece)",
    "category": "home",
    "categoryName": "Home & Living",
    "price": 550,
    "origPrice": 815,
    "wholesalePrice": 430,
    "currency": "BDT",
    "currencySymbol": "৳",
    "image": "https://shopbasebd.com/public/uploads/shop/products/1739118583_L_1.jpg",
    "thumbnails": [
      "https://shopbasebd.com/public/uploads/shop/products/1739118583_S_1.jpg",
      "https://shopbasebd.com/public/uploads/shop/products/1739118583_S_2.jpg"
    ],
    "description": "Jelly Candle (1 Piece)\nExquisite Conch Shaped Aromatherapy\nCandle: An Enchanting Blend Of\nScent And for Candle Holder\nDecoracion Para El Hogar",
    "soldCount": 461,
    "badge": "Choice",
    "inStock": true
  }
];
  window.TOPDUOO_PRODUCTS = PRODUCTS;

  // Cart State (stored in localStorage)
  let cartItems = [];
  try {
    const raw = localStorage.getItem('topduoo_cart');
    if (raw) cartItems = JSON.parse(raw);
  } catch (e) {
    cartItems = [];
  }

  // Orders State (stored in localStorage - zero pre-recorded data)
  let ordersList = [];
  try {
    const rawOrders = localStorage.getItem('topduoo_orders');
    if (rawOrders) ordersList = JSON.parse(rawOrders);
  } catch (e) {
    ordersList = [];
  }

  // 3-Month Auto-Purge Policy for Dismissed Orders (90 days = 7,776,000,000 ms)
  const RETENTION_3_MONTHS_MS = 90 * 24 * 60 * 60 * 1000;
  function purgeExpiredArchivedOrders() {
    const now = Date.now();
    const prevCount = ordersList.length;
    ordersList = ordersList.filter(order => {
      if (order.status === 'Archived' && order.archivedAt) {
        const age = now - order.archivedAt;
        if (age >= RETENTION_3_MONTHS_MS) {
          return false; // automatically deleted after 3 months
        }
      }
      return true;
    });
    if (ordersList.length !== prevCount) {
      saveOrders();
    }
  }
  purgeExpiredArchivedOrders();
  setInterval(purgeExpiredArchivedOrders, 30000);

  // Active promo coupon code (persisted in localStorage)
  let appliedCoupon = null;
  try {
    const savedCoupon = localStorage.getItem('topduoo_applied_coupon');
    if (savedCoupon) appliedCoupon = savedCoupon;
  } catch(e) {}

  // WebAssembly Instance Storage
  let wasmInstance = null;

  async function loadWasm() {
    try {
      const response = await fetch('assets/wasm/topduoo_core.wasm');
      if (response.ok) {
        const bytes = await response.arrayBuffer();
        const results = await WebAssembly.instantiate(bytes, { env: { abort: () => console.log('WASM abort') } });
        wasmInstance = results.instance.exports;
        if (wasmInstance.init_core) wasmInstance.init_core();
        return;
      }
    } catch (e) {
      // Fetch failed, use embedded base64 fallback
    }

    try {
      const binaryString = atob(WASM_B64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const results = await WebAssembly.instantiate(bytes.buffer, { env: { abort: () => console.log('WASM abort') } });
      wasmInstance = results.instance.exports;
      if (wasmInstance.init_core) wasmInstance.init_core();
    } catch (err) {
      console.warn('WASM initialization fallback to JS engine');
    }
  }

  function saveCart() {
    try {
      localStorage.setItem('topduoo_cart', JSON.stringify(cartItems));
    } catch (e) {}
    updateCartUI();
  }

  function saveOrders() {
    try {
      localStorage.setItem('topduoo_orders', JSON.stringify(ordersList));
    } catch (e) {}
  }

  function findProduct(id) {
    const numId = parseInt(id, 10);
    return PRODUCTS.find(p => p.id === numId) || PRODUCTS[0];
  }

  // ---------------- CART OPERATIONS ----------------
  function addToCart(productId, qty) {
    qty = parseInt(qty, 10) || 1;
    const prod = findProduct(productId);
    if (!prod) return;

    const existing = cartItems.find(item => item.id === prod.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cartItems.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        origPrice: prod.origPrice,
        image: prod.image,
        category: prod.categoryName || prod.category,
        qty: qty
      });
    }

    saveCart();
    showToast(`Added "${prod.name.slice(0, 28)}..." to cart`);
  }

  function buyNow(productId, qty) {
    addToCart(productId, qty);
    openCart();
    showCartStep(2);
  }

  function removeFromCart(productId) {
    const numId = parseInt(productId, 10);
    cartItems = cartItems.filter(item => item.id !== numId);
    saveCart();
    showToast('Item removed from cart');
  }

  function updateItemQty(productId, newQty) {
    const numId = parseInt(productId, 10);
    newQty = parseInt(newQty, 10);
    const item = cartItems.find(i => i.id === numId);
    if (item) {
      if (newQty <= 0) {
        removeFromCart(numId);
      } else {
        item.qty = newQty;
        saveCart();
      }
    }
  }

  function clearCart() {
    cartItems = [];
    saveCart();
  }

  function getCartTotals() {
    let subtotal = 0;
    let totalQty = 0;
    cartItems.forEach(item => {
      subtotal += item.price * item.qty;
      totalQty += item.qty;
    });

    // Discount: Any entered coupon code provides 10% deduction
    let discount = 0;
    if (appliedCoupon) {
      discount = Math.round(subtotal * 0.10);
    }

    // Shipping: Free on orders over ৳1,500, else ৳60
    const shipping = subtotal >= 1500 || subtotal === 0 ? 0 : 60;
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      totalQty,
      discount,
      shipping,
      total
    };
  }

  function updateCartUI() {
    const totals = getCartTotals();

    // Update Header Badges
    document.querySelectorAll('.td-cart-badge').forEach(badge => {
      badge.textContent = totals.totalQty;
      badge.style.display = totals.totalQty > 0 ? 'flex' : 'none';
    });

    // Update Header Price Summary
    document.querySelectorAll('#td-header-cart-price').forEach(el => {
      el.textContent = `৳${totals.total.toLocaleString()}`;
    });

    // Update Drawer Elements
    const listEl = document.getElementById('td-cart-items-list');
    const subtotalEl = document.getElementById('td-cart-subtotal');
    const shippingEl = document.getElementById('td-cart-shipping');
    const grandTotalEl = document.getElementById('td-cart-grand-total');

    if (subtotalEl) subtotalEl.textContent = `৳${totals.subtotal.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? 'FREE' : `৳${totals.shipping}`;
    
    // Update Coupon Discount Row in Cart
    const discountRow = document.getElementById('td-cart-discount-row');
    const discountEl = document.getElementById('td-cart-discount');
    const couponInput = document.getElementById('td-coupon-input');
    const couponPill = document.getElementById('td-applied-coupon-pill');
    const couponNameEl = document.getElementById('td-applied-coupon-name');

    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.classList.remove('hidden');
        discountEl.textContent = `-৳${totals.discount.toLocaleString()}`;
      } else {
        discountRow.classList.add('hidden');
      }
    }

    if (couponPill) {
      if (appliedCoupon) {
        couponPill.classList.remove('hidden');
        if (couponNameEl) couponNameEl.textContent = appliedCoupon;
        if (couponInput && !couponInput.value) couponInput.value = appliedCoupon;
      } else {
        couponPill.classList.add('hidden');
      }
    }

    if (grandTotalEl) grandTotalEl.textContent = `৳${totals.total.toLocaleString()}`;

    if (!listEl) return;

    if (cartItems.length === 0) {
      listEl.innerHTML = `
        <div class="py-12 text-center text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <div class="text-sm font-bold text-gray-700 mb-1">Your cart is currently empty</div>
          <p class="text-xs text-gray-500 mb-4">Discover verified items from our collection</p>
          <a href="catalog.html" onclick="window.TopDuoo.closeCart()" class="inline-block bg-td-red text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-td-red-hover transition shadow">
            Start Shopping
          </a>
        </div>
      `;
      const procBtn = document.getElementById('td-cart-proceed-btn');
      if (procBtn) procBtn.disabled = true;
      return;
    }

    const procBtn = document.getElementById('td-cart-proceed-btn');
    if (procBtn) procBtn.disabled = false;

    listEl.innerHTML = cartItems.map(item => `
      <div class="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 transition">
        <a href="single-product.html?id=${item.id}" class="w-16 h-16 bg-gray-50 rounded p-1 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain">
        </a>
        <div class="flex-1 min-w-0">
          <a href="single-product.html?id=${item.id}" class="text-xs font-bold text-gray-800 line-clamp-1 hover:text-td-red transition" title="${item.name}">
            ${item.name}
          </a>
          <div class="text-[11px] text-gray-400 mb-1.5">${item.category || ''}</div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-td-red">৳${item.price.toLocaleString()}</span>
            <div class="flex items-center border border-gray-200 rounded text-xs bg-gray-50">
              <button onclick="window.TopDuoo.updateQty(${item.id}, ${item.qty - 1})" class="px-2 py-0.5 hover:bg-gray-200 font-bold">-</button>
              <span class="px-2 font-bold text-gray-800">${item.qty}</span>
              <button onclick="window.TopDuoo.updateQty(${item.id}, ${item.qty + 1})" class="px-2 py-0.5 hover:bg-gray-200 font-bold">+</button>
            </div>
          </div>
        </div>
        <button onclick="window.TopDuoo.remove(${item.id})" title="Remove item" class="text-gray-400 hover:text-red-500 p-1 rounded transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    `).join('');
  }

  // ---------------- CART DRAWER MODAL NAVIGATION ----------------
  function openCart() {
    const overlay = document.getElementById('td-cart-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      showCartStep(1);
    }
  }

  function closeCart() {
    const overlay = document.getElementById('td-cart-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function showCartStep(stepNumber) {
    const step1 = document.getElementById('td-cart-step-1');
    const step2 = document.getElementById('td-cart-step-2');
    const step3 = document.getElementById('td-cart-step-3');

    if (step1) step1.classList.toggle('hidden', stepNumber !== 1);
    if (step2) step2.classList.toggle('hidden', stepNumber !== 2);
    if (step3) step3.classList.toggle('hidden', stepNumber !== 3);
  }

  // ---------------- ORDER PLACEMENT ----------------
  async function handleOrderSubmit(e) {
    if (e) e.preventDefault();
    if (cartItems.length === 0) {
      showToast('Cart is empty.');
      return;
    }

    const name = document.getElementById('order-cust-name').value.trim();
    const mobile = document.getElementById('order-cust-mobile').value.trim();
    const email = document.getElementById('order-cust-email').value.trim();
    const address = document.getElementById('order-cust-address').value.trim();

    if (!name || !mobile || !address) {
      alert('Please fill in Name, Mobile Phone Number, and Delivery Address.');
      return;
    }

    const totals = getCartTotals();
    const orderId = `TD-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 16).replace('T', ' ');

    const newOrder = {
      orderId: orderId,
      date: dateStr,
      timestamp: Date.now(),
      name: name,
      mobile: mobile,
      email: email || "N/A",
      address: address,
      items: cartItems.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price, image: i.image })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: `৳${totals.total.toLocaleString()}`,
      totalAmount: totals.total,
      status: "Pending",
      archivedAt: null
    };

    try {
      await requestJson('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch (error) {
      showToast(`Order could not be placed: ${error.message}`);
      return;
    }

    ordersList.unshift(newOrder);
    saveOrders();
    clearCart();

    // Fill Step 3 elements
    const confId = document.getElementById('conf-order-id');
    const confName = document.getElementById('conf-cust-name');
    const confMob = document.getElementById('conf-cust-mobile');
    const confAddr = document.getElementById('conf-cust-address');
    const confTotal = document.getElementById('conf-order-total');

    if (confId) confId.textContent = orderId;
    if (confName) confName.textContent = name;
    if (confMob) confMob.textContent = mobile;
    if (confAddr) confAddr.textContent = address;
    if (confTotal) confTotal.textContent = `৳${totals.total.toLocaleString()}`;

    showCartStep(3);
    showToast(`Order Placed: #${orderId}`);

    // If admin console is open in background, update it
    renderAllAdminViews();
  }

  // ---------------- ORDER WORKFLOW: FULFILL, DISMISS, RESTORE, DELETE ----------------
  async function updateOrder(orderId, action) {
    const auth = getStoredAuth();
    if (!auth?.apiToken) { showToast('Administrator sign-in is required.'); return; }
    try {
      const result = await requestJson(`/api/orders/${encodeURIComponent(orderId)}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${auth.apiToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      ordersList = ordersList.filter(order => order.orderId !== orderId);
      if (result.order) ordersList.unshift(result.order);
      saveOrders();
      renderAllAdminViews();
    } catch (error) { showToast(error.message); }
  }

  async function processOrderDone(orderId) {
    await updateOrder(orderId, 'done');
    const order = ordersList.find(o => o.orderId === orderId);
    if (order) showToast(`Order ${orderId} marked as Process Done!`);
  }

  async function dismissOrder(orderId) {
    await updateOrder(orderId, 'archive');
    const order = ordersList.find(o => o.orderId === orderId);
    if (order) showToast(`Order ${orderId} moved to Archive`);
  }

  async function restoreOrder(orderId) {
    await updateOrder(orderId, 'restore');
  }

  async function deleteOrderPermanently(orderId) {
    if (!confirm(`Permanently delete order ${orderId}? This cannot be undone.`)) return;
    const auth = getStoredAuth();
    if (!auth?.apiToken) { showToast('Administrator sign-in is required.'); return; }
    try {
      await requestJson(`/api/orders/${encodeURIComponent(orderId)}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${auth.apiToken}` }
      });
      ordersList = ordersList.filter(order => order.orderId !== orderId);
      saveOrders();
      renderAllAdminViews();
    } catch (error) { showToast(error.message); }
  }

  async function syncOrdersFromServer() {
    const auth = getStoredAuth();
    if (!auth?.apiToken) return;
    try {
      const result = await requestJson('/api/orders', { headers: { Authorization: `Bearer ${auth.apiToken}` } });
      ordersList = result.orders || [];
      saveOrders();
      renderAllAdminViews();
    } catch (error) {
      const tbody = document.getElementById('admin-live-orders-tbody');
      if (tbody) tbody.innerHTML = `<tr><td colspan="8" class="py-8 text-center text-red-600">Could not load shared orders: ${String(error.message).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</td></tr>`;
    }
  }

  /* legacy local-only workflow removed */
  function legacyProcessOrderDone(orderId) {
    const order = ordersList.find(o => o.orderId === orderId);
    if (order) {
      order.status = "Done";
      saveOrders();
      renderAllAdminViews();
      showToast(`Order ${orderId} marked as Process Done!`);
    }
  }

  function legacyDismissOrder(orderId) {
    const order = ordersList.find(o => o.orderId === orderId);
    if (order) {
      order.status = "Archived";
      order.archivedAt = Date.now();
      saveOrders();
      renderAllAdminViews();
      showToast(`Order ${orderId} moved to Archive (Auto-deletes in 3 months)`);
    }
  }

  function legacyRestoreOrder(orderId) {
    const order = ordersList.find(o => o.orderId === orderId);
    if (order) {
      order.status = "Pending";
      order.archivedAt = null;
      saveOrders();
      renderAllAdminViews();
      showToast(`Order ${orderId} restored to Live Orders`);
    }
  }

  function legacyDeleteOrderPermanently(orderId) {
    ordersList = ordersList.filter(o => o.orderId !== orderId);
    saveOrders();
    renderAllAdminViews();
    showToast(`Order ${orderId} permanently deleted`);
  }

  // ---------------- CUSTOMER DETAILS & DIRECTORY CALCULATION ----------------
  function getCustomerDirectory() {
    const map = {};
    ordersList.forEach(order => {
      const key = (order.mobile || order.email || order.name || '').toLowerCase().trim();
      if (!key) return;
      if (!map[key]) {
        map[key] = {
          name: order.name,
          mobile: order.mobile,
          email: order.email || "N/A",
          address: order.address,
          ordersCount: 0,
          totalSpent: 0,
          lastOrderDate: order.date,
          orders: []
        };
      }
      map[key].ordersCount += 1;
      const amount = typeof order.totalAmount === 'number'
        ? order.totalAmount
        : (parseInt(String(order.total).replace(/[^0-9]/g, ''), 10) || 0);
      map[key].totalSpent += amount;
      map[key].orders.push(order);
      map[key].lastOrderDate = order.date;
      map[key].address = order.address;
    });
    return Object.values(map);
  }

  // ---------------- MONTHLY SELL & REVENUE ANALYTICS ----------------
  function getMonthlySalesAnalytics() {
    const months = {};
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    ordersList.forEach(order => {
      let dateObj = null;
      if (order.timestamp) {
        dateObj = new Date(order.timestamp);
      } else if (order.date) {
        dateObj = new Date(order.date.replace(' ', 'T'));
      }
      if (!dateObj || isNaN(dateObj.getTime())) {
        dateObj = new Date();
      }

      const year = dateObj.getFullYear();
      const monthIndex = dateObj.getMonth();
      const monthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
      const monthLabel = `${monthNames[monthIndex]} ${year}`;

      if (!months[monthKey]) {
        months[monthKey] = {
          key: monthKey,
          label: monthLabel,
          year: year,
          monthIndex: monthIndex,
          ordersCount: 0,
          itemsCount: 0,
          revenue: 0
        };
      }

      months[monthKey].ordersCount += 1;
      const amount = typeof order.totalAmount === 'number'
        ? order.totalAmount
        : (parseInt(String(order.total).replace(/[^0-9]/g, ''), 10) || 0);
      months[monthKey].revenue += amount;
      if (Array.isArray(order.items)) {
        order.items.forEach(it => {
          months[monthKey].itemsCount += (it.qty || 1);
        });
      }
    });

    return Object.values(months).sort((a, b) => b.key.localeCompare(a.key));
  }

  // ---------------- VIEW CUSTOMER ORDERS DRILLDOWN ----------------
  function viewCustomerOrders(custKey) {
    const directory = getCustomerDirectory();
    const cust = directory.find(c => (c.mobile || c.email || c.name || '').toLowerCase().trim() === custKey.toLowerCase().trim());
    if (!cust) return;

    const modal = document.getElementById('customer-orders-modal');
    const title = document.getElementById('cust-modal-title');
    const subtitle = document.getElementById('cust-modal-subtitle');
    const list = document.getElementById('cust-modal-orders-list');
    if (!modal || !list) return;

    if (title) title.textContent = `Customer: ${cust.name}`;
    if (subtitle) subtitle.textContent = `Mobile: ${cust.mobile} | Address: ${cust.address} | Total Spent: ৳${cust.totalSpent.toLocaleString()}`;

    list.innerHTML = cust.orders.map(o => `
      <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div class="flex items-center justify-between mb-1.5 font-bold">
          <span class="text-gray-900 font-mono">${o.orderId}</span>
          <span class="text-td-red font-black">${o.total}</span>
        </div>
        <div class="text-[11px] text-gray-500 mb-2">Placed: ${o.date} &bull; Status: <span class="font-bold ${o.status === 'Done' ? 'text-green-600' : (o.status === 'Archived' ? 'text-amber-600' : 'text-blue-600')}">${o.status}</span></div>
        <div class="text-[11px] text-gray-700 space-y-0.5 border-t border-gray-200 pt-1.5">
          ${o.items.map(it => `<div>&bull; ${it.qty}x ${it.name} (৳${(it.price || 0).toLocaleString()})</div>`).join('')}
        </div>
      </div>
    `).join('');

    modal.classList.remove('hidden');
  }

  // ---------------- UNIFIED ADMIN & DASHBOARD RENDERING ----------------
  function renderAllAdminViews() {
    purgeExpiredArchivedOrders();

    const liveOrders = ordersList.filter(o => o.status !== 'Archived');
    const archivedOrders = ordersList.filter(o => o.status === 'Archived');
    const customerList = getCustomerDirectory();
    const monthlyList = getMonthlySalesAnalytics();

    // 1. KPI Counts
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const currentMonthData = monthlyList.find(m => m.key === currentMonthKey) || { revenue: 0, ordersCount: 0 };
    const allTimeRevenue = liveOrders.reduce((sum, o) => {
      const amt = typeof o.totalAmount === 'number' ? o.totalAmount : (parseInt(String(o.total).replace(/[^0-9]/g, ''), 10) || 0);
      return sum + amt;
    }, 0);
    const pendingCount = liveOrders.filter(o => o.status === 'Pending').length;
    const doneCount = liveOrders.filter(o => o.status === 'Done').length;

    // Update KPI Elements in admin.html
    const kpiMonthly = document.getElementById('kpi-monthly-sell');
    const kpiMonthlySub = document.getElementById('kpi-monthly-sell-sub');
    const kpiAllRevenue = document.getElementById('kpi-total-revenue');
    const kpiAllOrders = document.getElementById('kpi-total-orders-count');
    const kpiPending = document.getElementById('kpi-pending-orders');
    const kpiCust = document.getElementById('kpi-total-customers');
    const kpiArchived = document.getElementById('kpi-archived-orders');

    if (kpiMonthly) kpiMonthly.textContent = `৳${currentMonthData.revenue.toLocaleString()}`;
    if (kpiMonthlySub) kpiMonthlySub.textContent = `${currentMonthData.ordersCount} orders this month`;
    if (kpiAllRevenue) kpiAllRevenue.textContent = `৳${allTimeRevenue.toLocaleString()}`;
    if (kpiAllOrders) kpiAllOrders.textContent = `${liveOrders.length} active orders`;
    if (kpiPending) kpiPending.textContent = pendingCount;
    if (kpiCust) kpiCust.textContent = customerList.length;
    if (kpiArchived) kpiArchived.textContent = archivedOrders.length;

    // Update Tab Badges in admin.html
    const tabBadgeOrders = document.getElementById('tab-badge-orders');
    const tabBadgeCust = document.getElementById('tab-badge-customers');
    const tabBadgeArch = document.getElementById('tab-badge-archive');
    if (tabBadgeOrders) tabBadgeOrders.textContent = liveOrders.length;
    if (tabBadgeCust) tabBadgeCust.textContent = customerList.length;
    if (tabBadgeArch) tabBadgeArch.textContent = archivedOrders.length;

    // Update Legacy Modal KPI elements if present
    const legacyTotalEl = document.getElementById('admin-total-orders');
    const legacyPendingEl = document.getElementById('admin-pending-orders');
    const legacyDoneEl = document.getElementById('admin-done-orders');
    if (legacyTotalEl) legacyTotalEl.textContent = liveOrders.length;
    if (legacyPendingEl) legacyPendingEl.textContent = pendingCount;
    if (legacyDoneEl) legacyDoneEl.textContent = doneCount;

    // 2. Render Live Orders Table
    renderLiveOrdersTable(liveOrders);

    // 3. Render Customer Details Table
    renderCustomerDirectoryTable(customerList);

    // 4. Render Monthly Sell Table
    renderMonthlySellTable(monthlyList, currentMonthData, allTimeRevenue, customerList.length);

    // 5. Render Archived Orders Table (with 3-Month Countdown)
    renderArchivedOrdersTable(archivedOrders);
  }

  function renderLiveOrdersTable(liveOrders) {
    const tableBodies = [
      document.getElementById('admin-live-orders-tbody'),
      document.getElementById('admin-orders-tbody')
    ].filter(Boolean);

    if (tableBodies.length === 0) return;

    // Filter by search / status if inputs present
    const searchVal = (document.getElementById('orders-search-input')?.value || '').toLowerCase().trim();
    const statusVal = document.getElementById('orders-status-filter')?.value || 'all';

    let filtered = liveOrders;
    if (searchVal) {
      filtered = filtered.filter(o => 
        (o.orderId && o.orderId.toLowerCase().includes(searchVal)) ||
        (o.name && o.name.toLowerCase().includes(searchVal)) ||
        (o.mobile && o.mobile.toLowerCase().includes(searchVal)) ||
        (o.address && o.address.toLowerCase().includes(searchVal))
      );
    }
    if (statusVal !== 'all') {
      filtered = filtered.filter(o => o.status === statusVal);
    }

    const html = filtered.length === 0
      ? `<tr><td colspan="8" class="py-8 text-center text-gray-400">No active customer orders placed yet. As customers check out, real orders will appear here.</td></tr>`
      : filtered.map(order => {
          const isDone = order.status === 'Done';
          const itemsSummary = order.items.map(i => `${i.qty}x ${i.name}`).join('<br>');
          return `
            <tr class="border-b border-gray-100 hover:bg-gray-50 text-xs">
              <td class="py-3 px-3 font-mono font-bold text-gray-900">${order.orderId}<br><span class="text-gray-400 font-normal">${order.date}</span></td>
              <td class="py-3 px-3 font-semibold text-gray-800">${order.name}</td>
              <td class="py-3 px-3 font-mono">${order.mobile}<br><span class="text-gray-400">${order.email}</span></td>
              <td class="py-3 px-3 text-gray-600 max-w-xs truncate" title="${order.address}">${order.address}</td>
              <td class="py-3 px-3 text-gray-700 leading-snug">${itemsSummary}</td>
              <td class="py-3 px-3 font-bold text-td-red text-sm">${order.total}</td>
              <td class="py-3 px-3 text-center">
                ${isDone 
                  ? `<span class="inline-block px-2.5 py-1 rounded bg-green-100 text-green-700 font-bold text-[11px]">Processed Done</span>`
                  : `<span class="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-700 font-bold text-[11px]">Pending</span>`
                }
              </td>
              <td class="py-3 px-3 text-center whitespace-nowrap">
                ${!isDone 
                  ? `<button onclick="window.TopDuoo.processDone('${order.orderId}')" class="bg-td-green hover:bg-td-green-hover text-white px-2.5 py-1 rounded font-bold text-xs shadow-sm transition mr-1.5">Process Done</button>`
                  : ''
                }
                <button onclick="window.TopDuoo.dismiss('${order.orderId}')" class="border border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white px-2.5 py-1 rounded font-bold text-xs transition" title="Dismiss to Archive (Auto-deletes in 3 months)">
                  Dismiss
                </button>
              </td>
            </tr>
          `;
        }).join('');

    tableBodies.forEach(tbody => { tbody.innerHTML = html; });
  }

  function renderCustomerDirectoryTable(customerList) {
    const tbody = document.getElementById('admin-customers-tbody');
    if (!tbody) return;

    const searchVal = (document.getElementById('customers-search-input')?.value || '').toLowerCase().trim();
    let filtered = customerList;
    if (searchVal) {
      filtered = filtered.filter(c =>
        (c.name && c.name.toLowerCase().includes(searchVal)) ||
        (c.mobile && c.mobile.toLowerCase().includes(searchVal)) ||
        (c.email && c.email.toLowerCase().includes(searchVal)) ||
        (c.address && c.address.toLowerCase().includes(searchVal))
      );
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="py-8 text-center text-gray-400">No customer records found yet. Real customer details populate automatically when orders are placed.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(c => {
      const initial = (c.name || 'C').charAt(0).toUpperCase();
      const escapedKey = (c.mobile || c.email || c.name || '').replace(/'/g, "\\'");
      return `
        <tr class="border-b border-gray-100 hover:bg-gray-50 text-xs">
          <td class="py-3 px-3 font-semibold text-gray-900 flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-red-100 text-td-red font-black flex items-center justify-center text-xs flex-shrink-0">${initial}</span>
            <span>${c.name}</span>
          </td>
          <td class="py-3 px-3 font-mono text-gray-800">${c.mobile}</td>
          <td class="py-3 px-3 text-gray-600">${c.email}</td>
          <td class="py-3 px-3 text-gray-700 max-w-xs truncate" title="${c.address}">${c.address}</td>
          <td class="py-3 px-3 text-center font-bold text-gray-900">${c.ordersCount}</td>
          <td class="py-3 px-3 font-bold text-td-red text-sm">৳${c.totalSpent.toLocaleString()}</td>
          <td class="py-3 px-3 text-gray-500">${c.lastOrderDate}</td>
          <td class="py-3 px-3 text-center">
            <button onclick="window.TopDuoo.viewCustomerOrders('${escapedKey}')" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-2.5 py-1 rounded font-bold text-xs transition">
              View (${c.ordersCount})
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderMonthlySellTable(monthlyList, currentMonthData, allTimeRevenue, totalBuyers) {
    const tbody = document.getElementById('admin-monthly-sell-tbody');
    const sumCurRev = document.getElementById('monthly-summary-cur-rev');
    const sumCurOrders = document.getElementById('monthly-summary-cur-orders');
    const sumBuyers = document.getElementById('monthly-summary-buyers');
    const sumAllRev = document.getElementById('monthly-summary-all-rev');

    if (sumCurRev) sumCurRev.textContent = `৳${currentMonthData.revenue.toLocaleString()}`;
    if (sumCurOrders) sumCurOrders.textContent = currentMonthData.ordersCount;
    if (sumBuyers) sumBuyers.textContent = totalBuyers;
    if (sumAllRev) sumAllRev.textContent = `৳${allTimeRevenue.toLocaleString()}`;

    if (!tbody) return;

    if (monthlyList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-gray-400">No monthly sell data yet. Figures calculate automatically when customer orders are placed.</td></tr>`;
      return;
    }

    const maxMonthlyRev = Math.max(...monthlyList.map(m => m.revenue), 1);

    tbody.innerHTML = monthlyList.map(m => {
      const aov = m.ordersCount > 0 ? Math.round(m.revenue / m.ordersCount) : 0;
      const barPercent = Math.min(100, Math.round((m.revenue / maxMonthlyRev) * 100));
      return `
        <tr class="border-b border-gray-100 hover:bg-gray-50 text-xs">
          <td class="py-3 px-3 font-bold text-gray-900">${m.label}</td>
          <td class="py-3 px-3 text-center font-semibold text-gray-800">${m.ordersCount}</td>
          <td class="py-3 px-3 text-center text-gray-600">${m.itemsCount}</td>
          <td class="py-3 px-3 font-bold text-td-red text-sm">৳${m.revenue.toLocaleString()}</td>
          <td class="py-3 px-3 font-mono text-gray-700">৳${aov.toLocaleString()}</td>
          <td class="py-3 px-3">
            <div class="w-full bg-gray-200 rounded-full h-2 max-w-[120px] overflow-hidden">
              <div class="bg-td-red h-2 rounded-full" style="width: ${barPercent}%"></div>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderArchivedOrdersTable(archivedOrders) {
    const tbody = document.getElementById('admin-archive-orders-tbody');
    if (!tbody) return;

    if (archivedOrders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-gray-400">The archive is currently empty. When an order is dismissed, it will stay here for 3 months before automatic deletion.</td></tr>`;
      return;
    }

    const now = Date.now();
    tbody.innerHTML = archivedOrders.map(order => {
      const dismissedTimestamp = order.archivedAt || order.timestamp || now;
      const dismissedDateStr = new Date(dismissedTimestamp).toISOString().slice(0, 16).replace('T', ' ');
      const elapsed = now - dismissedTimestamp;
      const remainingMs = Math.max(0, RETENTION_3_MONTHS_MS - elapsed);
      const daysRemaining = Math.max(0, Math.ceil(remainingMs / (24 * 60 * 60 * 1000)));
      const itemsSummary = (order.items || []).map(i => `${i.qty}x ${i.name}`).join('<br>');

      return `
        <tr class="border-b border-gray-100 hover:bg-gray-50 text-xs">
          <td class="py-3 px-3 font-mono font-bold text-gray-900">${order.orderId}<br><span class="text-gray-400 font-normal">${order.date}</span></td>
          <td class="py-3 px-3 font-semibold text-gray-800">${order.name}<br><span class="text-gray-400 font-mono font-normal">${order.mobile}</span></td>
          <td class="py-3 px-3 text-gray-600 max-w-xs truncate" title="${order.address}">${order.address}</td>
          <td class="py-3 px-3">
            <span class="font-bold text-td-red text-sm">${order.total}</span>
            <div class="text-[11px] text-gray-500">${itemsSummary}</div>
          </td>
          <td class="py-3 px-3 text-gray-500 font-mono">${dismissedDateStr}</td>
          <td class="py-3 px-3 text-center">
            <span class="inline-block bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[11px]">
              Auto-deletes in ${daysRemaining} days
            </span>
          </td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <button onclick="window.TopDuoo.restore('${order.orderId}')" class="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded font-bold text-xs transition shadow-sm mr-1.5">
              Restore
            </button>
            <button onclick="window.TopDuoo.deletePermanent('${order.orderId}')" class="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded font-bold text-xs transition">
              Delete
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ---------------- UNIFIED AUTHENTICATION & SESSION MANAGEMENT ----------------
  // "No need to show admin log in . Admin will log in as well as a customer but after log in it should be different purpose."

  function getStoredAuth() {
    try {
      const raw = localStorage.getItem('topduoo_auth');
      const auth = raw ? JSON.parse(raw) : null;
      if (auth && auth.role === 'admin' && !auth.apiToken) {
        localStorage.removeItem('topduoo_auth');
        return null;
      }
      return auth;
    } catch (e) {
      return null;
    }
  }

  async function handleAuthSubmit(e) {
    if (e) e.preventDefault();
    const idInput = (
      document.getElementById('auth-identity-input') || 
      document.getElementById('admin-id-input') ||
      document.getElementById('admin-guard-id')
    )?.value.trim();

    const passInput = (
      document.getElementById('auth-password-input') || 
      document.getElementById('admin-password-input') ||
      document.getElementById('admin-guard-pass')
    )?.value;

    const errorEl = document.getElementById('auth-login-error') || 
                    document.getElementById('admin-login-error') ||
                    document.getElementById('admin-guard-error');

    if (!idInput || !passInput) {
      if (errorEl) {
        errorEl.classList.remove('hidden');
        errorEl.textContent = 'Please enter your User ID and Password.';
      }
      return;
    }

    const adminPage = window.location.pathname.endsWith('admin.html');
    const knownAdminId = ['admin', 'topduoo0987', 'admin@topduoo.com'].includes(idInput.toLowerCase());
    if (adminPage || knownAdminId) {
      try {
        const result = await requestJson('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: idInput, password: passInput })
        });

        if (errorEl) errorEl.classList.add('hidden');
        const authData = { role: 'admin', name: 'Administrator', username: idInput, apiToken: result.token };
        localStorage.setItem('topduoo_auth', JSON.stringify(authData));
        showToast('Admin Authentication Verified');
        closeAuthModal();
        updateAuthUI();

        if (adminPage) {
          document.getElementById('admin-guard-overlay')?.classList.add('hidden');
          syncOrdersFromServer();
          renderAllAdminViews();
          window.TopDuooSupport?.refreshAdminInbox();
        } else {
          window.location.href = 'admin.html';
        }
      } catch (error) {
        if (errorEl) {
          errorEl.classList.remove('hidden');
          errorEl.textContent = error.message || 'Unable to contact the administrator sign-in service.';
        }
      }
      return;
    }

    try {
      const result = await requestJson('/api/consumer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: idInput, password: passInput })
      });
      completeConsumerSignIn(result);
    } catch (error) {
      if (errorEl) {
        errorEl.classList.remove('hidden');
        errorEl.textContent = error.message || 'Consumer sign-in failed.';
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem('topduoo_auth');
    updateAuthUI();
    showToast('Signed out successfully');
    closeCustomerPortal();
    closeAuthModal();

    if (window.location.pathname.endsWith('admin.html')) {
      window.location.href = 'index.html';
    }
  }

  async function downloadConsumerDatabase() {
    const auth = getStoredAuth();
    if (!auth || auth.role !== 'admin' || !auth.apiToken) {
      showToast('Administrator sign-in is required to download consumer data.');
      return;
    }

    try {
      const response = await fetch('/api/admin/consumers.csv', {
        headers: { Authorization: `Bearer ${auth.apiToken}` }
      });
      if (!response.ok) await readJsonResponse(response);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'consumer database.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } catch (error) {
      showToast(error.message || 'Unable to download the consumer database.');
    }
  }

  function updateAuthUI() {
    const auth = getStoredAuth();

    // Update Header labels across pages
    document.querySelectorAll('.td-auth-user-label, #td-header-user-label').forEach(el => {
      if (auth && auth.role === 'admin') {
        el.innerHTML = `<span class="text-xs font-bold text-gray-900 flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>Admin Console</span>`;
      } else if (auth && auth.role === 'customer') {
        const firstName = auth.name.split(' ')[0];
        el.innerHTML = `<span class="text-xs font-bold text-gray-900">Hi, ${firstName}</span>`;
      } else {
        el.innerHTML = `<span class="text-xs font-bold text-gray-800">Sign In</span>`;
      }
    });

    // Update top bar text if present
    document.querySelectorAll('.td-top-auth-label').forEach(el => {
      if (auth && auth.role === 'admin') {
        el.textContent = 'Admin Console';
      } else if (auth && auth.role === 'customer') {
        el.textContent = `My Account (${auth.name.split(' ')[0]})`;
      } else {
        el.textContent = 'Sign In';
      }
    });

    // Admin Page Guard handling
    if (window.location.pathname.endsWith('admin.html')) {
      const guardOverlay = document.getElementById('admin-guard-overlay');
      if (auth && auth.role === 'admin') {
        if (guardOverlay) guardOverlay.classList.add('hidden');
        renderAllAdminViews();
      } else {
        if (guardOverlay) guardOverlay.classList.remove('hidden');
      }
    }
  }

  function openAuthModal() {
    const auth = getStoredAuth();
    if (auth && auth.role === 'admin') {
      window.location.href = 'admin.html';
      return;
    }
    if (auth && auth.role === 'customer') {
      openCustomerPortal();
      return;
    }

    const overlay = document.getElementById('td-auth-modal-overlay') || document.getElementById('td-admin-modal-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Reset cards
      document.getElementById('auth-login-card')?.classList.remove('hidden');
      document.getElementById('admin-login-card')?.classList.remove('hidden');
      document.getElementById('admin-dashboard-card')?.classList.add('hidden');
    }
  }

  function closeAuthModal() {
    const overlay = document.getElementById('td-auth-modal-overlay') || document.getElementById('td-admin-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function openCustomerPortal() {
    const auth = getStoredAuth();
    if (!auth) {
      openAuthModal();
      return;
    }

    // Build or show customer portal modal
    let portal = document.getElementById('td-customer-portal-modal');
    if (!portal) {
      portal = document.createElement('div');
      portal.id = 'td-customer-portal-modal';
      portal.className = 'td-modal-overlay';
      portal.innerHTML = `
        <div class="td-modal-card max-w-lg overflow-hidden">
          <div class="bg-td-red text-white p-4 flex items-center justify-between">
            <h3 class="font-black text-sm uppercase tracking-wide">My Customer Account</h3>
            <button onclick="window.TopDuoo.closeCustomerPortal()" class="text-white hover:text-gray-200 text-xl font-bold">&times;</button>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b">
              <div>
                <h4 id="cust-portal-name" class="font-bold text-base text-gray-900">${auth.name}</h4>
                <p id="cust-portal-contact" class="text-xs text-gray-500">${auth.email || ''} &bull; ${auth.mobile || ''}</p>
              </div>
              <button onclick="window.TopDuoo.logout()" class="text-xs text-td-red font-bold hover:underline">
                Sign Out
              </button>
            </div>
            <div>
              <h5 class="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">My Orders</h5>
              <div id="cust-portal-orders-list" class="space-y-2 max-h-60 overflow-y-auto text-xs">
                <!-- Customer orders injected dynamically -->
              </div>
            </div>
            <div class="pt-3 border-t flex justify-end">
              <button onclick="window.TopDuoo.closeCustomerPortal()" class="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-lg transition">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(portal);
      portal.addEventListener('click', (e) => {
        if (e.target.id === 'td-customer-portal-modal') closeCustomerPortal();
      });
    }

    // Update customer portal details and real orders
    const nameEl = document.getElementById('cust-portal-name');
    const contactEl = document.getElementById('cust-portal-contact');
    const listEl = document.getElementById('cust-portal-orders-list');

    if (nameEl) nameEl.textContent = auth.name;
    if (contactEl) contactEl.textContent = `${auth.email || ''} ${auth.mobile ? '• ' + auth.mobile : ''}`;

    if (listEl) {
      // Find orders matching this customer
      const myOrders = ordersList.filter(o => 
        (o.mobile && auth.mobile && o.mobile === auth.mobile) ||
        (o.email && auth.email && o.email.toLowerCase() === auth.email.toLowerCase()) ||
        (o.name && auth.name && o.name.toLowerCase() === auth.name.toLowerCase())
      );

      if (myOrders.length === 0) {
        listEl.innerHTML = `<div class="py-6 text-center text-gray-400">No orders placed under this account yet. Discover top products from our catalog!</div>`;
      } else {
        listEl.innerHTML = myOrders.map(o => `
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div class="flex items-center justify-between mb-1 font-bold">
              <span class="font-mono text-gray-900">${o.orderId}</span>
              <span class="text-td-red">${o.total}</span>
            </div>
            <div class="text-[11px] text-gray-500 mb-1.5">Date: ${o.date} &bull; Status: <span class="font-bold ${o.status === 'Done' ? 'text-green-600' : 'text-amber-600'}">${o.status}</span></div>
            <div class="text-[11px] text-gray-700">${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</div>
          </div>
        `).join('');
      }
    }

    portal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCustomerPortal() {
    const portal = document.getElementById('td-customer-portal-modal');
    if (portal) {
      portal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  async function readJsonResponse(response) {
    const body = await response.text();
    let result = null;
    if (body.trim()) {
      try {
        result = JSON.parse(body);
      } catch {
        throw new Error(`The server returned an invalid response (HTTP ${response.status}).`);
      }
    } else if (response.ok) {
      throw new Error(`The server returned an empty response (HTTP ${response.status}).`);
    }

    if (!response.ok) {
      throw new Error(result?.error || `The request failed (HTTP ${response.status}).`);
    }
    return result || {};
  }

  async function requestJson(url, options) {
    return readJsonResponse(await fetch(url, options));
  }

  function showAuthError(message) {
    const registerForm = document.getElementById('consumer-register-form');
    const errorEl = registerForm && !registerForm.classList.contains('hidden')
      ? document.getElementById('consumer-register-error')
      : document.getElementById('auth-login-error');
    if (errorEl) {
      errorEl.classList.remove('hidden');
      errorEl.textContent = message;
    }
  }

  function completeConsumerSignIn(result) {
    const consumer = result.consumer;
    const authData = {
      role: 'customer',
      name: consumer.name,
      mobile: consumer.mobile || 'N/A',
      email: consumer.email,
      address: '',
      apiToken: result.token
    };
    localStorage.setItem('topduoo_auth', JSON.stringify(authData));
    document.getElementById('auth-login-error')?.classList.add('hidden');
    document.getElementById('consumer-register-error')?.classList.add('hidden');
    document.getElementById('consumer-register-form')?.classList.add('hidden');
    document.getElementById('td-auth-login-form')?.classList.remove('hidden');
    document.getElementById('consumer-login-options')?.classList.remove('hidden');
    showToast(`Welcome, ${consumer.name}!`);
    closeAuthModal();
    updateAuthUI();
    openCustomerPortal();
  }

  function setupConsumerAuthUI() {
    const card = document.getElementById('auth-login-card');
    const loginForm = document.getElementById('td-auth-login-form');
    const identityInput = document.getElementById('auth-identity-input');
    if (!card || !loginForm || document.getElementById('consumer-register-form')) return;

    if (identityInput) {
      identityInput.autocomplete = 'email';
      identityInput.placeholder = 'Email address (or admin ID)';
    }

    const options = document.createElement('div');
    options.id = 'consumer-login-options';
    options.className = 'mt-4 space-y-3';
    options.innerHTML = `
      <div class="flex items-center gap-3 text-xs text-gray-400"><span class="h-px flex-1 bg-gray-200"></span><span>or</span><span class="h-px flex-1 bg-gray-200"></span></div>
      <div id="google-signin-button" class="flex justify-center"></div>
      <p id="google-signin-status" class="text-center text-[11px] text-gray-500" aria-live="polite"></p>
      <p class="text-center text-xs text-gray-600">New here? <button id="show-consumer-register" type="button" class="font-bold text-td-red hover:underline">Create an account</button></p>`;
    loginForm.after(options);

    const registerForm = document.createElement('form');
    registerForm.id = 'consumer-register-form';
    registerForm.className = 'hidden mt-4 space-y-3 text-xs';
    registerForm.innerHTML = `
      <h4 class="text-center text-base font-bold text-gray-900">Create your consumer account</h4>
      <div id="consumer-register-error" class="hidden rounded border border-red-200 bg-red-50 p-2.5 text-center font-semibold text-td-red" role="alert"></div>
      <label class="block font-bold text-gray-700">Full name<input name="name" required maxlength="120" autocomplete="name" class="mt-1 w-full rounded border border-gray-300 p-2.5 font-normal outline-none focus:border-td-red"></label>
      <label class="block font-bold text-gray-700">Email<input name="email" type="email" required maxlength="254" autocomplete="email" class="mt-1 w-full rounded border border-gray-300 p-2.5 font-normal outline-none focus:border-td-red"></label>
      <label class="block font-bold text-gray-700">Mobile phone (optional)<input name="mobile" type="tel" maxlength="40" autocomplete="tel" class="mt-1 w-full rounded border border-gray-300 p-2.5 font-normal outline-none focus:border-td-red"></label>
      <label class="block font-bold text-gray-700">Password<input name="password" type="password" required minlength="8" autocomplete="new-password" class="mt-1 w-full rounded border border-gray-300 p-2.5 font-normal outline-none focus:border-td-red"><span class="mt-1 block font-normal text-gray-500">At least 8 characters.</span></label>
      <button type="submit" class="w-full rounded bg-td-red py-2.5 font-bold uppercase tracking-wider text-white hover:bg-td-red-hover">Register</button>
      <p class="text-center text-xs text-gray-600">Already registered? <button id="show-consumer-login" type="button" class="font-bold text-td-red hover:underline">Sign in</button></p>`;
    options.after(registerForm);

    document.getElementById('show-consumer-register').addEventListener('click', () => {
      loginForm.classList.add('hidden');
      options.classList.add('hidden');
      registerForm.classList.remove('hidden');
      document.getElementById('auth-login-error')?.classList.add('hidden');
    });
    document.getElementById('show-consumer-login').addEventListener('click', () => {
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      options.classList.remove('hidden');
      document.getElementById('auth-login-error')?.classList.add('hidden');
    });

    registerForm.addEventListener('submit', async event => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      try {
        const result = await requestJson('/api/consumer/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData))
        });
        completeConsumerSignIn(result);
      } catch (error) {
        showAuthError(error.message);
      }
    });

    loadGoogleSignIn();
  }

  async function loadGoogleSignIn() {
    const status = document.getElementById('google-signin-status');
    const button = document.getElementById('google-signin-button');
    if (!status || !button) return;

    let config;
    try {
      config = await requestJson('/api/auth/config');
    } catch (error) {
      status.textContent = error.message;
      return;
    }
    if (!config.googleClientId) {
      status.textContent = 'Google sign-in needs a Google OAuth client ID configured on the server.';
      return;
    }

    const initialize = () => {
      if (!window.google?.accounts?.id) {
        status.textContent = 'Google sign-in could not be loaded. Please try again later.';
        return;
      }
      window.google.accounts.id.initialize({
        client_id: config.googleClientId,
        callback: async response => {
          try {
            const result = await requestJson('/api/consumer/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential: response.credential })
            });
            completeConsumerSignIn(result);
          } catch (error) {
            showAuthError(error.message);
          }
        }
      });
      window.google.accounts.id.renderButton(button, { theme: 'outline', size: 'large', text: 'signin_with' });
      status.textContent = '';
    };

    if (window.google?.accounts?.id) {
      initialize();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initialize;
    script.onerror = () => { status.textContent = 'Google sign-in could not be loaded. Please try again later.'; };
    document.head.appendChild(script);
  }

  // ---------------- HOMEPAGE PRODUCT GRID RENDERING ----------------
  function renderProductsGrid() {
    const grid = document.getElementById('td-aliexpress-grid');
    if (!grid) return;

    // Pick 8 top featured items from diverse categories
    const featured = PRODUCTS.slice(0, 12);

    grid.innerHTML = featured.map(p => {
      const discountPercent = Math.round(((p.origPrice - p.price) / p.origPrice) * 100);
      return `
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition group flex flex-col justify-between">
          <a href="single-product.html?id=${p.id}" class="block relative bg-gray-50 h-44 sm:h-48 flex items-center justify-center p-3 overflow-hidden">
            <span class="absolute top-2 left-2 text-[10px] sm:text-[11px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm z-10 ${
              p.badge === 'Choice' ? 'bg-td-red text-white' : (p.badge === 'SuperDeal' ? 'bg-amber-400 text-gray-900' : 'bg-td-blue text-white')
            }">${p.badge}</span>
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy">
          </a>
          <div class="p-3 flex-1 flex flex-col justify-between">
            <div>
              <a href="single-product.html?id=${p.id}" class="text-xs sm:text-sm text-gray-900 font-semibold line-clamp-2 hover:text-td-red leading-snug mb-1" title="${p.name}">
                ${p.name}
              </a>
            </div>
            <div>
              <div class="flex items-baseline gap-1.5 mb-1 flex-wrap">
                <span class="text-base sm:text-lg font-black text-td-red">৳${p.price.toLocaleString()}</span>
                <span class="text-xs text-gray-400 line-through">৳${p.origPrice.toLocaleString()}</span>
                <span class="text-[10px] font-bold text-td-red bg-red-50 px-1 py-0.5 rounded">${discountPercent}% OFF</span>
              </div>
              <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <span class="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  In Stock
                </span>
                <button onclick="window.TopDuoo.add(${p.id}, 1)" class="bg-td-red hover:bg-td-red-hover active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded transition flex items-center gap-1 shadow-sm">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ---------------- AUTO-FADING HERO BANNER SLIDER ----------------
  let currentSlide = 0;
  let sliderInterval = null;

  function initSlider() {
    const slider = document.getElementById('td-hero-banner-slider') || document.getElementById('td-ali-slider-track');
    if (!slider) return;

    const slides = document.querySelectorAll('.td-hero-slide');
    const dots = document.querySelectorAll('.td-hero-dot');
    const prevBtn = document.getElementById('td-hero-prev');
    const nextBtn = document.getElementById('td-hero-next');

    if (slides.length === 0) return;

    function goToSlide(idx) {
      currentSlide = (idx + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.classList.remove('opacity-0', 'z-0', 'pointer-events-none');
          slide.classList.add('opacity-100', 'z-10');
        } else {
          slide.classList.remove('opacity-100', 'z-10');
          slide.classList.add('opacity-0', 'z-0', 'pointer-events-none');
        }
      });

      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.remove('w-2', 'bg-white/50');
          dot.classList.add('w-7', 'bg-amber-400');
        } else {
          dot.classList.remove('w-7', 'bg-amber-400');
          dot.classList.add('w-2', 'bg-white/50');
        }
      });
    }

    function startAutoPlay() {
      stopAutoPlay();
      sliderInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 3500);
    }

    function stopAutoPlay() {
      if (sliderInterval) clearInterval(sliderInterval);
    }

    prevBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentSlide - 1);
      startAutoPlay();
    });

    nextBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentSlide + 1);
      startAutoPlay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(i);
        startAutoPlay();
      });
    });

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Mobile touch swipe gesture support
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) {
        goToSlide(currentSlide + 1); // Swipe left
      } else if (touchEndX - touchStartX > 40) {
        goToSlide(currentSlide - 1); // Swipe right
      }
      startAutoPlay();
    }, { passive: true });

    goToSlide(0);
    startAutoPlay();
  }

  // ---------------- 3-SECOND ENTRY POPUP MODAL ----------------
  function init3SecondEntryPopup() {
    const overlay = document.getElementById('td-entry-popup-overlay');
    const card = document.getElementById('td-entry-popup-card');
    const closeBtn = document.getElementById('td-entry-popup-close');
    const progressBar = document.getElementById('td-popup-progress-bar');
    const secTimer = document.getElementById('td-popup-sec-timer');

    if (!overlay) return;

    let remainingSec = 3;
    let timerInterval = null;
    let closeTimeout = null;

    function closePopup() {
      if (closeTimeout) clearTimeout(closeTimeout);
      if (timerInterval) clearInterval(timerInterval);

      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0', 'pointer-events-none');
      if (card) {
        card.classList.remove('scale-100');
        card.classList.add('scale-95');
      }
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 500);
    }

    closeBtn?.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopup();
    });

    // Start 3-second visual countdown & progress bar shrink
    requestAnimationFrame(() => {
      if (progressBar) {
        progressBar.style.transition = 'width 3000ms linear';
        progressBar.style.width = '0%';
      }
    });

    timerInterval = setInterval(() => {
      remainingSec -= 1;
      if (secTimer) secTimer.textContent = Math.max(0, remainingSec);
      if (remainingSec <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    closeTimeout = setTimeout(closePopup, 3000);
  }


  // ---------------- TOAST NOTIFICATION ----------------
  function showToast(msg) {
    let t = document.getElementById('td-global-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'td-global-toast';
      t.className = 'fixed bottom-20 md:bottom-6 right-4 md:right-6 bg-gray-900 text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-xl z-50 transition transform translate-y-20 opacity-0 flex items-center gap-2 border-l-4 border-td-red max-w-sm';
      document.body.appendChild(t);
    }
    t.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-td-green inline-block flex-shrink-0"></span>
      <span class="flex-1 truncate">${msg}</span>
    `;
    t.classList.remove('translate-y-20', 'opacity-0');
    t.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      t.classList.remove('translate-y-0', 'opacity-100');
      t.classList.add('translate-y-20', 'opacity-0');
    }, 3200);
  }

  // ---------------- GLOBAL TOPDUOO INTERFACE ----------------
  
  // ---------------- COUPON MANAGEMENT & 10% DEDUCTION ----------------
  function applyCoupon(code) {
    if (!code || !code.trim()) {
      showToast('Please enter a coupon code.');
      return false;
    }
    const cleanCode = code.trim().toUpperCase();
    appliedCoupon = cleanCode;
    try {
      localStorage.setItem('topduoo_applied_coupon', cleanCode);
    } catch(e) {}
    updateCartUI();
    showToast(`Coupon "${cleanCode}" applied! 10% discount deducted.`);
    return true;
  }

  function applyCouponFromInput() {
    const input = document.getElementById('td-coupon-input');
    if (!input || !input.value.trim()) {
      showToast('Please enter a valid coupon code.');
      return;
    }
    applyCoupon(input.value);
  }

  function removeCoupon() {
    appliedCoupon = null;
    try {
      localStorage.removeItem('topduoo_applied_coupon');
    } catch(e) {}
    const input = document.getElementById('td-coupon-input');
    if (input) input.value = '';
    updateCartUI();
    showToast('Coupon removed.');
  }

  function copyAndApplyCoupon(code) {
    const couponCode = code || 'SAVE10';
    try {
      navigator.clipboard.writeText(couponCode);
    } catch(e) {}

    const copyBtnText = document.getElementById('copy-text');
    if (copyBtnText) {
      const orig = copyBtnText.textContent;
      copyBtnText.textContent = '✓ Copied & Applied!';
      setTimeout(() => { if (copyBtnText) copyBtnText.textContent = orig; }, 3000);
    }

    applyCoupon(couponCode);
    openCart();
  }

  window.TopDuoo = {
    add: addToCart,
    buyNow: buyNow,
    remove: removeFromCart,
    updateQty: updateItemQty,
    clear: clearCart,
    applyCoupon: applyCoupon,
    applyCouponFromInput: applyCouponFromInput,
    removeCoupon: removeCoupon,
    copyAndApplyCoupon: copyAndApplyCoupon,
    getAppliedCoupon: () => appliedCoupon,
    openCart: openCart,
    closeCart: closeCart,
    showStep: showCartStep,
    submitOrder: handleOrderSubmit,
    processDone: processOrderDone,
    dismiss: dismissOrder,
    restore: restoreOrder,
    deletePermanent: deleteOrderPermanently,
    viewCustomerOrders: viewCustomerOrders,
    renderAdminDashboard: renderAllAdminViews,
    openAuth: openAuthModal,
    closeAuth: closeAuthModal,
    openCustomerPortal: openCustomerPortal,
    closeCustomerPortal: closeCustomerPortal,
    logout: handleLogout,
    products: PRODUCTS,
    findProduct: findProduct
  };

  // ---------------- DOM BOOTSTRAP ----------------
  document.addEventListener('DOMContentLoaded', () => {
    setupConsumerAuthUI();
    loadWasm();
    renderProductsGrid();
    updateCartUI();
    initSlider();
    init3SecondEntryPopup();
    updateAuthUI();
    renderAllAdminViews();
    if (document.getElementById('admin-live-orders-tbody') && getStoredAuth()?.apiToken) {
      syncOrdersFromServer();
      setInterval(() => {
        if (document.visibilityState === 'visible') syncOrdersFromServer();
      }, 20000);
    }

    // Cart Drawer triggers
    document.querySelectorAll('.td-cart-open-trigger').forEach(btn => {
      btn.addEventListener('click', openCart);
    });
    document.getElementById('td-cart-close-btn')?.addEventListener('click', closeCart);
    document.getElementById('td-cart-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'td-cart-overlay') closeCart();
    });

    // Cart Step Triggers
    document.getElementById('td-cart-proceed-btn')?.addEventListener('click', () => {
      showCartStep(2);
    });
    document.getElementById('td-cart-back-btn')?.addEventListener('click', () => {
      showCartStep(1);
    });
    document.getElementById('td-cart-continue-btn')?.addEventListener('click', () => {
      closeCart();
    });
    document.getElementById('td-cart-order-form')?.addEventListener('submit', handleOrderSubmit);

    // Auth & Account Modal triggers (Unified for Customer & Admin)
    document.querySelectorAll('.td-auth-open-trigger, .td-admin-open-trigger').forEach(btn => {
      btn.addEventListener('click', openAuthModal);
    });

    // Modal close triggers
    document.getElementById('td-auth-modal-close')?.addEventListener('click', closeAuthModal);
    document.getElementById('td-admin-modal-close')?.addEventListener('click', closeAuthModal);
    
    const authOverlay = document.getElementById('td-auth-modal-overlay') || document.getElementById('td-admin-modal-overlay');
    authOverlay?.addEventListener('click', (e) => {
      if (e.target.id === 'td-auth-modal-overlay' || e.target.id === 'td-admin-modal-overlay') {
        closeAuthModal();
      }
    });

    // Sign in form submissions
    document.getElementById('td-auth-login-form')?.addEventListener('submit', handleAuthSubmit);
    document.getElementById('td-admin-login-form')?.addEventListener('submit', handleAuthSubmit);
    document.getElementById('admin-guard-login-form')?.addEventListener('submit', handleAuthSubmit);
    document.getElementById('admin-consumer-csv-download')?.addEventListener('click', downloadConsumerDatabase);

    // Logout triggers
    document.getElementById('td-admin-logout-btn')?.addEventListener('click', handleLogout);
    document.getElementById('admin-page-logout-btn')?.addEventListener('click', handleLogout);
  });
})();
