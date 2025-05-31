document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const currentYearSpan = document.getElementById("currentYearDetail")
  const logoutButton = document.getElementById("logoutButtonSeeker_detail")
  const navProfileIcon = document.getElementById("navProfileIconSeeker_detail")

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

  const jobDetailContent = document.getElementById("jobDetailContent")
  const sidebarCompanyInfo = document.getElementById("sidebarCompanyInfo")
  const relatedJobsList = document.getElementById("relatedJobsList")
  const applyNowButton = document.getElementById("applyNowButton")

  const allJobListings = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "PT. Anta Kirana",
      logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
      location: "Jakarta, Indonesia",
      jobType: "WFO",
      salaryDisplay: "Rp 8 Juta - 12 Juta",
      postedDate: "20 Juli 2024",
      descriptionFull: `<p>Kami mencari seorang Frontend Developer...</p><h4>Tanggung Jawab Utama:</h4><ul><li>Mengembangkan fitur baru...</li><li>Berkolaborasi erat...</li></ul><h4>Kualifikasi:</h4><ul><li>Minimal 2 tahun pengalaman...</li><li>Mahir dalam HTML5...</li></ul>`,
      companyDescription: "PT. Anta Kirana adalah perusahaan teknologi...",
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
      descriptionFull: `<p>Tech Solutions Inc. sedang mencari UI/UX Designer...</p><h4>Tanggung Jawab Utama:</h4><ul><li>Melakukan riset pengguna...</li></ul><h4>Kualifikasi:</h4><ul><li>Portofolio yang menunjukkan...</li></ul>`,
      companyDescription: "Tech Solutions Inc. adalah startup EdTech...",
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
      descriptionFull: "<p>Deskripsi lengkap untuk Backend Developer...</p>",
      companyDescription: "PT. Anta Kirana adalah perusahaan teknologi...",
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
      descriptionFull: "<p>Deskripsi lengkap untuk Senior Frontend Developer...</p>",
      companyDescription: "PT. Anta Kirana adalah perusahaan teknologi...",
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
      descriptionFull: "<p>Deskripsi lengkap untuk Fullstack Developer...</p>",
      companyDescription: "Tech Solutions Inc. adalah startup EdTech...",
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
      descriptionFull: "<p>Deskripsi lengkap untuk Graphic Designer...</p>",
      companyDescription: "Creative Agency XYZ adalah agensi butik...",
      companyWebsite: "https://www.creativexyz.example.com",
    },
  ]

  function getJobIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    return Number.parseInt(urlParams.get("id"))
  }

  function findJobById(id) {
    return allJobListings.find((job) => job.id === id)
  }

  function renderJobDetail(job) {
    if (!job || !jobDetailContent) {
      jobDetailContent.innerHTML = '<p class="error-message">Lowongan tidak ditemukan.</p>'
      return
    }
    document.title = `${job.title} - ADAloker`
    jobDetailContent.innerHTML = `
            <div class="job-header">
                <img src="${job.logo}" alt="${job.company} Logo" class="company-logo-detail">
                <div class="job-title-main">
                    <h1>${job.title}</h1>
                    <span class="company-name-detail">${job.company}</span>
                    <span class="location-detail"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                </div>
            </div>
            <div class="job-meta-info">
                <span class="meta-item"><i class="fas fa-briefcase"></i> ${job.jobType}</span>
                <span class="meta-item"><i class="fas fa-money-bill-wave"></i> ${job.salaryDisplay}</span>
                <span class="meta-item"><i class="far fa-calendar-alt"></i> Diposting: ${job.postedDate}</span>
            </div>
            <div class="job-section job-description-full">
                <h3>Deskripsi Pekerjaan</h3>
                ${job.descriptionFull}
            </div>
            <div class="job-section company-overview">
                 <h3>Tentang Perusahaan: ${job.company}</h3>
                 <p>${job.companyDescription || "Informasi perusahaan tidak tersedia."}</p>
                 ${job.companyWebsite ? `<p><strong>Website:</strong> <a href="${job.companyWebsite}" target="_blank" rel="noopener noreferrer" class="company-website-link">${job.companyWebsite}</a></p>` : ""}
            </div>
        `
    if (sidebarCompanyInfo) {
      sidebarCompanyInfo.innerHTML = `
                <h4>Tentang ${job.company}</h4>
                <img src="${job.logo}" alt="${job.company} Logo" style="max-width: 60px; border-radius: 5px; margin-bottom: 10px; background-color: #fff; padding: 3px;">
                <p>${job.companyDescription ? job.companyDescription.substring(0, 150) + "..." : "Deskripsi singkat perusahaan..."}</p>
                ${job.companyWebsite ? `<p><a href="${job.companyWebsite}" target="_blank" rel="noopener noreferrer" class="company-website-link">Kunjungi Website</a></p>` : ""}
            `
    }
  }

  function renderRelatedJobs(currentJobId, currentJobCompany) {
    if (!relatedJobsList) return
    relatedJobsList.innerHTML = ""
    const related = allJobListings
      .filter((job) => job.id !== currentJobId && job.company === currentJobCompany) // Lowongan dari perusahaan yang sama
      .slice(0, 3)

    if (related.length > 0) {
      related.forEach((job) => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="/detail_lowongan.html?id=${job.id}">${job.title}</a>`
        relatedJobsList.appendChild(li)
      })
    } else {
      const otherCompanyJobs = allJobListings.filter((job) => job.id !== currentJobId).slice(0, 3)
      if (otherCompanyJobs.length > 0) {
        otherCompanyJobs.forEach((job) => {
          const li = document.createElement("li")
          li.innerHTML = `<a href="/detail_lowongan.html?id=${job.id}">${job.title} - ${job.company}</a>`
          relatedJobsList.appendChild(li)
        })
      } else {
        relatedJobsList.innerHTML = "<li>Tidak ada lowongan serupa saat ini.</li>"
      }
    }
  }

  const jobId = getJobIdFromUrl()
  if (jobId) {
    const selectedJob = findJobById(jobId)
    if (selectedJob) {
      renderJobDetail(selectedJob)
      renderRelatedJobs(selectedJob.id, selectedJob.company)
    } else {
      jobDetailContent.innerHTML = '<p class="error-message">Detail lowongan tidak ditemukan.</p>'
    }
  } else {
    jobDetailContent.innerHTML =
      '<p class="error-message">ID lowongan tidak diberikan. Silakan kembali ke halaman <a href="/cari_lowongan.html">pencarian lowongan</a>.</p>'
  }

  if (applyNowButton) {
    applyNowButton.addEventListener("click", () => {
      if (jobId) {
        window.location.href = `/formulir_lamaran.html?job_id=${jobId}`
      } else {
        alert("Tidak bisa melamar, ID lowongan tidak ditemukan.")
      }
    })
  }

  const saveJobButton = document.getElementById("saveJobButton")
  if (saveJobButton) {
    saveJobButton.addEventListener("click", () => {
      const icon = saveJobButton.querySelector("i")
      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        saveJobButton.innerHTML = '<i class="fas fa-bookmark"></i> Tersimpan'
        alert("Lowongan disimpan (simulasi)!")
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        saveJobButton.innerHTML = '<i class="far fa-bookmark"></i> Simpan Lowongan'
        alert("Penyimpanan lowongan dibatalkan (simulasi)!")
      }
    })
  }
})
