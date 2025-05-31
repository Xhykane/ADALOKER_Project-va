document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const currentYearSpan = document.getElementById("currentYearProfile")
  const navProfileIcon = document.getElementById("navProfileIcon")
  const logoutButtonNavbar = document.getElementById("logoutButton_profile_nav")
  const logoutButtonSidebar = document.getElementById("logoutButtonSidebar")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
    document.querySelectorAll(".nav-link, .profile-button, .logout-button-nav, .profile-nav-link").forEach((n) =>
      n.addEventListener("click", (e) => {
        const targetHref = e.currentTarget.getAttribute("href")
        const isLogoutButton =
          e.currentTarget.classList.contains("logout") || e.currentTarget.id === "logoutButton_profile_nav"

        if (window.innerWidth < 992) {
          if (isLogoutButton) {
            // Biarkan default behavior untuk logout agar confirm dialog muncul
          } else if (targetHref && targetHref.startsWith("#")) {
            hamburger.classList.remove("active")
            navMenu.classList.remove("active")
          } else if (targetHref && !targetHref.startsWith("#")) {
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

  const userData = JSON.parse(localStorage.getItem("userDataADAloker")) || {
    fullName: "Nama Pengguna",
    email: "pengguna@example.com",
    phoneNumber: "08123456789",
    address: "Alamat Anda",
    profileSummary: "Ringkasan singkat tentang Anda.",
    profilePicture: "/ADAloker_vercel/assets/images/default_profile_picture.png",
    experiences: [],
    educations: [],
    skills: ["Contoh Keahlian"],
    documents: [],
  }

  function saveUserData() {
    localStorage.setItem("userDataADAloker", JSON.stringify(userData))
  }

  function loadUserDataToUI() {
    document.getElementById("profilePagePicture").src = userData.profilePicture
    if (navProfileIcon) navProfileIcon.src = userData.profilePicture
    document.getElementById("profilePageName").textContent = userData.fullName
    document.getElementById("profilePageEmail").textContent = userData.email
    document.getElementById("viewFullName").textContent = userData.fullName
    document.getElementById("viewEmail").textContent = userData.email
    document.getElementById("viewPhoneNumber").textContent = userData.phoneNumber || "-"
    document.getElementById("viewAddress").textContent = userData.address || "-"
    document.getElementById("viewProfileSummary").textContent = userData.profileSummary || "-"
    document.getElementById("editFullName").value = userData.fullName
    document.getElementById("editEmail").value = userData.email
    document.getElementById("editPhoneNumber").value = userData.phoneNumber || ""
    document.getElementById("editAddress").value = userData.address || ""
    document.getElementById("editProfileSummary").value = userData.profileSummary || ""
    renderItems("pengalamanKerjaList", userData.experiences, createExperienceCard, "Belum ada pengalaman kerja.")
    renderItems("pendidikanList", userData.educations, createEducationCard, "Belum ada riwayat pendidikan.")
    renderSkills("keahlianList", userData.skills)
    renderDocuments("documentUploadList", userData.documents)
  }

  function renderItems(listId, items, cardCreatorFunction, emptyMessage) {
    const listElement = document.getElementById(listId)
    if (!listElement) return
    listElement.innerHTML = ""
    if (items && items.length > 0) {
      items.forEach((item) => listElement.appendChild(cardCreatorFunction(item)))
    } else {
      listElement.innerHTML = `<p class="empty-state">${emptyMessage}</p>`
    }
  }

  function createExperienceCard(exp) {
    const card = document.createElement("div")
    card.classList.add("item-card")
    card.innerHTML = `<h4>${exp.title}</h4><p class="item-subtitle">${exp.company}</p><p class="item-dates">${exp.period}</p><p class="item-description">${exp.description}</p>`
    return card
  }
  function createEducationCard(edu) {
    const card = document.createElement("div")
    card.classList.add("item-card")
    card.innerHTML = `<h4>${edu.institution}</h4><p class="item-subtitle">${edu.degree}</p><p class="item-dates">${edu.period}</p><p class="item-description">${edu.description || ""}</p>`
    return card
  }

  function renderSkills(listId, skills) {
    const listElement = document.getElementById(listId)
    if (!listElement) return
    listElement.innerHTML = ""
    const emptyState = listElement.parentElement.querySelector(".empty-state-skills") || document.createElement("p")
    emptyState.classList.add("empty-state-skills")
    emptyState.textContent = "Belum ada keahlian."
    emptyState.style.display = "none"
    if (skills && skills.length > 0) {
      skills.forEach((skill) => {
        const tag = document.createElement("span")
        tag.classList.add("skill-tag")
        tag.textContent = skill
        listElement.appendChild(tag)
      })
    } else {
      if (!listElement.querySelector(".empty-state-skills")) listElement.appendChild(emptyState) // Tambah jika belum ada
      emptyState.style.display = "block"
    }
  }

  function renderDocuments(listId, documents) {
    const listElement = document.getElementById(listId)
    if (!listElement) return
    const existingItems = listElement.querySelectorAll(".document-item")
    existingItems.forEach((item) => item.remove())

    if (documents && documents.length > 0) {
      documents.forEach((doc) => {
        const item = document.createElement("div")
        item.classList.add("document-item")
        const iconClass = doc.type.includes("pdf")
          ? "fa-file-pdf"
          : doc.type.includes("doc")
            ? "fa-file-word"
            : "fa-file"
        item.innerHTML = `<i class="fas ${iconClass} doc-icon"></i><span class="doc-name">${doc.name}</span><div class="doc-actions"><a href="${doc.url}" download="${doc.name}"><i class="fas fa-download"></i></a><button class="btn-delete-doc" data-doc-id="${doc.id}"><i class="fas fa-trash-alt"></i></button></div>`
        listElement.appendChild(item)
      })
    }
  }

  const profileNavLinks = document.querySelectorAll(".profile-nav-link")
  const profileSections = document.querySelectorAll(".profile-section")
  function handleLogoutAction(event) {
    event.preventDefault()
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("jobseekerLoggedIn")
      localStorage.removeItem("userDataADAloker")
      window.location.href = "/index.html"
    }
  }
  if (logoutButtonNavbar) logoutButtonNavbar.addEventListener("click", handleLogoutAction)
  if (logoutButtonSidebar) logoutButtonSidebar.addEventListener("click", handleLogoutAction)

  profileNavLinks.forEach((link) => {
    if (!link.classList.contains("logout")) {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetSectionId = this.dataset.section
        profileNavLinks.forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
        profileSections.forEach((section) => {
          section.style.display = section.id === targetSectionId ? "block" : "none"
          section.classList.toggle("active", section.id === targetSectionId)
        })
      })
    }
  })

  const uploadProfilePicInput = document.getElementById("uploadProfilePic")
  const profilePagePictureImg = document.getElementById("profilePagePicture")
  if (uploadProfilePicInput && profilePagePictureImg) {
    uploadProfilePicInput.addEventListener("change", (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newPicSrc = e.target.result
          profilePagePictureImg.src = newPicSrc
          if (navProfileIcon) navProfileIcon.src = newPicSrc
          userData.profilePicture = newPicSrc
          saveUserData()
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const editButtons = document.querySelectorAll(".btn-edit-section")
  const cancelButtons = document.querySelectorAll(".btn-cancel-edit")
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const sectionId = this.closest(".profile-section").id
      document.querySelector(`#${sectionId} .section-view-mode`).style.display = "none"
      document.querySelector(`#${sectionId}Form`).style.display = "block"
      this.style.display = "none"
    })
  })
  cancelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const form = this.closest(".profile-form")
      const sectionId = form.id.replace("Form", "")
      document.querySelector(`#${sectionId} .section-view-mode`).style.display = "block"
      form.style.display = "none"
      const editButton = document.querySelector(`#${sectionId} .btn-edit-section`)
      if (editButton) editButton.style.display = "inline-flex"
      loadUserDataToUI()
    })
  })

  const infoPribadiForm = document.getElementById("informasiPribadiForm")
  if (infoPribadiForm) {
    infoPribadiForm.addEventListener("submit", (e) => {
      e.preventDefault()
      userData.fullName = document.getElementById("editFullName").value
      userData.phoneNumber = document.getElementById("editPhoneNumber").value
      userData.address = document.getElementById("editAddress").value
      userData.profileSummary = document.getElementById("editProfileSummary").value
      saveUserData()
      loadUserDataToUI()
      document.querySelector("#informasiPribadi .section-view-mode").style.display = "block"
      infoPribadiForm.style.display = "none"
      const editBtn = document.querySelector("#informasiPribadi .btn-edit-section")
      if (editBtn) editBtn.style.display = "inline-flex"
      alert("Informasi pribadi disimpan!")
    })
  }

  const changePasswordForm = document.getElementById("changePasswordForm")
  if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Fitur ubah password belum diimplementasikan (simulasi).")
      this.reset()
    })
  }
  const deleteAccountButton = document.getElementById("deleteAccountButton")
  if (deleteAccountButton) {
    deleteAccountButton.addEventListener("click", () => {
      if (confirm("HAPUS AKUN? Tindakan ini permanen.")) {
        if (confirm("KONFIRMASI: Hapus akun ini?")) {
          localStorage.removeItem("userDataADAloker")
          localStorage.removeItem("jobseekerLoggedIn")
          alert("Akun dihapus (simulasi). Kembali ke login.")
          window.location.href = "/index.html"
        }
      }
    })
  }
  const uploadNewDocumentInput = document.getElementById("uploadNewDocument")
  if (uploadNewDocumentInput) {
    uploadNewDocumentInput.addEventListener("change", function (event) {
      const file = event.target.files[0]
      if (file) {
        const newDoc = {
          id: Date.now(),
          name: file.name,
          type: file.name.split(".").pop().toLowerCase(),
          url: "#", // Di aplikasi nyata, ini akan URL setelah unggah
        }
        userData.documents.push(newDoc)
        saveUserData()
        renderDocuments("documentUploadList", userData.documents)
        alert(`Dokumen "${file.name}" ditambahkan (simulasi).`)
        this.value = null // Reset input file
      }
    })
  }
  document.getElementById("documentUploadList").addEventListener("click", (event) => {
    if (event.target.closest(".btn-delete-doc")) {
      const button = event.target.closest(".btn-delete-doc")
      const docId = Number.parseInt(button.dataset.docId)
      const docToDelete = userData.documents.find((d) => d.id === docId)
      if (docToDelete && confirm(`Apakah Anda yakin ingin menghapus dokumen "${docToDelete.name}"?`)) {
        userData.documents = userData.documents.filter((d) => d.id !== docId)
        saveUserData()
        renderDocuments("documentUploadList", userData.documents)
        alert("Dokumen dihapus (simulasi).")
      }
    }
  })

  loadUserDataToUI()
  if (profileSections.length > 0) {
    profileSections[0].classList.add("active")
    profileSections[0].style.display = "block"
  }
  if (profileNavLinks.length > 0 && !profileNavLinks[0].classList.contains("logout")) {
    profileNavLinks[0].classList.add("active")
  }
})
