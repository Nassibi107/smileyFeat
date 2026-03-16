"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Sun,
  Moon,
  UserCircle2,
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
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const AUTH_STORAGE_KEY = "smileyos.crm.token";
const API_ENDPOINTS = {
  authLogin: `${API_BASE}/auth/login`,
  crmLeads: `${API_BASE}/crm/leads`,
  bookingsRecent: `${API_BASE}/bookings/recent`,
  contentAdmin: `${API_BASE}/content/admin`,
  contentSite: `${API_BASE}/content/site`,
  contentTeam: `${API_BASE}/content/team`,
  dashboardOverview: `${API_BASE}/dashboard/overview`,
  dashboardClients: `${API_BASE}/dashboard/clients`,
  dashboardFreelancers: `${API_BASE}/dashboard/freelancers`,
  dashboardPartners: `${API_BASE}/dashboard/partners`,
  dashboardFinancials: `${API_BASE}/dashboard/financials`,
  dashboardFinancialCsv: `${API_BASE}/dashboard/reports/financials.csv`,
  authProfile: `${API_BASE}/auth/profile`,
  notificationsTest: `${API_BASE}/notifications/test`,
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
  const [darkMode, setDarkMode] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [bookingNotifications, setBookingNotifications] = useState([]);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [syncMessage, setSyncMessage] = useState("Checking API connection...");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [siteContent, setSiteContent] = useState({
    heroTitle: "",
    heroSubtitle: "",
    aboutTitle: "",
    aboutParagraph: "",
    aboutHighlights: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [isSavingTeamMember, setIsSavingTeamMember] = useState(false);
  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "",
    specialty: "",
    bio: "",
    imageUrl: "",
    color: "#7A5CFF",
    displayOrder: 0,
  });

  const navItems = [
    { label: "Command Center", icon: LayoutDashboard },
    { label: "Acquisition & CRM", icon: Target },
    { label: "Client Delivery", icon: Briefcase },
    { label: "Freelancers", icon: Users },
    { label: "SOP Knowledge Base", icon: BookOpen },
    { label: "Financials", icon: BarChart2 },
    { label: "Website Content", icon: BookOpen },
    { label: "Profile", icon: UserCircle2 },
  ];

  const [revenueTrend, setRevenueTrend] = useState([]);
  const [line12Months, setLine12Months] = useState([]);
  const [pipelineStages, setPipelineStages] = useState([]);
  const [deliveryClients, setDeliveryClients] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [financialRecords, setFinancialRecords] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedFreelancerId, setSelectedFreelancerId] = useState(null);
  const [clientForm, setClientForm] = useState({ name: "", owner: "AL", contract: "", services: "" });
  const [freelancerForm, setFreelancerForm] = useState({ name: "", specialization: "", rate: "", utilization: "" });
  const [partnerForm, setPartnerForm] = useState({ name: "", category: "", description: "", website: "" });
  const [financialForm, setFinancialForm] = useState({ month: "", clientName: "", contract: "", freelancerCost: "", opCost: "" });
  const [isExportingReport, setIsExportingReport] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isSendingTestNotification, setIsSendingTestNotification] = useState(false);
  const [profileForm, setProfileForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [notificationForm, setNotificationForm] = useState({
    to: "",
    subject: "SMILEY OS Test Notification",
    message: "This is a test notification from SMILEY OS dashboard.",
  });

  const activeClients = deliveryClients.slice(0, 4).map((client) => ({
    name: client.name,
    owner: client.owner,
    status: client.status,
    mrr: Math.round((client.contract || 0) / 12),
    health: client.health,
  }));

  const [crmLeads, setCrmLeads] = useState([]);

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

  

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const loadDashboardData = async () => {
      if (!authToken) {
        return;
      }

      try {
        const [overviewRes, clientsRes, freelancersRes, partnersRes, financialsRes] = await Promise.all([
          fetch(API_ENDPOINTS.dashboardOverview, { headers: { Authorization: `Bearer ${authToken}` }, cache: "no-store" }),
          fetch(API_ENDPOINTS.dashboardClients, { headers: { Authorization: `Bearer ${authToken}` }, cache: "no-store" }),
          fetch(API_ENDPOINTS.dashboardFreelancers, { headers: { Authorization: `Bearer ${authToken}` }, cache: "no-store" }),
          fetch(API_ENDPOINTS.dashboardPartners, { headers: { Authorization: `Bearer ${authToken}` }, cache: "no-store" }),
          fetch(API_ENDPOINTS.dashboardFinancials, { headers: { Authorization: `Bearer ${authToken}` }, cache: "no-store" }),
        ]);

        const responses = [overviewRes, clientsRes, freelancersRes, partnersRes, financialsRes];
        if (responses.some((response) => response.status === 401)) {
          handleLogout();
          return;
        }

        if (!responses.every((response) => response.ok)) {
          return;
        }

        const [overview, clients, freelancerRows, partnerRows, financialRows] = await Promise.all([
          overviewRes.json(),
          clientsRes.json(),
          freelancersRes.json(),
          partnersRes.json(),
          financialsRes.json(),
        ]);

        if (!active) {
          return;
        }

        const normalizedClients = (Array.isArray(clients) ? clients : []).map((client) => ({
          ...client,
          id: String(client.id),
          services: Array.isArray(client.services) ? client.services : [],
          team: Array.isArray(client.team) ? client.team : [],
          tasks: Array.isArray(client.tasks) ? client.tasks : [],
          start: client.startDate ? String(client.startDate).slice(0, 10) : "",
        }));

        const normalizedFreelancers = (Array.isArray(freelancerRows) ? freelancerRows : []).map((freelancer) => ({
          ...freelancer,
          id: String(freelancer.id),
          projects: Array.isArray(freelancer.projects) ? freelancer.projects : [],
          tasks: Array.isArray(freelancer.tasks) ? freelancer.tasks : [],
          payments: Array.isArray(freelancer.payments) ? freelancer.payments : [],
        }));

        const normalizedFinancials = Array.isArray(financialRows) ? financialRows : [];
        const revenueSeries = normalizedFinancials.slice(-6).map((row) => ({ month: row.month, revenue: row.contract }));
        const fullSeries = normalizedFinancials.slice(-12).map((row) => ({ month: row.month, value: row.contract }));

        setDeliveryClients(normalizedClients);
        setFreelancers(normalizedFreelancers);
        setPartners(Array.isArray(partnerRows) ? partnerRows : []);
        setFinancialRecords(normalizedFinancials);
        setRevenueTrend(revenueSeries);
        setLine12Months(fullSeries);
        setPipelineStages(Array.isArray(overview?.pipelineStages) ? overview.pipelineStages : []);

        if (normalizedClients.length > 0 && !selectedClientId) {
          setSelectedClientId(normalizedClients[0].id);
        }
        if (normalizedFreelancers.length > 0 && !selectedFreelancerId) {
          setSelectedFreelancerId(normalizedFreelancers[0].id);
        }
      } catch {
        // Keep UI operable when dashboard endpoints are unavailable.
      }
    };

    loadDashboardData();

    return () => {
      active = false;
    };
  }, [authToken, selectedClientId, selectedFreelancerId]);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(AUTH_STORAGE_KEY) ?? "";
    const storedEmail = window.localStorage.getItem(`${AUTH_STORAGE_KEY}.email`) ?? "";
    const storedDarkMode = window.localStorage.getItem("smileyos.darkMode");
    setAuthToken(storedToken);
    setAuthEmail(storedEmail);
    if (storedDarkMode !== null) setDarkMode(storedDarkMode !== "false");
    setAuthReady(true);
  }, []);

  useEffect(() => {
    let active = true;

    const loadLeads = async () => {
      if (!authToken) {
        if (active) {
          setBackendStatus("checking");
          setSyncMessage("Login required");
          setIsSyncing(false);
        }
        return;
      }

      setIsSyncing(true);
      try {
        const response = await fetch(API_ENDPOINTS.crmLeads, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 401) {
          throw new Error("unauthorized");
        }

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
          window.localStorage.removeItem(AUTH_STORAGE_KEY);
          window.localStorage.removeItem(`${AUTH_STORAGE_KEY}.email`);
          setAuthToken("");
          setAuthEmail("");
          setBackendStatus("mock");
          setSyncMessage("Login expired or API unavailable");
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
  }, [authToken]);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      if (!authToken) {
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.authProfile, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 401) {
          handleLogout();
          return;
        }

        if (!response.ok) {
          return;
        }

        const profile = await response.json();
        if (!active) {
          return;
        }

        setAuthEmail(profile.email || "");
        setProfileForm((prev) => ({ ...prev, email: profile.email || "" }));
      } catch {
        // Keep UI state intact.
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [authToken]);

  useEffect(() => {
    let active = true;

    const loadAdminContent = async () => {
      if (!authToken) {
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.contentAdmin, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 401) {
          throw new Error("unauthorized");
        }

        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        if (!active) {
          return;
        }

        if (payload?.site) {
          setSiteContent({
            heroTitle: payload.site.heroTitle || "",
            heroSubtitle: payload.site.heroSubtitle || "",
            aboutTitle: payload.site.aboutTitle || "",
            aboutParagraph: payload.site.aboutParagraph || "",
            aboutHighlights: Array.isArray(payload.site.aboutHighlights) ? payload.site.aboutHighlights.join("\n") : "",
          });
        }

        if (Array.isArray(payload?.team)) {
          setTeamMembers(payload.team);
        }
      } catch {
        if (active) {
          handleLogout();
        }
      }
    };

    loadAdminContent();

    return () => {
      active = false;
    };
  }, [authToken]);

  useEffect(() => {
    let active = true;

    const loadRecentBookings = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.bookingsRecent, { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        if (active && Array.isArray(payload)) {
          setBookingNotifications(payload);
        }
      } catch {
        // Keep local UI data when booking notification API is unavailable.
      }
    };

    loadRecentBookings();
    const intervalId = window.setInterval(loadRecentBookings, 20000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
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

  const selectedClient =
    deliveryClients.find((client) => client.id === selectedClientId) ||
    deliveryClients[0] ||
    { id: "", name: "No client yet", services: [], team: [], start: "", status: "Pending", progress: 0, contract: 0, health: "Pending", stage: 0, tasks: [] };
  const selectedFreelancer =
    freelancers.find((f) => f.id === selectedFreelancerId) ||
    freelancers[0] ||
    { id: "", name: "No freelancer yet", initials: "--", specialization: "", rating: 0, rate: 0, availability: "green", activeProjects: 0, utilization: 0, profile: "", projects: [], tasks: [], payments: [] };
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

  const profitability = financialRecords.map((row) => {
    const margin = row.contract > 0 ? Math.round(((row.contract - row.freelancerCost - row.opCost) / row.contract) * 100) : 0;
    return {
      client: row.clientName,
      contract: row.contract,
      freelancerCost: row.freelancerCost,
      opCost: row.opCost,
      margin,
      status: row.status || (margin >= 50 ? "Healthy" : margin >= 30 ? "At Risk" : "Delayed"),
    };
  });

  const revenueTotal = profitability.reduce((sum, row) => sum + row.contract, 0);
  const freelancerTotal = profitability.reduce((sum, row) => sum + row.freelancerCost, 0);
  const opTotal = profitability.reduce((sum, row) => sum + row.opCost, 0);
  const netProfit = revenueTotal - freelancerTotal - opTotal;
  const monthlyRevenue = profitability.length > 0 ? profitability[profitability.length - 1].contract : 0;
  const quarterRevenue = profitability.slice(-3).reduce((sum, row) => sum + row.contract, 0);
  const annualRunRate = monthlyRevenue * 12;
  const financeRevenueCards = [
    { label: "Monthly Revenue", value: monthlyRevenue, delta: `${profitability.length} records` },
    { label: "Quarterly Revenue", value: quarterRevenue, delta: "Last 3 records" },
    { label: "Annual Run Rate", value: annualRunRate, delta: "Projected" },
  ];
  const performanceKpis = [
    { label: "Avg Client Value", value: formatMoney(Math.round(revenueTotal / Math.max(profitability.length, 1))) },
    { label: "LTV", value: formatMoney(Math.round((revenueTotal / Math.max(deliveryClients.length, 1)) * 4)) },
    { label: "CAC", value: formatMoney(Math.round((crmLeads.length * 150) / Math.max(wonLeads, 1))) },
    { label: "Revenue / Client", value: formatMoney(Math.round(revenueTotal / Math.max(deliveryClients.length, 1))) },
  ];
  const bookingAlerts = bookingNotifications.slice(0, 3).map((booking) => ({
    type: "info",
    text: `New booking: ${booking.companyName} (${booking.email})`,
  }));
  const systemAlerts = [
    ...(crmLeads.length === 0 ? [{ type: "warning", text: "No CRM leads yet. Add your first lead." }] : []),
    ...(deliveryClients.length === 0 ? [{ type: "warning", text: "No delivery clients yet. Add a client in Client Delivery." }] : []),
    ...(freelancers.length === 0 ? [{ type: "warning", text: "No freelancers yet. Add freelancer records." }] : []),
  ];
  const dashboardAlerts = [...bookingAlerts, ...systemAlerts].slice(0, 5);
  const notificationCount = dashboardAlerts.length;

  const handleLeadFormChange = (field, value) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!authToken) return;

    try {
      const response = await fetch(API_ENDPOINTS.dashboardClients, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: clientForm.name,
          owner: clientForm.owner,
          contract: Number(clientForm.contract || 0),
          services: clientForm.services.split(",").map((s) => s.trim()).filter(Boolean),
          team: [clientForm.owner],
        }),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }
      if (!response.ok) return;

      const created = await response.json();
      const normalized = {
        ...created,
        id: String(created.id),
        services: Array.isArray(created.services) ? created.services : [],
        team: Array.isArray(created.team) ? created.team : [],
        tasks: Array.isArray(created.tasks) ? created.tasks : [],
        start: created.startDate ? String(created.startDate).slice(0, 10) : "",
      };

      setDeliveryClients((prev) => [normalized, ...prev]);
      setSelectedClientId(normalized.id);
      setClientForm({ name: "", owner: "AL", contract: "", services: "" });
      setSyncMessage("Client added");
    } catch {
      setSyncMessage("Failed to add client");
    }
  };

  const handleAddFreelancer = async (e) => {
    e.preventDefault();
    if (!authToken) return;

    try {
      const response = await fetch(API_ENDPOINTS.dashboardFreelancers, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: freelancerForm.name,
          specialization: freelancerForm.specialization,
          rate: Number(freelancerForm.rate || 0),
          utilization: Number(freelancerForm.utilization || 0),
        }),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }
      if (!response.ok) return;

      const created = await response.json();
      const normalized = {
        ...created,
        id: String(created.id),
        projects: Array.isArray(created.projects) ? created.projects : [],
        tasks: Array.isArray(created.tasks) ? created.tasks : [],
        payments: Array.isArray(created.payments) ? created.payments : [],
      };

      setFreelancers((prev) => [normalized, ...prev]);
      setSelectedFreelancerId(normalized.id);
      setFreelancerForm({ name: "", specialization: "", rate: "", utilization: "" });
      setSyncMessage("Freelancer added");
    } catch {
      setSyncMessage("Failed to add freelancer");
    }
  };

  const handleAddPartner = async (e) => {
    e.preventDefault();
    if (!authToken) return;

    try {
      const response = await fetch(API_ENDPOINTS.dashboardPartners, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(partnerForm),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }
      if (!response.ok) return;

      const created = await response.json();
      setPartners((prev) => [created, ...prev]);
      setPartnerForm({ name: "", category: "", description: "", website: "" });
      setSyncMessage("Partner added");
    } catch {
      setSyncMessage("Failed to add partner");
    }
  };

  const handleAddFinancialRecord = async (e) => {
    e.preventDefault();
    if (!authToken) return;

    try {
      const response = await fetch(API_ENDPOINTS.dashboardFinancials, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          month: financialForm.month,
          clientName: financialForm.clientName,
          contract: Number(financialForm.contract || 0),
          freelancerCost: Number(financialForm.freelancerCost || 0),
          opCost: Number(financialForm.opCost || 0),
        }),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }
      if (!response.ok) return;

      const created = await response.json();
      setFinancialRecords((prev) => [...prev, created]);
      setRevenueTrend((prev) => [...prev, { month: created.month, revenue: created.contract }].slice(-6));
      setLine12Months((prev) => [...prev, { month: created.month, value: created.contract }].slice(-12));
      setFinancialForm({ month: "", clientName: "", contract: "", freelancerCost: "", opCost: "" });
      setSyncMessage("Financial record added");
    } catch {
      setSyncMessage("Failed to add financial record");
    }
  };

  const handleExportFinancialReport = async () => {
    if (!authToken) return;
    setIsExportingReport(true);

    try {
      const response = await fetch(API_ENDPOINTS.dashboardFinancialCsv, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "financial-report.csv";
      a.click();
      window.URL.revokeObjectURL(url);
      setSyncMessage("Report exported");
    } catch {
      setSyncMessage("Export failed");
    } finally {
      setIsExportingReport(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch(API_ENDPOINTS.authLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      const payload = await response.json();
      const token = payload?.token || "";
      const userEmail = payload?.user?.email || loginForm.email;

      if (!token) {
        throw new Error("Login token missing");
      }

      window.localStorage.setItem(AUTH_STORAGE_KEY, token);
      window.localStorage.setItem(`${AUTH_STORAGE_KEY}.email`, userEmail);
      setAuthToken(token);
      setAuthEmail(userEmail);
      setBackendStatus("connected");
      setSyncMessage("Connected to backend");
      setLoginForm((prev) => ({ ...prev, password: "" }));
    } catch {
      setAuthError("Login failed. Check email/password and backend API.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.localStorage.removeItem(`${AUTH_STORAGE_KEY}.email`);
    setAuthToken("");
    setAuthEmail("");
    setBackendStatus("checking");
    setSyncMessage("Disconnected");
    setTeamMembers([]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!authToken) {
      return;
    }

    setIsUpdatingProfile(true);
    try {
      const body = {
        email: profileForm.email,
        currentPassword: profileForm.currentPassword || undefined,
        newPassword: profileForm.newPassword || undefined,
      };

      const response = await fetch(API_ENDPOINTS.authProfile, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("Profile update failed");
      }

      const updated = await response.json();
      const nextEmail = updated.email || profileForm.email;
      setAuthEmail(nextEmail);
      window.localStorage.setItem(`${AUTH_STORAGE_KEY}.email`, nextEmail);
      setProfileForm((prev) => ({ ...prev, currentPassword: "", newPassword: "", email: nextEmail }));
      setSyncMessage("Profile updated");
    } catch {
      setSyncMessage("Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleSendTestNotification = async (e) => {
    e.preventDefault();
    if (!authToken) {
      return;
    }

    setIsSendingTestNotification(true);
    try {
      const response = await fetch(API_ENDPOINTS.notificationsTest, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(notificationForm),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("Notification test failed");
      }

      setSyncMessage("Test notification sent");
    } catch {
      setSyncMessage("Notification system not configured. Update SMTP settings.");
    } finally {
      setIsSendingTestNotification(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      window.localStorage.setItem("smileyos.darkMode", String(next));
      return next;
    });
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newLead),
      });

      if (response.status === 401) {
        handleLogout();
        throw new Error("Unauthorized");
      }

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
            <div className="metric">{formatMoney(monthlyRevenue)}</div>
            <div className="muted">Target: {formatMoney(Math.max(monthlyRevenue, 100000))}</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${Math.min(100, Math.round((monthlyRevenue / Math.max(monthlyRevenue, 100000)) * 100))}%` }} />
            </div>
          </div>
          <div className="card">
            <div className="card-label">Active Clients</div>
            <div className="metric">{deliveryClients.length}</div>
            <div className="muted">From live database records</div>
          </div>
          <div className="card">
            <div className="card-label">Pipeline Value</div>
            <div className="metric">{formatMoney(crmLeads.reduce((sum, lead) => sum + lead.value, 0))}</div>
            <div className="muted">Weighted opportunity value</div>
          </div>
          <div className="card">
            <div className="card-label">Closed This Month</div>
            <div className="metric">{wonLeads} deals</div>
            <div className="muted">Closed won from CRM pipeline</div>
          </div>
          <div className="card">
            <div className="card-label">Avg Client Value</div>
            <div className="metric">{formatMoney(Math.round(revenueTotal / Math.max(deliveryClients.length, 1)))}</div>
            <div className="muted">Monthly recurring average</div>
          </div>
          <div className="card">
            <div className="card-label">Profit Margin</div>
            <div className="metric">{revenueTotal > 0 ? Math.round((netProfit / revenueTotal) * 100) : 0}%</div>
            <div className="muted">Based on financial records</div>
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
              {dashboardAlerts.map((alert) => (
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
              {activeClients.length === 0 ? <div className="muted">No clients yet. Add clients in Client Delivery.</div> : null}
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
        <div className="card">
          <div className="card-title">Add Client Delivery Record</div>
          <form className="modal-grid margin-top-12" onSubmit={handleAddClient}>
            <div className="form-control">
              <label>Client Name</label>
              <input className="form-input" value={clientForm.name} onChange={(e) => setClientForm((prev) => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Owner</label>
              <input className="form-input" value={clientForm.owner} onChange={(e) => setClientForm((prev) => ({ ...prev, owner: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Contract Value</label>
              <input className="form-input" type="number" min="0" value={clientForm.contract} onChange={(e) => setClientForm((prev) => ({ ...prev, contract: e.target.value }))} />
            </div>
            <div className="form-control full-row">
              <label>Services (comma separated)</label>
              <input className="form-input" value={clientForm.services} onChange={(e) => setClientForm((prev) => ({ ...prev, services: e.target.value }))} placeholder="CRM Revamp, Funnel Ops" />
            </div>
            <div className="row gap-8 full-row">
              <button className="btn-primary" type="submit">Add Client</button>
            </div>
          </form>
        </div>

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
          <div className="card-title">Add Freelancer</div>
          <form className="modal-grid margin-top-12" onSubmit={handleAddFreelancer}>
            <div className="form-control">
              <label>Name</label>
              <input className="form-input" value={freelancerForm.name} onChange={(e) => setFreelancerForm((prev) => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Specialization</label>
              <input className="form-input" value={freelancerForm.specialization} onChange={(e) => setFreelancerForm((prev) => ({ ...prev, specialization: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Hourly Rate</label>
              <input className="form-input" type="number" min="0" value={freelancerForm.rate} onChange={(e) => setFreelancerForm((prev) => ({ ...prev, rate: e.target.value }))} />
            </div>
            <div className="form-control">
              <label>Utilization %</label>
              <input className="form-input" type="number" min="0" max="100" value={freelancerForm.utilization} onChange={(e) => setFreelancerForm((prev) => ({ ...prev, utilization: e.target.value }))} />
            </div>
            <div className="row gap-8 full-row">
              <button className="btn-primary" type="submit">Add Freelancer</button>
            </div>
          </form>
        </div>

        {/* ── Team Design Intro ── */}
        <div className="card team-intro-card" style={{ borderLeft: "3px solid #7c3aed" }}>
          <div className="row-between wrap gap-8">
            <div>
              <div className="card-title" style={{ fontSize: 20 }}>Meet Your Execution Team</div>
              <div className="muted" style={{ marginTop: 6, maxWidth: 680, lineHeight: 1.6 }}>
                A curated squad of domain specialists — assembled, managed, and held accountable so you focus on decisions, not logistics. Each member owns a precise lane inside your engagement.
              </div>
            </div>
            <span className="badge badge-success" style={{ fontSize: 13, padding: "6px 14px" }}>
              {freelancers.length} Active Specialists
            </span>
          </div>

          <div className="three-col" style={{ marginTop: 20, gap: 20 }}>
            <div style={{ borderLeft: "2px solid #7c3aed", paddingLeft: 14 }}>
              <div className="metric-sm" style={{ marginBottom: 8 }}>Specialist-First Assembly</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.65 }}>
                Every hire covers a narrow, proven skill — funnel design, CRM engineering, paid media. You get the exact expert for each
                layer of the project, not a generalist stretched thin across deliverables.
              </div>
            </div>
            <div style={{ borderLeft: "2px solid #8b5cf6", paddingLeft: 14 }}>
              <div className="metric-sm" style={{ marginBottom: 8 }}>One Interface, Zero Silos</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.65 }}>
                Designers, engineers, analysts, and media buyers operate inside a shared delivery system — unified KPIs, weekly standups, and a single point of contact on your side.
                No coordination overhead for you.
              </div>
            </div>
            <div style={{ borderLeft: "2px solid #a78bfa", paddingLeft: 14 }}>
              <div className="metric-sm" style={{ marginBottom: 8 }}>Outcome-Tied Accountability</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.65 }}>
                You define the goal. We handle staffing, quality control, and delivery cadence. Every sprint maps to a measurable business result you signed off on — with weekly visibility into what moved.
              </div>
            </div>
          </div>
        </div>

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
        <div className="card">
          <div className="row-between wrap gap-8">
            <div className="card-title">Add Financial Record</div>
            <button className="btn-primary" onClick={handleExportFinancialReport} disabled={isExportingReport}>
              {isExportingReport ? "Exporting..." : "Export Excel Report"}
            </button>
          </div>
          <form className="modal-grid margin-top-12" onSubmit={handleAddFinancialRecord}>
            <div className="form-control">
              <label>Month</label>
              <input className="form-input" value={financialForm.month} onChange={(e) => setFinancialForm((prev) => ({ ...prev, month: e.target.value }))} placeholder="Mar 2026" required />
            </div>
            <div className="form-control">
              <label>Client Name</label>
              <input className="form-input" value={financialForm.clientName} onChange={(e) => setFinancialForm((prev) => ({ ...prev, clientName: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Contract</label>
              <input className="form-input" type="number" min="0" value={financialForm.contract} onChange={(e) => setFinancialForm((prev) => ({ ...prev, contract: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Freelancer Cost</label>
              <input className="form-input" type="number" min="0" value={financialForm.freelancerCost} onChange={(e) => setFinancialForm((prev) => ({ ...prev, freelancerCost: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Ops Cost</label>
              <input className="form-input" type="number" min="0" value={financialForm.opCost} onChange={(e) => setFinancialForm((prev) => ({ ...prev, opCost: e.target.value }))} required />
            </div>
            <div className="row gap-8 full-row">
              <button className="btn-primary" type="submit">Add Financial Record</button>
            </div>
          </form>
        </div>

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
              {profitability.length === 0 ? (
                <tr>
                  <td colSpan={6} className="muted">No financial records yet.</td>
                </tr>
              ) : null}
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

  const saveSiteContent = async (e) => {
    e.preventDefault();

    if (!authToken) {
      setAuthError("Please login first.");
      return;
    }

    setIsSavingContent(true);
    try {
      const response = await fetch(API_ENDPOINTS.contentSite, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          heroTitle: siteContent.heroTitle,
          heroSubtitle: siteContent.heroSubtitle,
          aboutTitle: siteContent.aboutTitle,
          aboutParagraph: siteContent.aboutParagraph,
          aboutHighlights: siteContent.aboutHighlights
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        }),
      });

      if (response.status === 401) {
        handleLogout();
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        throw new Error("Unable to save content");
      }

      setSyncMessage("Website content updated");
      setBackendStatus("connected");
    } catch {
      setSyncMessage("Could not save website content");
    } finally {
      setIsSavingContent(false);
    }
  };

  const addTeamMember = async (e) => {
    e.preventDefault();

    if (!authToken) {
      setAuthError("Please login first.");
      return;
    }

    setIsSavingTeamMember(true);
    try {
      const response = await fetch(API_ENDPOINTS.contentTeam, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ...teamForm,
          displayOrder: Number(teamForm.displayOrder || 0),
          active: true,
        }),
      });

      if (response.status === 401) {
        handleLogout();
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        throw new Error("Unable to add team member");
      }

      const payload = await response.json();
      setTeamMembers((prev) => [...prev, payload].sort((a, b) => a.displayOrder - b.displayOrder));
      setTeamForm({
        name: "",
        role: "",
        specialty: "",
        bio: "",
        imageUrl: "",
        color: "#7A5CFF",
        displayOrder: 0,
      });
      setSyncMessage("Team member added");
    } catch {
      setSyncMessage("Unable to add team member");
    } finally {
      setIsSavingTeamMember(false);
    }
  };

  const removeTeamMember = async (id) => {
    if (!authToken) {
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINTS.contentTeam}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        return;
      }

      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
      setSyncMessage("Team member removed");
    } catch {
      setSyncMessage("Failed to remove team member");
    }
  };

  const renderWebsiteContent = () => {
    return (
      <div className="module-stack">
        <div className="card">
          <div className="card-title">Main Website Content</div>
          <p className="muted">Changes here update the hero and about sections of your public site.</p>
          <form className="modal-grid margin-top-12" onSubmit={saveSiteContent}>
            <div className="form-control full-row">
              <label>Hero Title</label>
              <input className="form-input" value={siteContent.heroTitle} onChange={(e) => setSiteContent((prev) => ({ ...prev, heroTitle: e.target.value }))} required />
            </div>
            <div className="form-control full-row">
              <label>Hero Subtitle</label>
              <textarea rows={3} value={siteContent.heroSubtitle} onChange={(e) => setSiteContent((prev) => ({ ...prev, heroSubtitle: e.target.value }))} />
            </div>
            <div className="form-control">
              <label>About Title</label>
              <input className="form-input" value={siteContent.aboutTitle} onChange={(e) => setSiteContent((prev) => ({ ...prev, aboutTitle: e.target.value }))} />
            </div>
            <div className="form-control full-row">
              <label>About Paragraph</label>
              <textarea rows={4} value={siteContent.aboutParagraph} onChange={(e) => setSiteContent((prev) => ({ ...prev, aboutParagraph: e.target.value }))} />
            </div>
            <div className="form-control full-row">
              <label>About Highlights (one line each)</label>
              <textarea rows={5} value={siteContent.aboutHighlights} onChange={(e) => setSiteContent((prev) => ({ ...prev, aboutHighlights: e.target.value }))} />
            </div>
            <div className="row gap-8 full-row">
              <button className="btn-primary" type="submit" disabled={isSavingContent}>{isSavingContent ? "Saving..." : "Save Website Content"}</button>
            </div>
          </form>
        </div>

        <div className="card">
          <div className="card-title">Team Members (with Image URL)</div>
          <p className="muted">Add, reorder, and remove team profiles shown on homepage and about page.</p>

          <form className="modal-grid margin-top-12" onSubmit={addTeamMember}>
            <div className="form-control">
              <label>Name</label>
              <input className="form-input" value={teamForm.name} onChange={(e) => setTeamForm((prev) => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Role</label>
              <input className="form-input" value={teamForm.role} onChange={(e) => setTeamForm((prev) => ({ ...prev, role: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Specialty</label>
              <input className="form-input" value={teamForm.specialty} onChange={(e) => setTeamForm((prev) => ({ ...prev, specialty: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Display Order</label>
              <input className="form-input" type="number" min="0" value={teamForm.displayOrder} onChange={(e) => setTeamForm((prev) => ({ ...prev, displayOrder: Number(e.target.value || 0) }))} />
            </div>
            <div className="form-control full-row">
              <label>Profile Bio</label>
              <textarea rows={3} value={teamForm.bio} onChange={(e) => setTeamForm((prev) => ({ ...prev, bio: e.target.value }))} required />
            </div>
            <div className="form-control full-row">
              <label>Image URL (optional)</label>
              <input className="form-input" value={teamForm.imageUrl} onChange={(e) => setTeamForm((prev) => ({ ...prev, imageUrl: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="row gap-8 full-row">
              <button className="btn-primary" type="submit" disabled={isSavingTeamMember}>{isSavingTeamMember ? "Adding..." : "Add Team Member"}</button>
            </div>
          </form>

          <div className="table-wrap margin-top-12">
            <table className="table compact">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.displayOrder}</td>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                    <td>{member.imageUrl ? "Yes" : "No"}</td>
                    <td>
                      <button className="btn-ghost" onClick={() => removeTeamMember(member.id)} type="button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Partners</div>
          <p className="muted">Add your partner organizations from dashboard data.</p>
          <form className="modal-grid margin-top-12" onSubmit={handleAddPartner}>
            <div className="form-control">
              <label>Name</label>
              <input className="form-input" value={partnerForm.name} onChange={(e) => setPartnerForm((prev) => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className="form-control">
              <label>Category</label>
              <input className="form-input" value={partnerForm.category} onChange={(e) => setPartnerForm((prev) => ({ ...prev, category: e.target.value }))} required />
            </div>
            <div className="form-control full-row">
              <label>Description</label>
              <textarea rows={3} value={partnerForm.description} onChange={(e) => setPartnerForm((prev) => ({ ...prev, description: e.target.value }))} required />
            </div>
            <div className="form-control full-row">
              <label>Website</label>
              <input className="form-input" value={partnerForm.website} onChange={(e) => setPartnerForm((prev) => ({ ...prev, website: e.target.value }))} />
            </div>
            <div className="row gap-8 full-row">
              <button className="btn-primary" type="submit">Add Partner</button>
            </div>
          </form>

          <div className="table-wrap margin-top-12">
            <table className="table compact">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner.id}>
                    <td>{partner.name}</td>
                    <td>{partner.category}</td>
                    <td>{partner.website || "-"}</td>
                  </tr>
                ))}
                {partners.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="muted">No partners yet.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  };

  const renderProfile = () => {
    return (
      <div className="module-stack">
        <div className="card">
          <div className="card-title">My Account</div>
          <p className="muted">Update your login email and password.</p>
          <form className="modal-grid margin-top-12" onSubmit={handleUpdateProfile}>
            <div className="form-control full-row">
              <label>Email</label>
              <input
                className="form-input"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="form-control">
              <label>Current Password</label>
              <input
                className="form-input"
                type="password"
                value={profileForm.currentPassword}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Required only when changing password"
              />
            </div>
            <div className="form-control">
              <label>New Password</label>
              <input
                className="form-input"
                type="password"
                value={profileForm.newPassword}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                placeholder="At least 8 characters"
              />
            </div>
            <div className="row gap-8 full-row">
              <button className="btn-primary" type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <div className="card-title">Notification System Test</div>
          <p className="muted">Send a test email to verify SMTP is working in production.</p>
          <form className="modal-grid margin-top-12" onSubmit={handleSendTestNotification}>
            <div className="form-control full-row">
              <label>Recipient Email</label>
              <input
                className="form-input"
                type="email"
                value={notificationForm.to}
                onChange={(e) => setNotificationForm((prev) => ({ ...prev, to: e.target.value }))}
                placeholder="Leave empty to use MAIL_TO"
              />
            </div>
            <div className="form-control full-row">
              <label>Subject</label>
              <input
                className="form-input"
                value={notificationForm.subject}
                onChange={(e) => setNotificationForm((prev) => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            <div className="form-control full-row">
              <label>Message</label>
              <textarea
                rows={3}
                value={notificationForm.message}
                onChange={(e) => setNotificationForm((prev) => ({ ...prev, message: e.target.value }))}
              />
            </div>
            <div className="row gap-8 full-row">
              <button className="btn-primary" type="submit" disabled={isSendingTestNotification}>
                {isSendingTestNotification ? "Sending..." : "Send Test Notification"}
              </button>
            </div>
          </form>
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
    if (activeModule === "Website Content") return renderWebsiteContent();
    if (activeModule === "Profile") return renderProfile();
    return renderFinancials();
  };

  if (!authReady) {
    return <div className="smiley-os-root loading-shell" />;
  }

  if (!authToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#1e1e1e] bg-[#111111] p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">SMILEY OS Login</h1>
          <p className="text-sm text-[#b5b5c3] mb-6">Login to access the production dashboard and protected API data.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#b5b5c3] mb-1">Email</label>
              <input
                className="w-full rounded-lg border border-[#1e1e1e] bg-[#0f0f0f] px-3 py-2 text-white outline-none focus:border-[#7c3aed]"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#b5b5c3] mb-1">Password</label>
              <input
                className="w-full rounded-lg border border-[#1e1e1e] bg-[#0f0f0f] px-3 py-2 text-white outline-none focus:border-[#7c3aed]"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            {authError ? <p className="text-sm text-[#ef4444]">{authError}</p> : null}

            <button
              className="w-full rounded-lg bg-[#7c3aed] hover:bg-[#8b5cf6] transition-colors px-4 py-2 font-semibold"
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`smiley-os-root${!darkMode ? " light" : ""}`}>
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

        /* ── LIGHT MODE ── */
        .smiley-os-root.light {
          --bg: #f0f0f6;
          --surface: #ffffff;
          --border: #e2e4ec;
          --text: #111827;
          --muted: #6b7280;
          background:
            radial-gradient(circle at 88% 10%, rgba(124, 58, 237, 0.07), transparent 42%),
            radial-gradient(circle at 8% 80%, rgba(139, 92, 246, 0.04), transparent 38%),
            var(--bg);
        }
        .smiley-os-root.light .os-sidebar {
          background: #ffffff;
        }
        .smiley-os-root.light .topbar {
          background: #ffffff;
          border-bottom: 1px solid var(--border);
        }
        .smiley-os-root.light .card {
          box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.08), 0 2px 10px rgba(0, 0, 0, 0.06);
        }
        .smiley-os-root.light .client-mini,
        .smiley-os-root.light .lead-card,
        .smiley-os-root.light .sop-card,
        .smiley-os-root.light .alert-row,
        .smiley-os-root.light .step {
          background: #f5f5fb;
        }
        .smiley-os-root.light .kanban-col,
        .smiley-os-root.light .task-col {
          background: #f3f3f9;
        }
        .smiley-os-root.light .sync-pill {
          background: #f0f0f5;
        }
        .smiley-os-root.light .count-pill {
          background: #eaeaef;
          border-color: var(--border);
          color: var(--text);
        }
        .smiley-os-root.light .progress-track,
        .smiley-os-root.light .tiny-progress {
          background: #e2e4ec;
        }
        .smiley-os-root.light .modal {
          background: #ffffff;
          box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.1), 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        .smiley-os-root.light .modal-backdrop {
          background: rgba(0, 0, 0, 0.3);
        }
        .smiley-os-root.light .avatar-chip {
          background: #f0f0f5;
          border-color: var(--border);
        }
        .smiley-os-root.light .paragraph,
        .smiley-os-root.light .list,
        .smiley-os-root.light .ol-list {
          color: #374151;
        }
        .smiley-os-root.light input,
        .smiley-os-root.light select,
        .smiley-os-root.light textarea {
          background: #f5f5fb;
          color: var(--text);
          border-color: var(--border);
        }
        .smiley-os-root.light .side-btn {
          color: #374151;
        }
        .smiley-os-root.light .side-btn:hover,
        .smiley-os-root.light .side-btn.active {
          background: rgba(124, 58, 237, 0.08);
          color: #7c3aed;
        }
        .smiley-os-root.light .team-intro-card {
          background: linear-gradient(135deg, rgba(124,58,237,0.05) 0%, #ffffff 60%);
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
              <span className="sync-pill connected">{authEmail || "CRM Admin"}</span>
              <button className="btn-ghost" onClick={handleLogout}>Logout</button>
              <button className="btn-icon" onClick={toggleDarkMode} aria-label="Toggle theme" title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className="notification">
                <Bell size={16} />
                <span className="badge-count">{notificationCount}</span>
              </div>
              <button className="avatar" onClick={() => setActiveModule("Profile")} title="Open profile">
                AD
              </button>
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
