'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job_listings';

const jobs = [
  {
    title: 'Senior React Developer',
    company: 'TechNova Solutions',
    location: 'San Francisco',
    type: 'Full-time',
    experience: 'Senior',
    salary: 145000,
    skills: ['React', 'TypeScript', 'GraphQL', 'Redux', 'Webpack'],
    description:
      'Build and maintain complex React applications for enterprise clients. Work with a distributed team using modern CI/CD pipelines, TypeScript, and GraphQL. Requires 5+ years of frontend experience and strong knowledge of state management patterns.',
    applyUrl: 'https://technova.example.com/jobs/senior-react',
    createdAt: new Date('2026-04-14'),
  },
  {
    title: 'Backend Engineer',
    company: 'DataStream Inc.',
    location: 'New York',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: 135000,
    skills: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'gRPC'],
    description:
      'Design and implement scalable microservices using Node.js and Go. Manage PostgreSQL and Redis data stores, build RESTful and gRPC APIs, and ensure 99.99% uptime for mission-critical financial data pipelines.',
    applyUrl: 'https://datastream.example.com/careers',
    createdAt: new Date('2026-04-13'),
  },
  {
    title: 'UI/UX Designer',
    company: 'CreativeMinds Agency',
    location: 'Los Angeles',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: 105000,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
    description:
      'Create user-centered designs for web and mobile applications. Conduct user research, build interactive prototypes in Figma, and collaborate closely with engineering teams to ship pixel-perfect interfaces.',
    applyUrl: 'https://creativeminds.example.com/jobs',
    createdAt: new Date('2026-04-12'),
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudPeak Technologies',
    location: 'Seattle',
    type: 'Full-time',
    experience: 'Senior',
    salary: 140000,
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Prometheus', 'CI/CD'],
    description:
      'Architect and manage Kubernetes clusters on AWS and GCP. Implement infrastructure-as-code with Terraform, configure monitoring stacks (Prometheus, Grafana), and maintain CI/CD pipelines for 50+ microservices.',
    applyUrl: 'https://cloudpeak.example.com/careers',
    createdAt: new Date('2026-04-11'),
  },
  {
    title: 'Mobile App Developer',
    company: 'AppForge Labs',
    location: 'Austin',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: 120000,
    skills: ['React Native', 'iOS', 'Android', 'Firebase', 'GraphQL'],
    description:
      'Develop cross-platform mobile applications using React Native. Integrate native modules, implement push notifications, offline storage, and performance optimizations for iOS and Android platforms.',
    applyUrl: 'https://appforge.example.com/jobs',
    createdAt: new Date('2026-04-10'),
  },
  {
    title: 'Data Scientist',
    company: 'QuantumLeap Analytics',
    location: 'Boston',
    type: 'Full-time',
    experience: 'Senior',
    salary: 155000,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau'],
    description:
      'Apply machine learning techniques to large-scale datasets for predictive modeling. Build and deploy ML pipelines, create data visualizations, and communicate insights to non-technical stakeholders.',
    applyUrl: 'https://quantumleap.example.com/jobs',
    createdAt: new Date('2026-04-09'),
  },
  {
    title: 'Part-time Content Writer',
    company: 'WordSmith Media',
    location: 'Chicago',
    type: 'Part-time',
    experience: 'Entry-level',
    salary: 35000,
    skills: ['SEO', 'Copywriting', 'B2B Writing', 'WordPress', 'Content Strategy'],
    description:
      'Write SEO-optimized technical blog posts, product descriptions, and marketing copy. 20 hours per week with flexible scheduling. Must have experience writing for B2B SaaS companies.',
    applyUrl: 'https://wordsmith.example.com/apply',
    createdAt: new Date('2026-04-08'),
  },
  {
    title: 'Remote Full Stack Developer',
    company: 'DistributeX',
    location: 'Remote',
    type: 'Remote',
    experience: 'Mid-level',
    salary: 130000,
    skills: ['Next.js', 'Node.js', 'PostgreSQL', 'React', 'Docker'],
    description:
      'Work from anywhere as a full stack developer on our SaaS platform. Build features end-to-end using Next.js, Node.js, and PostgreSQL. Strong async communication skills required.',
    applyUrl: 'https://distributex.example.com/careers',
    createdAt: new Date('2026-04-07'),
  },
  {
    title: 'QA Automation Engineer',
    company: 'BugZero Systems',
    location: 'Denver',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: 110000,
    skills: ['Cypress', 'Playwright', 'Jest', 'CI/CD', 'API Testing'],
    description:
      'Design and implement automated test suites using Cypress, Playwright, and Jest. Build CI-integrated testing pipelines, perform load testing, and ensure quality across web and API layers.',
    applyUrl: 'https://bugzero.example.com/jobs',
    createdAt: new Date('2026-04-06'),
  },
  {
    title: 'Remote Product Manager',
    company: 'InnovateCo',
    location: 'Remote',
    type: 'Remote',
    experience: 'Senior',
    salary: 140000,
    skills: ['Product Strategy', 'Roadmapping', 'Agile', 'Analytics', 'Stakeholder Management'],
    description:
      'Lead product strategy for a B2B SaaS platform. Define roadmaps, prioritize features using data-driven methods, and work cross-functionally with engineering, design, and sales teams.',
    applyUrl: 'https://innovateco.example.com/careers',
    createdAt: new Date('2026-04-05'),
  },
  {
    title: 'Cybersecurity Analyst',
    company: 'ShieldNet Corp',
    location: 'Washington DC',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: 125000,
    skills: ['SIEM', 'Vulnerability Assessment', 'NIST', 'Incident Response', 'Splunk'],
    description:
      'Monitor and defend enterprise networks from cyber threats. Conduct vulnerability assessments, implement SIEM solutions, and respond to security incidents following NIST framework guidelines.',
    applyUrl: 'https://shieldnet.example.com/apply',
    createdAt: new Date('2026-04-04'),
  },
  {
    title: 'Part-time Graphic Designer',
    company: 'PixelPerfect Studio',
    location: 'Portland',
    type: 'Part-time',
    experience: 'Entry-level',
    salary: 40000,
    skills: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Branding', 'Typography'],
    description:
      'Create visual assets for social media, print materials, and digital campaigns. Proficiency in Adobe Creative Suite required. 25 hours per week with opportunity for full-time conversion.',
    applyUrl: 'https://pixelperfect.example.com/jobs',
    createdAt: new Date('2026-04-03'),
  },
  {
    title: 'Machine Learning Engineer',
    company: 'NeuralPath AI',
    location: 'San Francisco',
    type: 'Full-time',
    experience: 'Senior',
    salary: 170000,
    skills: ['Python', 'TensorFlow', 'Kubernetes', 'MLOps', 'PyTorch'],
    description:
      'Build production ML systems for natural language processing and computer vision. Deploy models using TensorFlow Serving and Kubernetes, optimize inference latency, and monitor model drift.',
    applyUrl: 'https://neuralpath.example.com/careers',
    createdAt: new Date('2026-04-02'),
  },
  {
    title: 'Remote Technical Writer',
    company: 'DocuTech Solutions',
    location: 'Remote',
    type: 'Remote',
    experience: 'Entry-level',
    salary: 85000,
    skills: ['Markdown', 'Git', 'API Documentation', 'Technical Writing', 'Docs-as-Code'],
    description:
      'Write and maintain API documentation, developer guides, and knowledge base articles for a cloud infrastructure platform. Experience with docs-as-code workflows (Markdown, Git) required.',
    applyUrl: 'https://docutech.example.com/jobs',
    createdAt: new Date('2026-04-01'),
  },
  {
    title: 'Frontend Developer',
    company: 'WebCraft Studios',
    location: 'Miami',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: 115000,
    skills: ['Vue.js', 'Nuxt', 'CSS', 'Accessibility', 'Web Performance'],
    description:
      'Build responsive, accessible web applications using Vue.js and Nuxt. Implement design systems, optimize Core Web Vitals, and ensure WCAG 2.1 AA compliance across all interfaces.',
    applyUrl: 'https://webcraft.example.com/careers',
    createdAt: new Date('2026-03-31'),
  },
  {
    title: 'Cloud Solutions Architect',
    company: 'SkyVault Technologies',
    location: 'Seattle',
    type: 'Full-time',
    experience: 'Lead',
    salary: 175000,
    skills: ['AWS', 'Azure', 'Terraform', 'Cloud Architecture', 'Migration'],
    description:
      'Design multi-region cloud architectures on AWS and Azure. Lead migration projects, establish governance policies, and mentor engineering teams on cloud-native design patterns.',
    applyUrl: 'https://skyvault.example.com/apply',
    createdAt: new Date('2026-03-29'),
  },
  {
    title: 'Remote Customer Support Engineer',
    company: 'HelpDeskPro',
    location: 'Remote',
    type: 'Remote',
    experience: 'Entry-level',
    salary: 72000,
    skills: ['API Debugging', 'Troubleshooting', 'Zendesk', 'SQL', 'Technical Support'],
    description:
      'Provide technical support for a developer tools platform. Troubleshoot API integration issues, reproduce bugs, and escalate complex cases to engineering. Shift coverage across US time zones.',
    applyUrl: 'https://helpdeskpro.example.com/jobs',
    createdAt: new Date('2026-03-28'),
  },
  {
    title: 'Database Administrator',
    company: 'CoreData Systems',
    location: 'Atlanta',
    type: 'Full-time',
    experience: 'Senior',
    salary: 128000,
    skills: ['PostgreSQL', 'MongoDB', 'Query Optimization', 'Replication', 'Backup'],
    description:
      'Manage and optimize PostgreSQL and MongoDB clusters. Implement backup strategies, tune query performance, set up replication, and ensure data integrity for healthcare compliance.',
    applyUrl: 'https://coredata.example.com/careers',
    createdAt: new Date('2026-03-27'),
  },
  {
    title: 'Part-time Social Media Manager',
    company: 'BuzzReach Marketing',
    location: 'New York',
    type: 'Part-time',
    experience: 'Entry-level',
    salary: 38000,
    skills: ['Social Media', 'Content Creation', 'Analytics', 'Copywriting', 'Campaign Management'],
    description:
      'Manage social media presence across Instagram, LinkedIn, and Twitter. Create content calendars, write engaging posts, analyze campaign metrics, and grow follower engagement.',
    applyUrl: 'https://buzzreach.example.com/jobs',
    createdAt: new Date('2026-03-26'),
  },
  {
    title: 'Blockchain Developer',
    company: 'ChainForge Labs',
    location: 'San Francisco',
    type: 'Full-time',
    experience: 'Senior',
    salary: 165000,
    skills: ['Solidity', 'Rust', 'Ethereum', 'Solana', 'Web3'],
    description:
      'Develop smart contracts in Solidity and Rust. Build decentralized applications on Ethereum and Solana, conduct security audits, and integrate Web3 wallets into consumer-facing products.',
    applyUrl: 'https://chainforge.example.com/apply',
    createdAt: new Date('2026-03-25'),
  },
  {
    title: 'Remote Scrum Master',
    company: 'AgileWorks Consulting',
    location: 'Remote',
    type: 'Remote',
    experience: 'Mid-level',
    salary: 110000,
    skills: ['Scrum', 'Agile Coaching', 'Jira', 'Retrospectives', 'Sprint Planning'],
    description:
      'Facilitate Scrum ceremonies for three cross-functional engineering teams. Coach teams on agile best practices, remove impediments, and track velocity metrics across sprints.',
    applyUrl: 'https://agileworks.example.com/careers',
    createdAt: new Date('2026-03-24'),
  },
  {
    title: 'Systems Engineer',
    company: 'InfraCore Solutions',
    location: 'Phoenix',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: 118000,
    skills: ['Linux', 'Ansible', 'Networking', 'Shell Scripting', 'High Availability'],
    description:
      'Design and maintain Linux-based server infrastructure. Automate provisioning with Ansible, manage network configurations, and ensure high availability for 24/7 production workloads.',
    applyUrl: 'https://infracore.example.com/jobs',
    createdAt: new Date('2026-03-23'),
  },
  {
    title: 'iOS Developer',
    company: 'SwiftApps Inc.',
    location: 'Cupertino',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: 150000,
    skills: ['Swift', 'SwiftUI', 'CoreData', 'HealthKit', 'App Store'],
    description:
      'Build native iOS applications using Swift and SwiftUI. Implement CoreData persistence, integrate HealthKit APIs, optimize app performance, and ship updates through TestFlight and App Store.',
    applyUrl: 'https://swiftapps.example.com/careers',
    createdAt: new Date('2026-03-21'),
  },
  {
    title: 'Remote Data Analyst',
    company: 'InsightFlow Analytics',
    location: 'Remote',
    type: 'Remote',
    experience: 'Entry-level',
    salary: 90000,
    skills: ['SQL', 'Python', 'Tableau', 'Data Visualization', 'Reporting'],
    description:
      'Analyze business data using SQL, Python, and Tableau. Build dashboards, automate reporting pipelines, and deliver actionable insights to product and marketing teams.',
    applyUrl: 'https://insightflow.example.com/apply',
    createdAt: new Date('2026-03-20'),
  },
  {
    title: 'Technical Lead',
    company: 'ScaleUp Ventures',
    location: 'New York',
    type: 'Full-time',
    experience: 'Lead',
    salary: 180000,
    skills: ['System Design', 'Code Review', 'Fintech', 'Node.js', 'Team Leadership'],
    description:
      'Lead a team of 8 engineers building a fintech platform. Set architectural direction, conduct code reviews, manage technical debt, and collaborate with product on sprint planning.',
    applyUrl: 'https://scaleup.example.com/careers',
    createdAt: new Date('2026-03-19'),
  },
  {
    title: 'Part-time Customer Success Manager',
    company: 'SaaSGrowth Partners',
    location: 'Chicago',
    type: 'Part-time',
    experience: 'Mid-level',
    salary: 45000,
    skills: ['Account Management', 'SaaS', 'CRM', 'Upselling', 'Churn Reduction'],
    description:
      'Manage a portfolio of 30 enterprise accounts. Conduct quarterly business reviews, identify upsell opportunities, monitor health scores, and reduce churn through proactive outreach.',
    applyUrl: 'https://saasgrowth.example.com/jobs',
    createdAt: new Date('2026-03-18'),
  },
  {
    title: 'Embedded Systems Engineer',
    company: 'MicroDrive Robotics',
    location: 'Detroit',
    type: 'Full-time',
    experience: 'Senior',
    salary: 132000,
    skills: ['C', 'C++', 'ARM', 'RTOS', 'Sensor Fusion'],
    description:
      'Develop firmware for ARM Cortex-M microcontrollers in C/C++. Design real-time control systems, debug hardware interfaces (SPI, I2C, UART), and integrate sensor fusion algorithms.',
    applyUrl: 'https://microdrive.example.com/careers',
    createdAt: new Date('2026-03-17'),
  },
  {
    title: 'Remote UX Researcher',
    company: 'UserFirst Design',
    location: 'Remote',
    type: 'Remote',
    experience: 'Mid-level',
    salary: 95000,
    skills: ['User Research', 'Usability Testing', 'Interviews', 'Synthesis', 'Figma'],
    description:
      'Plan and conduct user research studies including interviews, surveys, and usability tests. Synthesize findings into actionable recommendations and present to stakeholders.',
    applyUrl: 'https://userfirst.example.com/apply',
    createdAt: new Date('2026-03-16'),
  },
  {
    title: 'Junior Frontend Developer',
    company: 'LaunchPad Digital',
    location: 'Austin',
    type: 'Full-time',
    experience: 'Entry-level',
    salary: 78000,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    description:
      'Join a fast-growing startup as a junior frontend developer. Work on consumer-facing React applications, collaborate with designers, and ship features weekly in an agile environment.',
    applyUrl: 'https://launchpad.example.com/jobs',
    createdAt: new Date('2026-03-15'),
  },
  {
    title: 'Staff Software Engineer',
    company: 'Meridian Corp',
    location: 'San Francisco',
    type: 'Full-time',
    experience: 'Lead',
    salary: 195000,
    skills: ['System Design', 'Java', 'Kafka', 'Distributed Systems', 'Mentorship'],
    description:
      'Drive technical strategy across multiple teams. Lead design reviews, define cross-cutting architecture standards, and mentor senior engineers on distributed system design.',
    applyUrl: 'https://meridiancorp.example.com/careers',
    createdAt: new Date('2026-03-14'),
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    const inserted = await Job.insertMany(jobs);
    console.log(`Seeded ${inserted.length} jobs`);

    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
