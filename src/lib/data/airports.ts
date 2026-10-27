export type Airport = { code: string; city: string; name: string; country: string };

/** Suggestions for the airport field. Travellers can still type any city or airport. */
export const airports: Airport[] = [
  { code: "JUB", city: "Juba", name: "Juba International Airport", country: "South Sudan" },
  { code: "NBO", city: "Nairobi", name: "Jomo Kenyatta International", country: "Kenya" },
  { code: "EBB", city: "Entebbe", name: "Entebbe International", country: "Uganda" },
  { code: "ADD", city: "Addis Ababa", name: "Bole International", country: "Ethiopia" },
  { code: "KRT", city: "Khartoum", name: "Khartoum International", country: "Sudan" },
  { code: "KGL", city: "Kigali", name: "Kigali International", country: "Rwanda" },
  { code: "DAR", city: "Dar es Salaam", name: "Julius Nyerere International", country: "Tanzania" },
  { code: "ZNZ", city: "Zanzibar", name: "Abeid Amani Karume International", country: "Tanzania" },
  { code: "MBA", city: "Mombasa", name: "Moi International", country: "Kenya" },
  { code: "CAI", city: "Cairo", name: "Cairo International", country: "Egypt" },
  { code: "JNB", city: "Johannesburg", name: "O. R. Tambo International", country: "South Africa" },
  { code: "CPT", city: "Cape Town", name: "Cape Town International", country: "South Africa" },
  { code: "LOS", city: "Lagos", name: "Murtala Muhammed International", country: "Nigeria" },
  { code: "ACC", city: "Accra", name: "Kotoka International", country: "Ghana" },
  { code: "DXB", city: "Dubai", name: "Dubai International", country: "United Arab Emirates" },
  { code: "AUH", city: "Abu Dhabi", name: "Zayed International", country: "United Arab Emirates" },
  { code: "DOH", city: "Doha", name: "Hamad International", country: "Qatar" },
  { code: "JED", city: "Jeddah", name: "King Abdulaziz International", country: "Saudi Arabia" },
  { code: "RUH", city: "Riyadh", name: "King Khalid International", country: "Saudi Arabia" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport", country: "Türkiye" },
  { code: "LHR", city: "London", name: "Heathrow", country: "United Kingdom" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
  { code: "FCO", city: "Rome", name: "Fiumicino", country: "Italy" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport", country: "Germany" },
  { code: "AMS", city: "Amsterdam", name: "Schiphol", country: "Netherlands" },
  { code: "BRU", city: "Brussels", name: "Brussels Airport", country: "Belgium" },
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi International", country: "India" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International", country: "India" },
  { code: "MLE", city: "Malé", name: "Velana International", country: "Maldives" },
  { code: "DPS", city: "Bali", name: "Ngurah Rai International", country: "Indonesia" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi", country: "Thailand" },
  { code: "PEK", city: "Beijing", name: "Beijing Capital International", country: "China" },
  { code: "CAN", city: "Guangzhou", name: "Baiyun International", country: "China" },
  { code: "JFK", city: "New York", name: "John F. Kennedy International", country: "United States" },
  { code: "IAD", city: "Washington, D.C.", name: "Dulles International", country: "United States" },
  { code: "YYZ", city: "Toronto", name: "Pearson International", country: "Canada" },
  { code: "SYD", city: "Sydney", name: "Kingsford Smith", country: "Australia" },
];

export function formatAirport(a: Airport) {
  return `${a.city} (${a.code})`;
}
