const quotes = [
    {
        quote: "We cannot solve problems with the kind of thinking we employed when we came up with them.",
        length: 109,
        author: "Albert Einstein",
    },
    {
        quote: "Learn as if you will live forever, live like you will die tomorrow.",
        length: 86,
        author: "Mahatma Gandhi",
    },
    {
        quote:
            "Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.",
        length: 183,
        author: "Mark Twain",
    },
    {
        quote: "When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out.",
        length: 150,
        author: "Eleanor Roosevelt",
    },
    {
        quote: "When you change your thoughts, remember to also change your world.",
        length: 89,
        author: "Norman Vincent Peale",
    },
    {
        quote: "It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest.",
        length: 156,
        author: "Walter Anderson",
    },
    {
        quote: "Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.",
        length: 155,
        author: "Diane McLaren",
    },
    {
        quote: "Success usually comes to those who are too busy looking for it.",
        length: 87,
        author: "Henry David Thoreau",
    },
    {
        quote: "Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.",
        length: 124,
        author: "Dale Carnegie",
    },
    {
        quote:
            "Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable.",
        length: 162,
        author: "John Wooden",
    },
    {
        quote: "I never dreamed about success. I worked for it.",
        length: 63,
        author: "Estée Lauder",
    },
    {
        quote: 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty."',
        length: 124,
        author: "Winston Churchill",
    },
    {
        quote: "Don’t let yesterday take up too much of today.",
        length: 62,
        author: "Will Rogers",
    },
    {
        quote: "You learn more from failure than from success. Don’t let it stop you. Failure builds character.",
        length: 108,
        author: "Unknown",
    },
    {
        quote: "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.",
        length: 125,
        author: "Steve Jobs",
    },
    {
        quote: "To know how much there is to know is the beginning of learning to live.",
        length: 87,
        author: "Dorothy West",
    },
    {
        quote: "Goal setting is the secret to a compelling future.",
        length: 67,
        author: "Tony Robbins",
    },
    {
        quote: "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
        length: 132,
        author: "Alexander Graham Bell",
    },
    {
        quote: "Either you run the day or the day runs you.",
        length: 56,
        author: "Jim Rohn",
    },
    {
        quote: "I’m a greater believer in luck, and I find the harder I work the more I have of it.",
        length: 104,
        author: "Thomas Jefferson",
    },
    {
        quote: "When we strive to become better than we are, everything around us becomes better too.",
        length: 102,
        author: "Paulo Coelho",
    },
    {
        quote: "Opportunity is missed by most people because it is dressed in overalls and looks like work.",
        length: 109,
        author: "Thomas Edison",
    },
    {
        quote: "Setting goals is the first step in turning the invisible into the visible.",
        length: 91,
        author: "Tony Robbins",
    },
    {
        quote: "The successful man will profit from his mistakes and try again in a different way.",
        length: 100,
        author: "Dale Carnegie",
    },
    {
        quote: "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
        length: 115,
        author: "David Brinkley",
    },
    {
        quote: "He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.",
        length: 120,
        author: "Epictetus",
    },
    {
        quote: "You've got to get up every morning with determination if you're going to go to bed with satisfaction.",
        length: 120,
        author: "George Lorimer",
    },
    {
        quote: "Education is the most powerful weapon which you can use to change the world.",
        length: 95,
        author: "Nelson Mandela",
    },
    {
        quote: "The most difficult thing is the decision to act, the rest is merely tenacity.",
        length: 95,
        author: "Amelia Earhart",
    },
    {
        quote: "Take the attitude of a student, never be too big to ask questions, never know too much to learn something new.",
        length: 134,
        author: "Augustine Og Mandino",
    },
    {
        quote: "The elevator to success is out of order. You’ll have to use the stairs, one step at a time.",
        length: 106,
        author: "Joe Girard",
    },
    {
        quote: "Be a positive energy trampoline",
        length: 94,
        author: "Dave Carolan",
    },
    {
        quote: "People often say that motivation doesn’t last. Well, neither does bathing",
        length: 124,
        author: "Zig Ziglar",
    },
    {
        quote: "Work until your bank account looks like a phone number.",
        length: 68,
        author: "Unknown",
    },
    {
        quote: "I am so clever that sometimes I don’t understand a single word of what I am saying.",
        length: 99,
        author: "Oscar Wilde",
    },
    {
        quote: "I always wanted to be somebody, but now I realise I should have been more specific.",
        length: 99,
        author: "Lily Tomlin",
    },
    {
        quote: "Just one small positive thought in the morning can change your whole day.",
        length: 88,
        author: "Dalai Lama",
    },
    {
        quote: "Opportunities don't happen, you create them.",
        length: 62,
        author: "Chris Grosser",
    },
    {
        quote: "Love your family, work super hard, live your passion.",
        length: 73,
        author: "Gary Vaynerchuk",
    },
    {
        quote: "It is never too late to be what you might have been.",
        length: 69,
        author: "George Eliot",
    },
    {
        quote: "Don't let someone else's opinion of you become your reality",
        length: 73,
        author: "Les Brown",
    },
    {
        quote: "I am not a product of my circumstances. I am a product of my decisions.",
        length: 92,
        author: "Stephen R. Covey",
    },
    {
        quote: "The greatest discovery of my generation is that a human being can alter his life by altering his attitudes.",
        length: 125,
        author: "William James",
    },
    {
        quote: "One of the differences between some successful and unsuccessful people is that one group is full of doers, while the other is full of wishers.",
        length: 160,
        author: "Edmond Mbiaka",
    },
    {
        quote: "I’d rather regret the things I’ve done than regret the things I haven’t done.",
        length: 93,
        author: "Lucille Ball",
    },
    {
        quote: "When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love…",
        length: 123,
        author: "Marcus Aurelius",
    },
    {
        quote: "Mondays are the start of the work week which offer new beginnings 52 times a year!",
        length: 98,
        author: "David Dweck",
    },
    {
        quote: "Be miserable. Or motivate yourself. Whatever has to be done, it's always your choice.",
        length: 100,
        author: "Wayne Dyer",
    },
    {
        quote:
            "Your Monday morning thoughts set the tone for your whole week. See yourself getting stronger, and living a fulfilling, happier & healthier life.",
        length: 161,
        author: "Germany Kent",
    },
    {
        quote: "Make a Friday a day to celebrate work well done that you can be proud of knowing that you just didn’t put in time to the next paycheck.",
        length: 153,
        author: "Byron Pulsifer",
    },
    {
        quote: "You can get everything in life you want if you will just help enough other people get what they want.",
        length: 115,
        author: "Zig Ziglar",
    },
    {
        quote: "Inspiration does exist, but it must find you working.",
        length: 70,
        author: "Pablo Picasso",
    },
    {
        quote: "Don't settle for average. Bring your best to the moment. Then, whether it fails or succeeds, at least you know you gave all you had.",
        length: 150,
        author: "Angela Bassett",
    },
    {
        quote: "Show up, show up, show up, and after a while the muse shows up, too.",
        length: 86,
        author: "Isabel Allende",
    },
    {
        quote: "I have stood on a mountain of no’s for one yes.",
        length: 71,
        author: "Barbara Elaine Smith",
    },
    {
        quote: "If you believe something needs to exist, if it's something you want to use yourself, don't let anyone ever stop you from doing it.",
        length: 146,
        author: "Tobias Lütke",
    },
    {
        quote: "Someone's sitting in the shade today because someone planted a tree a long time ago.",
        length: 101,
        author: "Warren Buffet",
    },
    {
        quote: "Set your goals high, and don’t stop till you get there.",
        length: 69,
        author: "Bo Jackson",
    },
    {
        quote: "Take your victories, whatever they may be, cherish them, use them, but don’t settle for them.",
        length: 105,
        author: "Mia Hamm",
    },
    {
        quote:
            "Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you. And you can change it, you can influence it… Once you learn that, you'll never be the same again.",
        length: 265,
        author: "Steve Jobs",
    },
    {
        quote: "Life is like riding a bicycle. To keep your balance you must keep moving.",
        length: 92,
        author: "Albert Einstein",
    },
    {
        quote: "What you do speaks so loudly that I cannot hear what you say.",
        length: 84,
        author: "Ralph Waldo Emerson",
    },
    {
        quote: "I have never let my schooling interfere with my education.",
        length: 72,
        author: "Mark Twain",
    },
    {
        quote: "Live out of your imagination, not your history.",
        length: 64,
        author: "Stephen Covey",
    },
    {
        quote: "Do not wait for the perfect time and place to enter, for you are already onstage.",
        length: 92,
        author: "Unknown",
    },
    {
        quote: "I will not lose, for even in defeat, there’s a valuable lesson learned, so it evens up for me.",
        length: 103,
        author: "Jay-Z",
    },
    {
        quote: "I do not try to dance better than anyone else. I only try to dance better than myself.",
        length: 108,
        author: "Arianna Huffington",
    },
    {
        quote: "If you don’t risk anything, you risk even more.",
        length: 61,
        author: "Erica Jong",
    },
    {
        quote: "Failure is simply the opportunity to begin again, this time more intelligently.",
        length: 94,
        author: "Henry Ford",
    },
    {
        quote: "Our greatest glory is not in never falling, but in rising every time we fall.",
        length: 92,
        author: "Confucius",
    },
    {
        quote: "If you change the way you look at things, the things you look at change.",
        length: 87,
        author: "Wayne Dyer",
    },
    {
        quote: "We must reach out our hand in friendship and dignity both to those who would befriend us and those who would be our enemy.",
        length: 138,
        author: "Arthur Ashe",
    },
    {
        quote: "It's fine to celebrate success but it is more important to heed the lessons of failure.",
        length: 102,
        author: "Bill Gates",
    },
    {
        quote: "We need to accept that we won’t always make the right decisions, that we’ll screw up royally sometimes",
        length: 207,
        author: "Ariana Huffington",
    },
    {
        quote: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.",
        length: 129,
        author: "Henry Ford",
    },
    {
        quote: "You cannot always control what goes on outside. But you can always control what goes on inside.",
        length: 110,
        author: "Wayne Dyer",
    },
    {
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        length: 89,
        author: "Aristotle",
    },
    {
        quote: "Start where you are. Use what you have. Do what you can.",
        length: 72,
        author: "Arthur Ashe",
    },
    {
        quote: "Hustle beats talent when talent doesn’t hustle",
        length: 64,
        author: "Ross Simmonds",
    },
    {
        quote: "Everything you've ever wanted is sitting on the other side of fear.",
        length: 85,
        author: "George Addair",
    },
    {
        quote: "The question isn't who is going to let me; it's who is going to stop me.",
        length: 85,
        author: "Ayn Rand",
    },
    {
        quote: "Every strike brings me closer to the next home run.",
        length: 65,
        author: "Babe Ruth",
    },
    {
        quote: "I have not failed. I've just found 10,000 ways that won't work.",
        length: 84,
        author: "Thomas A. Edison",
    },
    {
        quote: "Don’t worry about failure; you only have to be right once.",
        length: 74,
        author: "Drew Houston",
    },
    {
        quote: "You carry the passport to your own happiness.",
        length: 70,
        author: "Diane von Furstenberg",
    },
    {
        quote: "Never let success get to your head and never let failure get to your heart.",
        length: 84,
        author: "Drake",
    },
    {
        quote: "Ideation without execution is delusion.",
        length: 56,
        author: "Robin Sharma",
    },
    {
        quote: "It is a rough road that leads to the heights of greatness.",
        length: 83,
        author: "Lucius Annaeus Seneca",
    },
    {
        quote: "For the great doesn’t happen through impulse alone, and is a succession of little things that are brought together.",
        length: 135,
        author: "Vincent van Gogh",
    },
    {
        quote: "If we take care of the moments, the years will take care of themselves.",
        length: 90,
        author: "Maria Edgeworth",
    },
    {
        quote: "Resilience is when you address uncertainty with flexibility.",
        length: 71,
        author: "Unknown",
    },
    {
        quote: "Sometimes magic is just someone spending more time on something than anyone else might reasonably expect.",
        length: 130,
        author: "Raymond Joseph Teller",
    },
    {
        quote:
            "As a single footstep will not make a path on the earth, so a single thought will not make a pathway in the mind. To make a deep physical path, we walk again and again. To make a deep mental path, we must think over and over the kind of thoughts we wish to dominate our lives.",
        length: 298,
        author: "Henry David Thoreau",
    },
    {
        quote: "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
        length: 127,
        author: "Earl Nightingale",
    },
    {
        quote: "True humility is not thinking less of yourself; it is thinking of yourself less.",
        length: 95,
        author: "C.S. Lewis",
    },
    {
        quote: "The two most important days in your life are the day you’re born and the day you find out why.",
        length: 109,
        author: "Mark Twain",
    },
    {
        quote: "Nothing ever goes away until it teaches us what we need to know.",
        length: 81,
        author: "Pema Chodron",
    },
    {
        quote: "If there is no struggle, there is no progress.",
        length: 68,
        author: "Frederick Douglass",
    },
    {
        quote: "Courage is like a muscle. We strengthen it by use.",
        length: 64,
        author: "Ruth Gordo",
    },
    {
        quote: "If you don’t like the road you’re walking, start paving another one.",
        length: 84,
        author: "Dolly Parton",
    },
    {
        quote: "If it makes you nervous, you’re doing it right.",
        length: 67,
        author: "Childish Gambino",
    },
    {
        quote: "What you do makes a difference, and you have to decide what kind of difference you want to make.",
        length: 112,
        author: "Jane Goodall",
    },
    {
        quote: "I choose to make the rest of my life the best of my life.",
        length: 71,
        author: "Louise Hay",
    },
    {
        quote: "In order to be irreplaceable one must always be different.",
        length: 73,
        author: "Coco Chanel",
    },
    {
        quote: "Anything can make me stop and look and wonder, and sometimes learn.",
        length: 84,
        author: "Kurt Vonnegut",
    },
    {
        quote: "People's passion and desire for authenticity is strong.",
        length: 71,
        author: "Constance Wu",
    },
    {
        quote: "A surplus of effort could overcome a deficit of confidence.",
        length: 78,
        author: "Sonia Sotomayor",
    },
    {
        quote: "Doubt is a killer. You just have to know who you are and what you stand for.",
        length: 94,
        author: "Jennifer Lopez",
    },
    {
        quote: "No one changes the world who isn’t obsessed.",
        length: 64,
        author: "Billie Jean King",
    },
    {
        quote: "I learned a long time ago that there is something worse than missing the goal, and that’s not pulling the trigger.",
        length: 126,
        author: "Mia Hamm",
    },
    {
        quote: "Some people want it to happen, some wish it would happen, others make it happen.",
        length: 98,
        author: "Michael Jordan",
    },
    {
        quote:
            "It is remarkable how much long-term advantage people like us have gotten by trying to be consistently not stupid, instead of trying to be very intelligent.",
        length: 173,
        author: "Charlie Munger",
    },
    {
        quote: "The standard you walk past, is the standard you accept.",
        length: 71,
        author: "David Hurley",
    },
    {
        quote: "Perfection is not attainable. But if we chase perfection we can catch excellence.",
        length: 99,
        author: "Vince Lombardi",
    },
    {
        quote: "Get a good idea and stay with it. Dog it, and work at it until it’s done right.",
        length: 94,
        author: "Walt Disney",
    },
    {
        quote: "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
        length: 113,
        author: "Helen Keller",
    },
];

export function getTodaysQuote() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return quotes[day % quotes.length];
}
