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
    name: "Nama Perusahaan Anda",
    logo: "/ADAloker_vercel/assets/images/company_logo_sample1.png",
    banner: "/ADAloker_vercel/assets/images/company_banner_sample1.jpg",
    industry: "Belum Diatur",
    location: "Belum Diatur",
    tagline: "Tagline perusahaan Anda.",
    about: "Deskripsi singkat tentang perusahaan Anda.",
    website: "",
    postedJobs: [],
    totalCandidates: 0,
    totalViewsThisWeek: 0,
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

  function renderPostedJobs() {
    postedJobsListContainer.innerHTML = ""
    postedJobsCountSpan.textContent = companyData.postedJobs.length
    document.getElementById("statTotalJobs").textContent = companyData.postedJobs.length
    if (companyData.postedJobs.length === 0) {
      postedJobsListContainer.innerHTML = '<p class="empty-state-dashboard">Anda belum memposting lowongan apapun.</p>'
      return
    }
    companyData.postedJobs.forEach((job) => {
      const jobItem = document.createElement("div")
      jobItem.classList.add("job-item-company")
      jobItem.innerHTML = `<div class="job-item-info"><h4>${job.title}</h4><p><i class="fas fa-map-marker-alt"></i> ${job.location} | <i class="fas fa-briefcase"></i> ${job.jobType} | <i class="fas fa-users"></i> ${job.applicants ? job.applicants.length : 0} Pelamar</p></div><div class="job-item-actions"><button class="btn-sm btn-view-candidates" data-job-id="${job.id}"><i class="fas fa-eye"></i> Lihat Pelamar</button><button class="btn-sm btn-edit-job" data-job-id="${job.id}"><i class="fas fa-edit"></i> Edit</button><button class="btn-sm btn-delete-job" data-job-id="${job.id}" data-job-title="${job.title}"><i class="fas fa-trash-alt"></i> Hapus</button></div>`
      postedJobsListContainer.appendChild(jobItem)
    })
    document.querySelectorAll(".btn-edit-job").forEach((btn) => btn.addEventListener("click", handleEditJob))
    document.querySelectorAll(".btn-delete-job").forEach((btn) => btn.addEventListener("click", handleDeleteJobPrompt))
    document
      .querySelectorAll(".btn-view-candidates")
      .forEach((btn) => btn.addEventListener("click", handleViewCandidates))
  }

  function handlePostJobFormSubmit(event) {
    event.preventDefault()
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
    if (
      !jobDataObj.title ||
      !jobDataObj.location ||
      !jobDataObj.jobType ||
      !jobDataObj.salaryDisplay ||
      !jobDataObj.salaryRangeInternal ||
      !jobDataObj.description
    ) {
      postJobMessage.textContent = "Semua field yang ditandai * wajib diisi."
      postJobMessage.style.color = "var(--danger-color)"
      return
    }
    if (editJobIdInput.value) {
      const jobIndex = companyData.postedJobs.findIndex((job) => job.id === editJobIdInput.value)
      if (jobIndex > -1) companyData.postedJobs[jobIndex] = jobDataObj
    } else {
      companyData.postedJobs.unshift(jobDataObj)
    }
    localStorage.setItem("loggedInCompanyData", JSON.stringify(companyData))
    renderPostedJobs()
    updateCandidateJobSelect()
    postJobForm.reset()
    editJobIdInput.value = ""
    formJobEditorTitle.textContent = "Pasang Lowongan Kerja Baru"
    clearJobFormButton.style.display = "none"
    postJobMessage.textContent = `Lowongan "${jobDataObj.title}" berhasil ${editJobIdInput.value ? "diperbarui" : "diposting"}!`
    postJobMessage.style.color = "var(--success-color)"
    setTimeout(() => (postJobMessage.textContent = ""), 3000)
    activateTab("postedJobsContent")
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
