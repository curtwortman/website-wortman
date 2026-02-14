# PLAN.md - GSD (Git-Shit-Done) Implementation Workflow

**Refactored for maximum AI agent velocity using Git worktrees, `/gsd` commands, and parallel execution.** Every feature executes independently in isolated worktrees with automated verification against PRD.md criteria.

## 🎛️ **GSD Workflow Structure**

```text
REPO ROOT (main - protected)
├── worktrees/
│   ├── hero-foundation/           # GSD Agent 1
│   ├── project-cards/            # GSD Agent 2
│   ├── glassmorphism-system/     # GSD Agent 3
│   ├── keycloak-auth/            # GSD Agent 4
│   ├── testimonial-marquee/      # GSD Agent 5
│   ├── admin-dashboard/          # GSD Agent 6
│   └── production-optimization/  # GSD Agent 7
```

## 🚀 **GSD EXECUTION COMMANDS**

### **1. Worktree Initialization**

```bash
# Create worktree for each P0 feature (parallel execution)

git worktree add ../edu-hero hero-foundation
git worktree add ../edu-cards project-cards
git worktree add ../edu-glass glassmorphism-system
cd ../edu-hero && /gsd:plan
```

### **2. Agent Task Template** (Copy-paste for each worktree)

```text
/gsd:plan
Reference: PRD.md#Hero-3D-Tilt-Card, STYLE.md#Glassmorphism, FRONTEND.md#Hero-Section

SPEC:
- Hero renders cosmic black #0a0a0f background
- 60fps shooting stars (STYLE.md exact config)
- 3D tilt card max:25° speed:400ms (STYLE.md validated)
- Typewriter headline "Premium AMD GPU Solutions"
- Mobile: tilt disabled <768px

EXECUTE:
1. Copy FRONTEND.md HTML boilerplate
2. Implement STYLE.md CSS custom properties
3. Add Particles.js shooting stars canvas
4. Create hero 3D tilt card
5. Initialize VanillaTilt.js (STYLE.md config)

/gsd:verify-work
```

## 🗂️ **Worktree Task Matrix**

| Worktree          | GSD Agent | PRD Reference            | Success Criteria             | Docs                       |
| :---------------- | :-------- | :----------------------- | :--------------------------- | :------------------------- |
| `hero-foundation` | Agent 1   | Hero 3D Tilt ⭐⭐⭐⭐⭐  | 60fps hero + tilt verified   | FRONTEND.md\#Hero          |
| `project-cards`   | Agent 2   | Course Cards ⭐⭐⭐      | 6 AMD cards + GSAP scroll    | COMPONENTS.md\#CourseCard  |
| `glassmorphism`   | Agent 3   | Glassmorphism ⭐⭐⭐⭐⭐ | rgba(255,255,255,0.08) exact | STYLE.md\#Glassmorphism    |
| `shooting-stars`  | Agent 4   | Background ⭐⭐⭐⭐⭐    | 60 particles \#fbbf24 60fps  | FRONTEND.md\#ShootingStars |
| `auth-overlay`    | Agent 5   | Secure Admin ⭐⭐⭐⭐⭐  | Pulsing button + modal       | COMPONENTS.md\#SecureLogin |
| `testimonials`    | Agent 6   | Testimonials ⭐⭐⭐      | 32s marquee hover-pause      | FRONTEND.md\#Marquee       |
| `admin-crud`      | Agent 7   | Admin Panel              | /api/admin/projects POST     | BACKEND.md\#Admin          |

## ⚙️ **GSD Workflow Per Worktree**

```text
1. cd [worktree-name]
2. /gsd:plan "Implement [feature] per PRD.md#[section]"
3. Agent executes → git commit -m "WIP: [feature] checkpoint 1"
4. /gsd:verify-work → Automated PRD criteria check
5. git commit -m "feat: [feature] complete ✓ PRD.md#[section]"
6. cd ../../ && git worktree remove [worktree-name]
7. git merge [worktree-branch] --no-ff
```

## 📋 **Worktree Execution Priority** (Parallel)

```text
HIGH PRIORITY (P0 - Execute Immediately):
☐ hero-foundation        → PRD.md#Hero-3D-Tilt-Card ⭐⭐⭐⭐⭐
☐ glassmorphism-system  → PRD.md#Glassmorphism ⭐⭐⭐⭐⭐
☐ shooting-stars        → PRD.md#Shooting-Stars ⭐⭐⭐⭐⭐

MEDIUM PRIORITY (P1 - After P0):
☐ project-cards         → PRD.md#Course-Project-Cards ⭐⭐⭐
☐ auth-overlay          → PRD.md#Secure-Admin ⭐⭐⭐⭐⭐
☐ testimonial-marquee   → PRD.md#Testimonials ⭐⭐⭐

LOW PRIORITY (P2 - After P1):
☐ admin-dashboard       → PRD.md#Admin-Analytics ⭐⭐⭐⭐
☐ production-optimization → PRD.md#Performance 95+
```

## 🎯 **GSD Verification Commands**

```text
/gsd:verify-work hero-foundation
Checklist:
- [ ] #0a0a0f cosmic black background (STYLE.md)
- [ ] Particles.js 60 particles #fbbf24 (FRONTEND.md)
- [ ] VanillaTilt max:25 speed:400 (STYLE.md)
- [ ] Lighthouse Performance >90
- [ ] No console errors
- [ ] Mobile tilt disabled <768px

Result: PASS/FAIL → Merge or iterate
```

## 🚀 **Parallel Agent Coordination**

```text
AGENT ASSIGNMENTS (Execute Simultaneously):

Agent 1 → hero-foundation
/gsd:plan "PRD.md#Hero + STYLE.md#Hero-H1 + FRONTEND.md#3D-Tilt"

Agent 2 → glassmorphism-system
/gsd:plan "STYLE.md#Glassmorphism exact rgba values + hover states"

Agent 3 → shooting-stars
/gsd:plan "FRONTEND.md#Shooting-Stars 60fps 60 particles #fbbf24"

INDEPENDENT EXECUTION → git commit checkpoints → /gsd:verify → merge
```

## 📁 **Worktree File Structure Template**

```text
edu-hero/
├── index.html              # FRONTEND.md boilerplate
├── style.css              # STYLE.md custom properties
├── components/
│   └── hero-tilt-card.html # COMPONENTS.md GlassCard
├── js/
│   ├── particles.js       # Shooting stars
│   └── typewriter.js      # Hero headline
└── README.md              # GSD verification checklist
```

## ✅ **Merge Criteria** (Per Worktree)

```text
WORKTREE MERGE WHEN:
/gsd:verify-work PASSES all criteria
Lighthouse Performance ≥90
STYLE.md visual specs validated
Zero console errors/warnings
Mobile responsive (<768px verified)
Cross-browser (Chrome/Firefox/Safari)
Peer agent review complete
```

## 🎬 **Execution Sequence**

```bash
# 1. Initialize all worktrees (5 minutes)

git worktree add ../edu-hero hero-foundation
git worktree add ../edu-glass glassmorphism-system
# ... 7 total worktrees

# 2. Agents execute in parallel (hours)

cd ../edu-hero && /gsd:plan && /gsd:execute
cd ../edu-glass && /gsd:plan && /gsd:execute
# All agents run simultaneously

# 3. Verify + merge serially (minutes per worktree)

cd repo-root
/gsd:verify-work hero-foundation && git merge hero-foundation
/gsd:verify-work glassmorphism-system && git merge glassmorphism-system
```

## 🎉 **Completion Signal**

```text
ALL WORKTREES MERGED WHEN:
✅ 7/7 worktrees pass /gsd:verify-work
✅ Lighthouse Performance 95+
✅ PRD.md P0 features complete (5⭐ items)
✅ DEPLOY.md production playbook passes
✅ Site matches YouTube demo visuals

gsd-complete: Production deployment ready
```

**This GSD-refactored PLAN.md eliminates Scrum overhead** using git worktrees for true parallel AI agent execution with `/gsd:plan → /gsd:execute → /gsd:verify-work → merge` workflow achieving maximum velocity while guaranteeing PRD.md compliance through automated verification.
