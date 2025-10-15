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

// Sample data for AI responses (simulating backend)
const sampleData = {
    chatResponses: [
        "That's a great question! When starting a startup, it's important to validate your idea first. Have you conducted any market research or spoken to potential customers?",
        "Building a minimum viable product (MVP) is crucial. Start with the core features that solve your users' main problem. What's the primary pain point your startup addresses?",
        "Consider your business model early on. How do you plan to monetize your solution? Will it be subscription-based, one-time purchase, or freemium?",
        "Team building is essential. Look for co-founders who complement your skills. Do you have technical expertise, or do you need a technical co-founder?",
        "Funding is important, but don't rush into it. Bootstrap if possible initially. Have you calculated how much funding you actually need to reach your next milestone?",
        "Customer acquisition is key. Start thinking about your marketing strategy. Who is your target audience and where can you reach them most effectively?"
    ],
    
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
                "ðŸŒ¾ Transform your farming with AI! Detect crop diseases before they spread and optimize your harvest. #AgTech #AI #Farming",
                "ðŸ“¸ One photo of your crop can save your entire harvest! Discover the future of smart farming today. #SmartFarming #Innovation",
                "ðŸšœ Join thousands of farmers already using AI to increase their yields by 25%. The future of agriculture is here! #FarmTech #Sustainability"
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
                "ðŸ ¥ Skip the waiting room! Connect with quality healthcare from your home. Experience the future of medicine. #Telemedicine #Healthcare #Digital",
                "ðŸ‘©â€ âš•ï¸  Connect with trusted doctors instantly. Get consultations, prescriptions, and health monitoring in one platform. #HealthTech #Innovation",
                "ðŸ’Š Managing your health has never been easier. Book appointments, track vitals, and stay connected with your care team. #DigitalHealth #WellBeing"
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
                "ðŸš€ Transforming ideas into powerful digital solutions. Join the tech revolution! #Technology #Innovation #Digital",
                "ðŸ’» From concept to deployment, we build technology that makes a difference. #TechStartup #Development #Innovation",
                "âš¡ Accelerate your business with cutting-edge technology solutions. The future is digital! #DigitalTransformation #Tech"
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
                "ðŸ’° Take control of your finances with intelligent money management. Start your journey to financial freedom! #FinTech #PersonalFinance",
                "ðŸ“Š Smart investing made simple. Let AI help you make better financial decisions. #Investment #AI #Finance",
                "ðŸ ¦ Banking reimagined. Experience seamless, secure, and smart financial services. #DigitalBanking #Innovation"
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
                "ðŸŽ“ Personalized learning experiences that adapt to every student's needs. Transform education with AI! #EdTech #Learning #AI",
                "ðŸ“š Make learning engaging, interactive, and effective. Join the educational revolution! #Education #Innovation #DigitalLearning",
                "ðŸ§  Boost student performance with adaptive learning technology. Every learner deserves personalized education! #PersonalizedLearning #EdTech"
            ]
        }
    },

    // Website generator data
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

    generationStages: [
        "Analyzing requirements",
        "Generating pages", 
        "Creating components",
        "Building backend",
        "Setting up database",
        "Optimizing code",
        "Finalizing project"
    ],

    sampleWebsites: {
        healthcare: {
            name: "MediConnect",
            pages: ["Landing", "Services", "Doctors", "Appointments", "Patient Portal"],
            features: ["Online booking", "Patient records", "Secure messaging", "Payment processing"],
            backend: ["User authentication", "Appointment scheduling", "Medical records API", "Payment gateway"],
            preview: `
                <div style="padding: 20px; font-family: Inter, sans-serif;">
                    <header style="background: linear-gradient(135deg, #3B82F6, #1E40AF); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h1 style="margin: 0; font-size: 28px;">MediConnect</h1>
                        <p style="margin: 8px 0 0 0; opacity: 0.9;">Healthcare Without Boundaries</p>
                    </header>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                            <h3 style="margin: 0 0 8px 0; color: #1e40af;">Book Appointment</h3>
                            <p style="margin: 0; color: #64748b; font-size: 14px;">Schedule with trusted healthcare providers</p>
                        </div>
                        <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                            <h3 style="margin: 0 0 8px 0; color: #1e40af;">Patient Records</h3>
                            <p style="margin: 0; color: #64748b; font-size: 14px;">Secure access to your medical history</p>
                        </div>
                    </div>
                </div>
            `
        },
        agriculture: {
            name: "AgroAI", 
            pages: ["Dashboard", "Crop Monitoring", "Analytics", "Pricing", "Support"],
            features: ["IoT integration", "Real-time monitoring", "Predictive analytics", "Mobile app"],
            backend: ["Sensor data processing", "ML predictions", "User management", "Subscription billing"],
            preview: `
                <div style="padding: 20px; font-family: Inter, sans-serif;">
                    <header style="background: linear-gradient(135deg, #059669, #065F46); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h1 style="margin: 0; font-size: 28px;">AgroAI</h1>
                        <p style="margin: 8px 0 0 0; opacity: 0.9;">Smart Farming for Sustainable Future</p>
                    </header>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px;">
                            <h3 style="margin: 0 0 8px 0; color: #065f46;">Crop Monitoring</h3>
                            <p style="margin: 0; color: #64748b; font-size: 14px;">Real-time field analytics and insights</p>
                        </div>
                        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px;">
                            <h3 style="margin: 0 0 8px 0; color: #065f46;">AI Predictions</h3>
                            <p style="margin: 0; color: #64748b; font-size: 14px;">Predict yields and optimize harvests</p>
                        </div>
                    </div>
                </div>
            `
        },
        technology: {
            name: "DevTools",
            pages: ["Landing", "Features", "Pricing", "Documentation", "Dashboard"],
            features: ["API management", "Code generation", "Team collaboration", "Analytics"],
            backend: ["API gateway", "Code compiler", "User authentication", "Usage analytics"],
            preview: `
                <div style="padding: 20px; font-family: Inter, sans-serif;">
                    <header style="background: linear-gradient(135deg, #8B5CF6, #5B21B6); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h1 style="margin: 0; font-size: 28px;">DevTools</h1>
                        <p style="margin: 8px 0 0 0; opacity: 0.9;">Building Tomorrow's Technology Today</p>
                    </header>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: #faf5ff; padding: 16px; border-radius: 8px;">
                            <h3 style="margin: 0 0 8px 0; color: #5b21b6;">API Management</h3>
                            <p style="margin: 0; color: #64748b; font-size: 14px;">Powerful tools for API development</p>
                        </div>
                        <div style="background: #faf5ff; padding: 16px; border-radius: 8px;">
                            <h3 style="margin: 0 0 8px 0; color: #5b21b6;">Code Generation</h3>
                            <p style="margin: 0; color: #64748b; font-size: 14px;">Auto-generate boilerplate code</p>
                        </div>
                    </div>
                </div>
            `
        }
    },

    colorSchemes: {
        modern_blue: {
            primary: "#3B82F6",
            secondary: "#1E40AF", 
            accent: "#60A5FA"
        },
        creative_purple: {
            primary: "#8B5CF6",
            secondary: "#5B21B6",
            accent: "#A78BFA"
        },
        eco_green: {
            primary: "#059669",
            secondary: "#065F46", 
            accent: "#34D399"
        },
        warm_orange: {
            primary: "#EA580C",
            secondary: "#C2410C",
            accent: "#FB923C"
        }
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

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Navigation Functions
function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        state.currentPage = pageId;
        
        // **FIXED**: Corrected the selector syntax by wrapping it in backticks.
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        window.scrollTo(0, 0);
        console.log('Successfully navigated to:', pageId);
        return true;
    }
    
    console.error('Page not found:', pageId);
    return false;
}

// Chat Functions
function addMessage(content, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${content}</p>
        </div>
        <div class="message-time">${formatTime()}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    state.chatMessages.push({
        content,
        isUser,
        timestamp: new Date()
    });
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

// **NEW**: Function to get a real response from the backend API
async function getRealAIResponse(userMessage) {
    showChatLoading();
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.querySelector('.chat-send-btn');

    // Disable input while fetching
    if (chatInput) chatInput.disabled = true;
    if (sendButton) sendButton.disabled = true;

    try {
        // This calls your API file located at /api/getAIResponse.js
        const response = await fetch('/api/getAIResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput: userMessage }),
        });

        if (!response.ok) {
            // Handle errors from the API
            const errorData = await response.json();
            throw new Error(errorData.error || 'The AI mentor is unavailable right now.');
        }

        const data = await response.json();
        addMessage(data.text, false); // Add the real AI response to the chat

    } catch (error) {
        console.error('API call failed:', error);
        // Let the user know something went wrong
        addMessage(`Sorry, I couldn't get a response. Error: ${error.message}`, false);
    } finally {
        hideChatLoading();
        // Re-enable input
        if (chatInput) chatInput.disabled = false;
        if (sendButton) sendButton.disabled = false;
        if (chatInput) chatInput.focus();
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
            
            // **UPDATED**: Call the real API function instead of the simulation
            getRealAIResponse(message);
        });
    }

    // Handle suggestion pills
    const suggestionPills = document.querySelectorAll('.suggestion-pill');
    suggestionPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const suggestion = pill.getAttribute('data-suggestion');
            if (suggestion && chatInput) {
                addMessage(suggestion, true);
                
                // **UPDATED**: Call the real API function
                getRealAIResponse(suggestion);
            }
        });
    });
}

// Promotion Functions
function generatePromotionalContent(formData) {
    const { startupName, domain, description } = formData;
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
        containers.names.innerHTML = results.names.map(name => `
            <div class="result-item">
                <span>${name}</span>
                <button class="copy-btn" onclick="copyToClipboard('${name}')">Copy</button>
            </div>
        `).join('');
        
        containers.taglines.innerHTML = results.taglines.map(tagline => `
            <div class="result-item">
                <span>"${tagline}"</span>
                <button class="copy-btn" onclick="copyToClipboard('${tagline}')">Copy</button>
            </div>
        `).join('');
        
        containers.posts.innerHTML = results.posts.map(post => `
            <div class="result-item">
                <span>${post}</span>
                <button class="copy-btn" onclick="copyToClipboard('${post}')">Copy</button>
            </div>
        `).join('');
        
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
            
            const formElements = {
                startupName: document.getElementById('startupName'),
                domain: document.getElementById('domain'),
                description: document.getElementById('description')
            };
            
            const formData = {
                startupName: formElements.startupName?.value.trim() || '',
                domain: formElements.domain?.value || '',
                description: formElements.description?.value.trim() || ''
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
            }, 2000 + Math.random() * 1000);
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
                    // Update pages
                    pagesContainer.innerHTML = typeData.pages.map(page => `
                        <label class="checkbox-option">
                            <input type="checkbox" name="pages" value="${page}" ${['Home', 'About', 'Contact'].includes(page) ? 'checked' : ''}>
                            <span>${page}</span>
                        </label>
                    `).join('');
                    
                    // Update features
                    featuresContainer.innerHTML = typeData.features.map(feature => `
                        <label class="checkbox-option">
                            <input type="checkbox" name="features" value="${feature}">
                            <span>${feature}</span>
                        </label>
                    `).join('');
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
        const websiteType = document.querySelector('input[name="websiteType"]:checked');
        if (!websiteType) {
            isValid = false;
            errorMessage = 'Please select a website type';
        }
    } else if (stepNumber === 3) {
        const colorScheme = document.querySelector('input[name="colorScheme"]:checked');
        if (!colorScheme) {
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
        const websiteType = document.querySelector('input[name="websiteType"]:checked')?.value;
        const pages = Array.from(document.querySelectorAll('input[name="pages"]:checked')).map(input => input.value);
        const features = Array.from(document.querySelectorAll('input[name="features"]:checked')).map(input => input.value);
        
        state.websiteData.step2 = {
            websiteType,
            pages,
            features
        };
    } else if (stepNumber === 3) {
        const colorScheme = document.querySelector('input[name="colorScheme"]:checked')?.value;
        const designStyle = document.getElementById('gen-designStyle')?.value || 'modern';
        const logo = document.getElementById('gen-logo')?.value || '';
        
        state.websiteData.step3 = {
            colorScheme,
            designStyle,
            logo
        };
    }
}

function generateWebsite() {
    const { step1, step2, step3 } = state.websiteData;
    
    // Determine sample website based on industry
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
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    const stages = document.querySelectorAll('.stage');
    
    if (!generationProgress) return;
    
    // Hide steps and show progress
    document.querySelectorAll('.generator-step').forEach(step => step.classList.remove('active'));
    generationProgress.style.display = 'block';
    
    let currentStage = 0;
    const totalStages = sampleData.generationStages.length;
    
    function updateProgress() {
        // Update stages
        stages.forEach((stage, index) => {
            if (index < currentStage) {
                stage.classList.add('completed');
                stage.classList.remove('active');
            } else if (index === currentStage) {
                stage.classList.add('active');
                stage.classList.remove('completed');
            } else {
                stage.classList.remove('active', 'completed');
            }
        });
        
        // Update progress bar
        const progress = ((currentStage + 1) / totalStages) * 100;
        if (progressBarFill) progressBarFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${Math.round(progress)}% Complete`;
        
        currentStage++;
        
        if (currentStage < totalStages) {
            setTimeout(updateProgress, 800 + Math.random() * 400);
        } else {
            setTimeout(() => {
                showGenerationResults();
            }, 1000);
        }
    }
    
    updateProgress();
}

function showGenerationResults() {
    const generationProgress = document.getElementById('generationProgress');
    const generationResults = document.getElementById('generationResults');
    
    if (generationProgress) generationProgress.style.display = 'none';
    if (generationResults) generationResults.style.display = 'block';
    
    // Generate website data
    const websiteData = generateWebsite();
    state.websiteData.generated = websiteData;
    
    // Update results display
    updateResultsDisplay(websiteData);
    
    // Scroll to results
    if (generationResults) {
        generationResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    showToast('ðŸŽ‰ Website generated successfully!');
}

function updateResultsDisplay(websiteData) {
    // Update generated lists
    const pagesListEl = document.getElementById('generatedPagesList');
    const featuresListEl = document.getElementById('generatedFeaturesList');
    const backendListEl = document.getElementById('generatedBackendList');
    
    if (pagesListEl) {
        pagesListEl.innerHTML = websiteData.pages.map(page => `<li>${page}</li>`).join('');
    }
    
    if (featuresListEl) {
        featuresListEl.innerHTML = websiteData.features.map(feature => `<li>${feature}</li>`).join('');
    }
    
    if (backendListEl) {
        backendListEl.innerHTML = websiteData.backend.map(service => `<li>${service}</li>`).join('');
    }
    
    // Update website URL
    const websiteUrlEl = document.getElementById('websiteUrl');
    if (websiteUrlEl) {
        websiteUrlEl.textContent = websiteData.url;
    }
    
    // Update preview
    const websitePreviewEl = document.getElementById('websitePreview');
    if (websitePreviewEl) {
        websitePreviewEl.innerHTML = websiteData.preview;
    }
    
    // Update code sections
    updateCodePreview(websiteData);
}

function updateCodePreview(websiteData) {
    const htmlCodeEl = document.getElementById('htmlCode');
    const cssCodeEl = document.getElementById('cssCode');
    const jsCodeEl = document.getElementById('jsCode');
    
    if (htmlCodeEl) {
        htmlCodeEl.textContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.name}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="container">
                <div class="logo">
                    ${websiteData.logo ? `<img src="${websiteData.logo}" alt="${websiteData.name}">` : `<h1>${websiteData.name}</h1>`}
                </div>
                <ul class="nav-menu">
                    ${websiteData.pages.map(page => `<li><a href="#${page.toLowerCase()}">${page}</a></li>`).join('\n                    ')}
                </ul>
            </div>
        </nav>
    </header>
    
    <main>
        <section class="hero">
            <div class="container">
                <h2>Welcome to ${websiteData.name}</h2>
                <p>${websiteData.description}</p>
                <a href="#contact" class="cta-button">Get Started</a>
            </div>
        </section>
        
        ${websiteData.features.map(feature => `
        <section class="feature">
            <div class="container">
                <h3>${feature}</h3>
                <p>Experience the power of ${feature.toLowerCase()} with ${websiteData.name}.</p>
            </div>
        </section>`).join('\n        ')}
    </main>
    
    <script src="script.js"></script>
</body>
</html>`;
    }
    
    if (cssCodeEl) {
        cssCodeEl.textContent = `/* Generated CSS styles for ${websiteData.name} */
:root {
    --primary-color: ${websiteData.colorScheme.primary};
    --secondary-color: ${websiteData.colorScheme.secondary};
    --accent-color: ${websiteData.colorScheme.accent};
    --text-color: #333;
    --bg-color: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--bg-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: var(--primary-color);
    color: white;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s ease;
}

.nav-menu a:hover {
    opacity: 0.8;
}

.hero {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.cta-button {
    background: var(--accent-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
}

.feature {
    padding: 3rem 0;
    border-bottom: 1px solid #eee;
}

.feature h3 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .hero h2 {
        font-size: 2rem;
    }
    
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
}`;
    }
    
    if (jsCodeEl) {
        jsCodeEl.textContent = `// Generated JavaScript functionality for ${websiteData.name}

document.addEventListener('DOMContentLoaded', function() {
    console.log('${websiteData.name} website loaded successfully!');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // CTA button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Welcome to ${websiteData.name}! Contact form functionality would be implemented here.');
        });
    }
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.feature');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Contact form handling (if implemented)
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form submission:', data);
    alert('Thank you for your interest in ${websiteData.name}! We will get back to you soon.');
    event.target.reset();
}

// Search functionality (if implemented)
function handleSearch(query) {
    console.log('Search query:', query);
    // Search implementation would go here
}

// User authentication helpers (if implemented)
const auth = {
    login: async (credentials) => {
        console.log('Login attempt:', credentials);
        // Authentication logic would go here
    },
    
    register: async (userData) => {
        console.log('Registration attempt:', userData);
        // Registration logic would go here
    },
    
    logout: () => {
        console.log('User logged out');
        // Logout logic would go here
    }
};`;
    }
}

function initializeWebsiteGenerator() {
    // Initialize step navigation
    const nextStep1 = document.getElementById('nextStep1');
    const prevStep2 = document.getElementById('prevStep2');
    const nextStep2 = document.getElementById('nextStep2');
    const prevStep3 = document.getElementById('prevStep3');
    const generateWebsiteBtn = document.getElementById('generateWebsite');
    
    // Action buttons
    const downloadBtn = document.getElementById('downloadWebsite');
    const deployBtn = document.getElementById('deployWebsite');
    const regenerateBtn = document.getElementById('regenerateWebsite');
    const startNewBtn = document.getElementById('startNewProject');
    
    // Step navigation
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
        prevStep2.addEventListener('click', () => {
            showGeneratorStep(1);
        });
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
        prevStep3.addEventListener('click', () => {
            showGeneratorStep(2);
        });
    }
    
    if (generateWebsiteBtn) {
        generateWebsiteBtn.addEventListener('click', () => {
            if (validateStep(3)) {
                saveStepData(3);
                simulateGeneration();
            }
        });
    }
    
    // Action buttons
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const websiteData = state.websiteData.generated;
            if (websiteData) {
                showToast('ðŸ“¦ Preparing download package... This would download a zip file with all website files.');
            }
        });
    }
    
    if (deployBtn) {
        deployBtn.addEventListener('click', () => {
            const websiteData = state.websiteData.generated;
            if (websiteData) {
                showToast('ðŸš€ Deploying to cloud... Your website would be live in minutes!');
            }
        });
    }
    
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to regenerate the website? This will create a new version.')) {
                simulateGeneration();
            }
        });
    }
    
    if (startNewBtn) {
        startNewBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to start a new project? All current data will be lost.')) {
                // Reset all data
                state.websiteData = { step1: {}, step2: {}, step3: {}, generated: null };
                state.currentStep = 1;
                
                // Clear forms
                document.querySelectorAll('#step1Form, #step2Form, #step3Form').forEach(form => {
                    if (form) form.reset();
                });
                
                // Hide results and show step 1
                const generationResults = document.getElementById('generationResults');
                if (generationResults) generationResults.style.display = 'none';
                
                showGeneratorStep(1);
                showToast('Started new website project!');
            }
        });
    }
    
    // Color scheme selection
    const colorSchemes = document.querySelectorAll('.color-scheme');
    colorSchemes.forEach(scheme => {
        scheme.addEventListener('click', () => {
            const radio = scheme.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
    
    // Initialize first step
    showGeneratorStep(1);
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Copied to clipboard!');
    } catch (err) {
        showToast('Failed to copy to clipboard', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Make functions globally available
window.copyToClipboard = copyToClipboard;
window.showPage = showPage;

// Contact form functions
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            if (!data.name || !data.email || !data.message) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showToast('Message sent successfully! We\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing FirstSteps application...');
    
    try {
        // Initialize all components
        initializeContactForm();
        initializeChat();
        initializePromotions();
        initializeWebsiteGenerator();
        
        // Set up navigation event listeners
        document.addEventListener('click', function(e) {
            const element = e.target.closest('[data-page]');
            if (element) {
                e.preventDefault();
                const pageId = element.getAttribute('data-page');
                showPage(pageId);
                return;
            }
            
            // Handle mobile nav toggle
            if (e.target.closest('#navToggle')) {
                e.preventDefault();
                const navMenu = document.getElementById('navMenu');
                if (navMenu) {
                    navMenu.classList.toggle('active');
                }
                return;
            }
        });
        
        // Show initial page
        showPage('home');
        
        console.log('FirstSteps application initialized successfully!');
        
        // Welcome message
        setTimeout(() => {
            showToast('Welcome to FirstSteps! ðŸš€');
        }, 1000);
        
    } catch (error) {
        console.error('Failed to initialize application:', error);
        showToast('Failed to load application. Please refresh the page.', 'error');
    }
});
