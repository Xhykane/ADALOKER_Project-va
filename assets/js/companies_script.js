document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const currentYearSpan = document.getElementById("currentYearCompanies")
  const logoutButton = document.getElementById("logoutButtonSeeker_companies")
  const navProfileIcon = document.getElementById("navProfileIconSeeker_companies")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
    document.querySelectorAll(".nav-link, .profile-button, .logout-button-nav").forEach((n) =>
      n.addEventListener("click", (e) => {
        if (
          window.innerWidth < 769 &&
          !(
            e.currentTarget.classList.contains("logout-button-nav") &&
            e.currentTarget.id === "logoutButtonSeeker_companies"
          )
        ) {
          if (!e.currentTarget.getAttribute("href").startsWith("#")) {
            hamburger.classList.remove("active")
            navMenu.classList.remove("active")
          }
        }
      }),
    )
  }
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  const storedUserData = JSON.parse(localStorage.getItem("userDataADAloker"))
  if (storedUserData && storedUserData.profilePicture && navProfileIcon) {
    navProfileIcon.src = storedUserData.profilePicture
  }
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault()
      if (confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem("jobseekerLoggedIn")
        localStorage.removeItem("userDataADAloker")
        window.location.href = "/index.html"
      }
    })
  }

  const allCompanies = [
    {
      id: 1,
      name: "PT. Anta Kirana",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
      banner: "/ADAloker_vercel/assets/images/company_banner_sample1.jpg",
      industry: "Teknologi Informasi",
      location: "Jakarta, Indonesia",
      employeeCount: "50-200 Karyawan",
      description: "Perusahaan teknologi terdepan...",
      openJobs: 5,
    },
    {
      id: 2,
      name: "Tech Solutions Inc.",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample2.png",
      banner: "/ADAloker_vercel/assets/images/company_banner_sample2.jpg",
      industry: "Pendidikan & Teknologi",
      location: "Bandung, Indonesia",
      employeeCount: "20-50 Karyawan",
      description: "Startup EdTech yang berkembang pesat...",
      openJobs: 3,
    },
    {
      id: 3,
      name: "Creative Agency XYZ",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample3.png",
      banner: "/ADAloker_vercel/assets/images/company_banner_sample3.jpg",
      industry: "Pemasaran & Periklanan",
      location: "Surabaya, Indonesia",
      employeeCount: "10-20 Karyawan",
      description: "Agensi kreatif layanan branding...",
      openJobs: 2,
    },
  ]

  const companyListingsGrid = document.getElementById("companyListingsGrid")
  const companySearchInput = document.getElementById("companySearchInput")
  const companySearchButton = document.getElementById("companySearchButton")
  const companySortBy = document.getElementById("companySortBy")
  const displayedCompanyCountSpan = document.getElementById("displayedCompanyCount")
  const noCompaniesMessage = document.getElementById("noCompaniesMessage")

  function createCompanyCard(company) {
    const card = document.createElement("div")
    card.classList.add("company-card")
    card.innerHTML = `
            <div class="company-banner"><img src="${company.banner || "https://via.placeholder.com/300x120.png?text=Banner"}" alt="${company.name} Banner"></div>
            <div class="company-card-content">
                <div class="company-logo-name"><img src="${company.logo || "https://via.placeholder.com/50x50.png?text=Logo"}" alt="${company.name} Logo" class="company-logo"><h3>${company.name}</h3></div>
                <div class="company-info"><p><i class="fas fa-industry"></i> ${company.industry}</p><p><i class="fas fa-map-marker-alt"></i> ${company.location}</p><p><i class="fas fa-users"></i> ${company.employeeCount}</p></div>
                <p class="company-description-short">${company.description}</p>
                <a href="/cari_lowongan.html?company_id=${company.id}" class="company-jobs-link">Lihat ${company.openJobs} Lowongan</a>
            </div>
        `
    card.addEventListener("click", (event) => {
      if (!event.target.classList.contains("company-jobs-link")) {
        window.location.href = `/company_detail_page.html?id=${company.id}`
      }
    })
    return card
  }

  function renderCompanyListings(companiesToRender) {
    companyListingsGrid.innerHTML = ""
    if (companiesToRender.length === 0) {
      noCompaniesMessage.style.display = "block"
    } else {
      noCompaniesMessage.style.display = "none"
      companiesToRender.forEach((company) => {
        const companyCard = createCompanyCard(company)
        companyListingsGrid.appendChild(companyCard)
      })
    }
    displayedCompanyCountSpan.textContent = companiesToRender.length
  }

  function sortCompanies(companies, sortBy) {
    const sortedCompanies = [...companies]
    switch (sortBy) {
      case "name-asc":
        sortedCompanies.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sortedCompanies.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "jobs-desc":
        sortedCompanies.sort((a, b) => b.openJobs - a.openJobs)
        break
      default:
        sortedCompanies.sort((a, b) => a.name.localeCompare(b.name))
    }
    return sortedCompanies
  }

  function filterAndSortCompanies() {
    const searchTerm = companySearchInput.value.toLowerCase().trim()
    const sortByValue = companySortBy.value
    const filteredCompanies = allCompanies.filter((company) => {
      return (
        searchTerm === "" ||
        company.name.toLowerCase().includes(searchTerm) ||
        company.industry.toLowerCase().includes(searchTerm) ||
        company.location.toLowerCase().includes(searchTerm)
      )
    })
    const sortedAndFilteredCompanies = sortCompanies(filteredCompanies, sortByValue)
    renderCompanyListings(sortedAndFilteredCompanies)
  }

  if (companySearchButton) companySearchButton.addEventListener("click", filterAndSortCompanies)
  if (companySearchInput)
    companySearchInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || companySearchInput.value.trim() === "") {
        filterAndSortCompanies()
      }
    })
  if (companySortBy) companySortBy.addEventListener("change", filterAndSortCompanies)
  filterAndSortCompanies()
})
