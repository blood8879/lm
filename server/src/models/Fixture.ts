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
    homePlayerGoals: { [playerId: string]: number },
    awayPlayerGoals: { [playerId: string]: number },
    homePlayerAssists: { [playerId: string]: number },
    awayPlayerAssists: { [playerId: string]: number }
    // homePlayerGoals: { goals: { [playerId: string]: number }, assists: { [playerId: string]: number } },
    // awayPlayerGoals: { goals: { [playerId: string]: number }, assists: { [playerId: string]: number } },
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
    // 플레이어 골-어시를 현재 통합이 아닌 골별로 기록하기 위해 수정해야함
    // homePlayerGoals: {
    //     goals: {
    //         type: Map,
    //         of: Number
    //     },
    //     assists: {
    //         type: Map,
    //         of: Number
    //     }
    // },
    homePlayerGoals: {
        type: Map,
        of: Number
    },
    awayPlayerGoals: {
        type: Map,
        of: Number
    },
    homePlayerAssists: {
        type: Map,
        of: Number
    },
    awayPlayerAssists: {
        type: Map,
        of: Number
    }
});

const Fixture = model<DBFixture, DBFixtureModel>('Fixture', fixtureSchema);

export { Fixture };