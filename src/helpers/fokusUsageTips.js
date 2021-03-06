const FokusUsageTips = [
    {
        tip: "Use Fokus for high productivity and efficiency.",
    },
    {
        tip: "You can press 'A' to quickly add a new task.",
    },
    {
        tip: "Always remember to plan your day in advance.",
    }
];

export function getFokusUsageTip() {
    return FokusUsageTips[Math.floor(Math.random()*FokusUsageTips.length)]
}
