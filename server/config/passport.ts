import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import sanitizedConfig from "../config/config";
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: sanitizedConfig.GOOGLE_CLIENT_ID,
      clientSecret: sanitizedConfig.GOOGLE_SECRET,
      callbackURL: `http://localhost:${sanitizedConfig.PORT}${sanitizedConfig.GOOGLE_REDIRECT_URL}`,
    },
    (accessToken, refreshToken, profile, done) => {
      // get profile details
      // save profile details in db
    }
  )
);
