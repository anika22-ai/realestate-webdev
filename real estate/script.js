// Create words dynamically for each container
document.querySelectorAll(".container").forEach((container) => {
  const sentence = container.getAttribute("data-sentence");
  const words = sentence.split(" ");

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.classList.add("word");
    span.textContent = word;
    span.style.transitionDelay = `${index * 0.2}s`; // stagger reveal
    container.appendChild(span);
    container.append(" ");
  });
});

// Scroll reveal logic
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".word").forEach((word) => {
          word.classList.add("reveal");
        });
      }
    });
  },
  { threshold: 0.3 }
);

// Observe all containers
document.querySelectorAll(".container").forEach((container) => {
  observer.observe(container);
});

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Increase multiplier for stronger tilt (was 10 → now 25)
    const rotateX = ((y - centerY) / centerY) * 50;
    const rotateY = ((x - centerX) / centerX) * 50;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
    card.style.boxShadow = `${-rotateY * 1.2}px ${
      rotateX * 1.2
    }px 40px rgba(0,0,0,0.4)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  });
});
