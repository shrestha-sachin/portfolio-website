export const personalInfo = {
  name: "Sachin Shrestha",
  title: "Software Engineer & AI Enthusiast",
  address: "Green Bay, WI, USA",
  permanentAddress: "Damauli, Tanahun, Nepal",
  email: "sachinshrestha2635@gmail.com",
  phone: "986-268-5223",
  linkedin: "linkedin.com/in/sachin-stha/",
  github: "github.com/shrestha-sachin",
  facebook: "facebook.com/sachin.stha.26",
  instagram: "instagram.com/sachin_shrestha__",
  youtube: "@sachin-stha",
  avatar: "./Resources/Images/profile.jpg",
  bio: "I am a rising senior studying Computer Science with an emphasis on Artificial Intelligence at the University of Wisconsin-Green Bay. As the Founder and President of the Google Developer Group and the lead organizer for HackGB, I am highly dedicated to building a collaborative student tech community. This summer, I am working as a Data Engineering Intern at Faith Technologies. My technical interests span agentic AI, automation, and full-stack development, often blended with a passion for graphic design to create user-friendly experiences. Academically, I have a strong interest in research—particularly in computer vision—to solve real-world problems. Beyond coding, I am an avid traveler and outdoor enthusiast who loves hiking and seeking new thrill-seeking adventures, like skydiving from 10,000 feet."
};

export const education = [
  {
    institution: "University of Wisconsin - Green Bay",
    location: "Green Bay, Wisconsin",
    degree: "Bachelor of Science in Computer Science (Emphasis in Artificial Intelligence)",
    period: "2024 - Expected May 2027",
    details: [
      "GPA: 3.82/4.00",
      "Rising Senior",
      "Dean's List (High Honors)",
      "Sherry Anklam Memorial Award Recipient"
    ],
    link: "https://www.uwgb.edu/"
  },
  {
    institution: "The College of Idaho",
    location: "Caldwell, Idaho",
    degree: "Undergraduate, Computer Science",
    period: "2023 - 2024",
    details: [
      "GPA: 4.0/4.0",
      "Dean's List (High Honors)",
      "Campus Service Award Recipient (Dedicated Service & IT Support)"
    ],
    link: "https://www.collegeofidaho.edu/"
  },
  {
    institution: "St. Xavier's College, Maitighar",
    location: "Kathmandu, Nepal",
    degree: "High School, Computer Science",
    period: "2020 - 2022",
    details: [
      "GPA: 3.75/4.0",
      "Secretary of Universal Solidarity Movement Club (2021-2022)",
      "Active Volunteer Teacher of Partnership in Education (PiE) program"
    ],
    link: "https://www.sxc.edu.np/"
  },
  {
    institution: "Shree Shanti Varsha Boarding School",
    location: "Damauli, Tanahun, Nepal",
    degree: "Secondary Level Education",
    period: "2014 - 2020",
    details: [
      "GPA: 4.0/4.0 in Secondary Education Examinations",
      "Recipient of Dr. Prakash Dev Award and Laxmi Award for Academic Excellence"
    ],
    link: "#"
  }
];

export const skills = {
  languages: [
    { name: "Python", level: "95%" },
    { name: "SQL", level: "90%" },
    { name: "JavaScript", level: "90%" },
    { name: "Java", level: "85%" },
    { name: "HTML/CSS", level: "95%" },
    { name: "Dart", level: "80%" },
    { name: "R", level: "70%" }
  ],
  frameworksTools: [
    "React", "Flask", "Angular", "Flutter", "Node.js", "TailwindCSS", "Firebase", "Docker", "Material Design", "GCP (Google Cloud Platform)", "Git/GitHub", "Azure OpenAI"
  ],
  concepts: [
    "OOP", "Web Services", "RESTful APIs", "Data Structures & Algorithms", "Multi-threading", "CI/CD", "Agile/Scrum", "Data Pipelines"
  ],
  softSkills: [
    "Critical Thinking", "Project Management", "Communication", "Problem Solving", "Team Collaboration"
  ]
};

export const experience = [
  {
    role: "Data Engineering Intern",
    company: "Faith Technologies Incorporated",
    location: "Appleton, WI",
    period: "June 2026 - Present",
    details: [
      "Engineered and optimized data pipelines within Google Cloud Platform (GCP) using SQL and Python to support parametric estimation projects.",
      "Executed comprehensive data quality assessments and conducted Margin and Excellerate Labor analyses, regularly synthesizing and presenting actionable technical insights to key stakeholders.",
      "Designed interface mockups for a Data & Analytics KPI Dashboard using Figma and contributed to the development of enterprise AI solutions, including automated safety bots.",
      "Managed project workflows and coordinated cross-functional development efforts by strictly adhering to Agile/Scrum methodologies."
    ],
    tags: ["GCP", "SQL", "Python", "Figma", "AI Solutions", "Agile/Scrum"],
    icon: "fas fa-database"
  },
  {
    role: "IT Intern",
    company: "Alive & Kickin' Pizza Crust",
    location: "Green Bay, WI",
    period: "Jan. 2025 - Aug. 2025",
    details: [
      "Redesigned vendor-facing web portals using React, Python/Flask, and Plotly to display real-time bulk ingredient inventory levels, improving supply chain visibility by 25% and reducing manual data entry errors.",
      "Developed Python automation scripts and AI agents to streamline IT Help Desk tasks, including email parsing, automated ticket logging, and smart responses to employee requests, reducing manual workload by 40%.",
      "Conducted regular on-site visits across multiple locations to ensure smooth system operations, troubleshoot technical issues, and maintain continuous workflow efficiency."
    ],
    tags: ["React", "Python", "Flask", "Plotly", "AI Agents", "Automation"],
    icon: "fas fa-laptop-code"
  },
  {
    role: "IT Assistant",
    company: "The College of Idaho",
    location: "Caldwell, Idaho",
    period: "Jan. 2024 - May 2024",
    details: [
      "Collaborated with IT security specialists to identify and mitigate network vulnerabilities, implement anti-spam filtering rules, and improve endpoint security for 500+ users.",
      "Configured and maintained two-factor authentication for faculty and student email accounts, troubleshooting login issues, password resets, and application access to ensure reliable system availability."
    ],
    tags: ["Network Security", "Anti-Spam", "MFA", "Endpoint Security"],
    icon: "fas fa-shield-alt"
  }
];

export const projects = {
  webapps: [
    {
      title: "FedHemo: Privacy-Preserving Hemoglobin Prediction",
      description: "Architected a privacy-preserving synthetic data pipeline using a Federated CTAB-GAN+ framework to generate high-fidelity, demographically balanced clinical data, effectively reducing distributional divergence by 55% without exposing raw patient records. Benchmarked advanced gradient-boosted machine learning models (XGBoost, CatBoost) and engineered a SHAP-driven visual analytics dashboard.",
      image: "./Resources/Images/Projects/fedhemo.png",
      tags: ["CTAB-GAN+", "Federated Learning", "XGBoost", "CatBoost", "SHAP", "Python"],
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      title: "XChange – AI-Powered Social Finance Platform",
      description: "Built an AI-driven social finance platform that transforms real-time market chatter into actionable sentiment insights by integrating Grok AI, X/Twitter APIs, and a scalable WebSocket-powered React frontend. Developed a robust paper-trading backend with portfolio tracking, order execution logic, and secure data storage.",
      image: "./Resources/Images/Projects/xchange.png",
      tags: ["React", "WebSockets", "Grok API", "X API", "Real-Time Data"],
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      title: "Connect Well Nepal Telehealth App",
      description: "Developing a cross-platform telehealth application (Android & Web) to bridge healthcare gaps in Nepal by connecting patients with providers via video, voice, and chat. Implemented a modern UI using Material Design, secure authentication, appointment booking skeleton, and a scalable codebase using Flutter and Firebase.",
      image: "./Resources/Images/Projects/connect_well_nepal.png",
      tags: ["Flutter", "Dart", "Firebase", "Material Design", "Telehealth"],
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      title: "PLC Monitoring System",
      description: "Built and deployed a Flask web application for real-time PLC monitoring, integrating ControlLogix & SLC500 systems via pylogix/pycomm3, enabling data collection with 99.9% accuracy. Designed a multi-threaded Python backend with interactive data visualization, reducing equipment downtime analysis time by 40%.",
      image: "./Resources/Images/Projects/plc-monitoring-system.png",
      tags: ["Python", "Flask", "HTML/CSS", "JavaScript", "pylogix", "pycomm3"],
      links: {
        live: "https://silolevels.akcrust.com/",
        github: "#"
      }
    },
    {
      title: "SecAPI Vault CLI",
      description: "Built 'SecAPI,' a secure Python-based CLI tool for encrypting and managing API keys locally, using AES encryption and a custom vault system to support automated, secret-free deployments. Integrated an AI agent powered by Azure OpenAI, enabling natural language interaction with the secure vault.",
      image: "./Resources/Images/Projects/secapi.png",
      tags: ["Python", "AES Encryption", "CLI", "Azure OpenAI", "Security"],
      links: {
        live: "#",
        github: "#"
      }
    }
  ],
  graphics: [
    { title: "Logo Design", subtitle: "Brand Identity", image: "./Resources/Images/Projects/Graphics/project-1.png" },
    { title: "Poster Design", subtitle: "Event Promotion", image: "./Resources/Images/Projects/Graphics/project-2.png" },
    { title: "Admission Campaign Poster", subtitle: "Marketing Campaign", image: "./Resources/Images/Projects/Graphics/poster-3.png" },
    { title: "Festival Poster", subtitle: "Festival Celebration", image: "./Resources/Images/Projects/Graphics/project-4.png" },
    { title: "Certificate Design", subtitle: "Award Certificate", image: "./Resources/Images/Projects/Graphics/certificate-1.png" }
  ],
  art: [
    { title: "Portrait Sketch", subtitle: "Pencil Art", image: "./Resources/Images/Projects/Arts/art-1.jpg" },
    { title: "Watercolor Landscape", subtitle: "Traditional Art", image: "./Resources/Images/Projects/Arts/art-2.jpg" },
    { title: "Digital Art", subtitle: "Digital Illustration", image: "./Resources/Images/Projects/Arts/art-3.jpg" },
    { title: "Landscape Painting", subtitle: "Oil on Canvas", image: "./Resources/Images/Projects/Arts/art-4.png" },
    { title: "Architectural Sketch", subtitle: "Technical Drawing", image: "./Resources/Images/Projects/Arts/art-5.png" }
  ]
};

export const videos = [
  {
    title: "Language Translator Demo",
    description: "A walkthrough of my language translation application showing key features and functionality.",
    url: "https://www.youtube.com/embed/Ezjd3myC9ZA",
    watchUrl: "https://www.youtube.com/watch?v=Ezjd3myC9ZA",
    date: "Jun 15, 2023"
  },
  {
    title: "Climate Change",
    description: "This project delves into the critical issue of climate change and its effects on the Nepalese landscape and its people.",
    url: "https://www.youtube.com/embed/59qX-nbr_sg?si=lR5puzxxloOpP9__",
    watchUrl: "https://www.youtube.com/watch?v=59qX-nbr_sg",
    date: "Apr 22, 2023"
  },
  {
    title: "I-FIT Challenge",
    description: "An idea of First-ever Child Bank in Nepal. This project won the I-FIT Challenge organized by Iowa State University.",
    url: "https://www.youtube.com/embed/Ho4NSggbu6E?si=sYD8C1WGVKAzEm9k",
    watchUrl: "https://www.youtube.com/watch?v=Ho4NSggbu6E",
    date: "Aug 6, 2022"
  }
];

export const leadership = [
  {
    role: "Project Mentor",
    organization: "Uunchai Summer Cohort 2026",
    location: "Remote",
    period: "June 2026 - Present",
    details: [
      "Directed a 6-week Agile mentorship program, leading a 6-member team to engineer a Progressive Web Application (PWA) that mitigates agricultural supply chain inefficiencies in Nepal.",
      "Architected a resilient Node.js and PostgreSQL backend featuring offline data synchronization via IndexedDB and secured digital payments through an eSewa HMAC-SHA256 cryptographic handshake."
    ],
    icon: "fas fa-seedling",
    link: "https://uunchai.org"
  },
  {
    role: "Founder & President",
    organization: "Google Developer Groups (GDG) on Campus - UWGB",
    location: "Green Bay, WI",
    period: "Nov. 2025 - Present",
    details: [
      "Founded the first GDG chapter at UWGB by drafting the governing constitution, securing official university approval, and directing a core executive board to lead campus-wide technology programs.",
      "Directed the planning of technical workshops and major campus events, including spearheading the upcoming HackGB hackathon, and represented the university at the Google I/O and North America GDG Summit to connect students with industry-standard AI and cloud computing practices."
    ],
    icon: "fab fa-google",
    link: "https://gdg.uwgb.edu",
    hackgb: "https://hackgb.com"
  },
  {
    role: "Vice President",
    organization: "College of Idaho Coding Club",
    location: "Caldwell, ID",
    period: "Dec. 2023 - May 2024",
    details: [
      "Organized Coding Treasure Hunt, Web Development workshops, and Resume Workshops for the student body, helping peers solve complex technical problems and build practical website building skills.",
      "Hosted weekly coding nights to solve challenging programming questions, helping students prepare for technical interviews and enhancing their problem-solving abilities."
    ],
    icon: "fas fa-code"
  },
  {
    role: "Founder & Vice-President",
    organization: "Nepalese Students’ Association (NSA)",
    location: "Caldwell, ID",
    period: "Oct. 2023 - May 2024",
    details: [
      "Founded the association and organized major cultural events (Dashain, Tihar, Nowruz), managing promotion across social media platforms to increase community engagement.",
      "Managed the club’s social media presence, designing posters and banners to effectively promote events and activities."
    ],
    icon: "fas fa-users"
  }
];

export const awards = [
  {
    title: "Sherry Anklam Memorial Award (2026)",
    description: "Awarded a $1,000 grant from the NEW AITP SAMA Committee for outstanding coursework and leadership.",
    icon: "fas fa-award"
  },
  {
    title: "HackPrinceton Winner (2024)",
    description: "Won 2nd Place for Most Impactful Use of X API (Top 12 out of 194 projects).",
    icon: "fas fa-trophy"
  },
  {
    title: "I-Fit Challenge (2022) Winner",
    description: "Secured $500 Grant at Iowa State University (Best 6 among 72 teams).",
    icon: "fas fa-medal"
  },
  {
    title: "National Young Scientists’ Summit (2021)",
    description: "1st Runner-up in Environmental Science Category.",
    icon: "fas fa-globe"
  },
  {
    title: "Dean’s List (High Honors)",
    description: "Achieved High Honors across 5 consecutive semesters at UW-Green Bay and The College of Idaho.",
    icon: "fas fa-scroll"
  },
  {
    title: "Campus Service Award (2024)",
    description: "Recognized for dedicated service and IT support at The College of Idaho.",
    icon: "fas fa-hands-helping"
  },
  {
    title: "Academic Excellence Awards",
    description: "Recipient of Dr. Prakash Dev Award and Laxmi Award for achieving 4.0/4.0 GPA in National Secondary Education Examinations.",
    icon: "fas fa-graduation-cap"
  }
];
