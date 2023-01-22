export const order_status_database = [
  {
    status_name: "not ordered",
    description: "Zamówienie nie zostało jeszcze złożone",
  },
  { status_name: "nowe", description: "Zamówienie zostało złożone" },
  {
    status_name: "realizowane",
    description: "Zamówienie jest w trakcie realizacji",
  },
  {
    status_name: "wstrzymane",
    description: "Zamówienie jest wstrzymane, oczekuje na dalsze informacje",
  },
  {
    status_name: "do wysłania",
    description: "Zamówienie jest gotowe do wysłania",
  },
  { status_name: "wysłane", description: "Zamówienie zostało wysłane" },
  {
    status_name: "do odbioru",
    description: "Zamówienie jest gotowe do odbioru",
  },
  { status_name: "anulowane", description: "Zamówienie zostało anulowane" },
];

export const product_condition_database = [
  {
    condition_name: "nowy",
    description: "Towar nowy, oryginalnie zapakowany. Brak śladów użytkowania.",
  },
  {
    condition_name: "odpakowany",
    description: "Towar nowy, odpakowany. Nieznaczne śladów użytkowania.",
  },
  {
    condition_name: "powystawowy",
    description: "Towar powystawowy. Może posiadać ślady użytkowania.",
  },
  {
    condition_name: "używany",
    description: "Towar używany. Może posiadać ślady użytkowania.",
  },
  {
    condition_name: "uszkodzony",
    description:
      "Towar uszkodzony, ale nadal funkcjonalny. Może posiadać widoczne uszkodzenia.",
  },
  {
    condition_name: "niesprawny",
    description: "Towar niesprawny, wymaga naprawy lub części zamiennej.",
  },
  {
    condition_name: "odnowiony",
    description: "Towar odnowiony, naprawiony. Może być nowy lub używany.",
  },
  {
    condition_name: "niekompletny",
    description: "Towar bez akcesoriów lub części. Może być nowy lub używany.",
  },
];

export const product_categories_database = [
  // Kategorie
  {
    id_category: 1,
    category_name: "elektronika",
    description:
      "Towary elektroniczne, takie jak telefony komórkowe, laptopy, tablety, telewizory i sprzęt audio.",
  },
  {
    id_category: 2,
    category_name: "moda",
    description:
      "Towary odzieżowe i akcesoria, takie jak ubrania, buty, torebki i biżuteria.",
  },
  {
    id_category: 3,
    category_name: "dom i ogród",
    description:
      "Towary do użytku domowego i ogrodnicze, takie jak meble, dekoracje, narzędzia i sprzęt ogrodniczy.",
  },
  {
    id_category: 4,
    category_name: "beauty i zdrowie",
    description:
      "Towary kosmetyczne i produkty zdrowotne, takie jak kosmetyki, suplementy diety i produkty do pielęgnacji ciała.",
  },
  {
    id_category: 5,
    category_name: "sport i rozrywka",
    description:
      "Towary sportowe i rozrywkowe, takie jak sprzęt sportowy, gry, filmy i książki.",
  },
  {
    id_category: 6,
    category_name: "dzieci i zabawki",
    description:
      "Towary dla dzieci i zabawki, takie jak ubranka, zabawki, książki i gry.",
  },
  {
    id_category: 7,
    category_name: "samochody i motocykle",
    description:
      "Towary związane z samochodami i motocyklami, takie jak części zamienne, opony, akcesoria i narzędzia.",
  },
  {
    id_category: 8,
    category_name: "muzyka i instrumenty",
    description:
      "Towary związane z muzyką i instrumentami muzycznymi, takie jak płyty, instrumenty i akcesoria.",
  },
  {
    id_category: 9,
    category_name: "kuchnia i jedzenie",
    description:
      "Towary kuchenne i produkty spożywcze, takie jak narzędzia kuchenne, akcesoria, jedzenie i napoje.",
  },
  {
    id_category: 10,
    category_name: "podróże i turystyka",
    description:
      "Towary związane z podróżami i turystyką, takie jak bagaże, akcesoria turystyczne, przewodniki i bilety.",
  },
];

export const products_database = [
  // Elektronika
  {
    id_category: 1,
    product_name: "Samsung Galaxy S20+",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Smartfon Samsung Galaxy S20+ z ekranem AMOLED o przekątnej 6.7 cala, aparatem 64 MP oraz baterią o pojemności 4500 mAh.",
  },
  {
    id_category: 1,
    product_name: "Sony PlayStation 5",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Konsola Sony PlayStation 5 z procesorem AMD Zen 2 oraz 8 GB pamięci RAM.",
  },
  {
    id_category: 1,
    product_name: "Apple iPad Pro",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Tablet Apple iPad Pro z ekranem Retina o przekątnej 12.9 cala, aparatem 12 MP oraz pamięcią 128 GB.",
  },
  {
    id_category: 1,
    product_name: "Lenovo IdeaPad 5",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Laptop Lenovo IdeaPad 5 z procesorem AMD Ryzen 7 oraz 16 GB pamięci RAM.",
  },
  {
    id_category: 1,
    product_name: "Canon EOS R",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Aparat fotograficzny Canon EOS R z matrycą 30 MP oraz możliwością filmowania w rozdzielczości 4K.",
  },
  {
    id_category: 1,
    product_name: "JBL Flip 5",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Przenośny głośnik Bluetooth JBL Flip 5 z mocą 20 W oraz czasem działania na baterii do 12 godzin.",
  },
  {
    id_category: 1,
    product_name: "Bose QuietComfort 35 II",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Słuchawki Bose QuietComfort 35 II z technologią redukcji szumów oraz czasem działania na baterii do 20 godzin.",
  },
  {
    id_category: 1,
    product_name: "Google Nest Hub",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Ekran inteligentny Google Nest Hub z głośnikiem oraz możliwością obsługi asystenta głosowego Google Assistant.",
  },
  {
    id_category: 1,
    product_name: "LG OLED CX",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Telewizor LG OLED CX z ekranem o przekątnej 55 cali i rozdzielczości 4K oraz obsługą technologii HDR.",
  },
  {
    id_category: 1,
    product_name: "Sony WH-1000XM4",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Słuchawki bezprzewodowe Sony WH-1000XM4 z technologią redukcji hałasu oraz czasem działania na baterii do 30 godzin.",
  },

  // Moda
  {
    id_category: 2,
    product_name: "Gucci Marmont",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Torebka Gucci Marmont z naturalnej skóry i charakterystycznym znakiem firmy Gucci.",
  },
  {
    id_category: 2,
    product_name: "Louis Vuitton Neverfull",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Torebka Louis Vuitton Neverfull z naturalnej skóry i charakterystycznym znakiem firmy Louis Vuitton.",
  },
  {
    id_category: 2,
    product_name: "Adidas NMD R1",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Buty Adidas NMD R1 z podeszwą z pianki Boost oraz charakterystycznym wzorem na boku.",
  },
  {
    id_category: 2,
    product_name: "Nike Air Max 270",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Buty Nike Air Max 270 z podeszwą z pianki Air oraz charakterystycznym wzorem na boku.",
  },
  {
    id_category: 2,
    product_name: "Calvin Klein Jeans",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Spodnie Calvin Klein Jeans z bawełny i charakterystycznym znakiem firmy Calvin Klein.",
  },
  {
    id_category: 2,
    product_name: "Levi's 501",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Spodnie Levi's 501 z bawełny i charakterystycznym znakiem firmy Levi's.",
  },
  {
    id_category: 2,
    product_name: "Ray-Ban Wayfarer",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Okulary przeciwsłoneczne Ray-Ban Wayfarer z charakterystycznym kształtem oraz polaryzującymi szkłami.",
  },
  {
    id_category: 2,
    product_name: "Oakley Holbrook",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Okulary sportowe Oakley Holbrook z polaryzującymi szkłami oraz trwałą oprawką z tworzywa sztucznego.",
  },
  {
    id_category: 2,
    product_name: "Guess Watches",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Zegarek Guess Watches z kopertą ze stali szlachetnej i skórzanym paskiem.",
  },
  {
    id_category: 2,
    product_name: "Michael Kors Runway",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Zegarek Michael Kors Runway z kopertą z tworzywa sztucznego i metalowym paskiem.",
  },

  // Dom i ogród
  {
    id_category: 3,
    product_name: "IKEA KALLAX",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Regał IKEA KALLAX z płyty MDF oraz możliwością montażu jako przegroda pomieszczenia.",
  },
  {
    id_category: 3,
    product_name: "Philips Hue",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "System inteligentnego oświetlenia Philips Hue z możliwością sterowania przez aplikację oraz asystenta głosowego.",
  },
  {
    id_category: 3,
    product_name: "Dyson V11",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Odkurzacz Dyson V11 z cyfrowym wyświetlaczem oraz technologią automatycznego dostosowywania siły ssania.",
  },
  {
    id_category: 3,
    product_name: "Bosch SilencePlus",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Zmywarka Bosch SilencePlus z systemem ActiveWater oraz funkcją opóźnionego startu.",
  },
  {
    id_category: 3,
    product_name: "Miele Classic C1",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Odkurzacz Miele Classic C1 z filtrem HEPA oraz końcówkami do różnych rodzajów powierzchni.",
  },
  {
    id_category: 3,
    product_name: "Gardman Rowlinson",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Altanka ogrodowa Gardman Rowlinson z drewna sosnowego i przeszklonym dachem.",
  },
  {
    id_category: 3,
    product_name: "Weber Spirit II E-310",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Grill Weber Spirit II E-310 z trzema palnikami i systemem Flavorizer Bars.",
  },
  {
    id_category: 3,
    product_name: "Husqvarna Automower 315X",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Robot koszący Husqvarna Automower 315X z możliwością programowania i komunikacją przez aplikację.",
  },
  {
    id_category: 3,
    product_name: "GreenWorks Pro 80V",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Kosiarka elektryczna GreenWorks Pro 80V z silnikiem o mocy 80 V i pojemnością kosza na trawę do 2.5 buszu.",
  },
  {
    id_category: 3,
    product_name: "Fiskars PowerGear X",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Nożyce do gałęzi Fiskars PowerGear X z systemem redukującym siłę nacisku na rękę oraz ostrzami z węglika wolframu.",
  },

  // Beauty i zdrowie:
  {
    id_category: 4,
    product_name: "Philips Sonicare DiamondClean",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Szczoteczka soniczna Philips Sonicare DiamondClean z 5 trybami i końcówką do czyszczenia dziąseł.",
  },
  {
    id_category: 4,
    product_name: "Oral-B Genius X",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Szczoteczka elektryczna Oral-B Genius X z aplikacją do monitorowania mycia oraz 6 końcówkami.",
  },
  {
    id_category: 4,
    product_name: "Foreo Luna 2",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Urządzenie do oczyszczania twarzy Foreo Luna 2 z silnikiem T-Sonic oraz wymiennymi nakładkami.",
  },
  {
    id_category: 4,
    product_name: "Braun Silk-épil 9",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Depilator Braun Silk-épil 9 z systemem MicroGrip tweezer i wodoodporną konstrukcją.",
  },
  {
    id_category: 4,
    product_name: "GHD Platinum+",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Prostownica do włosów GHD Platinum+ z technologią ultralekką i automatycznym dostosowywaniem temperatury.",
  },
  {
    id_category: 4,
    product_name: "Dyson Supersonic",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Suszarka do włosów Dyson Supersonic z silnikiem o mocy 1600 W i funkcją regulacji temperatury.",
  },
  {
    id_category: 4,
    product_name: "Philips Lumea",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Urządzenie do depilacji laserowej Philips Lumea z 5 nakładkami i trybem automatycznego dostosowywania mocy.",
  },
  {
    id_category: 4,
    product_name: "Olay Regenerist",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Krem przeciwzmarszczkowy Olay Regenerist z kompleksem peptydów i kwasem hialuronowym.",
  },
  {
    id_category: 4,
    product_name: "Clinique Smart Custom-Repair",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Krem do twarzy Clinique Smart Custom-Repair z technologią dostosowywania do potrzeb skóry.",
  },
  {
    id_category: 4,
    product_name: "Estée Lauder Advanced Night Repair",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Serum do twarzy Estée Lauder Advanced Night Repair z kompleksem Chronolux oraz kwasem hialuronowym.",
  },

  // Sport i rozrywka
  {
    id_category: 5,
    product_name: "Xbox Series X",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Konsola Xbox Series X z procesorem AMD Zen 2 i grafiką RDNA 2 oraz możliwością grania w rozdzielczości 4K.",
  },
  {
    id_category: 5,
    product_name: "PlayStation 5",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Konsola PlayStation 5 z procesorem AMD Zen 2 i grafiką RDNA 2 oraz możliwością grania w rozdzielczości 4K.",
  },
  {
    id_category: 5,
    product_name: "Nintendo Switch",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Konsola Nintendo Switch z możliwością grania w trybie przenośnym oraz w trybie stacjonarnym.",
  },
  {
    id_category: 5,
    product_name: "DJI Mavic Air 2",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Dron DJI Mavic Air 2 z kamerą 4K, 3-osiowym stabilizatorem oraz zasięgiem lotu do 34 minut.",
  },
  {
    id_category: 5,
    product_name: "GoPro Hero 9 Black",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Kamera sportowa GoPro Hero 9 Black z kamerą 5K, systemem HyperSmooth 3.0 oraz modułem GPS.",
  },
  {
    id_category: 5,
    product_name: "Fitbit Versa 3",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Opaska fitness Fitbit Versa 3 z GPS, monitorowaniem snu i tętna oraz możliwością kontrolowania muzyki.",
  },
  {
    id_category: 5,
    product_name: "Apple Watch Series 6",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Smartwatch Apple Watch Series 6 z GPS, monitorowaniem tętna, snu i treningów oraz możliwością komunikacji z iPhone.",
  },
  {
    id_category: 5,
    product_name: "Sony WH-1000XM4",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Słuchawki bezprzewodowe Sony WH-1000XM4 z technologią redukcji hałasu oraz czasem działania na baterii do 30 godzin.",
  },
  {
    id_category: 5,
    product_name: "Bose SoundSport Wireless",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Bezprzewodowe słuchawki sportowe Bose SoundSport z technologią StayHear+ oraz czasem działania na baterii do 6 godzin.",
  },
  {
    id_category: 5,
    product_name: "JBL Flip 5",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Przenośny głośnik Bluetooth JBL Flip 5 z wodoodporną konstrukcją i czasem działania na baterii do 12 godzin.",
  },

  //Dzieci i zabawki
  {
    id_category: 6,
    product_name: "LEGO City",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Zestaw klocków LEGO City z motywem miasta i różnymi pojazdami oraz minifigurkami.",
  },
  {
    id_category: 6,
    product_name: "Barbie Dreamhouse",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Dom dla lalek Barbie Dreamhouse z ruchomymi schodami, windą i różnymi akcesoriami.",
  },
  {
    id_category: 6,
    product_name: "Hot Wheels Ultimate Garage",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Zestaw zabawek Hot Wheels Ultimate Garage z wieloma poziomami i torami do wyścigów.",
  },
  {
    id_category: 6,
    product_name: "Fisher-Price Little People",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Zestaw zabawek Fisher-Price Little People z minifigurkami i różnymi akcesoriami oraz dźwiękami.",
  },
  {
    id_category: 6,
    product_name: "Paw Patrol Lookout Tower",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Zestaw zabawek Paw Patrol Lookout Tower z wieżą strażniczą i pojazdami ratunkowymi.",
  },
  {
    id_category: 6,
    product_name: "Nerf N-Strike Elite",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Zestaw zabawek Nerf N-Strike Elite z pistoletem na kulki i różnymi akcesoriami do strzelania.",
  },
  {
    id_category: 6,
    product_name: "Melissa & Doug Wooden Puzzles",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Zestaw drewnianych puzzle Melissa & Doug z różnymi motywami i stopniem trudności.",
  },
  {
    id_category: 6,
    product_name: "Play-Doh Kitchen Creations",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Zestaw zabawek Play-Doh Kitchen Creations z różnymi foremkami i narzędziami do formowania ciasta.",
  },

  {
    id_category: 6,
    product_name: "LEGO Friends",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Zestaw klocków LEGO Friends z motywem miasteczka i różnymi budynkami oraz minifigurkami.",
  },
  {
    id_category: 6,
    product_name: "My Little Pony Equestria Girls",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Zestaw lalek My Little Pony Equestria Girls z różnymi postaciami i akcesoriami.",
  },

  // Samochody i motocykle:

  {
    id_category: 7,
    product_name: "Tesla Model 3",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Samochód elektryczny Tesla Model 3 z silnikiem o mocy do 448 KM i zasięgiem na jednym ładowaniu do 373 km.",
  },
  {
    id_category: 7,
    product_name: "BMW iX3",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Samochód elektryczny BMW iX3 z silnikiem o mocy 286 KM i zasięgiem na jednym ładowaniu do 460 km.",
  },
  {
    id_category: 7,
    product_name: "Chevrolet Bolt EV",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Samochód elektryczny Chevrolet Bolt EV z silnikiem o mocy 200 KM i zasięgiem na jednym ładowaniu do 383 km.",
  },
  {
    id_category: 7,
    product_name: "Harley-Davidson LiveWire",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Motocykl elektryczny Harley-Davidson LiveWire z silnikiem o mocy 105 KM i zasięgiem na jednym ładowaniu do 235 km.",
  },
  {
    id_category: 7,
    product_name: "Zero SR/F",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Motocykl elektryczny Zero SR/F z silnikiem o mocy 110 KM i zasięgiem na jednym ładowaniu do 223 km.",
  },
  {
    id_category: 7,
    product_name: "KTM Freeride E-XC",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Motocykl elektryczny KTM Freeride E-XC z silnikiem o mocy 22 KM i zasięgiem na jednym ładowaniu do 50 km.",
  },

  {
    id_category: 7,
    product_name: "Yamaha PW-X2",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Silnik elektryczny Yamaha PW-X2 z mocą do 250 W i zasięgiem na jednym ładowaniu do 160 km.",
  },
  {
    id_category: 7,
    product_name: "BMW R 1250 GS",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Motocykl turystyczny BMW R 1250 GS z silnikiem boxer o pojemności 1254ccm i mocy 136 KM.",
  },
  {
    id_category: 7,
    product_name: "Ducati Panigale V4",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Motocykl sportowy Ducati Panigale V4 z silnikiem V4 o pojemności 1103ccm i mocy 214 KM.",
  },
  {
    id_category: 7,
    product_name: "Honda Africa Twin",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Motocykl turystyczny Honda Africa Twin z silnikiem o pojemności 1084ccm i mocy 102 KM.",
  },

  // Muzyka i instrumenty:

  {
    id_category: 8,
    product_name: "Fender American Professional Stratocaster",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Gitara Fender American Professional Stratocaster z mostkiem V-Mod oraz przetwornikami V-Mod Single-Coil.",
  },
  {
    id_category: 8,
    product_name: "Gibson Les Paul Standard '50s",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Gitara Gibson Les Paul Standard '50s z mostkiem Nashville Tune-o-matic oraz przetwornikami '57 Classic.",
  },
  {
    id_category: 8,
    product_name: "Martin D-28",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Akustyczna gitara Martin D-28 z płytą wykonaną z Sitka Spruce oraz ramami z Indian Rosewood.",
  },
  {
    id_category: 8,
    product_name: "Yamaha CFX Concert Grand Piano",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Cyfrowy fortepian Yamaha CFX Concert Grand Piano z naturalnym dźwiękiem i dotykiem oraz możliwością połączenia z komputerem.",
  },
  {
    id_category: 8,
    product_name: "Roland TD-27KV V-Drums",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Zestaw perkusyjny Roland TD-27KV V-Drums z naturalnym dźwiękiem oraz możliwością połączenia z komputerem.",
  },
  {
    id_category: 8,
    product_name: "Taylor GS Mini-e Koa Plus",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Akustyczna gitara Taylor GS Mini-e Koa Plus z płytą wykonaną z Koa oraz preampem ES2.",
  },
  {
    id_category: 8,
    product_name: "Bose L1 Model II",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "System nagłośnieniowy Bose L1 Model II z liniami aktywnymi oraz możliwością ustawienia instrumentów oraz mikrofonów.",
  },
  {
    id_category: 8,
    product_name: "Shure SM7B",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Mikrofon dynamiczny Shure SM7B z redukcją szumów i pogłosu oraz możliwością połączenia z komputerem.",
  },
  {
    id_category: 8,
    product_name: "Native Instruments Komplete Kontrol S49 MK2",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Kontroler MIDI Native Instruments Komplete Kontrol S49 MK2 z klawiaturą Fatar oraz możliwością połączenia z komputerem.",
  },
  {
    id_category: 8,
    product_name: "Akai MPC Live II",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Sampler/Workstation Akai MPC Live II z dotykowym ekranem i możliwością pracy w trybie standalone lub połączenia z komputerem.",
  },

  // Kuchnia i jedzenie:

  {
    id_category: 9,
    product_name: "Thermomix TM6",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Robot kuchenny Thermomix TM6 z dotykowym ekranem i funkcjami gotowania, miksowania, blendowania, mielenia itp.",
  },
  {
    id_category: 9,
    product_name: "Instant Pot DUO60",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Urządzenie do gotowania na parze Instant Pot DUO60 z funkcjami gotowania na parze, duszenia, gotowania na wolnym ogniu itp.",
  },
  {
    id_category: 9,
    product_name: "KitchenAid Artisan Stand Mixer",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Mikser ręczny KitchenAid Artisan Stand Mixer z mocą 325 W i różnymi końcówkami do miksowania i ucierania.",
  },
  {
    id_category: 9,
    product_name: "De'Longhi Lattissima Pro",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Ekspres do kawy De'Longhi Lattissima Pro z funkcją automatycznego mleka i możliwością połączenia z aplikacją.",
  },
  {
    id_category: 9,
    product_name: "SousVide Supreme Demi",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Urządzenie do gotowania sous vide SousVide Supreme Demi z funkcją automatycznego utrzymywania temperatury.",
  },
  {
    id_category: 9,
    product_name: "Anova Culinary Sous Vide Precision Cooker",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Urządzenie do gotowania sous vide Anova Culinary Precision Cooker z funkcją połączenia z aplikacją i możliwością regulacji temperatury.",
  },
  {
    id_category: 9,
    product_name: "Breville Smart Oven Pro",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Piekarnik Breville Smart Oven Pro z dotykowym ekranem i funkcjami pieczenia, grillowania, gotowania na parze itp.",
  },
  {
    id_category: 9,
    product_name: "Cuisinart DCC-3200P1 Perfectemp Coffee Maker",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Ekspres do kawy Cuisinart DCC-3200P1 Perfectemp z funkcją automatycznego podgrzewania wody i regulacji mocy kawy.",
  },
  {
    id_category: 9,
    product_name: "Le Creuset Dutch Oven",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Garnki Le Creuset Dutch Oven wykonane ze specjalnej emaliowanej stali szlachetnej, odpornej na wysokie temperatury i idealne do duszenia i gotowania na wolnym ogniu.",
  },
  {
    id_category: 9,
    product_name: "All-Clad Stainless Steel Fry Pan",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Patelnia All-Clad Stainless Steel Fry Pan wykonana ze stali nierdzewnej i posiadająca aluminiowy rdzeń dla równomiernego rozprowadzania ciepła.",
  },

  // Podróże i turystyka:

  {
    id_category: 10,
    product_name: "Osprey Porter 46 Travel Backpack",
    EAN: "44587302301",
    ASIN: "B08FC3YXGX",
    description:
      "Plecak turystyczny Osprey Porter 46 z przegrodami na ubrania i akcesoria oraz możliwością przekształcenia w walizkę.",
  },
  {
    id_category: 10,
    product_name: "Samsonite Cosmolite Spinner",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Walizka Samsonite Cosmolite Spinner z twardą skorupą i kółkami 360 stopni.",
  },
  {
    id_category: 10,
    product_name: "Eagle Creek Global Companion",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Plecak turystyczny Eagle Creek Global Companion z przegrodami na ubrania i akcesoria oraz pasami nośnymi.",
  },
  {
    id_category: 10,
    product_name: "North Face Base Camp Duffel",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Torba North Face Base Camp Duffel z twardą skorupą i trwałymi uchwytami oraz możliwością przekształcenia w plecak.",
  },
  {
    id_category: 10,
    product_name: "Coleman Evanston Tent",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Namiot Coleman Evanston Tent z przestronnym wejściem i oknami oraz możliwością rozbudowy o dodatkowe pomieszczenie.",
  },
  {
    id_category: 10,
    product_name: "Therm-a-Rest NeoAir XLite Sleeping Pad",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Materac Therm-a-Rest NeoAir XLite Sleeping Pad z technologią zwiększającą izolację termiczną i niską wagą.",
  },
  {
    id_category: 10,
    product_name: "Black Diamond Spot Headlamp",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Latarka Black Diamond Spot Headlamp z regulacją mocy i możliwością połączenia z aplikacją.",
  },
  {
    id_category: 10,
    product_name: "MSR Ceramic Solo Pot",
    EAN: "88590983701",
    ASIN: "B08C4YZQQQ",
    description:
      "Garnek MSR Ceramic Solo Pot z pokrywką i uchwytami oraz odporny na wysokie temperatury.",
  },
  {
    id_category: 10,
    product_name: "LifeStraw Personal Water Filter",
    EAN: "88846753601",
    ASIN: "B08CY6YZQQ",
    description:
      "Filtr do wody LifeStraw Personal Water Filter z możliwością oczyszczenia do 4 000 litrów wody i zabezpieczeniem przed bakteriami i pasożytami.",
  },
  {
    id_category: 10,
    product_name: "Garmin GPSMAP 64st",
    EAN: "45487360301",
    ASIN: "B08FC3YXGX",
    description:
      "Nawigacja Garmin GPSMAP 64st z funkcją nawigacji satelitarnej i możliwością połączenia z aplikacją.",
  },
];
