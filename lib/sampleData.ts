export interface PresetScenario {
  id: string;
  category: string;
  tag: string;
  decision: string;
  currentThinking: string;
  context: string;
  constraints: string;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: "career-choice",
    category: "Career Choice",
    tag: "High Stakes",
    decision:
      "Should I choose a higher-paying job or a role with better long-term learning opportunities?",
    currentThinking:
      "I am currently leaning toward the learning role because I want to build deep technical and architecture skills that will compound over the next decade.",
    context:
      "I received an offer from a mature enterprise with 35% higher base salary but repetitive legacy maintenance. The second offer is from a fast-growing Series B team with high-caliber mentors, but higher workload and lower starting pay.",
    constraints:
      "I have modest debt requiring predictable payments, 6 months of emergency savings, and no dependents yet.",
  },
  {
    id: "college-education",
    category: "College / Education",
    tag: "Life Direction",
    decision:
      "Should I choose a familiar college close to home or move away for a potentially stronger opportunity?",
    currentThinking:
      "I am leaning toward moving away to the higher-ranked institution because of its national research facilities and broader alumni network.",
    context:
      "The college close to home offers a full scholarship and strong local family support. The out-of-state university is nationally ranked in the top 10 for my discipline, but requires loans and complete independence.",
    constraints:
      "Maximum tolerable loan ceiling of $20,000; need to maintain psychological health without my immediate family nearby.",
  },
  {
    id: "personal-purchase",
    category: "Personal Purchase",
    tag: "Financial Trade-off",
    decision:
      "Should I spend my savings on an expensive upgrade now or keep the money for future needs?",
    currentThinking:
      "I am leaning toward making the workstation and hardware upgrade now because I believe it will immediately eliminate friction in my daily workflow.",
    context:
      "The hardware setup costs $3,800, representing 40% of my liquid emergency savings. My current machine still functions but experiences thermal throttling and sluggish build times during large projects.",
    constraints:
      "Must retain at least 3 months of emergency expenses; freelance income has been slightly volatile over the last quarter.",
  },
];
