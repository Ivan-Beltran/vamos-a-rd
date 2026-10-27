
/* ===== CONFIGURACIÓN ===== */
const CONFIG = {
  whatsapp: "50300000000",
  precioPersona: 1089,
  precioSeguro: 25,

  dias: [
    {
      t: "Día 1",
      n: "Bienvenida al Caribe",
      e: "✈️",
      img: "src/img/img6.jpg",
      alt: "Llegada a Punta Cana y sus playas tropicales",
      d: "Salida desde El Salvador, llegada a Punta Cana, traslado al hotel, registro y tarde libre para disfrutar de la playa."
    },
    {
      t: "Día 2",
      n: "Sol y playa en Bávaro",
      e: "🏖️",
      img: "src/img/img7.jpg",
      alt: "Arena blanca y aguas turquesas de Playa Bávaro",
      d: "Desayuno en el hotel, visita a Playa Bávaro, actividades recreativas y tiempo libre para disfrutar del mar."
    },
    {
      t: "Día 3",
      n: "Aventura en Isla Saona",
      e: "🏝️",
      img: "src/img/img9.jpg",
      alt: "Paisaje tropical de Isla Saona y sus aguas cristalinas",
      d: "Excursión de día completo a Isla Saona, recorrido en embarcación según el operador, tiempo para nadar en zonas autorizadas y almuerzo durante la excursión."
    },
    {
      t: "Día 4",
      n: "Cultura dominicana",
      e: "🏛️",
      img: "src/img/img5.png",
      alt: "Arquitectura histórica de la Zona Colonial de Santo Domingo",
      d: "Excursión a Santo Domingo para recorrer la Zona Colonial y conocer su historia, arquitectura y gastronomía. Regreso al hotel según el horario contratado."
    },
    {
      t: "Día 5",
      n: "Despedida del Caribe",
      e: "🌅",
      img: "src/img/img10.jpg",
      alt: "Atardecer tropical en el Caribe",
      d: "Desayuno, tiempo libre según el horario del vuelo, traslado al aeropuerto y regreso a El Salvador."
    }
  ]
};
/* ========================== */


const $ = id => document.getElementById(id);
const usd = v => "$" + v.toLocaleString("en-US");

// Tarjetas
document.querySelectorAll(".card").forEach(c => c.addEventListener("click", () => c.classList.toggle("open")));

// Itinerario
const tabs = $("tabs"), panel = $("panel");


function showDay(i) {
  [...tabs.children].forEach((b, j) => {
    b.setAttribute("aria-selected", j === i ? "true" : "false");
    b.setAttribute("tabindex", j === i ? "0" : "-1");
  });

  const x = CONFIG.dias[i];

  panel.innerHTML = `
    <div class="day-view">
      <div class="day-image-wrap">
        <img
          class="day-image"
          src="${x.img}"
          alt="${x.alt}"
          loading="lazy"
        >
        <span class="day-badge">${x.t}</span>
      </div>

      <div class="day-content">
        <span class="emoji">${x.e}</span>
        <span class="day-kicker">TU EXPERIENCIA EN EL CARIBE</span>
        <h3>${x.n}</h3>
        <p>${x.d}</p>
      </div>
    </div>
  `;

  const tab = tabs.children[i];
  if (tab) {
    panel.setAttribute("aria-labelledby", tab.id);
  }
}

CONFIG.dias.forEach((x, i) => {
  const b = document.createElement("button");

  b.type = "button";
  b.id = `tab-dia-${i + 1}`;
  b.setAttribute("role", "tab");
  b.setAttribute("aria-controls", "panel");
  b.setAttribute("aria-selected", "false");
  b.setAttribute("tabindex", "-1");
  b.textContent = x.t;

  b.onclick = () => showDay(i);

  tabs.appendChild(b);
});

showDay(0);

// Calculadora
let n = 2;
$("segPrecio").textContent = usd(CONFIG.precioSeguro);
function calc(){
  const seg = $("seguro").checked ? CONFIG.precioSeguro : 0;
  $("n").textContent = n;
  $("total").textContent = usd(n * (CONFIG.precioPersona + seg));
  $("detalle").textContent = `${n} × ${usd(CONFIG.precioPersona)}` + (seg ? ` + ${n} × ${usd(seg)} de seguro` : "");
  $("viajeros").value = n;
}
$("minus").onclick = () => { if(n>1){n--;calc()} };
$("plus").onclick  = () => { if(n<20){n++;calc()} };
$("seguro").onchange = calc;
$("viajeros").addEventListener("input", e => { const v = parseInt(e.target.value); if(v>=1&&v<=20){n=v; calc()} });
calc();

// Reserva por WhatsApp
$("form").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = $("nombre").value.trim(), msg = $("msg");
  if(!nombre){ msg.className="full msg err"; msg.textContent="Escribe tu nombre para continuar."; $("nombre").focus(); return; }
  const fecha = $("fecha").value ? ` Fecha aproximada: ${$("fecha").value}.` : "";
  const com = $("coment").value.trim() ? ` Comentarios: ${$("coment").value.trim()}` : "";
  const seg = $("seguro").checked ? " Con seguro de viaje." : "";
  const texto = `Hola, soy ${nombre}. Quiero reservar el paquete Vamo A RD (Paraíso Dominicano) para ${n} persona(s).${seg}${fecha}${com} Total estimado: ${$("total").textContent}.`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank");
  msg.className="full msg"; msg.textContent="Abrimos WhatsApp con tus datos. Envía el mensaje para completar la solicitud.";
});