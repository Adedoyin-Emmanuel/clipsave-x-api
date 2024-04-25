import { TwitterDL } from "twitter-downloader";
import Joi from "joi";

class TwitterVideoController {
  async analyze(req, res) {
    const requestSchema = Joi.object({
      query: Joi.string().required(),
    });

    const { error, value } = requestSchema.validate(req.query);

    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: {} });
  }
}
