/* ==========================================================================
   Kerthik S - Portfolio Interactive Script
   Includes Dark / White Theme Toggle, Typing Animation, Terminal CLI Engine,
   AWS Audit Simulator, Skills Filter, Modals & Copy Utilities.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTypingEffect();
    initNavbarScroll();
    initMobileMenu();
    initTerminalEngine();
    initAuditSimulator();
    initSkillsFilter();
    initStatCounters();
    initCopyUtilities();
    initModals();
    initContactForm();
});

/* --------------------------------------------------------------------------
   0. Dark / Light (White Theme) Toggle Handler
   -------------------------------------------------------------------------- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const modeLabel = document.getElementById('theme-mode-label');
    const savedTheme = localStorage.getItem('portfolio-theme-mode') || 'light';

    setThemeMode(savedTheme);

    toggleBtn?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setThemeMode(newTheme);
        localStorage.setItem('portfolio-theme-mode', newTheme);
    });

    function setThemeMode(mode) {
        document.documentElement.setAttribute('data-theme', mode);
        document.body.setAttribute('data-theme', mode);
        if (modeLabel) {
            modeLabel.textContent = mode === 'light' ? 'Light' : 'Dark';
        }
    }
}

/* --------------------------------------------------------------------------
   1. Dynamic Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const phrases = [
        'Cloud Infrastructure',
        'AWS Automation & SDKs',
        'IaC with Terraform',
        'Docker & K8s Clusters',
        'Prometheus & Grafana Telemetry',
        'Data Science Analytics Engines'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            typingElement.textContent = currentPhrase.substring(0, charIndex);
        } else {
            charIndex++;
            typingElement.textContent = currentPhrase.substring(0, charIndex);
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* --------------------------------------------------------------------------
   2. Navbar Scroll Effects
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Section Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (!mobileBtn || !navLinks) return;

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

/* --------------------------------------------------------------------------
   4. Interactive Terminal CLI Engine
   -------------------------------------------------------------------------- */
function initTerminalEngine() {
    const heroInput = document.getElementById('hero-term-input');
    const heroBody = document.getElementById('hero-terminal-body');
    
    const modalInput = document.getElementById('modal-term-input');
    const modalBody = document.getElementById('modal-term-body');

    setupTerminalInput(heroInput, heroBody);
    setupTerminalInput(modalInput, modalBody);
}

function setupTerminalInput(inputEl, bodyEl) {
    if (!inputEl || !bodyEl) return;

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = inputEl.value.trim().toLowerCase();
            inputEl.value = '';

            if (!command) return;

            // Render Command Line
            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            cmdLine.innerHTML = `<span class="t-prompt">kerthik@cloud-node:~$</span> <span class="t-cmd">${escapeHTML(command)}</span>`;
            bodyEl.insertBefore(cmdLine, inputEl.parentElement);

            // Execute & Output Response
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line t-output';
            outputLine.innerHTML = executeTerminalCommand(command);
            bodyEl.insertBefore(outputLine, inputEl.parentElement);

            // Scroll to bottom
            bodyEl.scrollTop = bodyEl.scrollHeight;
        }
    });
}

function executeTerminalCommand(cmd) {
    switch (cmd) {
        case 'help':
            return `
<span class="t-highlight">Available Commands:</span><br>
- <span class="t-key">whoami</span>: View bio & background<br>
- <span class="t-key">skills</span>: List DevOps & Cloud technology stack<br>
- <span class="t-key">projects</span>: View Cloud Audit Platform details<br>
- <span class="t-key">experience</span>: View SentinelFox internship metrics<br>
- <span class="t-key">education</span>: View academic degrees<br>
- <span class="t-key">contact</span>: Display email, phone, and location<br>
- <span class="t-key">audit-demo</span>: Jump to live cloud optimizer simulator<br>
- <span class="t-key">clear</span>: Clear terminal console
            `;

        case 'whoami':
            return `<span class="t-highlight">Kerthik S</span> | DevOps Engineer & M.Sc. Data Science student based in Chennai, India. Specializing in AWS Cloud Automation, Terraform IaC, Docker/K8s, and Prometheus/Grafana monitoring.`;

        case 'skills':
            return `
<span class="t-highlight">DevOps & Cloud:</span> Linux, Networking, Git, Docker, Kubernetes, Terraform, GitHub Actions, AWS (EC2, S3, IAM, VPC, ECS, ECR, CloudWatch), Nginx<br>
<span class="t-highlight">Observability & Tools:</span> Prometheus, Grafana, ScoutSuite, Steampipe, VS Code, Jira<br>
<span class="t-highlight">Programming:</span> Python, JavaScript, Bash, FastAPI, React, PostgreSQL
            `;

        case 'projects':
            return `
<span class="t-highlight">Cloud Resource Audit & Cost Optimization Platform:</span><br>
Designed multi-region Boto3 cloud engine scanning 20+ AWS resources. Features 20+ security & cost optimization rules, Docker containerization, Terraform IaC, and real-time Grafana dashboards.
            `;

        case 'experience':
            return `
<span class="t-highlight">SentinelFox - DevOps Engineering Intern (Nov 2023 - Jan 2024):</span><br>
• Reduced manual snapshot backup operations by 80% using AWS SDK JS scripts.<br>
• Reduced EC2 provisioning time from 15m to &lt;5m via 10+ Bash User Data scripts.<br>
• Audited 50+ AWS resources using ScoutSuite & Steampipe.<br>
• Authored 2-part blog series on Prometheus + Grafana monitoring.
            `;

        case 'education':
            return `
• <span class="t-highlight">M.Sc. Data Science:</span> Periyar University (2024 - 2026)<br>
• <span class="t-highlight">B.E. Computer Science & Engineering:</span> Government College of Engineering, Dharmapuri (2019 - 2023)
            `;

        case 'contact':
            return `
• <span class="t-key">Email:</span> kerthikdev@gmail.com<br>
• <span class="t-key">Phone:</span> +91 8610303751<br>
• <span class="t-key">GitHub:</span> https://github.com/kerthikdev<br>
• <span class="t-key">Location:</span> Chennai, Tamil Nadu, India
            `;

        case 'audit-demo':
            document.getElementById('audit-demo-anchor')?.scrollIntoView({ behavior: 'smooth' });
            return `Jumping to live AWS Audit Simulator...`;

        case 'clear':
            setTimeout(() => {
                const terminalBodies = document.querySelectorAll('.terminal-body');
                terminalBodies.forEach(b => {
                    const lines = b.querySelectorAll('.terminal-line');
                    lines.forEach(l => l.remove());
                });
            }, 50);
            return `Terminal cleared.`;

        case 'sudo':
            return `<span class="t-val">[OK] Granted root access to Kerthik's Cloud Infrastructure!</span>`;

        default:
            return `<span class="t-muted">Command not recognized: '${escapeHTML(cmd)}'. Type '<span class="t-key">help</span>' for a list of available commands.</span>`;
    }
}

/* --------------------------------------------------------------------------
   5. AWS Audit Engine Simulator
   -------------------------------------------------------------------------- */
function initAuditSimulator() {
    const runBtn = document.getElementById('run-audit-btn');
    const logConsole = document.getElementById('audit-log-output');
    const scannedCountEl = document.getElementById('scanned-res-count');
    const flaggedCountEl = document.getElementById('flagged-issues-count');
    const savingsEl = document.getElementById('est-savings-count');
    const statusText = document.getElementById('scan-status-text');

    if (!runBtn || !logConsole) return;

    let isScanning = false;

    runBtn.addEventListener('click', () => {
        if (isScanning) return;
        isScanning = true;

        runBtn.disabled = true;
        statusText.textContent = 'SCANNING IN PROGRESS...';
        statusText.style.color = 'var(--cyan-light)';

        logConsole.innerHTML = '';
        scannedCountEl.textContent = '0';
        flaggedCountEl.textContent = '0';
        savingsEl.textContent = '$0/mo';

        const logs = [
            { text: '[INIT] Launching Boto3 AWS Cloud Governance Engine...', delay: 200, type: 't-muted' },
            { text: '[REGION] Scanning selected regions: us-east-1, ap-south-1...', delay: 500, type: 't-cmd' },
            { text: '[DISCOVERY] Discovering EC2 instances, EBS volumes, S3 buckets, IAM roles...', delay: 900, type: 't-cmd' },
            { text: '[AUDIT RULE 01] Checking unattached EBS volumes...', delay: 1300, type: 't-cmd' },
            { text: '  -> FLAG: vol-0a8bf73d91 (gp3, 100GiB) unattached in us-east-1 ($10/mo savings)', delay: 1600, type: 't-warning' },
            { text: '[AUDIT RULE 02] Scanning S3 bucket public access configuration...', delay: 2000, type: 't-cmd' },
            { text: '  -> RISK: S3 bucket "prod-temp-exports-2024" has public read policy enabled!', delay: 2300, type: 't-warning' },
            { text: '[AUDIT RULE 03] Checking for unassociated Elastic IPs (EIPs)...', delay: 2700, type: 't-cmd' },
            { text: '  -> FLAG: EIP eipalloc-091f28b4 (52.4.19.12) unassociated ($3.60/mo savings)', delay: 3000, type: 't-warning' },
            { text: '[AUDIT RULE 04] Evaluating IAM wildcard permissions & stale access keys...', delay: 3400, type: 't-cmd' },
            { text: '  -> RISK: IAM User "dev-deployer" has unused access key older than 90 days', delay: 3700, type: 't-warning' },
            { text: '[METRICS] Streaming telemetry to Prometheus & Grafana dashboard...', delay: 4100, type: 't-cmd' },
            { text: '[SUCCESS] Scan complete! 24 AWS resources audited across 2 regions.', delay: 4500, type: 't-success' }
        ];

        logs.forEach((log) => {
            setTimeout(() => {
                const entry = document.createElement('div');
                entry.className = `log-entry ${log.type}`;
                entry.textContent = log.text;
                logConsole.appendChild(entry);
                logConsole.scrollTop = logConsole.scrollHeight;

                if (log.text.includes('Scan complete!')) {
                    scannedCountEl.textContent = '24';
                    flaggedCountEl.textContent = '4';
                    savingsEl.textContent = '$180/mo';
                    statusText.textContent = 'SCAN COMPLETED';
                    statusText.style.color = 'var(--emerald-success)';
                    runBtn.disabled = false;
                    isScanning = false;
                }
            }, log.delay);
        });
    });
}

/* --------------------------------------------------------------------------
   6. Skills Matrix Filter Tabs
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   7. Stat Card Counters
   -------------------------------------------------------------------------- */
function initStatCounters() {
    const statCards = document.querySelectorAll('.stat-number');
    let animated = false;

    function checkScroll() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !animated) {
            animated = true;
            statCards.forEach(card => {
                const target = parseInt(card.getAttribute('data-target'));
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        card.textContent = `${target}%`;
                        if (target === 50 || target === 20) card.textContent = `${target}+`;
                        clearInterval(timer);
                    } else {
                        card.textContent = `${Math.ceil(current)}+`;
                    }
                }, 30);
            });
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

/* --------------------------------------------------------------------------
   8. Copy Utilities & Toast
   -------------------------------------------------------------------------- */
function initCopyUtilities() {
    const toast = document.getElementById('toast');

    document.querySelectorAll('.copy-email-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email') || 'kerthikdev@gmail.com';
            navigator.clipboard.writeText(email);
            showToast(`Copied Email: ${email}`);
        });
    });

    document.querySelectorAll('.copy-phone-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const phone = btn.getAttribute('data-phone') || '8610303751';
            navigator.clipboard.writeText(phone);
            showToast(`Copied Phone: ${phone}`);
        });
    });

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/* --------------------------------------------------------------------------
   9. Modals Engine
   -------------------------------------------------------------------------- */
function initModals() {
    // Terminal Modal
    const openTermBtn = document.getElementById('open-terminal-btn');
    const termModal = document.getElementById('terminal-modal');
    const closeTermBtn = document.getElementById('close-term-modal');
    const modalXBtn = document.getElementById('modal-x-btn');

    if (openTermBtn && termModal) {
        openTermBtn.addEventListener('click', () => {
            termModal.classList.add('active');
            document.getElementById('modal-term-input')?.focus();
        });

        const closeTerminal = () => termModal.classList.remove('active');
        closeTermBtn?.addEventListener('click', closeTerminal);
        modalXBtn?.addEventListener('click', closeTerminal);
    }

    // Blog Modal
    const readBlogBtn = document.getElementById('read-blog-modal-btn');
    const blogModal = document.getElementById('blog-modal');
    const closeBlogModal = document.getElementById('close-blog-modal');
    const closeBlogModalBtn = document.getElementById('close-blog-modal-btn');

    if (readBlogBtn && blogModal) {
        readBlogBtn.addEventListener('click', () => {
            blogModal.classList.add('active');
        });

        const closeBlog = () => blogModal.classList.remove('active');
        closeBlogModal?.addEventListener('click', closeBlog);
        closeBlogModalBtn?.addEventListener('click', closeBlog);
    }

    // Close Modals on Outer Click
    window.addEventListener('click', (e) => {
        if (e.target === termModal) termModal.classList.remove('active');
        if (e.target === blogModal) blogModal.classList.remove('active');
    });
}

/* --------------------------------------------------------------------------
   10. Contact Form Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const feedback = document.getElementById('form-feedback');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending Message...</span>';

        setTimeout(() => {
            feedback.innerHTML = `<span style="color: var(--emerald-success); font-weight: 600;">✓ Thank you, ${escapeHTML(name)}! Your message has been sent successfully. Kerthik will get back to you soon.</span>`;
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span>';
        }, 1200);
    });
}

/* Helper Utility */
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
