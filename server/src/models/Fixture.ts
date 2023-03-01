import { model, Model, Schema, Types } from "mongoose";

interface DBFixture {
    matchDay: Date;
    homeTeam: string;
    awayTeam: string;
    competition: string;
    round: number;
    venue: string;
}

interface DBFixtureModel extends Model<DBFixture> {}

const fixtureSchema = new Schema<DBFixture> ({
    matchDay: { type: Date },
    homeTeam: { type: String },
    awayTeam: { type: String },
    competition: { type: String },
    round: { type: Number },
    venue: { type: String }
});

const Fixture = model<DBFixture, DBFixtureModel>('Fixture', fixtureSchema);

export { Fixture };