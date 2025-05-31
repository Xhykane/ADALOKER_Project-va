document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const currentYearSpan = document.getElementById("currentYearCompanyDetail")
  const logoutButton = document.getElementById("logoutButtonSeeker_compDetail")
  const navProfileIcon = document.getElementById("navProfileIconSeeker_compDetail")

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
            e.currentTarget.id === "logoutButtonSeeker_compDetail"
          )
        ) {
          if (!e.currentTarget.getAttribute("href").startsWith("#")) {
            // Cek jika bukan anchor link
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

  const tabLinks = document.querySelectorAll(".tab-link")
  const tabContents = document.querySelectorAll(".tab-content")
  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const tabId = link.dataset.tab
      tabLinks.forEach((l) => l.classList.remove("active"))
      link.classList.add("active")
      tabContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === tabId) {
          content.classList.add("active")
        }
      })
    })
  })

  const companyProfiles = {
    1: {
      id: 1,
      name: "PT. Anta Kirana",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
      banner: "/ADAloker_vercel/assets/images/company_banner_sample1.jpg",
      tagline: "Inovasi Teknologi.",
      industry: "Teknologi Informasi",
      location: "Jakarta",
      employeeCount: "50-200",
      website: "https://www.antakirana.example.com",
      about: "<p>PT. Anta Kirana adalah...</p>",
      culture: "<h4>Budaya Kerja...</h4><ul><li>Kolaborasi...</li></ul>",
      activeJobs: [
        {
          id: 101,
          title: "Senior Frontend Developer",
          location: "Jakarta",
          jobType: "WFO",
          salaryDisplay: "Rp 15 Jt - 20 Jt",
          shortDesc: "Memimpin pengembangan...",
          companyLogo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
        },
      ],
    },
    2: {
      id: 2,
      name: "Tech Solutions Inc.",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample2.png",
      banner: "/ADAloker_vercel/assets/images/company_banner_sample2.jpg",
      tagline: "Pendidikan & Teknologi.",
      industry: "EdTech",
      location: "Bandung",
      employeeCount: "20-50",
      website: "https://www.techsolutions.example.com",
      about: "<p>Tech Solutions Inc. adalah...</p>",
      culture: "<h4>Budaya Kerja...</h4><ul><li>Cepat & Gesit...</li></ul>",
      activeJobs: [
        {
          id: 201,
          title: "Fullstack Developer",
          location: "Bandung",
          jobType: "Hybrid",
          salaryDisplay: "Rp 9 Jt - 14 Jt",
          shortDesc: "Mengembangkan fitur...",
          companyLogo: "/ADAloker_vercel/assets/images/company_logo_sample2.png",
        },
      ],
    },
    3: {
      id: 3,
      name: "Creative Agency XYZ",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample3.png",
      banner: "/ADAloker_vercel/assets/images/company_banner_sample3.jpg",
      tagline: "Solusi Kreatif.",
      industry: "Pemasaran",
      location: "Surabaya",
      employeeCount: "10-20",
      website: "https://www.creativexyz.example.com",
      about: "<p>Creative Agency XYZ adalah...</p>",
      culture: "<h4>Budaya Kerja...</h4><ul><li>Kreativitas...</li></ul>",
      activeJobs: [
        {
          id: 301,
          title: "Graphic Designer",
          location: "Surabaya",
          jobType: "Hybrid",
          salaryDisplay: "Rp 6 Jt - 9 Jt",
          shortDesc: "Membuat desain visual...",
          companyLogo: "/ADAloker_vercel/assets/images/company_logo_sample3.png",
        },
      ],
    },
  }
  const allJobListings = [
    /* Data dari lowongan_script.js atau sumber terpusat */
    {
      id: 1,
      title: "Frontend Developer",
      company: "PT. Anta Kirana",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
      location: "Jakarta, Indonesia",
      jobType: "WFO",
      salaryDisplay: "Rp 8 Juta - 12 Juta",
      postedDate: "20 Juli 2024",
      descriptionFull: `<p>Deskripsi lengkap...</p>`,
      companyDescription: "PT. Anta Kirana...",
      companyWebsite: "https://www.antakirana.example.com",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Tech Solutions Inc.",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample2.png",
      location: "Bandung, Indonesia",
      jobType: "Hybrid",
      salaryDisplay: "Rp 7 Juta - 10 Juta",
      postedDate: "18 Juli 2024",
      descriptionFull: `<p>Deskripsi lengkap...</p>`,
      companyDescription: "Tech Solutions Inc. ...",
      companyWebsite: "https://www.techsolutions.example.com",
    },
    {
      id: 3,
      title: "Backend Developer (Node.js)",
      company: "PT. Anta Kirana",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
      location: "Yogyakarta, Indonesia",
      jobType: "WFH",
      salaryDisplay: "Rp 10 Juta - 15 Juta",
      postedDate: "22 Juli 2024",
      descriptionFull: "<p>Deskripsi lengkap...</p>",
      companyDescription: "PT. Anta Kirana...",
      companyWebsite: "https://www.antakirana.example.com",
    },
    {
      id: 101,
      title: "Senior Frontend Developer",
      company: "PT. Anta Kirana",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
      location: "Jakarta",
      jobType: "WFO",
      salaryDisplay: "Rp 15 Juta - 20 Juta",
      postedDate: "25 Juli 2024",
      descriptionFull: "<p>Deskripsi lengkap...</p>",
      companyDescription: "PT. Anta Kirana...",
      companyWebsite: "https://www.antakirana.example.com",
    },
    {
      id: 201,
      title: "Fullstack Developer (React & Python)",
      company: "Tech Solutions Inc.",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample2.png",
      location: "Bandung",
      jobType: "Hybrid",
      salaryDisplay: "Rp 9 Juta - 14 Juta",
      postedDate: "26 Juli 2024",
      descriptionFull: "<p>Deskripsi lengkap...</p>",
      companyDescription: "Tech Solutions Inc. ...",
      companyWebsite: "https://www.techsolutions.example.com",
    },
    {
      id: 301,
      title: "Graphic Designer",
      company: "Creative Agency XYZ",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample3.png",
      location: "Surabaya",
      jobType: "Hybrid",
      salaryDisplay: "Rp 6 Juta - 9 Juta",
      postedDate: "27 Juli 2024",
      descriptionFull: "<p>Deskripsi lengkap...</p>",
      companyDescription: "Creative Agency XYZ...",
      companyWebsite: "https://www.creativexyz.example.com",
    },
  ]

  const companyHeaderSection = document.getElementById("companyHeaderSection")
  const aboutCompanyContent = document.getElementById("aboutCompany")
  const companyCultureContent = document.getElementById("companyCulture")
  const companyActiveJobsGrid = document.getElementById("companyActiveJobsGrid")
  const activeJobsCountSpan = document.getElementById("activeJobsCount")

  function getCompanyIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    return Number.parseInt(urlParams.get("id"))
  }
  function renderCompanyHeader(company) {
    if (!companyHeaderSection || !company) return
    companyHeaderSection.style.backgroundImage = `url('${company.banner || "https://via.placeholder.com/1500x350.png?text=Banner"}')`
    companyHeaderSection.innerHTML = `<div class="container company-header-content"><img src="${company.logo}" alt="${company.name} Logo" class="company-header-logo"><div class="company-header-info"><h1>${company.name}</h1>${company.tagline ? `<p class="company-tagline">${company.tagline}</p>` : ""}<div class="company-meta"><span><i class="fas fa-industry"></i> ${company.industry}</span><span><i class="fas fa-map-marker-alt"></i> ${company.location}</span><span><i class="fas fa-users"></i> ${company.employeeCount}</span></div></div></div>`
  }
  function renderAboutCompany(company) {
    if (!aboutCompanyContent || !company) return
    aboutCompanyContent.innerHTML = `<h3 class="company-section-title">Tentang ${company.name}</h3>${company.about || "<p>Info akan segera tersedia.</p>"}${company.website ? `<p><strong>Website:</strong> <a href="${company.website}" target="_blank" rel="noopener noreferrer">${company.website}</a></p>` : ""}`
  }
  function renderCompanyCulture(company) {
    if (!companyCultureContent || !company) return
    companyCultureContent.innerHTML = `<h3 class="company-section-title">Budaya Kerja Kami</h3>${company.culture || "<p>Info budaya kerja akan segera tersedia.</p>"}`
  }
  function createJobCardForCompanyPage(job) {
    const card = document.createElement("div")
    card.classList.add("job-card")
    card.innerHTML = `<div class="job-card-header"><div class="job-title-company"><h4>${job.title}</h4></div></div><div class="job-details-icons"><p><i class="fas fa-map-marker-alt"></i> ${job.location}</p><p><i class="fas fa-briefcase"></i> ${job.jobType}</p><p><i class="fas fa-money-bill-wave"></i> ${job.salaryDisplay}</p></div><p class="job-description-short">${job.shortDesc}</p><a href="/detail_lowongan.html?id=${job.id}" class="btn-view-details">Lihat Detail</a>`
    return card
  }
  function renderActiveJobs(company) {
    if (!companyActiveJobsGrid || !company || !company.activeJobs) return
    companyActiveJobsGrid.innerHTML = ""
    activeJobsCountSpan.textContent = company.activeJobs.length
    if (company.activeJobs.length > 0) {
      company.activeJobs.forEach((job) => {
        const jobCard = createJobCardForCompanyPage(job)
        companyActiveJobsGrid.appendChild(jobCard)
      })
    } else {
      companyActiveJobsGrid.innerHTML =
        '<p class="loading-tab-content" style="text-align:left; padding:10px 0;">Tidak ada lowongan aktif.</p>'
    }
  }
  function findJobById(id) {
    return allJobListings.find((job) => job.id === id)
  } // Tambahkan ini jika belum ada
  function renderRelatedJobs(currentJobId, currentJobCompany) {
    // Fungsi dari detail_lowongan_script.js, mungkin perlu disesuaikan atau dihapus jika tidak relevan di sini
    const relatedJobsList = document.getElementById("relatedJobsList") // Asumsi ID ini ada di HTML halaman ini
    if (!relatedJobsList) return
    relatedJobsList.innerHTML = ""
    const related = allJobListings
      .filter((job) => job.id !== currentJobId && job.company === currentJobCompany)
      .slice(0, 3)

    if (related.length > 0) {
      related.forEach((job) => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="/detail_lowongan.html?id=${job.id}">${job.title}</a>`
        relatedJobsList.appendChild(li)
      })
    } else {
      relatedJobsList.innerHTML = "<li>Tidak ada lowongan serupa dari perusahaan ini.</li>"
    }
  }

  const companyId = getCompanyIdFromUrl()
  if (companyId) {
    const selectedCompany = companyProfiles[companyId]
    if (selectedCompany) {
      document.title = `${selectedCompany.name} - Profil Perusahaan - ADAloker`
      renderCompanyHeader(selectedCompany)
      renderAboutCompany(selectedCompany)
      renderCompanyCulture(selectedCompany)
      renderActiveJobs(selectedCompany)
      // Panggil renderRelatedJobs jika sidebar-related-jobs ada di HTML halaman ini
      // renderRelatedJobs(null, selectedCompany.name); // Berikan null untuk currentJobId karena kita tidak di detail lowongan spesifik
    } else {
      const wrapper = document.getElementById("companyDetailWrapper")
      if (wrapper)
        wrapper.innerHTML =
          '<div class="container" style="padding:50px 0; text-align:center; font-size:1.2rem;">Profil perusahaan tidak ditemukan.</div>'
    }
  } else {
    const wrapper = document.getElementById("companyDetailWrapper")
    if (wrapper)
      wrapper.innerHTML =
        '<div class="container" style="padding:50px 0; text-align:center; font-size:1.2rem;">ID perusahaan tidak diberikan. Kembali ke <a href="/companies_page.html">daftar perusahaan</a>.</div>'
  }
})
