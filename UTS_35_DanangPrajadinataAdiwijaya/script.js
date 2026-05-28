document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode & Profile Picture Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    const profileImg = document.getElementById('profile-img');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        enableDarkMode();
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 3000);
        }
    });
 

    function enableDarkMode() {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (profileImg) {
            profileImg.src = 'assets/images/profile_dark.png';
            profileImg.onerror = () => {
                profileImg.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80';
            };
        }
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        if (profileImg) {
            profileImg.src = 'assets/images/profile_light.png';
            // Failback if profile images do not exist
            profileImg.onerror = () => {
                profileImg.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80';
            };
        }
        localStorage.setItem('theme', 'light');
    }

    // Handle initial profile image load failback (in case assets don't exist locally)
    if (profileImg) {
        profileImg.onerror = () => {
            profileImg.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80';
        };
    }

    // 2. Hamburger Menu (One UI Mobile Panel Transition)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Hamburger animation
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // 3. Navbar Scroll Shrink & Active Links Highlighting
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Navbar shrink
        if (window.scrollY > 40) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. One UI Custom Scroll Reveal Animation
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 80) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 5. Typing Animation for Hero Section
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.innerText;
        typingText.innerText = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                typingText.innerText += text.charAt(i);
                i++;
                setTimeout(type, 80);
            }
        }
        // Small delay to match page reveal
        setTimeout(type, 400);
    }

    // 6. One UI Dynamic Counter Animation
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 40;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 25);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Trigger counter when about section is visible
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(aboutSection);
            }
        }, { threshold: 0.3 });
        observer.observe(aboutSection);
    }

    // 7. Skill Bar Dynamic Loading Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(skillsSection);
            }
        }, { threshold: 0.3 });
        skillsObserver.observe(skillsSection);
    }

    // 8. Interactive 3D Card Tilt Effect (Perspective hover tracking)
    const tiltElements = document.querySelectorAll('.portfolio-card, .stat-card, .image-wrapper, .info-item');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate inside element
            const y = e.clientY - rect.top;  // y coordinate inside element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation angles (-12 to 12 degrees max rotation)
            const rotateX = ((centerY - y) / centerY) * 12;
            const rotateY = ((x - centerX) / centerX) * 12;
            
            // Apply transformation
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            
            // Apply dynamic glass reflection gradient overlay if needed
            const highlight = el.querySelector('.portfolio-img img');
            if (highlight) {
                highlight.style.transform = `scale(1.05) translate3d(${-rotateY * 0.8}px, ${rotateX * 0.8}px, 15px)`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            // Reset to default
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            
            const highlight = el.querySelector('.portfolio-img img');
            if (highlight) {
                highlight.style.transform = 'scale(1) translate3d(0, 0, 0)';
            }
        });
    });

    // 9. Form Validation & Submission (Mock)
    const contactForm = document.getElementById('form-contact');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                // One UI-styled success notification instead of browser alert
                showNotification('Pesan terkirim! Terima kasih telah menghubungi saya.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Helper to create and show One UI style Notification Toast
    function showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'oneui-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle" style="color: var(--primary); font-size: 1.2rem;"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles directly
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%) translateY(100px)',
            backgroundColor: 'var(--surface-solid)',
            border: '1px solid var(--border)',
            padding: '1rem 2rem',
            borderRadius: '100px',
            boxShadow: 'var(--shadow-elevated)',
            zIndex: '9999',
            opacity: '0',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        });
        
        document.body.appendChild(toast);
        
        // Trigger reflow & show
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
            toast.style.opacity = '1';
        }, 50);
        
        // Remove toast
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3500);
    }

    // 10. Developer Controls: Ambient Orb Motion Slider
    const speedSlider = document.getElementById('orb-speed');
    const speedVal = document.getElementById('orb-speed-val');
    const orbs = document.querySelectorAll('.orb');
    if (speedSlider) {
        speedSlider.addEventListener('input', (e) => {
            const mult = parseFloat(e.target.value) / 100;
            speedVal.innerText = mult.toFixed(1) + 'x';
            orbs.forEach((orb, index) => {
                const baselines = [25, 30, 20];
                const speed = baselines[index] / (mult || 0.01);
                orb.style.animationDuration = `${speed}s`;
            });
            logActivity(`Orb animation speed multiplier set to ${mult.toFixed(1)}x`, 'info');
        });
    }

    // 11. System Telemetry (Simulated CPU/RAM logs)
    setInterval(() => {
        const cpu = Math.floor(Math.random() * 25) + 5; // 5% to 30%
        const ram = Math.floor(Math.random() * 4) + 45; // 45% to 49%
        const cpuBar = document.getElementById('cpu-telemetry');
        const cpuTxt = document.getElementById('cpu-telemetry-txt');
        const ramBar = document.getElementById('ram-telemetry');
        const ramTxt = document.getElementById('ram-telemetry-txt');
        if (cpuBar) cpuBar.style.width = `${cpu}%`;
        if (cpuTxt) cpuTxt.innerText = `${cpu}%`;
        if (ramBar) ramBar.style.width = `${ram}%`;
        if (ramTxt) ramTxt.innerText = `${ram}%`;
    }, 1500);

    // 12. Session Action Logger
    function logActivity(text, type = 'default') {
        const logsContainer = document.getElementById('debug-logs');
        if (!logsContainer) return;
        const logLine = document.createElement('div');
        logLine.className = `log-line${type !== 'default' ? ' text-' + type : ''}`;
        const time = new Date().toLocaleTimeString([], { hour12: false });
        logLine.innerText = `[${time}] ${text}`;
        logsContainer.appendChild(logLine);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }

    // Log user clicks on key components
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button, .portfolio-card, .stat-card, .skill-item');
        if (target) {
            let name = target.textContent.trim() || target.id || target.className;
            // Clean up long texts
            name = name.replace(/\s+/g, ' ');
            if (name.length > 25) name = name.substring(0, 25) + '...';
            logActivity(`User clicked: "${name}"`, 'success');
        }
    });

    // 13. Terminal Simulator CLI Logic
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    
    if (termInput) {
        // Prevent form page reload if wrapped, focus on terminal body click
        const termContainer = document.querySelector('.terminal-container');
        if (termContainer) {
            termContainer.addEventListener('click', () => {
                termInput.focus();
            });
        }

        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmdText = termInput.value.trim();
                termInput.value = '';
                if (cmdText) {
                    processCommand(cmdText);
                }
            }
        });
    }

    function processCommand(cmdText) {
        logActivity(`CLI input: "${cmdText}"`, 'info');
        
        // Append input line to terminal history
        const historyLine = document.createElement('div');
        historyLine.innerHTML = `<p><span class="prompt">danang@oneui-portfolio:~$</span> ${escapeHTML(cmdText)}</p>`;
        
        const outputs = termBody.querySelector('.terminal-output');
        outputs.appendChild(historyLine);

        // Normalize command
        const args = cmdText.toLowerCase().split(' ');
        const primaryCmd = args[0];
        
        let reply = '';
        
        switch (primaryCmd) {
            case 'help':
                reply = `
                    <p>Daftar perintah yang tersedia:</p>
                    <p>  <span class="cmd-highlight">about</span>      - Menampilkan informasi profil singkat.</p>
                    <p>  <span class="cmd-highlight">skills</span>     - Menampilkan daftar keahlian developer.</p>
                    <p>  <span class="cmd-highlight">projects</span>   - Menampilkan proyek-proyek unggulan.</p>
                    <p>  <span class="cmd-highlight">silat</span>      - Menampilkan catatan prestasi pencak silat Danang.</p>
                    <p>  <span class="cmd-highlight">neofetch</span>   - Menampilkan spesifikasi sistem web developer.</p>
                    <p>  <span class="cmd-highlight">clear</span>      - Membersihkan layar konsol terminal.</p>
                    <p>  <span class="cmd-highlight">theme</span>      - Mengganti tema halaman (dark/light mode).</p>
                `;
                break;
            case 'about':
                reply = `
                    <p><strong>Danang Prajadinata Adiwijaya</strong></p>
                    <p>Mahasiswa Sistem Informasi Semester 4. Memiliki passion mendalam di bidang Software Development, AI, dan Data Science.</p>
                    <p>Tinggal di Gresik, Jawa Timur, Indonesia.</p>
                `;
                break;
            case 'skills':
                reply = `
                    <p><strong>Developer Skillset:</strong></p>
                    <p>  - HTML5 & CSS3          [██████████████████░] 90%</p>
                    <p>  - JavaScript (Vanilla)   [████████████████░░░] 85%</p>
                    <p>  - PHP & MySQL            [████████████████░░░] 80%</p>
                    <p>  - UI/UX Design           [██████████████░░░░░] 75%</p>
                `;
                break;
            case 'projects':
                reply = `
                    <p><strong>Proyek Portofolio:</strong></p>
                    <p>1. <span class="cmd-highlight">Movie App</span> - Aplikasi pencarian film (React & Vercel).</p>
                    <p>2. <span class="cmd-highlight">Game Edukasi</span> - Mengenalkan budaya Indonesia ke anak-anak.</p>
                    <p>3. <span class="cmd-highlight">Farmer Tracker App</span> - Aplikasi pencatatan cuaca & kebun petani vanili.</p>
                `;
                break;
            case 'silat':
                reply = `
                    <p><strong>🏅 Prestasi Pencak Silat:</strong></p>
                    <p>  🏆 2025 - Juara 2 PANGDIV 2 CUP (Nasional, Malang)</p>
                    <p>  🏆 2024 - Juara 3 DANDIM CUP (Nasional, Malang)</p>
                    <p>  🏆 2023 - Juara 3 KONI CUP (Daerah, Lamongan)</p>
                    <p>  🏆 2022 - Juara Harapan 2 PORProv JATIM (Jawa Timur)</p>
                `;
                break;
            case 'neofetch':
                const modeText = body.classList.contains('dark-mode') ? 'Crimson Slate (Dark Mode)' : 'Rose Gold (Light Mode)';
                reply = `
                    <p style="color: var(--primary);">    .---.      <strong>danang@oneui-portfolio</strong></p>
                    <p style="color: var(--primary);">   /     \\     -----------------------</p>
                    <p style="color: var(--primary);">   \\   o /     OS: Samsung One UI 9.0 Web Simulator</p>
                    <p style="color: var(--primary);">    \`---\`      Kernel: HTML5/CSS3/VanillaJS-v1.0</p>
                    <p>               Uptime: ${Math.floor(performance.now() / 1000)}s</p>
                    <p>               Shell: bash v1.0.0-danang</p>
                    <p>               Theme: ${modeText}</p>
                    <p>               Active Stack: Javascript / CSS 3D Tilt / FontPlusJakarta</p>
                `;
                break;
            case 'clear':
                outputs.innerHTML = '';
                termBody.scrollTop = 0;
                return;
            case 'theme':
                themeToggle.click();
                reply = `<p class="cmd-highlight">Tema berhasil dialihkan!</p>`;
                break;
            default:
                reply = `<p style="color: #ef4444;">Perintah tidak ditemukan: "${escapeHTML(primaryCmd)}". Ketik <span class="cmd-highlight">help</span> untuk daftar bantuan.</p>`;
        }

        // Append reply line
        const replyBlock = document.createElement('div');
        replyBlock.innerHTML = reply;
        outputs.appendChild(replyBlock);
        
        // Auto scroll to bottom
        termBody.scrollTop = termBody.scrollHeight;
    }

    // Helper to prevent HTML injection in terminal input
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});