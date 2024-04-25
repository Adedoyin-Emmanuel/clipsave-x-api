import { TwitterDL } from "twitter-downloader";
import Joi from "joi";
import { Axios } from "axios";

  export async function analyze(req, res) {
    try {
      const requestSchema = Joi.object({
        query: Joi.string().required(),
      });

      const { error, value } = requestSchema.validate(req.query);

      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
          data: {},
        });

      const { query } = value;

      const twitterKey = process.env.TWITTER_AUTH_TOKEN;

      const guestTokenRequest = await Axios(
        "https://api.twitter.com/1.1/guest/activate.json",
        {
          method: "POST",
          headers: {
            Authorization: twitterKey,
          },
        }
      );

      if (guestTokenRequest.status !== 200)
        return res.status(500).json({
          message: "Could not get guest token",
          success: false,
          data: {},
        });

      let response = await TwitterDL(query, {
        authorization: twitterKey,
        guestToken: guestTokenRequest.data.guest_token,
      });

      if (response.status !== "success") {
        return res
          .status(500)
          .json({ message: response.message, success: false, data: {} });
      }
      return res.status(200).json(
        {
          message: "Analyze complete",
          success: true,
          extractor: "TwitterSDK",
          data: { ...response.result },
        },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: error.message, success: false, data: {} });
    }
  }


