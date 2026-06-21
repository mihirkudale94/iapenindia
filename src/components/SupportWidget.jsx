import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, Send, X, RotateCcw, User,
  Mic, MicOff, Volume2, ThumbsUp, ThumbsDown, 
  Sparkles, Bot, Check, ArrowRight, RefreshCw, HelpCircle
} from 'lucide-react';
import './SupportWidget.css';
import { useDemo } from './DemoContext';

// Local Search Database derived from website content
const KNOWLEDGE_BASE = {
  membership: {
    title: 'Membership Tiers & Fees',
    priceDoctors: '₹5,000',
    priceAllied: '₹3,000',
    priceStudents: '₹500',
    benefits: [
      'Access to IAPEN INDIA newsletter INSIGHT',
      'Right to submit articles/blogs to INSIGHT newsletter',
      'Free digital access to official IAPEN INDIA Journal (IJPEN)',
      '10% discount on all IAPEN LLL training courses',
      'Voting rights and right to contest in executive elections (for Life members)'
    ]
  },
  courses: {
    title: 'ESPEN Lifelong Learning (LLL) Courses',
    details: 'Coordinated by IAPEN India in collaboration with ESPEN (European Society for Clinical Nutrition and Metabolism). The LLL program is a highly structured, international curriculum offering credits and official certification.',
    modules: [
      'Online study modules with self-assessment quizzes',
      'Live workshops with practical training sessions',
      'Continuing Nutrition Education (CNE) credit points',
      'Teacher LLL (T-LLL) eligibility for experienced practitioners'
    ]
  },
  chapters: [
    'Delhi NCR', 'Mumbai', 'Pune', 'Bangalore', 'Chennai', 
    'Hyderabad', 'Kolkata', 'Kochi', 'Nagpur', 'Jaipur', 
    'Ahmedabad', 'Bhopal', 'Lucknow', 'Chandigarh', 'Coimbatore'
  ],
  coreGroups: [
    'Critical Care Nutrition', 'Pediatric Nutrition', 'Oncology Nutrition', 
    'Geriatric Nutrition', 'Enteral & Parenteral Nutrition', 'Sports Nutrition', 
    'Renal Nutrition', 'Diabetes & Metabolic Disorders'
  ],
  journal: {
    name: 'Indian Journal of Parenteral and Enteral Nutrition (IJPEN)',
    frequency: 'Published Quarterly',
    info: 'A peer-reviewed scientific journal publishing original research, reviews, case studies, and clinical guidelines on enteral, parenteral, and oral nutrition support.'
  },
  events: {
    flagship: 'Indian Clinical Nutrition Congress (ICNC) 2026',
    others: '25+ Educational CNEs, web seminars, and regional workshops conducted yearly across various chapters.'
  },
  contact: {
    email: 'info@iapenindia.org',
    hours: 'Mon - Fri: 10:00 AM - 6:00 PM (IST)',
    headquarters: 'IAPEN India National Office, Clinical Nutrition Division'
  }
};

// Helper to get contextual follow-up questions
const getFollowUpQuestions = (intent) => {
  switch (intent) {
    case 'membership':
      return ['How do I register?', 'What are Allied Health benefits?', 'Find Regional Chapters'];
    case 'courses':
      return ['How do I earn LLL credits?', 'Am I eligible for T-LLL?', 'Check Membership Discounts'];
    case 'chapters':
      return ['Who runs Mumbai Chapter?', 'How to start a new chapter?', 'Contact Headquarters'];
    case 'journal':
      return ['How to submit a research paper?', 'Read INSIGHT Newsletter', 'Check Membership Benefits'];
    case 'events':
      return ['ICNC 2026 Registry link', 'Check CNE monthly calendar', 'Contact office coordinators'];
    case 'contact':
      return ['What are office operational hours?', 'Who is the program manager?', 'Membership registration page'];
    case 'greetings':
    default:
      return ['How much is Life Membership?', 'Tell me about ESPEN LLL', 'Where is my local chapter?'];
  }
};

// Helper functions defined outside the React component to comply with React purity rules
let idCounter = 0;
const generateMsgId = (sender) => {
  idCounter += 1;
  return `${sender}-${idCounter}-${Date.now()}`;
};

const getTimestamp = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const SupportWidget = () => {
  const {
    supportState,
    setSupportState,
    chatOpened,
    setChatOpened,
    addToast
  } = useDemo();

  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState(null);
  
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('iapen_chat_history');
    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'welcome',
        sender: 'assistant',
        text: 'Hello! I am **IAPEN Copilot**, IAPEN India\'s Agentic AI Support. I have access to our membership registry, ESPEN course database, regional chapters directory, and clinical guidelines. \n\nHow can I assist you today?',
        timestamp: getTimestamp(),
        customType: 'greeting',
        feedback: null
      }
    ];
  });
  
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [followUps, setFollowUps] = useState(['How much is Life Membership?', 'Tell me about ESPEN LLL', 'Where is my local chapter?']);

  const soundEnabled = localStorage.getItem('iapen_chat_sound_enabled') === 'true';
  const apiEndpoint = localStorage.getItem('iapen_chat_api_endpoint') || '';

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fade out welcome toast after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Synchronize local isOpen with context chatOpened
  useEffect(() => {
    if (chatOpened) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [chatOpened]);

  // Notify context of chat open/close
  const handleToggleOpen = (openState) => {
    setIsOpen(openState);
    setChatOpened(openState);
  };

  // Support Handoff queue and connection simulation
  useEffect(() => {
    if (supportState === 'queued') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
      setChatOpened(true);
      setIsThinking(true);
      
      const steps = [
        { label: 'Analyzing request semantic context...', status: 'done' },
        { label: 'Routing to Mumbai Chapter support queue...', status: 'pending' },
        { label: 'Awaiting coordinator connection...', status: 'waiting' }
      ];
      setReasoningSteps(steps);
      
      const timer = setTimeout(() => {
        setReasoningSteps(prev => [
          prev[0],
          { ...prev[1], status: 'done' },
          { ...prev[2], status: 'pending' }
        ]);
        
        const timer2 = setTimeout(() => {
          setIsThinking(false);
          setReasoningSteps([]);
          setSupportState('live');
          
          const systemMsg = {
            id: generateMsgId('system'),
            sender: 'system',
            text: '🛡️ **Secure Chat established with Dr. Ritu Sinha (Mumbai Chapter Coordinator)**',
            timestamp: getTimestamp(),
            customType: 'none',
            feedback: null
          };
          
          const coordinatorMsg = {
            id: generateMsgId('assistant'),
            sender: 'assistant',
            text: 'Hello! I am Dr. Ritu Sinha, the Mumbai Chapter Coordinator. I received your request for human assistance. How can I support your clinical or membership queries today?',
            timestamp: getTimestamp(),
            customType: 'none',
            feedback: null
          };
          
          setMessages(prev => [...prev, systemMsg, coordinatorMsg]);
          addToast('Live coordinator connected successfully', 'success');
        }, 1500);
        
        return () => clearTimeout(timer2);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportState]);

  const getCoordinatorResponse = (query) => {
    const cleanQuery = query.toLowerCase();
    if (/\b(member|membership|join|fee|cost|price)\b/.test(cleanQuery)) {
      return `For Mumbai Chapter membership approvals, you can apply directly under the **Membership** page. Since I coordinate Maharashtra approvals, I will receive your details in my Coordinator Dashboard. Let me know once you submit!`;
    } else if (/\b(course|espen|lll|credit|cne)\b/.test(cleanQuery)) {
      return `Our next Mumbai Chapter LLL workshop is scheduled for next month. You can submit your verified credits or attendance certificates directly in your Member Portal. I can review and verify them instantly in my coordinator panel.`;
    } else if (/\b(certificate|wallet|print)\b/.test(cleanQuery)) {
      return `Yes, you can verify and download all your certificates in your **Certificate Wallet** in the Member Portal. Once we verify your CNE module attendance, it auto-generates a print-ready PDF certificate.`;
    } else if (/\b(hello|hi|hey|thanks|thank you)\b/.test(cleanQuery)) {
      return `Hello! You're welcome. It is my pleasure to connect with our local clinical nutrition community. Let me know if you have any other questions regarding IAPEN clinical core groups or regional initiatives.`;
    } else {
      return `I have noted down your query regarding "${query}". I will forward this to our central administrative team at info@iapenindia.org so they can verify the records and email you back. Is there anything else I can clarify for you?`;
    }
  };

  // Initialize Web Speech API for voice dictation
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setInputText(speechToText);
        setIsRecording(false);
      };

      rec.onerror = () => {
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Save messages to LocalStorage when changed
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('iapen_chat_history', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  // Voice speech synthesis reader
  const handleSpeakMessage = (msgId, text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      alert('Vocal Speech Synthesis is not supported in this browser.');
      return;
    }

    if (currentlySpeakingId === msgId) {
      synth.cancel();
      setCurrentlySpeakingId(null);
      return;
    }

    synth.cancel(); // Stop any other message reading

    // Clean markdown before speaking
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/-\s/g, '')
      .replace(/`/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    utterance.onend = () => {
      setCurrentlySpeakingId(null);
    };

    utterance.onerror = () => {
      setCurrentlySpeakingId(null);
    };

    setCurrentlySpeakingId(msgId);
    synth.speak(utterance);
  };

  // Voice Input Toggle
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please try Google Chrome or MS Edge.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Clear Chat History & Start New Conversation
  const clearChat = () => {
    window.speechSynthesis?.cancel();
    setCurrentlySpeakingId(null);
    setSupportState('idle');
    const defaultMsg = [
      {
        id: 'welcome',
        sender: 'assistant',
        text: 'Hello! I am **IAPEN Copilot**, IAPEN India\'s Agentic AI Support. I have access to our membership registry, ESPEN course database, regional chapters directory, and clinical guidelines. \n\nHow can I assist you today?',
        timestamp: getTimestamp(),
        customType: 'greeting',
        feedback: null
      }
    ];
    setMessages(defaultMsg);
    localStorage.setItem('iapen_chat_history', JSON.stringify(defaultMsg));
    setFollowUps(getFollowUpQuestions('greetings'));
  };

  // Message Feedback (Thumbs Up/Down)
  const handleFeedback = (msgId, type) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === msgId) {
        const newFeedback = msg.feedback === type ? null : type;
        return { ...msg, feedback: newFeedback };
      }
      return msg;
    }));
  };

  // NLP Router and Mock Agent Search Engine
  const executeAgenticSearch = (query) => {
    const cleanQuery = query.toLowerCase();
    
    // Router logic: Map keywords to support intents
    let intent = 'general';
    if (/\b(member|membership|join|fee|cost|price|subscription|doctor|allied|student)\b/.test(cleanQuery)) {
      intent = 'membership';
    } else if (/\b(course|espen|lll|training|credit|modules|learn|t-lll|teach|certif)\b/.test(cleanQuery)) {
      intent = 'courses';
    } else if (/\b(chapter|delhi|mumbai|pune|bangalore|chennai|hyderabad|kolkata|nagpur|kochi|local|location|where|city|state)\b/.test(cleanQuery)) {
      intent = 'chapters';
    } else if (/\b(journal|ijpen|insight|newsletter|article|paper|publish|write|submit)\b/.test(cleanQuery)) {
      intent = 'journal';
    } else if (/\b(event|congress|icnc|conference|meeting|annual|seminar|2026)\b/.test(cleanQuery)) {
      intent = 'events';
    } else if (/\b(contact|email|phone|address|office|support|help|hours|operational)\b/.test(cleanQuery)) {
      intent = 'contact';
    } else if (/\b(hi|hello|hey|greetings|who|what)\b/.test(cleanQuery)) {
      intent = 'greetings';
    }

    // Update follow-up options in context
    setFollowUps(getFollowUpQuestions(intent));

    return new Promise((resolve) => {
      // Define agentic reasoning steps based on intent
      const steps = [
        { label: 'Ingesting user query & parsing semantic intent...', status: 'pending' },
        { label: 'Searching local knowledge vector index...', status: 'waiting' },
        { label: `Invoking domain tool: get_${intent}_data()...`, status: 'waiting' },
        { label: 'Synthesizing knowledge graph output...', status: 'waiting' },
        { label: 'Formatting interactive markdown cards...', status: 'waiting' }
      ];
      
      setReasoningSteps(steps);
      setIsThinking(true);

      // Simulate step-by-step execution to showcase "Agentic Reasoning"
      setTimeout(() => {
        setReasoningSteps(prev => [
          { ...prev[0], status: 'done' },
          { ...prev[1], status: 'pending' },
          ...prev.slice(2)
        ]);

        setTimeout(() => {
          setReasoningSteps(prev => [
            prev[0],
            { ...prev[1], status: 'done' },
            { ...prev[2], status: 'pending' },
            ...prev.slice(3)
          ]);

          setTimeout(() => {
            setReasoningSteps(prev => [
              prev[0],
              prev[1],
              { ...prev[2], status: 'done' },
              { ...prev[3], status: 'pending' },
              prev[4]
            ]);

            setTimeout(() => {
              setReasoningSteps(prev => [
                prev[0],
                prev[1],
                prev[2],
                { ...prev[3], status: 'done' },
                { ...prev[4], status: 'pending' }
              ]);

              setTimeout(() => {
                setIsThinking(false);
                setReasoningSteps([]);
                
                let text;
                let customType = 'none';

                switch(intent) {
                  case 'membership':
                    text = `### 💳 IAPEN India Membership Plans
We offer permanent **Lifetime Membership** for clinical professionals and a **Yearly Renewal** academic membership for students:
* **Life Member (Doctors)**: **₹5,000** (One-Time) — Physicians, surgeons, and specialists.
* **Life Member (Allied Health)**: **₹3,000** (One-Time) — Dietitians, nurses, and pharmacists.
* **Student Member**: **₹500** (Yearly) — Medical undergraduates and postgraduates.

**Core Benefits:**
* **Free digital access** to the official quarterly IAPEN India Journal (IJPEN).
* **10% discount** on all ESPEN LLL training courses.
* Rights to vote and contest in association elections (for Life Members).
* Access to publish clinical insights in our bi-monthly newsletter **INSIGHT**.`;
                    customType = 'membership';
                    break;
                  case 'courses':
                    text = `### 📚 ESPEN Lifelong Learning (LLL) Courses
Coordinated by IAPEN India in collaboration with the **European Society for Clinical Nutrition and Metabolism (ESPEN)**. 

The LLL program provides a standardized, internationally recognized curriculum in clinical nutrition:
* **Online Modules**: Self-assessment study modules and quizzes.
* **Live Workshops**: Interactive lectures and clinical case studies.
* **Earn Credits**: Cumulative educational credits towards ESPEN certification.
* **Teacher Training (T-LLL)**: Advanced teaching accreditation for senior practitioners.

*Note: IAPEN members receive a 10% discount on registration fees.*`;
                    customType = 'courses';
                    break;
                  case 'chapters':
                    text = `### 🌐 IAPEN India Active Chapters
IAPEN India maintains **over 35 active regional chapters** across major metropolitan hubs and cities, serving as local centers for CNE updates and clinical workshops:
* **North Zone**: Delhi NCR, Jaipur, Lucknow, Chandigarh
* **West Zone**: Mumbai, Pune, Nagpur, Ahmedabad, Bhopal
* **South Zone**: Bangalore, Chennai, Hyderabad, Kochi, Coimbatore
* **East Zone**: Kolkata

You can search regional coordinator details, contact info, and upcoming local seminars on our [Chapters Directory](/chapters).`;
                    customType = 'chapters';
                    break;
                  case 'journal':
                    text = `### 📰 Publications & Scientific Journals
I have indexed IAPEN India's active scientific catalogs:
1. **Indian Journal of Parenteral and Enteral Nutrition (IJPEN)**: Our peer-reviewed quarterly journal presenting original research, audits, and clinical guidelines.
2. **INSIGHT Newsletter**: Our bi-monthly publication featuring blogs, case studies, and letters from members.

*Note: All registered members receive free online access to the IJPEN digital portal. For article submission guidelines, visit the [Journal Page](/journal).*`;
                    break;
                  case 'events':
                    text = `### 📅 Events & National Congress
Check out IAPEN India's primary educational events:
* **${KNOWLEDGE_BASE.events.flagship}**: Our premier annual clinical nutrition congress featuring international keynote speakers, panel discussions, and scientific poster presentations.
* **CNE Webinars & Workshops**: Over 25 localized clinical updates conducted by regional chapters throughout the year.

*Select the relevant event below or view timetables on the [Events Page](/events).*`;
                    customType = 'events';
                    break;
                  case 'contact':
                    text = `### ✉️ Contact IAPEN India Headquarters
Feel free to reach out to the national office coordinator for administrative help:
* 📧 **Email Support**: [info@iapenindia.org](mailto:info@iapenindia.org)
* 🕒 **Operational Hours**: Monday to Friday (10:00 AM – 6:00 PM IST)
* 🏢 **Headquarters**: Clinical Nutrition Division, IAPEN India National Office

*For quick local assistance, please connect with your nearest coordinator on the [Contact Page](/contact).*`;
                    break;
                  case 'greetings':
                    text = `### 👋 Welcome to IAPEN Copilot!
I am your intelligent assistant. I am equipped to query our database to guide you through:
1. **💳 Membership**: Pricing tiers, perks, and online registration.
2. **📚 LLL Courses**: ESPEN course credits and teacher criteria.
3. **🌐 Local Chapters**: Search active coordinators in your city.
4. **📅 Events**: Dates for the ICNC 2026 National Congress.
5. **✉️ Support**: Contact coordinates and office hours.

How can I help you move forward today?`;
                    break;
                  default:
                    text = `🔍 **No exact database match found.**
I ran a semantic query across the database for **"${query}"** but couldn't find a direct record. 

Would you like to try one of these standard queries?
* **Membership fees and benefits**
* **ESPEN LLL courses**
* **Active regional chapters**
* **Upcoming conference details**

*Alternatively, you can email our administrative team at [info@iapenindia.org](mailto:info@iapenindia.org) or visit the [Contact Page](/contact).*`;
                }

                resolve({ text, customType });
              }, 400);
            }, 500);
          }, 600);
        }, 400);
      }, 500);
    });
  };

  // Submit Handler
  const handleSend = async (e, textOverride = null) => {
    if (e) e.preventDefault();
    
    const queryText = textOverride || inputText;
    if (!queryText.trim() || isThinking) return;

    const userText = queryText.trim();
    setInputText('');

    // Append user message
    const userMsg = {
      id: generateMsgId('user'),
      sender: 'user',
      text: userText,
      timestamp: getTimestamp(),
      customType: 'none',
      feedback: null
    };
    
    setMessages(prev => [...prev, userMsg]);

    // Check if custom API endpoint is defined
    if (apiEndpoint) {
      setIsThinking(true);
      setReasoningSteps([
        { label: `Connecting gateway to API: ${apiEndpoint}...`, status: 'pending' },
        { label: 'Awaiting response stream...', status: 'waiting' }
      ]);
      
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userText, history: messages })
        });
        
        setReasoningSteps(prev => [
          { ...prev[0], status: 'done' },
          { ...prev[1], status: 'pending' }
        ]);

        const data = await response.json();
        setIsThinking(false);
        setReasoningSteps([]);

        const assistantMsg = {
          id: generateMsgId('assistant'),
          sender: 'assistant',
          text: data.reply || 'Sorry, I received an invalid reply from the custom endpoint.',
          timestamp: getTimestamp(),
          customType: 'none',
          feedback: null
        };
        setMessages(prev => [...prev, assistantMsg]);
        if (soundEnabled) handleSpeakMessage(assistantMsg.id, assistantMsg.text);
      } catch (err) {
        console.error('API Gateway connection error:', err);
        setIsThinking(false);
        setReasoningSteps([]);
        const errorMsg = {
          id: generateMsgId('assistant-error'),
          sender: 'assistant',
          text: `⚠️ **API Gateway Connection Failed.**\n\nCould not connect to \`${apiEndpoint}\`. Please check your endpoint settings or try again. \n\n*Resetting to local database agent.*`,
          timestamp: getTimestamp(),
          customType: 'none',
          feedback: null
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    } else if (supportState === 'live') {
      setIsThinking(true);
      
      // Simulate live typing delay
      setTimeout(() => {
        setIsThinking(false);
        const text = getCoordinatorResponse(userText);
        const assistantMsg = {
          id: generateMsgId('assistant'),
          sender: 'assistant',
          text,
          timestamp: getTimestamp(),
          customType: 'none',
          feedback: null
        };
        setMessages(prev => [...prev, assistantMsg]);
        if (soundEnabled) handleSpeakMessage(assistantMsg.id, text);
      }, 1500);
    } else {
      // Local simulated response
      const { text, customType } = await executeAgenticSearch(userText);
      const assistantMsg = {
        id: generateMsgId('assistant'),
        sender: 'assistant',
        text,
        timestamp: getTimestamp(),
        customType,
        feedback: null
      };
      setMessages(prev => [...prev, assistantMsg]);
      if (soundEnabled) handleSpeakMessage(assistantMsg.id, text);
    }
  };

  // Helper renderer for Markdown Bold & Lists
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/^\*\s(.*)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>'); 
    html = html.replace(/^###\s(.*)/gm, '<h4 style="margin: 8px 0; font-family:var(--font-heading); font-weight:600;">$1</h4>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,0.06); padding:2px 4px; border-radius:4px; font-family:monospace; font-size:12px;">$1</code>');
    html = html.replace(/\n/g, '<br />');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  // Dynamic Visual Cards inside chat stream
  const renderCustomCard = (type) => {
    if (type === 'membership') {
      return (
        <div className="chat-custom-card-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <div className="chat-custom-card">
            <div className="chat-card-title">Life Member (Allied Health)</div>
            <div className="chat-card-price">₹3,000 <span>One-Time</span></div>
            <ul className="chat-card-feature-list">
              <li className="chat-card-feature-item">Dietitians, Nurses, Pharmacists</li>
              <li className="chat-card-feature-item">National Registry Listing</li>
              <li className="chat-card-feature-item">10% Off LLL Courses</li>
            </ul>
            <Link to="/membership" onClick={() => setIsOpen(false)} className="chat-card-btn primary">
              Register Now <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </Link>
          </div>
          <div className="chat-custom-card">
            <div className="chat-card-title">Life Member (Doctors)</div>
            <div className="chat-card-price">₹5,000 <span>One-Time</span></div>
            <ul className="chat-card-feature-list">
              <li className="chat-card-feature-item">Physicians & Surgeons</li>
              <li className="chat-card-feature-item">Full Voting Rights</li>
              <li className="chat-card-feature-item">Journal (IJPEN) Access</li>
            </ul>
            <Link to="/membership" onClick={() => setIsOpen(false)} className="chat-card-btn primary">
              Register Now <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </Link>
          </div>
        </div>
      );
    }

    if (type === 'courses') {
      return (
        <div className="chat-custom-card" style={{ marginTop: '10px' }}>
          <div className="chat-card-title">ESPEN LLL Quick Actions</div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Check schedules, register for live modules, or query certification requirements:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/courses" onClick={() => setIsOpen(false)} className="chat-card-btn teal-btn">
              ESPEN LLL Schedule <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </Link>
            <Link to="/courses#t-lll" onClick={() => setIsOpen(false)} className="chat-card-btn secondary">
              Teacher LLL Info
            </Link>
          </div>
        </div>
      );
    }

    if (type === 'events') {
      return (
        <div className="chat-custom-card" style={{ marginTop: '10px' }}>
          <div className="chat-card-title">Indian Clinical Nutrition Congress</div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)', marginBottom: '8px' }}>ICNC 2026 Summit</div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Join leading national and international clinical nutrition scientists, dietitians, and physicians.
          </p>
          <Link to="/events" onClick={() => setIsOpen(false)} className="chat-card-btn primary">
            View Schedule & Register <ArrowRight size={14} style={{ marginLeft: '4px' }} />
          </Link>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Onboarding Welcome Toast */}
      {showToast && !isOpen && (
        <div className="support-widget-toast" onClick={() => handleToggleOpen(true)}>
          <button 
            type="button" 
            className="toast-close" 
            onClick={(e) => {
              e.stopPropagation();
              setShowToast(false);
            }}
          >
            <X size={14} />
          </button>
          <div className="toast-header">
            <Bot size={16} style={{ color: 'var(--accent)' }} />
            <span>IAPEN Copilot Online</span>
          </div>
          <p>Hi! Ask me about membership pricing, ESPEN courses, or local chapters.</p>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        className="support-widget-fab"
        onClick={() => {
          handleToggleOpen(!isOpen);
          setShowToast(false);
        }}
        aria-label="Toggle Support Chat"
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        <span className="support-widget-fab-badge"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="support-chat-window">
          {/* Header */}
          <div className="support-chat-header">
            <div className="support-header-info">
              <div className="support-agent-avatar">
                {supportState === 'live' ? <User size={20} /> : <Bot size={20} />}
                <span className="support-agent-status-dot"></span>
              </div>
              <div>
                <div className="support-agent-name">{supportState === 'live' ? 'Dr. Ritu Sinha' : 'IAPEN Copilot'}</div>
                <div className="support-agent-subtitle">
                  <Sparkles size={10} style={{ color: 'var(--accent)' }} /> 
                  {supportState === 'live' ? 'Chapter Coordinator' : 'Agentic AI System'}
                </div>
              </div>
            </div>
            
            <div className="support-header-actions">
              <button 
                className="support-header-btn"
                onClick={clearChat}
                title="Start New Chat"
              >
                <RotateCcw size={16} />
              </button>
              <button 
                className="support-header-btn"
                onClick={() => handleToggleOpen(false)}
                title="Minimize"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Message Stream */}
          <div className="support-chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`support-message-row ${msg.sender}`}>
                <div className="support-message-bubble">
                  {renderMarkdown(msg.text)}
                  
                  {/* Custom Visual Card payloads */}
                  {renderCustomCard(msg.customType)}
                  
                  {/* Feedback toolbar for AI responses */}
                  {msg.sender === 'assistant' && msg.id !== 'welcome' && (
                    <div className="support-feedback-row">
                      <button 
                        className={`support-feedback-btn ${currentlySpeakingId === msg.id ? 'active speak-active' : ''}`}
                        onClick={() => handleSpeakMessage(msg.id, msg.text)}
                        title={currentlySpeakingId === msg.id ? 'Stop Reading' : 'Read Aloud'}
                      >
                        <Volume2 size={12} />
                      </button>
                      <button 
                        className={`support-feedback-btn ${msg.feedback === 'up' ? 'active' : ''}`}
                        onClick={() => handleFeedback(msg.id, 'up')}
                        title="Good answer"
                      >
                        <ThumbsUp size={12} />
                      </button>
                      <button 
                        className={`support-feedback-btn thumbs-down ${msg.feedback === 'down' ? 'active' : ''}`}
                        onClick={() => handleFeedback(msg.id, 'down')}
                        title="Poor answer"
                      >
                        <ThumbsDown size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Bouncing Dots typing bubble when reasoning */}
            {isThinking && (
              <div className="support-message-row assistant">
                <div className="support-message-bubble typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}

            {/* Simulated Live Reasoning Steps */}
            {isThinking && reasoningSteps.length > 0 && (
              <div className="agentic-reasoning-container">
                <div className="reasoning-header">
                  <RefreshCw size={12} className="reasoning-step-icon pending" />
                  Agent Reasoning Process
                </div>
                <div className="reasoning-steps">
                  {reasoningSteps.map((step, idx) => (
                    <div key={idx} className={`reasoning-step ${step.status}`}>
                      <div className="reasoning-step-icon">
                        {step.status === 'done' && <Check size={12} className="done" />}
                        {step.status === 'pending' && <RefreshCw size={12} className="pending" />}
                        {step.status === 'waiting' && <HelpCircle size={12} className="waiting" />}
                      </div>
                      <span className="reasoning-step-text">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Dynamic Suggested Follow-Up Actions */}
          {!isThinking && followUps.length > 0 && (
            <div className="support-suggested-actions-container">
              <div className="support-suggested-actions">
                {followUps.map((question, index) => (
                  <button 
                    key={index} 
                    className="suggested-chip" 
                    onClick={() => handleSend(null, question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form className="support-chat-input-container" onSubmit={(e) => handleSend(e)}>
            <button 
              type="button" 
              className={`support-input-btn ${isRecording ? 'voice-active' : ''}`}
              onClick={toggleRecording}
              title={isRecording ? 'Listening...' : 'Voice Dictation'}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            
            <textarea
              className="support-chat-textarea"
              placeholder="Ask IAPEN Copilot..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              rows={1}
            />

            <button 
              type="submit" 
              className="support-input-btn send" 
              disabled={!inputText.trim() || isThinking}
              title="Send Message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SupportWidget;
