import * as request from "supertest";
import app from "../src/app";

const agent = request.agent(app);


export { agent };
