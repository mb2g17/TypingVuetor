/**
 * A word to type out
 */
export default class WordClass
{
    /** The remaining string to type */
    private remainingStr: string;

    /** The bit of string that has been typed */
    private typedStr: string;

    /** Constructor */
    constructor(word: string)
    {
        // We have the whole word remaining
        this.remainingStr = word;
        this.typedStr = "";
    }

    /**
     * Accessor for the remaining string
     */
    public getRemainingStr(): string
    {
        return this.remainingStr;
    }

    /**
     * Accessor for the typed string
     */
    public getTypedStr(): string
    {
        return this.typedStr;
    }

    /**
     * Returns true if this word is complete, false if not
     */
    public complete(): boolean
    {
        return this.remainingStr.length == 0;
    }

    /**
     * Types a letter to this word
     */
    public type(typed: string): void
    {
        // If we're typing in the remaining string
        if (this.remainingStr.startsWith(typed))
        {
            // Chop it off the remaining string
            this.remainingStr = this.remainingStr.slice(typed.length, this.remainingStr.length);

            // Add it to the typed string
            this.typedStr += typed;
        }
    }
}