document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const currentYearSpan = document.getElementById("currentYearDashboard")
  const navCompanyNameSpan = document.getElementById("navCompanyName")
  const navCompanyLogoImg = document.getElementById("navCompanyLogo")
  const welcomeCompanyNameSpan = document.getElementById("welcomeCompanyName")
  const navCompanyProfileButton = document.getElementById("companyProfileNavButton")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
    document.querySelectorAll(".nav-link, .profile-button, .logout-button-nav").forEach((n) =>
      n.addEventListener("click", (e) => {
        if (
          e.currentTarget.classList.contains("logout-button-nav") ||
          e.currentTarget.id === "companyProfileNavButton"
        ) {
          // Jangan tutup menu jika klik logout atau tombol profil company di navbar saat mobile
          // Biarkan default behavior link atau JS yang menangani
        } else if (window.innerWidth < 769) {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        }
      }),
    )
  }
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  const companyData = JSON.parse(localStorage.getItem("loggedInCompanyData")) || {
    id: 1,
    name: "PT. Teknologi Maju Indonesia",
    logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
    banner: "/ADAloker_vercel/assets/images/company_banner_sample1.jpg",
    industry: "Teknologi Informasi",
    location: "Jakarta, Indonesia",
    tagline: "Inovasi untuk Masa Depan Digital",
    about:
      "PT. Teknologi Maju Indonesia adalah perusahaan teknologi terdepan yang berfokus pada pengembangan solusi digital inovatif untuk berbagai industri. Kami berkomitmen untuk menciptakan teknologi yang dapat meningkatkan efisiensi dan produktivitas bisnis.",
    website: "https://www.teknologimaju.co.id",
    postedJobs: [
      {
        id: "job-1704067200000",
        title: "Senior Frontend Developer",
        location: "Jakarta, Indonesia",
        jobType: "Hybrid",
        salaryDisplay: "Rp 15 Juta - 22 Juta",
        salaryRangeInternal: "15000000-22000000",
        description:
          "Kami mencari Senior Frontend Developer yang berpengalaman untuk bergabung dengan tim pengembangan kami. Kandidat ideal memiliki keahlian mendalam dalam React.js, TypeScript, dan modern web technologies.\n\nTanggung Jawab:\n• Mengembangkan dan memelihara aplikasi web frontend\n• Berkolaborasi dengan tim backend dan UI/UX designer\n• Mengoptimalkan performa aplikasi\n• Melakukan code review dan mentoring junior developer\n\nKualifikasi:\n• Minimal 4 tahun pengalaman sebagai Frontend Developer\n• Mahir dalam React.js, TypeScript, HTML5, CSS3\n• Pengalaman dengan state management (Redux/Zustand)\n• Familiar dengan testing framework (Jest, Cypress)\n• Memahami responsive design dan cross-browser compatibility",
        applicants: [
          {
            id: "app-001",
            name: "Ahmad Rizki Pratama",
            email: "ahmad.rizki@gmail.com",
            phone: "081234567890",
            cv: "#",
            coverLetter: "#",
            date: "2024-01-15T10:30:00Z",
            status: "pending",
          },
          {
            id: "app-002",
            name: "Sari Dewi Lestari",
            email: "sari.dewi@gmail.com",
            phone: "081234567891",
            cv: "#",
            coverLetter: "#",
            date: "2024-01-16T14:20:00Z",
            status: "pending",
          },
          {
            id: "app-003",
            name: "Budi Santoso",
            email: "budi.santoso@gmail.com",
            phone: "081234567892",
            cv: "#",
            coverLetter: "#",
            date: "2024-01-17T09:15:00Z",
            status: "pending",
          },
          {
            id: "app-004",
            name: "Maya Indira Putri",
            email: "maya.indira@gmail.com",
            phone: "081234567893",
            cv: "#",
            coverLetter: "#",
            date: "2024-01-18T16:45:00Z",
            status: "pending",
          },
          {
            id: "app-005",
            name: "Dimas Arya Wijaya",
            email: "dimas.arya@gmail.com",
            phone: "081234567894",
            cv: "#",
            coverLetter: "#",
            date: "2024-01-19T11:30:00Z",
            status: "pending",
          },
        ],
      },
      {
        id: "job-1704153600000",
        title: "UI/UX Designer",
        location: "Jakarta, Indonesia",
        jobType: "WFO",
        salaryDisplay: "Rp 10 Juta - 16 Juta",
        salaryRangeInternal: "10000000-16000000",
        description:
          "Bergabunglah dengan tim kreatif kami sebagai UI/UX Designer! Kami mencari individu yang passionate dalam menciptakan pengalaman pengguna yang luar biasa dan desain interface yang menarik.\n\nTanggung Jawab:\n• Melakukan user research dan analisis kebutuhan pengguna\n• Membuat wireframe, prototype, dan mockup\n• Mendesain user interface yang intuitif dan menarik\n• Berkolaborasi dengan developer untuk implementasi desain\n• Melakukan usability testing dan iterasi desain\n\nKualifikasi:\n• Minimal 2 tahun pengalaman sebagai UI/UX Designer\n• Mahir menggunakan Figma, Adobe XD, atau Sketch\n• Memahami design thinking dan user-centered design\n• Portfolio yang menunjukkan kemampuan UI/UX design\n• Kemampuan komunikasi yang baik dan dapat bekerja dalam tim",
        applicants: [
          {
            id: "app-006",
            name: "Rina Maharani",
            email: "rina.maharani@gmail.com",
            phone: "081234567895",
            cv: "#",
            coverLetter: "#",
            date: "2024-01-20T08:45:00Z",
            status: "pending",
          },
          {
            id: "app-007",
            name: "Fajar Nugroho",
            email: "fajar.nugroho@gmail.com",
            phone: "081234567896",
            cv: "#",
            coverLetter: "#",
            date: "2024-01-21T13:20:00Z",
            status: "pending",
          },
          {
            id: "app-008",
            name: "Lina Kartika Sari",
            email: "lina.kartika@gmail.com",
            phone: "081234567897",
            cv: "#",
            coverLetter: "#",
            date: "2024-01-22T15:10:00Z",
            status: "pending",
          },
        ],
      },
    ],
    totalCandidates: 8,
    totalViewsThisWeek: 156,
  }
  localStorage.setItem("loggedInCompanyData", JSON.stringify(companyData))

  if (navCompanyNameSpan) navCompanyNameSpan.textContent = companyData.name
  if (navCompanyLogoImg) navCompanyLogoImg.src = companyData.logo
  if (welcomeCompanyNameSpan) welcomeCompanyNameSpan.textContent = `Selamat Datang, ${companyData.name}!`

  const tabLinksDashboard = document.querySelectorAll(".tab-link-dashboard")
  const tabContentsDashboard = document.querySelectorAll(".tab-content-dashboard")
  const addNewJobButtonFromStat = document.getElementById("addNewJobButtonFromStat")

  function activateTab(tabId) {
    tabLinksDashboard.forEach((link) => {
      link.classList.remove("active")
      if (link.dataset.tab === tabId) {
        link.classList.add("active")
      }
    })
    tabContentsDashboard.forEach((content) => {
      content.classList.remove("active")
      if (content.id === tabId) {
        content.classList.add("active")
      }
    })
    navMenu.querySelectorAll(".nav-link").forEach((navLink) => {
      navLink.classList.remove("active")
      const hrefTarget = navLink.getAttribute("href").split("#")[1]
      if (hrefTarget && tabId.toLowerCase().includes(hrefTarget.toLowerCase())) {
        navLink.classList.add("active")
      } else if (!hrefTarget && tabId === "postedJobsContent" && navLink.getAttribute("href").includes("postedJobs")) {
        navLink.classList.add("active") // Default untuk "Lowongan Saya"
      }
    })
    window.location.hash = tabId.replace("Content", "") // Update hash
  }

  tabLinksDashboard.forEach((link) => {
    link.addEventListener("click", () => activateTab(link.dataset.tab))
  })
  if (navCompanyProfileButton) {
    navCompanyProfileButton.addEventListener("click", (event) => {
      event.preventDefault()
      activateTab("companyProfileContent")
      const targetSection = document.getElementById("companyProfileContent")
      if (targetSection) setTimeout(() => targetSection.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
    })
  }

  if (addNewJobButtonFromStat) {
    addNewJobButtonFromStat.addEventListener("click", () => {
      activateTab("postNewJobContent")
      document.getElementById("formJobEditorTitle").textContent = "Pasang Lowongan Kerja Baru"
      document.getElementById("postJobForm").reset()
      document.getElementById("editJobId").value = ""
      document.getElementById("clearJobFormButton").style.display = "none"
    })
  }

  const postedJobsListContainer = document.getElementById("companyPostedJobsList")
  const postedJobsCountSpan = document.getElementById("postedJobsCount")
  const postJobForm = document.getElementById("postJobForm")
  const jobTitleInput = document.getElementById("jobTitle")
  const jobLocationInput = document.getElementById("jobLocation")
  const jobTypeSelect = document.getElementById("jobTypeSelect")
  const jobSalaryDisplayInput = document.getElementById("jobSalaryDisplay")
  const jobSalaryRangeInternalInput = document.getElementById("jobSalaryRangeInternal")
  const jobDescriptionTextarea = document.getElementById("jobDescription")
  const editJobIdInput = document.getElementById("editJobId")
  const formJobEditorTitle = document.getElementById("formJobEditorTitle")
  const clearJobFormButton = document.getElementById("clearJobFormButton")
  const postJobMessage = document.getElementById("postJobMessage")
  const deleteJobModal = document.getElementById("deleteJobModal")
  const closeDeleteModalButtons = document.querySelectorAll(".close-button-modal, .cancel-delete-modal")
  const confirmDeleteJobButton = document.getElementById("confirmDeleteJobButton")
  const jobNameToDeleteSpan = document.getElementById("jobNameToDelete")
  let jobIdToDelete = null

  // Tambahkan debugging dan perbaiki fungsi handlePostJobFormSubmit
  function handlePostJobFormSubmit(event) {
    event.preventDefault()
    console.log("Form submitted!") // Debug log

    postJobMessage.textContent = ""
    const jobDataObj = {
      id: editJobIdInput.value || `job-${Date.now()}`,
      title: jobTitleInput.value.trim(),
      location: jobLocationInput.value.trim(),
      jobType: jobTypeSelect.value,
      salaryDisplay: jobSalaryDisplayInput.value.trim(),
      salaryRangeInternal: jobSalaryRangeInternalInput.value.trim(),
      description: jobDescriptionTextarea.value.trim(),
      applicants: editJobIdInput.value
        ? companyData.postedJobs.find((j) => j.id === editJobIdInput.value)?.applicants || []
        : [],
    }

    console.log("Job data:", jobDataObj) // Debug log

    // Validasi yang lebih jelas
    if (!jobDataObj.title) {
      postJobMessage.textContent = "Judul posisi wajib diisi."
      postJobMessage.style.color = "var(--danger-color)"
      console.log("Validation failed: title missing")
      return
    }
    if (!jobDataObj.location) {
      postJobMessage.textContent = "Lokasi wajib diisi."
      postJobMessage.style.color = "var(--danger-color)"
      return
    }
    if (!jobDataObj.jobType) {
      postJobMessage.textContent = "Jenis pekerjaan wajib dipilih."
      postJobMessage.style.color = "var(--danger-color)"
      console.log("Validation failed: jobType missing")
      return
    }
    if (!jobDataObj.salaryDisplay) {
      postJobMessage.textContent = "Tampilan gaji wajib diisi."
      postJobMessage.style.color = "var(--danger-color)"
      console.log("Validation failed: salaryDisplay missing")
      return
    }
    if (!jobDataObj.salaryRangeInternal) {
      postJobMessage.textContent = "Rentang gaji internal wajib diisi."
      postJobMessage.style.color = "var(--danger-color)"
      console.log("Validation failed: salaryRangeInternal missing")
      return
    }
    if (!jobDataObj.description) {
      postJobMessage.textContent = "Deskripsi pekerjaan wajib diisi."
      postJobMessage.style.color = "var(--danger-color)"
      console.log("Validation failed: description missing")
      return
    }

    console.log("Validation passed, saving job...") // Debug log

    // Simpan data
    if (editJobIdInput.value) {
      const jobIndex = companyData.postedJobs.findIndex((job) => job.id === editJobIdInput.value)
      if (jobIndex > -1) {
        companyData.postedJobs[jobIndex] = jobDataObj
        console.log("Job updated at index:", jobIndex)
      }
    } else {
      companyData.postedJobs.unshift(jobDataObj)
      console.log("New job added. Total jobs:", companyData.postedJobs.length)
    }

    // Simpan ke localStorage
    localStorage.setItem("loggedInCompanyData", JSON.stringify(companyData))
    console.log("Data saved to localStorage")

    // Update UI
    renderPostedJobs()
    updateCandidateJobSelect()

    // Reset form
    postJobForm.reset()
    editJobIdInput.value = ""
    formJobEditorTitle.textContent = "Pasang Lowongan Kerja Baru"
    clearJobFormButton.style.display = "none"

    // Show success message
    const isEdit = editJobIdInput.value
    postJobMessage.textContent = `Lowongan "${jobDataObj.title}" berhasil ${isEdit ? "diperbarui" : "diposting"}!`
    postJobMessage.style.color = "var(--success-color)"

    console.log("Success message shown")

    // Clear message after 3 seconds
    setTimeout(() => (postJobMessage.textContent = ""), 3000)

    // Switch to posted jobs tab
    activateTab("postedJobsContent")
    console.log("Switched to posted jobs tab")
  }

  // Pastikan event listener terpasang dengan benar
  if (postJobForm) {
    // Remove existing listeners first
    postJobForm.removeEventListener("submit", handlePostJobFormSubmit)
    // Add the listener
    postJobForm.addEventListener("submit", handlePostJobFormSubmit)
    console.log("Form event listener attached")
  } else {
    console.error("postJobForm not found!")
  }

  function renderPostedJobs() {
    console.log("Rendering posted jobs. Total:", companyData.postedJobs.length)
    console.log("Posted jobs data:", companyData.postedJobs)

    postedJobsListContainer.innerHTML = ""
    postedJobsCountSpan.textContent = companyData.postedJobs.length
    document.getElementById("statTotalJobs").textContent = companyData.postedJobs.length

    if (companyData.postedJobs.length === 0) {
      postedJobsListContainer.innerHTML = '<p class="empty-state-dashboard">Anda belum memposting lowongan apapun.</p>'
      console.log("No jobs to display")
      return
    }

    companyData.postedJobs.forEach((job, index) => {
      console.log(`Rendering job ${index + 1}:`, job.title)
      const jobItem = document.createElement("div")
      jobItem.classList.add("job-item-company")
      jobItem.innerHTML = `<div class="job-item-info"><h4>${job.title}</h4><p><i class="fas fa-map-marker-alt"></i> ${job.location} | <i class="fas fa-briefcase"></i> ${job.jobType} | <i class="fas fa-users"></i> ${job.applicants ? job.applicants.length : 0} Pelamar</p></div><div class="job-item-actions"><button class="btn-sm btn-view-candidates" data-job-id="${job.id}"><i class="fas fa-eye"></i> Lihat Pelamar</button><button class="btn-sm btn-edit-job" data-job-id="${job.id}"><i class="fas fa-edit"></i> Edit</button><button class="btn-sm btn-delete-job" data-job-id="${job.id}" data-job-title="${job.title}"><i class="fas fa-trash-alt"></i> Hapus</button></div>`
      postedJobsListContainer.appendChild(jobItem)
    })

    // Re-attach event listeners
    document.querySelectorAll(".btn-edit-job").forEach((btn) => btn.addEventListener("click", handleEditJob))
    document.querySelectorAll(".btn-delete-job").forEach((btn) => btn.addEventListener("click", handleDeleteJobPrompt))
    document
      .querySelectorAll(".btn-view-candidates")
      .forEach((btn) => btn.addEventListener("click", handleViewCandidates))

    console.log("Posted jobs rendered successfully")
  }

  function handleEditJob(event) {
    const jobId = event.currentTarget.dataset.jobId
    const jobToEdit = companyData.postedJobs.find((job) => job.id === jobId)
    if (jobToEdit) {
      formJobEditorTitle.textContent = `Edit Lowongan: ${jobToEdit.title}`
      editJobIdInput.value = jobToEdit.id
      jobTitleInput.value = jobToEdit.title
      jobLocationInput.value = jobToEdit.location
      jobTypeSelect.value = jobToEdit.jobType
      jobSalaryDisplayInput.value = jobToEdit.salaryDisplay
      jobSalaryRangeInternalInput.value = jobToEdit.salaryRangeInternal
      jobDescriptionTextarea.value = jobToEdit.description
      clearJobFormButton.style.display = "inline-block"
      activateTab("postNewJobContent")
    }
  }
  if (clearJobFormButton)
    clearJobFormButton.addEventListener("click", () => {
      formJobEditorTitle.textContent = "Pasang Lowongan Kerja Baru"
      postJobForm.reset()
      editJobIdInput.value = ""
      clearJobFormButton.style.display = "none"
      postJobMessage.textContent = ""
    })
  function handleDeleteJobPrompt(event) {
    jobIdToDelete = event.currentTarget.dataset.jobId
    jobNameToDeleteSpan.textContent = event.currentTarget.dataset.jobTitle
    deleteJobModal.style.display = "block"
  }
  closeDeleteModalButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.modalId).style.display = "none"
      jobIdToDelete = null
    }),
  )
  window.addEventListener("click", (event) => {
    if (event.target === deleteJobModal) {
      deleteJobModal.style.display = "none"
      jobIdToDelete = null
    }
  })
  confirmDeleteJobButton.addEventListener("click", () => {
    if (jobIdToDelete) {
      companyData.postedJobs = companyData.postedJobs.filter((job) => job.id !== jobIdToDelete)
      localStorage.setItem("loggedInCompanyData", JSON.stringify(companyData))
      renderPostedJobs()
      updateCandidateJobSelect()
      deleteJobModal.style.display = "none"
      jobIdToDelete = null
    }
  })

  const selectJobForCandidates = document.getElementById("selectJobForCandidates")
  const candidateListForJobContainer = document.getElementById("candidateListForJob")
  function updateCandidateJobSelect() {
    selectJobForCandidates.innerHTML = '<option value="">-- Pilih Lowongan --</option>'
    companyData.postedJobs.forEach((job) => {
      const option = document.createElement("option")
      option.value = job.id
      option.textContent = `${job.title} (${job.applicants ? job.applicants.length : 0} pelamar)`
      selectJobForCandidates.appendChild(option)
    })
  }
  function renderCandidatesForJob(jobId) {
    candidateListForJobContainer.innerHTML = ""
    const selectedJob = companyData.postedJobs.find((job) => job.id === jobId)
    if (!selectedJob || !selectedJob.applicants || selectedJob.applicants.length === 0) {
      candidateListForJobContainer.innerHTML =
        '<p class="empty-state-dashboard">Belum ada kandidat untuk lowongan ini.</p>'
      return
    }
    selectedJob.applicants.forEach((applicant) => {
      const candidateItem = document.createElement("div")
      candidateItem.classList.add("candidate-item")
      candidateItem.innerHTML = `<div class="candidate-item-info"><strong>${applicant.name}</strong><span>Melamar pada: ${new Date(applicant.date).toLocaleDateString("id-ID")}</span></div><div class="candidate-item-actions"><a href="${applicant.cv}" target="_blank" class="btn-sm btn-view-profile"><i class="fas fa-file-alt"></i> Lihat CV</a><button class="btn-sm btn-secondary" data-applicant-id="${applicant.id}"><i class="fas fa-envelope"></i> Hubungi</button></div>`
      candidateListForJobContainer.appendChild(candidateItem)
    })
  }
  function handleViewCandidates(event) {
    const jobId = event.currentTarget.dataset.jobId
    activateTab("candidatesContent")
    selectJobForCandidates.value = jobId
    renderCandidatesForJob(jobId)
  }
  if (selectJobForCandidates)
    selectJobForCandidates.addEventListener("change", (event) => renderCandidatesForJob(event.target.value))

  const companyProfileForm = document.getElementById("companyProfileForm")
  const profileCompanyNameInput = document.getElementById("profileCompanyName")
  const profileCompanyIndustryInput = document.getElementById("profileCompanyIndustry")
  const profileCompanyLocationInput = document.getElementById("profileCompanyLocation")
  const profileCompanyTaglineInput = document.getElementById("profileCompanyTagline")
  const profileCompanyAboutTextarea = document.getElementById("profileCompanyAbout")
  const profileCompanyWebsiteInput = document.getElementById("profileCompanyWebsite")
  const uploadCompanyLogoInput = document.getElementById("uploadCompanyLogo")
  const logoFileNameSpan = document.getElementById("logoFileName")
  const logoPreviewImg = document.getElementById("logoPreview")
  const uploadCompanyBannerInput = document.getElementById("uploadCompanyBanner")
  const bannerFileNameSpan = document.getElementById("bannerFileName")
  const bannerPreviewImg = document.getElementById("bannerPreview")
  const logoErrorSpan = document.getElementById("logoError")
  const bannerErrorSpan = document.getElementById("bannerError")
  const profileCompanyMessage = document.getElementById("profileCompanyMessage")
  const previewCompanyBannerImg = document.getElementById("previewCompanyBanner")
  const previewCompanyLogoImg = document.getElementById("previewCompanyLogo")
  const previewCompanyNameH4 = document.getElementById("previewCompanyName")
  const previewCompanyTaglineP = document.getElementById("previewCompanyTagline")

  function updateProfilePreview() {
    if (previewCompanyBannerImg)
      previewCompanyBannerImg.src = companyData.banner || "/ADAloker_vercel/assets/images/company_banner_sample1.jpg"
    if (previewCompanyLogoImg)
      previewCompanyLogoImg.src = companyData.logo || "/ADAloker_vercel/assets/images/company_logo_sample1.png"
    if (previewCompanyNameH4) previewCompanyNameH4.textContent = companyData.name
    if (previewCompanyTaglineP) previewCompanyTaglineP.textContent = companyData.tagline || ""
  }
  function handleFileInputChange(fileInput, fileNameSpan, previewImgElement, errorSpan, type) {
    const defaultFileName = fileNameSpan.dataset.defaultText || "Pilih File"
    errorSpan.textContent = ""
    previewImgElement.style.display = "none"
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0]
      fileNameSpan.textContent = file.name
      const allowedTypes = ["image/png", "image/jpeg"]
      const maxSizeMB = type === "logo" ? 1 : 2
      if (!allowedTypes.includes(file.type)) {
        errorSpan.textContent = "Format: PNG, JPG."
        return false
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        errorSpan.textContent = `Max ${maxSizeMB}MB.`
        return false
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImgElement.src = e.target.result
        previewImgElement.style.display = "block"
      }
      reader.readAsDataURL(file)
      return true
    } else {
      fileNameSpan.textContent = defaultFileName
    }
    return true
  }
  if (uploadCompanyLogoInput) {
    logoFileNameSpan.dataset.defaultText = logoFileNameSpan.textContent
    uploadCompanyLogoInput.addEventListener("change", () =>
      handleFileInputChange(uploadCompanyLogoInput, logoFileNameSpan, logoPreviewImg, logoErrorSpan, "logo"),
    )
  }
  if (uploadCompanyBannerInput) {
    bannerFileNameSpan.dataset.defaultText = bannerFileNameSpan.textContent
    uploadCompanyBannerInput.addEventListener("change", () =>
      handleFileInputChange(uploadCompanyBannerInput, bannerFileNameSpan, bannerPreviewImg, bannerErrorSpan, "banner"),
    )
  }

  function loadCompanyProfileForm() {
    profileCompanyNameInput.value = companyData.name
    profileCompanyIndustryInput.value = companyData.industry || ""
    profileCompanyLocationInput.value = companyData.location || ""
    profileCompanyTaglineInput.value = companyData.tagline || ""
    profileCompanyAboutTextarea.value = companyData.about || ""
    profileCompanyWebsiteInput.value = companyData.website || ""
    if (logoFileNameSpan)
      logoFileNameSpan.textContent = companyData.logo
        ? companyData.logo.split("/").pop()
        : logoFileNameSpan.dataset.defaultText || "Pilih File Logo"
    if (logoPreviewImg) {
      logoPreviewImg.src = companyData.logo || "#"
      logoPreviewImg.style.display = companyData.logo ? "block" : "none"
    }
    if (bannerFileNameSpan)
      bannerFileNameSpan.textContent = companyData.banner
        ? companyData.banner.split("/").pop()
        : bannerFileNameSpan.dataset.defaultText || "Pilih File Banner"
    if (bannerPreviewImg) {
      bannerPreviewImg.src = companyData.banner || "#"
      bannerPreviewImg.style.display = companyData.banner ? "block" : "none"
    }
    if (logoErrorSpan) logoErrorSpan.textContent = ""
    if (bannerErrorSpan) bannerErrorSpan.textContent = ""
    updateProfilePreview()
  }
  if (companyProfileForm) {
    loadCompanyProfileForm()
    tabLinksDashboard.forEach((link) => {
      if (link.dataset.tab === "companyProfileContent") link.addEventListener("click", loadCompanyProfileForm)
    })
    companyProfileForm.addEventListener("submit", (event) => {
      event.preventDefault()
      profileCompanyMessage.textContent = ""
      const logoIsValid = handleFileInputChange(
        uploadCompanyLogoInput,
        logoFileNameSpan,
        logoPreviewImg,
        logoErrorSpan,
        "logo",
      )
      const bannerIsValid = handleFileInputChange(
        uploadCompanyBannerInput,
        bannerFileNameSpan,
        bannerPreviewImg,
        bannerErrorSpan,
        "banner",
      )
      if (profileCompanyNameInput.value.trim() === "") {
        profileCompanyMessage.textContent = "Nama perusahaan wajib."
        profileCompanyMessage.style.color = "var(--danger-color)"
        return
      }
      if (!logoIsValid || !bannerIsValid) {
        profileCompanyMessage.textContent = "Periksa error gambar."
        profileCompanyMessage.style.color = "var(--danger-color)"
        return
      }
      companyData.name = profileCompanyNameInput.value.trim()
      companyData.industry = profileCompanyIndustryInput.value.trim()
      companyData.location = profileCompanyLocationInput.value.trim()
      companyData.tagline = profileCompanyTaglineInput.value.trim()
      companyData.about = profileCompanyAboutTextarea.value.trim()
      companyData.website = profileCompanyWebsiteInput.value.trim()
      if (uploadCompanyLogoInput.files.length > 0) companyData.logo = logoPreviewImg.src
      if (uploadCompanyBannerInput.files.length > 0) companyData.banner = bannerPreviewImg.src
      localStorage.setItem("loggedInCompanyData", JSON.stringify(companyData))
      if (navCompanyNameSpan) navCompanyNameSpan.textContent = companyData.name
      if (navCompanyLogoImg) navCompanyLogoImg.src = companyData.logo
      if (welcomeCompanyNameSpan) welcomeCompanyNameSpan.textContent = `Selamat Datang, ${companyData.name}!`
      updateProfilePreview()
      profileCompanyMessage.textContent = "Profil berhasil diperbarui!"
      profileCompanyMessage.style.color = "var(--success-color)"
      setTimeout(() => (profileCompanyMessage.textContent = ""), 4000)
    })
  }

  function handlePageHash() {
    const hash = window.location.hash.substring(1)
    const tabIdMap = {
      postedJobs: "postedJobsContent",
      candidates: "candidatesContent",
      postNewJob: "postNewJobContent",
      companyProfile: "companyProfileContent",
    }
    if (hash && tabIdMap[hash]) {
      activateTab(tabIdMap[hash])
      if (tabIdMap[hash] === "companyProfileContent") loadCompanyProfileForm()
    } else {
      activateTab("postedJobsContent")
    }
  }
  handlePageHash() // Panggil saat load
  window.addEventListener("hashchange", handlePageHash) // Panggil saat hash berubah

  document.getElementById("statTotalCandidates").textContent = companyData.totalCandidates
  document.getElementById("statTotalViews").textContent = companyData.totalViewsThisWeek
  renderPostedJobs()
  updateCandidateJobSelect()

  const dashboardLogoutButton = document.getElementById("dashboardLogoutButton")
  if (dashboardLogoutButton) {
    dashboardLogoutButton.addEventListener("click", (e) => {
      e.preventDefault()
      if (confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem("loggedInCompanyData")
        window.location.href = "/index.html"
      }
    })
  }
})
