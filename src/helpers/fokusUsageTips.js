const FokusUsageTips = [
    {
        tip: "Use Fokus for high productivity and efficiency.",
    },
    {
        tip: "Always remember to plan your day in advance.",
    },
    {
        tip: "Easily re-order tasks by drag and drop.",
    },
    {
        tip: "Internet is down? Fokus can work just as efficiently without internet connectivity.",
    },
    {
        tip: "Your data never leaves your browser as Fokus respects privacy.",
    },
    {
        tip: "You can set a default label for tasks in the settings.",
    },
    {
        tip: "Taking regular breaks between tasks helps in increasing productivity.",
    },
    {
        tip: "Starting with smaller tasks helps in building momentum and motivation to carry on.",
    },
    {
        tip: "Hey there, I think you should be focusing on a task, no?",
    },
    {
        tip: "Listing all your tasks daily helps clear the head space and improves efficiency.",
    },
    {
        tip: "Always plan your tasks in advance to avoid last minute hassles.",
    },
    {
        tip: "Setting goals on a daily basis and achieving them with consistency is the WAY.",
    },
    {
        tip: "Analyse your day. Find the most productive time of the day and try to complete important tasks in that period.",
    },
    {
        tip: "Use labels for tasks to distribute the tasks in a much organised way.",
    },
    {
        tip: "Isolate yourself from distractions once you start Fokus timer.",
    },
    {
        tip: "Small improvements daily leads to more lasting changes, but it takes consistency with discipline.",
    },
    {
        tip: "Always be patient through the rough patches and take actions with consistency.",
    },
    {
        tip: `Multitasking is not efficient. "Pick a task, complete it and move to next" should be the mantra.`,
    },
    {
        tip: "Finishing the most important tasks first helps in reducing stress & increase motivation.",
    },
    {
        tip: "Make small changes and build positive habits. It is the key for higher productivity and efficiency at work.",
    },
    {
        tip: "Keep your phone or any other thing that might distract you aside when you start with your task.",
    },
    {
        tip: "Manage your energy and not just time. Not everything needs to be done today.",
    },
    {
        tip: "Taking short breaks between tasks and exercising can help you improve your overall health.",
    },
    {
        tip: "Complete your tasks daily and avoid procrastination.",
    },
    {
        tip: "Playing soundscapes helps in improving concentration.",
    },
];

export function getFokusUsageTip() {
    return FokusUsageTips[Math.floor(Math.random() * FokusUsageTips.length)];
}
