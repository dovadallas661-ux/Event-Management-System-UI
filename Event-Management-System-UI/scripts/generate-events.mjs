import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const seed = [
  {
    id: "evt-001",
    name: "Cloud Innovation Summit",
    date: "2024-10-15",
    time: "09:00",
    category: "Technology",
    location: "Boston, MA",
    speaker: "Jane Doe",
    status: "Completed",
    registrations: 842,
    checkIns: 791,
    revenue: 126300,
    capacity: 900,
    ticketPrice: 150,
    description:
      "A full-day summit exploring cloud architecture, platform engineering, and enterprise transformation.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-002",
    name: "Blockchain Revolution Conference",
    date: "2024-11-05",
    time: "10:00",
    category: "Technology",
    location: "New York, NY",
    speaker: "Dr. Peter Smith",
    status: "In Progress",
    registrations: 610,
    checkIns: 402,
    revenue: 134200,
    capacity: 700,
    ticketPrice: 220,
    description:
      "Conference on distributed systems, digital assets, and practical blockchain applications.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-003",
    name: "AI in Healthcare Symposium",
    date: "2024-12-01",
    time: "08:30",
    category: "Healthcare",
    location: "Chicago, IL",
    speaker: "Dr. Aisha Malik",
    status: "Completed",
    registrations: 520,
    checkIns: 498,
    revenue: 98800,
    capacity: 550,
    ticketPrice: 190,
    description:
      "Clinical leaders discuss AI diagnostics, patient operations, and ethical healthcare data use.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-004",
    name: "Future of Fintech Forum",
    date: "2024-10-25",
    time: "09:30",
    category: "Finance",
    location: "San Francisco, CA",
    speaker: "John Lee",
    status: "Completed",
    registrations: 734,
    checkIns: 701,
    revenue: 161480,
    capacity: 800,
    ticketPrice: 220,
    description:
      "Payments, open banking, and regulatory technology for modern financial products.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-005",
    name: "Data Analytics in Business",
    date: "2024-11-12",
    time: "11:00",
    category: "Workshops",
    location: "Austin, TX",
    speaker: "Rachel Moore",
    status: "Completed",
    registrations: 388,
    checkIns: 360,
    revenue: 46560,
    capacity: 400,
    ticketPrice: 120,
    description:
      "Hands-on workshop covering dashboards, forecasting, and decision systems for operators.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-006",
    name: "Sustainable Energy Expo",
    date: "2024-09-28",
    time: "10:00",
    category: "Energy",
    location: "Denver, CO",
    speaker: "Prof. Alan Green",
    status: "Completed",
    registrations: 915,
    checkIns: 870,
    revenue: 137250,
    capacity: 1000,
    ticketPrice: 150,
    description:
      "Exhibition of renewable infrastructure, grid modernization, and climate-tech partnerships.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-007",
    name: "Web3 Interfaces Workshop",
    date: "2024-10-10",
    time: "13:00",
    category: "Workshops",
    location: "Seattle, WA",
    speaker: "Kevin Adams",
    status: "In Progress",
    registrations: 210,
    checkIns: 148,
    revenue: 18900,
    capacity: 250,
    ticketPrice: 90,
    description:
      "Product and design workshop for wallet UX, identity, and decentralized application interfaces.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-008",
    name: "Cybersecurity for Startups",
    date: "2024-11-19",
    time: "09:00",
    category: "Technology",
    location: "Atlanta, GA",
    speaker: "Emily Zhang",
    status: "Completed",
    registrations: 446,
    checkIns: 421,
    revenue: 57980,
    capacity: 480,
    ticketPrice: 130,
    description:
      "Practical security operations, incident response, and compliance for early-stage teams.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-009",
    name: "Smart Cities Forum",
    date: "2024-10-18",
    time: "08:45",
    category: "Technology",
    location: "Washington, DC",
    speaker: "Dr. Maria Hernandez",
    status: "In Progress",
    registrations: 672,
    checkIns: 390,
    revenue: 127680,
    capacity: 750,
    ticketPrice: 190,
    description:
      "Urban mobility, civic data platforms, and infrastructure for connected cities.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt-010",
    name: "Tech Safari Mixer",
    date: "2024-09-30",
    time: "18:00",
    category: "Networking",
    location: "Los Angeles, CA",
    speaker: "Guest Panel",
    status: "In Progress",
    registrations: 320,
    checkIns: 198,
    revenue: 16000,
    capacity: 350,
    ticketPrice: 50,
    description:
      "Evening mixer connecting founders, operators, and product talent across the west coast.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },
]

const extras = [
  ["Product Leadership Retreat", "Workshops", "Miami, FL", "Olivia Grant", "Upcoming"],
  ["DevOps Reliability Day", "Technology", "Portland, OR", "Marcus Chen", "Upcoming"],
  ["Women in STEM Gala", "Networking", "Toronto, ON", "Priya Nair", "Upcoming"],
  ["Climate Capital Roundtable", "Finance", "London, UK", "James Okonkwo", "Upcoming"],
  ["Hospital Operations Lab", "Healthcare", "Houston, TX", "Dr. Lena Ortiz", "Completed"],
  ["EdTech Classroom Summit", "Education", "Boston, MA", "Hannah Brooks", "Completed"],
  ["Logistics Automation Expo", "Technology", "Chicago, IL", "Daniel Ike", "In Progress"],
  ["Creative Directors Forum", "Networking", "Paris, FR", "Camille Dubois", "Cancelled"],
  ["Quantum Computing Briefing", "Technology", "Zurich, CH", "Prof. Ingrid Haas", "Upcoming"],
  ["Customer Success Live", "Workshops", "New York, NY", "Tara Williams", "Completed"],
  ["Lagos TechForward Summit", "Technology", "Lagos, NG", "Samuel Adeyemi", "Upcoming"],
  ["Retail Experience Lab", "Workshops", "Dallas, TX", "Noah Patel", "Completed"],
  ["Bioinformatics Meetup", "Healthcare", "Cambridge, MA", "Dr. Kenji Sato", "In Progress"],
  ["Public Sector Cloud Day", "Technology", "Ottawa, ON", "Amelia Scott", "Completed"],
  ["Founder Capital Night", "Finance", "San Francisco, CA", "Guest Panel", "Cancelled"],
  ["Design Systems Workshop", "Workshops", "Berlin, DE", "Elena Vogt", "Upcoming"],
  ["Music Tech Showcase", "Networking", "Nashville, TN", "Chris Alvarez", "Completed"],
  ["Agritech Field Day", "Energy", "Des Moines, IA", "Prof. Alan Green", "Completed"],
  ["People Ops Summit", "Workshops", "Austin, TX", "Maya Johnson", "In Progress"],
  ["Open Source Maintainers Con", "Technology", "Barcelona, ES", "Luca Bianchi", "Upcoming"],
  ["Insurance Innovation Day", "Finance", "Hartford, CT", "Helen Park", "Completed"],
  ["Sports Analytics Forum", "Technology", "Manchester, UK", "Owen Clarke", "Upcoming"],
  ["Mental Health in Tech", "Healthcare", "Seattle, WA", "Dr. Aisha Malik", "Completed"],
  ["Campus Recruiting Mixer", "Networking", "Ann Arbor, MI", "Guest Panel", "Upcoming"],
  ["SaaS Pricing Workshop", "Workshops", "New York, NY", "John Lee", "In Progress"],
  ["Battery Storage Expo", "Energy", "Munich, DE", "Prof. Ingrid Haas", "Completed"],
  ["LegalTech Briefing", "Finance", "Washington, DC", "Emily Zhang", "Cancelled"],
  ["Community Builder Conference", "Networking", "Cape Town, ZA", "Naledi Moyo", "Upcoming"],
  ["Mobile UX Intensive", "Workshops", "Seoul, KR", "Minji Park", "Completed"],
  ["Satellite Connectivity Day", "Technology", "Houston, TX", "Dr. Maria Hernandez", "Upcoming"],
  ["Nonprofit Fundraising Lab", "Workshops", "Atlanta, GA", "Rachel Moore", "Completed"],
  ["AI Safety Roundtable", "Technology", "Oxford, UK", "Dr. Peter Smith", "In Progress"],
  ["Hospitality Tech Expo", "Technology", "Las Vegas, NV", "Kevin Adams", "Completed"],
  ["Youth Coding Festival", "Education", "Accra, GH", "Kwame Mensah", "Upcoming"],
  ["Supply Chain Resilience", "Workshops", "Singapore, SG", "Wei Lin", "Completed"],
  ["Digital Banking Forum", "Finance", "Dubai, AE", "Fatima Al Hassan", "In Progress"],
  ["Astronomy Night Mixer", "Networking", "Pasadena, CA", "Guest Panel", "Upcoming"],
  ["Clinical Trials Workshop", "Healthcare", "Philadelphia, PA", "Dr. Lena Ortiz", "Completed"],
  ["Green Buildings Summit", "Energy", "Copenhagen, DK", "Sofia Berg", "Upcoming"],
  ["Creator Economy Day", "Networking", "Los Angeles, CA", "Chris Alvarez", "Cancelled"],
  ["Observability Deep Dive", "Technology", "Denver, CO", "Marcus Chen", "Completed"],
  ["HR Analytics Forum", "Workshops", "Chicago, IL", "Maya Johnson", "Upcoming"],
  ["Port Operations Expo", "Technology", "Rotterdam, NL", "Pieter de Vries", "Completed"],
  ["Film & VFX Tech Day", "Technology", "Vancouver, BC", "Hannah Brooks", "In Progress"],
  ["Microfinance Summit", "Finance", "Nairobi, KE", "Amina Wanjiku", "Upcoming"],
  ["Robotics in Manufacturing", "Technology", "Detroit, MI", "Daniel Ike", "Completed"],
  ["Library Innovation Lab", "Education", "Boston, MA", "Olivia Grant", "Upcoming"],
  ["Food Systems Conference", "Energy", "Portland, OR", "Elena Vogt", "Completed"],
  ["Privacy Engineering Day", "Technology", "Brussels, BE", "Luca Bianchi", "In Progress"],
  ["Alumni Founders Mixer", "Networking", "New York, NY", "Jane Doe", "Upcoming"],
  ["Telehealth Operations", "Healthcare", "Phoenix, AZ", "Dr. Kenji Sato", "Completed"],
  ["Wind Energy Briefing", "Energy", "Edinburgh, UK", "Owen Clarke", "Upcoming"],
  ["E-commerce Growth Lab", "Workshops", "Shenzhen, CN", "Wei Lin", "Completed"],
  ["Civic Design Forum", "Workshops", "Washington, DC", "Amelia Scott", "In Progress"],
  ["Game Developer Night", "Networking", "Tokyo, JP", "Minji Park", "Upcoming"],
  ["Treasury Leadership Summit", "Finance", "Zurich, CH", "Helen Park", "Completed"],
  ["Water Infrastructure Expo", "Energy", "Cape Town, ZA", "Naledi Moyo", "Upcoming"],
  ["Accessibility in Product", "Workshops", "London, UK", "Tara Williams", "Completed"],
  ["Space Commerce Forum", "Technology", "Houston, TX", "Dr. Maria Hernandez", "In Progress"],
  ["Teacher Tools Conference", "Education", "Lagos, NG", "Samuel Adeyemi", "Upcoming"],
  ["Brand Strategy Intensive", "Workshops", "Milan, IT", "Camille Dubois", "Cancelled"],
  ["Incident Command Lab", "Technology", "Atlanta, GA", "Emily Zhang", "Completed"],
  ["Impact Investing Forum", "Finance", "Stockholm, SE", "Sofia Berg", "Upcoming"],
  ["Pediatric Care Symposium", "Healthcare", "Toronto, ON", "Dr. Aisha Malik", "Completed"],
  ["Nightlife Tech Mixer", "Networking", "Miami, FL", "Guest Panel", "In Progress"],
  ["Chip Design Briefing", "Technology", "Austin, TX", "Marcus Chen", "Upcoming"],
  ["Circular Economy Expo", "Energy", "Amsterdam, NL", "Pieter de Vries", "Completed"],
  ["Sales Enablement Day", "Workshops", "Dallas, TX", "John Lee", "Upcoming"],
  ["Museum Digital Forum", "Education", "Paris, FR", "Camille Dubois", "Completed"],
  ["Maritime Security Summit", "Technology", "Singapore, SG", "Wei Lin", "In Progress"],
  ["Wellness at Work", "Healthcare", "Denver, CO", "Maya Johnson", "Upcoming"],
  ["Community Solar Workshop", "Energy", "Phoenix, AZ", "Prof. Alan Green", "Completed"],
  ["Indie Publisher Con", "Networking", "Brooklyn, NY", "Olivia Grant", "Cancelled"],
  ["Platform Engineering Day", "Technology", "Seattle, WA", "Kevin Adams", "Upcoming"],
  ["Credit Risk Lab", "Finance", "Charlotte, NC", "Helen Park", "Completed"],
  ["Emergency Medicine Tech", "Healthcare", "Baltimore, MD", "Dr. Lena Ortiz", "In Progress"],
  ["University-Industry Day", "Education", "Stanford, CA", "Priya Nair", "Upcoming"],
  ["Hydrogen Economy Forum", "Energy", "Oslo, NO", "Sofia Berg", "Completed"],
  ["Local Creators Mixer", "Networking", "Accra, GH", "Kwame Mensah", "Upcoming"],
  ["API Governance Workshop", "Workshops", "Berlin, DE", "Elena Vogt", "Completed"],
  ["Defense Innovation Briefing", "Technology", "Arlington, VA", "Amelia Scott", "Cancelled"],
  ["Family Office Summit", "Finance", "Palm Beach, FL", "James Okonkwo", "Upcoming"],
  ["Pharmacy Operations Day", "Healthcare", "Indianapolis, IN", "Rachel Moore", "Completed"],
  ["STEM for Girls Festival", "Education", "Nairobi, KE", "Amina Wanjiku", "Upcoming"],
  ["Urban Farming Expo", "Energy", "Detroit, MI", "Noah Patel", "In Progress"],
  ["After Hours Founders", "Networking", "San Francisco, CA", "Jane Doe", "Upcoming"],
  ["Search Quality Workshop", "Workshops", "Mountain View, CA", "Minji Park", "Completed"],
  ["Payments in Africa Forum", "Finance", "Lagos, NG", "Samuel Adeyemi", "In Progress"],
  ["Trauma Care Conference", "Healthcare", "Boston, MA", "Dr. Kenji Sato", "Upcoming"],
  ["Vocational Skills Fair", "Education", "Manchester, UK", "Owen Clarke", "Completed"],
]

const images = [
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
]

function pad(n) {
  return String(n).padStart(3, "0")
}

const events = [...seed]
let i = 11
for (const [name, category, location, speaker, status] of extras) {
  const month = ((i * 3) % 12) + 1
  const day = ((i * 5) % 27) + 1
  const year = status === "Upcoming" ? 2026 : 2025
  const capacity = 200 + ((i * 37) % 800)
  const ticketPrice = 40 + ((i * 17) % 240)
  const registrations = Math.min(capacity, 40 + ((i * 53) % capacity))
  const checkIns =
    status === "Upcoming"
      ? 0
      : Math.min(registrations, Math.round(registrations * (0.55 + ((i % 4) * 0.1))))
  const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  events.push({
    id: `evt-${pad(i)}`,
    name,
    date,
    time: ["08:30", "09:00", "10:00", "13:00", "18:00"][i % 5],
    category,
    location,
    speaker,
    status,
    registrations,
    checkIns,
    revenue: registrations * ticketPrice,
    capacity,
    ticketPrice,
    description: `${name} brings together practitioners in ${category.toLowerCase()} for talks, workshops, and networking in ${location}.`,
    image: images[i % images.length],
  })
  i += 1
}

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data")
writeFileSync(join(dir, "events.json"), JSON.stringify(events, null, 2))
console.log(`Wrote ${events.length} events`)
