import { model, Model, Schema, Types } from "mongoose";

interface DBTeam {
    name: string;
    emblem: string;
    description: string;
    publishedAt: Date;
    owner?: Types.ObjectId;
}

interface DBTeamModel extends Model<DBTeam> {}

const teamSchema = new Schema<DBTeam> ({
    name: { type: String, required: true },
    emblem: { type: String },
    description: { type: String },
    publishedAt: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Team = model<DBTeam, DBTeamModel>('Team', teamSchema);

export { Team };