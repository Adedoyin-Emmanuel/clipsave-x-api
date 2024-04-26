import { TwitterDL } from "x-downloader";
import Joi from "joi";
import Axios from "axios";
import { generateRandomNumbers } from "../utils/generateGuestToken.js";

export class DownloadController {
  static async analyze(req, res) {
    try {
      const requestSchema = Joi.object({
        query: Joi.string().required(),
      });

      const { error, value } = requestSchema.validate(req.body);

      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
          data: {},
        });

      const { query } = value;

      const twitterKey = process.env.TWITTER_AUTH_TOKEN;

      let response = await TwitterDL(query, {
        authorization: twitterKey,
        guestToken: "1783742364979075302",
      });

      if (response.status !== "success") {
        return res
          .status(500)
          .json({ message: response.message, success: false, data: {} });
      }
      return res.status(200).json({
        message: "Analyze complete",
        success: true,
        extractor: "TwitterSDK",
        data: { ...response.result },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: error.message, success: false, data: {} });
    }
  }
}
