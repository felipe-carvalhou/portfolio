const tpl = document.getElementById("cardTpl");
const cards = document.getElementById("cards");
const search = document.getElementById("search");

function tagPill(text) {
  const s = document.createElement("span");
  s.className =
    "text-xs px-2 py-1 rounded-lg border border-white/10 bg-slate-800/60";
  s.textContent = text;
  return s;
}

function render(list) {
  cards.innerHTML = "";
  list.forEach((p) => {
    const node = tpl.content.cloneNode(true);
    node.querySelector("[data-card-title]").textContent = p.titulo;
    node.querySelector("[data-card-desc]").textContent = p.descricao;
    node.querySelector("[data-card-link]").href = p.link || "#";
    node.querySelector("[data-card-cover]").src =
      p.capa || "https://placehold.co/800x450/png?text=Projeto";
    node.querySelector("[data-card-meta]").textContent = p.meta || "";
    const tags = node.querySelector("[data-card-tags]");
    (p.tags || []).forEach((t) => tags.appendChild(tagPill(t)));
    cards.appendChild(node);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

const defaultProjects = [
  {
    titulo: "TechHub (conceito)",
    descricao:
      "Sistema de backlog/changelog com múltiplos papéis e notificações. Stack: Laravel + Livewire + PostgreSQL + Docker.",
    capa: "https://placehold.co/800x450/8b5cf6/ffffff?text=TechHub",
    tags: ["Laravel", "PostgreSQL", "Docker"],
    link: "#",
    meta: "Em desenvolvimento",
  },
  {
    titulo: "Psychoflix (conceito)",
    descricao:
      "Plataforma de agendamentos para profissionais, perfis e pagamentos.",
    capa: "https://placehold.co/800x450/22d3ee/0b1324?text=Psychoflix",
    tags: ["Django", "Tailwind", "REST"],
    link: "#",
    meta: "Protótipo",
  },
  {
    titulo: "FutebolSeguro (landing)",
    descricao: "Landing page com cards dinâmicos e responsivos.",
    capa: "https://placehold.co/800x450/fb7185/0b1324?text=FutebolSeguro",
    tags: ["HTML", "Tailwind", "JS"],
    link: "#",
    meta: "UI/UX",
  },
];

async function loadProjects() {
  try {
    const res = await fetch("./projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error("fetch");
    const data = await res.json();
    render(data);
    if (search)
      search.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = data.filter(
          (p) =>
            p.titulo.toLowerCase().includes(q) ||
            p.descricao.toLowerCase().includes(q) ||
            (p.tags || []).some((t) => t.toLowerCase().includes(q))
        );
        render(filtered);
      });
  } catch (_) {
    render(defaultProjects);
    if (search)
      search.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = defaultProjects.filter(
          (p) =>
            p.titulo.toLowerCase().includes(q) ||
            p.descricao.toLowerCase().includes(q) ||
            (p.tags || []).some((t) => t.toLowerCase().includes(q))
        );
        render(filtered);
      });
  }
}

loadProjects();

const techs = [
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  },
  {
    name: "Django",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "Linux/WSL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  },
  {
    name: "Node/APIs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
];

const track = document.getElementById("tech-track");
const wrap = document.getElementById("stackWrap");

if (track && wrap) {
  const itemHTML = (t) =>
    `<li class="min-w-[140px] no-select"><figure class="group p-3 rounded-2xl bg-slate-900/60 border border-white/10 hover:shadow-glow transition text-center"><img class="h-10 mx-auto" alt="${t.name}" src="${t.icon}" loading="lazy" decoding="async"><figcaption class="mt-2 text-xs text-slate-300">${t.name}</figcaption></figure></li>`;
  track.innerHTML = techs.concat(techs).map(itemHTML).join("");
  let paused = false;
  let x = 0;
  const speed = 0.6;
  function loop() {
    if (!paused) {
      x -= speed;
      const half = track.scrollWidth / 2;
      if (-x >= half) x = 0;
      track.style.transform = `translateX(${x}px)`;
    }
    requestAnimationFrame(loop);
  }
  loop();
  wrap.addEventListener("mouseenter", () => (paused = true));
  wrap.addEventListener("mouseleave", () => (paused = false));
  let startX = 0,
    startOffset = 0;
  wrap.addEventListener("pointerdown", (e) => {
    paused = true;
    startX = e.clientX;
    startOffset = x;
    wrap.setPointerCapture(e.pointerId);
  });
  wrap.addEventListener("pointermove", (e) => {
    if (e.pressure !== 0) {
      x = startOffset + (e.clientX - startX);
      track.style.transform = `translateX(${x}px)`;
    }
  });
  wrap.addEventListener("pointerup", () => {
    paused = false;
  });
}
