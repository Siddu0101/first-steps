// FirstSteps Application JavaScript

// Application State
const state = {
    currentPage: 'home',
    currentStep: 1,
    isLoading: false,
    chatMessages: [],
    user: null,
    websiteData: {
        step1: {},
        step2: {},
        step3: {},
        generated: null
    }
};

// --- The old sampleData for chat responses is no longer needed for the AI Mentor ---
const sampleData = {
    promotionalContent: {
        "Agriculture": {
            names: ["CropSense AI", "FarmVision Pro", "AgriMind", "HarvestIQ", "GrowthTech", "FieldSmart"],
            taglines: [
                "Growing smarter farms with AI",
                "Your crops, our intelligence",
                "Revolutionizing agriculture one field at a time",
                "Harvest the power of technology",
                "Smart farming for sustainable future"
            ],
            posts: [
                "🚜 Transform your farming with AI! Detect crop diseases before they spread and optimize your harvest. #AgTech #AI #Farming",
                "📸 One photo of your crop can save your entire harvest! Discover the future of smart farming today. #SmartFarming #Innovation",
                "🚀 Join thousands of farmers already using AI to increase their yields by 25%. The future of agriculture is here! #FarmTech #Sustainability"
            ]
        },
        "Healthcare": {
            names: ["HealthBridge", "CareLink Pro", "MedNet Hub", "PatientFirst", "VitalConnect", "MediFlow"],
            taglines: [
                "Connecting care, anywhere",
                "Your health, our priority",
                "Healthcare without boundaries",
                "Bridging patients and providers",
                "Digital health made simple"
            ],
            posts: [
                "⚕️ Skip the waiting room! Connect with quality healthcare from your home. Experience the future of medicine. #Telemedicine #Healthcare #Digital",
                "🧑‍⚕️ Connect with trusted doctors instantly. Get consultations, prescriptions, and health monitoring in one platform. #HealthTech #Innovation",
                "💊 Managing your health has never been easier. Book appointments, track vitals, and stay connected with your care team. #DigitalHealth #WellBeing"
            ]
        },
        "Technology": {
            names: ["TechFlow", "CodeCraft", "InnovateLab", "DigitalForge", "TechNova", "ByteBuilders"],
            taglines: [
                "Building tomorrow's technology today",
                "Innovation at the speed of thought",
                "Where ideas become reality",
                "Crafting digital solutions",
                "Technology that transforms"
            ],
            posts: [
                "🚀 Transforming ideas into powerful digital solutions. Join the tech revolution! #Technology #Innovation #Digital",
                "💻 From concept to deployment, we build technology that makes a difference. #TechStartup #Development #Innovation",
                "⚡ Accelerate your business with cutting-edge technology solutions. The future is digital! #DigitalTransformation #Tech"
            ]
        },
        "Finance": {
            names: ["FinTechPro", "MoneyWise", "CapitalFlow", "WealthTech", "PaymentHub", "FinanceForward"],
            taglines: [
                "Smart finance for smart people",
                "Your money, managed better",
                "Revolutionizing financial services",
                "Finance made simple",
                "Empowering financial freedom"
            ],
            posts: [
                "💰 Take control of your finances with intelligent money management. Start your journey to financial freedom! #FinTech #PersonalFinance",
                "📈 Smart investing made simple. Let AI help you make better financial decisions. #Investment #AI #Finance",
                "🏦 Banking reimagined. Experience seamless, secure, and smart financial services. #DigitalBanking #Innovation"
            ]
        },
        "Education": {
            names: ["EduTech Pro", "LearnSmart", "KnowledgeHub", "StudyFlow", "EduConnect", "BrainBoost"],
            taglines: [
                "Learning reimagined for the digital age",
                "Education that adapts to you",
                "Unlock your learning potential",
                "Smart learning, better outcomes",
                "The future of education is here"
            ],
            posts: [
                "🎓 Personalized learning experiences that adapt to every student's needs. Transform education with AI! #EdTech #Learning #AI",
                "📚 Make learning engaging, interactive, and effective. Join the educational revolution! #Education #Innovation #DigitalLearning",
                "🧠 Boost student performance with adaptive learning technology. Every learner deserves personalized education! #PersonalizedLearning #EdTech"
            ]
        }
    },
    websiteTypes: {
        landing: {
            name: "Landing Page",
            pages: ["Home", "About", "Contact", "Thank You"],
            features: ["Lead capture form", "Email signup", "Social media integration", "Contact form", "Newsletter signup", "Call-to-action buttons"]
        },
        business: {
            name: "Business Site",
            pages: ["Home", "About", "Services", "Portfolio", "Team", "Contact", "Blog"],
            features: ["Service showcase", "Team profiles", "Portfolio gallery", "Blog system", "Contact forms", "Testimonials", "SEO optimization"]
        },
        saas: {
            name: "SaaS Platform",
            pages: ["Home", "Features", "Pricing", "Documentation", "Dashboard", "Account", "Support"],
            features: ["User authentication", "Pricing tables", "Feature comparison", "API documentation", "User dashboard", "Subscription management", "Support system"]
        },
        ecommerce: {
            name: "E-commerce",
            pages: ["Home", "Shop", "Product", "Cart", "Checkout", "Account", "Orders"],
            features: ["Product catalog", "Shopping cart", "Payment processing", "User accounts", "Order management", "Inventory system", "Product search"]
        }
    },
    generationStages: [ "Analyzing requirements", "Generating pages", "Creating components", "Building backend", "Setting up database", "Optimizing code", "Finalizing project" ],
    sampleWebsites: {
        healthcare: {
            name: "MediConnect",
            pages: ["Landing", "Services", "Doctors", "Appointments", "Patient Portal"],
            features: ["Online booking", "Patient records", "Secure messaging", "Payment processing"],
            backend: ["User authentication", "Appointment scheduling", "Medical records API", "Payment gateway"],
            preview: `<div style="padding: 20px; font-family: Inter, sans-serif;"><header style="background: linear-gradient(135deg, #3B82F6, #1E40AF); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;"><h1 style="margin: 0; font-size: 28px;">MediConnect</h1><p style="margin: 8px 0 0 0; opacity: 0.9;">Healthcare Without Boundaries</p></header><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"><div style="background: #f8fafc; padding: 16px; border-radius: 8px;"><h3 style="margin: 0 0 8px 0; color: #1e40af;">Book Appointment</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Schedule with trusted healthcare providers</p></div><div style="background: #f8fafc; padding: 16px; border-radius: 8px;"><h3 style="margin: 0 0 8px 0; color: #1e40af;">Patient Records</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Secure access to your medical history</p></div></div></div>`
        },
        agriculture: {
            name: "AgroAI",
            pages: ["Dashboard", "Crop Monitoring", "Analytics", "Pricing", "Support"],
            features: ["IoT integration", "Real-time monitoring", "Predictive analytics", "Mobile app"],
            backend: ["Sensor data processing", "ML predictions", "User management", "Subscription billing"],
            preview: `<div style="padding: 20px; font-family: Inter, sans-serif;"><header style="background: linear-gradient(135deg, #059669, #065F46); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;"><h1 style="margin: 0; font-size: 28px;">AgroAI</h1><p style="margin: 8px 0 0 0; opacity: 0.9;">Smart Farming for Sustainable Future</p></header><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"><div style="background: #f0fdf4; padding: 16px; border-radius: 8px;"><h3 style="margin: 0 0 8px 0; color: #065f46;">Crop Monitoring</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Real-time field analytics and insights</p></div><div style="background: #f0fdf4; padding: 16px; border-radius: 8px;"><h3 style="margin: 0 0 8px 0; color: #065f46;">AI Predictions</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Predict yields and optimize harvests</p></div></div></div>`
        },
        technology: {
            name: "DevTools",
            pages: ["Landing", "Features", "Pricing", "Documentation", "Dashboard"],
            features: ["API management", "Code generation", "Team collaboration", "Analytics"],
            backend: ["API gateway", "Code compiler", "User authentication", "Usage analytics"],
            preview: `<div style="padding: 20px; font-family: Inter, sans-serif;"><header style="background: linear-gradient(135deg, #8B5CF6, #5B21B6); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;"><h1 style="margin: 0; font-size: 28px;">DevTools</h1><p style="margin: 8px 0 0 0; opacity: 0.9;">Building Tomorrow's Technology Today</p></header><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"><div style="background: #faf5ff; padding: 16px; border-radius: 8px;"><h3 style="margin: 0 0 8px 0; color: #5b21b6;">API Management</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Powerful tools for API development</p></div><div style="background: #faf5ff; padding: 16px; border-radius: 8px;"><h3 style="margin: 0 0 8px 0; color: #5b21b6;">Code Generation</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Auto-generate boilerplate code</p></div></div></div>`
        }
    },
    colorSchemes: {
        modern_blue: { primary: "#3B82F6", secondary: "#1E40AF", accent: "#60A5FA" },
        creative_purple: { primary: "#8B5CF6", secondary: "#5B21B6", accent: "#A78BFA" },
        eco_green: { primary: "#059669", secondary: "#065F46", accent: "#34D399" },
        warm_orange: { primary: "#EA580C", secondary: "#C2410C", accent: "#FB923C" }
    }
};

// Utility Functions
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

function formatTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Navigation Functions
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        state.currentPage = pageId;
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        window.scrollTo(0, 0);
    }
}

// Chat Functions
function addMessage(content, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `<div class="message-content"><p>${content}</p></div><div class="message-time">${formatTime()}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    state.chatMessages.push({ content, isUser, timestamp: new Date() });
}

function showChatLoading() {
    const chatLoading = document.getElementById('chatLoading');
    if (chatLoading) {
        chatLoading.style.display = 'block';
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

function hideChatLoading() {
    const chatLoading = document.getElementById('chatLoading');
    if (chatLoading) {
        chatLoading.style.display = 'none';
    }
}

// =================================================================
// THIS IS THE NEW, REAL AI FUNCTION
// =================================================================
async function getAIResponse(userMessage) {
    showChatLoading();

    try {
        const response = await fetch('/api/getAIResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput: userMessage })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'The AI mentor is unavailable right now.');
        }

        const data = await response.json();
        
        // This formats the AI's markdown response (like **bold**) into HTML
        const formattedText = data.text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        hideChatLoading();
        addMessage(formattedText, false);

    } catch (error) {
        console.error("Error fetching AI response:", error);
        hideChatLoading();
        addMessage(`Sorry, I encountered an error: ${error.message}. Please try again.`, false);
    }
}

function initializeChat() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    
    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;
            addMessage(message, true);
            chatInput.value = '';
            // THIS IS THE CORRECTED LINE
            getAIResponse(message);
        });
    }

    const suggestionPills = document.querySelectorAll('.suggestion-pill');
    suggestionPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const suggestion = pill.getAttribute('data-suggestion');
            if (suggestion && chatInput) {
                addMessage(suggestion, true);
                // THIS IS ALSO CORRECTED
                getAIResponse(suggestion);
            }
        });
    });
}

// Promotion Functions
function generatePromotionalContent(formData) {
    const { startupName, domain } = formData;
    const domainContent = sampleData.promotionalContent[domain] || sampleData.promotionalContent['Technology'];
    const names = getRandomItems(domainContent.names, 4);
    const taglines = getRandomItems(domainContent.taglines, 3);
    const posts = getRandomItems(domainContent.posts, 2);
    names.unshift(startupName);
    return { names, taglines, posts };
}

function displayPromotionResults(results) {
    const containers = {
        names: document.getElementById('generatedNames'),
        taglines: document.getElementById('generatedTaglines'),
        posts: document.getElementById('generatedPosts')
    };
    if (containers.names && containers.taglines && containers.posts) {
        containers.names.innerHTML = results.names.map(name => `<div class="result-item"><span>${name}</span><button class="copy-btn" onclick="copyToClipboard('${name}')">Copy</button></div>`).join('');
        containers.taglines.innerHTML = results.taglines.map(tagline => `<div class="result-item"><span>"${tagline}"</span><button class="copy-btn" onclick="copyToClipboard('${tagline}')">Copy</button></div>`).join('');
        containers.posts.innerHTML = results.posts.map(post => `<div class="result-item"><span>${post}</span><button class="copy-btn" onclick="copyToClipboard('${post}')">Copy</button></div>`).join('');
        const promoResults = document.getElementById('promoResults');
        if (promoResults) {
            promoResults.style.display = 'block';
            promoResults.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function initializePromotions() {
    const promotionForm = document.getElementById('promotionForm');
    if (promotionForm) {
        promotionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                startupName: document.getElementById('startupName')?.value.trim() || '',
                domain: document.getElementById('domain')?.value || '',
                description: document.getElementById('description')?.value.trim() || ''
            };
            if (!formData.startupName || !formData.domain || !formData.description) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            const promoLoading = document.getElementById('promoLoading');
            const promoResults = document.getElementById('promoResults');
            if (promoLoading) promoLoading.style.display = 'block';
            if (promoResults) promoResults.style.display = 'none';
            setTimeout(() => {
                if (promoLoading) promoLoading.style.display = 'none';
                const results = generatePromotionalContent(formData);
                displayPromotionResults(results);
                showToast('Promotional content generated successfully!');
            }, 1500);
        });
    }
}

// Website Generator Functions
function updateProgressBar(step) {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((stepEl, index) => {
        if (index + 1 < step) {
            stepEl.classList.add('completed');
            stepEl.classList.remove('active');
        } else if (index + 1 === step) {
            stepEl.classList.add('active');
            stepEl.classList.remove('completed');
        } else {
            stepEl.classList.remove('active', 'completed');
        }
    });
}

function showGeneratorStep(stepNumber) {
    const steps = document.querySelectorAll('.generator-step');
    steps.forEach((step, index) => {
        if (index + 1 === stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    state.currentStep = stepNumber;
    updateProgressBar(stepNumber);
}

function updateWebsiteTypeOptions() {
    const websiteTypeInputs = document.querySelectorAll('input[name="websiteType"]');
    const pagesContainer = document.getElementById('pagesCheckboxes');
    const featuresContainer = document.getElementById('featuresCheckboxes');
    websiteTypeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                const selectedType = e.target.value;
                const typeData = sampleData.websiteTypes[selectedType];
                if (typeData && pagesContainer && featuresContainer) {
                    pagesContainer.innerHTML = typeData.pages.map(page => `<label class="checkbox-option"><input type="checkbox" name="pages" value="${page}" ${['Home', 'About', 'Contact'].includes(page) ? 'checked' : ''}><span>${page}</span></label>`).join('');
                    featuresContainer.innerHTML = typeData.features.map(feature => `<label class="checkbox-option"><input type="checkbox" name="features" value="${feature}"><span>${feature}</span></label>`).join('');
                }
            }
        });
    });
}

function validateStep(stepNumber) {
    let isValid = true;
    let errorMessage = '';
    if (stepNumber === 1) {
        const requiredFields = ['gen-startupName', 'gen-industry', 'gen-description', 'gen-targetAudience', 'gen-services'];
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                isValid = false;
                errorMessage = 'Please fill in all required fields';
                if (field) field.focus();
                break;
            }
        }
    } else if (stepNumber === 2) {
        if (!document.querySelector('input[name="websiteType"]:checked')) {
            isValid = false;
            errorMessage = 'Please select a website type';
        }
    } else if (stepNumber === 3) {
        if (!document.querySelector('input[name="colorScheme"]:checked')) {
            isValid = false;
            errorMessage = 'Please select a color scheme';
        }
    }
    if (!isValid && errorMessage) {
        showToast(errorMessage, 'error');
    }
    return isValid;
}

function saveStepData(stepNumber) {
    if (stepNumber === 1) {
        state.websiteData.step1 = {
            startupName: document.getElementById('gen-startupName')?.value || '',
            industry: document.getElementById('gen-industry')?.value || '',
            description: document.getElementById('gen-description')?.value || '',
            targetAudience: document.getElementById('gen-targetAudience')?.value || '',
            services: document.getElementById('gen-services')?.value || ''
        };
    } else if (stepNumber === 2) {
        state.websiteData.step2 = {
            websiteType: document.querySelector('input[name="websiteType"]:checked')?.value,
            pages: Array.from(document.querySelectorAll('input[name="pages"]:checked')).map(input => input.value),
            features: Array.from(document.querySelectorAll('input[name="features"]:checked')).map(input => input.value)
        };
    } else if (stepNumber === 3) {
        state.websiteData.step3 = {
            colorScheme: document.querySelector('input[name="colorScheme"]:checked')?.value,
            designStyle: document.getElementById('gen-designStyle')?.value || 'modern',
            logo: document.getElementById('gen-logo')?.value || ''
        };
    }
}

function generateWebsite() {
    const { step1, step2, step3 } = state.websiteData;
    let sampleKey = 'technology';
    if (step1.industry === 'healthcare') sampleKey = 'healthcare';
    else if (step1.industry === 'agriculture') sampleKey = 'agriculture';
    const sampleWebsite = sampleData.sampleWebsites[sampleKey];
    const colorScheme = sampleData.colorSchemes[step3.colorScheme];
    return {
        name: step1.startupName,
        industry: step1.industry,
        description: step1.description,
        websiteType: step2.websiteType,
        pages: step2.pages || sampleWebsite.pages,
        features: step2.features || sampleWebsite.features,
        backend: sampleWebsite.backend,
        colorScheme: colorScheme,
        designStyle: step3.designStyle,
        logo: step3.logo,
        preview: sampleWebsite.preview.replace(/MediConnect|AgroAI|DevTools/g, step1.startupName),
        url: `https://${step1.startupName.toLowerCase().replace(/\s+/g, '-')}.com`
    };
}

function simulateGeneration() {
    const generationProgress = document.getElementById('generationProgress');
    if (!generationProgress) return;
    document.querySelectorAll('.generator-step').forEach(step => step.classList.remove('active'));
    generationProgress.style.display = 'block';
    let currentStage = 0;
    const totalStages = sampleData.generationStages.length;
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    const stages = document.querySelectorAll('.stage');
    function updateProgress() {
        stages.forEach((stage, index) => {
            if (index < currentStage) {
                stage.classList.add('completed');
                stage.classList.remove('active');
            } else if (index === currentStage) {
                stage.classList.add('active');
            } else {
                stage.classList.remove('active', 'completed');
            }
        });
        const progress = ((currentStage + 1) / totalStages) * 100;
        if (progressBarFill) progressBarFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${Math.round(progress)}% Complete`;
        currentStage++;
        if (currentStage < totalStages) {
            setTimeout(updateProgress, 800);
        } else {
            setTimeout(showGenerationResults, 1000);
        }
    }
    updateProgress();
}

function showGenerationResults() {
    const generationProgress = document.getElementById('generationProgress');
    const generationResults = document.getElementById('generationResults');
    if (generationProgress) generationProgress.style.display = 'none';
    if (generationResults) generationResults.style.display = 'block';
    const websiteData = generateWebsite();
    state.websiteData.generated = websiteData;
    updateResultsDisplay(websiteData);
    if (generationResults) {
        generationResults.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('🎉 Website generated successfully!');
}

function updateResultsDisplay(websiteData) {
    const elements = {
        pagesList: document.getElementById('generatedPagesList'),
        featuresList: document.getElementById('generatedFeaturesList'),
        backendList: document.getElementById('generatedBackendList'),
        websiteUrl: document.getElementById('websiteUrl'),
        websitePreview: document.getElementById('websitePreview')
    };
    if (elements.pagesList) elements.pagesList.innerHTML = websiteData.pages.map(page => `<li>${page}</li>`).join('');
    if (elements.featuresList) elements.featuresList.innerHTML = websiteData.features.map(feature => `<li>${feature}</li>`).join('');
    if (elements.backendList) elements.backendList.innerHTML = websiteData.backend.map(service => `<li>${service}</li>`).join('');
    if (elements.websiteUrl) elements.websiteUrl.textContent = websiteData.url;
    if (elements.websitePreview) elements.websitePreview.innerHTML = websiteData.preview;
    updateCodePreview(websiteData);
}

function updateCodePreview(websiteData) {
    const htmlCodeEl = document.getElementById('htmlCode');
    const cssCodeEl = document.getElementById('cssCode');
    const jsCodeEl = document.getElementById('jsCode');
    if (htmlCodeEl) {
        htmlCodeEl.textContent = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${websiteData.name}</title>\n    <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n    <header>\n        <nav>\n            <div class="logo">${websiteData.logo ? `<img src="${websiteData.logo}" alt="${websiteData.name}">` : `<h1>${websiteData.name}</h1>`}</div>\n            <ul>\n                ${websiteData.pages.map(page => `<li><a href="#${page.toLowerCase()}">${page}</a></li>`).join('\n                ')}\n            </ul>\n        </nav>\n    </header>\n    <main>\n        <section class="hero">\n            <h2>Welcome to ${websiteData.name}</h2>\n            <p>${websiteData.description}</p>\n            <a href="#contact" class="cta-button">Get Started</a>\n        </section>\n    </main>\n    <script src="script.js"></script>\n</body>\n</html>`;
    }
    if (cssCodeEl) {
        cssCodeEl.textContent = `:root {\n    --primary-color: ${websiteData.colorScheme.primary};\n    --secondary-color: ${websiteData.colorScheme.secondary};\n}\n\nbody {\n    font-family: 'Inter', sans-serif;\n    margin: 0;\n    padding: 0;\n}`;
    }
    if (jsCodeEl) {
        jsCodeEl.textContent = `document.addEventListener('DOMContentLoaded', function() {\n    console.log('${websiteData.name} website loaded successfully!');\n});`;
    }
}

function initializeWebsiteGenerator() {
    const nextStep1 = document.getElementById('nextStep1');
    const prevStep2 = document.getElementById('prevStep2');
    const nextStep2 = document.getElementById('nextStep2');
    const prevStep3 = document.getElementById('prevStep3');
    const generateWebsiteBtn = document.getElementById('generateWebsite');
    if (nextStep1) {
        nextStep1.addEventListener('click', () => {
            if (validateStep(1)) {
                saveStepData(1);
                showGeneratorStep(2);
                updateWebsiteTypeOptions();
            }
        });
    }
    if (prevStep2) {
        prevStep2.addEventListener('click', () => showGeneratorStep(1));
    }
    if (nextStep2) {
        nextStep2.addEventListener('click', () => {
            if (validateStep(2)) {
                saveStepData(2);
                showGeneratorStep(3);
            }
        });
    }
    if (prevStep3) {
        prevStep3.addEventListener('click', () => showGeneratorStep(2));
    }
    if (generateWebsiteBtn) {
        generateWebsiteBtn.addEventListener('click', () => {
            if (validateStep(3)) {
                saveStepData(3);
                simulateGeneration();
            }
        });
    }
    document.getElementById('downloadWebsite')?.addEventListener('click', () => showToast('📦 Preparing download...'));
    document.getElementById('deployWebsite')?.addEventListener('click', () => showToast('🚀 Deploying to cloud...'));
    document.getElementById('regenerateWebsite')?.addEventListener('click', () => simulateGeneration());
    document.getElementById('startNewProject')?.addEventListener('click', () => {
        state.websiteData = { step1: {}, step2: {}, step3: {}, generated: null };
        document.querySelectorAll('#step1Form, #step2Form, #step3Form').forEach(form => form.reset());
        document.getElementById('generationResults').style.display = 'none';
        showGeneratorStep(1);
    });
    const colorSchemes = document.querySelectorAll('.color-scheme');
    colorSchemes.forEach(scheme => {
        scheme.addEventListener('click', () => {
            const radio = scheme.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
    showGeneratorStep(1);
}

// Global copy function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}
window.copyToClipboard = copyToClipboard;

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            setTimeout(() => {
                showToast('Message sent successfully!');
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Main App Initialization
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeContactForm();
        initializeChat();
        initializePromotions();
        initializeWebsiteGenerator();
        document.addEventListener('click', function(e) {
            const pageLink = e.target.closest('[data-page]');
            if (pageLink) {
                e.preventDefault();
                showPage(pageLink.getAttribute('data-page'));
            }
            const navToggle = e.target.closest('#navToggle');
            if (navToggle) {
                document.getElementById('navMenu')?.classList.toggle('active');
            }
        });
        showPage('home');
        console.log('FirstSteps application initialized successfully!');
        setTimeout(() => {
            showToast('Welcome to FirstSteps! 🚀');
        }, 1000);
    } catch (error) {
        console.error('Failed to initialize application:', error);
        showToast('Failed to load application. Please refresh the page.', 'error');
    }
});
