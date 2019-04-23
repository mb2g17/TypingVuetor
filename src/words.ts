export default class WordBank
{
    private static easyWords: string[] = [
        "hello",
        "world",
        "werewolf",
        "electronics",
        "enigma",
        "automata",
        "gennaro",
        "mathias",
        "joshua",
        "umi",
        "wat",
        "haskell",
        "monads",
        "julian",
        "pawel",
        "spaghetti",
        "jojo",
        "joestar",
        "kirk",
        "ooh",
        "kostas",
        "tim",
        "balint",
        "dan",
        "ben",
        "panos",
        "loleria",
        "dominos",
        "gitkraken",
        "intellij",
        "corina",
        "boon",
        "yes",
        "adventurer",
        "thot",
        "event-b",
        "rodin",
        "notes",
        "southampton",
        "tosic"
    ];

    private static mediumWords: string[] = [
        "star platinum",
        "what the hell",
        "wessex lane",
        "sod that",
        "glen eyre",
        "andy gravell",
        "michael butler",
        "thai son hoang",
        "vita student",
        "hampton square",
        "theory of computing",
        "data management",
        "professional development"
    ];

    private static hardWords: string[] = [
        "Joshua James Aubrey Gregory",
        "Oh my god!",
        "David Tyoember",
        "Joyce Joestar",
        "ECS' Bizarre Adventure",
        "Electronics and Computer Science",
        "Mathias loves TypeScript and VITA",
        "I completely disagree",
        "This is completely wrong!",
        "WRONG!"
    ];

    private static getWord(arr: string[]): string {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    public static getEasyWord(): string {
        return this.getWord(this.easyWords);
    }

    public static getMediumWord(): string {
        return this.getWord(this.easyWords.concat(this.mediumWords));
    }

    public static getHardWord(): string {
        return this.getWord(this.easyWords.concat(this.mediumWords.concat(this.hardWords)));
    }

    public static getWordByDifficulty(diff: string): string {
        switch (diff)
        {
            case "easy":
                return this.getEasyWord();
            case "medium":
                return this.getMediumWord();
            case "hard":
                return this.getHardWord();
            default:
                return "error";
        }
    }

};