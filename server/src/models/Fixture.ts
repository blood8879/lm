import { model, Model, Schema, Types } from "mongoose";

interface DBFixture {
    matchDay: Date;
    homeTeam: Types.ObjectId;
    awayTeam: Types.ObjectId;
    competition: string;
    round: number;
    venue: string;
}

interface DBFixtureModel extends Model<DBFixture> {}

const fixtureSchema = new Schema<DBFixture> ({
    matchDay: { type: Date },
    homeTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
    awayTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
    competition: { type: String },
    round: { type: Number },
    venue: { type: String }
});

const Fixture = model<DBFixture, DBFixtureModel>('Fixture', fixtureSchema);

export { Fixture };