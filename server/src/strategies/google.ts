import passport from "passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import sanitizedConfig from "../../config/config";
import { userService } from "../initDatabase";
import { User } from "../domain/User";

passport.use(
    new Strategy({
        clientID: sanitizedConfig.GOOGLE_CLIENT_ID,
        clientSecret: sanitizedConfig.GOOGLE_SECRET,
        callbackURL: `http://localhost:${sanitizedConfig.PORT}${sanitizedConfig.GOOGLE_REDIRECT_URL}`,
        passReqToCallback: true
    },
        async (
            request,
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            if (profile._json.email && profile._json.name) {
                try {
                    const user = await userService.findUserByEmail(profile._json.email);
                    if (user) {
                        return done(null, user)
                    }
                } catch (err) {
                    if (err == "Error: EmailNotExists") {
                        const newUser = new User(
                            profile._json.email,
                            profile._json.name,
                            []
                        );
                        const response = await userService.createUser(newUser);
                        if (response) {
                            return done(null, response);
                        }
                    }
                }
            }
        }
    )
)

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: User | null, done) => {
    done(null, user);
});