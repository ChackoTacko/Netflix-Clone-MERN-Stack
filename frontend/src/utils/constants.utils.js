import TelevisionIcon from '../images/TelevisionIcon';
import DownloadIcon from '../images/DownloadIcon';
import TelescopeIcon from '../images/TelescopeIcon';
import ProfileIcon from '../images/ProfileIcon';

export const SMALL_IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const ORIGINAL_IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const FAQS = [
    {
        question: 'What is Netflix?',
        answer: [
            `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.`,
            `You can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!`
        ]
    },
    {
        question: "How much does Netflix cost?",
        answer: [`Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $7.99 to $24.99 a month (pre-tax). No extra costs, no contracts.`]
    },
    {
        question: "Where can I watch?",
        answer: [
            `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.`,
            `You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.`
        ],
    },
    {
        question: "How do I cancel?",
        answer: ["Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."]
    },
    {
        question: "What can I watch on Netflix?",
        answer: ["Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."],
    },
    {
        question: "Is Netflix good for kids?",
        answer: [
            `The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.`,
            `Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.`
        ]
    }
];

export const PANELS_DATA = [
    {
        title: 'Enjoy on your TV',
        text: 'Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.',
        icon: TelevisionIcon,
    },
    {
        title: 'Download your shows to watch offline',
        text: 'Save your favorites easily and always have something to watch.',
        icon: DownloadIcon,
    },
    {
        title: 'Watch everywhere',
        text: 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
        icon: TelescopeIcon,
    },
    {
        title: 'Create profiles for kids',
        text: 'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.',
        icon: ProfileIcon,
    }
];

export const MOVIE_CATEGORIES = ['now_playing', 'popular', 'top_rated', 'upcoming'];

export const TV_CATEGORIES = ['airing_today', 'on_the_air', 'top_rated', 'popular'];