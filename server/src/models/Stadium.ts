import { model, Model, Schema, Types } from "mongoose";

interface DBStadium {
    team: Types.ObjectId;
    name: string;
}

interface DBStadiumModel extends Model<DBStadium> {}

const stadiumSchema = new Schema<DBStadium> ({
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    name: { type: String }
});

const Stadium = model<DBStadium, DBStadiumModel>('Stadium', stadiumSchema);

export { Stadium };