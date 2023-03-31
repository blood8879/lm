import { model, Model, Schema, Types } from "mongoose";

interface DBFixture {
    matchDay: Date;
    homeTeam: Types.ObjectId;
    awayTeam: Types.ObjectId;
    competition: string;
    round: number;
    venue: string;
    home_goals: number;
    away_goals: number;
    isFinish: boolean;
    homeSquad: Types.ObjectId[];
    awaySquad: Types.ObjectId[];
    homeAbsent: Types.ObjectId[];
    awayAbsent: Types.ObjectId[];
    homePlayerGoals: { goals: { [playerId: string]: number }, assists: { [playerId: string]: number } },
    awayPlayerGoals: { goals: { [playerId: string]: number }, assists: { [playerId: string]: number } }
}

interface DBFixtureModel extends Model<DBFixture> {}

const fixtureSchema = new Schema<DBFixture> ({
    matchDay: { type: Date },
    homeTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
    awayTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
    competition: { type: String },
    round: { type: Number },
    venue: { type: String },
    home_goals: { type: Number },
    away_goals: { type: Number },
    isFinish: { type: Boolean, default: false },
    homeSquad: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    awaySquad: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    homeAbsent: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    awayAbsent: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    homePlayerGoals: {
        goals: {
            type: Map,
            of: Number
        },
        assists: {
            type: Map,
            of: Number
        }
    },
    awayPlayerGoals: {
        type: Map,
        of: Number
    },
});

const Fixture = model<DBFixture, DBFixtureModel>('Fixture', fixtureSchema);

export { Fixture };