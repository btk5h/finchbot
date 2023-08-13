import {Configuration, OpenAIApi} from "openai";
import {env} from "./env.ts";

const configuration = new Configuration({
    apiKey: env.OPENAI_KEY
});
export const openai = new OpenAIApi(configuration);
