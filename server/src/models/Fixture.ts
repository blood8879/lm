import { model, Model, Schema, Types } from "mongoose";

interface DBFixture {
    
}

interface DBFixtureModel extends Model<DBFixture> {}

const fixtureSchema = new Schema<DBFixture> ({
    
});

const Fixture = model<DBFixture, DBFixtureModel>('Team', fixtureSchema);

export { Fixture };