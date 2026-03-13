"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Target,
  Briefcase,
  Users,
  BookOpen,
  BarChart2,
  Bell,
  Search,
  Plus,
  X,
  Menu,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

const STAGES = ["Lead Captured", "Qualified", "Call Booked", "Call Done", "Proposal", "Won", "Lost"];
const API_ENDPOINTS = {
  crmLeads: "/api/crm/leads",
};

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString()}`;
}

function badgeTone(status) {
  const s = String(status || "").toLowerCase();
  if (s.includes("active") || s.includes("won") || s.includes("healthy") || s.includes("completed") || s.includes("on track")) {
    return "badge-success";
  }
  if (s.includes("risk") || s.includes("review") || s.includes("warning") || s.includes("pending")) {
    return "badge-warning";
  }
  if (s.includes("delayed") || s.includes("lost") || s.includes("blocked")) {
    return "badge-danger";
  }
  return "badge-info";
}

function sourceTone(source) {
  const s = String(source || "").toLowerCase();
  if (s.includes("referral")) return "src-green";
  if (s.includes("linkedin")) return "src-blue";
  if (s.includes("meta")) return "src-purple";
  if (s.includes("google")) return "src-yellow";
  return "src-gray";
}

function normalizeLead(rawLead) {
  return {
    id: rawLead.id || Date.now(),
    company: rawLead.company || "Unknown Company",
    value: Number(rawLead.value || 0),
    rep: rawLead.rep || "AL",
    source: rawLead.source || "LinkedIn",
    stage: rawLead.stage || "Lead Captured",
    daysInStage: Number(rawLead.daysInStage || 0),
    contact: rawLead.contact || "",
    email: rawLead.email || "",
    phone: rawLead.phone || "",
    industry: rawLead.industry || "",
    website: rawLead.website || "",
    notes: rawLead.notes || "",
  };
}

export default function SmileyOSPage() {
  const [activeModule, setActiveModule] = useState("Command Center");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [notificationCount] = useState(5);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [syncMessage, setSyncMessage] = useState("Checking API connection...");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);

  const navItems = [
    { label: "Command Center", icon: LayoutDashboard },
    { label: "Acquisition & CRM", icon: Target },
    { label: "Client Delivery", icon: Briefcase },
    { label: "Freelancers", icon: Users },
    { label: "SOP Knowledge Base", icon: BookOpen },
    { label: "Financials", icon: BarChart2 },
  ];

  const [revenueTrend] = useState([
    { month: "Jan", revenue: 52200 },
    { month: "Feb", revenue: 61800 },
    { month: "Mar", revenue: 70400 },
    { month: "Apr", revenue: 73200 },
    { month: "May", revenue: 79100 },
    { month: "Jun", revenue: 84200 },
  ]);

  const [pipelineStages] = useState([
    { stage: "Lead", count: 18 },
    { stage: "Qualified", count: 14 },
    { stage: "Booked", count: 10 },
    { stage: "Done", count: 8 },
    { stage: "Proposal", count: 6 },
    { stage: "Won", count: 4 },
    { stage: "Lost", count: 3 },
  ]);

  const [alerts] = useState([
    { type: "danger", text: "Project ACME delayed 3 days" },
    { type: "warning", text: "Freelancer capacity at 90%" },
    { type: "info", text: "3 new leads in pipeline" },
  ]);

  const [activeClients] = useState([
    { name: "Acme Corp", owner: "AL", status: "Active", mrr: 18500, health: "Healthy" },
    { name: "Bolt Digital", owner: "MR", status: "At Risk", mrr: 12400, health: "At Risk" },
    { name: "Nexus Media", owner: "KC", status: "Active", mrr: 9800, health: "Healthy" },
    { name: "Vertex Labs", owner: "SJ", status: "Delayed", mrr: 15300, health: "Delayed" },
  ]);

  const [crmLeads, setCrmLeads] = useState([
    {
      id: 1,
      company: "Acme Corp",
      value: 42000,
      rep: "AL",
      source: "LinkedIn",
      stage: "Proposal",
      daysInStage: 4,
      contact: "Emma Stone",
      email: "emma@acme.com",
      phone: "+1 332 912 0012",
      industry: "SaaS",
      website: "https://acme.com",
      notes: "Fast buyer, procurement review in progress.",
    },
    {
      id: 2,
      company: "Bolt Digital",
      value: 28000,
      rep: "MR",
      source: "Meta Ads",
      stage: "Call Done",
      daysInStage: 2,
      contact: "Ryan Cole",
      email: "ryan@bolt.digital",
      phone: "+1 774 210 4455",
      industry: "Agency",
      website: "https://bolt.digital",
      notes: "Needs onboarding revamp and CAC reduction.",
    },
    {
      id: 3,
      company: "Nexus Media",
      value: 36000,
      rep: "KC",
      source: "Referral",
      stage: "Qualified",
      daysInStage: 3,
      contact: "Noah Price",
      email: "noah@nexusmedia.io",
      phone: "+1 484 091 8891",
      industry: "Media",
      website: "https://nexusmedia.io",
      notes: "Founder-led sales, no CRM automation yet.",
    },
    {
      id: 4,
      company: "Vertex Labs",
      value: 50000,
      rep: "AL",
      source: "Google",
      stage: "Call Booked",
      daysInStage: 1,
      contact: "Lia Morgan",
      email: "lia@vertexlabs.com",
      phone: "+1 901 555 1002",
      industry: "HealthTech",
      website: "https://vertexlabs.com",
      notes: "Call scheduled for Thursday.",
    },
    {
      id: 5,
      company: "Orbit Systems",
      value: 22000,
      rep: "SJ",
      source: "Referral",
      stage: "Lead Captured",
      daysInStage: 1,
      contact: "Jack Rowan",
      email: "jack@orbitsystems.co",
      phone: "+1 201 778 1122",
      industry: "IT Services",
      website: "https://orbitsystems.co",
      notes: "Inbound from partner introduction.",
    },
    {
      id: 6,
      company: "Prime Retail",
      value: 30000,
      rep: "MR",
      source: "Meta Ads",
      stage: "Qualified",
      daysInStage: 6,
      contact: "Sarah Dunn",
      email: "sarah@primeretail.com",
      phone: "+1 611 442 0977",
      industry: "E-Commerce",
      website: "https://primeretail.com",
      notes: "Needs conversion optimization and retention flows.",
    },
    {
      id: 7,
      company: "Horizon Realty",
      value: 26000,
      rep: "KC",
      source: "LinkedIn",
      stage: "Won",
      daysInStage: 0,
      contact: "Chris Yoon",
      email: "chris@horizonrealty.com",
      phone: "+1 433 922 4410",
      industry: "Real Estate",
      website: "https://horizonrealty.com",
      notes: "Signed annual contract.",
    },
    {
      id: 8,
      company: "Blue Peak",
      value: 18000,
      rep: "SJ",
      source: "Google",
      stage: "Lost",
      daysInStage: 0,
      contact: "Nina Ortiz",
      email: "nina@bluepeak.io",
      phone: "+1 204 333 7854",
      industry: "Consulting",
      website: "https://bluepeak.io",
      notes: "Budget mismatch.",
    },
    {
      id: 9,
      company: "Nova Energy",
      value: 41000,
      rep: "AL",
      source: "Referral",
      stage: "Proposal",
      daysInStage: 2,
      contact: "Omar Khan",
      email: "omar@novaenergy.com",
      phone: "+1 919 600 2844",
      industry: "Energy",
      website: "https://novaenergy.com",
      notes: "Proposal shared with finance team.",
    },
    {
      id: 10,
      company: "Pulse Fitness",
      value: 24000,
      rep: "MR",
      source: "Meta Ads",
      stage: "Call Done",
      daysInStage: 5,
      contact: "Anya Wells",
      email: "anya@pulsefitness.com",
      phone: "+1 711 228 6642",
      industry: "Health & Wellness",
      website: "https://pulsefitness.com",
      notes: "Needs patient retention and referral loops.",
    },
    {
      id: 11,
      company: "Gridline AI",
      value: 38000,
      rep: "KC",
      source: "LinkedIn",
      stage: "Qualified",
      daysInStage: 4,
      contact: "Luis Park",
      email: "luis@gridline.ai",
      phone: "+1 290 011 7721",
      industry: "AI SaaS",
      website: "https://gridline.ai",
      notes: "Warm intro from investor network.",
    },
    {
      id: 12,
      company: "Monarch Legal",
      value: 21000,
      rep: "SJ",
      source: "Google",
      stage: "Lead Captured",
      daysInStage: 2,
      contact: "Paula Reed",
      email: "paula@monarchlegal.com",
      phone: "+1 899 221 8092",
      industry: "Legal",
      website: "https://monarchlegal.com",
      notes: "Requested pricing deck.",
    },
    {
      id: 13,
      company: "Crown Foods",
      value: 27000,
      rep: "AL",
      source: "Referral",
      stage: "Won",
      daysInStage: 0,
      contact: "Derek Snow",
      email: "derek@crownfoods.com",
      phone: "+1 833 281 0888",
      industry: "Food",
      website: "https://crownfoods.com",
      notes: "Kickoff next Monday.",
    },
    {
      id: 14,
      company: "Aster Health",
      value: 32000,
      rep: "MR",
      source: "LinkedIn",
      stage: "Call Booked",
      daysInStage: 1,
      contact: "Mia Hale",
      email: "mia@asterhealth.org",
      phone: "+1 322 741 6000",
      industry: "Healthcare",
      website: "https://asterhealth.org",
      notes: "Decision-maker joining call.",
    },
  ]);

  const [crmSearch, setCrmSearch] = useState("");
  const [repFilter, setRepFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    company: "",
    value: "",
    rep: "AL",
    source: "LinkedIn",
    contact: "",
    email: "",
    phone: "",
    industry: "",
    website: "",
    notes: "",
  });

  const [deliveryClients] = useState([
    {
      id: "CL-101",
      name: "Acme Corp",
      services: ["CRM Revamp", "Funnel Ops", "Dashboards"],
      team: ["AL", "MR", "KC"],
      start: "2026-01-08",
      status: "Active",
      progress: 78,
      contract: 86000,
      health: "Healthy",
      stage: 3,
      tasks: [
        { title: "Map lead lifecycle", status: "To Do", priority: "High", deadline: "Mar 22", assignee: "AL" },
        { title: "Build reporting schema", status: "In Progress", priority: "Med", deadline: "Mar 20", assignee: "KC" },
        { title: "Review automation rules", status: "Review", priority: "High", deadline: "Mar 19", assignee: "MR" },
        { title: "Deploy call scripts", status: "Completed", priority: "Low", deadline: "Mar 14", assignee: "AL" },
      ],
    },
    {
      id: "CL-102",
      name: "Bolt Digital",
      services: ["Onboarding", "Retention", "Paid Media"],
      team: ["SJ", "MR"],
      start: "2026-02-03",
      status: "At Risk",
      progress: 52,
      contract: 64000,
      health: "At Risk",
      stage: 2,
      tasks: [
        { title: "Finalize creative tests", status: "To Do", priority: "Med", deadline: "Mar 24", assignee: "MR" },
        { title: "Create onboarding SOP", status: "In Progress", priority: "High", deadline: "Mar 21", assignee: "SJ" },
        { title: "Client review deck", status: "Review", priority: "Med", deadline: "Mar 20", assignee: "SJ" },
        { title: "Audit campaign data", status: "Completed", priority: "Low", deadline: "Mar 12", assignee: "MR" },
      ],
    },
    {
      id: "CL-103",
      name: "Nexus Media",
      services: ["Sales Ops", "Automation"],
      team: ["KC", "AL"],
      start: "2025-12-15",
      status: "Active",
      progress: 87,
      contract: 72000,
      health: "Healthy",
      stage: 4,
      tasks: [
        { title: "Launch lead scoring", status: "In Progress", priority: "High", deadline: "Mar 18", assignee: "KC" },
        { title: "Build weekly KPI board", status: "Review", priority: "Med", deadline: "Mar 20", assignee: "AL" },
        { title: "QA CRM triggers", status: "To Do", priority: "Low", deadline: "Mar 26", assignee: "KC" },
        { title: "Migrate old contacts", status: "Completed", priority: "Med", deadline: "Mar 10", assignee: "AL" },
      ],
    },
    {
      id: "CL-104",
      name: "Vertex Labs",
      services: ["RevOps", "Forecasting"],
      team: ["SJ", "KC", "MR"],
      start: "2026-01-28",
      status: "Delayed",
      progress: 34,
      contract: 58000,
      health: "Delayed",
      stage: 1,
      tasks: [
        { title: "Define pipeline stages", status: "To Do", priority: "High", deadline: "Mar 25", assignee: "SJ" },
        { title: "Forecast model v1", status: "In Progress", priority: "High", deadline: "Mar 23", assignee: "KC" },
        { title: "Sync stakeholder feedback", status: "Review", priority: "Med", deadline: "Mar 19", assignee: "MR" },
        { title: "Initial data import", status: "Completed", priority: "Low", deadline: "Mar 11", assignee: "SJ" },
      ],
    },
  ]);
  const [selectedClientId, setSelectedClientId] = useState("CL-101");

  const [freelancers] = useState([
    {
      id: "FR-1",
      name: "Lena Park",
      initials: "LP",
      specialization: "Funnel Designer",
      rating: 4,
      rate: 95,
      availability: "green",
      activeProjects: 3,
      utilization: 72,
      profile: "8 years in conversion-focused landing pages and offer architecture.",
      projects: ["Acme Corp", "Nexus Media", "Prime Retail"],
      tasks: [
        { title: "Design upsell flow", deadline: "Mar 19" },
        { title: "Refine hero variants", deadline: "Mar 22" },
      ],
      payments: [
        { date: "Mar 01", amount: 2200, status: "Paid" },
        { date: "Feb 15", amount: 1800, status: "Paid" },
      ],
    },
    {
      id: "FR-2",
      name: "Marco Silva",
      initials: "MS",
      specialization: "CRM Engineer",
      rating: 5,
      rate: 110,
      availability: "yellow",
      activeProjects: 4,
      utilization: 89,
      profile: "HubSpot and GoHighLevel specialist focused on automation and handoff systems.",
      projects: ["Bolt Digital", "Vertex Labs", "Aster Health", "Acme Corp"],
      tasks: [
        { title: "Fix webhook retries", deadline: "Mar 18" },
        { title: "Pipeline SLA alerts", deadline: "Mar 21" },
      ],
      payments: [
        { date: "Mar 05", amount: 3400, status: "Paid" },
        { date: "Feb 20", amount: 3200, status: "Paid" },
      ],
    },
    {
      id: "FR-3",
      name: "Nadia Kim",
      initials: "NK",
      specialization: "Paid Media",
      rating: 4,
      rate: 88,
      availability: "green",
      activeProjects: 2,
      utilization: 58,
      profile: "Performance marketer with deep focus on CAC reduction in scaling campaigns.",
      projects: ["Pulse Fitness", "Crown Foods"],
      tasks: [
        { title: "Launch retargeting set", deadline: "Mar 20" },
      ],
      payments: [
        { date: "Mar 02", amount: 1600, status: "Paid" },
        { date: "Feb 11", amount: 1750, status: "Paid" },
      ],
    },
    {
      id: "FR-4",
      name: "Julian Ross",
      initials: "JR",
      specialization: "Automation Ops",
      rating: 5,
      rate: 102,
      availability: "red",
      activeProjects: 5,
      utilization: 95,
      profile: "Builds backend operations and process automation for client delivery teams.",
      projects: ["Nexus Media", "Horizon Realty", "Gridline AI", "Acme Corp", "Monarch Legal"],
      tasks: [
        { title: "Refactor onboarding flow", deadline: "Mar 17" },
        { title: "Error logging SOP", deadline: "Mar 18" },
      ],
      payments: [
        { date: "Mar 06", amount: 3800, status: "Paid" },
        { date: "Feb 19", amount: 3550, status: "Pending" },
      ],
    },
    {
      id: "FR-5",
      name: "Aisha Noor",
      initials: "AN",
      specialization: "Content Systems",
      rating: 4,
      rate: 76,
      availability: "yellow",
      activeProjects: 3,
      utilization: 81,
      profile: "Creates editorial pipelines and conversion-first content production systems.",
      projects: ["Blue Peak", "Aster Health", "Prime Retail"],
      tasks: [
        { title: "Revise nurture emails", deadline: "Mar 23" },
      ],
      payments: [
        { date: "Mar 03", amount: 1450, status: "Paid" },
        { date: "Feb 17", amount: 1500, status: "Paid" },
      ],
    },
    {
      id: "FR-6",
      name: "Theo Grant",
      initials: "TG",
      specialization: "Data Analyst",
      rating: 5,
      rate: 120,
      availability: "green",
      activeProjects: 2,
      utilization: 62,
      profile: "Dashboard design and forecasting analyst for executive-level reporting.",
      projects: ["Vertex Labs", "Nova Energy"],
      tasks: [
        { title: "Margin variance report", deadline: "Mar 21" },
      ],
      payments: [
        { date: "Mar 04", amount: 2100, status: "Paid" },
        { date: "Feb 16", amount: 2100, status: "Paid" },
      ],
    },
  ]);
  const [selectedFreelancerId, setSelectedFreelancerId] = useState("FR-1");

  const [sopCategory, setSopCategory] = useState("All");
  const [sopSearch, setSopSearch] = useState("");
  const [sops] = useState([
    {
      id: "SOP-1",
      title: "Lead Intake and Qualification",
      category: "Sales",
      updated: "2026-03-07",
      objective: "Ensure every inbound lead is enriched and scored within 24 hours.",
      tools: ["HubSpot", "Apollo", "Slack"],
      steps: [
        "Capture lead into CRM with source and campaign metadata.",
        "Enrich company details and assign account tier.",
        "Apply scoring model and set initial owner.",
        "Trigger qualification checklist and notify rep channel.",
      ],
      outcome: "Only validated opportunities progress to booked calls, reducing wasted sales time.",
    },
    {
      id: "SOP-2",
      title: "Client Onboarding Kickoff",
      category: "Onboarding",
      updated: "2026-03-04",
      objective: "Create a smooth week-1 setup with zero handoff confusion.",
      tools: ["Notion", "Slack", "Google Meet"],
      steps: [
        "Schedule kickoff with decision-makers and execution team.",
        "Collect system access and baseline metrics.",
        "Publish implementation timeline and owners.",
        "Confirm communication cadence and success metrics.",
      ],
      outcome: "Clients understand scope, timeline, and responsibilities from day one.",
    },
    {
      id: "SOP-3",
      title: "Weekly Delivery Scorecard",
      category: "Delivery",
      updated: "2026-02-27",
      objective: "Monitor execution quality and unblock delays before they affect outcomes.",
      tools: ["ClickUp", "Looker Studio", "Slack"],
      steps: [
        "Pull weekly task completion and timeline adherence.",
        "Review KPI movement against target ranges.",
        "Flag blockers and assign owners within same meeting.",
        "Share summary to client channel with next actions.",
      ],
      outcome: "Delivery speed and accountability stay visible and measurable.",
    },
    {
      id: "SOP-4",
      title: "Freelancer Assignment Rules",
      category: "Freelancer",
      updated: "2026-03-01",
      objective: "Match work to freelancer skill and availability while protecting margins.",
      tools: ["Airtable", "Slack"],
      steps: [
        "Validate required skill, estimated hours, and urgency.",
        "Check utilization dashboard for available talent.",
        "Issue assignment brief with acceptance window.",
        "Track completion and update scorecard ratings.",
      ],
      outcome: "Higher output quality with balanced team capacity.",
    },
    {
      id: "SOP-5",
      title: "Monthly Ops Review",
      category: "Ops",
      updated: "2026-02-20",
      objective: "Review performance, expenses, and delivery efficiency monthly.",
      tools: ["Sheets", "Looker Studio", "Notion"],
      steps: [
        "Aggregate financial and delivery metrics.",
        "Highlight variance vs plan.",
        "Create corrective actions with owners and deadlines.",
        "Publish leadership memo with priorities.",
      ],
      outcome: "Leadership has a single source of truth for strategic decisions.",
    },
    {
      id: "SOP-6",
      title: "Automation QA Checklist",
      category: "Automation",
      updated: "2026-03-08",
      objective: "Prevent broken workflows and silent failures in client automations.",
      tools: ["Zapier", "Make", "Sentry"],
      steps: [
        "Run trigger and action test matrix in sandbox.",
        "Verify fallback logic and retry behavior.",
        "Enable logs and alert routing.",
        "Sign off deployment with rollback plan.",
      ],
      outcome: "Stable automation systems with clear observability.",
    },
  ]);
  const [selectedSopId, setSelectedSopId] = useState("SOP-1");

  const [financeRevenueCards] = useState([
    { label: "Monthly Revenue", value: 84200, delta: "+12.8%" },
    { label: "Quarterly Revenue", value: 243600, delta: "+18.4%" },
    { label: "Annual Run Rate", value: 1010400, delta: "+22.1%" },
  ]);

  const [line12Months] = useState([
    { month: "Jan", value: 52000 },
    { month: "Feb", value: 56000 },
    { month: "Mar", value: 59000 },
    { month: "Apr", value: 62000 },
    { month: "May", value: 65000 },
    { month: "Jun", value: 68800 },
    { month: "Jul", value: 71000 },
    { month: "Aug", value: 73400 },
    { month: "Sep", value: 76000 },
    { month: "Oct", value: 79200 },
    { month: "Nov", value: 82100 },
    { month: "Dec", value: 84200 },
  ]);

  const [profitability] = useState([
    { client: "Acme Corp", contract: 86000, freelancerCost: 24000, opCost: 9000, margin: 61, status: "Healthy" },
    { client: "Bolt Digital", contract: 64000, freelancerCost: 23000, opCost: 12000, margin: 45, status: "At Risk" },
    { client: "Nexus Media", contract: 72000, freelancerCost: 21000, opCost: 9500, margin: 58, status: "Healthy" },
    { client: "Vertex Labs", contract: 58000, freelancerCost: 22000, opCost: 14000, margin: 38, status: "Delayed" },
  ]);

  const [performanceKpis] = useState([
    { label: "Avg Client Value", value: "$7,016" },
    { label: "LTV", value: "$54,200" },
    { label: "CAC", value: "$2,140" },
    { label: "Revenue / Client", value: "$19,830" },
  ]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let active = true;

    const loadLeads = async () => {
      setIsSyncing(true);
      try {
        const response = await fetch(API_ENDPOINTS.crmLeads, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Lead API returned a non-200 response.");
        }

        const payload = await response.json();
        const apiLeads = Array.isArray(payload) ? payload : payload.leads;

        if (active && Array.isArray(apiLeads) && apiLeads.length > 0) {
          setCrmLeads(apiLeads.map(normalizeLead));
          setBackendStatus("connected");
          setSyncMessage("Connected to backend");
        } else if (active) {
          setBackendStatus("connected");
          setSyncMessage("Connected to backend (no leads returned)");
        }
      } catch {
        if (active) {
          setBackendStatus("mock");
          setSyncMessage("API unavailable, using local mock data");
        }
      } finally {
        if (active) {
          setIsSyncing(false);
        }
      }
    };

    loadLeads();
    return () => {
      active = false;
    };
  }, []);

  const reps = ["All", ...Array.from(new Set(crmLeads.map((l) => l.rep)))];
  const sources = ["All", ...Array.from(new Set(crmLeads.map((l) => l.source)))];
  const keyword = (crmSearch || globalSearch).toLowerCase();

  const filteredLeads = crmLeads.filter((lead) => {
    const searchPass = lead.company.toLowerCase().includes(keyword) || lead.contact.toLowerCase().includes(keyword);
    const repPass = repFilter === "All" || lead.rep === repFilter;
    const sourcePass = sourceFilter === "All" || lead.source === sourceFilter;
    return searchPass && repPass && sourcePass;
  });

  const selectedClient = deliveryClients.find((client) => client.id === selectedClientId) || deliveryClients[0];
  const selectedFreelancer = freelancers.find((f) => f.id === selectedFreelancerId) || freelancers[0];
  const selectedSop = sops.find((s) => s.id === selectedSopId) || sops[0];

  const sopCategories = ["All", "Sales", "Onboarding", "Delivery", "Freelancer", "Ops", "Automation"];
  const filteredSops = sops.filter((sop) => {
    const categoryPass = sopCategory === "All" || sop.category === sopCategory;
    const searchTerm = (sopSearch || globalSearch).toLowerCase();
    const searchPass = sop.title.toLowerCase().includes(searchTerm);
    return categoryPass && searchPass;
  });

  const totalLeads = crmLeads.length;
  const wonLeads = crmLeads.filter((lead) => lead.stage === "Won").length;
  const callDone = crmLeads.filter((lead) => lead.stage === "Call Done").length;
  const qualified = crmLeads.filter((lead) => lead.stage === "Qualified").length;
  const avgDeal = Math.round(crmLeads.reduce((sum, l) => sum + l.value, 0) / Math.max(totalLeads, 1));

  const revenueTotal = profitability.reduce((sum, row) => sum + row.contract, 0);
  const freelancerTotal = profitability.reduce((sum, row) => sum + row.freelancerCost, 0);
  const opTotal = profitability.reduce((sum, row) => sum + row.opCost, 0);
  const netProfit = revenueTotal - freelancerTotal - opTotal;

  const handleLeadFormChange = (field, value) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    const newLead = {
      id: Date.now(),
      company: leadForm.company,
      value: Number(leadForm.value || 0),
      rep: leadForm.rep,
      source: leadForm.source,
      stage: "Lead Captured",
      daysInStage: 0,
      contact: leadForm.contact,
      email: leadForm.email,
      phone: leadForm.phone,
      industry: leadForm.industry,
      website: leadForm.website,
      notes: leadForm.notes,
    };

    setIsSavingLead(true);
    try {
      const response = await fetch(API_ENDPOINTS.crmLeads, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });

      if (!response.ok) {
        throw new Error("Unable to save lead to backend.");
      }

      const payload = await response.json();
      const persistedLead = normalizeLead(payload.lead || payload);
      setCrmLeads((prev) => [persistedLead, ...prev]);
      setBackendStatus("connected");
      setSyncMessage("Lead saved to backend");
    } catch {
      setCrmLeads((prev) => [newLead, ...prev]);
      setBackendStatus("mock");
      setSyncMessage("Saved locally (backend unavailable)");
    }

    setLeadForm({
      company: "",
      value: "",
      rep: "AL",
      source: "LinkedIn",
      contact: "",
      email: "",
      phone: "",
      industry: "",
      website: "",
      notes: "",
    });
    setShowLeadModal(false);
    setIsSavingLead(false);
  };

  const renderCommandCenter = () => {
    return (
      <div className="module-stack">
        <div className="kpi-grid six">
          <div className="card">
            <div className="card-label">Monthly Revenue</div>
            <div className="metric">$84,200</div>
            <div className="muted">Target: $100,000</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: "84.2%" }} />
            </div>
          </div>
          <div className="card">
            <div className="card-label">Active Clients</div>
            <div className="metric">12</div>
            <div className="muted">Across 7 industries</div>
          </div>
          <div className="card">
            <div className="card-label">Pipeline Value</div>
            <div className="metric">$320,000</div>
            <div className="muted">Weighted opportunity value</div>
          </div>
          <div className="card">
            <div className="card-label">Closed This Month</div>
            <div className="metric">4 deals</div>
            <div className="muted">2 annual + 2 quarterly retainers</div>
          </div>
          <div className="card">
            <div className="card-label">Avg Client Value</div>
            <div className="metric">$7,016</div>
            <div className="muted">Monthly recurring average</div>
          </div>
          <div className="card">
            <div className="card-label">Profit Margin</div>
            <div className="metric">62%</div>
            <div className="muted">+4.2% vs last month</div>
          </div>
        </div>

        <div className="two-col">
          <div className="card chart-card">
            <div className="card-title">6-Month Revenue Trend</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1E1E1E" vertical={false} />
                  <XAxis dataKey="month" stroke="#666666" tickLine={false} axisLine={false} />
                  <YAxis stroke="#666666" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ background: "#111111", border: "1px solid #1E1E1E", borderRadius: 8, color: "#F5F5F5" }}
                    formatter={(val) => formatMoney(val)}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="url(#revGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card chart-card">
            <div className="card-title">Pipeline Stage Counts</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineStages}>
                  <CartesianGrid stroke="#1E1E1E" vertical={false} />
                  <XAxis dataKey="stage" stroke="#666666" tickLine={false} axisLine={false} />
                  <YAxis stroke="#666666" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#111111", border: "1px solid #1E1E1E", borderRadius: 8, color: "#F5F5F5" }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#7C3AED" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="two-col">
          <div className="card">
            <div className="card-title">Operational Alerts</div>
            <div className="stack-12">
              {alerts.map((alert) => (
                <div key={alert.text} className={`alert-row ${alert.type}`}>
                  <div>{alert.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Active Clients</div>
            <div className="client-grid">
              {activeClients.map((client) => (
                <div key={client.name} className="client-mini">
                  <div className="row-between">
                    <div className="client-name">{client.name}</div>
                    <span className={`badge ${badgeTone(client.status)}`}>{client.status}</span>
                  </div>
                  <div className="muted">Owner: {client.owner}</div>
                  <div className="row-between margin-top-8">
                    <div className="muted">MRR</div>
                    <div className="metric-sm">{formatMoney(client.mrr)}</div>
                  </div>
                  <div className="row-between margin-top-8">
                    <div className="muted">Health</div>
                    <span className={`badge ${badgeTone(client.health)}`}>{client.health}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCRM = () => {
    return (
      <div className="module-stack">
        <div className="card">
          <div className="toolbar-wrap">
            <div className="toolbar-left">
              <button className="btn-primary" onClick={() => setShowLeadModal(true)} disabled={isSavingLead}>
                <Plus size={16} />
                {isSavingLead ? "Saving..." : "Add Lead"}
              </button>
            </div>
            <div className="toolbar-right">
              <span className={`sync-pill ${backendStatus}`}>{isSyncing ? "Syncing..." : syncMessage}</span>
              <div className="input-with-icon compact">
                <Search size={14} />
                <input value={crmSearch} onChange={(e) => setCrmSearch(e.target.value)} placeholder="Search lead or contact" />
              </div>
              <select value={repFilter} onChange={(e) => setRepFilter(e.target.value)}>
                {reps.map((rep) => (
                  <option value={rep} key={rep}>
                    Rep: {rep}
                  </option>
                ))}
              </select>
              <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
                {sources.map((source) => (
                  <option value={source} key={source}>
                    Source: {source}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="kpi-grid four">
          <div className="card">
            <div className="card-label">Total Leads</div>
            <div className="metric">{totalLeads}</div>
          </div>
          <div className="card">
            <div className="card-label">Lead to Call Rate</div>
            <div className="metric">{Math.round((qualified / Math.max(totalLeads, 1)) * 100)}%</div>
          </div>
          <div className="card">
            <div className="card-label">Call to Close</div>
            <div className="metric">{Math.round((wonLeads / Math.max(callDone, 1)) * 100)}%</div>
          </div>
          <div className="card">
            <div className="card-label">Avg Deal Size</div>
            <div className="metric">{formatMoney(avgDeal)}</div>
          </div>
        </div>

        <div className="kanban-wrap">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((lead) => lead.stage === stage);
            return (
              <div key={stage} className="kanban-col">
                <div className="kanban-head">
                  <div>{stage}</div>
                  <span className="count-pill">{stageLeads.length}</span>
                </div>
                <div className="kanban-list">
                  {stageLeads.map((lead) => (
                    <div key={lead.id} className="lead-card">
                      <div className="row-between gap-8">
                        <div className="client-name">{lead.company}</div>
                        <div className="metric-sm">{formatMoney(lead.value)}</div>
                      </div>
                      <div className="row-between gap-8 margin-top-8">
                        <span className="avatar-chip">{lead.rep}</span>
                        <span className={`source-chip ${sourceTone(lead.source)}`}>{lead.source}</span>
                      </div>
                      <div className="muted margin-top-8">{lead.contact}</div>
                      <div className="muted">{lead.daysInStage} days in stage</div>
                    </div>
                  ))}
                  {stageLeads.length === 0 ? <div className="muted">No leads</div> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderClientDelivery = () => {
    const taskColumns = ["To Do", "In Progress", "Review", "Completed"];

    return (
      <div className="module-stack">
        <div className="card overflow-x">
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Services</th>
                <th>Team</th>
                <th>Start</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveryClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.services.join(", ")}</td>
                  <td>
                    <div className="avatar-row">
                      {client.team.map((t) => (
                        <span className="avatar-chip" key={`${client.id}-${t}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{client.start}</td>
                  <td>
                    <span className={`badge ${badgeTone(client.status)}`}>{client.status}</span>
                  </td>
                  <td>
                    <div className="row-between gap-8">
                      <span>{client.progress}%</span>
                      <div className="tiny-progress">
                        <div style={{ width: `${client.progress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className="btn-ghost" onClick={() => setSelectedClientId(client.id)}>
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="workspace-grid">
          <div className="card">
            <div className="row-between wrap gap-8">
              <div>
                <div className="card-title">{selectedClient.name} Workspace</div>
                <div className="muted">Contract: {formatMoney(selectedClient.contract)}</div>
              </div>
              <div className="row gap-8">
                <span className={`badge ${badgeTone(selectedClient.health)}`}>{selectedClient.health}</span>
                <div className="avatar-row">
                  {selectedClient.team.map((member) => (
                    <span key={member} className="avatar-chip">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="stepper">
              {["Discovery", "Build", "QA", "Deploy", "Optimize"].map((step, idx) => {
                const done = idx <= selectedClient.stage;
                return (
                  <div className="step" key={step}>
                    <div className={`step-dot ${done ? "done" : ""}`}>{idx + 1}</div>
                    <div className={`step-label ${done ? "done" : ""}`}>{step}</div>
                  </div>
                );
              })}
            </div>

            <div className="task-board">
              {taskColumns.map((col) => {
                const tasks = selectedClient.tasks.filter((task) => task.status === col);
                return (
                  <div key={col} className="task-col">
                    <div className="kanban-head">
                      <div>{col}</div>
                      <span className="count-pill">{tasks.length}</span>
                    </div>
                    <div className="kanban-list">
                      {tasks.map((task, i) => (
                        <div className="lead-card" key={`${task.title}-${i}`}>
                          <div className="client-name">{task.title}</div>
                          <div className="row-between margin-top-8">
                            <span className={`badge ${badgeTone(task.priority)}`}>{task.priority}</span>
                            <span className="muted">{task.deadline}</span>
                          </div>
                          <div className="muted margin-top-8">Assignee: {task.assignee}</div>
                        </div>
                      ))}
                      {tasks.length === 0 ? <div className="muted">No tasks</div> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card chart-card small-chart">
            <div className="card-title">Project Progress</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="90%"
                  barSize={18}
                  data={[{ name: "Progress", value: selectedClient.progress, fill: "#7C3AED" }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" background={{ fill: "#1E1E1E" }} cornerRadius={8} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="metric center">{selectedClient.progress}%</div>
          </div>
        </div>
      </div>
    );
  };

  const renderFreelancers = () => {
    return (
      <div className="module-stack">
        <div className="card">
          <div className="card-title">Capacity Overview</div>
          <div className="stack-12">
            {freelancers.map((f) => (
              <div key={f.id}>
                <div className="row-between margin-bottom-6">
                  <div className="muted">
                    {f.name} ({f.specialization})
                  </div>
                  <div className="metric-sm">{f.utilization}%</div>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${f.utilization}%`, background: f.utilization > 90 ? "#EF4444" : f.utilization > 75 ? "#F59E0B" : "#10B981" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="three-col">
          {freelancers.map((f) => (
            <div key={f.id} className="card">
              <div className="row-between">
                <span className="avatar-circle">{f.initials}</span>
                <span className={`availability-dot ${f.availability}`} />
              </div>
              <div className="client-name margin-top-8">{f.name}</div>
              <div className="muted">{f.specialization}</div>
              <div className="muted margin-top-8">{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</div>
              <div className="row-between margin-top-8">
                <div className="muted">Rate</div>
                <div className="metric-sm">${f.rate}/hr</div>
              </div>
              <div className="row-between margin-top-8">
                <div className="muted">Active Projects</div>
                <div className="metric-sm">{f.activeProjects}</div>
              </div>
              <button className="btn-primary full margin-top-12" onClick={() => setSelectedFreelancerId(f.id)}>
                Assign Task
              </button>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Freelancer Profile: {selectedFreelancer.name}</div>
          <div className="two-col">
            <div>
              <div className="muted">Details</div>
              <p className="paragraph">{selectedFreelancer.profile}</p>
              <div className="muted">Active Projects</div>
              <ul className="list">
                {selectedFreelancer.projects.map((project) => (
                  <li key={project}>{project}</li>
                ))}
              </ul>
              <div className="muted">Task Deadlines</div>
              <ul className="list">
                {selectedFreelancer.tasks.map((task) => (
                  <li key={task.title}>
                    {task.title} - {task.deadline}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-x">
              <table className="table compact">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFreelancer.payments.map((p, i) => (
                    <tr key={`${selectedFreelancer.id}-${i}`}>
                      <td>{p.date}</td>
                      <td>{formatMoney(p.amount)}</td>
                      <td>
                        <span className={`badge ${badgeTone(p.status)}`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSOP = () => {
    return (
      <div className="module-stack">
        <div className="workspace-grid sop-layout">
          <div className="card">
            <div className="card-title">Categories</div>
            <div className="stack-8">
              {sopCategories.map((category) => (
                <button
                  key={category}
                  className={`side-btn ${sopCategory === category ? "active" : ""}`}
                  onClick={() => setSopCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="row-between gap-8 wrap">
              <div className="card-title">SOP Library</div>
              <div className="input-with-icon compact">
                <Search size={14} />
                <input value={sopSearch} onChange={(e) => setSopSearch(e.target.value)} placeholder="Search SOP by title" />
              </div>
            </div>
            <div className="stack-12 margin-top-12">
              {filteredSops.map((sop) => (
                <div className="sop-card" key={sop.id}>
                  <div>
                    <div className="client-name">{sop.title}</div>
                    <div className="muted">Updated: {sop.updated}</div>
                  </div>
                  <div className="row gap-8">
                    <span className="badge badge-info">{sop.category}</span>
                    <button className="btn-ghost" onClick={() => setSelectedSopId(sop.id)}>
                      View
                    </button>
                  </div>
                </div>
              ))}
              {filteredSops.length === 0 ? <div className="muted">No SOP found</div> : null}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">{selectedSop.title}</div>
          <div className="muted margin-top-8">Objective: {selectedSop.objective}</div>
          <div className="chip-row margin-top-12">
            {selectedSop.tools.map((tool) => (
              <span key={tool} className="source-chip src-gray">
                {tool}
              </span>
            ))}
          </div>
          <div className="margin-top-16">
            <div className="muted">Process</div>
            <ol className="ol-list">
              {selectedSop.steps.map((step, idx) => (
                <li key={step}>
                  <span className="metric-sm">{idx + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="margin-top-16">
            <div className="muted">Expected Outcome</div>
            <p className="paragraph">{selectedSop.outcome}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancials = () => {
    return (
      <div className="module-stack">
        <div className="kpi-grid three">
          {financeRevenueCards.map((card) => (
            <div className="card" key={card.label}>
              <div className="card-label">{card.label}</div>
              <div className="metric">{formatMoney(card.value)}</div>
              <div className="success">{card.delta}</div>
            </div>
          ))}
        </div>

        <div className="card chart-card">
          <div className="card-title">12-Month Revenue</div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={line12Months}>
                <CartesianGrid stroke="#1E1E1E" vertical={false} />
                <XAxis dataKey="month" stroke="#666666" tickLine={false} axisLine={false} />
                <YAxis stroke="#666666" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "#111111", border: "1px solid #1E1E1E", borderRadius: 8, color: "#F5F5F5" }}
                  formatter={(v) => formatMoney(v)}
                />
                <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: "#8B5CF6", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card overflow-x">
          <div className="card-title">Client Profitability</div>
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contract</th>
                <th>Freelancer Cost</th>
                <th>Op Cost</th>
                <th>Margin%</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {profitability.map((row) => (
                <tr key={row.client}>
                  <td>{row.client}</td>
                  <td>{formatMoney(row.contract)}</td>
                  <td>{formatMoney(row.freelancerCost)}</td>
                  <td>{formatMoney(row.opCost)}</td>
                  <td>{row.margin}%</td>
                  <td>
                    <span className={`badge ${badgeTone(row.status)}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="two-col">
          <div className="card">
            <div className="card-title">Agency P&L</div>
            <div className="stack-12">
              <div className="row-between">
                <span className="muted">Total Revenue</span>
                <span className="metric-sm">{formatMoney(revenueTotal)}</span>
              </div>
              <div className="row-between">
                <span className="muted">Freelancer Expenses</span>
                <span className="danger">-{formatMoney(freelancerTotal)}</span>
              </div>
              <div className="row-between">
                <span className="muted">Operational Expenses</span>
                <span className="warning">-{formatMoney(opTotal)}</span>
              </div>
              <div className="row-between p-top border-top">
                <span className="muted">Net Profit</span>
                <span className="success metric-sm">{formatMoney(netProfit)}</span>
              </div>
            </div>
          </div>

          <div className="kpi-grid two">
            {performanceKpis.map((kpi) => (
              <div key={kpi.label} className="card">
                <div className="card-label">{kpi.label}</div>
                <div className="metric">{kpi.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderModule = () => {
    if (activeModule === "Command Center") return renderCommandCenter();
    if (activeModule === "Acquisition & CRM") return renderCRM();
    if (activeModule === "Client Delivery") return renderClientDelivery();
    if (activeModule === "Freelancers") return renderFreelancers();
    if (activeModule === "SOP Knowledge Base") return renderSOP();
    return renderFinancials();
  };

  return (
    <div className="smiley-os-root">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');

        .smiley-os-root {
          --bg: #0a0a0a;
          --surface: #111111;
          --border: #1e1e1e;
          --accent: #7c3aed;
          --accent-hover: #8b5cf6;
          --text: #f5f5f5;
          --muted: #666666;
          --success: #10b981;
          --warning: #f59e0b;
          --danger: #ef4444;
          min-height: 100vh;
          background:
            radial-gradient(circle at 88% 10%, rgba(124, 58, 237, 0.14), transparent 42%),
            radial-gradient(circle at 8% 80%, rgba(139, 92, 246, 0.08), transparent 38%),
            var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
        }

        .smiley-os-root * {
          box-sizing: border-box;
        }

        .smiley-os-root .metric,
        .smiley-os-root .metric-sm {
          font-family: 'Space Mono', monospace;
        }

        .os-layout {
          display: flex;
          min-height: 100vh;
        }

        .os-sidebar {
          width: 260px;
          background: #0d0d0d;
          border-right: 1px solid var(--border);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 60;
        }

        .sidebar-logo {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .side-btn {
          width: 100%;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          color: var(--text);
          text-align: left;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .side-btn:hover {
          border-color: var(--border);
          background: #121212;
        }

        .side-btn.active {
          background: rgba(124, 58, 237, 0.15);
          border-color: rgba(124, 58, 237, 0.35);
          box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.15), 0 4px 24px rgba(0, 0, 0, 0.4);
        }

        .os-main {
          flex: 1;
          min-width: 0;
          background: linear-gradient(180deg, rgba(124, 58, 237, 0.04) 0%, rgba(10, 10, 10, 0) 140px);
        }

        .topbar {
          height: 72px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          position: sticky;
          top: 0;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(8px);
          z-index: 50;
        }

        .top-left,
        .top-right,
        .row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .input-with-icon {
          height: 40px;
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 4px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          width: 360px;
          color: var(--muted);
        }

        .input-with-icon.compact {
          width: 240px;
          height: 36px;
        }

        .input-with-icon input {
          width: 100%;
          background: transparent;
          border: 0;
          outline: none;
          color: var(--text);
          font-family: inherit;
        }

        .notification {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 8px;
          display: grid;
          place-items: center;
          position: relative;
          background: var(--surface);
        }

        .badge-count {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: var(--accent);
          color: white;
          display: grid;
          place-items: center;
          font-size: 11px;
          font-weight: 700;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          color: white;
          display: grid;
          place-items: center;
          font-weight: 700;
        }

        .user-role {
          color: var(--muted);
          font-size: 13px;
        }

        .module-body {
          padding: 16px;
        }

        .module-title {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
        }

        .module-subtitle {
          margin-top: 6px;
          color: var(--muted);
          font-size: 14px;
        }

        .module-stack {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeUp 0.28s ease;
        }

        .sync-pill {
          height: 36px;
          padding: 0 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          color: var(--muted);
          background: #141414;
          white-space: nowrap;
        }

        .sync-pill.connected {
          color: #86efac;
          border-color: rgba(16, 185, 129, 0.45);
          background: rgba(16, 185, 129, 0.12);
        }

        .sync-pill.mock {
          color: #fcd34d;
          border-color: rgba(245, 158, 11, 0.45);
          background: rgba(245, 158, 11, 0.12);
        }

        .sync-pill.checking {
          color: #c4b5fd;
          border-color: rgba(124, 58, 237, 0.45);
          background: rgba(124, 58, 237, 0.12);
        }

        .kpi-grid {
          display: grid;
          gap: 16px;
        }

        .kpi-grid.six {
          grid-template-columns: repeat(6, minmax(0, 1fr));
        }

        .kpi-grid.four {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .kpi-grid.three {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .kpi-grid.two {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .two-col {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 16px;
        }

        .three-col {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .workspace-grid {
          display: grid;
          grid-template-columns: 1.8fr 0.9fr;
          gap: 16px;
        }

        .workspace-grid.sop-layout {
          grid-template-columns: 280px 1fr;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.15), 0 4px 24px rgba(0, 0, 0, 0.4);
        }

        .card-title {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .card-label {
          color: var(--muted);
          font-size: 13px;
          margin-bottom: 6px;
        }

        .metric {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
        }

        .metric.center {
          text-align: center;
        }

        .metric-sm {
          font-size: 14px;
          font-weight: 700;
        }

        .muted {
          color: var(--muted);
          font-size: 13px;
        }

        .paragraph {
          color: #d4d4d4;
          line-height: 1.5;
          font-size: 14px;
          margin-top: 8px;
        }

        .progress-track {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: #1c1c1c;
          overflow: hidden;
          margin-top: 10px;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 999px;
        }

        .chart-card .chart-wrap {
          height: 260px;
        }

        .small-chart .chart-wrap {
          height: 220px;
        }

        .alert-row {
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid;
          background: #121212;
          color: #e5e5e5;
          font-size: 14px;
        }

        .alert-row.danger {
          border-color: var(--danger);
        }

        .alert-row.warning {
          border-color: var(--warning);
        }

        .alert-row.info {
          border-color: var(--accent);
        }

        .client-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .client-mini {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px;
          background: #121212;
        }

        .client-name {
          font-weight: 700;
          font-size: 14px;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          border: 1px solid transparent;
        }

        .badge-success {
          color: #6ee7b7;
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(16, 185, 129, 0.4);
        }

        .badge-warning {
          color: #fcd34d;
          background: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.4);
        }

        .badge-danger {
          color: #fca5a5;
          background: rgba(239, 68, 68, 0.12);
          border-color: rgba(239, 68, 68, 0.4);
        }

        .badge-info {
          color: #c4b5fd;
          background: rgba(124, 58, 237, 0.12);
          border-color: rgba(124, 58, 237, 0.4);
        }

        .row-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .row-between.wrap {
          flex-wrap: wrap;
        }

        .gap-8 {
          gap: 8px;
        }

        .margin-top-8 {
          margin-top: 8px;
        }

        .margin-top-12 {
          margin-top: 12px;
        }

        .margin-top-16 {
          margin-top: 16px;
        }

        .margin-bottom-6 {
          margin-bottom: 6px;
        }

        .stack-12 {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stack-8 {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .toolbar-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        select,
        textarea,
        .smiley-os-root input {
          font-family: inherit;
          font-size: 14px;
        }

        select,
        textarea,
        .form-input,
        .toolbar-right select {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          border-radius: 4px;
          padding: 9px 10px;
          outline: none;
        }

        .toolbar-right select {
          height: 36px;
        }

        .btn-primary,
        .btn-ghost,
        .btn-icon {
          height: 36px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text);
          padding: 0 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          font-weight: 600;
        }

        .btn-primary {
          background: var(--accent);
          border-color: var(--accent);
        }

        .btn-primary:hover {
          background: var(--accent-hover);
          border-color: var(--accent-hover);
        }

        .btn-primary:disabled {
          opacity: 0.72;
          cursor: not-allowed;
        }

        .btn-ghost:hover,
        .btn-icon:hover {
          border-color: var(--accent);
          color: #ddd6fe;
        }

        .btn-icon {
          width: 36px;
          padding: 0;
          justify-content: center;
        }

        .btn-primary.full {
          width: 100%;
        }

        .kanban-wrap {
          display: grid;
          grid-template-columns: repeat(7, minmax(220px, 1fr));
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .kanban-col {
          min-width: 220px;
          background: #0f0f0f;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px;
        }

        .kanban-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 8px;
          font-weight: 700;
          font-size: 13px;
        }

        .count-pill {
          min-width: 24px;
          height: 24px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 12px;
          background: #1b1b1b;
          border: 1px solid var(--border);
          color: var(--text);
        }

        .kanban-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 140px;
        }

        .lead-card {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px;
          background: #121212;
        }

        .avatar-chip {
          min-width: 30px;
          height: 24px;
          border-radius: 999px;
          border: 1px solid var(--border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          background: #181818;
        }

        .avatar-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .source-chip {
          border-radius: 999px;
          padding: 3px 8px;
          font-size: 11px;
          border: 1px solid;
          display: inline-flex;
          align-items: center;
        }

        .src-green {
          color: #6ee7b7;
          border-color: rgba(16, 185, 129, 0.5);
          background: rgba(16, 185, 129, 0.12);
        }

        .src-blue {
          color: #93c5fd;
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.12);
        }

        .src-purple {
          color: #c4b5fd;
          border-color: rgba(124, 58, 237, 0.5);
          background: rgba(124, 58, 237, 0.12);
        }

        .src-yellow {
          color: #fde68a;
          border-color: rgba(245, 158, 11, 0.5);
          background: rgba(245, 158, 11, 0.12);
        }

        .src-gray {
          color: #d4d4d4;
          border-color: rgba(115, 115, 115, 0.5);
          background: rgba(82, 82, 82, 0.15);
        }

        .overflow-x {
          overflow-x: auto;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 760px;
        }

        .table.compact {
          min-width: 100%;
        }

        .table th,
        .table td {
          border-bottom: 1px solid var(--border);
          padding: 10px;
          text-align: left;
          font-size: 13px;
        }

        .table th {
          color: var(--muted);
          font-weight: 600;
        }

        .tiny-progress {
          width: 90px;
          height: 6px;
          border-radius: 999px;
          background: #1b1b1b;
          overflow: hidden;
        }

        .tiny-progress div {
          height: 100%;
          background: var(--accent);
          border-radius: 999px;
        }

        .stepper {
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px;
          background: #121212;
        }

        .step-dot {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 1px solid var(--border);
          display: grid;
          place-items: center;
          font-size: 11px;
          color: var(--muted);
        }

        .step-dot.done {
          border-color: rgba(124, 58, 237, 0.8);
          background: rgba(124, 58, 237, 0.2);
          color: #ddd6fe;
        }

        .step-label {
          color: var(--muted);
          font-size: 12px;
        }

        .step-label.done {
          color: #ddd6fe;
        }

        .task-board {
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .task-col {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px;
          background: #0f0f0f;
        }

        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: rgba(124, 58, 237, 0.2);
          border: 1px solid rgba(124, 58, 237, 0.4);
          font-weight: 700;
        }

        .availability-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
        }

        .availability-dot.green {
          background: var(--success);
        }

        .availability-dot.yellow {
          background: var(--warning);
        }

        .availability-dot.red {
          background: var(--danger);
        }

        .list {
          margin: 8px 0 0;
          padding-left: 18px;
          color: #d4d4d4;
          font-size: 14px;
          line-height: 1.6;
        }

        .sop-card {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px;
          background: #121212;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .chip-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .ol-list {
          margin: 8px 0 0;
          padding-left: 18px;
          color: #e5e5e5;
          font-size: 14px;
          line-height: 1.7;
        }

        .success {
          color: var(--success);
        }

        .warning {
          color: var(--warning);
        }

        .danger {
          color: var(--danger);
        }

        .p-top {
          padding-top: 10px;
        }

        .border-top {
          border-top: 1px solid var(--border);
        }

        .menu-button {
          display: none;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: grid;
          place-items: center;
          z-index: 120;
          padding: 16px;
        }

        .modal {
          width: 100%;
          max-width: 760px;
          max-height: calc(100vh - 32px);
          overflow: auto;
          background: #111111;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.15), 0 4px 24px rgba(0, 0, 0, 0.4);
        }

        .modal-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .modal-actions {
          margin-top: 14px;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .form-control {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-control label {
          color: var(--muted);
          font-size: 12px;
        }

        .full-row {
          grid-column: 1 / -1;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1400px) {
          .kpi-grid.six {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 1024px) {
          .two-col,
          .three-col,
          .workspace-grid,
          .workspace-grid.sop-layout,
          .kpi-grid.four,
          .kpi-grid.three,
          .kpi-grid.two,
          .task-board {
            grid-template-columns: 1fr;
          }

          .kpi-grid.six {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .input-with-icon {
            width: 260px;
          }
        }

        @media (max-width: 768px) {
          .os-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-110%);
            transition: transform 0.25s ease;
          }

          .os-sidebar.open {
            transform: translateX(0);
          }

          .menu-button {
            display: inline-flex;
          }

          .topbar {
            padding: 0 12px;
          }

          .input-with-icon {
            width: 100%;
          }

          .top-left {
            flex: 1;
          }

          .top-right .user-meta {
            display: none;
          }

          .module-body {
            padding: 12px;
          }

          .kpi-grid.six {
            grid-template-columns: 1fr;
          }

          .client-grid {
            grid-template-columns: 1fr;
          }

          .modal-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="os-layout">
        <aside className={`os-sidebar ${mobileSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-logo">SMILEY OS</div>
          <div className="stack-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`side-btn ${activeModule === item.label ? "active" : ""}`}
                  onClick={() => {
                    setActiveModule(item.label);
                    setMobileSidebarOpen(false);
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="os-main">
          <header className="topbar">
            <div className="top-left">
              <button className="btn-icon menu-button" onClick={() => setMobileSidebarOpen((p) => !p)} aria-label="Open sidebar">
                <Menu size={16} />
              </button>
              <div className="input-with-icon">
                <Search size={16} />
                <input
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Search clients, leads, SOPs"
                />
              </div>
            </div>
            <div className="top-right">
              <span className={`sync-pill ${backendStatus}`}>{isSyncing ? "Syncing" : backendStatus === "connected" ? "API Connected" : "Mock Mode"}</span>
              <div className="notification">
                <Bell size={16} />
                <span className="badge-count">{notificationCount}</span>
              </div>
              <div className="avatar">AD</div>
              <div className="user-meta">
                <div className="metric-sm">Admin</div>
                <div className="user-role">CEO</div>
              </div>
            </div>
          </header>

          <main className="module-body">
            <h1 className="module-title">{activeModule}</h1>
            <p className="module-subtitle">SMILEY OS central operating dashboard for leadership visibility and execution control.</p>
            {renderModule()}
          </main>
        </div>
      </div>

      {showLeadModal ? (
        <div className="modal-backdrop" onClick={() => setShowLeadModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="row-between">
              <div className="card-title">Add New Lead</div>
              <button className="btn-icon" onClick={() => setShowLeadModal(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddLead}>
              <div className="modal-grid">
                <div className="form-control">
                  <label>Company Name</label>
                  <input className="form-input" value={leadForm.company} onChange={(e) => handleLeadFormChange("company", e.target.value)} required />
                </div>
                <div className="form-control">
                  <label>Deal Value</label>
                  <input
                    className="form-input"
                    type="number"
                    value={leadForm.value}
                    onChange={(e) => handleLeadFormChange("value", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label>Contact Name</label>
                  <input className="form-input" value={leadForm.contact} onChange={(e) => handleLeadFormChange("contact", e.target.value)} required />
                </div>
                <div className="form-control">
                  <label>Email</label>
                  <input
                    className="form-input"
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => handleLeadFormChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label>Phone</label>
                  <input className="form-input" value={leadForm.phone} onChange={(e) => handleLeadFormChange("phone", e.target.value)} required />
                </div>
                <div className="form-control">
                  <label>Industry</label>
                  <input className="form-input" value={leadForm.industry} onChange={(e) => handleLeadFormChange("industry", e.target.value)} required />
                </div>
                <div className="form-control">
                  <label>Assigned Rep</label>
                  <select value={leadForm.rep} onChange={(e) => handleLeadFormChange("rep", e.target.value)}>
                    <option value="AL">AL</option>
                    <option value="MR">MR</option>
                    <option value="KC">KC</option>
                    <option value="SJ">SJ</option>
                  </select>
                </div>
                <div className="form-control">
                  <label>Source</label>
                  <select value={leadForm.source} onChange={(e) => handleLeadFormChange("source", e.target.value)}>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Google">Google</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
                <div className="form-control full-row">
                  <label>Website</label>
                  <input className="form-input" value={leadForm.website} onChange={(e) => handleLeadFormChange("website", e.target.value)} />
                </div>
                <div className="form-control full-row">
                  <label>Notes</label>
                  <textarea rows={3} value={leadForm.notes} onChange={(e) => handleLeadFormChange("notes", e.target.value)} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowLeadModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
