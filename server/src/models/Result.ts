import { model, Model, Schema, Types } from "mongoose";

interface DBResult {
    matchId: Types.ObjectId;
    home_goals: number;
    away_goals: number;
    players: {
        player: Types.ObjectId;
        team: Types.ObjectId;
        goals: number;
        assists: number;
    }[];
}

interface DBResultModel extends Model<DBResult> {}

const resultSchema = new Schema<DBResult> ({
    matchId: { type: Schema.Types.ObjectId, ref: 'Fixture' },
    home_goals: { type: Number, default: 0 },
    away_goals: { type: Number, default: 0 },
    players: [
        {
            player: { type: Schema.Types.ObjectId, ref: 'Player' },
            team: { type: Schema.Types.ObjectId, ref: 'Team' },
            goals: { type: Number, default: 0 },
            assists: { type: Number, default: 0 }
        }
    ]
});

const Result = model<DBResult, DBResultModel>('Result', resultSchema);

export { Result };