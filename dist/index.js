"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    console.log(url);
    const v_id = url.split("v=")[1];
    const info = yield ytdl_core_1.default.getInfo(url);
    console.log(info.formats[4]);
    console.log(info.formats[1]);
    const Data = {
        url: "https://www.youtube.com/embed/" + v_id,
        // info: info.formats.sort((a:videoFormat, b:videoFormat) => {
        //   return true;
        // }),
        // info: info.formats.sort((a: videoFormat, b: videoFormat) => {
        //   return a.mimeType > b.mimeType ? 1 : -1;
        // }),
        info: info.formats
    };
    res.status(200).json(Data);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at Port:${port}`);
});
