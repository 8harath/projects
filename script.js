document.addEventListener("DOMContentLoaded", () => {
  // Create starfield background
  createStarfield()

  // Initialize theme
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  const currentTheme = localStorage.getItem("theme")

  if (currentTheme === "light") {
    document.body.classList.remove("dark-theme")
    document.body.classList.add("light-theme")
    document.getElementById("theme-button").innerHTML = '<i class="fas fa-moon"></i>'
  } else {
    document.body.classList.remove("light-theme")
    document.body.classList.add("dark-theme")
    document.getElementById("theme-button").innerHTML = '<i class="fas fa-sun"></i>'
  }

  // Theme toggle functionality
  const themeButton = document.getElementById("theme-button")
  themeButton.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme")
      document.body.classList.add("light-theme")
      localStorage.setItem("theme", "light")
      themeButton.innerHTML = '<i class="fas fa-moon"></i>'
    } else {
      document.body.classList.remove("light-theme")
      document.body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
      themeButton.innerHTML = '<i class="fas fa-sun"></i>'
    }
  })

  // Create modal elements
  const modalOverlay = document.createElement("div")
  modalOverlay.classList.add("modal-overlay")

  const modalContent = document.createElement("div")
  modalContent.classList.add("modal")

  modalOverlay.appendChild(modalContent)
  document.body.appendChild(modalOverlay)

  // Project card click functionality for modal
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    // Set animation delay based on index
    card.style.setProperty("--card-index", index)

    // Add click event to open modal
    card.addEventListener("click", function (e) {
      // Don't open modal if clicking on a button
      if (e.target.closest(".btn")) return

      // Get project data
      const title = this.querySelector(".project-title").textContent
      const description = this.querySelector(".project-description p").textContent
      const imageSrc = this.querySelector(".project-image").src
      const badges = this.querySelectorAll(".badge")
      const exploreLink = this.querySelector(".btn-primary")?.href || "#"
      const demoLink = this.querySelector(".btn-secondary")?.href || "#"

      // Populate modal
      modalContent.innerHTML = `
        <button class="modal-close"><i class="fas fa-times"></i></button>
        <img src="${imageSrc}" alt="${title}" class="modal-image">
        <h2 class="modal-title">${title}</h2>
        <div class="modal-badges"></div>
        <div class="modal-description">
          <p>${description}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
          <p>Key Features:</p>
          <ul>
            <li>Responsive design with modern UI/UX principles</li>
            <li>Optimized performance with lazy loading and code splitting</li>
            <li>Comprehensive testing suite with unit and integration tests</li>
            <li>Detailed documentation for easy maintenance</li>
          </ul>
        </div>
        <div class="modal-actions">
          <a href="${exploreLink}" class="btn btn-primary">Explore Project</a>
          <a href="${demoLink}" class="btn btn-secondary">Live Demo</a>
        </div>
      `

      // Clone badges to modal
      const modalBadgesContainer = modalContent.querySelector(".modal-badges")
      badges.forEach((badge) => {
        const clonedBadge = badge.cloneNode(true)
        modalBadgesContainer.appendChild(clonedBadge)
      })

      // Show modal
      modalOverlay.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling

      // Add close button functionality
      const closeButton = modalContent.querySelector(".modal-close")
      closeButton.addEventListener("click", closeModal)
    })

    // Add hover animations
    card.addEventListener("mouseenter", function () {
      const badges = this.querySelectorAll(".badge")
      badges.forEach((badge, i) => {
        badge.style.transitionDelay = `${i * 0.05}s`
        badge.style.transform = "translateY(-2px)"
      })
    })

    card.addEventListener("mouseleave", function () {
      const badges = this.querySelectorAll(".badge")
      badges.forEach((badge) => {
        badge.style.transitionDelay = "0s"
        badge.style.transform = "translateY(0)"
      })
    })
  })

  // Close modal when clicking outside
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal()
    }
  })

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal()
    }
  })

  function closeModal() {
    modalOverlay.classList.remove("active")
    document.body.style.overflow = "" // Restore scrolling
  }

  // Set badge animation delays
  const badges = document.querySelectorAll(".badge")
  badges.forEach((badge, index) => {
    badge.style.setProperty("--badge-index", index % 3) // Cycle through 3 delay values
  })

  // Add scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".project-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 50) {
        element.classList.add("in-view")
      }
    })
  }

  // Initial animation for visible elements
  setTimeout(animateOnScroll, 100)

  // Add scroll event listener
  window.addEventListener("scroll", animateOnScroll)

  // Add parallax effect to project images
  window.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".project-card")
    const mouseX = e.clientX / window.innerWidth - 0.5
    const mouseY = e.clientY / window.innerHeight - 0.5

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2

      const distanceX = (e.clientX - cardCenterX) / 30
      const distanceY = (e.clientY - cardCenterY) / 30

      // Only apply effect if mouse is relatively close to the card
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      if (distance < 100) {
        const image = card.querySelector(".project-image")
        if (image) {
          image.style.transform = `scale(1.05) translate(${-distanceX / 10}px, ${-distanceY / 10}px)`
        }
      }
    })
  })

  // Create starfield background
  function createStarfield() {
    const starsContainer = document.createElement("div")
    starsContainer.classList.add("stars-container")
    document.body.appendChild(starsContainer)

    // Create stars
    const numberOfStars = 200

    for (let i = 0; i < numberOfStars; i++) {
      createStar(starsContainer)
    }

    // Add new stars periodically
    setInterval(() => {
      if (starsContainer.children.length < 300) {
        createStar(starsContainer)
      }
    }, 1000)
  }

  function createStar(container) {
    const star = document.createElement("div")
    star.classList.add("star")

    // Random size between 1 and 3px
    const size = Math.random() * 2 + 1
    star.style.width = `${size}px`
    star.style.height = `${size}px`

    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    star.style.left = `${posX}%`
    star.style.top = `${-10}%` // Start above the viewport

    // Random speed between 20 and 60 seconds
    const duration = Math.random() * 40 + 20
    star.style.animationDuration = `${duration}s`

    // Random delay
    const delay = Math.random() * 20
    star.style.animationDelay = `${delay}s`

    // Random opacity
    const opacity = Math.random() * 0.5 + 0.3
    star.style.opacity = opacity

    // Add to container
    container.appendChild(star)

    // Remove star after animation completes
    setTimeout(
      () => {
        if (container.contains(star)) {
          container.removeChild(star)
        }
      },
      (duration + delay) * 1000,
    )
  }
})
