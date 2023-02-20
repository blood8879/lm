import { Model, Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";

const saltRounds = 10;

interface DBUser {
    name: string;
    email: string;
    password: string;
    role: number;
    player: Types.ObjectId;
}

interface DBUserModel extends Model<DBUser> {}

const userSchema = new Schema<DBUser> ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: 1 },
    password: { type: String, required: true },
    // role 0: admin, 1:member
    role: { type: Number, default: 1 },
    player: { type: Schema.Types.ObjectId, ref: 'Player'},
});

userSchema.pre('save', function(next) {
    var user = this;

    // 비밀번호 암호화(10회)
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
};

const User = model<DBUser, DBUserModel>('User', userSchema);

export { User };