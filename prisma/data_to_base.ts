export const order_status_database = [
  {
    id_status: 1,
    status_name: "Nie zamówiono",
    description: "Zamówienie nie zostało jeszcze złożone",
  },
  {
    id_status: 2,
    status_name: "Nowe",
    description: "Zamówienie zostało złożone",
  },
  {
    id_status: 3,
    status_name: "W realizacji",
    description: "Zamówienie jest w trakcie realizacji",
  },
  {
    id_status: 4,
    status_name: "Wstrzymane",
    description: "Zamówienie jest wstrzymane, oczekuje na dalsze informacje",
  },
  {
    id_status: 5,
    status_name: "Do wysłania",
    description: "Zamówienie jest gotowe do wysłania",
  },
  {
    id_status: 6,
    status_name: "Wysłane",
    description: "Zamówienie zostało wysłane",
  },
  {
    id_status: 7,
    status_name: "Do odbioru",
    description: "Zamówienie jest gotowe do odbioru",
  },
  {
    id_status: 8,
    status_name: "Anulowane",
    description: "Zamówienie zostało anulowane",
  },
];

export const product_condition_database = [
  {
    id_condition: 1,
    condition_name: "Nowy",
    description: "Towar nowy, oryginalnie zapakowany. Brak śladów użytkowania.",
  },
  {
    id_condition: 2,
    condition_name: "Odpakowany",
    description: "Towar nowy, odpakowany. Nieznaczne śladów użytkowania.",
  },
  {
    id_condition: 3,
    condition_name: "Powystawowy",
    description: "Towar powystawowy. Może posiadać ślady użytkowania.",
  },
  {
    id_condition: 4,
    condition_name: "Używany",
    description: "Towar używany. Może posiadać ślady użytkowania.",
  },
  {
    id_condition: 5,
    condition_name: "Uszkodzony",
    description:
      "Towar uszkodzony, ale nadal funkcjonalny. Może posiadać widoczne uszkodzenia.",
  },
  {
    id_condition: 6,
    condition_name: "Niesprawny",
    description: "Towar niesprawny, wymaga naprawy lub części zamiennej.",
  },
  {
    id_condition: 7,
    condition_name: "Odnowiony",
    description: "Towar odnowiony, naprawiony. Może być nowy lub używany.",
  },
  {
    id_condition: 8,
    condition_name: "Niekompletny",
    description: "Towar bez akcesoriów lub części. Może być nowy lub używany.",
  },
];

export const product_categories_database = [
  // Kategorie
  {
    id_category: 1,
    category_name: "Elektronika",
    description:
      "Towary elektroniczne, takie jak telefony komórkowe, laptopy, tablety, telewizory i sprzęt audio.",
  },
  {
    id_category: 2,
    category_name: "Dom i ogród",
    description:
      "Towary do użytku domowego i ogrodnicze, takie jak meble, dekoracje, narzędzia i sprzęt ogrodniczy.",
  },
  {
    id_category: 3,
    category_name: "Beauty i zdrowie",
    description:
      "Towary kosmetyczne i produkty zdrowotne, takie jak kosmetyki, suplementy diety i produkty do pielęgnacji ciała.",
  },
  {
    id_category: 4,
    category_name: "Sport i rozrywka",
    description:
      "Towary sportowe i rozrywkowe, takie jak sprzęt sportowy, gry, filmy i książki.",
  },
  {
    id_category: 5,
    category_name: "Dzieci i zabawki",
    description:
      "Towary dla dzieci i zabawki, takie jak ubranka, zabawki, książki i gry.",
  },
  {
    id_category: 6,
    category_name: "Kuchnia i jedzenie",
    description:
      "Towary kuchenne i produkty spożywcze, takie jak narzędzia kuchenne, akcesoria, jedzenie i napoje.",
  },
  {
    id_category: 7,
    category_name: "Podróże i turystyka",
    description:
      "Towary związane z podróżami i turystyką, takie jak bagaże, akcesoria turystyczne, przewodniki i bilety.",
  },
];

export const products_database = [
  // Elektronika
  {
    id_product: 1,
    id_category: 1,
    product_name: "Samsung Galaxy S20+",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Smartfon Samsung Galaxy S20+ z ekranem AMOLED o przekątnej 6.7 cala, aparatem 64 MP oraz baterią o pojemności 4500 mAh.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674843675/samsung_galaxy_s20_nl2rc6.jpg",
  },
  {
    id_product: 2,
    id_category: 1,
    product_name: "Sony PlayStation 5",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Konsola Sony PlayStation 5 z procesorem AMD Zen 2 oraz 8 GB pamięci RAM.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674843675/ps5_l6gqcb.jpg",
  },
  {
    id_product: 3,
    id_category: 1,
    product_name: "Apple iPad Pro",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Tablet Apple iPad Pro z ekranem Retina o przekątnej 12.9 cala, aparatem 12 MP oraz pamięcią 128 GB.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674843674/ipad_pro_mkwygd.jpg",
  },
  {
    id_product: 4,
    id_category: 1,
    product_name: "Lenovo IdeaPad 5",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Laptop Lenovo IdeaPad 5 z procesorem AMD Ryzen 7 oraz 16 GB pamięci RAM.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674843676/lenowo_ideapad_lb6xia.jpg",
  },
  {
    id_product: 5,
    id_category: 1,
    product_name: "Canon EOS R",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Aparat fotograficzny Canon EOS R z matrycą 30 MP oraz możliwością filmowania w rozdzielczości 4K.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674843674/Aparat-CANON-EOS-R-Obiektyw-RF-24-105-mm-f-4-7.1-IS-STM-non-L-front1-001_zxsqo8.jpg",
  },
  {
    id_product: 6,
    id_category: 1,
    product_name: "JBL Flip 5",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Przenośny głośnik Bluetooth JBL Flip 5 z mocą 20 W oraz czasem działania na baterii do 12 godzin.",
    image: "",
  },
  {
    id_product: 7,
    id_category: 1,
    product_name: "Bose QuietComfort 35 II",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Słuchawki Bose QuietComfort 35 II z technologią redukcji szumów oraz czasem działania na baterii do 20 godzin.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674843673/Glosnik-mobilny-JBL-Flip-5-Czarny-front-new_afuve7.jpg",
  },
  {
    id_product: 8,
    id_category: 1,
    product_name: "Sony WH-1000XM4",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Słuchawki bezprzewodowe Sony WH-1000XM4 z technologią redukcji hałasu oraz czasem działania na baterii do 30 godzin.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674843673/61xHHgU0bYL._AC_SY879__b5r2kp.jpg",
  },
  // Dom i ogród
  {
    id_product: 9,
    id_category: 2,
    product_name: "Philips Hue",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "System inteligentnego oświetlenia Philips Hue z możliwością sterowania przez aplikację oraz asystenta głosowego.",
    image: "",
  },
  {
    id_product: 10,
    id_category: 2,
    product_name: "Dyson V11",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Odkurzacz Dyson V11 z cyfrowym wyświetlaczem oraz technologią automatycznego dostosowywania siły ssania.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674844628/61DLCUdKUbL._AC_SX522__rhkuzf.jpg",
  },
  {
    id_product: 11,
    id_category: 2,
    product_name: "Bosch SilencePlus",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Zmywarka Bosch SilencePlus z systemem ActiveWater oraz funkcją opóźnionego startu.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674844629/Zmywarka-Bosch-Silence-Plus-SMS6ECI03E-OUTLET_ml5lwj.jpg",
  },
  {
    id_product: 12,
    id_category: 2,
    product_name: "Miele Classic C1",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Odkurzacz Miele Classic C1 z filtrem HEPA oraz końcówkami do różnych rodzajów powierzchni.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674844628/Odkurzacz-MIELE-Classic-C1-Powerline-SBAF5-front_ixklxm.jpg",
  },
  {
    id_product: 13,
    id_category: 2,
    product_name: "Weber Spirit II E-310",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Grill Weber Spirit II E-310 z trzema palnikami i systemem Flavorizer Bars.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674844628/grill-gazowy-weber-spirit-ii-e-310-gbs-45010133-decofire-3_le4egp.jpg",
  },
  {
    id_product: 14,
    id_category: 2,
    product_name: "Husqvarna Automower 315X",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Robot koszący Husqvarna Automower 315X z możliwością programowania i komunikacją przez aplikację.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674844628/Robot-koszacy-415x-Husqvarna_yb3vl9.jpg",
  },
  {
    id_product: 15,
    id_category: 2,
    product_name: "Fiskars PowerGear X",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Nożyce do gałęzi Fiskars PowerGear X z systemem redukującym siłę nacisku na rękę oraz ostrzami z węglika wolframu.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674844628/FISKARS-Sekator-nozycowy-LX98-PowerGearX-1020188_vdjroc.jpg",
  },

  // Beauty i zdrowie:
  {
    id_product: 16,
    id_category: 3,
    product_name: "Philips Sonicare DiamondClean",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Szczoteczka soniczna Philips Sonicare DiamondClean z 5 trybami i końcówką do czyszczenia dziąseł.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845540/Szczoteczka-soniczna-PHILIPS-Sonicare-DiamondClean-9000-HX9911-09-Czarny-zestaw-ze-smartfonem_nmtihl.jpg",
  },
  {
    id_product: 17,
    id_category: 3,
    product_name: "Oral-B Genius X",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Szczoteczka elektryczna Oral-B Genius X z aplikacją do monitorowania mycia oraz 6 końcówkami.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845540/64580_1_ug4nyh.jpg",
  },
  {
    id_product: 18,
    id_category: 3,
    product_name: "Braun Silk-épil 9",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Depilator Braun Silk-épil 9 z systemem MicroGrip tweezer i wodoodporną konstrukcją.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845541/6290588_12_i1064_qcsrup.jpg",
  },
  {
    id_product: 19,
    id_category: 3,
    product_name: "GHD Platinum+",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Prostownica do włosów GHD Platinum+ z technologią ultralekką i automatycznym dostosowywaniem temperatury.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845541/7233870e44eba41e0ccc150fe1da_pwqhbz.jpg",
  },

  // Sport i rozrywka
  {
    id_product: 20,
    id_category: 4,
    product_name: "Xbox Series X",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Konsola Xbox Series X z procesorem AMD Zen 2 i grafiką RDNA 2 oraz możliwością grania w rozdzielczości 4K.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845544/Konsola-MICROSOFT-XBOX-Series-X-Front-01_a5ab0f.jpg",
  },
  {
    id_product: 21,
    id_category: 4,
    product_name: "Nintendo Switch",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Konsola Nintendo Switch z możliwością grania w trybie przenośnym oraz w trybie stacjonarnym.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845546/Konsola-Nintendo-Switch-32GB-czerwono-niebieska-V2_htt85j.jpg",
  },
  {
    id_product: 22,
    id_category: 4,
    product_name: "GoPro Hero 9 Black",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Kamera sportowa GoPro Hero 9 Black z kamerą 5K, systemem HyperSmooth 3.0 oraz modułem GPS.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845540/41yKXEb-TAL._AC_SY350__dzqobt.jpg",
  },
  {
    id_product: 23,
    id_category: 4,
    product_name: "Fitbit Versa 3",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Opaska fitness Fitbit Versa 3 z GPS, monitorowaniem snu i tętna oraz możliwością kontrolowania muzyki.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845543/Smartwatch-FITBIT-Versa-3-Rozowy-skos_n7kl1o.jpg",
  },

  //Dzieci i zabawki
  {
    id_product: 24,
    id_category: 5,
    product_name: "LEGO City",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Zestaw klocków LEGO City z motywem miasta i różnymi pojazdami oraz minifigurkami.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845547/LEGO-CITY-Zuraw-samochodowy-60324_py1bhw.jpg",
  },
  {
    id_product: 25,
    id_category: 5,
    product_name: "Barbie Dreamhouse",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Dom dla lalek Barbie Dreamhouse z ruchomymi schodami, windą i różnymi akcesoriami.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845546/Barbie-DreamHouse-Deluxe-Domek-60-rocznica-2-Lalki_j7m7gg.jpg",
  },
  {
    id_product: 26,
    id_category: 5,
    product_name: "Hot Wheels Ultimate Garage",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Zestaw zabawek Hot Wheels Ultimate Garage z wieloma poziomami i torami do wyścigów.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1674845541/71G5rZoxGTL_pggm8w.jpg",
  },

  // Kuchnia i jedzenie:
  {
    id_product: 27,
    id_category: 6,
    product_name: "Instant Pot DUO60",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Urządzenie do gotowania na parze Instant Pot DUO60 z funkcjami gotowania na parze, duszenia, gotowania na wolnym ogniu itp.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105315/41Nqvyba8WL._AC_SY780__hxgsts.jpg",
  },
  {
    id_product: 28,
    id_category: 6,
    product_name: "De'Longhi Lattissima Pro",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Ekspres do kawy De'Longhi Lattissima Pro z funkcją automatycznego mleka i możliwością połączenia z aplikacją.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105315/Ekspres-DELONGHI-EN650B-front-3__1_uuyu32.jpg",
  },
  {
    id_product: 29,
    id_category: 6,
    product_name: "Le Creuset Dutch Oven",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Garnki Le Creuset Dutch Oven wykonane ze specjalnej emaliowanej stali szlachetnej, odpornej na wysokie temperatury i idealne do duszenia i gotowania na wolnym ogniu.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105315/81ZJ02Yb9-L._AC_SX679__pgi3vv.jpg",
  },
  {
    id_product: 30,
    id_category: 6,
    product_name: "All-Clad Stainless Steel Fry Pan",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Patelnia All-Clad Stainless Steel Fry Pan wykonana ze stali nierdzewnej i posiadająca aluminiowy rdzeń dla równomiernego rozprowadzania ciepła.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105315/zwilling-base-24-cm_49755160489_3_atif9y.jpg",
  },

  // Podróże i turystyka:

  {
    id_product: 31,
    id_category: 7,
    product_name: "Osprey Porter 46 Travel Backpack",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Plecak turystyczny Osprey Porter 46 z przegrodami na ubrania i akcesoria oraz możliwością przekształcenia w walizkę.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105315/0_0014__0046_porter_46_f20_side_haybalegreen_ohrfdv.jpg",
  },
  {
    id_product: 32,
    id_category: 7,
    product_name: "Samsonite Cosmolite Spinner",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Walizka Samsonite Cosmolite Spinner z twardą skorupą i kółkami 360 stopni.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105315/pol_pm_Walizka-SAMSONITE-COSMOLITE-srednia-4kola-68l-4901_2_m6qtal.jpg",
  },
  {
    id_product: 33,
    id_category: 7,
    product_name: "North Face Base Camp Duffel",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Torba North Face Base Camp Duffel z twardą skorupą i trwałymi uchwytami oraz możliwością przekształcenia w plecak.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105316/pol_pl_Torba-podreczna-The-North-Face-Base-Camp-Duffel-S-black-white-61898_1_qgx7je.jpg",
  },
  {
    id_product: 34,
    id_category: 7,
    product_name: "Coleman Evanston Tent",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Namiot Coleman Evanston Tent z przestronnym wejściem i oknami oraz możliwością rozbudowy o dodatkowe pomieszczenie.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105315/187863-187863-images_main-pop_coleman_coastline3plus-ecommerce_osqqyj.jpg",
  },
  {
    id_product: 35,
    id_category: 7,
    product_name: "Black Diamond Spot Headlamp",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Latarka Black Diamond Spot Headlamp z regulacją mocy i możliwością połączenia z aplikacją.",
    image:
      "https://res.cloudinary.com/dvkukzojb/image/upload/v1675105315/pobrany_plik_ghpbub.jpg",
  },
];

export const suppliers_databese = [
  {
    id_supplier: 1,
    id_employee: 1,
    first_name: "Jan",
    last_name: "Kowalski",
    supplier_name: "Kowalski dostawy",
    NIP: "1234567890",
    REGON: "123456789",
    phone: "123456789",
    email: "jan.kowalski@supplier.com",
    country: "Poland",
    province: "Mazowieckie",
    postal_code: "00-000",
    city: "Warszawa",
    street: "Polna 1",
  },
  {
    id_supplier: 2,
    id_employee: 1,
    first_name: "Anna",
    last_name: "Nowak",
    supplier_name: "Nowak sp. z o.o.",
    NIP: "9876543210",
    REGON: "987654321",
    phone: "987654321",
    email: "anna.nowak@supplier.com",
    country: "Poland",
    province: "Małopolskie",
    postal_code: "31-000",
    city: "Kraków",
    street: "Kościuszki 2",
  },
  {
    id_supplier: 3,
    id_employee: 1,
    first_name: "Adam",
    last_name: "Wiśniewski",
    supplier_name: "Wiśniewski sp. z o.o.",
    NIP: "1111111111",
    REGON: "111111111",
    phone: "111111111",
    email: "adam.wisniewski@supplier.com",
    country: "Poland",
    province: "Śląskie",
    postal_code: "40-000",
    city: "Katowice",
    street: "Sienkiewicza 3",
  },
  {
    id_supplier: 4,
    id_employee: 1,
    first_name: "Maria",
    last_name: "Wojciechowska",
    supplier_name: "Wojciechowska dostawy",
    NIP: "2222222222",
    REGON: "222222222",
    phone: "222222222",
    email: "maria.wojciechowska@supplier.com",
    country: "Poland",
    province: "Dolnośląskie",
    postal_code: "50-000",
    city: "Wrocław",
    street: "Powstańców Śląskich 4",
  },
  {
    id_supplier: 5,
    id_employee: 1,
    first_name: "Tomasz",
    last_name: "Kwiatkowski",
    supplier_name: "Kwiatkowski sp. z o.o.",
    NIP: "3333333333",
    REGON: "333333333",
    phone: "333333333",
    email: "tomasz.kwiatkowski@supplier.com",
    country: "Poland",
    province: "Lubelskie",
    postal_code: "20-000",
    city: "Lublin",
    street: "Lwowska 5",
  },
  {
    id_supplier: 6,
    id_employee: 1,
    first_name: "Agnieszka",
    last_name: "Dąbrowska",
    supplier_name: "Dąbrowska dostawy",
    NIP: "4444444444",
    REGON: "444444444",
    phone: "444444444",
    email: "agnieszka.dabrowska@supplier.com",
    country: "Poland",
    province: "Pomorskie",
    postal_code: "70-000",
    city: "Gdańsk",
    street: "Stępnia 6",
  },
  {
    id_supplier: 7,
    id_employee: 1,
    first_name: "Paweł",
    last_name: "Mazurek",
    supplier_name: "Mazurek sp. z o.o.",
    NIP: "5555555555",
    REGON: "555555555",
    phone: "555555555",
    email: "pawel.mazurek@supplier.com",
    country: "Poland",
    province: "Podlaskie",
    postal_code: "15-000",
    city: "Białystok",
    street: "Piłsudskiego 7",
  },
  {
    id_supplier: 8,
    id_employee: 1,
    first_name: "Marta",
    last_name: "Jankowska",
    supplier_name: "Jankowska sp. z o.o.",
    NIP: "6666666666",
    REGON: "666666666",
    phone: "666666666",
    email: "marta.jankowska@supplier.com",
    country: "Poland",
    province: "Świętokrzyskie",
    postal_code: "25-000",
    city: "Kielce",
    street: "Piłsudskiego 8",
  },
  {
    id_supplier: 9,
    id_employee: 1,
    first_name: "Grzegorz",
    last_name: "Kaczmarek",
    supplier_name: "Kaczmarek dostawy",
    NIP: "7777777777",
    REGON: "777777777",
    phone: "777777777",
    email: "grzegorz.kaczmarek@supplier.com",
    country: "Poland",
    province: "Małopolskie",
    postal_code: "30-000",
    city: "Kraków",
    street: "Piłsudskiego 9",
  },
  {
    id_supplier: 10,
    id_employee: 1,
    first_name: "Anna",
    last_name: "Zielińska",
    supplier_name: "Zielińska sp. z o.o.",
    NIP: "8888888888",
    REGON: "888888888",
    phone: "888888888",
    email: "anna.zielinska@supplier.com",
    country: "Poland",
    province: "Łódzkie",
    postal_code: "35-000",
    city: "Łódź",
    street: "Piłsudskiego 10",
  },
];

export const company_database = [
  {
    id_company: 1,
    id_owner: 1,
    first_name: "Jan",
    last_name: "Kowalski",
    company_name: "Kowalski Inc.",
    NIP: "1234567890",
    REGON: "123456789",
    phone: "123456789",
    email: "jan.kowalski@company.com",
    country: "Poland",
    province: "Mazowieckie",
    postal_code: "00-000",
    city: "Warszawa",
    street: "Marszałkowska 1",
  },

  // {
  //   id_company: 2,
  //   id_owner: 1,
  //   first_name: "Piotr",
  //   last_name: "Nowak",
  //   company_name: "Nowak Enterprises",
  //   NIP: "2345678901",
  //   REGON: "234567890",
  //   phone: "234567890",
  //   email: "piotr.nowak@company.com",
  //   country: "Poland",
  //   province: "Małopolskie",
  //   postal_code: "10-000",
  //   city: "Kraków",
  //   street: "Piłsudskiego 2",
  // },
  // {
  //   id_company: 3,
  //   id_owner: 1,
  //   first_name: "Agnieszka",
  //   last_name: "Wiśniewska",
  //   company_name: "Wiśniewska Inc.",
  //   NIP: "3456789012",
  //   REGON: "345678901",
  //   phone: "345678901",
  //   email: "agnieszka.wisniewska@company.com",
  //   country: "Poland",
  //   province: "Śląskie",
  //   postal_code: "20-000",
  //   city: "Katowice",
  //   street: "Marszałkowska 3",
  // },
  // {
  //   id_company: 4,
  //   id_owner: 1,
  //   first_name: "Marcin",
  //   last_name: "Wojciechowski",
  //   company_name: "Wojciechowski LLC",
  //   NIP: "4567890123",
  //   REGON: "456789012",
  //   phone: "456789012",
  //   email: "marcin.wojciechowski@company.com",
  //   country: "Poland",
  //   province: "Dolnośląskie",
  //   postal_code: "30-000",
  //   city: "Wrocław",
  //   street: "Marszałkowska 4",
  // },
  // {
  //   id_company: 5,
  //   id_owner: 1,
  //   first_name: "Piotr",
  //   last_name: "Zielinski",
  //   company_name: "Zielinski Inc",
  //   NIP: "5678912345",
  //   REGON: "543211987",
  //   phone: "567890123",
  //   email: "zielinski@inc.pl",
  //   country: "Poland",
  //   province: "Greater Poland",
  //   postal_code: "70-123",
  //   city: "Poznan",
  //   street: "Zielinska 5",
  // },
  // {
  //   id_company: 6,
  //   id_owner: 1,
  //   first_name: "Piotr",
  //   last_name: "Wiśniewski",
  //   company_name: "Wiśniewski & Partners",
  //   NIP: "3333333333",
  //   REGON: "444444444",
  //   phone: "147258369",
  //   email: "piotr.wisniewski@firma.pl",
  //   country: "Polska",
  //   province: "Wielkopolskie",
  //   postal_code: "60-456",
  //   city: "Poznań",
  //   street: "Wiśniewska 3",
  // },
  // {
  //   id_company: 7,
  //   id_owner: 1,
  //   first_name: "Marta",
  //   last_name: "Wójcik",
  //   company_name: "Wójcik International",
  //   NIP: "4444444444",
  //   REGON: "555555555",
  //   phone: "369258147",
  //   email: "marta.wojcik@firma.pl",
  //   country: "Polska",
  //   province: "Mazowieckie",
  //   postal_code: "02-456",
  //   city: "Warszawa",
  //   street: "Wójcik 4",
  // },
];

export const client_database = [
  {
    id_client: 1,
    id_employee: 1,
    first_name: "Jan",
    last_name: "Kowalski",
    client_name: "Kowalski Inc.",
    NIP: "1234567890",
    REGON: "123456789",
    phone: "123456789",
    email: "jan.kowalski@company.com",
    country: "Poland",
    province: "Mazowieckie",
    postal_code: "00-000",
    city: "Warszawa",
    street: "Marszałkowska 1",
  },

  {
    id_client: 2,
    id_employee: 1,
    first_name: "Piotr",
    last_name: "Nowak",
    client_name: "Nowak Enterprises",
    NIP: "2345678901",
    REGON: "234567890",
    phone: "234567890",
    email: "piotr.nowak@company.com",
    country: "Poland",
    province: "Małopolskie",
    postal_code: "10-000",
    city: "Kraków",
    street: "Piłsudskiego 2",
  },
  {
    id_client: 3,
    id_employee: 1,
    first_name: "Agnieszka",
    last_name: "Wiśniewska",
    client_name: "Wiśniewska Inc.",
    NIP: "3456789012",
    REGON: "345678901",
    phone: "345678901",
    email: "agnieszka.wisniewska@company.com",
    country: "Poland",
    province: "Śląskie",
    postal_code: "20-000",
    city: "Katowice",
    street: "Marszałkowska 3",
  },
  {
    id_client: 4,
    id_employee: 1,
    first_name: "Marcin",
    last_name: "Wojciechowski",
    client_name: "Wojciechowski LLC",
    NIP: "4567890123",
    REGON: "456789012",
    phone: "456789012",
    email: "marcin.wojciechowski@company.com",
    country: "Poland",
    province: "Dolnośląskie",
    postal_code: "30-000",
    city: "Wrocław",
    street: "Marszałkowska 4",
  },
  {
    id_client: 5,
    id_employee: 1,
    first_name: "Piotr",
    last_name: "Zielinski",
    client_name: "Zielinski Inc",
    NIP: "5678912345",
    REGON: "543211987",
    phone: "567890123",
    email: "zielinski@inc.pl",
    country: "Poland",
    province: "Greater Poland",
    postal_code: "70-123",
    city: "Poznan",
    street: "Zielinska 5",
  },
  {
    id_client: 6,
    id_employee: 1,
    first_name: "Piotr",
    last_name: "Wiśniewski",
    client_name: "Wiśniewski & Partners",
    NIP: "3333333333",
    REGON: "444444444",
    phone: "147258369",
    email: "piotr.wisniewski@firma.pl",
    country: "Polska",
    province: "Wielkopolskie",
    postal_code: "60-456",
    city: "Poznań",
    street: "Wiśniewska 3",
  },
  {
    id_client: 7,
    id_employee: 1,
    first_name: "Marta",
    last_name: "Wójcik",
    client_name: "Wójcik International",
    NIP: "4444444444",
    REGON: "555555555",
    phone: "369258147",
    email: "marta.wojcik@firma.pl",
    country: "Polska",
    province: "Mazowieckie",
    postal_code: "02-456",
    city: "Warszawa",
    street: "Wójcik 4",
  },
];

export const pallet_database = [
  {
    id_pallet: 1,
    id_supplier: 1,
    id_employee: 1,
    pallet_name: "Konsole",
    purchase_price: 100.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 2,
    id_supplier: 2,
    id_employee: 1,
    pallet_name: "Turystyka",
    purchase_price: 200.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 3,
    id_supplier: 3,
    id_employee: 1,
    pallet_name: "Beuty",
    purchase_price: 300.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 4,
    id_supplier: 4,
    id_employee: 1,
    pallet_name: "Kuchnia",
    purchase_price: 400.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 5,
    id_supplier: 5,
    id_employee: 1,
    pallet_name: "Zabawki i inne",
    purchase_price: 500.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 6,
    id_supplier: 6,
    id_employee: 1,
    pallet_name: "Mieszane",
    purchase_price: 600.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 7,
    id_supplier: 7,
    id_employee: 1,
    pallet_name: "Elektronika",
    purchase_price: 700.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 8,
    id_supplier: 8,
    id_employee: 1,
    pallet_name: "Łazienka",
    purchase_price: 100.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 9,
    id_supplier: 9,
    id_employee: 1,
    pallet_name: "Pallet",
    purchase_price: 200.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
  {
    id_pallet: 10,
    id_supplier: 10,
    id_employee: 1,
    pallet_name: "Pallet C",
    purchase_price: 150.0,
    purchase_date: "2023-01-30T20:54:25.239Z",
    delivery_date: "2023-01-30T20:54:25.239Z",
  },
];

// export const batchs_database = [

// ];
