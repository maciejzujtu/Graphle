import { GraphFunction, GraphleStatus } from "@/hooks/definitions"
import { Collection, MongoClient } from "mongodb"

export interface Graphle {
    id: string,
    props: GraphFunction,
}

/** Represents individual attempt in a single game */
export interface Attempt {
    id: string,
    expression: string,
    winning_graphle: boolean,
}

/** Represents singular game session started by a player */
export interface Game {
    status: GraphleStatus,          // Whether the graph was solved.
    attempts: Attempt[],            // How many attempts it took (1-6)
    finished_at: Date | null        // Unix timestamp of when the game ended
}

/** Player profile schema stored in our MongoDb */
export interface Record {
    id: string,              // Discord user ID
    username: string,        // Discord username
    current_streak?: number, // Days played & won in a row
    total_solved?: number,   // Total solved graphs
    total_played?: number,   // Total games played
    games?: Game[]           // Record of each individual session
}

/**
 * @class MongoDb
 * @description
 *  Handles all direct interactions with MongoDB Atlas Cluster.
 * This class wraps the native `MongoClient` to provide type-safe methods
 * for managing user profiles (adding, updating, fetching).
 * 
 * @example
 * ```ts
 * const db = new MongoDb()
 * await db.addProfile({ id: "123", username: "Jan2137" })
 * const user = await db.getProfile("123")
 * ```
 */
export class MongoDb {
    private URI_STRING = process.env.URI_STRING! as string                           // mongodb+srv..
    private DATABASE_NAME = process.env.DATABASE_NAME! as string                     // 
    private USER_COLLECTION_NAME = process.env.COLLECTION_NAME! as string            // 
    private GRAPHLE_COLLECTION_NAME = process.env.GRAPHLE_COLLECTION_NAME! as string //

    private UserCollection: Collection<Record>      // MongoDB User Collection instance
    private GraphleCollection: Collection<Graphle>  // MongoDB Graphle Collection instance
    private Client: MongoClient                     // MongoDB Client instance

    /**
     * Initializes the MongoDB client and sets up the collection reference.
     * Note: It doesn't open up the connection immediately, it's handed for
     * each method call.
     * 
     * TODO: Make it not handle connection lazily.
     */
    constructor() {
        this.Client = new MongoClient(this.URI_STRING)
        this.UserCollection = this.Client
                            .db(this.DATABASE_NAME)
                            .collection(this.USER_COLLECTION_NAME)
        this.GraphleCollection = this.Client
                            .db(this.DATABASE_NAME)
                            .collection(this.GRAPHLE_COLLECTION_NAME)
    }

    /**
     * Creates a new user profile in the database.
     * Automatically initializes stats to zero.
     * @param {Record} record - Username and their Id
     * @returns {Promise<void>}
     */
    public async addProfile(record: Record): Promise<void> {
        try {
            await this.Client.connect()
            const newProfile: Record = {
                id: record.id,
                username: record.username,
                current_streak: 0,
                total_solved: 0,
                total_played: 0,
                games: []
            }
            await this.UserCollection.insertOne(newProfile)
        } finally {
            await this.Client.close()
        }
        
    }

    /**
     * Updates an existing user profile.
     * @todo Implement logic to update streaks, games played, etc.
     */
    public async updateProfile() {
        // TODO
    }

    /**
     * Retrieves a user's full profile.
     * @param {string} userId - Player's Discord User Id
     * @returns {Promise<Record> | false} If player exists it returns their profile if profile was not found it returns false
     */
    public async getProfile(userId: string): Promise<Record | false> {
        try {   
            await this.Client.connect()
            const record = await this.UserCollection.findOne({ id: userId })

            if (record) {
                return record
            }
            return false
        } finally {
            await this.Client.close()
        }
        
    }

    /**
     * Randomly retrieves today's Graphle
     * @param {number} Id - Graphle'd Id (corresponds to the day)
     */
    public async getGraphle(graphleId: string): Promise<Graphle | false> {
        try {
            const record = await this.GraphleCollection.findOne({ id: graphleId }) as Graphle

            if (record) {
                return record
            }  
            return false
        } finally {
            await this.Client.close()
        }
    }
}


