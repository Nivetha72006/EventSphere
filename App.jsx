// import { useState, useEffect, useRef } from "react";
 
// // ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
// const T = {
//   gold: "#C9A84C",
//   goldLight: "#F0D080",
//   goldDark: "#8B6914",
//   rose: "#E8A0B4",
//   roseDark: "#C4607A",
//   ink: "#1A1025",
//   inkMid: "#2D1F3D",
//   inkSoft: "#3D2F50",
//   muted: "#7B6890",
//   surface: "#F9F5FF",
//   surfaceCard: "#FFFFFF",
//   border: "#E8DFF5",
//   success: "#2ECC71",
//   warning: "#F39C12",
//   error: "#E74C3C",
//   gradient: "linear-gradient(135deg, #1A1025 0%, #2D1F3D 50%, #3D2F50 100%)",
//   gradientGold: "linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)",
// };
 
// // ─── AI HELPER ───────────────────────────────────────────────────────────────
// async function callAI(systemPrompt, userMessage, onChunk) {
//   try {
//     const response = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "claude-sonnet-4-6",
//         max_tokens: 1000,
//         stream: true,
//         system: systemPrompt,
//         messages: [{ role: "user", content: userMessage }],
//       }),
//     });
//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let full = "";
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;
//       const lines = decoder.decode(value).split("\n");
//       for (const line of lines) {
//         if (line.startsWith("data: ")) {
//           try {
//             const d = JSON.parse(line.slice(6));
//             if (d.type === "content_block_delta" && d.delta?.text) {
//               full += d.delta.text;
//               onChunk && onChunk(full);
//             }
//           } catch {}
//         }
//       }
//     }
//     return full;
//   } catch (e) {
//     return "AI service unavailable. Please try again.";
//   }
// }
 
// // ─── MOCK DATA ────────────────────────────────────────────────────────────────
// const VENDORS = {
//   catering: [
//     { id: "c1", name: "Royal Feast Caterers", rating: 4.8, price: "high", city: "Chennai", speciality: "South Indian, Multi-cuisine", img: "🍽️", reviews: 142, verified: true },
//     { id: "c2", name: "Spice Garden", rating: 4.5, price: "medium", city: "Coimbatore", speciality: "Chettinad, North Indian", img: "🥘", reviews: 98, verified: true },
//     { id: "c3", name: "Budget Bites", rating: 4.1, price: "low", city: "Madurai", speciality: "Traditional South Indian", img: "🍛", reviews: 67, verified: false },
//   ],
//   decoration: [
//     { id: "d1", name: "Dream Decors", rating: 4.9, price: "high", city: "Chennai", speciality: "Floral, Theme decor", img: "🌸", reviews: 203, verified: true },
//     { id: "d2", name: "Elegant Events", rating: 4.6, price: "medium", city: "Trichy", speciality: "Modern, Minimalist", img: "✨", reviews: 115, verified: true },
//     { id: "d3", name: "Simple Setups", rating: 4.0, price: "low", city: "Salem", speciality: "Traditional decor", img: "🎊", reviews: 44, verified: false },
//   ],
//   photographer: [
//     { id: "p1", name: "Moments by Karthik", rating: 4.9, price: "high", city: "Chennai", speciality: "Candid, Cinematic", img: "📸", reviews: 178, verified: true },
//     { id: "p2", name: "Click & Capture", rating: 4.5, price: "medium", city: "Madurai", speciality: "Traditional, Candid", img: "🎥", reviews: 89, verified: true },
//     { id: "p3", name: "Budget Frames", rating: 3.9, price: "low", city: "Trichy", speciality: "Basic photography", img: "📷", reviews: 31, verified: false },
//   ],
//   makeup: [
//     { id: "m1", name: "Glam Studio by Priya", rating: 4.8, price: "high", city: "Chennai", speciality: "Bridal, HD Makeup", img: "💄", reviews: 156, verified: true },
//     { id: "m2", name: "Belle Artistry", rating: 4.4, price: "medium", city: "Coimbatore", speciality: "Bridal, Party makeup", img: "💅", reviews: 72, verified: true },
//     { id: "m3", name: "Natural Glow", rating: 4.0, price: "low", city: "Salem", speciality: "Natural makeup", img: "🌿", reviews: 28, verified: false },
//   ],
//   costume: [
//     { id: "cos1", name: "Silk Route Designers", rating: 4.7, price: "high", city: "Kanchipuram", speciality: "Silk sarees, Lehengas", img: "👗", reviews: 134, verified: true },
//     { id: "cos2", name: "Trendy Threads", rating: 4.3, price: "medium", city: "Chennai", speciality: "Designer wear", img: "👘", reviews: 88, verified: true },
//     { id: "cos3", name: "Affordable Fashion", rating: 3.8, price: "low", city: "Madurai", speciality: "Traditional wear", img: "🥻", reviews: 22, verified: false },
//   ],
//   returnGift: [
//     { id: "r1", name: "Gift Galaxy", rating: 4.6, price: "high", city: "Chennai", speciality: "Customized gifts, Hampers", img: "🎁", reviews: 99, verified: true },
//     { id: "r2", name: "Memory Makers", rating: 4.2, price: "medium", city: "Coimbatore", speciality: "Personalized gifts", img: "🎀", reviews: 55, verified: true },
//     { id: "r3", name: "Budget Giftz", rating: 3.7, price: "low", city: "Trichy", speciality: "Bulk gifts", img: "📦", reviews: 18, verified: false },
//   ],
// };
 
// const CATEGORIES = [
//   { key: "catering", label: "Catering", icon: "🍽️", desc: "From traditional feasts to multi-cuisine spreads" },
//   { key: "decoration", label: "Decoration", icon: "🌸", desc: "Transform venues into breathtaking spaces" },
//   { key: "photographer", label: "Photography", icon: "📸", desc: "Capture memories that last forever" },
//   { key: "makeup", label: "Makeup", icon: "💄", desc: "Look your absolute best on your special day" },
//   { key: "costume", label: "Costume Design", icon: "👗", desc: "Curated outfits for every occasion" },
//   { key: "returnGift", label: "Return Gifts", icon: "🎁", desc: "Make your guests feel cherished" },
// ];
 
// const DESIGN_CARDS = [
//   { key: "invitation", label: "Invitation Cards", icon: "💌", desc: "Design & print beautiful cards" },
//   { key: "stage", label: "Stage Decoration", icon: "🎭", desc: "AI-curated stage themes" },
//   { key: "mehandi", label: "Mehandi Design", icon: "🌿", desc: "Traditional & fusion patterns" },
//   { key: "dress", label: "Dress & Outfit", icon: "👗", desc: "Customize your perfect look" },
//   { key: "menu", label: "Menu Design", icon: "📋", desc: "Craft the perfect menu" },
//   { key: "returnGiftDesign", label: "Return Gift Ideas", icon: "🎁", desc: "Unique gifting concepts" },
//   { key: "jewel", label: "Jewellery", icon: "💎", desc: "Complement your attire" },
//   { key: "album", label: "Photo Album", icon: "📖", desc: "Curated album designs" },
// ];
 
// // ─── STYLES ──────────────────────────────────────────────────────────────────
// const S = {
//   app: { fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: T.surface, color: T.ink },
//   navBar: { background: T.gradient, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, boxShadow: "0 4px 24px rgba(0,0,0,0.25)", position: "sticky", top: 0, zIndex: 100 },
//   logo: { fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: T.goldLight, letterSpacing: 1 },
//   btn: (v = "gold") => ({
//     padding: "10px 22px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
//     background: v === "gold" ? T.gradientGold : v === "outline" ? "transparent" : v === "danger" ? T.error : T.inkMid,
//     color: v === "gold" ? T.ink : v === "outline" ? T.gold : "#fff",
//     border: v === "outline" ? `2px solid ${T.gold}` : "none",
//     transition: "all 0.2s", boxShadow: v === "gold" ? "0 4px 12px rgba(201,168,76,0.35)" : "none",
//   }),
//   card: { background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(26,16,37,0.08)", border: `1px solid ${T.border}`, padding: 24, transition: "transform 0.2s, box-shadow 0.2s" },
//   input: { width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontSize: 15, outline: "none", background: "#fff", boxSizing: "border-box", color: T.ink },
//   label: { fontSize: 13, fontWeight: 600, color: T.muted, marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: 0.5 },
//   tag: (color) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: color === "gold" ? "#FFF8E1" : color === "green" ? "#E8F5E9" : "#FCE4EC", color: color === "gold" ? T.goldDark : color === "green" ? "#2E7D32" : T.roseDark }),
//   heroGrad: { background: T.gradient, padding: "60px 32px", textAlign: "center", color: "#fff" },
// };
 
// // ─── AUTH SCREEN ─────────────────────────────────────────────────────────────
// function AuthScreen({ onLogin }) {
//   const [mode, setMode] = useState("login"); // login | signup
//   const [role, setRole] = useState("user");
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
 
//   // Simulated user DB
//   const USERS = { "user@demo.com": { password: "demo123", name: "Ananya Rajan", role: "user" }, "vendor@demo.com": { password: "demo123", name: "Rajesh Caterers", role: "vendor" } };
 
//   const handleSubmit = () => {
//     setError("");
//     if (mode === "login") {
//       const u = USERS[form.email];
//       if (!u || u.password !== form.password) return setError("Invalid email or password.");
//       if (u.role !== role) return setError(`This account is a ${u.role} account. Please select the correct role.`);
//       onLogin({ name: u.name, email: form.email, role: u.role });
//     } else {
//       if (!form.name || !form.email || !form.password) return setError("All fields are required.");
//       if (form.password !== form.confirm) return setError("Passwords do not match.");
//       onLogin({ name: form.name, email: form.email, role });
//     }
//   };
 
//   return (
//     <div style={{ minHeight: "100vh", background: T.gradient, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
//       <div style={{ background: "#fff", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}>
//         <div style={{ textAlign: "center", marginBottom: 32 }}>
//           <div style={{ fontSize: 40, marginBottom: 8 }}></div>
//           <div style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: T.ink }}>EventSphere</div>
//           <div style={{ color: T.muted, fontSize: 14, marginTop: 4 }}>Plan your perfect celebration</div>
//         </div>
 
//         {/* Role Toggle */}
//         <div style={{ display: "flex", background: T.surface, borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
//           {["user", "vendor"].map(r => (
//             <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "10px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: role === r ? T.gradientGold : "transparent", color: role === r ? T.ink : T.muted, transition: "all 0.2s" }}>
//               {r === "user" ? "👤 Customer" : "🏪 Vendor"}
//             </button>
//           ))}
//         </div>
 
//         {/* Mode Toggle */}
//         <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
//           {["login", "signup"].map(m => (
//             <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "8px", border: `2px solid ${mode === m ? T.gold : T.border}`, borderRadius: 9, cursor: "pointer", fontWeight: 600, background: mode === m ? "#FFF8E1" : "#fff", color: mode === m ? T.goldDark : T.muted }}>
//               {m === "login" ? "Sign In" : "Create Account"}
//             </button>
//           ))}
//         </div>
 
//         {mode === "signup" && (
//           <div style={{ marginBottom: 16 }}>
//             <label style={S.label}>Full Name</label>
//             <input style={S.input} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//           </div>
//         )}
//         <div style={{ marginBottom: 16 }}>
//           <label style={S.label}>Email</label>
//           <input style={S.input} placeholder={role === "user" ? "user@demo.com" : "vendor@demo.com"} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//         </div>
//         <div style={{ marginBottom: 16 }}>
//           <label style={S.label}>Password</label>
//           <input style={S.input} type="password" placeholder={mode === "login" ? "demo123" : "Create password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
//         </div>
//         {mode === "signup" && (
//           <div style={{ marginBottom: 16 }}>
//             <label style={S.label}>Confirm Password</label>
//             <input style={S.input} type="password" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
//           </div>
//         )}
 
//         {error && <div style={{ background: "#FFF0F0", border: `1px solid ${T.error}`, borderRadius: 8, padding: "10px 14px", color: T.error, fontSize: 14, marginBottom: 16 }}>⚠️ {error}</div>}
 
//         <button style={{ ...S.btn("gold"), width: "100%", padding: "14px", fontSize: 16, borderRadius: 12 }} onClick={handleSubmit}>
//           {mode === "login" ? "Sign In →" : "Create Account →"}
//         </button>
 
//         <div style={{ marginTop: 16, padding: 12, background: T.surface, borderRadius: 10, fontSize: 12, color: T.muted }}>
//           <strong>Demo:</strong> user@demo.com / vendor@demo.com · password: demo123
//         </div>
//       </div>
//     </div>
//   );
// }
 
// // ─── NAVBAR ──────────────────────────────────────────────────────────────────
// function NavBar({ user, tab, setTab, onLogout }) {
//   const userTabs = ["Home", "Create Event", "Marketplace", "Event Planner", "Create Design"];
//   const vendorTabs = ["Dashboard", "Orders", "Profile"];
 
//   const tabs = user.role === "user" ? userTabs : vendorTabs;
//   return (
//     <nav style={S.navBar}>
//       <div style={S.logo}>EventSphere</div>
//       <div style={{ display: "flex", gap: 4 }}>
//         {tabs.map(t => (
//           <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: tab === t ? "rgba(201,168,76,0.25)" : "transparent", color: tab === t ? T.goldLight : "rgba(255,255,255,0.7)", transition: "all 0.2s" }}>
//             {t}
//           </button>
//         ))}
//       </div>
//       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//         <div style={{ textAlign: "right" }}>
//           <div style={{ color: T.goldLight, fontWeight: 600, fontSize: 14 }}>{user.name}</div>
//           <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{user.role === "vendor" ? "🏪 Vendor" : "👤 Customer"}</div>
//         </div>
//         <button onClick={onLogout} style={{ ...S.btn("outline"), padding: "7px 14px", fontSize: 13 }}>Sign Out</button>
//       </div>
//     </nav>
//   );
// }
 
// // ─── HOME TAB ────────────────────────────────────────────────────────────────
// function HomeTab({ user, setTab }) {
//   return (
//     <div>
//       <div style={S.heroGrad}>
//         <div style={{ fontSize: 20, color: T.goldLight, marginBottom: 8 }}>Welcome back, {user.name.split(" ")[0]} ✨</div>
//         <h1 style={{ fontFamily: "Georgia, serif", fontSize: 48, margin: "0 0 16px", fontWeight: 700 }}>Plan Your Dream Event</h1>
//         <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, maxWidth: 560, margin: "0 auto 32px" }}>From intimate gatherings to grand celebrations — powered by AI, perfected for you.</p>
//         <button style={{ ...S.btn("gold"), padding: "14px 36px", fontSize: 16, borderRadius: 14 }} onClick={() => setTab("Create Event")}>🎉 Create New Event</button>
//       </div>
 
//       <div style={{ padding: "48px 32px" }}>
//         <div style={{ textAlign: "center", marginBottom: 40 }}>
//           <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, margin: "0 0 8px" }}>Everything for your celebration</h2>
//           <p style={{ color: T.muted }}>Browse our curated vendor marketplace</p>
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 900, margin: "0 auto" }}>
//           {CATEGORIES.map(c => (
//             <div key={c.key} style={{ ...S.card, cursor: "pointer", textAlign: "center" }} onClick={() => setTab("Marketplace")}>
//               <div style={{ fontSize: 40, marginBottom: 12 }}>{c.icon}</div>
//               <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{c.label}</div>
//               <div style={{ color: T.muted, fontSize: 13 }}>{c.desc}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
 
// // ─── CREATE EVENT ─────────────────────────────────────────────────────────────
// function CreateEventTab({ event, setEvent }) {
//   const [saved, setSaved] = useState(false);
//   const [aiSuggestion, setAiSuggestion] = useState("");
//   const [loadingAI, setLoadingAI] = useState(false);
 
//   const handleSave = () => {
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };
 
//   const getAISuggestion = async () => {
//     if (!event.type || !event.budget || !event.guestCount) return;
//     setLoadingAI(true);
//     setAiSuggestion("");
//     await callAI(
//       "You are an expert Indian wedding and event planner. Give concise, practical suggestions.",
//       `Event type: ${event.type}, Budget: ₹${event.budget}, Guests: ${event.guestCount}, Venue: ${event.venue || "TBD"}, Date: ${event.date || "TBD"}. Give 3 short key tips for this event.`,
//       (text) => setAiSuggestion(text)
//     );
//     setLoadingAI(false);
//   };
 
//   const fields = [
//     { key: "type", label: "Event Type", placeholder: "e.g. Wedding, Birthday, Reception...", type: "text" },
//     { key: "venue", label: "Venue", placeholder: "Venue name or location", type: "text" },
//     { key: "date", label: "Event Date", placeholder: "", type: "date" },
//     { key: "time", label: "Event Time", placeholder: "", type: "time" },
//     { key: "budget", label: "Total Budget (₹)", placeholder: "e.g. 500000", type: "number" },
//     { key: "guestCount", label: "Guest Count", placeholder: "Expected number of guests", type: "number" },
//     { key: "address", label: "Home Address (for sample delivery)", placeholder: "Full address for vendor samples", type: "text" },
//   ];
 
//   return (
//     <div style={{ padding: "40px 32px", maxWidth: 700, margin: "0 auto" }}>
//       <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, marginBottom: 8 }}>🎉 Create Your Event</h2>
//       <p style={{ color: T.muted, marginBottom: 32 }}>Fill in the details and let EventSphere do the magic.</p>
 
//       <div style={{ ...S.card }}>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
//           {fields.map(f => (
//             <div key={f.key} style={{ gridColumn: f.key === "address" ? "1 / -1" : "auto" }}>
//               <label style={S.label}>{f.label}</label>
//               <input style={S.input} type={f.type} placeholder={f.placeholder} value={event[f.key] || ""} onChange={e => setEvent({ ...event, [f.key]: e.target.value })} />
//             </div>
//           ))}
//         </div>
 
//         <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
//           <button style={S.btn("gold")} onClick={handleSave}>{saved ? "✅ Saved!" : "Save Event Details"}</button>
//           <button style={S.btn("outline")} onClick={getAISuggestion} disabled={loadingAI}>{loadingAI ? "🤖 Thinking..." : "✨ Get AI Tips"}</button>
//         </div>
 
//         {aiSuggestion && (
//           <div style={{ marginTop: 20, padding: 18, background: "#FFF8E1", borderRadius: 12, border: `1px solid ${T.goldLight}` }}>
//             <div style={{ fontWeight: 700, color: T.goldDark, marginBottom: 8 }}>✨ AI Planner Suggestions</div>
//             <div style={{ color: T.ink, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{aiSuggestion}</div>
//           </div>
//         )}
//       </div>
 
//       {event.type && (
//         <div style={{ marginTop: 20, ...S.card, background: "linear-gradient(135deg, #F9F5FF, #FFF8E1)" }}>
//           <div style={{ fontWeight: 700, marginBottom: 12, color: T.goldDark }}>📋 Event Summary</div>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14 }}>
//             {Object.entries(event).filter(([k, v]) => v).map(([k, v]) => (
//               <div key={k}><span style={{ color: T.muted, textTransform: "capitalize" }}>{k.replace(/([A-Z])/g, " $1")}: </span><strong>{k === "budget" ? `₹${Number(v).toLocaleString("en-IN")}` : v}</strong></div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
 
// // ─── MARKETPLACE ─────────────────────────────────────────────────────────────
// function MarketplaceTab({ selectedVendors, setSelectedVendors, event }) {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [priceFilter, setPriceFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("rating");
 
//   const getVendors = () => {
//     if (!activeCategory) return [];
//     let v = [...(VENDORS[activeCategory] || [])];
//     if (priceFilter !== "all") v = v.filter(x => x.price === priceFilter);
//     if (sortBy === "rating") v.sort((a, b) => b.rating - a.rating);
//     else if (sortBy === "reviews") v.sort((a, b) => b.reviews - a.reviews);
//     return v;
//   };
 
//   const toggleVendor = (vendor) => {
//     const key = `${activeCategory}-${vendor.id}`;
//     setSelectedVendors(prev => {
//       const copy = { ...prev };
//       if (copy[key]) delete copy[key];
//       else copy[key] = { ...vendor, category: activeCategory };
//       return copy;
//     });
//   };
 
//   const isSelected = (vendor) => !!selectedVendors[`${activeCategory}-${vendor.id}`];
 
//   return (
//     <div style={{ padding: "32px" }}>
//       <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, marginBottom: 8 }}>🏪 Vendor Marketplace</h2>
//       <p style={{ color: T.muted, marginBottom: 28 }}>Browse and select vendors for your event. {Object.keys(selectedVendors).length > 0 && <span style={{ color: T.gold, fontWeight: 700 }}>{Object.keys(selectedVendors).length} vendor(s) selected</span>}</p>
 
//       {/* Category Grid */}
//       <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
//         {CATEGORIES.map(c => (
//           <button key={c.key} onClick={() => setActiveCategory(c.key === activeCategory ? null : c.key)}
//             style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, border: `2px solid ${activeCategory === c.key ? T.gold : T.border}`, background: activeCategory === c.key ? "#FFF8E1" : "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: activeCategory === c.key ? T.goldDark : T.ink, transition: "all 0.2s" }}>
//             {c.icon} {c.label}
//           </button>
//         ))}
//       </div>
 
//       {activeCategory && (
//         <>
//           {/* Filters */}
//           <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
//             <span style={{ color: T.muted, fontWeight: 600, fontSize: 13 }}>FILTER:</span>
//             {["all", "low", "medium", "high"].map(p => (
//               <button key={p} onClick={() => setPriceFilter(p)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${priceFilter === p ? T.gold : T.border}`, background: priceFilter === p ? "#FFF8E1" : "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13, color: priceFilter === p ? T.goldDark : T.muted, textTransform: "capitalize" }}>{p === "all" ? "All" : p === "low" ? "💚 Budget" : p === "medium" ? "🔵 Mid-range" : "⭐ Premium"}</button>
//             ))}
//             <span style={{ color: T.muted, fontWeight: 600, fontSize: 13, marginLeft: 8 }}>SORT:</span>
//             {["rating", "reviews"].map(s => (
//               <button key={s} onClick={() => setSortBy(s)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${sortBy === s ? T.gold : T.border}`, background: sortBy === s ? "#FFF8E1" : "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13, color: sortBy === s ? T.goldDark : T.muted, textTransform: "capitalize" }}>{s === "rating" ? "Top Rated" : "Most Reviewed"}</button>
//             ))}
//           </div>
 
//           {/* Vendor Cards */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
//             {getVendors().map(vendor => {
//               const sel = isSelected(vendor);
//               return (
//                 <div key={vendor.id} style={{ ...S.card, border: `2px solid ${sel ? T.gold : T.border}`, background: sel ? "#FFFDF5" : "#fff", position: "relative" }}>
//                   {sel && <div style={{ position: "absolute", top: 12, right: 12, background: T.gradientGold, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700, color: T.inkDark }}>✓ Selected</div>}
//                   <div style={{ fontSize: 36, marginBottom: 12 }}>{vendor.img}</div>
//                   <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{vendor.name}</div>
//                   <div style={{ color: T.muted, fontSize: 13, marginBottom: 8 }}>{vendor.speciality}</div>
//                   <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
//                     <span style={S.tag("gold")}>⭐ {vendor.rating}</span>
//                     <span style={S.tag("green")}>{vendor.reviews} reviews</span>
//                     <span style={S.tag(vendor.price === "high" ? "pink" : "gold")}>{vendor.price === "low" ? "💚 Budget" : vendor.price === "medium" ? "🔵 Mid" : "⭐ Premium"}</span>
//                     {vendor.verified && <span style={{ ...S.tag("green") }}>✓ Verified</span>}
//                   </div>
//                   <div style={{ color: T.muted, fontSize: 12, marginBottom: 14 }}>📍 {vendor.city}</div>
//                   <button style={{ ...S.btn(sel ? "danger" : "gold"), width: "100%" }} onClick={() => toggleVendor(vendor)}>
//                     {sel ? "Remove" : "Select Vendor"}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
 
//       {!activeCategory && Object.keys(selectedVendors).length > 0 && (
//         <div style={{ ...S.card, marginTop: 20 }}>
//           <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: T.goldDark }}>✅ Your Selected Vendors</div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
//             {Object.values(selectedVendors).map(v => (
//               <div key={v.id} style={{ padding: 14, background: "#FFF8E1", borderRadius: 12, border: `1px solid ${T.goldLight}` }}>
//                 <div style={{ fontSize: 24 }}>{v.img}</div>
//                 <div style={{ fontWeight: 700, fontSize: 14, marginTop: 6 }}>{v.name}</div>
//                 <div style={{ color: T.muted, fontSize: 12, textTransform: "capitalize" }}>{v.category}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
 
// // ─── EVENT PLANNER (AI AGENT) ────────────────────────────────────────────────
// function EventPlannerTab({ event, selectedVendors }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [agentStatus, setAgentStatus] = useState({});
//   const bottomRef = useRef();
 
//   const vendorList = Object.values(selectedVendors);
 
//   useEffect(() => {
//     if (messages.length === 0) {
//       const intro = `Hello! I'm your AI Event Planner 🤖✨\n\nI can see you have ${vendorList.length} vendor(s) selected${event.type ? ` for your ${event.type}` : ""}${event.date ? ` on ${event.date}` : ""}.\n\nI can help you:\n• Confirm vendor appointments\n• Send reminders to vendors\n• Coordinate sample deliveries\n• Manage vendor communications\n\nWhat would you like me to do?`;
//       setMessages([{ role: "assistant", text: intro }]);
//     }
//   }, []);
 
//   useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
 
//   const systemPrompt = `You are an AI event planner agent for EventSphere, an Indian wedding and event planning platform. 
// You help coordinate between customers and vendors. You are managing this event:
// - Event: ${event.type || "Not specified"}
// - Date: ${event.date || "Not specified"}
// - Time: ${event.time || "Not specified"}
// - Venue: ${event.venue || "Not specified"}
// - Budget: ₹${event.budget || "Not specified"}
// - Guests: ${event.guestCount || "Not specified"}
// - Address for samples: ${event.address || "Not specified"}
// Selected vendors: ${vendorList.map(v => `${v.name} (${v.category})`).join(", ") || "None"}
 
// Be helpful, professional, and concise. Simulate vendor confirmations and actions when asked. Always be encouraging and provide next steps.`;
 
//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;
//     const userMsg = input.trim();
//     setInput("");
//     setMessages(prev => [...prev, { role: "user", text: userMsg }]);
//     setLoading(true);
 
//     let aiText = "";
//     setMessages(prev => [...prev, { role: "assistant", text: "", streaming: true }]);
//     await callAI(systemPrompt, userMsg, (text) => {
//       aiText = text;
//       setMessages(prev => {
//         const copy = [...prev];
//         copy[copy.length - 1] = { role: "assistant", text, streaming: true };
//         return copy;
//       });
//     });
//     setMessages(prev => {
//       const copy = [...prev];
//       copy[copy.length - 1] = { role: "assistant", text: aiText, streaming: false };
//       return copy;
//     });
//     setLoading(false);
//   };
 
//   const quickActions = ["Confirm all vendor appointments", "Send sample delivery request", "Remind vendors of event date", "Get event status summary"];
 
//   const simulateConfirm = (vendor) => {
//     setAgentStatus(prev => ({ ...prev, [vendor.id]: "confirmed" }));
//   };
 
//   return (
//     <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, maxHeight: "calc(100vh - 120px)" }}>
//       {/* Left panel */}
//       <div>
//         <div style={{ ...S.card, marginBottom: 16 }}>
//           <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: T.goldDark }}>📋 Event Details</div>
//           {event.type ? (
//             <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.8 }}>
//               <div>🎉 <strong>{event.type}</strong></div>
//               {event.date && <div>📅 {event.date}</div>}
//               {event.time && <div>⏰ {event.time}</div>}
//               {event.venue && <div>📍 {event.venue}</div>}
//               {event.guestCount && <div>👥 {event.guestCount} guests</div>}
//               {event.budget && <div>💰 ₹{Number(event.budget).toLocaleString("en-IN")}</div>}
//             </div>
//           ) : <div style={{ color: T.muted, fontSize: 13 }}>No event created yet. Go to "Create Event" tab first.</div>}
//         </div>
 
//         <div style={S.card}>
//           <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: T.goldDark }}>🏪 Vendor Status</div>
//           {vendorList.length === 0 ? <div style={{ color: T.muted, fontSize: 13 }}>No vendors selected yet.</div> : vendorList.map(v => (
//             <div key={v.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
//               <div>
//                 <div style={{ fontSize: 12 }}>{v.img} {v.name}</div>
//                 <div style={{ fontSize: 11, color: T.muted, textTransform: "capitalize" }}>{v.category}</div>
//               </div>
//               {agentStatus[v.id] === "confirmed" ? (
//                 <span style={S.tag("green")}>✓ Confirmed</span>
//               ) : (
//                 <button onClick={() => simulateConfirm(v)} style={{ ...S.btn("gold"), padding: "4px 10px", fontSize: 11 }}>Confirm</button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
 
//       {/* Chat panel */}
//       <div style={{ ...S.card, display: "flex", flexDirection: "column", height: "calc(100vh - 180px)" }}>
//         <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: T.goldDark, display: "flex", alignItems: "center", gap: 8 }}>
//           🤖 AI Event Planner Agent
//           <span style={{ ...S.tag("green"), fontSize: 11 }}>● Online</span>
//         </div>
 
//         <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 4 }}>
//           {messages.map((m, i) => (
//             <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
//               {m.role === "assistant" && <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.gradientGold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, marginRight: 8 }}>🤖</div>}
//               <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? T.gradient : "#F9F5FF", color: m.role === "user" ? "#fff" : T.ink, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
//                 {m.text || (m.streaming && <span style={{ color: T.muted }}>Thinking...</span>)}
//               </div>
//             </div>
//           ))}
//           <div ref={bottomRef} />
//         </div>
 
//         {/* Quick actions */}
//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
//           {quickActions.map(a => (
//             <button key={a} onClick={() => { setInput(a); }} style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${T.border}`, background: "#fff", cursor: "pointer", fontSize: 12, color: T.muted }}>{a}</button>
//           ))}
//         </div>
 
//         <div style={{ display: "flex", gap: 10 }}>
//           <input style={{ ...S.input, flex: 1 }} placeholder="Ask your AI planner anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
//           <button style={{ ...S.btn("gold"), padding: "12px 20px", flexShrink: 0 }} onClick={sendMessage} disabled={loading}>
//             {loading ? "..." : "Send →"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
 
// // ─── CREATE DESIGN TAB ────────────────────────────────────────────────────────
// function CreateDesignTab({ event, selectedVendors }) {
//   const [activeCard, setActiveCard] = useState(null);
//   const [suggestions, setSuggestions] = useState("");
//   const [aiRecos, setAiRecos] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [printMode, setPrintMode] = useState(false);
 
//   const getRecommendations = async () => {
//     if (!suggestions.trim()) return;
//     setLoading(true);
//     setAiRecos("");
//     const context = `Event: ${event.type || "Wedding"}, Budget: ₹${event.budget || "medium"}, Guests: ${event.guestCount || "100"}`;
//     await callAI(
//       `You are a creative Indian wedding design consultant. Give exactly 3 numbered design recommendations with brief descriptions. Be specific, visual, and culturally relevant.`,
//       `Design category: ${activeCard?.label}. Client suggestion: "${suggestions}". Event context: ${context}. Recommend 3 options with names and descriptions.`,
//       (text) => setAiRecos(text)
//     );
//     setLoading(false);
//   };
 
//   if (printMode && activeCard?.key === "invitation") {
//     return (
//       <div style={{ padding: 32, maxWidth: 600, margin: "0 auto" }}>
//         <button style={{ ...S.btn("outline"), marginBottom: 20 }} onClick={() => setPrintMode(false)}>← Back to Design</button>
//         <div style={{ background: T.gradient, padding: 48, borderRadius: 20, textAlign: "center", color: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
//           <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: T.goldLight, letterSpacing: 3, marginBottom: 16 }}>WITH JOY WE ANNOUNCE</div>
//           <div style={{ fontFamily: "Georgia, serif", fontSize: 42, fontWeight: 700, color: T.goldLight, marginBottom: 8 }}>{event.type || "The Celebration"}</div>
//           <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 32 }}>of</div>
//           <div style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#fff", marginBottom: 32 }}>Your Family Name</div>
//           <div style={{ border: `1px solid ${T.goldLight}`, padding: "20px 32px", display: "inline-block", borderRadius: 12, marginBottom: 24 }}>
//             <div style={{ color: T.goldLight, fontSize: 16 }}>📅 {event.date || "Date TBD"} &nbsp;⏰ {event.time || "Time TBD"}</div>
//             <div style={{ color: "rgba(255,255,255,0.8)", marginTop: 8 }}>📍 {event.venue || "Venue TBD"}</div>
//           </div>
//           <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Selected design: {selectedDesign || "Classic Elegance"}</div>
//         </div>
//         <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
//           <button style={{ ...S.btn("gold"), flex: 1 }} onClick={() => window.print()}>🖨️ Print Card</button>
//           <button style={{ ...S.btn("outline"), flex: 1 }} onClick={() => setPrintMode(false)}>Edit Design</button>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div style={{ padding: 32 }}>
//       <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, marginBottom: 8 }}>🎨 Create & Design</h2>
//       <p style={{ color: T.muted, marginBottom: 32 }}>AI-powered design recommendations for every aspect of your event.</p>
 
//       {!activeCard ? (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
//           {DESIGN_CARDS.map(card => (
//             <div key={card.key} style={{ ...S.card, cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}
//               onClick={() => { setActiveCard(card); setSuggestions(""); setAiRecos(""); setSelectedDesign(null); }}>
//               <div style={{ fontSize: 40, marginBottom: 12 }}>{card.icon}</div>
//               <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{card.label}</div>
//               <div style={{ color: T.muted, fontSize: 13 }}>{card.desc}</div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div style={{ maxWidth: 700, margin: "0 auto" }}>
//           <button style={{ ...S.btn("outline"), marginBottom: 20 }} onClick={() => setActiveCard(null)}>← All Categories</button>
 
//           <div style={{ ...S.card }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
//               <div style={{ fontSize: 48 }}>{activeCard.icon}</div>
//               <div>
//                 <h3 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 24 }}>{activeCard.label}</h3>
//                 <p style={{ margin: 0, color: T.muted }}>{activeCard.desc}</p>
//               </div>
//             </div>
 
//             <label style={S.label}>Your Suggestions & Preferences</label>
//             <textarea
//               style={{ ...S.input, height: 100, resize: "vertical", fontFamily: "inherit" }}
//               placeholder={`Describe your vision for ${activeCard.label.toLowerCase()}... e.g., colors, themes, styles, cultural preferences`}
//               value={suggestions}
//               onChange={e => setSuggestions(e.target.value)}
//             />
 
//             <button style={{ ...S.btn("gold"), marginTop: 12 }} onClick={getRecommendations} disabled={loading}>
//               {loading ? "🤖 Creating recommendations..." : "✨ Get AI Recommendations"}
//             </button>
 
//             {aiRecos && (
//               <div style={{ marginTop: 24 }}>
//                 <div style={{ fontWeight: 700, color: T.goldDark, marginBottom: 12 }}>🎨 AI Recommendations</div>
//                 <div style={{ background: "#FFF8E1", borderRadius: 12, padding: 18, border: `1px solid ${T.goldLight}`, whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.8, color: T.ink, marginBottom: 16 }}>
//                   {aiRecos}
//                 </div>
 
//                 <label style={S.label}>Select Your Preferred Design</label>
//                 <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
//                   {["Option 1", "Option 2", "Option 3"].map(opt => (
//                     <button key={opt} onClick={() => setSelectedDesign(opt)} style={{ padding: "8px 18px", borderRadius: 20, border: `2px solid ${selectedDesign === opt ? T.gold : T.border}`, background: selectedDesign === opt ? "#FFF8E1" : "#fff", cursor: "pointer", fontWeight: 600, color: selectedDesign === opt ? T.goldDark : T.muted }}>
//                       {selectedDesign === opt ? "✓ " : ""}{opt}
//                     </button>
//                   ))}
//                 </div>
 
//                 {selectedDesign && (
//                   <div style={{ display: "flex", gap: 12 }}>
//                     <button style={S.btn("gold")} onClick={() => {
//                       // Simulate conveying to vendor
//                       alert(`✅ ${activeCard.label} design "${selectedDesign}" has been conveyed to the relevant vendor by your Event Planner Agent!`);
//                     }}>
//                       📤 Confirm & Send to Vendor
//                     </button>
//                     {activeCard.key === "invitation" && (
//                       <button style={S.btn("outline")} onClick={() => setPrintMode(true)}>🖨️ Preview & Print</button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
 
// // ─── VENDOR DASHBOARD ─────────────────────────────────────────────────────────
// function VendorDashboard({ user }) {
//   const [activeTab, setActiveTab] = useState("Dashboard");
 
//   const mockOrders = [
//     { id: "ORD001", customer: "Ananya Rajan", event: "Wedding", date: "2024-03-15", status: "pending", amount: 85000 },
//     { id: "ORD002", customer: "Meera Krishnan", event: "Reception", date: "2024-03-22", status: "confirmed", amount: 45000 },
//     { id: "ORD003", customer: "Divya Suresh", event: "Birthday", date: "2024-04-01", status: "sample_sent", amount: 12000 },
//   ];
 
//   const stats = [
//     { label: "Total Orders", value: "24", icon: "📋", color: T.gold },
//     { label: "Pending", value: "3", icon: "⏳", color: T.warning },
//     { label: "Confirmed", value: "18", icon: "✅", color: T.success },
//     { label: "Revenue", value: "₹4.2L", icon: "💰", color: T.roseDark },
//   ];
 
//   return (
//     <div style={{ padding: 32 }}>
//       <div style={{ marginBottom: 32 }}>
//         <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, marginBottom: 4 }}>Welcome, {user.name} 🏪</h2>
//         <p style={{ color: T.muted }}>Manage your orders and vendor profile</p>
//       </div>
 
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
//         {stats.map(s => (
//           <div key={s.label} style={{ ...S.card, textAlign: "center" }}>
//             <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
//             <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
//             <div style={{ color: T.muted, fontSize: 13 }}>{s.label}</div>
//           </div>
//         ))}
//       </div>
 
//       <div style={S.card}>
//         <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: T.goldDark }}>📋 Recent Orders</div>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               {["Order ID", "Customer", "Event", "Date", "Amount", "Status", "Action"].map(h => (
//                 <th key={h} style={{ padding: "10px 12px", textAlign: "left", borderBottom: `2px solid ${T.border}`, fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {mockOrders.map(order => (
//               <tr key={order.id} style={{ borderBottom: `1px solid ${T.border}` }}>
//                 <td style={{ padding: "14px 12px", fontWeight: 700, color: T.goldDark }}>{order.id}</td>
//                 <td style={{ padding: "14px 12px" }}>{order.customer}</td>
//                 <td style={{ padding: "14px 12px" }}>{order.event}</td>
//                 <td style={{ padding: "14px 12px", color: T.muted }}>{order.date}</td>
//                 <td style={{ padding: "14px 12px", fontWeight: 700 }}>₹{order.amount.toLocaleString("en-IN")}</td>
//                 <td style={{ padding: "14px 12px" }}>
//                   <span style={S.tag(order.status === "confirmed" ? "green" : order.status === "sample_sent" ? "gold" : "pink")}>
//                     {order.status === "pending" ? "⏳ Pending" : order.status === "confirmed" ? "✅ Confirmed" : "📦 Sample Sent"}
//                   </span>
//                 </td>
//                 <td style={{ padding: "14px 12px" }}>
//                   <button style={{ ...S.btn("gold"), padding: "6px 14px", fontSize: 13 }}>View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
 
//       <div style={{ ...S.card, marginTop: 20 }}>
//         <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: T.goldDark }}>📬 Recent Messages from Event Planner</div>
//         {[
//           { from: "AI Planner (Ananya's Wedding)", msg: "Please confirm availability for March 15. Client is requesting sample delivery by March 1.", time: "2h ago", status: "new" },
//           { from: "AI Planner (Meera's Reception)", msg: "Your appointment has been confirmed. Please note the venue change to Grand Ballroom, Trichy.", time: "1d ago", status: "read" },
//         ].map((m, i) => (
//           <div key={i} style={{ padding: 16, borderRadius: 12, background: m.status === "new" ? "#FFF8E1" : T.surface, border: `1px solid ${m.status === "new" ? T.goldLight : T.border}`, marginBottom: 12 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
//               <strong style={{ fontSize: 14 }}>🤖 {m.from}</strong>
//               <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                 {m.status === "new" && <span style={S.tag("gold")}>New</span>}
//                 <span style={{ color: T.muted, fontSize: 12 }}>{m.time}</span>
//               </div>
//             </div>
//             <p style={{ color: T.ink, fontSize: 14, margin: 0 }}>{m.msg}</p>
//             <button style={{ ...S.btn("gold"), padding: "6px 14px", fontSize: 13, marginTop: 10 }}>Reply</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
 
// // ─── ROOT APP ─────────────────────────────────────────────────────────────────
// export default function App() {
//   const [user, setUser] = useState(null);
//   const [tab, setTab] = useState("Home");
//   const [event, setEvent] = useState({});
//   const [selectedVendors, setSelectedVendors] = useState({});
 
//   if (!user) return <AuthScreen onLogin={(u) => { setUser(u); setTab(u.role === "vendor" ? "Dashboard" : "Home"); }} />;
 
//   const renderTab = () => {
//     if (user.role === "vendor") return <VendorDashboard user={user} />;
//     switch (tab) {
//       case "Home": return <HomeTab user={user} setTab={setTab} />;
//       case "Create Event": return <CreateEventTab event={event} setEvent={setEvent} />;
//       case "Marketplace": return <MarketplaceTab selectedVendors={selectedVendors} setSelectedVendors={setSelectedVendors} event={event} />;
//       case "Event Planner": return <EventPlannerTab event={event} selectedVendors={selectedVendors} />;
//       case "Create Design": return <CreateDesignTab event={event} selectedVendors={selectedVendors} />;
//       default: return <HomeTab user={user} setTab={setTab} />;
//     }
//   };
 
//   return (
//     <div style={S.app}>
//       <NavBar user={user} tab={tab} setTab={setTab} onLogout={() => { setUser(null); setEvent({}); setSelectedVendors({}); }} />
//       <div style={{ minHeight: "calc(100vh - 64px)" }}>{renderTab()}</div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
 
// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  gold: "#C9A84C",
  goldLight: "#F0D080",
  goldDark: "#8B6914",
  rose: "#E8A0B4",
  roseDark: "#C4607A",
  ink: "#1A1025",
  inkMid: "#2D1F3D",
  inkSoft: "#3D2F50",
  muted: "#7B6890",
  surface: "#F9F5FF",
  surfaceCard: "#FFFFFF",
  border: "#E8DFF5",
  success: "#2ECC71",
  warning: "#F39C12",
  error: "#E74C3C",
  gradient: "linear-gradient(135deg, #1A1025 0%, #2D1F3D 50%, #3D2F50 100%)",
  gradientGold: "linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)",
};
 
// ─── AI HELPER (GEMINI) ──────────────────────────────────────────────

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

async function callAI(systemPrompt, userMessage, onChunk) {
  if (!API_KEY) {
    const msg =
      "⚠️ Gemini API key missing! Create a .env file in your project root with:\nVITE_GEMINI_API_KEY=your_key_here";
    onChunk && onChunk(msg);
    return msg;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemPrompt}\n\n${userMessage}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));

      const msg = `❌ API Error ${response.status}: ${
        err?.error?.message || response.statusText
      }`;

      onChunk && onChunk(msg);
      return msg;
    }

    const data = await response.json();

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    onChunk && onChunk(result);

    return result;
  } catch (e) {
    const msg = `❌ Network error: ${e.message}`;
    onChunk && onChunk(msg);
    return msg;
  }
}
// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const VENDORS = {
  catering: [
    { id: "c1", name: "Royal Feast Caterers", rating: 4.8, price: "high", city: "Chennai", speciality: "South Indian, Multi-cuisine", img: "🍽️", reviews: 142, verified: true },
    { id: "c2", name: "Spice Garden", rating: 4.5, price: "medium", city: "Coimbatore", speciality: "Chettinad, North Indian", img: "🥘", reviews: 98, verified: true },
    { id: "c3", name: "Budget Bites", rating: 4.1, price: "low", city: "Madurai", speciality: "Traditional South Indian", img: "🍛", reviews: 67, verified: false },
  ],
  decoration: [
    { id: "d1", name: "Dream Decors", rating: 4.9, price: "high", city: "Chennai", speciality: "Floral, Theme decor", img: "🌸", reviews: 203, verified: true },
    { id: "d2", name: "Elegant Events", rating: 4.6, price: "medium", city: "Trichy", speciality: "Modern, Minimalist", img: "✨", reviews: 115, verified: true },
    { id: "d3", name: "Simple Setups", rating: 4.0, price: "low", city: "Salem", speciality: "Traditional decor", img: "🎊", reviews: 44, verified: false },
  ],
  photographer: [
    { id: "p1", name: "Moments by Karthik", rating: 4.9, price: "high", city: "Chennai", speciality: "Candid, Cinematic", img: "📸", reviews: 178, verified: true },
    { id: "p2", name: "Click & Capture", rating: 4.5, price: "medium", city: "Madurai", speciality: "Traditional, Candid", img: "🎥", reviews: 89, verified: true },
    { id: "p3", name: "Budget Frames", rating: 3.9, price: "low", city: "Trichy", speciality: "Basic photography", img: "📷", reviews: 31, verified: false },
  ],
  makeup: [
    { id: "m1", name: "Glam Studio by Priya", rating: 4.8, price: "high", city: "Chennai", speciality: "Bridal, HD Makeup", img: "💄", reviews: 156, verified: true },
    { id: "m2", name: "Belle Artistry", rating: 4.4, price: "medium", city: "Coimbatore", speciality: "Bridal, Party makeup", img: "💅", reviews: 72, verified: true },
    { id: "m3", name: "Natural Glow", rating: 4.0, price: "low", city: "Salem", speciality: "Natural makeup", img: "🌿", reviews: 28, verified: false },
  ],
  costume: [
    { id: "cos1", name: "Silk Route Designers", rating: 4.7, price: "high", city: "Kanchipuram", speciality: "Silk sarees, Lehengas", img: "👗", reviews: 134, verified: true },
    { id: "cos2", name: "Trendy Threads", rating: 4.3, price: "medium", city: "Chennai", speciality: "Designer wear", img: "👘", reviews: 88, verified: true },
    { id: "cos3", name: "Affordable Fashion", rating: 3.8, price: "low", city: "Madurai", speciality: "Traditional wear", img: "🥻", reviews: 22, verified: false },
  ],
  returnGift: [
    { id: "r1", name: "Gift Galaxy", rating: 4.6, price: "high", city: "Chennai", speciality: "Customized gifts, Hampers", img: "🎁", reviews: 99, verified: true },
    { id: "r2", name: "Memory Makers", rating: 4.2, price: "medium", city: "Coimbatore", speciality: "Personalized gifts", img: "🎀", reviews: 55, verified: true },
    { id: "r3", name: "Budget Giftz", rating: 3.7, price: "low", city: "Trichy", speciality: "Bulk gifts", img: "📦", reviews: 18, verified: false },
  ],
};
 
const CATEGORIES = [
  { key: "catering", label: "Catering", icon: "🍽️", desc: "From traditional feasts to multi-cuisine spreads" },
  { key: "decoration", label: "Decoration", icon: "🌸", desc: "Transform venues into breathtaking spaces" },
  { key: "photographer", label: "Photography", icon: "📸", desc: "Capture memories that last forever" },
  { key: "makeup", label: "Makeup", icon: "💄", desc: "Look your absolute best on your special day" },
  { key: "costume", label: "Costume Design", icon: "👗", desc: "Curated outfits for every occasion" },
  { key: "returnGift", label: "Return Gifts", icon: "🎁", desc: "Make your guests feel cherished" },
];
 
const DESIGN_CARDS = [
  { key: "invitation", label: "Invitation Cards", icon: "💌", desc: "Design & print beautiful cards" },
  { key: "stage", label: "Stage Decoration", icon: "🎭", desc: "AI-curated stage themes" },
  { key: "mehandi", label: "Mehandi Design", icon: "🌿", desc: "Traditional & fusion patterns" },
  { key: "dress", label: "Dress & Outfit", icon: "👗", desc: "Customize your perfect look" },
  { key: "menu", label: "Menu Design", icon: "📋", desc: "Craft the perfect menu" },
  { key: "returnGiftDesign", label: "Return Gift Ideas", icon: "🎁", desc: "Unique gifting concepts" },
  { key: "jewel", label: "Jewellery", icon: "💎", desc: "Complement your attire" },
  { key: "album", label: "Photo Album", icon: "📖", desc: "Curated album designs" },
];
 
// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  app: { fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: T.surface, color: T.ink },
  navBar: { background: T.gradient, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, boxShadow: "0 4px 24px rgba(0,0,0,0.25)", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: T.goldLight, letterSpacing: 1 },
  btn: (v = "gold") => ({
    padding: "10px 22px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
    background: v === "gold" ? T.gradientGold : v === "outline" ? "transparent" : v === "danger" ? T.error : T.inkMid,
    color: v === "gold" ? T.ink : v === "outline" ? T.gold : "#fff",
    border: v === "outline" ? `2px solid ${T.gold}` : "none",
    transition: "all 0.2s", boxShadow: v === "gold" ? "0 4px 12px rgba(201,168,76,0.35)" : "none",
  }),
  card: { background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(26,16,37,0.08)", border: `1px solid ${T.border}`, padding: 24, transition: "transform 0.2s, box-shadow 0.2s" },
  input: { width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontSize: 15, outline: "none", background: "#fff", boxSizing: "border-box", color: T.ink },
  label: { fontSize: 13, fontWeight: 600, color: T.muted, marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: 0.5 },
  tag: (color) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: color === "gold" ? "#FFF8E1" : color === "green" ? "#E8F5E9" : "#FCE4EC", color: color === "gold" ? T.goldDark : color === "green" ? "#2E7D32" : T.roseDark }),
  heroGrad: { background: T.gradient, padding: "60px 32px", textAlign: "center", color: "#fff" },
};
 
// ─── AUTH SCREEN ─────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  // Simulated user DB
  const USERS = { "user@demo.com": { password: "demo123", name: "Ananya Rajan", role: "user" }, "vendor@demo.com": { password: "demo123", name: "Rajesh Caterers", role: "vendor" } };
 
  const handleSubmit = () => {
    setError("");
    if (mode === "login") {
      const u = USERS[form.email];
      if (!u || u.password !== form.password) return setError("Invalid email or password.");
      if (u.role !== role) return setError(`This account is a ${u.role} account. Please select the correct role.`);
      onLogin({ name: u.name, email: form.email, role: u.role });
    } else {
      if (!form.name || !form.email || !form.password) return setError("All fields are required.");
      if (form.password !== form.confirm) return setError("Passwords do not match.");
      onLogin({ name: form.name, email: form.email, role });
    }
  };
 
  return (
    <div style={{ minHeight: "100vh", background: T.gradient, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}></div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: T.ink }}>EventSphere</div>
          <div style={{ color: T.muted, fontSize: 14, marginTop: 4 }}>Plan your perfect celebration</div>
        </div>
 
        {/* Role Toggle */}
        <div style={{ display: "flex", background: T.surface, borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
          {["user", "vendor"].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "10px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: role === r ? T.gradientGold : "transparent", color: role === r ? T.ink : T.muted, transition: "all 0.2s" }}>
              {r === "user" ? "👤 Customer" : "🏪 Vendor"}
            </button>
          ))}
        </div>
 
        {/* Mode Toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "8px", border: `2px solid ${mode === m ? T.gold : T.border}`, borderRadius: 9, cursor: "pointer", fontWeight: 600, background: mode === m ? "#FFF8E1" : "#fff", color: mode === m ? T.goldDark : T.muted }}>
              {m === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>
 
        {mode === "signup" && (
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Full Name</label>
            <input style={S.input} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>Email</label>
          <input style={S.input} placeholder={role === "user" ? "user@demo.com" : "vendor@demo.com"} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>Password</label>
          <input style={S.input} type="password" placeholder={mode === "login" ? "demo123" : "Create password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>
        {mode === "signup" && (
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Confirm Password</label>
            <input style={S.input} type="password" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
          </div>
        )}
 
        {error && <div style={{ background: "#FFF0F0", border: `1px solid ${T.error}`, borderRadius: 8, padding: "10px 14px", color: T.error, fontSize: 14, marginBottom: 16 }}>⚠️ {error}</div>}
 
        <button style={{ ...S.btn("gold"), width: "100%", padding: "14px", fontSize: 16, borderRadius: 12 }} onClick={handleSubmit}>
          {mode === "login" ? "Sign In →" : "Create Account →"}
        </button>
 
        <div style={{ marginTop: 16, padding: 12, background: T.surface, borderRadius: 10, fontSize: 12, color: T.muted }}>
          <strong>Demo:</strong> user@demo.com / vendor@demo.com · password: demo123
        </div>
      </div>
    </div>
  );
}
 
// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function NavBar({ user, tab, setTab, onLogout }) {
  const userTabs = ["Home", "Create Event", "Marketplace", "Event Planner", "Create Design"];
  const vendorTabs = ["Dashboard", "Orders", "Profile"];
 
  const tabs = user.role === "user" ? userTabs : vendorTabs;
  return (
    <nav style={S.navBar}>
      <div style={S.logo}>EventSphere</div>
      <div style={{ display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: tab === t ? "rgba(201,168,76,0.25)" : "transparent", color: tab === t ? T.goldLight : "rgba(255,255,255,0.7)", transition: "all 0.2s" }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: T.goldLight, fontWeight: 600, fontSize: 14 }}>{user.name}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{user.role === "vendor" ? "🏪 Vendor" : "👤 Customer"}</div>
        </div>
        <button onClick={onLogout} style={{ ...S.btn("outline"), padding: "7px 14px", fontSize: 13 }}>Sign Out</button>
      </div>
    </nav>
  );
}
 
// ─── HOME TAB ────────────────────────────────────────────────────────────────
function HomeTab({ user, setTab }) {
  return (
    <div>
      <div style={S.heroGrad}>
        <div style={{ fontSize: 20, color: T.goldLight, marginBottom: 8 }}>Welcome back, {user.name.split(" ")[0]} ✨</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 48, margin: "0 0 16px", fontWeight: 700 }}>Plan Your Dream Event</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, maxWidth: 560, margin: "0 auto 32px" }}>From intimate gatherings to grand celebrations — powered by AI, perfected for you.</p>
        <button style={{ ...S.btn("gold"), padding: "14px 36px", fontSize: 16, borderRadius: 14 }} onClick={() => setTab("Create Event")}>🎉 Create New Event</button>
      </div>
 
      <div style={{ padding: "48px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, margin: "0 0 8px" }}>Everything for your celebration</h2>
          <p style={{ color: T.muted }}>Browse our curated vendor marketplace</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {CATEGORIES.map(c => (
            <div key={c.key} style={{ ...S.card, cursor: "pointer", textAlign: "center" }} onClick={() => setTab("Marketplace")}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{c.label}</div>
              <div style={{ color: T.muted, fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
// ─── CREATE EVENT ─────────────────────────────────────────────────────────────
function CreateEventTab({ event, setEvent }) {
  const [saved, setSaved] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
 
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
 
  const getAISuggestion = async () => {
    if (!event.type || !event.budget || !event.guestCount) return;
    setLoadingAI(true);
    setAiSuggestion("");
    await callAI(
      "You are an expert Indian wedding and event planner. Give concise, practical suggestions.",
      `Event type: ${event.type}, Budget: ₹${event.budget}, Guests: ${event.guestCount}, Venue: ${event.venue || "TBD"}, Date: ${event.date || "TBD"}. Give 3 short key tips for this event.`,
      (text) => setAiSuggestion(text)
    );
    setLoadingAI(false);
  };
 
  const fields = [
    { key: "type", label: "Event Type", placeholder: "e.g. Wedding, Birthday, Reception...", type: "text" },
    { key: "venue", label: "Venue", placeholder: "Venue name or location", type: "text" },
    { key: "date", label: "Event Date", placeholder: "", type: "date" },
    { key: "time", label: "Event Time", placeholder: "", type: "time" },
    { key: "budget", label: "Total Budget (₹)", placeholder: "e.g. 500000", type: "number" },
    { key: "guestCount", label: "Guest Count", placeholder: "Expected number of guests", type: "number" },
    { key: "address", label: "Home Address (for sample delivery)", placeholder: "Full address for vendor samples", type: "text" },
  ];
 
  return (
    <div style={{ padding: "40px 32px", maxWidth: 700, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, marginBottom: 8 }}>🎉 Create Your Event</h2>
      <p style={{ color: T.muted, marginBottom: 32 }}>Fill in the details and let EventSphere do the magic.</p>
 
      <div style={{ ...S.card }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {fields.map(f => (
            <div key={f.key} style={{ gridColumn: f.key === "address" ? "1 / -1" : "auto" }}>
              <label style={S.label}>{f.label}</label>
              <input style={S.input} type={f.type} placeholder={f.placeholder} value={event[f.key] || ""} onChange={e => setEvent({ ...event, [f.key]: e.target.value })} />
            </div>
          ))}
        </div>
 
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button style={S.btn("gold")} onClick={handleSave}>{saved ? "✅ Saved!" : "Save Event Details"}</button>
          <button style={S.btn("outline")} onClick={getAISuggestion} disabled={loadingAI}>{loadingAI ? "🤖 Thinking..." : "✨ Get AI Tips"}</button>
        </div>
 
        {aiSuggestion && (
          <div style={{ marginTop: 20, padding: 18, background: "#FFF8E1", borderRadius: 12, border: `1px solid ${T.goldLight}` }}>
            <div style={{ fontWeight: 700, color: T.goldDark, marginBottom: 8 }}>✨ AI Planner Suggestions</div>
            <div style={{ color: T.ink, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{aiSuggestion}</div>
          </div>
        )}
      </div>
 
      {event.type && (
        <div style={{ marginTop: 20, ...S.card, background: "linear-gradient(135deg, #F9F5FF, #FFF8E1)" }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: T.goldDark }}>📋 Event Summary</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14 }}>
            {Object.entries(event).filter(([k, v]) => v).map(([k, v]) => (
              <div key={k}><span style={{ color: T.muted, textTransform: "capitalize" }}>{k.replace(/([A-Z])/g, " $1")}: </span><strong>{k === "budget" ? `₹${Number(v).toLocaleString("en-IN")}` : v}</strong></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 
// ─── MARKETPLACE ─────────────────────────────────────────────────────────────
function MarketplaceTab({ selectedVendors, setSelectedVendors, event }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
 
  const getVendors = () => {
    if (!activeCategory) return [];
    let v = [...(VENDORS[activeCategory] || [])];
    if (priceFilter !== "all") v = v.filter(x => x.price === priceFilter);
    if (sortBy === "rating") v.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews") v.sort((a, b) => b.reviews - a.reviews);
    return v;
  };
 
  const toggleVendor = (vendor) => {
    const key = `${activeCategory}-${vendor.id}`;
    setSelectedVendors(prev => {
      const copy = { ...prev };
      if (copy[key]) delete copy[key];
      else copy[key] = { ...vendor, category: activeCategory };
      return copy;
    });
  };
 
  const isSelected = (vendor) => !!selectedVendors[`${activeCategory}-${vendor.id}`];
 
  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, marginBottom: 8 }}>🏪 Vendor Marketplace</h2>
      <p style={{ color: T.muted, marginBottom: 28 }}>Browse and select vendors for your event. {Object.keys(selectedVendors).length > 0 && <span style={{ color: T.gold, fontWeight: 700 }}>{Object.keys(selectedVendors).length} vendor(s) selected</span>}</p>
 
      {/* Category Grid */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
        {CATEGORIES.map(c => (
          <button key={c.key} onClick={() => setActiveCategory(c.key === activeCategory ? null : c.key)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, border: `2px solid ${activeCategory === c.key ? T.gold : T.border}`, background: activeCategory === c.key ? "#FFF8E1" : "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: activeCategory === c.key ? T.goldDark : T.ink, transition: "all 0.2s" }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>
 
      {activeCategory && (
        <>
          {/* Filters */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
            <span style={{ color: T.muted, fontWeight: 600, fontSize: 13 }}>FILTER:</span>
            {["all", "low", "medium", "high"].map(p => (
              <button key={p} onClick={() => setPriceFilter(p)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${priceFilter === p ? T.gold : T.border}`, background: priceFilter === p ? "#FFF8E1" : "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13, color: priceFilter === p ? T.goldDark : T.muted, textTransform: "capitalize" }}>{p === "all" ? "All" : p === "low" ? "💚 Budget" : p === "medium" ? "🔵 Mid-range" : "⭐ Premium"}</button>
            ))}
            <span style={{ color: T.muted, fontWeight: 600, fontSize: 13, marginLeft: 8 }}>SORT:</span>
            {["rating", "reviews"].map(s => (
              <button key={s} onClick={() => setSortBy(s)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${sortBy === s ? T.gold : T.border}`, background: sortBy === s ? "#FFF8E1" : "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13, color: sortBy === s ? T.goldDark : T.muted, textTransform: "capitalize" }}>{s === "rating" ? "Top Rated" : "Most Reviewed"}</button>
            ))}
          </div>
 
          {/* Vendor Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {getVendors().map(vendor => {
              const sel = isSelected(vendor);
              return (
                <div key={vendor.id} style={{ ...S.card, border: `2px solid ${sel ? T.gold : T.border}`, background: sel ? "#FFFDF5" : "#fff", position: "relative" }}>
                  {sel && <div style={{ position: "absolute", top: 12, right: 12, background: T.gradientGold, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700, color: T.inkDark }}>✓ Selected</div>}
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{vendor.img}</div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{vendor.name}</div>
                  <div style={{ color: T.muted, fontSize: 13, marginBottom: 8 }}>{vendor.speciality}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                    <span style={S.tag("gold")}>⭐ {vendor.rating}</span>
                    <span style={S.tag("green")}>{vendor.reviews} reviews</span>
                    <span style={S.tag(vendor.price === "high" ? "pink" : "gold")}>{vendor.price === "low" ? "💚 Budget" : vendor.price === "medium" ? "🔵 Mid" : "⭐ Premium"}</span>
                    {vendor.verified && <span style={{ ...S.tag("green") }}>✓ Verified</span>}
                  </div>
                  <div style={{ color: T.muted, fontSize: 12, marginBottom: 14 }}>📍 {vendor.city}</div>
                  <button style={{ ...S.btn(sel ? "danger" : "gold"), width: "100%" }} onClick={() => toggleVendor(vendor)}>
                    {sel ? "Remove" : "Select Vendor"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
 
      {!activeCategory && Object.keys(selectedVendors).length > 0 && (
        <div style={{ ...S.card, marginTop: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: T.goldDark }}>✅ Your Selected Vendors</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {Object.values(selectedVendors).map(v => (
              <div key={v.id} style={{ padding: 14, background: "#FFF8E1", borderRadius: 12, border: `1px solid ${T.goldLight}` }}>
                <div style={{ fontSize: 24 }}>{v.img}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 6 }}>{v.name}</div>
                <div style={{ color: T.muted, fontSize: 12, textTransform: "capitalize" }}>{v.category}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 
// ─── EVENT PLANNER (AI AGENT) ────────────────────────────────────────────────
function EventPlannerTab({ event, selectedVendors }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState({});
  const bottomRef = useRef();
 
  const vendorList = Object.values(selectedVendors);
 
  useEffect(() => {
    if (messages.length === 0) {
      const intro = `Hello! I'm your AI Event Planner 🤖✨\n\nI can see you have ${vendorList.length} vendor(s) selected${event.type ? ` for your ${event.type}` : ""}${event.date ? ` on ${event.date}` : ""}.\n\nI can help you:\n• Confirm vendor appointments\n• Send reminders to vendors\n• Coordinate sample deliveries\n• Manage vendor communications\n\nWhat would you like me to do?`;
      setMessages([{ role: "assistant", text: intro }]);
    }
  }, []);
 
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
 
  const systemPrompt = `You are an AI event planner agent for EventSphere, an Indian wedding and event planning platform. 
You help coordinate between customers and vendors. You are managing this event:
- Event: ${event.type || "Not specified"}
- Date: ${event.date || "Not specified"}
- Time: ${event.time || "Not specified"}
- Venue: ${event.venue || "Not specified"}
- Budget: ₹${event.budget || "Not specified"}
- Guests: ${event.guestCount || "Not specified"}
- Address for samples: ${event.address || "Not specified"}
Selected vendors: ${vendorList.map(v => `${v.name} (${v.category})`).join(", ") || "None"}
 
Be helpful, professional, and concise. Simulate vendor confirmations and actions when asked. Always be encouraging and provide next steps.`;
 
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
 
    let aiText = "";
    setMessages(prev => [...prev, { role: "assistant", text: "", streaming: true }]);
    await callAI(systemPrompt, userMsg, (text) => {
      aiText = text;
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", text, streaming: true };
        return copy;
      });
    });
    setMessages(prev => {
      const copy = [...prev];
      copy[copy.length - 1] = { role: "assistant", text: aiText, streaming: false };
      return copy;
    });
    setLoading(false);
  };
 
  const quickActions = ["Confirm all vendor appointments", "Send sample delivery request", "Remind vendors of event date", "Get event status summary"];
 
  const simulateConfirm = (vendor) => {
    setAgentStatus(prev => ({ ...prev, [vendor.id]: "confirmed" }));
  };
 
  return (
    <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, maxHeight: "calc(100vh - 120px)" }}>
      {/* Left panel */}
      <div>
        <div style={{ ...S.card, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: T.goldDark }}>📋 Event Details</div>
          {event.type ? (
            <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.8 }}>
              <div>🎉 <strong>{event.type}</strong></div>
              {event.date && <div>📅 {event.date}</div>}
              {event.time && <div>⏰ {event.time}</div>}
              {event.venue && <div>📍 {event.venue}</div>}
              {event.guestCount && <div>👥 {event.guestCount} guests</div>}
              {event.budget && <div>💰 ₹{Number(event.budget).toLocaleString("en-IN")}</div>}
            </div>
          ) : <div style={{ color: T.muted, fontSize: 13 }}>No event created yet. Go to "Create Event" tab first.</div>}
        </div>
 
        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: T.goldDark }}>🏪 Vendor Status</div>
          {vendorList.length === 0 ? <div style={{ color: T.muted, fontSize: 13 }}>No vendors selected yet.</div> : vendorList.map(v => (
            <div key={v.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
              <div>
                <div style={{ fontSize: 12 }}>{v.img} {v.name}</div>
                <div style={{ fontSize: 11, color: T.muted, textTransform: "capitalize" }}>{v.category}</div>
              </div>
              {agentStatus[v.id] === "confirmed" ? (
                <span style={S.tag("green")}>✓ Confirmed</span>
              ) : (
                <button onClick={() => simulateConfirm(v)} style={{ ...S.btn("gold"), padding: "4px 10px", fontSize: 11 }}>Confirm</button>
              )}
            </div>
          ))}
        </div>
      </div>
 
      {/* Chat panel */}
      <div style={{ ...S.card, display: "flex", flexDirection: "column", height: "calc(100vh - 180px)" }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: T.goldDark, display: "flex", alignItems: "center", gap: 8 }}>
          🤖 AI Event Planner Agent
          <span style={{ ...S.tag("green"), fontSize: 11 }}>● Online</span>
        </div>
 
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 4 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "assistant" && <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.gradientGold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, marginRight: 8 }}>🤖</div>}
              <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? T.gradient : "#F9F5FF", color: m.role === "user" ? "#fff" : T.ink, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {m.text || (m.streaming && <span style={{ color: T.muted }}>Thinking...</span>)}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
 
        {/* Quick actions */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
          {quickActions.map(a => (
            <button key={a} onClick={() => { setInput(a); }} style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${T.border}`, background: "#fff", cursor: "pointer", fontSize: 12, color: T.muted }}>{a}</button>
          ))}
        </div>
 
        <div style={{ display: "flex", gap: 10 }}>
          <input style={{ ...S.input, flex: 1 }} placeholder="Ask your AI planner anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
          <button style={{ ...S.btn("gold"), padding: "12px 20px", flexShrink: 0 }} onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Send →"}
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ─── CREATE DESIGN TAB ────────────────────────────────────────────────────────
function CreateDesignTab({ event, selectedVendors }) {
  const [activeCard, setActiveCard] = useState(null);
  const [suggestions, setSuggestions] = useState("");
  const [aiRecos, setAiRecos] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [printMode, setPrintMode] = useState(false);
 
  const getRecommendations = async () => {
    if (!suggestions.trim()) return;
    setLoading(true);
    setAiRecos("");
    const context = `Event: ${event.type || "Wedding"}, Budget: ₹${event.budget || "medium"}, Guests: ${event.guestCount || "100"}`;
    await callAI(
      `You are a creative Indian wedding design consultant. Give exactly 3 numbered design recommendations with brief descriptions. Be specific, visual, and culturally relevant.`,
      `Design category: ${activeCard?.label}. Client suggestion: "${suggestions}". Event context: ${context}. Recommend 3 options with names and descriptions.`,
      (text) => setAiRecos(text)
    );
    setLoading(false);
  };
 
  if (printMode && activeCard?.key === "invitation") {
    return (
      <div style={{ padding: 32, maxWidth: 600, margin: "0 auto" }}>
        <button style={{ ...S.btn("outline"), marginBottom: 20 }} onClick={() => setPrintMode(false)}>← Back to Design</button>
        <div style={{ background: T.gradient, padding: 48, borderRadius: 20, textAlign: "center", color: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: T.goldLight, letterSpacing: 3, marginBottom: 16 }}>WITH JOY WE ANNOUNCE</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 42, fontWeight: 700, color: T.goldLight, marginBottom: 8 }}>{event.type || "The Celebration"}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 32 }}>of</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#fff", marginBottom: 32 }}>Your Family Name</div>
          <div style={{ border: `1px solid ${T.goldLight}`, padding: "20px 32px", display: "inline-block", borderRadius: 12, marginBottom: 24 }}>
            <div style={{ color: T.goldLight, fontSize: 16 }}>📅 {event.date || "Date TBD"} &nbsp;⏰ {event.time || "Time TBD"}</div>
            <div style={{ color: "rgba(255,255,255,0.8)", marginTop: 8 }}>📍 {event.venue || "Venue TBD"}</div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Selected design: {selectedDesign || "Classic Elegance"}</div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button style={{ ...S.btn("gold"), flex: 1 }} onClick={() => window.print()}>🖨️ Print Card</button>
          <button style={{ ...S.btn("outline"), flex: 1 }} onClick={() => setPrintMode(false)}>Edit Design</button>
        </div>
      </div>
    );
  }
 
  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, marginBottom: 8 }}>🎨 Create & Design</h2>
      <p style={{ color: T.muted, marginBottom: 32 }}>AI-powered design recommendations for every aspect of your event.</p>
 
      {!activeCard ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {DESIGN_CARDS.map(card => (
            <div key={card.key} style={{ ...S.card, cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}
              onClick={() => { setActiveCard(card); setSuggestions(""); setAiRecos(""); setSelectedDesign(null); }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{card.label}</div>
              <div style={{ color: T.muted, fontSize: 13 }}>{card.desc}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <button style={{ ...S.btn("outline"), marginBottom: 20 }} onClick={() => setActiveCard(null)}>← All Categories</button>
 
          <div style={{ ...S.card }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 48 }}>{activeCard.icon}</div>
              <div>
                <h3 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 24 }}>{activeCard.label}</h3>
                <p style={{ margin: 0, color: T.muted }}>{activeCard.desc}</p>
              </div>
            </div>
 
            <label style={S.label}>Your Suggestions & Preferences</label>
            <textarea
              style={{ ...S.input, height: 100, resize: "vertical", fontFamily: "inherit" }}
              placeholder={`Describe your vision for ${activeCard.label.toLowerCase()}... e.g., colors, themes, styles, cultural preferences`}
              value={suggestions}
              onChange={e => setSuggestions(e.target.value)}
            />
 
            <button style={{ ...S.btn("gold"), marginTop: 12 }} onClick={getRecommendations} disabled={loading}>
              {loading ? "🤖 Creating recommendations..." : "✨ Get AI Recommendations"}
            </button>
 
            {aiRecos && (
              <div style={{ marginTop: 24 }}>
                <div style={{ fontWeight: 700, color: T.goldDark, marginBottom: 12 }}>🎨 AI Recommendations</div>
                <div style={{ background: "#FFF8E1", borderRadius: 12, padding: 18, border: `1px solid ${T.goldLight}`, whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.8, color: T.ink, marginBottom: 16 }}>
                  {aiRecos}
                </div>
 
                <label style={S.label}>Select Your Preferred Design</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                  {["Option 1", "Option 2", "Option 3"].map(opt => (
                    <button key={opt} onClick={() => setSelectedDesign(opt)} style={{ padding: "8px 18px", borderRadius: 20, border: `2px solid ${selectedDesign === opt ? T.gold : T.border}`, background: selectedDesign === opt ? "#FFF8E1" : "#fff", cursor: "pointer", fontWeight: 600, color: selectedDesign === opt ? T.goldDark : T.muted }}>
                      {selectedDesign === opt ? "✓ " : ""}{opt}
                    </button>
                  ))}
                </div>
 
                {selectedDesign && (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button style={S.btn("gold")} onClick={() => {
                      // Simulate conveying to vendor
                      alert(`✅ ${activeCard.label} design "${selectedDesign}" has been conveyed to the relevant vendor by your Event Planner Agent!`);
                    }}>
                      📤 Confirm & Send to Vendor
                    </button>
                    {activeCard.key === "invitation" && (
                      <button style={S.btn("outline")} onClick={() => setPrintMode(true)}>🖨️ Preview & Print</button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
 
// ─── VENDOR DASHBOARD ─────────────────────────────────────────────────────────
function VendorDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
 
  const mockOrders = [
    { id: "ORD001", customer: "Ananya Rajan", event: "Wedding", date: "2024-03-15", status: "pending", amount: 85000 },
    { id: "ORD002", customer: "Meera Krishnan", event: "Reception", date: "2024-03-22", status: "confirmed", amount: 45000 },
    { id: "ORD003", customer: "Divya Suresh", event: "Birthday", date: "2024-04-01", status: "sample_sent", amount: 12000 },
  ];
 
  const stats = [
    { label: "Total Orders", value: "24", icon: "📋", color: T.gold },
    { label: "Pending", value: "3", icon: "⏳", color: T.warning },
    { label: "Confirmed", value: "18", icon: "✅", color: T.success },
    { label: "Revenue", value: "₹4.2L", icon: "💰", color: T.roseDark },
  ];
 
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, marginBottom: 4 }}>Welcome, {user.name} 🏪</h2>
        <p style={{ color: T.muted }}>Manage your orders and vendor profile</p>
      </div>
 
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...S.card, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ color: T.muted, fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>
 
      <div style={S.card}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: T.goldDark }}>📋 Recent Orders</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Order ID", "Customer", "Event", "Date", "Amount", "Status", "Action"].map(h => (
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", borderBottom: `2px solid ${T.border}`, fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td style={{ padding: "14px 12px", fontWeight: 700, color: T.goldDark }}>{order.id}</td>
                <td style={{ padding: "14px 12px" }}>{order.customer}</td>
                <td style={{ padding: "14px 12px" }}>{order.event}</td>
                <td style={{ padding: "14px 12px", color: T.muted }}>{order.date}</td>
                <td style={{ padding: "14px 12px", fontWeight: 700 }}>₹{order.amount.toLocaleString("en-IN")}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={S.tag(order.status === "confirmed" ? "green" : order.status === "sample_sent" ? "gold" : "pink")}>
                    {order.status === "pending" ? "⏳ Pending" : order.status === "confirmed" ? "✅ Confirmed" : "📦 Sample Sent"}
                  </span>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <button style={{ ...S.btn("gold"), padding: "6px 14px", fontSize: 13 }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      <div style={{ ...S.card, marginTop: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: T.goldDark }}>📬 Recent Messages from Event Planner</div>
        {[
          { from: "AI Planner (Ananya's Wedding)", msg: "Please confirm availability for March 15. Client is requesting sample delivery by March 1.", time: "2h ago", status: "new" },
          { from: "AI Planner (Meera's Reception)", msg: "Your appointment has been confirmed. Please note the venue change to Grand Ballroom, Trichy.", time: "1d ago", status: "read" },
        ].map((m, i) => (
          <div key={i} style={{ padding: 16, borderRadius: 12, background: m.status === "new" ? "#FFF8E1" : T.surface, border: `1px solid ${m.status === "new" ? T.goldLight : T.border}`, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <strong style={{ fontSize: 14 }}>🤖 {m.from}</strong>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {m.status === "new" && <span style={S.tag("gold")}>New</span>}
                <span style={{ color: T.muted, fontSize: 12 }}>{m.time}</span>
              </div>
            </div>
            <p style={{ color: T.ink, fontSize: 14, margin: 0 }}>{m.msg}</p>
            <button style={{ ...S.btn("gold"), padding: "6px 14px", fontSize: 13, marginTop: 10 }}>Reply</button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("Home");
  const [event, setEvent] = useState({});
  const [selectedVendors, setSelectedVendors] = useState({});
 
  if (!user) return <AuthScreen onLogin={(u) => { setUser(u); setTab(u.role === "vendor" ? "Dashboard" : "Home"); }} />;
 
  const renderTab = () => {
    if (user.role === "vendor") return <VendorDashboard user={user} />;
    switch (tab) {
      case "Home": return <HomeTab user={user} setTab={setTab} />;
      case "Create Event": return <CreateEventTab event={event} setEvent={setEvent} />;
      case "Marketplace": return <MarketplaceTab selectedVendors={selectedVendors} setSelectedVendors={setSelectedVendors} event={event} />;
      case "Event Planner": return <EventPlannerTab event={event} selectedVendors={selectedVendors} />;
      case "Create Design": return <CreateDesignTab event={event} selectedVendors={selectedVendors} />;
      default: return <HomeTab user={user} setTab={setTab} />;
    }
  };
 
  return (
    <div style={S.app}>
      <NavBar user={user} tab={tab} setTab={setTab} onLogout={() => { setUser(null); setEvent({}); setSelectedVendors({}); }} />
      <div style={{ minHeight: "calc(100vh - 64px)" }}>{renderTab()}</div>
    </div>
  );
}