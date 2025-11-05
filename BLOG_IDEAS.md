# Blog Post Ideas

## 1. SST Series - Deploying NestJS to AWS

### Overview
Document the journey of learning and using SST (Serverless Stack) to deploy NestJS applications to AWS with real infrastructure (Postgres, SQS, Lambda).

### Planned Posts

#### Post 1: "Getting Started with SST: Deploying NestJS to AWS"
- **Goal:** Deploy a simple NestJS API with Postgres
- **Topics:**
  - Why SST? (The deployment problem)
  - Setting up SST
  - Creating a basic NestJS app
  - Adding RDS Postgres
  - First deployment
  - Live Lambda development
- **Outcome:** Working API deployed to AWS

#### Post 2: "Adding SQS and Background Jobs to My SST App"
- **Goal:** Add queue-based background processing
- **Topics:**
  - Creating SQS queue with SST
  - Lambda consumer function
  - Triggering jobs from NestJS
  - Processing jobs in Lambda
  - Error handling and retries
- **Outcome:** Full async job processing system

#### Post 3: "Taking My SST App to Production"
- **Goal:** Production-ready setup
- **Topics:**
  - Environment management (dev/staging/prod)
  - Database migrations
  - Secrets management
  - Monitoring and logging
  - Custom domains
  - CI/CD pipeline
  - Cost optimization
- **Outcome:** Production deployment checklist

#### Post 4: "SST After 30 Days: Was It Worth It?"
- **Goal:** Honest reflection and comparison
- **Topics:**
  - What worked well
  - What didn't work
  - Cost analysis (actual bills)
  - SST vs Railway vs Vercel vs traditional AWS
  - When to use SST
  - When NOT to use SST
  - Lessons learned
- **Outcome:** Decision framework for deployment choices

---

## 2. State Management in Frontend - Do We Really Need It?

### Overview
A critical look at state management libraries (Redux, Zustand, Pinia, etc.) and the question: are we overcomplicating things?

### Possible Angles

#### Option A: "I Stopped Using State Management Libraries - Here's Why"
- **Thesis:** Most apps don't need Redux/Zustand/etc.
- **Topics:**
  - What problem do state management libraries solve?
  - When you actually need them (rare cases)
  - What you can use instead:
    - React Context (for React)
    - Component state
    - URL state (underrated!)
    - Server state (React Query, SWR)
  - Real examples: before/after removing state library
  - When you DO need a state library
- **Outcome:** Decision framework for state management

#### Option B: "The State Management Ladder: From Simple to Complex"
- **Level 0:** Component state (useState)
- **Level 1:** Lifting state up
- **Level 2:** Context API / Provide/Inject
- **Level 3:** URL state (query params, route params)
- **Level 4:** Server state libraries (React Query, SWR)
- **Level 5:** State management libraries (Redux, Zustand, Pinia)
- **Thesis:** Most apps should stop at Level 2-4
- **Show:** Real examples at each level
- **Outcome:** Know when to graduate to next level

#### Option C: "State Management in 2025: What Actually Matters"
- **The Evolution:**
  - 2015: Redux everywhere
  - 2020: Context API + hooks
  - 2025: Server state vs client state
- **The Shift:**
  - Most "state" is actually server data
  - React Query/SWR handle that better
  - True client state is minimal
- **Examples:**
  - Shopping cart (client state? or server state?)
  - User preferences (local storage? server?)
  - Form state (controlled? uncontrolled?)
  - Modal open/closed (URL? component state?)
- **Outcome:** Rethink what "state management" means

#### Option D: "I Built the Same App 3 Ways: Redux vs Context vs No Store"
- **The App:** Something realistic (todo app is boring, maybe a simple dashboard)
- **Implementation 1:** Redux (traditional approach)
- **Implementation 2:** Context API
- **Implementation 3:** No global state (component state + React Query)
- **Compare:**
  - Lines of code
  - Complexity
  - Performance
  - Developer experience
  - Maintainability
- **Outcome:** Visual proof of what's needed vs overkill

### Key Points to Make
- **Server state ≠ Client state** (this is the key insight)
- **URL is underrated state storage**
- **Most apps have very little true client state**
- **State management libraries are not inherently bad, just often unnecessary**
- **Start simple, add complexity only when needed**

### Potential Controversy (Good for Engagement)
- "Redux is overkill for 90% of apps"
- "If you're using a state library for server data, you're doing it wrong"
- "The best state management is no state management"

---

## Notes

### Writing Approach
- **Document as you go** (authentic, real problems)
- **Show failures** (not just successes)
- **Be opinionated** (but explain reasoning)
- **Include code examples** (real, working code)
- **Cost transparency** (actual numbers)

### Publishing Strategy
- Write drafts as you work
- Don't wait for perfection
- Publish incrementally
- Update posts with learnings

### Success Metrics
- Did it help someone solve a real problem?
- Did you learn something by writing it?
- Would you reference this post yourself later?

---

## 3. Zone.js and Angular - Why It's Being Removed

### Overview
Angular is moving away from Zone.js for change detection. This is a fundamental shift in how Angular works and reflects broader trends in frontend frameworks.

### Possible Angles

#### Option A: "Angular is Removing Zone.js - Here's What That Means"
- **What is Zone.js?**
  - Automatic change detection magic
  - Monkey-patches async operations
  - How it works under the hood
- **Why Angular used it:**
  - Developer convenience
  - "It just works" approach
  - No manual change detection
- **Why they're removing it:**
  - Performance overhead
  - Bundle size (Zone.js is heavy)
  - Debugging complexity
  - Modern alternatives exist
  - Signals-based reactivity
- **What replaces it:**
  - Angular Signals
  - OnPush change detection
  - Manual change detection
- **What this means for developers:**
  - Migration path
  - New mental model
  - Performance benefits
- **Outcome:** Understanding the shift

#### Option B: "Zone.js: The Magic That Became a Problem"
- **The Promise:** Automatic change detection
- **The Reality:**
  - Performance cost
  - Hard to debug
  - Monkey-patching is fragile
  - Bundle bloat
- **The Lesson:**
  - Magic has a cost
  - Explicit > Implicit (eventually)
  - Framework maturity means removing magic
- **The Trend:**
  - React: removed mixins, added hooks
  - Vue: Composition API over Options API
  - Angular: Signals over Zone.js
  - **Pattern:** Frameworks move toward explicitness
- **Outcome:** Broader insight about framework evolution

#### Option C: "I Removed Zone.js from My Angular App - Here's What Happened"
- **The Setup:** Existing Angular app with Zone.js
- **The Migration:**
  - Step-by-step process
  - What broke
  - How to fix it
  - Converting to Signals
- **The Results:**
  - Bundle size comparison
  - Performance metrics
  - Developer experience
  - Was it worth it?
- **Outcome:** Practical migration guide

#### Option D: "Change Detection Wars: Zone.js vs Signals vs Virtual DOM"
- **Compare approaches:**
  - **Angular (old):** Zone.js (automatic)
  - **Angular (new):** Signals (reactive)
  - **React:** Virtual DOM diffing
  - **Vue:** Reactive proxies
  - **Svelte:** Compile-time
- **Trade-offs:**
  - Performance
  - Developer experience
  - Bundle size
  - Debugging
  - Learning curve
- **Why the shift matters:**
  - Industry moving toward fine-grained reactivity
  - Signals are the new pattern (Solid, Vue, Angular)
- **Outcome:** Understanding modern reactivity patterns

### Key Points to Make
- **Zone.js was innovative but had costs**
- **Automatic magic → Performance trade-offs**
- **Signals are the future** (not just Angular)
- **This reflects framework maturity** (removing early decisions)
- **Explicit control > Implicit magic** (for performance-critical apps)

### Connection to State Management Post
Both posts share a theme:
- **Questioning "magic" solutions**
- **Explicit > Implicit**
- **Do we really need this complexity?**
- **Performance vs convenience trade-offs**

Could be a series: "Rethinking Frontend Conventions"
1. State management stores
2. Zone.js and change detection
3. (Future ideas?)

### Technical Depth
- Show actual Zone.js code (monkey-patching)
- Show Signals code (new approach)
- Performance benchmarks
- Bundle size comparisons
- Migration examples

### Potential Controversy (Good for Engagement)
- "Zone.js was a mistake" (provocative but defensible)
- "Angular is finally catching up to React/Vue"
- "Automatic change detection is an anti-pattern"

---

## Potential Series: "Rethinking Frontend Conventions"

### Theme
Questioning common practices and "best practices" in frontend development.

### Posts
1. **State Management:** Do we really need stores?
2. **Zone.js:** Why automatic change detection is going away
3. **TypeScript:** When is it overkill? (controversial!)
4. **Testing:** Are we testing the wrong things?
5. **Build Tools:** Do we need all this complexity?

### Approach
- **Opinionated but reasoned**
- **Show trade-offs, not absolutes**
- **Real examples and data**
- **Acknowledge when conventional wisdom is right**
- **Focus on helping people make informed decisions**

---

## 4. The Rise of Svelte - What It Means for JavaScript

### Overview
Svelte's growth is remarkable - from niche framework to serious contender. It represents a fundamental shift in how we think about frontend frameworks: compile-time vs runtime.

### Possible Angles

#### Option A: "Why Svelte is Winning (And What React/Vue Can Learn)"
- **What makes Svelte different:**
  - No virtual DOM
  - Compile-time framework (not runtime)
  - Write less code
  - No runtime overhead
  - Truly reactive (not hooks, not proxies)
- **The numbers:**
  - GitHub stars growth
  - npm downloads trend
  - State of JS satisfaction scores
  - Companies using it
- **Why it's resonating:**
  - Developer experience (less boilerplate)
  - Performance (no framework in bundle)
  - Simplicity (closer to vanilla JS)
  - Fresh perspective (not React-like)
- **What other frameworks are learning:**
  - React: Server Components (moving logic to compile-time)
  - Vue: Vapor mode (compile-time optimization)
  - Angular: Signals (fine-grained reactivity)
  - **Pattern:** Everyone is moving toward Svelte's ideas
- **Outcome:** Understanding the compile-time revolution

#### Option B: "I Rewrote My App in Svelte - Here's What Surprised Me"
- **The Setup:** Existing React/Vue app
- **The Rewrite:** Same app in Svelte
- **The Surprises:**
  - How much less code
  - How much faster
  - What was easier
  - What was harder
  - Missing ecosystem pieces
- **The Metrics:**
  - Bundle size comparison
  - Performance benchmarks
  - Development time
  - Lines of code
- **The Verdict:**
  - When to choose Svelte
  - When to stick with React/Vue
  - The trade-offs
- **Outcome:** Practical comparison with real data

#### Option C: "Svelte, Solid, and the Compile-Time Future"
- **The Shift:**
  - **Old way:** Runtime frameworks (React, Vue, Angular)
  - **New way:** Compile-time frameworks (Svelte, Solid)
- **Compare approaches:**
  - **React:** Virtual DOM, runtime reconciliation
  - **Vue:** Reactive proxies, runtime reactivity
  - **Svelte:** Compile to vanilla JS, no runtime
  - **Solid:** Fine-grained reactivity, minimal runtime
- **The trend:**
  - Frameworks are getting smaller
  - More work at build time, less at runtime
  - Better performance by default
- **Why now?**
  - Build tools are fast enough (Vite, esbuild)
  - Developers want performance
  - Users want fast apps
  - Bundle size matters (mobile)
- **The future:**
  - Will React/Vue survive?
  - Is compile-time the endgame?
  - What comes after Svelte?
- **Outcome:** Understanding where frontend is heading

#### Option D: "Svelte's Secret Weapon: It's Just JavaScript"
- **The Problem with Modern Frameworks:**
  - React: JSX + hooks + special rules
  - Vue: Template syntax + Composition API
  - Angular: TypeScript + decorators + RxJS
  - **Learning curve is steep**
- **Svelte's Approach:**
  - HTML is HTML
  - CSS is CSS
  - JavaScript is (mostly) JavaScript
  - Minimal new concepts
- **Show examples:**
  - Same component in React vs Svelte
  - State management comparison
  - Event handling comparison
  - Conditional rendering comparison
- **The Appeal:**
  - Easier to learn
  - Easier to read
  - Less "framework-specific" knowledge
  - Closer to web standards
- **The Catch:**
  - It's still a framework
  - Compile step is magic
  - Smaller ecosystem
- **Outcome:** Why simplicity wins

### Key Points to Make
- **Svelte represents a paradigm shift** (compile-time vs runtime)
- **Other frameworks are copying Svelte's ideas** (validation of approach)
- **Performance + DX is a winning combination**
- **Less code = less bugs = happier developers**
- **The pendulum is swinging back to simplicity**

### Connection to Other Posts
This ties into the "Rethinking Frontend Conventions" series:
- **State Management:** Svelte has built-in stores (simple, effective)
- **Zone.js:** Svelte doesn't need change detection (it's compiled)
- **Reactivity:** Svelte's approach is the simplest (just assignments)

### Data to Include
- **State of JS 2024 results**
- **npm download trends** (Svelte vs React vs Vue)
- **Bundle size comparisons**
- **Performance benchmarks**
- **GitHub stars growth**
- **Job market trends** (is it viable for work?)

### Potential Controversy (Good for Engagement)
- "Svelte is what React should have been"
- "The Virtual DOM was a mistake" (Svelte's creator said this)
- "In 5 years, we'll all be using compile-time frameworks"
- "React is the new jQuery" (provocative!)

### Balanced Take
- Svelte isn't perfect (smaller ecosystem, less jobs)
- React/Vue aren't going away soon
- Different tools for different needs
- But the trend is clear: simpler, faster, compile-time

---

## Updated Series: "Rethinking Frontend Conventions"

### Posts
1. **State Management:** Do we really need stores?
2. **Zone.js:** Why automatic change detection is going away
3. **The Rise of Svelte:** Why compile-time frameworks are winning
4. **TypeScript:** When is it overkill? (controversial!)
5. **Testing:** Are we testing the wrong things?

### Narrative Arc
- **Post 1-2:** Questioning complexity in existing frameworks
- **Post 3:** Showing the alternative (Svelte's simplicity)
- **Post 4-5:** Broader questions about frontend practices

### Theme
The frontend world is moving toward:
- ✅ Less runtime overhead
- ✅ More compile-time optimization
- ✅ Simpler APIs
- ✅ Less magic
- ✅ Better performance by default

Svelte embodies all of these trends.

