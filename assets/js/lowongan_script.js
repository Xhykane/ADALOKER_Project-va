document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const currentYearSpan = document.getElementById("currentYear")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
    document.querySelectorAll(".nav-link, .profile-button, .logout-button-nav").forEach((n) =>
      n.addEventListener("click", () => {
        if (window.innerWidth < 769) {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        }
      }),
    )
  }

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  const allJobListings = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "PT. Anta Kirana",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
      location: "Jakarta, Indonesia",
      jobType: "WFO",
      salaryRange: "8000000-12000000",
      salaryDisplay: "Rp 8 Juta - 12 Juta",
      description: "Mengembangkan antarmuka pengguna yang responsif dan interaktif untuk aplikasi web kami.",
      postedDate: "2024-07-20",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Tech Solutions Inc.",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample2.png",
      location: "Bandung, Indonesia",
      jobType: "Hybrid",
      salaryRange: "7000000-10000000",
      salaryDisplay: "Rp 7 Juta - 10 Juta",
      description: "Merancang pengalaman pengguna yang intuitif dan menarik secara visual.",
      postedDate: "2024-07-18",
    },
    {
      id: 3,
      title: "Backend Developer (Node.js)",
      company: "PT. Anta Kirana",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
      location: "Yogyakarta, Indonesia",
      jobType: "WFH",
      salaryRange: "10000001-15000000",
      salaryDisplay: "Rp 10 Juta - 15 Juta",
      description: "Membangun dan memelihara sisi server aplikasi kami.",
      postedDate: "2024-07-22",
    },
    {
      id: 4,
      title: "Digital Marketing Specialist",
      company: "Creative Agency XYZ",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample3.png",
      location: "Surabaya, Indonesia",
      jobType: "WFA",
      salaryRange: "5000001-10000000",
      salaryDisplay: "Rp 5 Juta - 10 Juta",
      description: "Mengelola kampanye pemasaran digital, SEO, SEM, dan media sosial.",
      postedDate: "2024-07-15",
    },
  ]

  const jobListingsGrid = document.getElementById("jobListingsGrid")
  const searchInput = document.getElementById("searchInput")
  const searchButton = document.getElementById("searchButton")
  const filterCompany = document.getElementById("filterCompany")
  const filterJobType = document.getElementById("filterJobType")
  const filterSalary = document.getElementById("filterSalary")
  const resetFilterButton = document.getElementById("resetFilterButton")
  const displayedJobCountSpan = document.getElementById("displayedJobCount")
  const noJobsMessage = document.getElementById("noJobsMessage")
  const logoutButtonSeeker = document.getElementById("logoutButtonSeeker")
  const navProfileIconSeeker = document.getElementById("navProfileIconSeeker")

  const storedUserData = JSON.parse(localStorage.getItem("userDataADAloker"))
  if (storedUserData && storedUserData.profilePicture && navProfileIconSeeker) {
    navProfileIconSeeker.src = storedUserData.profilePicture
  }

  if (logoutButtonSeeker) {
    logoutButtonSeeker.addEventListener("click", (event) => {
      event.preventDefault()
      if (confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem("jobseekerLoggedIn")
        localStorage.removeItem("userDataADAloker")
        window.location.href = "/index.html"
      }
    })
  }

  function createJobCard(job) {
    const card = document.createElement("div")
    card.classList.add("job-card")
    card.innerHTML = `
            <div class="job-card-header">
                <img src="${job.logo}" alt="${job.company} Logo" class="company-logo">
                <div class="job-title-company">
                    <h4>${job.title}</h4>
                    <p class="company-name">${job.company}</p>
                </div>
            </div>
            <div class="job-details-icons">
                <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                <p><i class="fas fa-briefcase"></i> ${job.jobType}</p>
                <p><i class="fas fa-money-bill-wave"></i> ${job.salaryDisplay}</p>
            </div>
            <p class="job-description-short">${job.description}</p>
            <a href="/detail_lowongan.html?id=${job.id}" class="btn-view-details">Lihat Detail</a>
        `
    card.addEventListener("click", (event) => {
      if (!event.target.classList.contains("btn-view-details")) {
        window.location.href = `/detail_lowongan.html?id=${job.id}`
      }
    })
    return card
  }

  function renderJobListings(jobsToRender) {
    jobListingsGrid.innerHTML = ""
    if (jobsToRender.length === 0) {
      noJobsMessage.style.display = "block"
    } else {
      noJobsMessage.style.display = "none"
      jobsToRender.forEach((job) => {
        const jobCard = createJobCard(job)
        jobListingsGrid.appendChild(jobCard)
      })
    }
    displayedJobCountSpan.textContent = jobsToRender.length
  }

  function filterAndSearchJobs() {
    const searchTerm = searchInput.value.toLowerCase().trim()
    const selectedCompany = filterCompany.value
    const selectedJobType = filterJobType.value
    const selectedSalaryRange = filterSalary.value

    const filteredJobs = allJobListings.filter((job) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      const matchesCompany = selectedCompany === "" || job.company === selectedCompany
      const matchesJobType = selectedJobType === "" || job.jobType === selectedJobType
      let matchesSalary = true
      if (selectedSalaryRange !== "") {
        const [minStr, maxStr] = job.salaryRange.split("-")
        const jobMinSalary = Number.parseInt(minStr)
        const jobMaxSalary = maxStr ? Number.parseInt(maxStr) : Number.POSITIVE_INFINITY
        const [filterMinStr, filterMaxStr] = selectedSalaryRange.split("-")
        const filterMinSalary = Number.parseInt(filterMinStr)
        const filterMaxSalary = filterMaxStr ? Number.parseInt(filterMaxStr) : Number.POSITIVE_INFINITY
        if (selectedSalaryRange.startsWith("15000001")) {
          // Handle "> 15 Juta"
          matchesSalary = jobMinSalary >= 15000001
        } else {
          matchesSalary = jobMinSalary <= filterMaxSalary && jobMaxSalary >= filterMinSalary
        }
      }
      return matchesSearchTerm && matchesCompany && matchesJobType && matchesSalary
    })
    renderJobListings(filteredJobs)
  }

  if (searchButton) searchButton.addEventListener("click", filterAndSearchJobs)
  if (searchInput)
    searchInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || searchInput.value.trim() === "") {
        filterAndSearchJobs()
      }
    })
  if (filterCompany) filterCompany.addEventListener("change", filterAndSearchJobs)
  if (filterJobType) filterJobType.addEventListener("change", filterAndSearchJobs)
  if (filterSalary) filterSalary.addEventListener("change", filterAndSearchJobs)

  if (resetFilterButton) {
    resetFilterButton.addEventListener("click", () => {
      searchInput.value = ""
      filterCompany.value = ""
      filterJobType.value = ""
      filterSalary.value = ""
      filterAndSearchJobs()
    })
  }
  renderJobListings(allJobListings)
})
